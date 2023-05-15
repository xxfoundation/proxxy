package backend

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"sync"

	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"
	jww "github.com/spf13/jwalterweatherman"
	"github.com/xx-labs/blockchain-cmix-relay/client/api"
)

type Handler struct {
	config      Config
	apiInstance *api.Api
	proxy       *api.HttpProxy
	mux         sync.Mutex
}

func NewHandler(config Config) *Handler {
	return &Handler{config: config}
}

// Handle messages from frontend
func (h *Handler) HandleMessages(_ *astilectron.Window, m bootstrap.MessageIn) (interface{}, error) {
	h.mux.Lock()
	defer h.mux.Unlock()
	var err error
	switch m.Name {
	case "connect":
		// Error if already connected
		if h.apiInstance != nil || h.proxy != nil {
			err = errors.New("already connected")
			return err.Error(), err
		}

		// Get contact data for relay servers
		servers := GetRelayServers()

		// Create API
		config := api.Config{
			LogPrefix:      h.config.LogPrefix,
			Retries:        h.config.Retries,
			Cert:           h.config.CertFile,
			NdfUrl:         h.config.NdfUrl,
			StatePath:      h.config.StatePath,
			StatePassword:  "",
			ServerContacts: servers,
		}
		h.apiInstance = api.NewApi(config)

		// Connect API
		h.apiInstance.Connect()

		// Create HTTP server
		h.proxy = api.NewHttpProxy(h.apiInstance, h.config.Port, h.config.LogPrefix)

		// Start HTTP server
		go h.proxy.Start()

		// Return supported networks
		return h.apiInstance.Networks(), nil
	case "networks":
		// Error if API doesn't exist
		if h.apiInstance == nil {
			err = errors.New("API not initialized")
			return err.Error(), err
		}
		return h.apiInstance.Networks(), nil
	case "disconnect":
		// Error if not connected
		if h.apiInstance == nil || h.proxy == nil {
			err = errors.New("not connected")
			return err.Error(), err
		}

		// Stop HTTP server first
		h.proxy.Stop()

		// Disconnect API
		h.apiInstance.Disconnect()

		// Clear
		h.apiInstance = nil
		h.proxy = nil
	case "reset":
		// Error if connected
		if h.apiInstance != nil || h.proxy != nil {
			err = errors.New("can't reset while connected")
			return err.Error(), err
		}

		// Delete cMix state
		os.RemoveAll(h.config.StatePath)
	case "port":
		// Error if connected
		if h.apiInstance != nil || h.proxy != nil {
			err = errors.New("can't change port while connected")
			return err.Error(), err
		}

		// Get port from request
		var port int
		if len(m.Payload) > 0 {
			// Unmarshal payload
			if err = json.Unmarshal(m.Payload, &port); err != nil {
				return err.Error(), err
			}
		} else {
			err = errors.New("must specify a port")
			return err.Error(), err
		}

		// Change port
		h.config.Port = port
	default:
		jww.WARN.Printf("Received unknown message type: %s", m.Name)
	}
	return nil, err
}

const relayContactFileURL = "https://nx38767.your-storageshare.de/s/8PTGRzoHtxNpHZy/download/relays.xxc"

func readLinesFromBytes(reader io.Reader) ([][]byte, error) {
	// Create a new scanner to read the slice of bytes line by line
	scanner := bufio.NewScanner(reader)

	// Create a slice to store the lines of the slice of bytes
	var lines [][]byte

	// Loop through the lines of the slice of bytes
	for scanner.Scan() {
		// Append the line to the slice of lines
		lines = append(lines, scanner.Bytes())
	}

	// Check for any errors that may have occurred while scanning the slice of bytes
	if err := scanner.Err(); err != nil {
		return nil, err
	}

	// Return the slice of lines
	return lines, nil
}

func GetRelayServers() []api.ServerInfo {
	// Download relay contact file
	url := relayContactFileURL
	resp, err := http.Get(url)
	if err != nil {
		jww.ERROR.Printf("Failed to download contact file: %s", err)
		return nil
	}
	defer resp.Body.Close()
	// Read the file data
	data, err := readLinesFromBytes(resp.Body)
	if err != nil {
		jww.ERROR.Printf("Failed to read contact file: %s", err)
		return nil
	}
	// Unmarshal the data
	servers := make([]api.ServerInfo, len(data))
	for i, line := range data {
		contact := api.UnmarshalContact(line)
		servers[i] = api.ServerInfo{
			Contact: contact,
			Name:    fmt.Sprintf("relay-%d", i),
		}
	}
	return servers
}

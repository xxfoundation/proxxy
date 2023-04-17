package backend

import (
	"encoding/json"
	"errors"
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

		// Create API
		config := api.Config{
			LogPrefix:     h.config.LogPrefix,
			Retries:       h.config.Retries,
			Cert:          h.config.CertFile,
			NdfUrl:        h.config.NdfUrl,
			StatePath:     h.config.StatePath,
			StatePassword: "",
			ContactFile:   h.config.ContactFile,
		}
		h.apiInstance = api.NewApi(config)

		// Connect API
		err = h.apiInstance.Connect()
		if err != nil {
			jww.ERROR.Printf("Failed to connect: %+v", err)
			return err.Error(), err
		}

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

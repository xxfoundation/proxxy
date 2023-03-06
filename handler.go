package main

import (
	"errors"
	"path"
	"sync"

	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"
	jww "github.com/spf13/jwalterweatherman"
	"github.com/xx-labs/blockchain-cmix-relay/client/api"
)

var logPrefix = "RELAY"
var contact = "relay.xxc"
var cert = "mainnet.crt"
var ndfUrl = "https://elixxir-bins.s3.us-west-1.amazonaws.com/ndf/mainnet.json"
var statePath = "state"
var statePassword = "12345678"
var port = 9296

type Handler struct {
	apiInstance *api.Api
	proxy       *api.HttpProxy
	mux         sync.Mutex
}

func NewHandler() *Handler {
	return &Handler{}
}

// handleMessages handles messages
func (h *Handler) HandleMessages(_ *astilectron.Window, m bootstrap.MessageIn) (interface{}, error) {
	h.mux.Lock()
	defer h.mux.Unlock()
	var err error
	switch m.Name {
	case "connect":
		if h.apiInstance != nil || h.proxy != nil {
			err = errors.New("already connected")
			return err.Error(), err
		}
		// Create API
		config := api.Config{
			LogPrefix:     logPrefix,
			Retries:       3,
			Cert:          path.Join(resources, cert),
			NdfUrl:        ndfUrl,
			StatePath:     path.Join(appdata, statePath),
			StatePassword: statePassword,
			ContactFile:   path.Join(resources, contact),
		}
		h.apiInstance = api.NewApi(config)

		// Connect API
		err = h.apiInstance.Connect()
		if err != nil {
			jww.ERROR.Printf("Failed to connect: %+v", err)
			return err.Error(), err
		}

		// Create HTTP server
		h.proxy = api.NewHttpProxy(h.apiInstance, port, logPrefix)

		// Start HTTP server
		go h.proxy.Start()

		// Return supported networks
		return h.apiInstance.Networks(), nil
	case "networks":
		if h.apiInstance == nil {
			err = errors.New("API not initialized")
			return err.Error(), err
		}
		return h.apiInstance.Networks(), nil
	case "disconnect":
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
	default:
		jww.WARN.Printf("Received unknown message type: %s", m.Name)
	}
	return nil, err
}

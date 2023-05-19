package main

import (
	"github.com/asticode/go-astikit"
	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"
	jww "github.com/spf13/jwalterweatherman"
	"github.com/xx-labs/cmix-proxy-app/backend"
)

// Vars injected via ldflags by bundler
var (
	AppName            string
	BuiltAt            string
	VersionAstilectron string
	VersionElectron    string
)

// Application Vars
var (
	w         *astilectron.Window
	resources string
	appdata   string
)

func main() {
	// Get backend config
	config := backend.DefaultConfig(AppName)

	// Setup logging
	backend.SetupLogging(config.DataDir)

	// New handler
	handler := backend.NewHandler(config)

	// Run bootstrap
	jww.INFO.Printf("Running app built at %s\n", BuiltAt)
	if err := bootstrap.Run(bootstrap.Options{
		Asset:    Asset,
		AssetDir: AssetDir,
		AstilectronOptions: astilectron.Options{
			AppName:            AppName,
			AppIconDarwinPath:  "resources/icon.icns",
			AppIconDefaultPath: "resources/icon.png",
			SingleInstance:     true,
			VersionAstilectron: VersionAstilectron,
			VersionElectron:    VersionElectron,
		},
		Logger: jww.DEBUG,
		MenuOptions: []*astilectron.MenuItemOptions{{
			Label:    astikit.StrPtr("File"),
			SubLabel: astikit.StrPtr("File"),
			SubMenu: []*astilectron.MenuItemOptions{
				{ // Add about menu item
					Label: astikit.StrPtr("About"),
					OnClick: func(e astilectron.Event) (deleteListener bool) {
						bootstrap.SendMessage(w, "about", nil)
						return
					},
				},
				{ // Add restore window menu item
					Label: astikit.StrPtr("Reset App"),
					OnClick: func(e astilectron.Event) (deleteListener bool) {
						// Create backend messages
						msgDisconnect := bootstrap.MessageIn{
							Name: "disconnect",
						}
						msgReset := bootstrap.MessageIn{
							Name: "reset",
						}

						// Notify frontend that reset is happening
						err := bootstrap.SendMessage(w, "resetting", nil)
						if err != nil {
							jww.DEBUG.Printf("[Bootstrap] Error sending resetting message to frontend: %s", err.Error())
						}

						// Disconnect and reset
						_, err = handler.HandleMessages(w, msgDisconnect)
						if err != nil {
							jww.DEBUG.Printf("[Disconnect] Error message: %s", err.Error())
						}
						_, err = handler.HandleMessages(w, msgReset)
						if err != nil {
							jww.DEBUG.Printf("[Reset] Error message: %s", err.Error())
						} else {
							// Notify frontend that reset is complete
							err = bootstrap.SendMessage(w, "reset", nil)
							if err != nil {
								jww.DEBUG.Printf("[Bootstrap] Error sending reset message to frontend: %s", err.Error())
							}
						}
						return
					},
				},
				{Role: astilectron.MenuItemRoleClose},
			},
		}},
		OnWait: func(_ *astilectron.Astilectron, ws []*astilectron.Window, _ *astilectron.Menu, _ *astilectron.Tray, _ *astilectron.Menu) error {
			w = ws[0]
			return nil
		},
		RestoreAssets: RestoreAssets,
		Windows: []*bootstrap.Window{{
			Homepage:       "index.html",
			MessageHandler: handler.HandleMessages,
			Options: &astilectron.WindowOptions{
				BackgroundColor: astikit.StrPtr("#333"),
				Center:          astikit.BoolPtr(true),
				Height:          astikit.IntPtr(800),
				Width:           astikit.IntPtr(450),
			},
		}},
	}); err != nil {
		jww.FATAL.Printf("running bootstrap failed: %v", err)
	}
}

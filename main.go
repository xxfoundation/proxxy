package main

import (
	"flag"
	"os"

	"github.com/asticode/go-astikit"
	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"
	"github.com/bitfashioned/cmix-proxy-app/backend"
	jww "github.com/spf13/jwalterweatherman"
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
	flags     = flag.NewFlagSet(os.Args[0], flag.ContinueOnError)
	debug     = flags.Bool("d", false, "enables the debug mode")
	w         *astilectron.Window
	resources string
	appdata   string
)

func main() {
	// Parse flags
	flags.Parse(os.Args[1:])

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
		Debug:  *debug,
		Logger: jww.DEBUG,
		MenuOptions: []*astilectron.MenuItemOptions{{
			Label: astikit.StrPtr("File"),
			SubLabel: astikit.StrPtr("File"),
			SubMenu: []*astilectron.MenuItemOptions{
				{   // Add about menu item
					Label: astikit.StrPtr("About"),
					OnClick: func(e astilectron.Event) (deleteListener bool) {
						bootstrap.SendMessage(w, "about", nil)
						return
					},
				},
				{   // Add dev tools menu item
					Label: astikit.StrPtr("Dev Tools"),
					OnClick: func(e astilectron.Event) (deleteListener bool) {
						w.OpenDevTools()
						return
					},
				},
				{	// Add restore window menu item
					Label: astikit.StrPtr("Reset App"),
					OnClick: func(e astilectron.Event) (deleteListener bool) {
						// Create bootstrap messages
						msgDisconnect := bootstrap.MessageIn{
							Name: "disconnect",
						}
						msgReset := bootstrap.MessageIn{
							Name: "reset",
						}
						
						w.Log("Sending message: "+msgDisconnect.Name)
						_, err := handler.HandleMessages(w, msgDisconnect)
						if err != nil {
							w.Log("[Disconnect] Error message: "+err.Error())
						}
						w.Log("Sending message: "+msgReset.Name)
						_, err = handler.HandleMessages(w, msgReset)
						if err != nil {
							w.Log("[Reset] Error message: "+err.Error())
							} else {
								err = bootstrap.SendMessage(w, "reset", nil)
								if err != nil {
									w.Log("[Bootstrap] Error sending reset message to frontend: "+err.Error())
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

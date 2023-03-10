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

// Constants
const htmlAbout = `This is the xx network cMix proxy app.`

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
			SubMenu: []*astilectron.MenuItemOptions{
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
				Width:           astikit.IntPtr(400),
			},
		}},
	}); err != nil {
		jww.FATAL.Printf("running bootstrap failed: %v", err)
	}
}

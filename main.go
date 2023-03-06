package main

import (
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"os/user"
	"path"
	"path/filepath"

	"github.com/asticode/go-astikit"
	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"
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
	// Create logger
	l := log.New(log.Writer(), log.Prefix(), log.Flags())

	// Turn on info logs
	jww.SetLogThreshold(jww.LevelInfo)

	var u *user.User
	var err error
	if u, err = user.Current(); err != nil {
		fmt.Printf("error: %s\n", err)
		return
	}
	appdata = path.Join(u.HomeDir, "Library", "Application Support", AppName)
	if _, err := os.Stat(appdata); err != nil && errors.Is(err, fs.ErrNotExist) {
		err = os.Mkdir(appdata, 0700)
		if err != nil {
			fmt.Printf("error: %s\n", err)
			return
		}
	}

	// Create log file, overwrites if existing
	logFile, err := os.Create(path.Join(appdata, "relay.log"))
	if err == nil {
		jww.SetLogOutput(logFile)
		jww.SetStdoutOutput(io.Discard)
		l.SetOutput(jww.DEBUG.Writer())
	} else {
		fmt.Printf("error: %s\n", err)
		l.Fatal(fmt.Errorf("running app failed: %w", err))
	}

	// Get resources path
	ex, err := os.Executable()
	if err != nil {
		l.Fatal(fmt.Errorf("running app failed: %w", err))
	}
	exPath := filepath.Dir(ex)
	resources = path.Join(exPath, "resources")

	// Parse flags
	flags.Parse(os.Args[1:])

	// New handler
	handler := NewHandler()

	// Run bootstrap
	l.Printf("Running app built at %s\n", BuiltAt)
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
		Logger: l,
		MenuOptions: []*astilectron.MenuItemOptions{{
			Label: astikit.StrPtr("File"),
			SubMenu: []*astilectron.MenuItemOptions{
				{
					Label: astikit.StrPtr("About"),
					OnClick: func(e astilectron.Event) (deleteListener bool) {
						if err := bootstrap.SendMessage(w, "about", htmlAbout, func(m *bootstrap.MessageIn) {
							// Unmarshal payload
							var s string
							if err := json.Unmarshal(m.Payload, &s); err != nil {
								l.Println(fmt.Errorf("unmarshaling payload failed: %w", err))
								return
							}
							l.Printf("About modal has been displayed and payload is %s!\n", s)
						}); err != nil {
							l.Println(fmt.Errorf("sending about event failed: %w", err))
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
				Height:          astikit.IntPtr(600),
				Width:           astikit.IntPtr(400),
			},
		}},
	}); err != nil {
		l.Fatal(fmt.Errorf("running bootstrap failed: %w", err))
	}
}

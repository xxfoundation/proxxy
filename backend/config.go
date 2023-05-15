package backend

import (
	"errors"
	"fmt"
	"io"
	"io/fs"
	"os"
	"path"
	"path/filepath"

	jww "github.com/spf13/jwalterweatherman"
)

// Backend configuration
type Config struct {
	// Dir for app data: log file and cMix state
	DataDir string
	// Logging prefix (RELAY)
	LogPrefix string
	// Mainnet cert file name
	CertFile string
	// NDF URL
	NdfUrl string
	// cMix state directory
	StatePath string
	// Number of retries to send message over cMix
	Retries int
	// HTTP server port
	Port int
}

func DefaultConfig(appname string) Config {
	// Get user config path
	dir, err := os.UserConfigDir()
	if err != nil {
		fmt.Printf("error getting user config dir: %s\n", err)
		panic(1)
	}
	// Initialize data dir
	datadir := path.Join(dir, appname)
	if _, err := os.Stat(datadir); err != nil && errors.Is(err, fs.ErrNotExist) {
		err = os.Mkdir(datadir, 0700)
		if err != nil {
			fmt.Printf("error creating config dir: %s\n", err)
			panic(1)
		}
	}
	// Get resources path
	ex, err := os.Executable()
	if err != nil {
		fmt.Printf("Error getting current path: %s\n", err)
		panic(1)
	}
	resources := path.Join(filepath.Dir(ex), "resources")
	return Config{
		DataDir:   datadir,
		LogPrefix: "RELAY",
		CertFile:  path.Join(resources, "mainnet.crt"),
		NdfUrl:    "https://elixxir-bins.s3.us-west-1.amazonaws.com/ndf/mainnet.json",
		StatePath: path.Join(datadir, "state"),
		Retries:   5,
		Port:      9296,
	}
}

func SetupLogging(datadir string) {
	// Create log file, overwrites if existing
	logFile, err := os.Create(path.Join(datadir, "relay.log"))
	if err == nil {
		jww.SetLogThreshold(jww.LevelInfo)
		jww.SetLogOutput(logFile)
		jww.SetStdoutOutput(io.Discard)
	} else {
		fmt.Printf("Error creating log file: %v\n", err)
		panic(1)
	}
}

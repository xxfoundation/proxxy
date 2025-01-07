# Proxxy

Proxxy is a project designed to provide a proxy service with enhanced features and functionalities. It leverages cmix technology and network to deliver a robust and efficient privacy solution for RPC communications.

Protect your privacy when using web3. With Proxxy, any wallet can integrate better privacy, in order to avoid metadata being collected by RPC providers. Proxxy is currently available as a desktop application seamlessly integrated with MetaMask.

## Project Structure

The project is organized into the following structure:

```
├── README.md                  // This file, containing the project description and documentation.
├── backend                    // Directory containing backend-related code and resources.
├── bind_darwin_amd64.go       // Go file for Darwin AMD64 architecture.
├── bind_darwin_arm64.go       // Go file for Darwin ARM64 architecture.
├── bind_linux_amd64.go        // Go file for Linux AMD64 architecture.
├── bind_linux_arm64.go        // Go file for Linux ARM64 architecture.
├── bind_windows_amd64.go      // Go file for Windows AMD64 architecture.
├── build.sh                   // Shell script for building the project.
├── bundler.json               // Configuration file for the bundler.
├── electron                   // Directory containing Electron-related code and resources.
├── go.mod                     // Go module file.
├── go.sum                     // Go dependencies checksum file.
├── main.go                    // The main entry point for the Go application.
├── output                     // Directory where build outputs are stored.
├── package-lock.json          // Lockfile for npm dependencies.
├── package.json               // Configuration file for npm dependencies.
├── resources                  // Directory containing additional resources.
├── webpage                    // Directory containing frontend web page code.
└── windows.syso               // Windows system file.
```

## Main Processes

The main processes of code in the workspace include:

- **Backend**: Located in the `/backend` folder, containing backend-related code and resources.
- **Electron App**: A desktop application located in the `/electron` folder.
- **Webpage**: The frontend web page located in the `/webpage` folder.
- **Resources**: Shared resources among the backend, Electron app, and webpage, located in the `/resources` folder.

## Main Dependencies

Some of the main dependencies used in this project include:

- **@electron/remote**: Provides remote module functionality for Electron.
- **@mui/icons-material**: Material UI icons for React.
- **@mui/styles**: Styling solution for Material UI.
- **prettier**: Code formatter for maintaining consistent code style.
- **electron**: Framework for building cross-platform desktop applications with JavaScript, HTML, and CSS.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Entry point to the DOM and server renderers for React.

For a complete list of dependencies, refer to the `package-lock.json` file.

## How to Build

Install the `astilectron-bundler`
```sh
go install github.com/asticode/go-astilectron-bundler/astilectron-bundler@latest
```

Clone this repository and navigate to its top level directory
```sh
git clone https://github.com/xx-labs/proxxy
cd proxxy
```

Run the build script `./build.sh`

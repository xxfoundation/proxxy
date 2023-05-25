#!/usr/bin/env bash

pushd electron
npm install
npm run build:renderer
popd
rm -rf resources/app
rm -f bind_*
rm -f windows.syso
rm -rf output/*
cp -r electron/release/app/dist/renderer resources/app
astilectron-bundler
pushd output
mv darwin-amd64/Proxxy.app Proxxy-mac-x64.app
mv darwin-arm64/Proxxy.app Proxxy-mac-arm64.app
mv linux-amd64/Proxxy Proxxy-linux-x64
mv linux-arm64/Proxxy Proxxy-linux-arm64
mv windows-amd64/Proxxy.exe Proxxy-win-x64.exe
rm -r darwin-amd64 darwin-arm64 linux-amd64 linux-arm64 windows-amd64
popd
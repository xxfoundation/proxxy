#!/usr/bin/env bash

pushd electron
npm install
npm run build
popd
rm -rf resources/app
cp -r electron/dist resources/app
astilectron-bundler
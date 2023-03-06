#!/usr/bin/env bash

pushd frontend
yarn
yarn build:renderer
popd
cp -r frontend/release/app/dist/renderer resources/app
astilectron-bundler
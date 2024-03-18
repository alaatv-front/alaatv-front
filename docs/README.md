# Quasar App (alaatv-front-vite)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

## env file
```bash
cp .env.example .env
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn ssr
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production (ssr)
```bash
yarn ci
yarn build:ssr
cd dist/ssr
yarn install
yarn start
```

if you see the following error:
```text
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```
use the following command:
```bash
export NODE_OPTIONS=--max-old-space-size=32768
```
this error because of "sourcemap: true" in quasar.config.js.

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Release Android App To Play Store

### Enviroment variables needed for release

first set environment variables needed for release:

ENV | description
---- | ----
ANDROID_VERSION_CODE | An integer showing version code of new release
ANDROID_VERSION_NAME | A string showing version name of new release
ANDROID_KEYSTORE_PATH | Path to application keystore
ANDROID_STORE_PASS | Store password
ANDROID_ALIAS | Alias of application
ANDROID_KEY_PASS | Key password
SERVICE_ACCOUNT_FILE_PATH | Path to service account key file

### Build Steps
1. Install npm packages:
    
    ```
    yarn install --frozen-lock
    ```
1. Generate bundle and apk of application release:

    ```
    npm run build:android
    ```
1. Run script for releaseing application:

    ```
    ./release/release_android.js
    ```
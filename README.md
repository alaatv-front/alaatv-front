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

/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

/* eslint-env node */
// const ESLintPlugin = require('eslint-webpack-plugin')
const { configure } = require('quasar/wrappers')
// const path = require('path')
const { generateWidgetList } = require('./src/widgetListGetter/index')
require('dotenv').config()

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli/supporting-ts
    // supportTS: false,

    eslint: {
      warnings: true,
      errors: true
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: [
      'VuexPersistedState', // load store from localstorage to use in other boots (ex: accessToken in axios boot)
      // 'i18n',
      'icon',
      'axios',
      'appConfig',
      'middleware',
      'bus',
      'breadcrumbs',
      'api-gateway',
      'registerQPageBuilder',
      'routesLayoutConfigs',
      'GetRouteSettingFromServer',
      'enums',
      'PhosphorIcons',
      'gtm',
      'PhosphorIcons',
      'ewano',
      'androidGetOldDb'
      // 'sentry'
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      productName: 'آموزش مجازی آلاء',
      transpile: true,
      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      transpileDependencies: [
        'js-abstract-model',
        'quasar-template-builder',
        'quasar-ui-q-page-builder'
      ],

      rtl: true, // https://v2.quasar.dev/options/rtl-support
      preloadChunks: true,
      showProgress: true,
      sourcemap: false,
      gzip: true,
      analyze: false,
      // publicPath: (process.env.ASSET_SERVE === 'remote') ? (process.env.NODES_SERVER_URL_SSL || '/') : '/',
      // publicPath: '/',
      env: process.env,
      extendViteConf(viteConf, { isServer, isClient }) {
        // Set the base URL based on the environment
        if (process.env.ASSET_SERVE === 'remote') {
          viteConf.base = process.env.NODES_SERVER_URL_SSL || '/'
        }
      },
      beforeDev({ quasarConf }) {
        generateWidgetList('./src/components/Widgets')
      },
      beforeBuild({ quasarConf }) {
        generateWidgetList('./src/components/Widgets')
      },

      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },
      minify: true,
      polyfillModulePreload: true,
      vitePlugins: []
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      https: false,
      // host: "0.0.0.0",
      hmr: {
        port: process.env.DEV_HMR_PORT,
        path: '/socket.io',
        clientPort: process.env.DEV_HMR_CLIENT_PORT
      },
      port: process.env.DEV_PORT,
      open: true, // opens browser window automatically
      proxy: {
        // '/socket.io': {
        //   target: process.env.SOCKET_SERVER,
        //   ws: true
        // },
        [process.env.ALAA_MINIO]: {
          target: process.env.ALAA_MINIO_SERVER,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp('^' + process.env.ALAA_MINIO), '') // vite
          // pathRewrite: { // webpack
          //   ['^' + process.env.ALAA_API_V2]: ''
          // }
        },
        [process.env.ALAA_API_V2]: {
          target: process.env.ALAA_API_V2_SERVER,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp('^' + process.env.ALAA_API_V2), '') // vite
          // pathRewrite: { // webpack
          //   ['^' + process.env.ALAA_API_V2]: ''
          // }
        },
        [process.env.ALAA_API_V1]: {
          target: process.env.ALAA_API_V1_SERVER,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp('^' + process.env.ALAA_API_V1), '') // vite
          // pathRewrite: { // webpack
          //   ['^' + process.env.ALAA_API_V1]: ''
          // }
        },
        [process.env.ALAA_WEB]: {
          target: process.env.ALAA_WEB_SERVER,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp('^' + process.env.ALAA_WEB), '') // vite
          // pathRewrite: { // webpack
          //   ['^' + process.env.ALAA_WEB]: ''
          // }
        }
      }
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {
        notify: {
          timeout: 5000,
          position: 'top',
          // multiLine: true,
          classes: 'default-notify-class'
        },
        capacitor: {
          iosStatusBarPadding: true, // add the dynamic top padding on iOS mobile devices

          // Quasar handles app exit on mobile phone back button.
          // backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

          // On the other hand, the following completely
          // disables Quasar's back button management.
          backButton: true
        }
      },
      cssAddon: true,

      iconSet: 'material-icons', // Quasar icon set
      lang: 'fa', // Quasar language pack (en-US)

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Meta',
        'Notify',
        'Loading',
        'Dialog',
        'Cookies' // for cart
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],
    // animations: 'all',

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    sourceFiles: {
      //   rootComponent: 'src/App.vue',
      //   router: 'src/router/index',
      //   store: 'src/store/index',

      pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
      pwaServiceWorker: 'src-pwa/custom-service-worker',
      pwaManifestFile: 'src-pwa/manifest.json'

      //   electronMain: 'src-electron/electron-main',
      //   electronPreload: 'src-electron/electron-preload'
    },

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: true,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: process.env.SSR_PORT, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      // maxAge: 1000 * 60 * 60 * 24 * 30,
      maxAge: 1,
      // Tell browser when a file from the server should expire from cache (in ms)

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'injectManifest', // 'generateSW' or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      extendGenerateSWOptions(cfg) {
        cfg.skipWaiting = false
        cfg.clientsClaim = false
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      // (Optional!)
      hideSplashscreen: false, // disables auto-hiding the Splashscreen by Quasar CLI

      // (Optional!)
      capacitorCliPreparationParams: ['sync', ctx.targetName]
    },
    bin: {
      linuxAndroidStudio: process.env.LINUX_ANDROID_STUDIO
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {},

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'alaatv-front-vite'
      },

      // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
      bex: {
        contentScripts: [
          'my-content-script'
        ]
      }
    }
  }
})

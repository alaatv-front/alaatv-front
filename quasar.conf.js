/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
const ESLintPlugin = require('eslint-webpack-plugin')
const { configure } = require('quasar/wrappers')
const path = require('path')
const { generateWidgetList } = require('./src/widgetListGetter/index')

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: [
      'i18n',
      'icon',
      'axios',
      'appConfig',
      'middleware',
      'breadcrumbs',
      'api-gateway',
      'registerQPageBuilder',
      'routesLayoutConfigs'
    ],

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
      // 'flatIcon.css',
      // '../../public/fonts/Iconsax/style.css'
      // 'src/assets/scss/app.scss',
      // 'src/assets/scss/IRANSansFont.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v6',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'ionicons-v4',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
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
      gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      env: require('dotenv').config().parsed,

      // vueLoaderOptions: {
      //   compilerOptions: {
      //     isCustomElement: (tag) => tag.startsWith('q-'),
      //   }
      // },

      // https://v2.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack (chain, { isServer, isClient }) {
        // const hashh = '[id].[name].[chunkhash]'
        // chain.output.filename('js/[name]/' + hashh + '.bundle.js')
        // chain.output.chunkFilename('js/[name]/' + hashh + '.chunk.js')
        // chain.plugin('eslint-webpack-plugin')
        //   .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
        // chain.module.rule('fonts')
        //   .use('url-loader')
        //   .tap((options) => {
        //     options.name = 'fonts/[path][name].[ext]'
        //     return options
        //   })

        // disable cache for prod only, remove the if to disable it everywhere
        // if (process.env.NODE_ENV === 'production') {
        chain.module.rule('vue').uses.delete('cache-loader')
        chain.module.rule('js').uses.delete('cache-loader')
        chain.module.rule('ts').uses.delete('cache-loader')
        chain.module.rule('tsx').uses.delete('cache-loader')
        // }

        // chain.plugin('friendly-errors').tap(args => {
        //   // the actual transformer defined by vue-cli-3
        //   const vueCli3Transformer = args[0].additionalTransformers[0]
        //   args[0].additionalTransformers = [
        //     // use the actual transformer
        //     vueCli3Transformer,
        //     // add an other transformer that 'empty' the desired error
        //     error => {
        //       const regexp = /\[mini-css-extract-plugin\]\nConflicting order between:/
        //       if (regexp.test(error.message)) return {}
        //       return error
        //     }
        //   ]
        //   return args
        // })
      },
      extendWebpack (cfg, { isServer, isClient }) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          'root': path.resolve(__dirname, './src'),
          // '@': path.resolve(__dirname,'./src'),
          // '~': path.resolve(__dirname, './src'),

          // This will make sure that the hosting test app is pointing to only one instance of vue.
          vue: path.resolve(__dirname, './node_modules/vue')
          // vue: path.resolve('./node_modules/vue')
        }

        cfg.watchOptions = {
          aggregateTimeout: 200,
          poll: 1000
        }

        // cfg.plugins.push(new CopyWebpackPlugin({
        //   patterns: [
        //     {
        //       // from: './src-pwa/firebase-messaging-sw.js',
        //       from: path.resolve('./src/ServiceWorker/firebase-messaging-sw.js'),
        //       to: path.resolve('./dist/pwa/firebase-messaging-sw.js')
        //     }
        //   ]
        // }))
      },
      beforeDev({ quasarConf }) {
        generateWidgetList('./src/components/Widgets')
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8083,
      open: true, // opens browser window automatically
      proxy: {
        [process.env.ALAA_API_V2]: {
          target: process.env.ALAA_API_V2_SERVER,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            ['^' + process.env.ALAA_API_V2]: ''
          }
        },
        [process.env.ALAA_API_V1]: {
          target: process.env.ALAA_API_V1_SERVER,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            ['^' + process.env.ALAA_API_V1]: ''
          }
        },
        [process.env.ALAA_WEB]: {
          target: process.env.ALAA_WEB_SERVER,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            ['^' + process.env.ALAA_WEB]: ''
          }
        }
      }
    },
    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
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
        'Notify',
        'Loading',
        'Dialog',
        'Cookies'
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: 'all',

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      // maxAge: 1000 * 60 * 60 * 24 * 30,
      maxAge: 1,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
        // disable cache for prod only, remove the if to disable it everywhere
        // if (process.env.NODE_ENV === 'production') {
        chain.module.rule('vue').uses.delete('cache-loader')
        chain.module.rule('js').uses.delete('cache-loader')
        chain.module.rule('ts').uses.delete('cache-loader')
        chain.module.rule('tsx').uses.delete('cache-loader')
        // }
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      manifest: {
        name: 'مدرسه آنلاین آلاء',
        short_name: 'آلاء',
        background_color: '#FFFFFF',
        theme_color: '#ffc107',
        description: 'آموزش مجازی آلاء',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
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
      linuxAndroidStudio: '/snap/android-studio/current/android-studio/bin/studio.sh'
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        appId: '3a'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackMain (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      }
    }
  }
})

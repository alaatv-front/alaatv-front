/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

// Import necessary workbox libraries
import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

// Ensure the service worker takes control of the page as soon as possible.
self.skipWaiting()
clientsClaim()

// Define placeholders for environment variables
const ASSET_SERVE = '__ASSET_SERVE__'
const NODES_SERVER_URL_SSL = '__NODES_SERVER_URL_SSL__'
const MODE = '__MODE__'
const PROD = '__PROD__'
const PWA_FALLBACK_HTML = '__PWA_FALLBACK_HTML__'

// Extract the origin from NODES_SERVER_URL_SSL for asset matching
const ASSET_ORIGIN = new URL(NODES_SERVER_URL_SSL).origin

// Define fallback URLs for different asset types
const FALLBACK_IMAGE = '/path-to-default-image.jpg'
const FALLBACK_SCRIPT = '/path-to-default-script.js'
const FALLBACK_STYLE = '/path-to-default-style.css'

// Sort the manifest to prioritize prefetching of JS, then CSS, then fonts, then others
const sortedManifest = self.__WB_MANIFEST.sort((a, b) => {
  const getFilePriority = (url) => {
    if (url.endsWith('.js')) return 1
    if (url.endsWith('.css')) return 2
    if (url.endsWith('.woff') || url.endsWith('.woff2') || url.endsWith('.ttf')) return 3
    return 4
  }
  return getFilePriority(a.url) - getFilePriority(b.url)
})

// Determine if the app is running in standalone (PWA) mode or in a browser
const isStandalone = (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.includes('android-app://'))

// If in standalone mode, prefetch all resources; otherwise, limit to the first 200
const resourcesToPrefetch = isStandalone ? sortedManifest : sortedManifest.slice(0, 200)

// Adjust the manifest based on the asset serving mode (remote or local)
if (ASSET_SERVE === 'remote') {
  const prefix = NODES_SERVER_URL_SSL
  const adjustedManifest = resourcesToPrefetch.map(entry => {
    return { ...entry, url: `${prefix}${entry.url}` }
  })
  precacheAndRoute(adjustedManifest)
} else {
  precacheAndRoute(resourcesToPrefetch)
}

// Clean up outdated caches
cleanupOutdatedCaches()

// Define a strategy to serve stale content while revalidating in the background
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate()
)

// Define a Cache First, then Network strategy for assets
registerRoute(
  ({ url }) => url.origin === ASSET_ORIGIN,
  new CacheFirst({
    cacheName: 'alaatv-assets',
    plugins: [
      {
        fetchDidFail: async ({ originalRequest }) => {
          // This callback is triggered whenever a network request fails
          const cache = await caches.open('alaatv-assets')
          const response = await fetch(originalRequest)
          if (response && response.status === 200) {
            await cache.put(originalRequest, response.clone())
            return response
          } else {
            // Handle different fallbacks based on the request type
            switch (originalRequest.destination) {
              case 'image':
                return caches.match(FALLBACK_IMAGE)
              case 'script':
                return caches.match(FALLBACK_SCRIPT)
              case 'style':
                return caches.match(FALLBACK_STYLE)
            }
          }
        }
      },
      // Ensure that only cacheable responses are cached
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      // Optionally, limit the number of entries in cache and set a max age
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (MODE !== 'ssr' || PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  )
}

/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

self.skipWaiting()
clientsClaim()

// These will be placeholders that we'll replace during the build process
const ASSET_SERVE = '__ASSET_SERVE__'
const NODES_SERVER_URL_SSL = '__NODES_SERVER_URL_SSL__'
const MODE = '__MODE__'
const PROD = '__PROD__'
const PWA_FALLBACK_HTML = '__PWA_FALLBACK_HTML__'

// Extract the origin from NODES_SERVER_URL_SSL
const ASSET_ORIGIN = new URL(NODES_SERVER_URL_SSL).origin

// Define fallbacks
const FALLBACK_IMAGE = '/path-to-default-image.jpg'
const FALLBACK_SCRIPT = '/path-to-default-script.js'
const FALLBACK_STYLE = '/path-to-default-style.css'

// sort prefetch array ( js then css then fonts then others
const sortedManifest = self.__WB_MANIFEST.sort((a, b) => {
  const getFilePriority = (url) => {
    if (url.endsWith('.js')) return 1
    if (url.endsWith('.css')) return 2
    if (url.endsWith('.woff') || url.endsWith('.woff2') || url.endsWith('.ttf')) return 3
    return 4
  }

  return getFilePriority(a.url) - getFilePriority(b.url)
})

// Limit the number of resources prefetched by the service worker
const MAX_PREFETCH = 200
const limitedResources = sortedManifest.slice(0, MAX_PREFETCH)

if (ASSET_SERVE === 'remote') {
  const prefix = NODES_SERVER_URL_SSL
  const adjustedManifest = limitedResources.map(entry => {
    return { ...entry, url: `${prefix}${entry.url}` }
  })
  precacheAndRoute(adjustedManifest)
} else {
  precacheAndRoute(limitedResources)
}

cleanupOutdatedCaches()

// Strategy to serve stale content while revalidating in the background
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate()
)

// Use Cache First, then Network strategy for assets
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

/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

// Import necessary workbox libraries
import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
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
const CACHE_VERSION = '__CACHE_VERSION__' // Placeholder for cache version

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
const isStandalone = self.clients.matchAll({ includeUncontrolled: true, type: 'window' })
  .then(clientList => {
    for (const client of clientList) {
      if (client?.url?.includes('display-mode=standalone')) {
        return true
      }
    }
    return false
  })

// If in standalone mode, prefetch all resources; otherwise, limit to the first 200
const resourcesToPrefetch = isStandalone ? sortedManifest : sortedManifest.slice(0, 200)

// Adjust the manifest based on the asset serving mode (remote or local)
let resourcesToCache
if (ASSET_SERVE === 'remote') {
  const prefix = NODES_SERVER_URL_SSL
  resourcesToCache = resourcesToPrefetch.map(entry => {
    return { ...entry, url: `${prefix}${entry.url}` }
  })
} else {
  resourcesToCache = resourcesToPrefetch
}

// Try to precache resources and handle any errors
precacheAndRoute(resourcesToCache).catch(error => {
  console.error('Error during precaching:', error)
  // Handle the error or provide a fallback mechanism here
})

// Clean up outdated caches based on the CACHE_VERSION
cleanupOutdatedCaches()

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Define a strategy to serve stale content while revalidating in the background
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate()
)

// Define a Cache First, then Network strategy for assets
registerRoute(
  ({ url }) => url.origin === ASSET_ORIGIN,
  new CacheFirst({
    cacheName: `alaatv-assets-${CACHE_VERSION}`, // Use the CACHE_VERSION to version the cache
    plugins: [
      {
        fetchDidFail: async ({ originalRequest }) => {
          // This callback is triggered whenever a network request fails
          const cache = await caches.open(`alaatv-assets-${CACHE_VERSION}`)
          const response = await fetch(originalRequest)
          if (response && response.status === 200) {
            await cache.put(originalRequest, response.clone())
            return response
          }
          // If the fallback is also not in the cache, provide a generic response
          let res
          switch (originalRequest.destination) {
            case 'image':
              res = await caches.match(FALLBACK_IMAGE)
              if (!res || res.status !== 200) {
                // Return a 1x1 transparent pixel as a fallback for images
                res = new Response(
                  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                  { headers: { 'Content-Type': 'image/gif' } }
                )
              }
              break
            case 'script':
              res = await caches.match(FALLBACK_SCRIPT)
              if (!res || res.status !== 200) {
                // Return an empty script
                res = new Response('', { headers: { 'Content-Type': 'text/javascript' } })
              }
              break
            case 'style':
              res = await caches.match(FALLBACK_STYLE)
              if (!res || res.status !== 200) {
                // Return an empty stylesheet
                res = new Response('', { headers: { 'Content-Type': 'text/css' } })
              }
              break
            default:
              // Return a generic message for other types
              res = new Response('Resource not available', { status: 404 })
              break
          }
          return res
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

/**
 * Cache the PWA_FALLBACK_HTML during the install event.
 * This ensures it's available offline.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(`app-shell-${CACHE_VERSION}`).then((cache) => { // Use the CACHE_VERSION to version the cache
      return cache.add(PWA_FALLBACK_HTML)
    }).catch(error => {
      console.error(`Failed to cache PWA_FALLBACK_HTML: ${error.message}`)
    })
  )
})

/**
 * Handle navigation requests.
 * If in SSR mode or production, use the PWA_FALLBACK_HTML.
 * If the fallback HTML is not in cache or is empty, provide a generic response.
 */
if (MODE !== 'ssr' || PROD) {
  registerRoute(
    new NavigationRoute(
      async ({ event }) => {
        try {
          if (PWA_FALLBACK_HTML && PWA_FALLBACK_HTML.trim() !== '') {
            const cache = await caches.open(`app-shell-${CACHE_VERSION}`) // Use the CACHE_VERSION to version the cache
            const cachedResponse = await cache.match(PWA_FALLBACK_HTML)
            if (cachedResponse) {
              return cachedResponse
            }
            throw new Error('PWA_FALLBACK_HTML not found in cache')
          } else {
            throw new Error('PWA_FALLBACK_HTML is empty')
          }
        } catch (error) {
          console.error('Error fetching PWA_FALLBACK_HTML:', error.message)
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/html' })
          })
        }
      },
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  )
}

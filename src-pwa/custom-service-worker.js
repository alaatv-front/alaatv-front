/* eslint-env serviceworker */

/**
 * Service Worker Script for PWA.
 * This script is picked up by the build system only if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest".
 */

// Import necessary workbox libraries
import {
  clientsClaim,
  skipWaiting
} from 'workbox-core'
import {
  cleanupOutdatedCaches
} from 'workbox-precaching'
import {
  registerRoute,
  NavigationRoute
} from 'workbox-routing'
import {
  StaleWhileRevalidate,
  CacheFirst
} from 'workbox-strategies'
import {
  CacheableResponsePlugin
} from 'workbox-cacheable-response'
import {
  ExpirationPlugin
} from 'workbox-expiration'

// Immediately claim any clients, ensuring that the current service worker controls them.
skipWaiting()
clientsClaim()

// Environment Variables
const ASSET_SERVE = '__ASSET_SERVE__'
const NODES_SERVER_URL_SSL = '__NODES_SERVER_URL_SSL__'
const MODE = '__MODE__'
const PROD = '__PROD__'
const PWA_FALLBACK_HTML = '__PWA_FALLBACK_HTML__'
const CACHE_VERSION = '__CACHE_VERSION__'

// Extract the origin from NODES_SERVER_URL_SSL for asset matching
const ASSET_ORIGIN = new URL(NODES_SERVER_URL_SSL).origin

// Fallback URLs for different asset types
const FALLBACKS = {
  image: '/path-to-default-image.jpg',
  script: '/path-to-default-script.js',
  style: '/path-to-default-style.css'
}

// Sort the manifest based on asset type priority
const sortedManifest = self.__WB_MANIFEST.sort((a, b) => {
  const priorities = {
    '.js': 1,
    '.css': 2,
    '.woff': 3,
    '.woff2': 3,
    '.ttf': 3
  }
  const getPriority = url => priorities[url.slice(url.lastIndexOf('.'))] || 4
  return getPriority(a.url) - getPriority(b.url)
})

// Determine resources to prefetch based on app mode
const resourcesToPrefetch = (async () => {
  const clientList = await self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  })
  return clientList.some(client => client?.url?.includes('display-mode=standalone')) ? sortedManifest : sortedManifest.slice(0, 200)
})()

// Adjust the manifest based on the asset serving mode (remote or local)
const resourcesToCache = ASSET_SERVE === 'remote'
  ? resourcesToPrefetch.map(entry => ({
    ...entry,
    url: `${NODES_SERVER_URL_SSL}${entry.url}`
  }))
  : resourcesToPrefetch

// Manually precache resources
const cacheResources = async () => {
  const cache = await caches.open(workbox.core.cacheNames.precache)
  for (const resource of resourcesToCache) {
    try {
      await cache.add(resource.url)
    } catch (error) {
      console.error(`Error caching resource ${resource.url}:`, error)
    }
  }
}

cacheResources()

// Set up routing for the manually cached resources
registerRoute(
  ({ request }) => resourcesToCache.some(resource => request.url.includes(resource.url)),
  new CacheFirst({
    cacheName: workbox.core.cacheNames.precache,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

// Clean up outdated caches
cleanupOutdatedCaches()

// Remove old caches that don't match the current CACHE_VERSION
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => cacheName !== CACHE_VERSION).map(caches.delete)
    ))
  )
})

// Strategy: Serve stale content while revalidating in the background for scripts and styles
registerRoute(
  ({ request }) => ['script', 'style'].includes(request.destination),
  new StaleWhileRevalidate()
)

// Strategy: Cache First, then Network for assets
registerRoute(
  ({ url }) => url.origin === ASSET_ORIGIN,
  new CacheFirst({
    cacheName: `alaatv-assets-${CACHE_VERSION}`,
    plugins: [
      {
        fetchDidFail: async ({ originalRequest }) => {
          const cache = await caches.open(`alaatv-assets-${CACHE_VERSION}`)
          const response = await fetch(originalRequest)
          if (response && response.status === 200) {
            await cache.put(originalRequest, response.clone())
            return response
          }
          const fallback = FALLBACKS[originalRequest.destination]
          return caches.match(fallback) || new Response('Resource not available', {
            status: 404
          })
        }
      },
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

// Cache the PWA_FALLBACK_HTML during the install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(`app-shell-${CACHE_VERSION}`).then(cache => cache.add(PWA_FALLBACK_HTML))
  )
})

// Handle navigation requests
if (MODE !== 'ssr' || PROD) {
  registerRoute(
    new NavigationRoute(
      async () => {
        const cache = await caches.open(`app-shell-${CACHE_VERSION}`)
        const cachedResponse = await cache.match(PWA_FALLBACK_HTML)
        if (cachedResponse) return cachedResponse
        return new Response('<h1>Service Unavailable</h1>', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/html'
          })
        })
      }, {
        denylist: [/sw\.js$/, /workbox-(.)*\.js$/]
      }
    )
  )
}

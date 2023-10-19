/* eslint-env serviceworker */

/**
 * Service Worker Script for PWA.
 * This script is picked up by the build system only if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest".
 */

// Import necessary workbox libraries
import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

// Immediately claim any clients, ensuring that the current service worker controls them.
self.skipWaiting()
clientsClaim()

// Placeholder variables for environment-specific values
const ASSET_SERVE = '__ASSET_SERVE__'
const NODES_SERVER_URL_SSL = '__NODES_SERVER_URL_SSL__'
const MODE = '__MODE__'
const PROD = '__PROD__'
const PWA_FALLBACK_HTML = '__PWA_FALLBACK_HTML__'
const CACHE_VERSION = '__CACHE_VERSION__'

// Extract the origin from NODES_SERVER_URL_SSL for asset matching
let ASSET_ORIGIN = ''
try {
  ASSET_ORIGIN = new URL(NODES_SERVER_URL_SSL).origin
} catch (err) {
  console.error('Invalid URL for ASSET_ORIGIN (check env variables):', err)
}
const alaatvCacheName = `alaatv-assets-${CACHE_VERSION}`
const appShellCacheName = `alaatv-shell-${CACHE_VERSION}`
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
}).filter(item => {
  const priorities = {
    '.js': true,
    '.css': true,
    '.woff': true,
    '.woff2': true,
    '.ttf': true
  }
  const canCache = url => priorities[url.slice(url.lastIndexOf('.'))] || false
  return canCache(item.url)
})

// Determine resources to prefetch based on app mode
const resourcesToPrefetch = (async () => {
  const clientList = await self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  })
  return clientList.some(client => client?.url?.includes('display-mode=standalone'))
    ? sortedManifest
    : sortedManifest.slice(0, 200)
})()
async function fetchFromNetworkThenCatch (originalRequest, cache) {
  const response = await fetch(originalRequest)
  try {
    await cache.put(originalRequest, response.clone())
    return response
  } catch (error) {
    console.error(`fetchFromNetworkThenCatch > Error put cache ${originalRequest}:`, error)
  }
}

// Manually precache resources
const cacheResources = async () => {
  try {
    const resolvedResourcesToPrefetch = await resourcesToPrefetch
    // Adjust the manifest based on the asset serving mode (remote or local)
    const resourcesToCache = ASSET_SERVE === 'remote'
      ? resolvedResourcesToPrefetch.map(entry => ({
        ...entry,
        url: `${NODES_SERVER_URL_SSL}${entry.url}`
      }))
      : resolvedResourcesToPrefetch

    try {
      const cache = await caches.open(alaatvCacheName)
      for (const resource of resourcesToCache) {
        try {
          await cache.add(resource.url)
        } catch (error) {
          console.error(`Error caching resource ${resource.url}:`, error)
        }
      }

      // Set up routing for the manually cached resources
      registerRoute(
        ({ request }) => resourcesToCache.some(resource => request.url.includes(resource.url)),
        new CacheFirst({
          cacheName: alaatvCacheName,
          plugins: [
            new ExpirationPlugin({
              maxEntries: 1000,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            })
          ]
        })
      )
    } catch (err) {
      console.error('Error open caches:', err)
    }
  } catch (err) {
    console.error('Error resourcesToPrefetch:', resourcesToPrefetch, err)
  }
}

//cacheResources()

// Cache the PWA_FALLBACK_HTML during the install event
self.addEventListener('install', (event) => {
  //event.waitUntil(cacheResources())

  try {
    event.waitUntil(
      caches.open(appShellCacheName).then(cache => cache.add(PWA_FALLBACK_HTML))
    )
  } catch (e) {
    console.error(`error in ${appShellCacheName}: `, e)
  }
})

// Clean up outdated caches
cleanupOutdatedCaches()

// Remove old caches that don't match the current CACHE_VERSION
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => (cacheName.startsWith('alaatv-assets') && cacheName !== alaatvCacheName) ||
        (cacheName.startsWith('alaatv-shell') && cacheName !== appShellCacheName))
        .map(cacheName => caches.delete(cacheName))
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
    cacheName: alaatvCacheName,
    plugins: [
      {
        fetchDidFail: async ({ originalRequest }) => {
          try {
            const cache = await caches.open(alaatvCacheName)
            try {
              return await fetchFromNetworkThenCatch(originalRequest, cache)
            } catch (error) {
              console.error(`Error put cache ${originalRequest}:`, error)
            }
          } catch (error) {
            console.error(`Error open caches ${alaatvCacheName}:`, error)
          }
        }
      },
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 10000,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

// Handle navigation requests
if (MODE !== 'ssr' || PROD) {
  registerRoute(
    new NavigationRoute(
      async ({ event }) => {
        try {
          const cache = await caches.open(appShellCacheName)
          try {
            const cachedResponse = await cache.match(PWA_FALLBACK_HTML)
            if (cachedResponse) {
              return cachedResponse
            } else {
              try {
                return await fetchFromNetworkThenCatch(PWA_FALLBACK_HTML, cache)
              } catch (error) {
                console.error(`NavigationRoute -> Error put cache ${PWA_FALLBACK_HTML}:`, error)
                event.waitUntil(Promise.resolve()) // Ensure the service worker doesn't terminate prematurely.
              }
              // return createHandlerBoundToURL(PWA_FALLBACK_HTML)
            }
          } catch (e) {
            console.error('NavigationRoute -> cache.match: ', e)
            event.waitUntil(Promise.resolve()) // Ensure the service worker doesn't terminate prematurely.
          }
        } catch (e) {
          console.error('NavigationRoute: PWA_FALLBACK_HTML Error:', e)
          event.waitUntil(Promise.resolve()) // Ensure the service worker doesn't terminate prematurely.
        }
      }, {
        denylist: [/sw\.js$/, /workbox-(.)*\.js$/]
      }
    )
  )
}

/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'

self.skipWaiting()
clientsClaim()

// Use with precache injection
// These will be placeholders that we'll replace during the build process
const ASSET_SERVE = '__ASSET_SERVE__';
const NODES_SERVER_URL_SSL = '__NODES_SERVER_URL_SSL__';

if (ASSET_SERVE === 'remote') {
  const prefix = NODES_SERVER_URL_SSL;
  const adjustedManifest = self.__WB_MANIFEST.map(entry => {
    return { ...entry, url: `${prefix}${entry.url}` };
  });
  precacheAndRoute(adjustedManifest);
} else {
  precacheAndRoute(self.__WB_MANIFEST);
}


cleanupOutdatedCaches()

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  )
}

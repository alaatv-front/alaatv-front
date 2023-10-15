// replace the placeholders in the service worker with the actual environment variables during the build process.
const fs = require('fs')
const path = require('path')

// Define the path to the service worker file
const serviceWorkerPath = path.join(__dirname, 'src-pwa', 'custom-service-worker.js')

// Read the content of the service worker file
let serviceWorkerContent = fs.readFileSync(serviceWorkerPath, 'utf-8')

// Replace placeholders with actual environment variables
// Note: Ensure that these environment variables are available in your CI/CD pipeline or build environment
serviceWorkerContent = serviceWorkerContent.replace('__ASSET_SERVE__', process.env.ASSET_SERVE || '')
serviceWorkerContent = serviceWorkerContent.replace('__NODES_SERVER_URL_SSL__', process.env.NODES_SERVER_URL_SSL || '')
serviceWorkerContent = serviceWorkerContent.replace('__MODE__', process.env.MODE || '')
serviceWorkerContent = serviceWorkerContent.replace('__PROD__', process.env.PROD || '')
serviceWorkerContent = serviceWorkerContent.replace('__PWA_FALLBACK_HTML__', process.env.PWA_FALLBACK_HTML || '')

// Write the modified content back to the service worker file
fs.writeFileSync(serviceWorkerPath, serviceWorkerContent)

console.log('Environment variables injected into custom-service-worker.js')

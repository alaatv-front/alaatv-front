// replace the placeholders in the service worker with the actual environment variables during the build process.
const fs = require('fs')
const path = require('path')

const swFilePath = path.join(__dirname, 'src-pwa', 'custom-service-worker.js')

// Read the service worker file
let swContent = fs.readFileSync(swFilePath, 'utf-8')

// Replace placeholders with environment variables
swContent = swContent.replace('__ASSET_SERVE__', process.env.ASSET_SERVE || 'local')
swContent = swContent.replace('__NODES_SERVER_URL_SSL__', process.env.NODES_SERVER_URL_SSL || '/')

// Write the modified content back to the service worker file
fs.writeFileSync(swFilePath, swContent)

console.log('Injected environment variables into service worker.')

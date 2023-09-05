import { boot } from 'quasar/wrappers'

const raychatToket = process.env.RAYCHAT_TOKEN

const loadRaychatScript = function (raychatToket) {
  if (typeof window === 'undefined' || !raychatToket) {
    return
  }
  window.RAYCHAT_TOKEN = raychatToket;
  (function () {
    const d = document
    const s = d.createElement('script')
    s.src = 'https://widget-react.raychat.io/install/widget.js'
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)
  })()
}

export default boot(() => {
  loadRaychatScript(raychatToket)
})

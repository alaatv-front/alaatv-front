export default class GTMBase {
  constructor(options = {
    debugMode: false
  }) {
    if (!window) {
      console.error('window in not defined and for AEE you need window')
      return
    }
    window.dataLayer = window.dataLayer || []
    this.debugMode = (process.env.APP_ENV === 'development') || options.debugMode
  }

  pushEvent (eventObject) {
    if (!window) {
      return
    }
    window.dataLayer.push(eventObject)
    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('event pushed: ' + eventObject.event, eventObject)
    }
  }
}

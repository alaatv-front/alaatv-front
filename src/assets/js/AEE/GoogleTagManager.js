export default class GTMBase {
  constructor (options = {
    debugMode: false
  }) {
    if (typeof window === 'undefined') {
      // console.trace('warn: window in not defined and for AEE you need window')
    } else {
      window.dataLayer = window.dataLayer || []
    }
    this.debugMode = (process.env.APP_ENV === 'development') || options.debugMode
  }

  pushEvent (eventObject) {
    if (typeof window === 'undefined') {
      return
    }
    window.dataLayer.push(eventObject)
    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('event pushed: ' + eventObject.event, eventObject)
    }
  }
}

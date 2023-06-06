export default class GTMBase {
  constructor(options = {
    debugMode: false
  }) {
    window.dataLayer = window.dataLayer || []
    this.debugMode = options.debugMode
  }

  pushEvent (eventObject) {
    window.dataLayer.push(eventObject)
    if (this.debugMode) {
      // eslint-disable-next-line no-console
      console.log('event pushed: ' + eventObject.event, eventObject)
    }
  }
}

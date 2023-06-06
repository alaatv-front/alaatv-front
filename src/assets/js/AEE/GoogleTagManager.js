export default class GTMBase {
  constructor() {
    window.dataLayer = window.dataLayer || []
  }

  pushEvent (eventObject) {
    window.dataLayer.push(eventObject)
  }
}

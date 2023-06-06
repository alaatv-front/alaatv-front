import GTMEvents from 'assets/js/AEE/GoogleAnalyticsEnhancedEcommerce.js'

export default class AEE {
  constructor(options = {
    reportGtmEecOnConsole: false
  }) {
    this.reportGtmEecOnConsole = options.reportGtmEecOnConsole
    this.GTMEvents = new GTMEvents()
  }

  productDetailViews(actionFieldList, product) {
    this.GTMEvents.action_productDetailViews(actionFieldList, product)
  }

  productAddToCart(actionFieldList, products) {
    this.GTMEvents.action_productAddToCart(actionFieldList, products)
  }

  productRemoveFromCart(actionFieldList, product) {
    this.GTMEvents.action_productRemoveFromCart(actionFieldList, product)
  }

  checkout(step, option, products) {
    this.GTMEvents.action_checkout(step, option, products)
  }

  checkoutOption(step, option) {
    this.GTMEvents.action_checkoutOption(step, option)
  }

  purchase(actionField, products) {
    this.GTMEvents.action_purchase(actionField, products)
  }

  impressionView(impressions) {
    this.GTMEvents.impression_view(impressions, this.reportGtmEecOnConsole)
  }

  impressionViewSingleItem(element) {
    this.GTMEvents.impressionViewSingleItem(element, this.reportGtmEecOnConsole)
  }

  impressionClick(element) {
    this.GTMEvents.impressionClick(element, this.reportGtmEecOnConsole)
  }

  promotionView(promotions) {
    this.GTMEvents.promotion_view(promotions)
  }

  promotionViewSingleItem(element) {
    this.GTMEvents.promotionViewSingleItem(element, this.reportGtmEecOnConsole)
  }

  promotionClick(element) {
    this.GTMEvents.promotionClick(element, this.reportGtmEecOnConsole)
  }
}

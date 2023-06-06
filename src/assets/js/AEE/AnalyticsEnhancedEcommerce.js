import GTMEvents from 'assets/js/AEE/GoogleAnalyticsEnhancedEcommerce.js'

export default class AEE {
  constructor(options = {
    debugMode: false
  }) {
    this.GTMEvents = new GTMEvents(options)
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
    this.GTMEvents.impression_view(impressions)
  }

  impressionViewSingleItem(element) {
    this.GTMEvents.impressionViewSingleItem(element)
  }

  impressionClick(element) {
    this.GTMEvents.impressionClick(element)
  }

  promotionView(promotions) {
    this.GTMEvents.promotion_view(promotions)
  }

  promotionViewSingleItem(element) {
    this.GTMEvents.promotionViewSingleItem(element)
  }

  promotionClick(element) {
    this.GTMEvents.promotionClick(element)
  }
}

import GTMEvents from 'src/assets/js/AEE/GoogleAnalyticsEnhancedEcommerce.js'

class AEEClass {
  constructor (options = {
    debugMode: false
  }) {
    this.GTMEvents = new GTMEvents(options)
    this.cacheKeys = {}
  }

  canEventBeCached (cache) {
    if (!this.cacheKeys[cache.key] || this.cacheKeys[cache.key]?.eventName !== cache.eventName) {
      return true
    }
    if (Date.now() < this.cacheKeys[cache.key].expiration) {
      return false
    } else {
      delete this.cacheKeys[cache.key]
      return true
    }
  }

  addToCacheKey (cache) {
    this.cacheKeys[cache.key] = {
      eventName: cache.eventName,
      key: cache.key,
      expiration: Date.now() + cache.TTl
    }
  }

  productDetailViews (actionFieldList, product, cache = {
    TTl: 1000,
    key: '0'
  }) {
    const a = this.canEventBeCached({
      ...cache,
      eventName: 'productDetailViews'
    })
    if (cache &&
      !a
    ) {
      return
    }
    this.GTMEvents.action_productDetailViews(actionFieldList, product)
    this.addToCacheKey({
      eventName: 'productDetailViews',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  productAddToCart (actionFieldList, products, cache = {
    TTl: 1000,
    key: '0'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'productAddToCart'
      })) {
      return
    }
    this.GTMEvents.action_productAddToCart(actionFieldList, products)
    this.addToCacheKey({
      eventName: 'productAddToCart',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  productRemoveFromCart (actionFieldList, product, cache = {
    TTl: 1000,
    key: '0'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'productRemoveFromCart'
      })) {
      return
    }
    this.GTMEvents.action_productRemoveFromCart(actionFieldList, product)
    this.addToCacheKey({
      eventName: 'productRemoveFromCart',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  checkout (step, option, products, cache = {
    TTl: 1000,
    key: '0'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'checkout'
      })) {
      return
    }
    this.GTMEvents.action_checkout(step, option, products)
    this.addToCacheKey({
      eventName: 'checkout',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  checkoutOption (step, option, cache = {
    TTl: 1000,
    key: '0'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'checkoutOption'
      })) {
      return
    }
    this.GTMEvents.action_checkoutOption(step, option)
    this.addToCacheKey({
      eventName: 'checkoutOption',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  purchase (actionField, products, cache = {
    TTl: 1000,
    key: '0'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'purchase'
      })) {
      return
    }
    this.GTMEvents.action_purchase(actionField, products)
    this.addToCacheKey({
      eventName: 'purchase',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  impressionView (impressions, cache = {
    TTl: 1000,
    key: '100'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'impressionView'
      })) {
      return
    }
    this.GTMEvents.impression_view(impressions)
    this.addToCacheKey({
      eventName: 'impressionView',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  impressionClick (impressions, cache = {
    TTl: 1000,
    key: '100'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'impressionClick'
      })) {
      return
    }
    this.GTMEvents.impression_click(impressions)
    this.addToCacheKey({
      eventName: 'impressionClick',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  promotionView (promotions, cache = {
    TTl: 1000,
    key: '0'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'promotionView'
      })) {
      return
    }
    this.GTMEvents.promotion_view(promotions)
    this.addToCacheKey({
      eventName: 'promotionView',
      key: cache.key,
      TTl: cache.TTl
    })
  }

  promotionClick (promotions, cache = {
    TTl: 1000,
    key: '0'
  }) {
    if (cache &&
      !this.canEventBeCached({
        ...cache,
        eventName: 'promotionClick'
      })) {
      return
    }
    this.GTMEvents.promotion_click(promotions)
    this.addToCacheKey({
      eventName: 'promotionClick',
      key: cache.key,
      TTl: cache.TTl
    })
  }
}
export const AEE = new AEEClass()

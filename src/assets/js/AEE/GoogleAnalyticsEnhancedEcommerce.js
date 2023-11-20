import GTMBase from 'src/assets/js/AEE/GoogleTagManager.js'

export default class GTMEvents {
  constructor (options = {
    debugMode: false
  }) {
    this.GTM = new GTMBase(options)
  }

  action_checkoutOption (step, option) {
    this.GTM.pushEvent({
      event: 'eec.checkout_option',
      ecommerce: {
        checkout_option: {
          actionField: {
            step,
            option
          }
        }
      }
    })
  }

  action_purchase (actionField, products) {
    this.GTM.pushEvent({
      event: 'eec.purchase',
      ecommerce: {
        // currencyCode: 'IRR',
        currencyCode: 'USD',
        purchase: {
          actionField,
          products
        }
      }
    })
  }

  action_productAddToCart (actionFieldList, products) {
    this.GTM.pushEvent({
      event: 'eec.add',
      ecommerce: {
        add: {
          actionField: {
            list: actionFieldList
          },
          products: [products]
        }
      }
    })
  }

  action_productRemoveFromCart (actionFieldList, products) {
    const productsArray = (Array.isArray(products)) ? products : [products]
    this.GTM.pushEvent({
      event: 'eec.remove',
      ecommerce: {
        remove: {
          actionField: {
            list: actionFieldList
          },
          products: productsArray
        }
      }
    })
  }

  action_productDetailViews (actionFieldList, product) {
    this.GTM.pushEvent({
      event: 'eec.detail',
      ecommerce: {
        detail: {
          actionField: {
            list: actionFieldList
          },
          products: [{
            id: product.id, // (String) The SKU of the product. I recommend sending any variant IDs using a Product-scoped Custom Dimension. Example: 'P12345'
            name: product.name, // (String) The name of the product. Any variant name can be sent with the variant key. Example: 'T-Shirt'
            price: product.price,
            brand: product.brand, // (String) The brand name of the product. Example: 'NIKE'
            category: product.category, // (String) Product category of the item. Can have maximum five levels of hierarchy. Example: 'clothes/shirts/t-shirts'
            variant: product.variant // (String) What variant of the main product this is. Example: 'Large'
            // dimensionN : product.dimensionN,//(String) A Product-scoped Custom Dimension for index number N. Example: 'Blue'
            // metricN : product.metricN, //(Integer) A Product-scoped Custom Metric for index number N. Example: 3
          }]
        }
      }
    })
  }

  action_checkout (step, option, products) {
    this.GTM.pushEvent({
      event: 'eec.checkout',
      ecommerce: {
        checkout: {
          actionField: {
            step,
            option
          },
          ...(products?.length > 0 && { products })
        }
      }
    })
  }

  impression_view (impressions) {
    // sample impression object => {
    //     'name': 'Triblend Android T-Shirt',       // Name or ID is required.
    //     'id': '12345',
    //     'price': '15.25',
    //     'brand': 'Google',
    //     'category': 'Apparel',
    //     'variant': 'Gray',
    //     'list': 'Search Results',
    //     'position': 1
    // },

    this.GTM.pushEvent({
      event: 'eec.impressionView',
      ecommerce: {
        impressions
      }
    })
  }

  impression_click (actionFieldList, product) {
    this.GTM.pushEvent({
      event: 'eec.impressionClick',
      ecommerce: {
        click: {
          actionField: {
            list: actionFieldList
          },
          products: [product]
        }
      }
    })
  }

  promotion_view (promotions) {
    this.GTM.pushEvent({
      event: 'eec.promotionView',
      ecommerce: {
        promoView: {
          promotions
        }
      }
    })
  }

  promotion_click (promotion) {
    this.GTM.pushEvent({
      event: 'eec.promotionClick',
      ecommerce: {
        promoClick: {
          promotions: promotion
        }
      }
    })
  }

  // not using right now
  // getElementData(element = {
  //   data: {}
  // }, data) {
  //   const elementData = element.data(data)
  //   if (typeof elementData !== 'undefined') {
  //     return elementData
  //   }
  //   return 'undefined'
  // }

  // not using right now
  // getElementData_product(element) {
  //   const gtmEecImpressionView = []
  //   gtmEecImpressionView.push({
  //     id: this.getElementData(element, 'gtm-eec-product-id').toString(),
  //     name: this.getElementData(element, 'gtm-eec-product-name').toString(),
  //     price: this.getElementData(element, 'gtm-eec-product-price').toString(),
  //     brand: this.getElementData(element, 'gtm-eec-product-brand').toString(),
  //     category: this.getElementData(element, 'gtm-eec-product-category').toString(),
  //     variant: this.getElementData(element, 'gtm-eec-product-variant').toString(),
  //     list: this.getElementData(element, 'gtm-eec-product-list').toString(),
  //     position: this.getElementData(element, 'gtm-eec-product-position')
  //   })
  //   return gtmEecImpressionView
  // }

  // not using right now
  // getElementData_advertisement(element) {
  //   const gtmEecPromotionView = []
  //   gtmEecPromotionView.push({
  //     id: this.getElementData(element, 'gtm-eec-promotion-id').toString(),
  //     name: this.getElementData(element, 'gtm-eec-promotion-name').toString(),
  //     creative: this.getElementData(element, 'gtm-eec-promotion-creative').toString(),
  //     position: this.getElementData(element, 'gtm-eec-promotion-position')
  //   })
  //   return gtmEecPromotionView
  // }

  // not using right now
  // impressionViewSingleItem(element) {
  //   const impressions = this.getElementData_product(element)
  //   this.impression_view(impressions)
  // }
  //
  // impressionClick(element) {
  //   const impressions = this.getElementData_product(element),
  //     actionFieldList = impressions[0].list
  //   this.impression_click(actionFieldList, impressions)
  // }
  //
  // promotionViewSingleItem(element) {
  //   const promotions = this.getElementData_advertisement(element)
  //   this.promotion_view(promotions)
  // }
  //
  // promotionClick(element) {
  //   const promotion = this.getElementData_advertisement(element)
  //   this.promotion_click(promotion)
  // }
}

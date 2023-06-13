import { apiV2 } from 'src/boot/axios.js'
import { Cart } from 'src/models/Cart.js'
import { Order } from 'src/models/Order.js'
import { GatewayList } from 'src/models/Gateway.js'
import APIRepository from '../classes/APIRepository.js'

export default class CartAPI extends APIRepository {
  constructor() {
    super('cart', apiV2, '/orderproduct', new Cart())
    this.seller = 1 // 1: Alaa - 2: Soala
    this.APIAdresses = {
      addToCart: '/orderproduct',
      gateways: '/gateways',
      discountSubmit: '/order/submitCoupon',
      discountRemove: '/order/RemoveCoupon',
      reviewCart: '/checkout/review',
      getPaymentRedirectEncryptedLink: (device, paymentMethod) => '/getPaymentRedirectEncryptedLink?seller=' + this.seller + '&device=' + device + '&paymentMethod=' + paymentMethod,
      // getPaymentRedirectEncryptedLink: '/getPaymentRedirectEncryptedLink?seller=' + this.seller + '&device=web',
      removeFromCart: (id) => '/orderproduct/' + id,
      removeFromCartByProductId: (id) => 'remove-order-product/' + id,
      orderWithTransaction: (orderId) => '/orderWithTransaction/' + orderId
    }
    this.CacheList = {
      addToCart: this.name + this.APIAdresses.addToCart,
      gateways: this.name + this.APIAdresses.gateways,
      discountSubmit: this.name + this.APIAdresses.discountSubmit,
      discountRemove: this.name + this.APIAdresses.discountRemove,
      getPaymentRedirectEncryptedLink: (device, paymentMethod) => this.name + this.APIAdresses.getPaymentRedirectEncryptedLink(device, paymentMethod),
      reviewCart: this.name + this.APIAdresses.reviewCart,
      removeFromCart: id => this.name + this.APIAdresses.removeFromCart(id),
      removeFromCartByProductId: id => this.name + this.APIAdresses.removeFromCartByProductId(id),
      orderWithTransaction: orderId => this.name + this.APIAdresses.orderWithTransaction(orderId)
    }
  }

  addToCart(data = {}, cache) {
    const payload = {
      product_id: data.product_id, // Number or String
      products: data.products, // Number or String (List ofProduct's ID)
      attribute: data.attribute, // Number or String
      seller: this.seller
    }
    if (!payload.products || (Array.isArray(payload.products) && payload.products.length === 0)) {
      delete payload.products
    }
    if (!payload.attribute || (Array.isArray(payload.attribute) && payload.attribute.length === 0)) {
      delete payload.attribute
    }
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.addToCart,
      cacheKey: this.CacheList.addToCart,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data: payload
    })
  }

  discountSubmit(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountSubmit,
      cacheKey: this.CacheList.discountSubmit,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      params: data.params
    })
  }

  discountRemove(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountRemove,
      cacheKey: this.CacheList.discountRemove,
      ...(!!data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  reviewCart(cartItems = [], cache = { TTL: 1000 }) {
    const queryParams = {}
    queryParams.seller = this.seller

    const setCartItemParam = function (cartItemIndex, paramsKey, value) {
      queryParams['cartItems' + '[' + cartItemIndex + ']' + paramsKey] = value
    }
    const setProductsParams = function (cartItemIndex, products) {
      if (!Array.isArray(products)) {
        return
      }
      const cartItemProductsLength = products.length
      for (let productItemIndex = 0; productItemIndex < cartItemProductsLength; productItemIndex++) {
        const productItem = products[productItemIndex]
        setCartItemParam(cartItemIndex, '[products]' + '[' + productItemIndex + ']', productItem)
      }
    }
    const setAttributesParams = function (cartItemIndex, attributes) {
      if (!Array.isArray(attributes)) {
        return
      }
      const cartItemAttributesLength = attributes.length
      for (let attributeItemIndex = 0; attributeItemIndex < cartItemAttributesLength; attributeItemIndex++) {
        const attributeItem = attributes[attributeItemIndex]
        setCartItemParam(cartItemIndex, '[products]' + '[' + attributeItemIndex + ']', attributeItem)
      }
    }

    const cartItemLength = cartItems.length
    let cartItemIndex = 0
    for (let i = 0; i < cartItemLength; i++) {
      const cartItem = cartItems[i]
      if (!cartItem.product_id) {
        continue
      }
      setCartItemParam(cartItemIndex, '[product_id]', cartItem.product_id)
      setProductsParams(cartItemIndex, cartItem.products)
      setAttributesParams(cartItemIndex, cartItem.attribute)
      cartItemIndex++
    }

    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.reviewCart,
      cacheKey: this.CacheList.reviewCart,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: queryParams
    })
  }

  getGateways(cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.gateways,
      cacheKey: this.CacheList.gateways,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new GatewayList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPaymentRedirectEncryptedLink(data = { device: 'web', paymentMethod: null }, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getPaymentRedirectEncryptedLink(data.device, data.paymentMethod),
      cacheKey: this.CacheList.getPaymentRedirectEncryptedLink(data.device, data.paymentMethod),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data.data.url
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  removeFromCart(orderProductId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.removeFromCart(orderProductId),
      cacheKey: this.CacheList.removeFromCart(orderProductId),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  removeFromCartByProductId(productId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.removeFromCartByProductId(productId),
      cacheKey: this.CacheList.removeFromCartByProductId(productId),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getorderWithTransaction(orderId, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderWithTransaction(orderId),
      cacheKey: this.CacheList.orderWithTransaction(orderId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Order(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

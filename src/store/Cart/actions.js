import { Notify } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'
import CookieCart from 'src/assets/js/CookieCart.js'
import AEE from 'assets/js/AEE/AnalyticsEnhancedEcommerce'
import { Product } from 'src/models/Product'

export function addToCart(context, newProductData) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  return new Promise((resolve, reject) => {
    const payload = {
      product_id: newProductData.product_id, // Number or String
      products: newProductData.products ? newProductData.products : [], // Array (List ofProduct's ID)
      attribute: newProductData.attribute ? newProductData.attribute : [] // Array
    }
    const setCartLoading = (loadingState) => {
      const cart = context.getters.cart
      cart.loading = loadingState
      context.commit('updateCart', cart)
    }
    const updateCart = (payload) => {
      const cart = context.getters.cart
      cart.addToCart(payload)
      context.commit('updateCart', cart)
    }
    const showNotify = () => {
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 5000,
        position: 'top',
        message: 'محصول به سبد خرید اضافه شد.',
        icon: 'report_problem',
        actions: [{
          label: 'سبد خرید',
          icon: 'isax:shopping-cart',
          color: 'white',
          class: 'bg-green-3',
          handler: () => {
            this.$router.push({ name: 'Public.Checkout.Review' })
          }
        }]
      })
    }
    const reviewCart = () => {
      this.dispatch('Cart/reviewCart')
    }

    setCartLoading(true)
    if (isUserLogin) {
      APIGateway.cart.addToCart(payload)
        .then((response) => {
          updateCart(payload)
          showNotify()
          setCartLoading(false)
          reviewCart()
          resolve(response)
        })
        .catch((error) => {
          setCartLoading(false)
          reject(error)
        })
    } else {
      updateCart(payload)
      showNotify()
      setCartLoading(false)
      reviewCart()
      resolve(true)
    }
  })
}

export function reviewCart(context) {
  const currentCart = this.getters['Cart/cart']
  const cartItems = []
  const setCartLoading = (loadingState) => {
    const cart = context.getters.cart
    cart.loading = loadingState
    context.commit('updateCart', cart)
  }
  currentCart.items.list.forEach(currentCartItem => {
    if (currentCartItem.grand.id) {
      const cartItemObject = {
        products: [],
        attribute: [],
        product_id: null
      }
      // selectable
      cartItemObject.product_id = currentCartItem.grand.id
      currentCartItem.order_product.list.forEach(orderProduct => {
        cartItemObject.products.push(orderProduct.product.id)
      })
      cartItems.push(cartItemObject)
    } else {
      // simple and configurable
      currentCartItem.order_product.list.forEach(orderProduct => {
        const cartItemObject = {
          products: [],
          attribute: [],
          product_id: null
        }
        cartItemObject.product_id = orderProduct.product.id
        if (orderProduct.attributevalues) {
          cartItemObject.attribute = orderProduct.attributevalues
        }
        cartItems.push(cartItemObject)
      })
    }
  })

  return new Promise((resolve, reject) => {
    setCartLoading(true)
    APIGateway.cart.reviewCart(cartItems)
      .then((cart) => {
        context.commit('updateCart', cart)
        const analyticsInstance = new AEE({
          debugMode: true
        })
        analyticsInstance.checkout(1, 'reviewAndPayment', cart.items.list[0]?.order_product?.list.map(item => item.product))
        setCartLoading(false)
        return resolve(cart)
      })
      .catch(error => {
        setCartLoading(false)
        reject(error)
      })
  })
}

export function paymentCheckout(context) {
  return new Promise((resolve, reject) => {
    APIGateway.cart.getPaymentRedirectEncryptedLink()
      .then(encryptedPaymentRedirectLink => {
        return resolve(encryptedPaymentRedirectLink)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function removeItemFromCart(context, orderProductId) {
  const remove = function (productId, orderProductId) {
    const cart = context.getters.cart
    if (typeof productId !== 'undefined') {
      cart.removeProduct(productId)
    } else if (typeof orderProductId !== 'undefined') {
      cart.items.removeOrderProduct(orderProductId)
    }
    context.commit('updateCart', cart)
  }
  const removeByProductId = function (productId) {
    remove(productId)
  }
  const removeByOrderProductId = function (orderProductId) {
    remove(undefined, orderProductId)
  }
  const showNotify = function () {
    Notify.create({
      type: 'positive',
      color: 'positive',
      timeout: 5000,
      position: 'top',
      message: 'محصول از سبد خرید حذف شد.',
      icon: 'report_problem'
    })
  }

  return new Promise((resolve, reject) => {
    const isUserLogin = this.getters['Auth/isUserLogin']
    if (isUserLogin) {
      APIGateway.cart.removeFromCart(orderProductId)
        .then((response) => {
          removeByOrderProductId(orderProductId)
          showNotify()
          const analyticsInstance = new AEE({
            debugMode: true
          })
          analyticsInstance.productRemoveFromCart('order.checkoutReview', new Product({ id: orderProductId }))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      const productId = orderProductId
      removeByProductId(productId)
      const analyticsInstance = new AEE({
        debugMode: true
      })
      analyticsInstance.productRemoveFromCart('order.checkoutReview', new Product({ id: productId }))
      showNotify()
      resolve()
    }
  })
}

export function deleteList(context) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  const cart = context.getters.cart

  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      cart.items.list.forEach((item) => {
        // TODO => very bad code
        context
          .dispatch('removeItemFromCart', item.id)
          .then((response) => {
            return resolve(response)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    } else {
      cart.removeAllItems()
      CookieCart.deleteCartItemListFromCookie()
      return resolve(true)
    }
  })
}

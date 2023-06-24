import { Notify } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'
import CookieCart from 'src/assets/js/CookieCart.js'
import { AEE } from 'assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import { Product } from 'src/models/Product'

export function addToCart(context, newProductData) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  return new Promise((resolve, reject) => {
    const payload = {
      product: newProductData.product, // Number or String
      product_id: newProductData.product.id, // Number or String
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
    const pushAEEEvent = (product) => {
      AEE.productAddToCart('product.addToCart', [product.eec.getData()])
    }

    setCartLoading(true)
    if (isUserLogin) {
      APIGateway.cart.addToCart(payload)
        .then((response) => {
          updateCart(payload)
          showNotify()
          setCartLoading(false)
          pushAEEEvent(newProductData)
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
      pushAEEEvent(newProductData)
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
    const pushAEEEvent = (cart) => {
      AEE.checkout(1,
        'reviewAndPayment',
        cart.items.list[0]?.order_product?.list.map(item => item.product.eec.getData()),
        {
          TTl: 1000,
          key: 'reviewCart'
        }
      )
    }
    APIGateway.cart.reviewCart(cartItems)
      .then((cart) => {
        context.commit('updateCart', cart)
        pushAEEEvent(cart)
        setCartLoading(false)
        return resolve(cart)
      })
      .catch(error => {
        setCartLoading(false)
        reject(error)
      })
  })
}

export function paymentCheckout(context, paymentMethod) {
  return new Promise((resolve, reject) => {
    APIGateway.cart.getPaymentRedirectEncryptedLink({ device: 'web', paymentMethod })
      .then(encryptedPaymentRedirectLink => {
        return resolve(encryptedPaymentRedirectLink)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function removeItemFromCart(context, product) {
  // const orderProductId = orderProduct.id
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
  // const removeByOrderProductId = function (orderProductId) {
  //   remove(undefined, orderProductId)
  // }
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
  const pushAEEEvent = function (product) {
    const productToPush = new Product(product)
    AEE.productRemoveFromCart('order.checkoutReview', productToPush.eec.getData())
  }

  return new Promise((resolve, reject) => {
    const isUserLogin = this.getters['Auth/isUserLogin']
    if (isUserLogin) {
      APIGateway.cart.removeFromCartByProductId(product.id)
        .then((response) => {
          removeByProductId(product.id)
          // removeByOrderProductId(orderProductId)
          pushAEEEvent(product)
          showNotify()
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      // const productId = orderProductId
      removeByProductId(product.id)
      pushAEEEvent(product)
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

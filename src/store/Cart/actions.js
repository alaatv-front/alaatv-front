import API_ADDRESS from 'src/api/Addresses'
// import Price from 'src/models/Price'
// import { Coupon } from 'src/models/Coupon'
// import { CartItemList } from 'src/models/CartItem'
import { axios } from 'src/boot/axios'
import CookieCart from 'src/assets/js/CookieCart'
import { Cart } from 'src/models/Cart'
import { Notify } from 'quasar'

export function addToCart(context, data) {
  // const isUserLogin = !!this.getters['Auth/isUserLogin']
  // const cart = context.getters.cart
  console.log('addToCart :', data)
  return new Promise((resolve, reject) => {
    axios
      .post(API_ADDRESS.cart.orderproduct.add, { product_id: data.product.id, products: data.products, attribute: data.attribute, seller: 2 })
      .then((response) => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 5000,
          position: 'top',
          message: 'محصول به سبد خرید اضافه شد.',
          icon: 'report_problem'
        })
        return resolve(response)
      })
      .catch((error) => {
        return reject(error)
      })

    // if (isUserLogin) {
    //   axios
    //     .post(API_ADDRESS.cart.orderproduct, { product_id: product.id })
    //     .then((response) => {
    //       return resolve(response)
    //     })
    //     .catch((error) => {
    //       return reject(error)
    //     })
    // } else {
    //   cart.addToCart(product)
    //   CookieCart.addToCartInCookie(cart)
    //   return resolve(true)
    // }
  })
}

export function reviewCart(context, product) {
  // -----------------------------------------------------------------------------------
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  const currentCart = context.getters.cart
  if (!isUserLogin) {
    CookieCart.addToCartInCookie(currentCart)
  }
  // -----------------------------------------------------------------------------------
  return new Promise((resolve, reject) => {
    axios
      .get(API_ADDRESS.cart.review)
      .then((response) => {
        const invoice = response.data.data

        const cart = new Cart(invoice)
        if (invoice.count > 0) {
          invoice.items[0].order_product.forEach((order) => {
            cart.items.list.push(order)
          })
        }
        if (product) {
          const isExist = cart.cartItems.list.find(
            (item) => item.id === product.id
          )
          if (!isExist) {
            cart.cartItems.list.push(product)
          }
        }
        context.commit('updateCart', cart)
        return resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function paymentCheckout (context) {
  return new Promise((resolve, reject) => {
    axios
      .get(API_ADDRESS.cart.getPaymentRedirectEncryptedLink)
      .then((response) => {
        return resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function removeItemFromCart(context, productId) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']

  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      axios
        .delete(API_ADDRESS.cart.orderproduct + '/' + productId)
        .then((response) => {
          Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 5000,
            position: 'top',
            message: 'محصول از سبد خرید حذف شد.',
            icon: 'report_problem'
          })
          return resolve(response)
        })
        .catch((error) => {
          return reject(error)
        })
    } else {
      const cart = context.getters.cart

      cart.removeItem(productId)
      context.commit('updateCart', cart)

      CookieCart.removeCartItemFromCookieCart(productId)
      return resolve(true)
    }
  })
}

export function deleteList(context) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  const cart = context.getters.cart

  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      cart.cartItems.list.forEach((item) => {
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

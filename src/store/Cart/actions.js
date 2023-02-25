// import API_ADDRESS from 'src/api/Addresses'
// import { axios } from 'src/boot/axios'
import CookieCart from 'src/assets/js/CookieCart'
import { Notify } from 'quasar'
import { Cart } from 'src/models/Cart'
import { CartItem } from 'src/models/CartItem'
import { APIGateway } from 'src/api/APIGateway.js'
import { OrderProduct } from 'src/models/OrderProduct'
// import { parse } from 'qs'

export function addToCart (context, data) {
  // console.log(data)
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      APIGateway.cart.addToCart({ product_id: data[0].id })
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
    } else {
      const cart = context.getters.cart
      data.forEach(element => {
        const product = new CartItem()
        const orderProducts = []

        if (element.product !== undefined) {
          product.grand.id = element.product.id
        }
        if (element.products !== undefined) {
          element.products.forEach(order => {
            const orderProduct = new OrderProduct()
            orderProduct.id = order
            orderProducts.push(orderProduct)
          })
          product.order_product.list = orderProducts
        }
        cart.items.list.push(product)
      })
      context.commit('updateCart', cart)
      return resolve(true)
    }
  })
}

export function reviewCart (context, product) {
  const isUserLogin = this.getters['Auth/isUserLogin']
  const currentCart = this.getters['Cart/cart']
  const orders = []
  if (currentCart.items.list !== undefined && currentCart.items.list.length > 0) {
    currentCart.items.list.forEach(item => {
      orders.push({
        product_id: item.grand.id,
        products: item.order_product.list
      })
    })
  }
  return new Promise((resolve, reject) => {
    APIGateway.cart.reviewCart({ params: { seller: 1 } })
      .then((response) => {
        if (isUserLogin) {
          context.commit('updateCart', new Cart())
        }
        return resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
  // return new Promise((resolve, reject) => {
  //   axios
  //     .get(API_ADDRESS.cart.review, {
  //       params: {
  //         seller: 1,
  //         cartItems: orders
  //       },
  //       paramsSerializer: {
  //         encode: parse,
  //         serialize: params => {
  //           const q = new URLSearchParams()
  //           q.set('seller', params.seller)
  //           for (let item = 0; item < params.cartItems.length; item++) {
  //             q.set(`cartItems[${item}][product_id]`, params.cartItems[item].product_id)
  //             for (let product = 0; product < params.cartItems[item].products.length; product++) {
  //               q.set(`cartItems[${item}][products][${product}]`, params.cartItems[item].products[product].id)
  //             }
  //           }
  //           return q
  //         }
  //       }
  //     })
  //     .then((response) => {
  //       if (isUserLogin) {
  //         context.commit('updateCart', new Cart())
  //       }
  //       return resolve(response)
  //     })
  //     .catch((error) => {
  //       reject(error)
  //     })
  // })
}

export function paymentCheckout (context) {
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

export function removeItemFromCart (context, orderProductId) {
  const isUserLogin = this.getters['Auth/isUserLogin']

  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      APIGateway.cart.removeFromCart({ id: orderProductId })
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
      const productId = orderProductId
      const cart = this.getters['Cart/cart']
      cart.removeItem(productId)
      context.commit('updateCart', cart)
      return resolve()
    }
  })
}

export function deleteList (context) {
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

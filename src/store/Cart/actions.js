import API_ADDRESS from 'src/api/Addresses'
import  Price from 'src/models/Price'
import { Coupon } from 'src/models/Coupon'
import { Cart } from 'src/models/Cart'
import  {CartItemList} from 'src/models/CartItem'
import { axios } from 'src/boot/axios'
import CookieCart from 'src/assets/js/CookieCart'

export function addToCart(context, product) {
  const isUserLogin = !!this.getters['Auth/user'].id

  if (isUserLogin) {
    axios.post(API_ADDRESS.cart.orderproduct, { product_id: product.id })
      .then( () => {
        context.dispatch('updateCart')
      })
      .catch( (error) => {
        if (error.response.status === 401) {
          window.location.reload()
        }
      })
  } else {
    const cart = context.getters['cart']

    cart.addToCart(product)
    CookieCart.addToCartInCookie(cart)
    context.commit('updateCart', cart)
  }
}

export function updateCart(context) {
  axios.get(API_ADDRESS.cart.review)
    .then(response => {
      const invoice = response.data

      const cart = {
        price: new Price(invoice.price) ,
        cartItems: new CartItemList(invoice.items[0].order_product),
        couponInfo: new Coupon(invoice.coupon)
      }

      context.commit('updateCart', cart)
    })
    .catch( error => {
    })
}

export function removeItemFromCart(context, productId) {
  const cart = context.getters['cart']
  const isUserLogin = !!this.getters['Auth/user'].id
  if (isUserLogin) {
    axios.delete(API_ADDRESS.cart.orderproduct +'/'+productId)
      .then((response) => {
        // const cartItem = cart.cartItems.list.find(item => parseInt(item.id) === parseInt(productId))
        context.dispatch('updateCart')
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.reload()
        }
      })
  } else {
    CookieCart.removeFromCookieCart(productId)
  }

}

export function removeFromCookieCart(context, productId) {
  const cart =  context.getters['cart']
  cart.removeItem(productId)
  context.dispatch('setCartInCookie', cart)

}

export function deleteList(context) {
  const cart =  context.getters['cart']
  cart.removeAllItems()
  context.dispatch('setCartInCookie', cart)
  context.dispatch('updateCart')
}

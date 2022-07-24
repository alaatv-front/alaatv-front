import API_ADDRESS from 'src/api/Addresses'
import  Price from 'src/models/Price'
import { Coupon } from 'src/models/Coupon'
import  {CartItemList} from 'src/models/CartItem'
import { Cookies } from 'quasar'

export function addToCart(context, product) {
  const isUserLogin = !!this.getters['Auth/user'].id

  if (isUserLogin) {
    this.$axios.post(API_ADDRESS.cart.add, { product_id: product.id })
      .then( () => {
        context.dispatch('updateCart')
      })
      .catch( (error) => {
        if (error.response.status === 401) {
          window.location.reload()
        }
      })
  } else {
    const cart =  context.getters['cart']

    cart.addToCart(product)
    console.log(cart)
    context.dispatch('setCartInCookie', cart)
  }
}

export function updateCart(context) {
  this.$axios.get(API_ADDRESS.cart.review)
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

export function setCartInCookie(context, cart) {
  console.log('set', cart)
  console.log('cart.cartItems', cart.cartItems)
  console.log('cart.cartItems.list', cart.cartItems.list)
  const cookieCart = cart.cartItems.list.map( item => {
    return {
      product_id: item.product.id,
      attribute: [],
      extraAttribute: [],
      products: []
    }
  })
  Cookies.set('cartItems',JSON.stringify(cookieCart), {
    expires: '365d'
  })
  context.dispatch('updateCart')
}



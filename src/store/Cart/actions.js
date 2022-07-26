import API_ADDRESS from 'src/api/Addresses'
import  Price from 'src/models/Price'
import { Coupon } from 'src/models/Coupon'
import { Cart } from 'src/models/Cart'
import  {CartItemList} from 'src/models/CartItem'
import { axios } from 'src/boot/axios'
import CookieCart from 'src/assets/js/CookieCart'

export function addToCart(context, product) {
  const isUserLogin = !!this.getters['Auth/user'].id
  const cart = context.getters['cart']
  if (isUserLogin) {
    axios.post(API_ADDRESS.cart.orderproduct, { product_id: product.id })
      .then( () => {
        context.dispatch('reviewCart')
      })
      .catch( (error) => {
        if (error.response && error.response.status === 401) {
          window.location.reload()
        }
      })
  } else {
    cart.addToCart(product)
    CookieCart.addToCartInCookie(cart)
    // TODO => attention: dont remove below comment
    // context.dispatch('reviewCart', product)
    context.dispatch('updateCart', cart)
  }
}

export function reviewCart(context, product) {
  axios.get(API_ADDRESS.cart.review)
    .then(response => {
      const invoice = response.data.data

      const cart = {
        price: new Price(invoice.price) ,
        cartItems: new CartItemList(),
        couponInfo: new Coupon(invoice.coupon)
      }
      invoice.items[0].order_product.forEach( order => {
        cart.cartItems.list.push(order.product)
      })

      if (product) {
        const isExist = cart.cartItems.list.find(item => item.id === product.id)
        if(!isExist) {
          cart.cartItems.list.push(product)
        }
      }

      context.dispatch('updateCart', cart)
    })
    .catch( error => {
    })
}

export function updateCart(context, cart) {
      context.commit('updateCart', cart)
      context.commit('updateInvoice', cart.cartItems.list)
}

export function removeItemFromCart(context, data= {productId , dontReview}) {
  const isUserLogin = !!this.getters['Auth/user'].id

  if (isUserLogin) {
    axios.delete(API_ADDRESS.cart.orderproduct +'/' + data.productId)
      .then((response) => {
        // const cartItem = cart.cartItems.list.find(item => parseInt(item.id) === parseInt(productId))
        if(!data.dontReview) {
          context.dispatch('reviewCart')
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.reload()
        }
      })
  } else {
    // TODO => attention: dont remove below comment
    // context.dispatch('reviewCart')
    const cart = context.getters['cart']

    cart.cartItems.list = cart.cartItems.list.filter(item => {return  item.id !== data.productId})

    context.dispatch('updateCart', cart)
    CookieCart.removeFromCookieCart(data.productId)
  }

}

export function deleteList(context) {
  const isUserLogin = !!this.getters['Auth/user'].id
  const cart = context.getters['cart']

  if(isUserLogin) {
    cart.cartItems.list.forEach(item => {
      // TODO => very bad code
      context.dispatch('removeItemFromCart', {productId: item.id, dontReview:true})
    })
  } else {
    cart.removeAllItems()
    CookieCart.deleteCartItemListFromCookie(cart)
  }
  context.dispatch('updateCart', cart)
}


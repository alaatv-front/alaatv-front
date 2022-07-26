import { Cookies } from 'quasar'

export default class CookieCart {

  static setCartInCookie(cart) {
    Cookies.set('cartItems',JSON.stringify(cart), {
      expires: '365d'
    })
  }

  static getCookieCart() {
    return Cookies.get('cartItems')
  }

  static addToCartInCookie(cart) {
    const cookieCart = cart.cartItems.list.map( item => {
      return {
        product_id: item.product.id,
        attribute: [],
        extraAttribute: [],
        products: []
      }
    })

    if (!this.isCartItemsSetInCookies()) {
      this.setCartInCookie(cookieCart)
      return
    }
    const existCookieCart =  this.getCookieCart()
    cookieCart.forEach( product => {
      const cartItem = existCookieCart.find(item => item.product_id === product.product_id)
      if (!cartItem) {
        existCookieCart.push(product)
      }
    })
    this.setCartInCookie(existCookieCart)
  }

  static isCartItemsSetInCookies() {
    return Cookies.has('cartItems')
  }

  static removeFromCookieCart(productId) {
    const existCookieCart =  this.getCookieCart()
    const newCookieCart = []
    existCookieCart.forEach( product => {
      if (product.product_id !== productId) {
        newCookieCart.push(product)
      }
    })
    this.setCartInCookie(newCookieCart)
  }

  static deleteCartItemListFromCookie(cart) {
    this.deleteCartFromCookies()
    this.addToCartInCookie(cart)
  }

  static deleteCartFromCookies() {
    Cookies.remove('cartItems')
  }
}

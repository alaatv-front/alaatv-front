import { Cart } from 'src/models/Cart'
import { CartItemList } from 'src/models/CartItem'

export function cart(state) {
  return new Cart(state.cart)
}

export function invoice(state) {
  return new CartItemList(state.invoice)
}

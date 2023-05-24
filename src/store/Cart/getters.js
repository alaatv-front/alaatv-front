import { Cart } from 'src/models/Cart'

export function cart (state) {
  const oldLoading = state.cart.loading
  const newCart = new Cart(state.cart)
  newCart.loading = oldLoading
  return newCart
}

export function updateCart(state, newValue) {
  Object.assign(state.cart, newValue)
}

export function updateInvoice(state, newValue) {
  state.invoice.push(newValue)
}

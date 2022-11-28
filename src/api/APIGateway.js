import UserAPI from './models/user'
import CartAPI from './models/cart'

/* Exporting the API_Gateway object. */
export const API_Gateway = {
  user: new UserAPI(),
  cart: new CartAPI()
}

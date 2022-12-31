import AttributeAPI from './models/attribute'
import AuthAPI from './models/auth'
import CartAPI from './models/cart'
import ContentAPI from './models/content'
import CouponAPI from './models/coupon'
import OrderAPI from './models/order.'
import PagesAPI from './models/pages'
import ProductAPI from './models/product'
import Set from './models/set'
import StudyPlanAPI from './models/studyPlan'
import TicketAPI from './models/ticket'
import UserAPI from './models/user'

/* Exporting the APIGateway object. */
export const APIGateway = {
  attribute: new AttributeAPI(),
  auth: new AuthAPI(),
  cart: new CartAPI(),
  content: new ContentAPI(),
  coupon: new CouponAPI(),
  order: new OrderAPI(),
  pages: new PagesAPI(),
  product: new ProductAPI(),
  set: new Set(),
  studyPlan: new StudyPlanAPI(),
  ticket: new TicketAPI(),
  user: new UserAPI()
}

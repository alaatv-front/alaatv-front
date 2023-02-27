import AttributeAPI from './models/attribute'
import AuthAPI from './models/auth'
import CartAPI from './models/cart'
import ContentAPI from './models/content'
import CouponAPI from './models/coupon'
import OrderAPI from './models/order.'
import PagesAPI from './models/pages'
import ProductAPI from './models/product'
import SetAPI from './models/set'
import StudyPlanAPI from './models/studyPlan'
import TicketAPI from './models/ticket'
import UserAPI from './models/user'
import AbrishamAPI from 'src/api/models/Abrisham'
import TreeAPI from 'src/api/models/tree'
import ReferralCodeAPI from 'src/api/models/ReferralCode'

/* Exporting the APIGateway object. */
export const APIGateway = {
  abrisham: new AbrishamAPI(),
  attribute: new AttributeAPI(),
  referralCode: new ReferralCodeAPI(),
  auth: new AuthAPI(),
  cart: new CartAPI(),
  content: new ContentAPI(),
  coupon: new CouponAPI(),
  order: new OrderAPI(),
  pages: new PagesAPI(),
  product: new ProductAPI(),
  set: new SetAPI(),
  studyPlan: new StudyPlanAPI(),
  ticket: new TicketAPI(),
  user: new UserAPI(),
  tree: new TreeAPI()
}

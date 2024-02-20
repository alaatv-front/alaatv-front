import MapAPI from 'src/api/models/Map.js'
import SmsAPI from 'src/api/models/sms.js'
import TagAPI from 'src/api/models/tag.js'
import SetAPI from 'src/api/models/set.js'
import SeoAPI from 'src/api/models/Seo.js'
import CartAPI from 'src/api/models/cart.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/user.js'
import TreeAPI from 'src/api/models/tree.js'
import PlanAPI from 'src/api/models/Plan.js'
import VastAPI from 'src/api/models/Vast.js'
import BlockAPI from 'src/api/models/block.js'
import OrderAPI from 'src/api/models/order.js'
import PagesAPI from 'src/api/models/pages.js'
import EwanoAPI from 'src/api/models/Ewano.js'
import YaldaAPI from 'src/api/models/Yalda.js'
import BonyadAPI from 'src/api/models/bonyad.js'
import TicketAPI from 'src/api/models/ticket.js'
import CouponAPI from 'src/api/models/coupon.js'
import EventsAPI from 'src/api/models/Events.js'
import SourceAPI from 'src/api/models/source.js'
import ContentAPI from 'src/api/models/content.js'
import ProductAPI from 'src/api/models/product.js'
import ForrestAPI from 'src/api/models/Forrest.js'
import CommentAPI from 'src/api/models/comment.js'
import ChannelAPI from 'src/api/models/Channel.js'
import VoucherAPI from 'src/api/models/voucher.js'
import SectionAPI from 'src/api/models/section.js'
import GatewayAPI from 'src/api/models/gateway.js'
import VersionAPI from 'src/api/models/Version.js'
import ContactAPI from 'src/api/models/contact.js'
import PostcardAPI from 'src/api/models/postcard.js'
import AbrishamAPI from 'src/api/models/Abrisham.js'
import ConductorAPI from 'src/api/models/Conductor.js'
import AttributeAPI from 'src/api/models/attribute.js'
import StudyPlanAPI from 'src/api/models/studyPlan.js'
import SlideShowAPI from 'src/api/models/slideShow.js'
import PermissionAPI from 'src/api/models/permission.js'
import FileUploadAPI from 'src/api/models/FileUpload.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'
import BlackFridayAPI from 'src/api/models/BlackFriday.js'
import ReferralCodeAPI from 'src/api/models/ReferralCode.js'
import TeleMarketingAPI from 'src/api/models/teleMarketing.js'
import LiveDescriptionAPI from 'src/api/models/LiveDescription.js'
import ContentTimepointAPI from 'src/api/models/ContentTimepoint.js'
/* Exporting the APIGateway object. */
export const APIGateway = {
  tag: new TagAPI(),
  set: new SetAPI(),
  seo: new SeoAPI(),
  map: new MapAPI(),
  sms: new SmsAPI(),
  auth: new AuthAPI(),
  user: new UserAPI(),
  cart: new CartAPI(),
  tree: new TreeAPI(),
  plan: new PlanAPI(),
  vast: new VastAPI(),
  block: new BlockAPI(),
  pages: new PagesAPI(),
  ewano: new EwanoAPI(),
  order: new OrderAPI(),
  yalda: new YaldaAPI(),
  events: new EventsAPI(),
  source: new SourceAPI(),
  coupon: new CouponAPI(),
  ticket: new TicketAPI(),
  bonyad: new BonyadAPI(),
  forrest: new ForrestAPI(),
  comment: new CommentAPI(),
  voucher: new VoucherAPI(),
  section: new SectionAPI(),
  gateway: new GatewayAPI(),
  content: new ContentAPI(),
  contact: new ContactAPI(),
  channel: new ChannelAPI(),
  product: new ProductAPI(),
  version: new VersionAPI(),
  abrisham: new AbrishamAPI(),
  postcard: new PostcardAPI(),
  conductor: new ConductorAPI(),
  slideShow: new SlideShowAPI(),
  attribute: new AttributeAPI(),
  studyPlan: new StudyPlanAPI(),
  permission: new PermissionAPI(),
  fileUpload: new FileUploadAPI(),
  pageSetting: new PageSettingAPI(),
  blackFriday: new BlackFridayAPI(),
  referralCode: new ReferralCodeAPI(),
  teleMarketing: new TeleMarketingAPI(),
  liveDescription: new LiveDescriptionAPI(),
  contentTimepoint: new ContentTimepointAPI()
}

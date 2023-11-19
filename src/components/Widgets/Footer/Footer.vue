<template>
  <div v-if="type === 'main'"
       class="main-footer">
    <div class="homePage-footer-container">
      <div class="footer-box-1">
        <div class="content-layout box-1-details ">
          <div class="icons self-center">
            <lazy-img src="https://nodes.alaatv.com/upload/alaa-footer-desc.png"
                      class="alaa-logo-box"
                      height="52"
                      width="180" />
            <div class="connection">
              <div class="title">
                راه‌های ارتباطی:
              </div>
              <div class="icon-box">
                <div class="telegram">
                  <q-btn flat
                         square
                         class="btn-social"
                         icon="ph:telegram-logo"
                         :href="'https://telegram.me/alaa_sanatisharif'" />
                </div>
                <div class="instagram">
                  <q-btn flat
                         square
                         class="btn-social"
                         icon="ph:instagram-logo"
                         :href="'https://www.instagram.com/alaa_sanatisharif'" />
                </div>
              </div>
            </div>
          </div>
          <div class="titles">
            <div class="access title-box">
              <div class="main-title">دسترسی به سایت</div>
              <!-- <q-btn flat
                     class="sub-title"
                     :to="{name: 'cart'}">
                سوالات متداول
              </q-btn> -->
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'UserPanel.Ticket'}">
                تیکت پشتیبانی
              </q-btn>
              <!-- <q-btn flat
                     class="sub-title"
                     :to="{name: 'cart'}">
                ارتباط با ما
              </q-btn>
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'cart'}">
                درباره ما
              </q-btn> -->
            </div>
            <div class="profile title-box">
              <div class="main-title">دسترسی های کاربران</div>
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'Public.Shop'}">
                محصولات آموزشی
              </q-btn>
              <q-btn flat
                     class="sub-title"
                     :href="'https://soalaa.com/'">
                سوالا
              </q-btn>
              <q-btn flat
                     class="sub-title"
                     :href="'https://forum.alaatv.com'">
                آلاخونه
              </q-btn>
            </div>
            <div class="products title-box">
              <div class="main-title">دسته بندی های محبوب</div>
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'Public.Landing.DynamicName', params: {landing_name: 'rahabrisham'}}">
                راه ابریشم
              </q-btn>
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'Public.Landing.DynamicName', params: {landing_name: 'emtehan-nahaee-nohom'}}">
                امتحان نهایی
              </q-btn>
            </div>
            <div class="others title-box self-center" />
          </div>
        </div>
      </div>
      <div class="footer-box-2">
        <div class="content-layout-2 box-2-details">
          <div class="layer-1">
            <div class="description">
              آلاء یک مؤسسه غیر تجاری و دانش‌بنیان آموزشی برخط رایگان در ایران است که با هدف توسعهٔ عدالت آموزشی ایجاد شده و فعالیت خود را رسماً در سال ۱۳۹۲ آغاز نموده‌است.این مؤسسه هفتم بهمن سال ۱۳۹۸، مجوز رسانه صوتی و تصویری فراگیر را از صدا و سیما ایران دریافت نمود
            </div>
            <div class="footer-row">
              <div class="footer-logo-item item-soala">
                <router-link :to="{name: 'Public.Home'}">
                  <q-img src="https://nodes.alaatv.com/upload/new-footer-alaaLogo.png"
                         alt="آلاء" />
                </router-link>
              </div>
              <div class="footer-logo-item item-alaa">
                <a href="https://trustseal.enamad.ir/?id=125806&Code=MIc5m5QgNzwT4U7FmBLE"
                   target="_blank">
                  <q-img src="https://trustseal.enamad.ir/Content/Images/Star/star1.png?v=5.0.0.47"
                         alt="enamad.ir"
                         style="cursor:pointer" />
                </a>
              </div>
              <div class="footer-logo-item item-enamad">
                <a href="https://logo.samandehi.ir/Verify.aspx?id=146279&p=rfthaodsgvkauiwkjyoepfvl"
                   target="_blank">
                  <q-img src="https://nodes.alaatv.com/upload/samandehi.png?w=90&h=94"
                         alt="enamad.ir"
                         style="cursor:pointer" />
                </a>
              </div>
            </div>
          </div>
          <div class="layer-2 ">
            <div class="text-1">
              کلیه حقوق این وب سایت به ‌توسعه علمی آموزشی عدالت محور آلاء تعلق دارد و کپی برداری از آن ممنوع می باشد.
            </div>
            <q-btn unelevated
                   class="scroll-up"
                   @click="scrollToTop">
              <svg width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M18.07 11.57L12 5.5L5.92999 11.57"
                      stroke="#8A8CA6"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                <path d="M12 19V5.66992"
                      stroke="#8A8CA6"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>
              برو بالا

            </q-btn>
            <div class="flex items-center text-replacement">
              <div class="text">
                کلیه حقوق این وب سایت به ‌توسعه علمی آموزشی عدالت محور آلاء تعلق دارد و کپی برداری از آن ممنوع می باشد.
              </div>
              <a target="_blank"
                 href="https://alaatv.com">
                <div class="flex items-center">
                  <div>AlaaTV.com</div>
                  <div class="q-mx-xs">2012 </div>
                  <div>©</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-footer lt-md">
      <div class="mobile-footer-box">
        <div v-for="(item , index) in mobileFooterItems"
             :key="index"
             class="footer-item"
             :class="{ 'active': item.active, 'all-items-de-active': isAllRouteDeActive() }"
             @click="onMobileMainFooterItemClick(item)">
          <div class="icon-section">
            <!--            <lazy-img v-if="item.photo && (item.title !== 'profile' || user.id === null)"-->
            <!--                      :src="item.photo"-->
            <!--                      :alt="item.title"-->
            <!--                      width="24"-->
            <!--                      height="24" />-->
            <!--            <q-icon v-else-if="item.title !== 'profile' || user.id === null"-->
            <!--                    :name="item.icon"-->
            <!--                    :class="{ active: $route.name === item.to }"-->
            <!--                    size="24px" />-->
            <q-icon v-if="item.title !== 'profile' || user.id === null"
                    :name="item.icon"
                    :class="{ active: $route.name === item.to }"
                    size="24px" />
            <q-avatar v-else
                      size="24px">
              <lazy-img :src="user.photo"
                        alt="user photo"
                        width="24"
                        height="24" />
            </q-avatar>
          </div>
          <div class="label-section">
            {{item.label}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="type === 'gift-card'"
       class="gift-card-footer">
    <div class="mobile-footer">
      <q-list>
        <q-item v-for="(item , index) in giftCardFooterItems"
                :key="index"
                v-ripple
                clickable
                class="q-mt-sm"
                :active="isRouteSelected(item.to)"
                active-class="active-item"
                exact-active-class="active-route"
                :to="{ name: item.to }">
          <q-item-section avatar>
            <q-icon :name="item.icon"
                    :class="{ active: $route.name === item.to }"
                    color="white"
                    size="20px" />
            <div class="line" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
  <div v-else-if="type === 'triple-title-set'"
       class="triple-card-footer">
    <div class="mobile-footer">
      <q-list>
        <q-item v-for="(item , index) in tripleTitleSetItems.filter(item => item.visible)"
                :key="index"
                v-ripple
                clickable
                class="q-mt-sm"
                :active="isRouteSelected(item.to)"
                active-class="active-item"
                exact-active-class="active-route"
                :to="{ name: item.to }"
                @click="onFooterItemClick($event, item)">
          <q-item-section avatar>
            <q-icon :name="item.icon"
                    :class="{ active: $route.name === item.to }"
                    color="white"
                    size="20px" />
            <div class="line" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-dialog v-model="logoutDialog">
      <q-card class="logout-dialog-card">
        <q-card-section class="logout-header">
          <div class="header-title">
            <q-icon name="warning_amber"
                    color="negative" />
            <div class="header-title-text">
              هشدار
            </div>
          </div>
          <div class="close">
            <q-btn color="grey"
                   icon="close"
                   flat
                   @click="toggleLogoutDialog" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="logout-message">
            آیا میخواهید از حساب کاربری خود خارج شوید؟
          </div>
        </q-card-section>
        <q-card-actions align="right"
                        class="logout-dialog-action">
          <q-btn v-close-popup
                 outlined
                 unelevated
                 label="انصراف"
                 color="grey"
                 class="action-btn"
                 @click="toggleLogoutDialog" />
          <q-btn v-close-popup
                 unelevated=""
                 label="خروج"
                 color="negative"
                 class="action-btn"
                 @click="logout" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AlaaFooter',
  components: { LazyImg },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  },
  data () {
    return {
      activeClassForMobileFooter: false,
      mobileFooterItems: [
        {
          title: 'home',
          label: 'خانه',
          icon: 'ph:house',
          photo: 'https://nodes.alaatv.com/upload/icons/house.svg',
          route: { name: 'Public.Home' },
          active: false
        },
        {
          title: 'bank-soala',
          label: 'جستجو',
          icon: 'ph:compass',
          photo: 'https://nodes.alaatv.com/upload/icons/compass.svg',
          route: { name: 'Public.Content.Search' },
          active: false
        },
        {
          title: 'forum',
          label: 'آلاء خونه',
          icon: 'ph:book-open',
          photo: 'https://nodes.alaatv.com/upload/icons/chats.svg',
          route: null,
          externalLink: 'https://forum.alaatv.com',
          active: false
        },
        {
          title: 'card',
          label: 'سبد خرید',
          icon: 'ph:shopping-cart-simple',
          photo: 'https://nodes.alaatv.com/upload/icons/shoppingCart.svg',
          route: { name: 'Public.Checkout.Review' },
          active: false
        },
        {
          title: 'profile',
          label: 'پروفایل',
          icon: 'ph:user',
          photo: 'https://nodes.alaatv.com/upload/widget_items/dis.png',
          route: { name: 'UserPanel.Dashboard' },
          active: false
        }
      ],
      giftCardFooterItems: [
        {
          title: 'home',
          icon: 'isax:home',
          to: 'Public.Home',
          active: false
        },
        {
          title: 'card',
          icon: 'isax:cards',
          to: 'UserPanel.Asset.GiftCard.MyGiftCards',
          active: false
        },
        {
          title: 'transaction',
          icon: 'isax:empty-wallet',
          to: 'UserPanel.Asset.GiftCard.Transactions',
          active: false
        },
        {
          title: 'profile',
          icon: 'isax:user',
          to: 'UserPanel.Asset.GiftCard.UserInfo',
          active: false
        }
      ],
      tripleTitleSetItems: [
        {
          title: 'logout',
          icon: 'isax:logout',
          to: 'Public.Home',
          active: false,
          visible: true
        },
        {
          title: 'study plan',
          icon: 'calendar_today',
          to: 'UserPanel.Asset.TripleTitleSet.StudyPlan',
          active: false,
          visible: true
        },
        {
          title: 'products',
          icon: 'playlist_play',
          to: 'UserPanel.Asset.TripleTitleSet.Products',
          active: false,
          visible: true
        },
        {
          title: 'home',
          icon: 'home',
          to: 'UserPanel.Asset.TripleTitleSet.Dashboard',
          active: false,
          visible: true
        }
      ],
      logoutDialog: false,
      user: new User(),
      eventInfo: null,
      isAdmin: false
    }
  },
  mounted () {
    this.loadAuthData()
    this.$nextTick(() => {
      this.updateMobileFooterItemsActiveItem()
    })
  },
  methods: {
    updateMobileFooterItemsActiveItem () {
      this.mobileFooterItems.forEach(item => {
        item.active = this.isRouteSelected(item?.route?.name)
      })
    },
    getEventInfoByName () {
      return new Promise((resolve, reject) => {
        APIGateway.events.getEventInfoByName(this.$route.params.eventName)
          .then((eventInfo) => {
            this.eventInfo = eventInfo
            resolve(eventInfo)
          })
          .catch(() => {
            reject()
          })
      })
    },
    isRouteSelected (routeName) {
      return this.$route.name === routeName
    },
    isAllRouteDeActive () {
      const hasActiveItem = !!this.mobileFooterItems.find(item => item.route && this.isRouteSelected(item.route.name))
      return !hasActiveItem
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.getEventInfoByName()
        .then(() => {
          this.updateMenuItemsFromEventInfo()
        })
        .catch(() => {
        })
    },
    scrollToTop () {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    logout () {
      this.$store.dispatch('Auth/logOut')
    },
    toggleLogoutDialog () {
      this.logoutDialog = !this.logoutDialog
    },
    onFooterItemClick (event, item) {
      if (item.title === 'logout') {
        event.preventDefault()
        this.toggleLogoutDialog()
      }
    },
    onMobileMainFooterItemClick (item) {
      if (item.route) {
        this.$router.push(item.route)
        return
      }
      if (item.externalLink) {
        window.location.href = item.externalLink
      }
    },
    updateMenuItemsFromEventInfo () {
      this.isAdmin = this.user.hasPermission('insertStudyPlan') || this.user.hasPermission('updateStudyPlan') || this.user.hasPermission('deleteStudyPlan')

      this.updateMenuItemVisibility('UserPanel.Asset.TripleTitleSet.Dashboard', this.eventInfo.showDashboard)
      this.updateMenuItemVisibility('UserPanel.Asset.TripleTitleSet.StudyPlan', (this.eventInfo.showStudyPlan || this.isAdmin))
    },
    updateMenuItemVisibility (routeName, state) {
      this.tripleTitleSetItems.forEach((item, itemIndex) => {
        if (item.to === routeName) {
          this.tripleTitleSetItems[itemIndex].visible = state
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/sizes";
@import "src/css/Theme/spacing";
@import "src/css/Theme/Typography/typography";

.main-footer {
  .homePage-footer-container {
    @media screen and (width <=599px){
      display: none;
    }

    .content-layout,.content-layout-2 {
      max-width: 1362px;
      margin: auto;
      padding-top: 60px;
      padding-bottom: 60px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
      color: #8A8CA6;

      @media screen and (width <= 1439px) {
        max-width: 100%;
      }
    }

    .content-layout{
      @media screen and (width <= 1439px) {
        max-width: 100%;
        padding: 35px 53px;
      }

      @media screen and (width <= 1023px) {
        padding: 34px 33px;
      }

      @media screen and (width <= 599px) {
        padding-top: 28px;
        padding-left: 52px;
        padding-right: 52px;
      }
    }

    .content-layout-2{
      padding-top: 40px;
      padding-bottom:10px;

      @media screen and (width <= 1439px) {
        padding: 36px 50px 10px;
      }

      @media screen and (width <= 1023px){
        padding:20px 30px;
      }

      @media screen and (width <= 599px){
        padding: 25px 20px;
      }
    }

    .footer-box-1 {
      background: #FFF;
    }

    .footer-box-2 {
      background: #f4f6f9;
    }

    .box-1-details {
      display: grid;
      grid-template-columns: 454px auto;

      @media screen and (width <= 1439px) {
        grid-template-columns: 321px auto;
      }

      @media screen and (width <= 1023px) {
        display: flex;
        flex-direction: column;
      }

      .icons {
        :deep(.alaa-logo-box) {
          margin-bottom: 30px;
          width: 180px;

          @media screen and (width <= 1439px) {
            margin-bottom: 15px;
          }

          @media screen and (width <= 1023px) {
            margin-bottom: 0;
            margin-right: 30px;
          }

          @media screen and (width <= 599px) {
            margin-bottom: 0;
            margin-right: 0;
          }

        }

        @media screen and (width <= 1023px) {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        @media screen and (width <= 599px) {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .connection {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 254px;

          .icon-box {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .btn-social {

            }

            .telegram {
              padding-right: 8px;
            }

            .instagram {
              padding-left: 8px;
            }
          }
        }
      }

      .titles {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;

        @media screen and (width <= 599px) {
          grid-template-columns:1fr 1fr;
          justify-content: center;

          .title-box {
            place-self: center center;
            width: auto;
            padding-top: 20px;
          }

          .access,.profile {
            padding-bottom: 30px;
          }
        }

        @media screen and (width <= 380px) {
          grid-template-columns:1fr ;
        }

        .main-title {
          margin-left: 8px;
          margin-bottom:16px;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;

          @media screen and (width <= 1439px){
            margin-bottom: 12px;
          }
        }

        :deep(.sub-title) {
          width: 100%;
          align-items: flex-start;
          color: #434765;
          font-size: 12px;
          line-height: 19px;
          min-height: unset;
          margin-bottom: 10px;

          @media screen and (width <= 1439px){
            margin-bottom: 8px;
          }

          &:last-child{
            margin-bottom: 0;
          }

          .q-btn__content {
            margin-top: 0;
            margin-bottom: 0;
          }
        }

      }
    }

    .box-2-details {
      .layer-1 {
        display: flex;
        justify-content: space-between;
        padding-bottom: 30px;

        @media screen and (width <= 1439px){
          padding-bottom: 25px;
        }

        @media screen and (width <= 1023px) {
          flex-direction: column;
          padding-bottom: 30px;
        }

        @media screen and (width <= 599px) {
          padding-bottom: 20px;
        }

        .description {
          width: 540px;
          text-align: justify;

          @media screen and (width <= 1439px) {
            width: 420px;
          }

          @media screen and (width <= 1023px) {
            width: auto;
            padding-bottom: 20px;
          }

          //@media screen and (max-width: 599px) {}
        }

        .footer-row {
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;

          @media screen and (width <= 1023px) {
            justify-content: space-between;
            padding-right: 22px;
            padding-left: 22px;
          }

          @media screen and (width <= 599px) {
            padding-right: 0;
            padding-left: 0;
          }

          .footer-logo-item {
            width: 180px;
            height: 180px;
            background: #FFF;
            border-radius: 30px;

            .q-img,
            svg {
              max-width: 100%;
            }

            @media screen and (width <= 1439px) {
              width: 134px;
              height: 134px;
              border-radius: 24px;

            }

            @media screen and (width <= 1023px) {
              width: 120px;
              height: 120px;
            }

            @media screen and (width <= 599px) {
              width: 86px;
              height: 86px;
              border-radius: 20px;
            }

            .q-img {
              width: 120px;

              //height: 120px;
              @media screen and (width <= 1439px) {
                width: 97px;

                //height: 97px;
              }

              @media screen and (width <= 1023px) {
                width: 74px;

                //height: 74px;
              }

              @media screen and (width <= 599px) {
                width: 53px;

                //height: 53px;
              }
            }

          }

          .item-soala {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .item-alaa {
            margin-right: 52px;
            margin-left: 52px;
            display: flex;
            justify-content: center;
            align-items: center;

            @media screen and (width <= 1439px) {
              margin-right: 30px;
              margin-left: 30px;
            }

            @media screen and (width <=1023px) {
              margin-right: 0;
              margin-left: 00;
            }
          }

          .item-enamad {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

      }

      .layer-2{
        display: grid;
        grid-template-columns: 150px auto;
        align-items: flex-end;

        @media screen and (width <= 1023px){
          grid-template-columns: 1fr 1fr;
        }

        .text-replacement {
          justify-self: end;
        }

        @media screen and (width <= 599px){
          display: flex;
          flex-direction: column;
          position: relative;
          align-items: flex-start
        }

        .text-1{
          display: none;

          @media screen and (width <= 1023px){
            display: block;
            justify-self: center;
            grid-column: 1 / 3;
            font-size: 12px;
            line-height: 19px;
          }

          @media screen and (width <= 599px){
            display: none;
          }
        }

        .scroll-up {
          width: 100px;

          @media screen and (width <= 1023px){
            justify-self: start;
          }

          @media screen and (width <= 599px){
            width: 90px;
          }
        }

        .text{
          margin-right: 57px;

          @media screen and (width <= 1439px){
            margin-right: 40px;
          }

          @media screen and (width <= 1023px){
            display: none;
          }

          @media screen and (width <= 599px){
            display: block;
            margin-right: 0;
            font-size: 12px;
            line-height: 19px;
            max-width: 312px;
          }
        }

        color:#8A8CA6;

        a{
          text-decoration: none;
          color:#8A8CA6;

          @media screen and (width <= 599px){
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 12px;
            line-height: 19px;
          }

          @media screen and (width <= 599px){
            bottom: -20px;
          }
        }

        .toUpStyle{
          bottom: 0;
        }

      }
    }

    .layer-3{
      min-height: 40px;
      background: white;

      @media screen and (width <=1023px){
        min-height: 30px;
      }

      @media screen and (width <=599px){
        min-height: 60px;
      }
    }
  }

  //.layer-4 {
  //  min-height: 72px;
  //  display: none;
  //  @media screen and (max-width:599px){
  //    display: block;
  //  }
  //
  //}
  .mobile-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0 20px 20px;
    background: transparent;
    height: $mobileFooterHeight + 20px;

    .mobile-footer-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row;
      padding: 0 14px;
      justify-content: space-between;
      background: white;
      border-radius: 20px;
      box-shadow: 2px 2px 3px 0 #1018280F;

      .footer-item {
        transition: all 0.6s;
        width: 15.75%;

        //width: 54.17px;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;

        $icon-size: 24px;

        .icon-section {
          width: $icon-size;
          color: $blue-grey-3;

          .q-avatar {
            width: 100%;

            .lazy-img {
              width: 100%;

              img {
                width: 100%;
              }
            }
          }
        }

        .label-section {
          width: calc( 100% - #{$icon-size} );
          padding-left: $spacing-base;
          white-space: nowrap;
          overflow: hidden;

          @include caption1;

          display: none;
        }

        &.active {
          width: 37% ;

          //width: 127.27px ;
          background: $primary-1;
          border-radius: 20px;
          padding:8px 12px;
          margin: 16px 0;

          .icon-section{
            color: $primary;
          }

          .label-section {
            display: block;
            text-align: center;
            color: $primary;
          }
        }

        &.all-items-de-active {
          width: 20% ;

          .icon-section {
            .q-avatar {
              .lazy-img {
                img {
                }
              }
            }
          }

          .label-section {
            display: none;
          }
        }
      }
    }

  }
}

.parentBox {
  background: transparent;

  .icon {
    color: $blue-grey-3;
  }

  .label {
    @include caption1;

    display: none;
  }

  &.active {
    background: $primary-1;

    .icon {
      color: $primary;
    }

    .label {
      display: block;
    }
  }
}

.gift-card-footer {
  .mobile-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $mobileFooterHeight;
    display: none;
    background: $primary;
    border-radius: 16px 16px 0;
    box-shadow: 0 -6px 10px rgb(112 108 161 / 7%);

    @media screen and (width <=1024px){
      display: block;
      height: 72px;
    }

    $itemSize: 44px;

    .q-list {
      height: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;

      .q-item {
        width: $itemSize;
        min-width: $itemSize;
        max-width: $itemSize;
        min-height: $itemSize;
        max-height: $itemSize;
        height: $itemSize;
        padding: 0;
        margin-top: 0;
        margin-right: 30px;

        &.active-item {
          //background-color: red;
        }

        &:last-child {
          margin-right: 0;
        }

        &.q-item--active {
          .q-item__section {
            display: grid;
            padding: 12px;
            place-items: center;

            .line {
              display: block;
              height: 20px;
              width: 32px;
              background-color: white;
              margin-top: 20px;
              border-radius: 4px;
            }
          }
        }

        .q-item__section {
          padding: 0;
          width: $itemSize;
          min-width: $itemSize;
          max-width: $itemSize;
          min-height: $itemSize;
          max-height: $itemSize;
          height: $itemSize;
          border-radius: 8px;
          align-items: center;
          justify-content: center;

          .active {
            //background-color: rgba(128, 117, 220, 0.34);
            //background-color: lighten($primary,34%);
            //border-radius: 8px;
          }
        }
      }
    }

    .active-route {
      background-color: rgb(128 117 220 / 34%);
      border-radius: 8px;

      .indicator {
        height: 6px;
        width: 6px;
        background-color: white;
        border-radius: 50%;
        margin: auto;
      }
    }
  }
}

.triple-card-footer {
  .mobile-footer {
    //position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $mobileFooterHeight;
    display: none;
    background: #26A69A;
    border-radius: 16px 16px 0;
    box-shadow: 0 -6px 10px rgb(112 108 161 / 7%);

    @media screen and (width <=1024px){
      display: block;
      height: 72px;
    }

    $itemSize: 44px;

    .q-list {
      height: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;

      .q-item {
        width: $itemSize;
        min-width: $itemSize;
        max-width: $itemSize;
        min-height: $itemSize;
        max-height: $itemSize;
        height: $itemSize;
        padding: 0;
        margin-top: 0;
        margin-right: 30px;

        &.active-item {
          //background-color: red;
        }

        &:last-child {
          margin-right: 0;
        }

        &.q-item--active {
          .q-item__section {
            display: grid;
            padding: 12px;
            place-items: center;

            .line {
              display: block;
              height: 20px;
              width: 32px;
              background-color: white;
              margin-top: 20px;
              border-radius: 4px;
            }
          }
        }

        .q-item__section {
          padding: 0;
          width: $itemSize;
          min-width: $itemSize;
          max-width: $itemSize;
          min-height: $itemSize;
          max-height: $itemSize;
          height: $itemSize;
          border-radius: 8px;
          align-items: center;
          justify-content: center;

          .active {
            //background-color: rgba(128, 117, 220, 0.34);
            //background-color: lighten($primary,34%);
            //border-radius: 8px;
          }
        }
      }
    }

    .active-route {
      background-color: rgb(128 117 220 / 34%);
      border-radius: 8px;

      .indicator {
        height: 6px;
        width: 6px;
        background-color: white;
        border-radius: 50%;
        margin: auto;
      }
    }
  }
}

.logout-dialog-card {
  width: 488px;
  border-radius: 12px;
  padding: 0;
  background:#FFF;
  box-shadow: 0 2px 4px -2px rgb(16 24 40 / 6%), 0 4px 8px -2px rgb(16 24 40 / 10%);

  .logout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;

    .header-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .header-title-text {
        margin-left: 5px;
        color: #424242;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.32px;
      }
    }
  }

  .logout-message {
    padding: 24px;
    color:#424242;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.28px;
  }

  .logout-dialog-action {
    padding: 0 24px 20px;

    .action-btn {
      display: flex;
      width: 104px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

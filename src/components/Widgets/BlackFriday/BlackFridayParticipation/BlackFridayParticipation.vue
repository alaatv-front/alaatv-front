<template>
  <div class="participation-container">
    <div class="participation-slogan">
      <div class="slogan-header">
        <div class="slogan-title">
          <div class="slogan-title__icon">
            <lazy-img :src="'https://nodes.alaatv.com/upload/alaaPages/2023-11/pinkstar1699710628.png'" />
          </div>
          <div class="slogan-title__text">
            سرعت بی نهایت
          </div>
        </div>
        <div class="slogan-chance">
          <div class="slogan-chance__text">شانس امروز : </div>
          <div class="slogan-chance__number">{{ blackFridayCampaignData.chance }} عدد</div>
        </div>
      </div>
      <div class="slogan-body">
        به مدت ۷ روز، هر روز شانس برنده شدن "سرعت بی نهایت" یا همون ثبت نام رایگان توی همه دوره های آلا تا کنکور ۱۴۰۳ داری. این یعنی، سرعت بی نهایت به سمت هدفت. آلا همیشه کنارته رفیق!
      </div>
    </div>
    <div class="participation-action"
         @click="participateInLottery">
      <div class="participation-action_message">
        <div class="participation-action_message__text">امتحان</div>
        <div class="participation-action_message__text">کــــن!</div>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <inside-dialog :state="dialogState"
                     :coupon-title="coupon.discount_in_letters"
                     :coupon-code="coupon.code" />
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'components/lazyImg.vue'
import { BlackFridayCampaignData } from 'src/models/BlackFridayCampaignData.js'
import { APIGateway } from 'src/api/APIGateway.js'
import InsideDialog from 'src/components/Widgets/BlackFriday/BlackFridayParticipation/InsideDialog.vue'
import { mixinAuth } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'BlackFridayParticipation',
  components: {
    LazyImg,
    InsideDialog
  },
  mixins: [mixinAuth],
  data() {
    return {
      dialog: false,
      blackFridayCampaignData: new BlackFridayCampaignData(),
      dialogState: null,
      code: null,
      message: null,
      coupon: null
    }
  },
  computed: {
    selectedVideoIndex () {
      if (this.blackFridayCampaignData.videos.list.length === 0) {
        return null
      }

      const selectedVideoIndex = this.blackFridayCampaignData.videos.list.findIndex(video => video.selected)
      if (selectedVideoIndex !== -1) {
        return selectedVideoIndex
      }

      return this.getLastActiveIndex()
    }
  },
  mounted() {
    this.getBlackFridayCampaignData()
    this.$bus.on('onLoggedIn', () => {
      this.loadAuthData()
      this.getBlackFridayCampaignData()
    })
    this.$bus.on('balaa-ta-dey-on-watched-video', () => {
      this.getBlackFridayCampaignData()
    })
  },
  methods: {
    showLoginDialog () {
      this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params, query: this.$route.query })
      this.$store.commit('AppLayout/updateLoginDialog', true)
    },
    participateInLottery() {
      if (!this.isUserLogin) {
        this.showLoginDialog()
        return
      }
      APIGateway.blackFriday.participateInLottery()
        .then(codeMessageCoupon => {
          this.code = codeMessageCoupon.code
          this.message = codeMessageCoupon.message
          this.coupon = codeMessageCoupon.coupon

          if (this.code === 1) {
            this.dialogState = 'participate-success-infinity'
          } else if (this.code === 2) {
            this.dialogState = 'participate-success-coupon'
          } else if (this.code === 3) {
            if (this.selectedVideoIndex === this.blackFridayCampaignData.videos.list.length - 1) {
              this.dialogState = 'participate-fail-no-chance'
            }
            this.dialogState = 'participate-fail-has-chance'
          }
          this.dialog = true

          this.getBlackFridayCampaignData()
        })
    },
    getBlackFridayCampaignData () {
      this.blackFridayCampaignData.loading = true
      APIGateway.blackFriday.getCampaignData()
        .then((blackFridayCampaignData) => {
          this.blackFridayCampaignData = new BlackFridayCampaignData(blackFridayCampaignData)
          this.blackFridayCampaignData.loading = false
        })
        .catch(() => {
          this.blackFridayCampaignData.loading = false
        })
    },
    getLastActiveIndex () {
      let activeIndex = 0
      this.blackFridayCampaignData.videos.list.forEach((video, videoIndex) => {
        if (video.is_active && activeIndex < videoIndex) {
          activeIndex = videoIndex
        }
      })

      return activeIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.participation-container {
  background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/19201699707964.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 228px;
  padding: 48.5px 80px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (width <= 1919px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/19201699707964.png');
    background-repeat: no-repeat;
  }

  @media screen and (width <= 1439px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/10241699714534.png');
    background-repeat: no-repeat;
    height: 178.399px;
    padding: 37.5px 32px 0;
  }

  @media screen and (width <= 1023px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/6001699714668.png');
    background-repeat: no-repeat;
    height: 490.399px;
    padding: 40px 40px 0;
    flex-direction: column;
    gap: 4px;
    flex: 1 0 0;
  }

  @media screen and (width <= 599px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/3601699714708.png');
    height: 459.39px;
    padding: 32px 32px 0;
    flex-direction: column;
    gap: 4px;
    flex: 1 0 0;
  }

  .participation-slogan {
    max-width: 336px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (width <= 1439px) {
      max-width: 261px;
    }

    @media screen and (width <= 1023px) {
      max-width: 100%;
    }

    .slogan-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .slogan-title {
        display: flex;
        align-items: center;
        color: #fff;

        &__icon {
          width: 20px;
          height: 20px;
          margin-right: 4px;
          color: #F7AFA4;
        }

        &__text {
          font-family: ModamFaNumWeb;
          font-size: 24px;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          letter-spacing: -0.72px;

          @media screen and (width <= 1439px) {
            font-size: 16px;
            letter-spacing: -0.48px;
          }
        }
      }

      .slogan-chance {
        display: flex;
        align-items: center;
        color: #fff;
        font-family: ModamFaNumWeb;
        font-size: 16px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        letter-spacing: -0.48px;

        @media screen and (width <= 1439px) {
          font-size: 14px;
          letter-spacing: -0.42px;
        }

        &__number {
          margin-left: 1px;
        }
      }
    }

    .slogan-body {
      color: #fff;
      font-family: ModamFaNumWeb;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.54px;
      margin-top: 16px;

      @media screen and (width <= 1439px) {
        font-size: 14px;
        letter-spacing: -0.42px;
      }

      @media screen and (width <= 1439px) {
        text-align: center;
        margin-bottom: 50.7px;
      }
    }
  }

  .participation-action {
    margin: 21.8px auto 0 102.8px;
    display: inline-flex;
    padding: 19.2px 14px 17.84px 19.2px;
    align-items: center;
    flex-shrink: 0;
    height: 97.2px;
    border-radius: 81px;
    background:#FFF;
    box-shadow: 4.5px 4.5px 11.7px 0 rgb(198 75 58 / 90%), -4.5px -4.5px 9px 0 rgb(242 91 70 / 90%), 4.5px -4.5px 9px 0 rgb(198 75 58 / 20%), -4.5px 4.5px 9px 0 rgb(198 75 58 / 20%), -0.9px -0.9px 1.8px 0 rgb(198 75 58 / 50%) inset, 0.9px 0.9px 1.8px 0 rgb(242 91 70 / 30%) inset;
    cursor: pointer;
    animation-name: ripple;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;

    @media screen and (width <= 1439px) {
      margin: 19.44px auto 0 70.24px;
      height: 77.759px;
      width: 77.759px;
      padding: 15.376px 10.4px 13.256px 12.76px;
      border-radius: 64.8px;
      box-shadow: 3.6px 3.6px 9.36px 0 rgb(198 75 58 / 90%), -3.6px -3.6px 7.2px 0 rgb(242 91 70 / 90%), 3.6px -3.6px 7.2px 0 rgb(198 75 58 / 20%), -3.6px 3.6px 7.2px 0 rgb(198 75 58 / 20%), -0.72px -0.72px 1.44px 0 rgb(198 75 58 / 50%) inset, 0.72px 0.72px 1.44px 0 rgb(242 91 70 / 30%) inset;
    }

    @media screen and (width <= 1023px) {
      margin: 0 auto !important;
    }

    &_message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;

      &__text {
        margin: 0 auto;
        color:#D14835;
        text-align: right;
        font-family: ModamFaNumWeb;
        font-size: 24px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        letter-spacing: -0.72px;

        @media screen and (width <= 1439px) {
          font-size: 20px;
          letter-spacing: -0.6px;
        }
      }
    }
  }
}

@keyframes ripple {
    0% {
        box-shadow: 0 0 0 0 #fff4, 0 0 0 0 #fff4;
    }

    80% {
        box-shadow: 0 0 0 30px #fff0, 0 0 0 50px #fff0;
    }

    100% {
        box-shadow: 0 0 0 0 #fff0, 0 0 0 0 #fff0;
    }
}

</style>

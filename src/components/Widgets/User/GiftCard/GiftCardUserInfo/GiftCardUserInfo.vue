<template>
  <div class="show-gif-cards-page">
    <div class="page-title">
      کارت های من
    </div>
    <div class="page-introduction">
      <div class="no-gutters row">
        <div class="col-xl-6 col-12 description">
          تعداد
          <span>{{countOfTotalGiftCards}}</span>
          کارت هدیه به شما اختصاص داده شده است
          <br>
          از این پس میتوانید با اشتراک گذاری کارت‌های زیر، پس از استفاده آن‌ها از کارت پاداش دریافت کنید و درآمد داشته باشید.
        </div>
        <div class="col-xl-6 col-12">
          <div class="row card-box no-gutters">
            <div class="col-sm-6 col-12">
              <div class="card-style used-card">
                <div class="title">
                  کارت های استفاده شده
                </div>
                <div class="count align-self-end">
                  <span class="number">
                    {{countOfUsedGiftCards}}
                  </span>
                  <span>
                    کارت
                  </span>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="card-style unUsed-card">
                <div class="title">
                  کارت های باقی مانده
                </div>
                <div class="count align-self-end">
                  <span class="number">
                    {{countOfRemainGiftCards}}
                  </span>
                  <span>
                    کارت
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <div class="table-title">
        لیست کارت ها
      </div>
      <div  class="table-container text-center">
        <!--        <v-data-table-->
        <!--          v-model:options="options"-->
        <!--          :headers="headers"-->
        <!--          :items="giftCardList"-->
        <!--          mobile-breakpoint="300"-->
        <!--          :server-items-length="100"-->
        <!--          :items-per-page="5"-->
        <!--          :loading="loading"-->
        <!--          class="gift-card-table"-->
        <!--          disable-sort-->
        <!--          fixed-header-->
        <!--          hide-default-footer-->
        <!--        >-->
        <!--          <template v-slot:item.codeNumber="{ item }">-->
        <!--            <div class="codeNumber"-->
        <!--                 @click="copyCodeNumberToClipboard(item.codeNumber)">-->
        <!--              AT-->
        <!--              {{ item.codeNumber }}-->
        <!--            </div>-->
        <!--          </template>-->
        <!--          <template v-slot:item.status="{ item }">-->
        <!--            <div class="status-box">-->
        <!--              <div class="dot"-->
        <!--                   :class="item.status.length === 0 ? 'red-dot' : 'green-dot'"-->
        <!--              />-->
        <!--              {{ item.status.length === 0 ? 'استفاده نشده' : 'استفاده شده' }}-->
        <!--            </div>-->
        <!--          </template>-->
        <!--          <template v-slot:item.share="{ item }">-->
        <!--            <div class="">-->
        <!--              <div class="share-box">-->
        <!--                {{ item.share === 0 ? 'اشتراک گذاری:' : 'به اشتراک گذاشته اید' }}-->
        <!--                &lt;!&ndash;                                    <textarea id="content" value="ffffffffff"></textarea>&ndash;&gt;-->
        <!--                <div class="icon-container flex-center"-->
        <!--                     @click="shareGiftCard(item)">-->
        <!--                  <svg width="24"-->
        <!--                       height="24"-->
        <!--                       viewBox="0 0 24 24"-->
        <!--                       fill="none"-->
        <!--                       xmlns="http://www.w3.org/2000/svg">-->
        <!--                    <path-->
        <!--                      d="M16.33 7.90998V15.14C16.33 16.8 14.99 18.14 13.33 18.14H7.79004C6.13004 18.14 4.79004 16.8 4.79004 15.14V5.97998C4.79004 4.31998 6.13004 2.97998 7.79004 2.97998H11.4C11.64 2.97998 11.87 3.06998 12.03 3.23998L16.06 7.26998C16.23 7.43998 16.32 7.66998 16.32 7.89998L16.33 7.90998Z"-->
        <!--                      stroke="white"-->
        <!--                      stroke-width="1.5"-->
        <!--                      stroke-linecap="round"-->
        <!--                      stroke-linejoin="round" />-->
        <!--                    <path d="M19.21 10.79V18.02C19.21 19.68 17.87 21.02 16.21 21.02H8.97998"-->
        <!--                          stroke="white"-->
        <!--                          stroke-width="1.5"-->
        <!--                          stroke-linecap="round"-->
        <!--                          stroke-linejoin="round" />-->
        <!--                    <path-->
        <!--                      d="M16.14 7.76998H13.54C12.44 7.76998 11.54 6.86998 11.54 5.76998V3.24998"-->
        <!--                      stroke="white"-->
        <!--                      stroke-width="1.5"-->
        <!--                      stroke-linecap="round"-->
        <!--                      stroke-linejoin="round" />-->
        <!--                  </svg>-->
        <!--                </div>-->
        <!--                <v-bottom-sheet>-->
        <!--                  <template v-slot:activator="{ on, attrs }">-->
        <!--                    <v-btn-->
        <!--                      color="#ff9000"-->
        <!--                      icon-->
        <!--                      v-bind="attrs"-->
        <!--                      class="share-icon-button"-->
        <!--                      v-on="on"-->
        <!--                    >-->
        <!--                      <i class="fi fi-rr-share icon" />-->
        <!--                    </v-btn>-->
        <!--                  </template>-->
        <!--                  <v-list class="align-center">-->
        <!--                    <div class="row download-btn"-->
        <!--                           justify="center">-->
        <!--                      <div class="share-parent">-->
        <!--                        <ShareNetwork-->
        <!--                          network="whatsapp"-->
        <!--                          class="social-share"-->
        <!--                        >-->
        <!--                          <v-btn-->
        <!--                            class="ma-2"-->
        <!--                            color="amber darken-3"-->
        <!--                            dark-->
        <!--                            @click="openUrl (item,'whatsapp')"-->
        <!--                          >-->
        <!--                            <v-icon>mdi-whatsapp</v-icon>-->
        <!--                          </v-btn>-->
        <!--                        </ShareNetwork>-->
        <!--                        <ShareNetwork-->
        <!--                          network="telegram"-->
        <!--                          class="social-share"-->
        <!--                        >-->
        <!--                          <v-btn-->
        <!--                            class="ma-2"-->
        <!--                            color="amber darken-3"-->
        <!--                            dark-->
        <!--                            @click="openUrl (item, 'telegram')"-->
        <!--                          >-->
        <!--                            <v-icon>mdi-telegram</v-icon>-->
        <!--                          </v-btn>-->
        <!--                        </ShareNetwork>-->
        <!--                        <ShareNetwork-->
        <!--                          network="mail"-->
        <!--                          class="social-share"-->
        <!--                        >-->
        <!--                          <v-btn-->
        <!--                            class="ma-2"-->
        <!--                            color="amber darken-3"-->
        <!--                            dark-->
        <!--                            @click="openUrl (item, 'mail')"-->
        <!--                          >-->
        <!--                            <v-icon>mdi-mail</v-icon>-->
        <!--                          </v-btn>-->
        <!--                        </ShareNetwork>-->
        <!--                        <ShareNetwork-->
        <!--                          network="linkedin"-->
        <!--                          class="social-share"-->
        <!--                        >-->
        <!--                          <v-btn-->
        <!--                            class="ma-2"-->
        <!--                            color="amber darken-3"-->
        <!--                            dark-->
        <!--                            @click="openUrl (item, 'linkedin')"-->
        <!--                          >-->
        <!--                            <v-icon>mdi-linkedin</v-icon>-->
        <!--                          </v-btn>-->
        <!--                        </ShareNetwork>-->
        <!--                        <ShareNetwork-->
        <!--                          network="pinterest"-->
        <!--                          class="social-share"-->
        <!--                        >-->
        <!--                          <v-btn-->
        <!--                            class="ma-2"-->
        <!--                            color="amber darken-3"-->
        <!--                            dark-->
        <!--                            @click="openUrl (item, 'pinterest')"-->
        <!--                          >-->
        <!--                            <v-icon>mdi-pinterest</v-icon>-->
        <!--                          </v-btn>-->
        <!--                        </ShareNetwork>-->
        <!--                        <ShareNetwork-->
        <!--                          network="twitter"-->
        <!--                          class="social-share"-->
        <!--                        >-->
        <!--                          <v-btn-->
        <!--                            class="ma-2"-->
        <!--                            color="amber darken-3"-->
        <!--                            dark-->
        <!--                            @click="openUrl (item, 'twitter')"-->
        <!--                          >-->
        <!--                            <v-icon>mdi-twitter</v-icon>-->
        <!--                          </v-btn>-->
        <!--                        </ShareNetwork>-->
        <!--                        <ShareNetwork-->
        <!--                          network="facebook"-->
        <!--                          class="social-share"-->
        <!--                        >-->
        <!--                          <v-btn-->
        <!--                            class="ma-2"-->
        <!--                            color="amber darken-3"-->
        <!--                            dark-->
        <!--                            @click="openUrl (item, 'facebook')"-->
        <!--                          >-->
        <!--                            <v-icon>mdi-facebook</v-icon>-->
        <!--                          </v-btn>-->
        <!--                        </ShareNetwork>-->
        <!--                      </div>-->
        <!--                    </div>-->
        <!--                  </v-list>-->
        <!--                </v-bottom-sheet>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--          <template v-slot:item.validity="{ item }">-->
        <!--            <div class=" validity-box">-->
        <!--              {{ item.validity.toLocaleString('fa') }}-->
        <!--              <div class="currency ml-2">-->
        <!--                تومان-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </v-data-table>-->
      </div>
      <div class="text-center">
        <!--        <v-pagination-->
        <!--          v-model="page"-->
        <!--          flat-->
        <!--          class="gift-card-pagination"-->
        <!--          color="#ff9000"-->
        <!--          :length="lastPage"-->
        <!--          :total-visible="5"-->
        <!--        ></v-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import GiftCardMixin from '../Mixin/GiftCardMixin.js'
export default {
  name: 'GiftCardUserInfo',
  mixins: [GiftCardMixin],
  data() {
    return {
      lastPage: 0,
      page: 1,
      shareCodeLoading: false,
      loading: false,
      pageCount: 0,
      itemsPerPage: 4,
      headers: [
        { text: 'شماره کارت', cellClass: 'min-colum-width cards-list-first-colum-padding', class: 'header-style cards-list-header-padding', value: 'codeNumber' },
        { text: 'اعتبار', cellClass: 'min-colum-width', class: 'header-style', value: 'validity' },
        { text: 'وضعیت', cellClass: 'min-colum-width', class: 'header-style', value: 'status' },
        { text: 'اشتراک گذاری', cellClass: 'big-cell-width', class: 'header-style', value: 'share' }
      ],
      options: {},
      giftCardList: []
    }
  },
  computed: {
    countOfTotalGiftCards() {
      // return this.$store.getters.appProps.countOfTotalGiftCards
      return 1
    },
    countOfUsedGiftCards() {
      // return this.$store.getters.appProps.countOfUsedGiftCards
      return 1
    },
    countOfRemainGiftCards() {
      // return this.$store.getters.appProps.countOfRemainGiftCards
      return 1
    }
  },
  watch: {
    page: {
      handler() {
        this.getGiftCardsData()
      }
    }
  },
  created() {
    // this.initPage()
  },
  methods: {
    async copyCodeNumberToClipboard(code) {
      try {
        await this.copyToClipboard(code)
        this.toast('کد کارت هدیه شما کپی شد')
      } catch (e) {
        this.toast('سیستم کپی در مرورگر شماپشتیبانی نمیشود. ', 'error')
      }
    },

    async openUrl(cartItem, socialMedia) {
      try {
        // await this.$axios.post('/ajax/referralCode/' + card.id + '/shared', { assign: true })
        await this.$axios.post('/alaa/api/v2/ajax/referralCode/' + cartItem.id + '/shared', { assign: true })
        const url = this.getShareLink(cartItem, socialMedia)
        open(url)
      } catch (error) {
        if (error.response && error.response?.data) {
          const messages = this.getErrorMessages(error.response?.data)
          this.showErrorMessages(messages)
          return
        }

        this.toast('سیستم اشتراک گذاری در مرورگر شماپشتیبانی نمیشود. ', 'error')
      }
    },
    getShareLink(cartItem, socialMedia) {
      if (socialMedia === 'telegram') {
        return 'https://telegram.me/share/url?url=' + cartItem.url
      } else if (socialMedia === 'whatsapp') {
        return 'https://web.whatsapp.com/send?l=en&text=' + cartItem.url
      } else if (socialMedia === 'mail') {
        return 'mailto:info@alaatv.com?&subject=' + cartItem.url
      } else if (socialMedia === 'linkedin') {
        return 'https://www.linkedin.com/shareArticle?mini=true&url=' + cartItem.url
      } else if (socialMedia === 'pinterest') {
        return 'https://pinterest.com/pin/create/button/?url=' + cartItem.url
      } else if (socialMedia === 'twitter') {
        return 'https://twitter.com/home?status=' + cartItem.url
      } else if (socialMedia === 'facebook') {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + cartItem.url
      }
    },
    initPage() {
      this.getGiftCardsData()
    },

    async getGiftCardsData() {
      this.loading = true
      this.giftCardList = []
      try {
        const response = await this.getGiftCards()
        // console.log(response)
        const cardList = response.data.data
        this.lastPage = response.data.meta.last_page
        cardList.forEach(card => {
          this.giftCardList.push({
            id: card.id,
            codeNumber: card.code,
            validity: card.discount,
            status: card.orders,
            share: card.isAssigned,
            enable: card.enable,
            url: card.url,
            usageNumber: card.usageNumber
          })
        })
        this.loading = false
      } catch (error) {
        this.loading = false
        const messages = this.getErrorMessages(error.response.data)
        this.showErrorMessages(messages)
      }
    },
    shareGiftCard: async function (card) {
      try {
        await this.$axios.post('/alaa/api/v2/ajax/referralCode/' + card.id + '/shared', { assign: true })
        this.updateTableData(card.id)
        await this.copyToClipboard(card.url)
        this.toast('کد لینک کارت هدیه شما کپی شد')
      } catch (e) {
        if (e.response && e.response?.data) {
          const messages = this.getErrorMessages(e.response?.data)
          this.showErrorMessages(messages)
        }
      }
    },
    copyToClipboard (textToCopy) {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(textToCopy)
      }
      return Promise.reject('The Clipboard API is not available.')
    },
    updateTableData(cardId) {
      this.giftCardList.forEach(item => {
        if (item.id === cardId) {
          item.share = 1
        }
      })
    },
    getGiftCards() {
      return this.$axios.get('/alaa/api/v2/ajax/referralCodes', {
        ...(this.page > 1 && { params: { page: this.page } })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.show-gif-cards-page{
}
.page-title {
  font-weight: 600;
  font-size: 20px;
  line-height: 31px;
  text-align: left;
  letter-spacing: -0.03em;
  color: #8798B1;
  margin-bottom: 16px;
}
.page-introduction{
  margin-bottom: 31px;
  color: #697D9A;
  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: left;
    letter-spacing: -0.03em;
    margin-top:50px;
  }
  .card-style {
    background: #FFFFFF;
    height: 140px;
    box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
    border-radius: 16px;
    padding: 20px 30px 18px 30px;
    display: flex;
    justify-content: space-between;
    position: relative;
    &.used-card{
      margin-left: 15px;
    }
    &.unUsed-card{
      margin-left: 15px;
    }

    .title{
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      text-align: left;
    }
    .count{
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      text-align: left;
      position: absolute;
      bottom: 20px;
      right: 30px;
      .number{
        font-weight: 700;
        font-size: 36px;
        line-height: 56px;
      }
    }
  }
}
.table-title{
  font-weight: 600;
  font-size: 20px;
  line-height: 31px;
  text-align: left;
  letter-spacing: -0.03em;
  color: #8798B1;
  margin-bottom: 16px;
}
.table-container {
  padding-bottom: 10px;
  overflow-x: scroll;
  .flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .share-box {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    .share-icon-button{
      font-size: 20px;
      @media screen and (max-width: 599px) {
        font-size: 16px;
      }
    }

    .icon-container {
      width: 32px;
      height: 32px;
      background: #FF9000;
      box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
      border-radius: 8px;
      cursor: pointer;
    }
  }

  .validity-box {
    display: flex;
    .currency {
      margin-left: 5px;
    }
  }

}
.status-box {
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;

  .dot {
    width: 6px;
    height: 6px;
    margin-left: 6px;
    border-radius: 10px;

    &.red-dot {
      background-color: #EF5350;
    }

    &.green-dot {
      background-color: #4CAF50;
    }

  }
}
.codeNumber{
  cursor: pointer;
}
.max-table-row-width{

}
.gift-card-pagination{
  margin-top: 40px;
}
@media only screen and (max-width: 1903px){
  .page-introduction{
    margin-bottom: 24px;
    .description {
      margin-top:0;
      margin-bottom: 21px;
    }
    .card-style{
      display: grid;
      grid-template-columns: 1fr;
      padding: 20px 30px 10px 30px;
      .count{
        justify-self: end;
      }
    }
  }
  .table-title{
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 16px;
  }
  .gift-card-pagination{
    margin-top: 30px;
  }
  .page-title {
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 10px;
  }
}
@media only screen and (max-width: 599px) {
  .table-title{
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 16px;
  }
  .page-title {
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 5px;
  }
  .page-introduction{
    margin-bottom: 29px;
    .description {
      margin-bottom: 16px;
    }
    .card-style {
      height: 110px;
      padding: 16px;
      position: relative;
      &.used-card{
        margin-left: 0;
        margin-bottom: 16px;
      }
      &.unUsed-card{
        margin-left: 0;
      }
      .count{
        position: absolute;
        bottom: 0;
        left: 16px;
        .number{
          font-weight: 700;
          font-size: 36px;
          line-height: 56px;
        }
      }
    }
  }
  .gift-card-pagination{
    margin-top: 24px;
  }
}

</style>

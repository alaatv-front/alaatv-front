<template>
  <div class="show-gif-cards-page">
    <div class="page-title">
      داشبورد
    </div>
    <div class="page-introduction">
      <div class="no-gutters row">
        <div class="col-md-9 col-12">
          <div class="row card-box no-gutters">
            <div class="col-sm-6 col-12">
              <div class="card-style used-card">
                <div class="title">
                  کارت های استفاده شده
                </div>
                <div class="count align-self-end">
                  <span class="number">
                    {{sales_man.count_of_total_gift_cards - sales_man.count_of_remain_gift_cards}}
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
                    {{sales_man.count_of_remain_gift_cards}}
                  </span>
                  <span>
                    کارت
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12 column">
          <div class="card-style payment-card">
            <div class="title q-mb-lg">
              ظرفیت تا پرداخت بعدی
            </div>
            <div class="pie"
                 style="

--p:88;">
              <span class="text-center">%88</span>
              <span class="text text-center">حداقل تسویه</span>
            </div>
            <div class="Payable row justify-center q-py-lg">
              <div class="number q-mx-xs">1,850,000</div>
              <div class="toman q-mx-xs">تومان</div>
            </div>
            <q-btn flat
                   color="primary"
                   class="count q-mt-md">
              <span>
                اطلاعات بیشتر
              </span>
              <q-icon name="isax:arrow-left" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="text-center">-->
    <!--      <div class="table-title">-->
    <!--        لیست کارت ها-->
    <!--      </div>-->
    <!--      <div class="table-container text-center">-->
    <!--        <q-table :rows="referralCodeList.list"-->
    <!--                 :columns="referralCodeColumns"-->
    <!--                 :loading="loading"-->
    <!--                 :rows-per-page-options="[0]"-->
    <!--                 hide-bottom-->
    <!--                 row-key="id">-->
    <!--          <template #body-cell="props">-->
    <!--            <q-td v-if="props.col.name === 'code'"-->
    <!--                  @click="copyCodeNumberToClipboard(props.value)">-->
    <!--              {{ props.value }}-->
    <!--            </q-td>-->
    <!--            <q-td v-else-if="props.col.name === 'isAssigned'"-->
    <!--                  class="isAssigned-column">-->
    <!--              <div class="share-box">-->
    <!--                {{ props.value === 0 ? 'اشتراک گذاری:' : 'به اشتراک گذاشته اید' }}-->
    <!--                <q-btn class="icon-container"-->
    <!--                       :loading="props.row.loading">-->
    <!--                  <svg width="24"-->
    <!--                       height="24"-->
    <!--                       viewBox="0 0 24 24"-->
    <!--                       fill="none"-->
    <!--                       xmlns="http://www.w3.org/2000/svg">-->
    <!--                    <path d="M16.33 7.90998V15.14C16.33 16.8 14.99 18.14 13.33 18.14H7.79004C6.13004 18.14 4.79004 16.8 4.79004 15.14V5.97998C4.79004 4.31998 6.13004 2.97998 7.79004 2.97998H11.4C11.64 2.97998 11.87 3.06998 12.03 3.23998L16.06 7.26998C16.23 7.43998 16.32 7.66998 16.32 7.89998L16.33 7.90998Z"-->
    <!--                          stroke="white"-->
    <!--                          stroke-width="1.5"-->
    <!--                          stroke-linecap="round"-->
    <!--                          stroke-linejoin="round" />-->
    <!--                    <path d="M19.21 10.79V18.02C19.21 19.68 17.87 21.02 16.21 21.02H8.97998"-->
    <!--                          stroke="white"-->
    <!--                          stroke-width="1.5"-->
    <!--                          stroke-linecap="round"-->
    <!--                          stroke-linejoin="round" />-->
    <!--                    <path d="M16.14 7.76998H13.54C12.44 7.76998 11.54 6.86998 11.54 5.76998V3.24998"-->
    <!--                          stroke="white"-->
    <!--                          stroke-width="1.5"-->
    <!--                          stroke-linecap="round"-->
    <!--                          stroke-linejoin="round" />-->
    <!--                  </svg>-->
    <!--                  <q-popup-proxy :offset="[10, 10]"-->
    <!--                                 transition-show="flip-up"-->
    <!--                                 transition-hide="flip-down">-->
    <!--                    <q-banner dense-->
    <!--                              rounded>-->
    <!--                      <share-network :url="props.row.url"-->
    <!--                                     @on-select="shareGiftCard(props.row)" />-->

    <!--                      &lt;!&ndash;                                      <ShareNetwork&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                        network="facebook"&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                        class="social-share"&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                      >&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                        <v-btn&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                          class="ma-2"&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                          color="amber darken-3"&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                          dark&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                          @click="openUrl (item, 'facebook')"&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                        >&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                          <v-icon>mdi-facebook</v-icon>&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                        </v-btn>&ndash;&gt;-->
    <!--                      &lt;!&ndash;                                      </ShareNetwork>&ndash;&gt;-->
    <!--                    </q-banner>-->
    <!--                  </q-popup-proxy>-->
    <!--                </q-btn>-->
    <!--              </div>-->
    <!--            </q-td>-->
    <!--            <q-td v-else-if="props.col.name === 'orders'">-->
    <!--              <div class="status-box">-->
    <!--                <div class="dot"-->
    <!--                     :class="props.value.length === 0 ? 'red-dot' : 'green-dot'" />-->
    <!--                {{ props.value.length === 0 ? 'استفاده نشده' : 'استفاده شده' }}-->
    <!--              </div>-->
    <!--            </q-td>-->
    <!--            <q-td v-else>-->
    <!--              {{ props.value }}-->
    <!--            </q-td>-->
    <!--          </template>-->
    <!--        </q-table>-->
    <!--      </div>-->
    <!--      <div class="flex justify-center q-my-xl">-->
    <!--        <q-pagination v-model="page"-->
    <!--                      :max="lastPage"-->
    <!--                      :max-pages="6"-->
    <!--                      boundary-links-->
    <!--                      icon-first="isax:arrow-left-2"-->
    <!--                      icon-last="isax:arrow-right-3"-->
    <!--                      @update:model-value="getGiftCardsData" />-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import GiftCardMixin from '../Mixin/GiftCardMixin.js'
// import ShareNetwork from 'src/components/ShareNetwork.vue'

export default {
  name: 'GiftCardDashboard',
  // components: { ShareNetwork },
  mixins: [GiftCardMixin],
  data() {
    return {
      sales_man: {
        wallet_type: 'main_account',
        wallet_balance: 9845,
        total_commission: 55183,
        has_signed_contract: false,
        minAmount_until_settlement: 10000,
        count_of_total_gift_cards: 11,
        count_of_used_gift_cards: 0,
        count_of_remain_gift_cards: 11,
        income_being_settle: 90434
      },
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
      referralCodeList: [],
      referralCodeColumns: [
        {
          name: 'code',
          label: 'شماره کارت',
          align: 'center',
          field: row => 'AT' + row.code
        },
        {
          name: 'discount',
          label: 'اعتبار',
          align: 'center',
          field: row => row.discount.toLocaleString('fa') + ' تومان'
        },
        {
          name: 'orders',
          label: 'وضعیت',
          align: 'center',
          field: row => row.orders
        },
        {
          name: 'isAssigned',
          label: 'اشتراک گذاری',
          align: 'left',
          field: row => row.isAssigned
        }
      ]
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
  mounted () {
    this.loadAllData()
  },
  methods: {
    copyCodeNumberToClipboard(code) {
      this.copyToClipboard(code)
        .then(() => {
          this.$q.notify({
            message: 'کد کارت هدیه شما کپی شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در کپی کردن کد کارت هدیه در مرورگر شما رخ داده است.'
          })
        })
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
    loadAllData() {
      this.getGiftCardsData()
      // APIGateway.referralCode.batchStore({
      //   data: {
      //     discounttype_id: 2, // Number -- optional
      //     number_of_codes: 50, // Number
      //     commission: 20, // Number
      //     mobile: '09999999999', // String
      //     nationalCode: '0000000000', // String
      //     firstName: 'علی', // String
      //     lastName: 'اسمعیلی' // String
      //   }
      // })
    },
    getGiftCardsData(page = 1) {
      this.loading = true
      this.referralCodeList = []
      APIGateway.referralCode.index({ data: { page } })
        .then(({ referralCodeList, paginate }) => {
          this.lastPage = paginate.last_page
          this.referralCodeList = referralCodeList
          // console.log(this.referralCodeList.list)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    shareGiftCard (card) {
      card.loading = true
      APIGateway.referralCode.setShared({ data: { referralCode: card.id } })
        .then(() => {
          card.isAssigned = 1
          card.loading = false
          this.copyToClipboard(card.url)
            .then(() => {
              this.$q.notify({
                message: 'کد لینک کارت هدیه شما کپی شد',
                type: 'positive'
              })
            })
            .catch(() => {
              this.$q.notify({
                type: 'negative',
                message: 'مشکلی در کپی کردن لینک در مرورگر شما رخ داده است.'
              })
            })
        })
        .catch(() => {
          card.loading = false
        })
    },
    copyToClipboard (textToCopy) {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(textToCopy)
      }
      return Promise.reject('The Clipboard API is not available.')
    },
    updateTableData(cardId) {
      this.referralCodeList.forEach(item => {
        if (item.id === cardId) {
          item.share = 1
        }
      })
    }
  }
}
</script>
<style scoped lang="css">
.pie > .text{
  font-weight: 400;
  font-size: 14px;
}

.pie {
  --b:20px;
  --c:#FF9000;
  --w:200px;

  width:var(--w);
  aspect-ratio:1;
  position:relative;
  display:inline-grid;
  place-self: center;
  margin:5px;
  place-content:center;
  font-size:48px;
  font-weight:700;
}

.pie::before,
.pie::after {
  content:"";
  position:absolute;
  border-radius:50%;
}

.pie::before {
  inset:0;
  background:
    radial-gradient(farthest-side,var(--c) 98%,#0000) top/var(--b) var(--b) no-repeat,
    conic-gradient(var(--c) calc(var(--p) * 1%),#0000 0);
  mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
}

.pie::after {
  inset:calc(50% - var(--b) / 2);
  background:var(--c);
  transform:rotate(calc(var(--p) * 3.6deg)) translateY(calc(50% - var(--w) / 2));
}
</style>
<style lang="scss" scoped>
@import "src/components/Widgets/User/GiftCard/Style/theme";

:deep(.q-table) {
  color: $text-color-secondary;
}

.page-title {
  font-weight: 600;
  font-size: 20px;
  line-height: 31px;
  text-align: left;
  letter-spacing: -0.03em;
  color: $text-color-secondary;
  margin-bottom: 24px;
}

.page-introduction{
  margin-bottom: 31px;
  color: $text-color-primary;

  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: left;
    letter-spacing: -0.03em;
    margin-top:50px;
  }

  .card-style {
    background: #FFF;
    height: 140px;
    box-shadow: 3px 3px 6px rgb(52 54 55 / 4%);
    border-radius: 16px;
    padding: 20px 30px 18px;
    display: flex;
    justify-content: space-between;
    position: relative;

    &.used-card{
      margin-left: 15px;
    }

    &.unUsed-card{
      margin-left: 15px;
    }

    &.payment-card{
      margin-left: 15px;
      height: 450px;
    }

    .title{
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      text-align: left;
    }

    .Payable{
      align-items: center;

      .number{
        font-weight: 700;
        font-size: 30px;
        line-height: 46px;
      }

      .toman{
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
      }
    }

    .count{
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      text-align: left;
      bottom: 20px;
      left: 10px;

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
  color: $text-color-secondary;
  margin-bottom: 16px;
}

.table-container {
  padding-bottom: 10px;
  overflow-x: scroll;

  .isAssigned-column {
    width: 400px;

    .share-box {
      display: grid;
      width: 200px;
      grid-template-columns: 150px 50px;

      .share-icon-button{
        font-size: 20px;

        @media screen and (width <= 599px) {
          font-size: 16px;
        }
      }

      .icon-container {
        width: 32px;
        height: 32px;
        background: #FF9000;
        box-shadow: 3px 3px 6px rgb(52 54 55 / 4%);
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
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
  justify-content: center;

  .dot {
    width: 6px;
    height: 6px;
    margin-right: 6px;
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

.gift-card-pagination{
  margin-top: 40px;
}

@media only screen and (width <= 1903px){
  .page-introduction{
    margin-bottom: 24px;

    .description {
      margin-top:0;
      margin-bottom: 21px;
    }

    .card-style{
      display: grid;
      grid-template-columns: 1fr;
      padding: 20px 30px 10px;

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
    margin-bottom: 24px;
  }
}

@media only screen and (width <= 599px) {
  .table-title{
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 16px;
  }

  .page-title {
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 16px;
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

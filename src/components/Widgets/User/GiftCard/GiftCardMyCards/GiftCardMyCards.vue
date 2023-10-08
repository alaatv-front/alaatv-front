<template>
  <div class="show-gif-cards-page">
    <div class="page-title">
      کارت های من
    </div>
    <div class="page-introduction">
      <div class="no-gutters row q-col-gutter-md">
        <div class="col-md-3 col-12 description column q-pt-lg">
          <span>تعداد {{sales_man.count_of_total_gift_cards}} کارت هدیه به شما اختصاص داده شده است
          </span>
          <br>
          از این پس میتوانید با اشتراک گذاری کارت‌های زیر، پس از استفاده آن‌ها از کارت پاداش دریافت کنید و درآمد داشته باشید.
        </div>
        <div class="col-md-9 col-12">
          <div class="row card-box q-col-gutter-md">
            <div class="col-sm-3 col-12">
              <div class="card-style used-card">
                <q-inner-loading v-if="salesManLoading"
                                 showing />
                <div class="title">
                  کارت های استفاده نشده
                </div>
                <div class="count align-self-end">
                  <span class="number">
                    {{sales_man.count_of_unused_with_assignee_gift_cards.toLocaleString('fa')}}
                  </span>
                  <span>
                    کارت
                  </span>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-12">
              <div class="card-style used-card">
                <q-inner-loading v-if="salesManLoading"
                                 showing />
                <div class="title">
                  کارت های استفاده شده
                  <br>
                  پرداخت شده
                </div>
                <div class="count align-self-end">
                  <span class="number">
                    {{sales_man.count_of_used_gift_cards.toLocaleString('fa')}}
                  </span>
                  <span>
                    کارت
                  </span>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-12">
              <div class="card-style used-card">
                <q-inner-loading v-if="salesManLoading"
                                 showing />
                <div class="title">
                  کارت های استفاده شده
                  <br>
                  منتظر پرداخت
                </div>
                <div class="count align-self-end">
                  <span class="number">
                    {{sales_man.count_of_used_without_pay_gift_cards.toLocaleString('fa')}}
                  </span>
                  <span>
                    کارت
                  </span>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-12">
              <div class="card-style unUsed-card">
                <q-inner-loading v-if="salesManLoading"
                                 showing />
                <div class="title">
                  کارت های باقی مانده
                </div>
                <div class="count align-self-end">
                  <span class="number">
                    {{sales_man.count_of_remain_gift_cards.toLocaleString('fa')}}
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
        <q-btn icon="isax:filter"
               flat
               class="absolute-top-right"
               @click="onToggleFilter" />
      </div>
      <div v-show="showFilter"
           class="table-filter-expansion">
        <div class="row">
          <div class="col-md-3 col-12 text-left">
            <q-checkbox v-model="isAssignedUnused"
                        :true-value="1"
                        :false-value="0"
                        label="کارت های استفاده نشده"
                        @update:model-value="onChangeFilter" />
          </div>
          <div class="col-md-3 col-12 text-left">
            <q-checkbox v-model="isUsedAndPaid"
                        :true-value="1"
                        :false-value="0"
                        label="کارتهای استفاده شده پرداخت شده"
                        @update:model-value="onChangeFilter" />
          </div>
          <div class="col-md-3 col-12 text-left">
            <q-checkbox v-model="isUsedAndUnpaid"
                        :true-value="1"
                        :false-value="0"
                        label="کارتهای استفاده شده منتظر پرداخت"
                        @update:model-value="onChangeFilter" />
          </div>
          <div class="col-md-3 col-12 text-left">
            <q-checkbox v-model="isUnAssignedUnused"
                        :true-value="1"
                        :false-value="0"
                        label="کارتهای باقی مانده"
                        @update:model-value="onChangeFilter" />
          </div>
        </div>
      </div>
      <div class="table-container text-center">
        <q-table :rows="referralCodeList.list"
                 :columns="referralCodeColumns"
                 hide-bottom
                 :loading="loading"
                 row-key="id">
          <template #body-cell="props">
            <q-td v-if="props.col.name === 'code'"
                  @click="copyCodeNumberToClipboard(props.value)">
              {{ props.value }}
            </q-td>
            <q-td v-else-if="props.col.name === 'isAssigned'"
                  class="isAssigned-column">
              <div class="share-box">
                {{ props.value === 0 ? 'اشتراک گذاری:' : 'به اشتراک گذاشته اید' }}
                <q-btn class="icon-container"
                       :loading="props.row.loading">
                  <svg width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.33 7.90998V15.14C16.33 16.8 14.99 18.14 13.33 18.14H7.79004C6.13004 18.14 4.79004 16.8 4.79004 15.14V5.97998C4.79004 4.31998 6.13004 2.97998 7.79004 2.97998H11.4C11.64 2.97998 11.87 3.06998 12.03 3.23998L16.06 7.26998C16.23 7.43998 16.32 7.66998 16.32 7.89998L16.33 7.90998Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                    <path d="M19.21 10.79V18.02C19.21 19.68 17.87 21.02 16.21 21.02H8.97998"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                    <path d="M16.14 7.76998H13.54C12.44 7.76998 11.54 6.86998 11.54 5.76998V3.24998"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                  </svg>
                  <q-popup-proxy :offset="[10, 10]"
                                 transition-show="flip-up"
                                 transition-hide="flip-down">
                    <q-list separator>
                      <q-item clickable
                              @click="shareGiftCard(props.row)">
                        <q-item-section>
                          کپی کردن
                        </q-item-section>
                      </q-item>
                      <q-item clickable
                              @click="shareGiftCard(props.row, true)">
                        <q-item-section>
                          کپی کردن کد و ارسال پیامک
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-popup-proxy>
                </q-btn>
              </div>
            </q-td>
            <q-td v-else-if="props.col.name === 'orders'">
              <div class="status-box">
                <div class="dot"
                     :class="props.row.usageNumber === 0 ? 'red-dot' : 'green-dot'" />
                {{ getOrderStatus(props) }}
              </div>
            </q-td>
            <q-td v-else>
              {{ props.value }}
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="flex justify-center">
        <q-pagination v-if="lastPage > 1"
                      v-model="page"
                      :max="lastPage"
                      :max-pages="15"
                      boundary-links
                      icon-first="isax:arrow-left-2"
                      icon-last="isax:arrow-right-3"
                      class="gift-card-pagination"
                      @update:model-value="getGiftCardsData" />
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import GiftCardMixin from '../Mixin/GiftCardMixin.js'
import { ReferralCodeList } from 'src/models/ReferralCode.js'

export default {
  name: 'GiftCardMyCards',
  mixins: [GiftCardMixin],
  data() {
    return {
      sales_man: {
        wallet_type: 'main_account',
        wallet_balance: 0,
        total_commission: 0,
        income_being_settle: 0,
        has_signed_contract: false,
        count_of_used_gift_cards: 0,
        count_of_total_gift_cards: 0,
        count_of_remain_gift_cards: 0,
        minAmount_until_settlement: 0,
        count_of_used_without_pay_gift_cards: 0,
        count_of_unused_with_assignee_gift_cards: 0
      },
      isUsedAndPaid: 0,
      isUsedAndUnpaid: 0,
      showFilter: false,
      isAssignedUnused: 0,
      isUnAssignedUnused: 0,
      lastPage: 0,
      page: 1,
      shareCodeLoading: false,
      salesManLoading: false,
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
      referralCodeList: new ReferralCodeList(),
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
          name: 'usedAt',
          label: 'تاریخ استفاده',
          align: 'center',
          field: row => row.used_at
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
    getOrderStatus(props) {
      if (props.row.usageNumber) {
        return 'استفاده شده'
      } else {
        return 'استفاده نشده'
      }
    },
    onToggleFilter () {
      this.showFilter = !this.showFilter
      this.getGiftCardsData()
    },
    onChangeFilter () {
      this.getGiftCardsData()
    },
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
      this.getSalesMan()
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
    getSalesMan() {
      this.salesManLoading = true
      APIGateway.referralCode.getSalesManData()
        .then((salesManData) => {
          this.salesManLoading = false
          this.sales_man = salesManData
        })
        .catch(() => {
          this.salesManLoading = false
        })
    },
    getGiftCardsData(page = 1) {
      this.loading = true
      APIGateway.referralCode.index({
        data: {
          page,
          is_used_and_paid: this.showFilter ? this.isUsedAndPaid : null,
          is_used_and_unpaid: this.showFilter ? this.isUsedAndUnpaid : null,
          is_unassigned: this.showFilter ? this.isUnAssignedUnused : null,
          is_assigned_unused: this.showFilter ? this.isAssignedUnused : null
        }
      })
        .then(({ referralCodeList, paginate }) => {
          this.lastPage = paginate.last_page
          this.referralCodeList = new ReferralCodeList(referralCodeList)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    shareGiftCard (card, viaSms) {
      card.loading = true
      APIGateway.referralCode.setShared({ referralCode: card.id, via_sms: viaSms })
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

<style lang="scss" scoped>
@import "src/components/Widgets/User/GiftCard/Style/theme.scss";

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
  margin-bottom: 16px;
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
    background: #FFFFFF;
    height: 140px;
    box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
    border-radius: 16px;
    padding: 20px 30px 18px 30px;
    display: flex;
    justify-content: space-between;
    position: relative;
    &.used-card{
      //margin-left: 15px;
    }
    &.unUsed-card{
      //margin-left: 15px;
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
  color: $text-color-secondary;
  margin-bottom: 16px;
  position: relative;
}
.table-filter-expansion {
  color: #697D9A;
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

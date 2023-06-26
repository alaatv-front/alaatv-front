<template>
  <div class="transition-panel">
    <div class="page-title"> وضعیت درآمد </div>
    <div class="row no-gutters introduction-box">
      <div class="col-xl-9 col-xs-12">
        <div class="row q-col-gutter-md card-container">
          <div class="col-md-4 col-xs-12 ">
            <div class="card-style income card-style-flex">
              <div class="title">
                مجموع درآمد تا به الان
              </div>
              <div class="price-box">
                <div class="price">{{sales_man.total_commission.toLocaleString('fa')}}</div>
                <span class="currency">تومان</span>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12 ">
            <div class="card-style demand card-style-flex">
              <div class="title">
                درآمد تسویه نشده
              </div>
              <div class="price-progress">
                <div class="progress-box">
                  <div v-if="remainigAmountUntilSettlement.base > 0"
                       class="progress-title">
                    {{ remainigAmountUntilSettlement.toman('base', false) }}
                    <span>
                      تومان تا تسویه
                    </span>
                  </div>
                  <q-linear-progress v-if="remainigAmountUntilSettlement.base > 0"
                                     :value="percentage"
                                     color="#4CAF50"
                                     rounded
                                     height="6"
                                     dir="ltr" />
                </div>
                <div class="price-box">
                  <div class="price">{{sales_man.wallet_balance.toLocaleString('fa')}}</div>
                  <span class="currency">تومان</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12 ">
            <div class="card-style demand card-style-flex">
              <div class="title">
                در انتظار تسویه
              </div>
              <div class="price-progress price-progress-incomeBeingSettle">
                <div class="price-box">
                  <div class="price">{{sales_man.income_being_settle}}</div>
                  <span class="currency">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-xs-12">
        <div class="left-side">
          <div class="clearing-title">
            درخواست تسویه حساب
          </div>

          <div v-if="settlementGuide"
               class="guide-info">
            راهنما و شرایط تسویه حساب را
            <span class="custom-color"
                  @click="openSettlementGuideDialog">
              مطالعه کنید.
            </span>
          </div>
          <div class="clearing-btn-box">
            <div class="clearing-btn"
                 @click="clearWallet">
              تسویه حساب
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs-section">
      <q-tabs v-model="activeTab"
              color="#ff9000"
              right
              background-color="transparent"
              class="tabs-box"
              active-class="tab-active-class"
              @change="handleTables">
        <q-tab name="transactions">
          <span class="tab-title">
            تراکنش کارت‌ها
          </span>
        </q-tab>
        <q-tab name="clearingHistory">
          <span class="tab-title">
            تاریخچه تسویه
          </span>
        </q-tab>
      </q-tabs>

      <div class="line-style" />
      <q-tab-panels v-model="activeTab"
                    animated>
        <q-tab-panel name="transactions">
          <div class="table-title q-mb-md">
            تراکنش کارت ها
          </div>
          <div class="table-container text-center">
            <q-table :rows="transactionsTableRow"
                     :columns="transactionsHeaders"
                     :loading="loading"
                     hide-bottom
                     row-key="id">
              <template #header-cell="props">
                <q-th :props="props"
                      class="table-row-txt">
                  {{ props.col.label }}
                </q-th>
              </template>
              <template #body-cell="props">
                <q-td v-if="props.col.name === 'purchased_at'"
                      class="table-column-txt">
                  {{ convertToShamsi(props.value, 'date') }}
                </q-td>
                <q-td v-else
                      class="table-column-txt">
                  {{ props.value }}
                </q-td>
              </template>
            </q-table>
          </div>
          <div class="flex justify-center">
            <q-pagination v-model="page"
                          :max="lastPage"
                          :max-pages="6"
                          boundary-links
                          icon-first="isax:arrow-left-2"
                          icon-last="isax:arrow-right-3"
                          class="gift-card-pagination"
                          @update:model-value="getTransactionDataFromApi" />
          </div>
        </q-tab-panel>
        <q-tab-panel name="clearingHistory">
          <div class="">
            <div class="table-title">
              تاریخچه تسویه
            </div>
            <div class="table-container text-center">
              <q-table :rows="clearingHistoryTableRow"
                       :columns="clearingHistoryHeaders"
                       :loading="loading"
                       hide-bottom
                       row-key="id">
                <template #header-cell="props">
                  <q-th :props="props"
                        class="table-row-txt">
                    {{ props.col.label }}
                  </q-th>
                </template>
                <template #body-cell="props">
                  <!--                  <q-td v-if="props.col.name === 'settlement-date'">-->
                  <!--                    {{ convertToShamsi(props.value, 'date') }}-->
                  <!--                  </q-td>-->
                  <q-td v-if="props.col.name === 'status'"
                        class="isAssigned-column table-column-txt">
                    <div class="share-box">
                      {{ getWithdrawStatus(props.value) }}
                    </div>
                  </q-td>
                  <q-td v-else-if="props.col.name === 'updated-at'"
                        class="table-column-txt">
                    {{ convertToShamsi(props.value, 'date') }}
                  </q-td>
                  <q-td v-else>
                    <div class="table-column-txt">
                      {{ props.value }}
                    </div>
                  </q-td>
                </template>
              </q-table>
            </div>
            <div class="flex justify-center">
              <q-pagination v-model="historyPage"
                            :max="historyLastPage"
                            :max-pages="6"
                            boundary-links
                            icon-first="isax:arrow-left-2"
                            icon-last="isax:arrow-right-3"
                            class="gift-card-pagination"
                            @update:model-value="getGiftCardsData" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-dialog v-model="settlementGuideDialog">
      <div class="settlementGuide-dialog">
        <q-btn color="primary"
               icon="isax:close-circle"
               @click="settlementGuideDialog = false" />
        <div class="text q-my-lg">
          <span>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </span>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import Price from 'src/models/Price.js'
import Assist from 'src/assets/js/Assist.js'
import GiftCardMixin from '../Mixin/GiftCardMixin.js'
import { APIGateway } from 'src/api/APIGateway'
import mixinDateOptions from 'src/mixin/DateOptions'
import { ReferralCodeList } from 'src/models/ReferralCode'

export default {
  name: 'GiftCardTransactions',
  mixins: [GiftCardMixin, mixinDateOptions],
  data: () => ({
    sales_man: {
      wallet_type: 'main_account',
      wallet_balance: 0,
      total_commission: 0,
      has_signed_contract: false,
      minAmount_until_settlement: 0,
      count_of_total_gift_cards: 0,
      count_of_used_gift_cards: 0,
      count_of_remain_gift_cards: 0,
      income_being_settle: 0
    },
    test: 7000000000,
    settlementGuideDialog: false,
    percentage: 0,
    lastPage: 0,
    page: 1,
    historyLastPage: 0,
    historyPage: 1,
    activeTab: 'transactions',
    clearingHistoryHeaders: [
      { name: 'bank-tracking-code', align: 'center', label: 'شماره تراکنش', field: 'bank-tracking-code' },
      { name: 'amount', align: 'center', label: 'مبلغ', field: 'amount' },
      { name: 'settlement-date', align: 'center', label: 'تاریخ درخواست', field: 'settlement-date' },
      { name: 'status', align: 'center', label: 'وضعیت', field: 'status' },
      { name: 'updated-at', align: 'center', label: 'تاریخ پرداخت', field: 'updated-at' }
    ],
    loading: false,
    transactionsOptions: {},
    transactionsTableRow: [],
    transactionsHeaders: [
      { name: 'name', align: 'center', label: 'نام خریدار', field: 'full_name' },
      { name: 'code', align: 'center', label: 'شماره کارت', field: 'code' },
      { name: 'product', align: 'center', label: 'محصول', field: 'product' },
      { name: 'purchased_at', align: 'center', label: 'تاریخ خرید', field: 'purchased_at' },
      { name: 'product_price', align: 'center', label: 'مبلغ خرید', field: 'product_price' },
      { name: 'commisson', align: 'center', label: 'درآمد شما', field: 'commisson' }
    ],
    clearingHistoryOptions: {},
    clearingHistoryTableRow: []
  }),
  computed: {
    remainigAmountUntilSettlement () {
      return new Price({
        base: this.minAmountUntilSettlement - this.sales_man.wallet_balance
      })
    },
    walletBalance() {
      // return this.$store.getters.appProps.walletBalance
      return 1
    },
    totalCommission() {
      // return this.$store.getters.appProps.totalCommission
      return 1
    },
    settlementGuide() {
      // return this.$store.getters.appProps.settlementGuide
      return 1
    },
    minAmountUntilSettlement() {
      // return this.$store.getters.appProps.minAmountUntilSettlement
      return 1000000
    },

    incomeBeingSettle() {
      // return this.$store.getters.appProps.incomeBeingSettle
      return 1
    }

  },
  mounted() {
    this.loadAllData()
  },
  methods: {
    loadAllData() {
      this.getSalesMan()
      this.setPercentage()
      this.getTransactionDataFromApi()
      this.getWithdrawHistory()
      // this.getClearingHistoryDataFromApi()
    },
    getSalesMan() {
      APIGateway.referralCode.getSalesManData()
        .then((response) => {
          this.sales_man = response
        })
        .catch()
    },
    openSettlementGuideDialog() {
      this.settlementGuideDialog = true
    },
    setPercentage () {
      if (this.minAmountUntilSettlement - this.walletBalance <= 0) {
        this.percentage = 0
        return
      }
      this.percentage = (1 - (this.minAmountUntilSettlement - this.walletBalance) / this.minAmountUntilSettlement) * 100
    },
    clearWallet() {
      APIGateway.referralCode.getWithdrawWallet()
        .then((response) => {
          location.reload()
          this.toast(' با موفقیت ثبت  شد')
        })
        .catch((e) => {
          const messages = this.getErrorMessages(e.response.data)
          this.showErrorMessages(messages)
        })
    },
    getWithdrawStatus(value) {
      if (value === 'pending') {
        return 'در صف انتظار'
      }
      if (value === 'canceled') {
        return 'پرداخت نشده'
      }
      if (value === 'rejected') {
        return 'پرداخت نشده'
      }
      if (value === 'complete') {
        return 'پرداخت شده'
      }
    },
    getTransactionsData(page = 1) {
      this.loading = true
      APIGateway.referralCode.index({ data: { page } })
        .then(({ referralCodeList, paginate }) => {
          this.lastPage = paginate.last_page
          this.referralCodeList = new ReferralCodeList(referralCodeList)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getWithdrawHistory() {
      this.loading = true
      APIGateway.referralCode.getWithdrawHistory()
        .then(response => {
          this.clearingHistoryTableRow = response
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getTransactionDataFromApi(page = 1) {
      this.loading = true
      this.referralCodeList = []
      APIGateway.referralCode.getOrderProducts({ page })
        .then((transactionsTableRow) => {
          this.transactionsTableRow = transactionsTableRow
          // this.lastPage = paginate.last_page
          // this.referralCodeList = referralCodeList
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getClearingHistoryDataFromApi() {
      this.loading = true
      this.clearingHistoryTableRow = []
      try {
        const response = await this.clearingHistoryApiCall()
        this.lastPage = response.data.meta.last_page
        const responseList = response.data.data
        responseList.forEach(card => {
          this.clearingHistoryTableRow.push({
            id: card.id,
            number: card.paycheck_number,
            price: new Price({ base: card.cost }).toman('base'),
            date: Assist.miladiToShamsi(card.created_at, true),
            status: card.transaction_status,
            paymentDate: Assist.miladiToShamsi(card.completed_at, true)
          })
        })
        this.loading = false
      } catch (err) {
        this.loading = false
        const messages = this.getErrorMessages(err.response.data)
        this.showErrorMessages(messages)
      }

      this.loading = false
    },
    TransactionApiCall() {
      return this.$axios.get('/ajax/referralCode/orderproducts', {
        ...(this.page > 1 && { params: { page: this.page } })
      })
    },
    clearingHistoryApiCall() {
      return this.$axios.get('/ajax/wallet/withdraw-requests', {
        ...(this.page > 1 && { params: { page: this.page } })
      })
    }
  }
}
</script>

<style lang="scss">
//@import 'resources/js/components/User/GiftCard/css/customTableStyle';
.transition-panel .v-application--is-rtl .v-tabs--right > .v-tabs-bar .v-tab, .v-application--is-rtl .v-tabs--right > .v-tabs-bar .v-tabs-slider-wrapper + .v-tab {
  margin-left: 0;
}
.transition-panel .v-application--is-rtl .v-tabs--right > .v-tabs-bar .v-tab, .v-application--is-rtl .v-tabs--right > .v-tabs-bar .v-tabs-slider-wrapper {
  height: 4px!important;
}
.theme--light.v-tabs-items {
  background-color: transparent;
}

.settlementGuide-dialog {
  .v-card {
    padding-top: 20px;
  }
  .v-sheet.v-card:not(.v-sheet--outlined) {
    border: 1px solid #DDDDDD;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
}

</style>

<style scoped lang="scss">

.transition-panel{
  .tabs-section{
    :deep(.q-tab-panels){
      background: transparent;
    }
    .table-container{
      .table-row-txt{
        font-size: 16px;
        font-weight: 600;
        color: #697D9A;
      }
      .table-column-txt{
        font-size: 14px;
        font-weight: 400;
        color: #697D9A;
      }
    }
  }
  .green-text{
    color :#E94B47;
  }
  .red-text{
    color: #4CAF50;
  }
  .tabs{
    background: transparent;
  }
  .product-title{
    max-width: 242px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .introduction-box{
    width: 100%;
    margin-bottom: 40px;
    .left-side{
      margin-left: 15px;
    }
  }
  .tab-title{
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: #8798B1;
    letter-spacing: -0.03em;
    @media screen and (max-width: 599px) {
      font-size: 16px;
      line-height: 25px;
    }
  }

  .tabs-box{
    position: relative;
    .line-style{
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: 0;
      background: #E7ECF4;
    }
  }

  .table-title{
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 31px;
      text-align: left;
      letter-spacing: -0.03em;
      color: #8798B1 !important;
      margin-bottom: 16px;
      @media screen and (max-width: 599px) {
        font-size: 16px;
        line-height: 25px;
      }
    }

  .tab-active-class{
    .tab-title{
      color:#FF9000;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: -0.03em;
      @media screen and (max-width: 599px) {
        font-size: 14px;
        line-height: 25px;
      }
    }
  }
  .page-title{
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 31px;
    text-align: left;
    letter-spacing: -0.03em;
    color: #8798B1;
    margin-bottom: 16px;

  }
  .card-style-flex{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .card-container{
  }
  .card-style{
    position: relative;
    height: 140px;
    background: #FFFFFF;
    box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
    border-radius: 16px;
    padding: 20px;

    .title{
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      text-align: left;
      color: #697D9A;
    }
    .price-box {
      margin-top: 29px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .price-progress{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      &.price-progress-incomeBeingSettle {
        justify-content: end;
      }
      .progress-box{
        margin-bottom: 15px;
      }
      .progress-title{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        color: #697D9A;
      }
    }
    .price{
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 56px;
      color: #697D9A;
    }
    .currency{
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      color: #697D9A;
      margin-left: 8px;
    }
  }
  .income{
    //margin: 0 0 0 15px;
  }
  .demand{
    margin: 0 15px;
  }
  .clearing-title{
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 31px;
    letter-spacing: -0.03em;
    color: #8798B1;
    margin-bottom: 16px;
  }
  .guide-info{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: #8798B1;
    margin-bottom: 10px;
  }
  .custom-color{
    color: #FF9000;
    cursor: pointer;
  }
  .clearing-btn-box {
    display: flex;
    justify-content: right;
    .clearing-btn{
      width: 134px;
      height: 48px;
      background: #FF9000;
      box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
      border-radius: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .pagination-box{
    margin-top: 40px
  }
  .dialog-container {
    .settlementGuide-dialog {
      background-color: #E5E5E5;
      height: 100%;
      padding: 20px;
    }
  }
}
@media only screen and (max-width: 1903px){
    .settlementGuide-dialog {
      background-color: white;
      border-radius: 20px;
      padding: 20px;
      .text {
        font-size: 20px;
      }
    }

  .introduction-box{
    margin-bottom: 24px;
    .left-side{
      margin-left: 0;
    }
  }
  .transition-panel{
    .product-title{
      max-width: 162px;
    }
    .page-title{
      font-size: 18px;
      line-height: 28px;

    }
    .card-style-flex{
      display: flex;
      justify-content: space-between;
    }
    .card-container{
    }
    .card-style{
      .title{
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        text-align: left;
        color: #697D9A;
      }
      .price-box {
        display: flex;
        align-items: center;

      }
      .price-progress{
        justify-content: space-between;
        .content{

        }
        .progress-title{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          text-align: center;
          color: #697D9A;
        }
      }
      .currency{
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        color: #697D9A;
        margin-left: 8px;
      }
    }
    .income{
      margin: 0 0 16px;
    }
    .demand{
      margin: 0 0 20px;
    }
    .custom-color{
      color: #FF9000;
    }
    .pagination-box{
      margin-top: 40px
    }
    .clearing-btn-box {
      .clearing-btn{
        margin-bottom: 24px;
      }
    }
  }
}
@media only screen and (max-width: 599px) {

  .transition-panel{
    .introduction-box{
      margin-bottom:21px;
      .left-side{
        margin-left: 0;
      }
    }
    max-width:100%;
    .product-title{
      max-width: 122px;
    }
    .page-title{
      font-size: 16px;
      line-height: 25px;

    }
    .card-style-flex{
      flex-direction: column;
    }
    .card-container{
    }
    .card-style{
      height: 110px;
      padding: 16px;
      border-radius: 12px;
      .price-box {
        margin-top: 16px;
      }
      .price-progress{
        justify-content: flex-end;
      }
      .progress-box{
        display: none;
      }
      .price{
        font-size: 30px;
        line-height: 46px;

      }

    }
    .clearing-title{
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      margin-bottom: 6px;
    }
    .guide-info{
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    .custom-color{
      color: #FF9000;

    }
    .clearing-btn-box {
      .clearing-btn{
        width: 110px;
        height: 36px;
        margin-bottom: 0;
      }
    }
    .pagination-box{
      margin-top: 40px
    }
  }

}
</style>

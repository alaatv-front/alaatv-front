<template>
  <div class="transition-panel">
    <div class="page-title"> وضعیت درآمد </div>
    <div class="row no-gutters introduction-box">
      <div class="col-xl-9 col-12">
        <div class="row no-gutters card-container">
          <div class="col-xl-4 col-lg-12">
            <div class="card-style income card-style-flex">
              <div class="title">
                مجموع درآمد تا به الان
              </div>
              <div class="price-box">
                <div class="price">{{totalCommission.toLocaleString('fa')}}</div>
                <span class="currency">تومان</span>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-12">
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
                  <div class="price">{{walletBalance.toLocaleString('fa')}}</div>
                  <span class="currency">تومان</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-12">
            <div class="card-style demand card-style-flex">
              <div class="title">
                در انتظار تسویه
              </div>
              <div class="price-progress price-progress-incomeBeingSettle">
                <div class="price-box">
                  <div class="price">{{incomeBeingSettle}}</div>
                  <span class="currency">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-12">
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
        <q-tab name="transactions"
               :disabled="loading"
               active-class="active-tab-t">
          <span class="tab-title">
            تراکنش کارت‌ها
          </span>
        </q-tab>
        <q-tab name="clearingHistory"
               :disabled="loading"
               active-class="active-tab-t">
          <span class="tab-title">
            تاریخچه تسویه
          </span>
        </q-tab>
      </q-tabs>

      <div class="line-style" />
      <q-tab-panels v-model="activeTab"
                    animated>
        <q-tab-panel name="transactions">
          <div class="table-container">
            <div class="table-title">
              تراکنش کارت ها
            </div>
            <!--            <v-data-table-->
            <!--              v-model:options="transactionsOptions"-->
            <!--              :headers="transactionsHeaders"-->
            <!--              :items="transactionsTableRow"-->
            <!--              mobile-breakpoint="300"-->
            <!--              :server-items-length="100"-->
            <!--              :items-per-page="5"-->
            <!--              :loading="loading"-->
            <!--              class="gift-card-table"-->
            <!--              disable-sort-->
            <!--              fixed-header-->
            <!--              hide-default-footer-->
            <!--            >-->
            <!--              <template v-slot:item.name="{ item }">-->
            <!--                {{ item.name ? item.name : '-'  }}-->

            <!--              </template>-->
            <!--              <template v-slot:item.codeNumber="{ item }">-->
            <!--                <div>-->
            <!--                  {{ item.codeNumber ? 'AT ' + item.codeNumber : '-'}}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.productTitle="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  <div class="product-title">-->
            <!--                    {{ item.productTitle ? item.productTitle : '-' }}-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.purchaseDate="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  {{ item.purchaseDate? item.purchaseDate : '-' }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.purchasePrice="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  {{ item.purchasePrice? item.purchasePrice : '-' }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.income="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  {{ item.income? item.income : '-' }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--            </v-data-table>-->
          </div>
        </q-tab-panel>
        <q-tab-panel name="clearingHistory">
          <div class="table-container">
            <div class="table-title">
              تاریخچه تسویه
            </div>
            <!--            <v-data-table-->
            <!--              v-model:options="clearingHistoryOptions"-->
            <!--              :headers="clearingHistoryHeaders"-->
            <!--              :items="clearingHistoryTableRow"-->
            <!--              mobile-breakpoint="300"-->
            <!--              :server-items-length="100"-->
            <!--              :items-per-page="5"-->
            <!--              :loading="loading"-->
            <!--              class="gift-card-table"-->
            <!--              disable-sort-->
            <!--              fixed-header-->
            <!--              hide-default-footer-->
            <!--            >-->
            <!--              <template v-slot:item.number="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  {{ item.number }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.price="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  {{item.price}}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.date="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  {{item.date }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.status="{ item }">-->
            <!--                <div class="flex-center"-->
            <!--                     :class="(item.status.name === 5 || item.status.name === 3)? 'green-text': 'red-text'"-->

            <!--                >-->
            <!--                  {{ item.status.name }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template v-slot:item.paymentDate="{ item }">-->
            <!--                <div class="flex-center">-->
            <!--                  {{item.paymentDate }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--            </v-data-table>-->
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-dialog v-model="settlementGuideDialog"
              width="500px">
      <div class="settlementGuide-dialog">
        <!--        <v-card>-->
        <!--          <v-spacer />-->
        <!--          <v-card-text>-->
        <!--            <span v-html="settlementGuide" />-->
        <!--          </v-card-text>-->

        <!--          <v-divider />-->

        <!--          <v-card-actions>-->
        <!--            <v-spacer />-->
        <!--            <v-btn color="#FF9000"-->
        <!--                   text-->
        <!--                   @click="settlementGuideDialog = false">-->
        <!--              بستن-->
        <!--            </v-btn>-->
        <!--          </v-card-actions>-->
        <!--        </v-card>-->
      </div>
    </q-dialog>
  </div>
</template>

<script>
import Price from 'src/models/Price.js'
import Assist from 'src/assets/js/Assist.js'
import GiftCardMixin from '../Mixin/GiftCardMixin.js'
import { APIGateway } from 'src/api/APIGateway'
export default {
  name: 'GiftCardTransactions',
  mixins: [GiftCardMixin],
  data: () => ({
    test: 7000000000,
    settlementGuideDialog: false,
    percentage: 0,
    lastPage: 0,
    page: 1,
    activeTab: 'transactions',
    transactionsHeaders: [
      { text: 'نام خریدار', cellClass: 'custom-cell-width transaction-first-colum-padding', class: 'header-style transaction-first-colum-padding', value: 'name' },
      { text: 'شماره کارت', cellClass: 'min-colum-width', class: 'header-style', value: 'codeNumber' },
      { text: 'محصول', cellClass: 'title-width', class: 'header-style', value: 'productTitle' },
      { text: 'تاریخ خرید', cellClass: 'min-colum-width', class: 'header-style', value: 'purchaseDate' },
      { text: 'مبلغ خرید', cellClass: 'min-colum-width', class: 'header-style', value: 'purchasePrice' },
      { text: 'درآمد شما', cellClass: 'min-colum-width', class: 'header-style', value: 'income' }
    ],
    clearingHistoryHeaders: [
      { text: 'شماره تراکنش', cellClass: 'custom-cell-width transaction-first-colum-padding', class: 'header-style transaction-first-colum-padding', value: 'id' },
      { text: 'مبلغ', cellClass: 'min-colum-width', class: 'header-style', value: 'price' },
      { text: 'تاریخ درخواست', cellClass: 'min-colum-width', class: 'header-style', value: 'date' },
      { text: 'وضعیت', cellClass: 'custom-cell-width', class: 'header-style', value: 'status' },
      { text: 'تاریخ پرداخت', cellClass: 'min-colum-width', class: 'header-style', value: 'paymentDate' }
    ],
    loading: false,
    transactionsOptions: {},
    transactionsTableRow: [],
    clearingHistoryOptions: {},
    clearingHistoryTableRow: []
  }),
  computed: {
    remainigAmountUntilSettlement () {
      return new Price({
        base: this.minAmountUntilSettlement - this.walletBalance
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
      return 1
    },

    incomeBeingSettle() {
      // return this.$store.getters.appProps.incomeBeingSettle
      return 1
    }

  },
  created() {
    this.loadAllData()
  },
  methods: {
    loadAllData() {
      this.setPercentage()
      this.getTransactionDataFromApi()
      // this.getClearingHistoryDataFromApi()
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
    async clearWallet() {
      try {
        await this.$axios.post('/ajax/wallet/withdraw', { wallet_type_id: 1 })
        location.reload()
        this.toast(' با موفقیت ثبت  شد')
      } catch (e) {
        const messages = this.getErrorMessages(e.response.data)
        this.showErrorMessages(messages)
      }
    },
    getTransactionDataFromApi(page = 1) {
      this.loading = true
      this.referralCodeList = []
      APIGateway.referralCode.getOrderProducts({ data: { page } })
        .then(() => {
          // console.log('response', response)
          // this.lastPage = paginate.last_page
          // this.referralCodeList = referralCodeList
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })

      // this.loading = true
      // this.transactionsTableRow = []
      // try {
      //   const response = await this.TransactionApiCall()
      //   this.lastPage = response.data.meta.last_page
      //   const responseList = response.data.data
      //   responseList.forEach(card => {
      //     this.transactionsTableRow.push({
      //       id: card.id,
      //       name: card.full_name,
      //       codeNumber: card.code,
      //       productTitle: card.product,
      //       purchaseDate: Assist.miladiToShamsi(card.purchased_at, true),
      //       purchasePrice: new Price({ base: card.product_price }).toman('base'),
      //       income: new Price({ base: card.commisson }).toman('base')
      //     })
      //   })
      //   this.loading = false
      // } catch (err) {
      //   this.loading = false
      //   const messages = this.getErrorMessages(err.response.data)
      //   this.showErrorMessages(messages)
      // }
      //
      // this.loading = false
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
    .table-container{
      margin: 30px 0;
      .table-title{
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 31px;
        text-align: left;
        letter-spacing: -0.03em;
        color: #8798B1;
        margin-bottom: 16px;
        @media screen and (max-width: 599px) {
          font-size: 14px;
          line-height: 25px;
        }
      }
    }
  }

  .active-tab-t{
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
    margin: 0 0 0 15px;
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
  .settlementGuide-dialog {
    padding: 20px;
  }
}
@media only screen and (max-width: 1903px){
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

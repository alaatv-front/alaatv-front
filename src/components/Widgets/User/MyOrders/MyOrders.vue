<template>
  <div>
    <div class="lt-sm flex justify-end">
      <q-btn flat
             square
             color="grey"
             :to="{name: 'UserPanel.Dashboard'}">
        <q-icon name="ph:stack"
                class="q-mr-sm" />
        >
      </q-btn>
    </div>
    <div v-if="loading"
         class="flex justify-center q-mt-xl">
      <q-spinner-ball color="primary"
                      size="2em" />
    </div>
    <template v-else>
      <div v-if="!hasUserOrdered">
        <div class="empty-order-list">
          <q-img class="image"
                 :src="'https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_orders.png'" />
          <div v-if="isAdmin"
               class="list-text">
            لیست سفارش‌های این کاربر خالی است!
          </div>
          <div v-else
               class="list-text">
            لیست سفارش‌های شما خالی است!
          </div>
          <div v-if="!isAdmin"
               class="back-to-shop">
            <q-btn class="back-to-shop-btn"
                   color="secondary"
                   label="رفتن به فروشگاه"
                   :to="{name:'Public.Shop'}" />
          </div>
        </div>
      </div>
      <div v-else
           class="my-orders-list">
        <div v-if="showTitle"
             class="title">
          سفارش های من
        </div>
        <entity-index v-if="mounted"
                      ref="orderList"
                      v-model:value="inputs"
                      class="orders-list-entity-index"
                      :api="getEntityApi"
                      :table="table"
                      :table-keys="tableKeys"
                      :default-layout="false"
                      :table-grid-size="$q.screen.lt.md"
                      :show-expand-button="false"
                      :show-reload-button="false"
                      :show-search-button="false"
                      @onPageChanged="onPageChange">
          <template v-slot:before-index-table="">
            <div class="row items-center search-box q-pt-md">
              <div class="col-lg-4 col-xl-4 col-sm-6 col-xs-9 text-left">
                <q-input v-model="searchInput"
                         placeholder="جستجو..."
                         class="no-title">
                  <template v-slot:append>
                    <q-icon name="ph:magnifying-glass"
                            class="search-icon"
                            @click="filterFormBuilderData" />
                  </template>
                </q-input>
              </div>
              <div class="col-lg-8 col-xl-8 col-sm-6 col-xs-3 text-right">
                <q-btn :color="filterExpanded? 'accent': 'grey'"
                       square
                       icon="ph:funnel"
                       @click="filterExpanded = !filterExpanded" />
              </div>
            </div>
            <q-expansion-item v-model="filterExpanded"
                              icon="perm_identity"
                              class="expand-filter">
              <div class="row filter-items">
                <div class="col-12">
                  <form-builder ref="filterSlot"
                                :value="filterInputs"
                                @onClick="onClickFilterFormBuilder" />
                </div>
              </div>
            </q-expansion-item>
          </template>
          <template #entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'details'">
              <q-btn round
                     flat
                     dense
                     icon="ph:dots-three-vertical"
                     size="md"
                     @click="showDetailsDialog(inputData.props.row)" />
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
          <template #entity-index-table-item-cell="{inputData}">
            <q-card class="EntityIndexGridItem q-mb-md">
              <q-card-section v-if="inputData.props?.cols && inputData.props.cols.length > 0">
                <div v-for="(col, colIndex) in inputData.props.cols"
                     :key="colIndex"
                     class="table-column">
                  <template v-if="col.name === 'details'">
                    <q-btn label="جزییات"
                           color="primary"
                           size="md"
                           @click="showDetailsDialog(inputData.props.row)" />
                  </template>
                  <template v-else>
                    <span class="label"
                          v-html="col.label" />:
                    <span class="value"
                          v-html="col.field(inputData.props.row)" />
                  </template>
                </div>
              </q-card-section>
            </q-card>
          </template>
        </entity-index>
      </div>
      <q-dialog v-model="detailsDialog"
                class="order-details-dialog">
        <order-details-dialog :is-admin="isAdmin"
                              :order="currentOrder"
                              @update-orders="onUpdateOrders" />
      </q-dialog>
    </template>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import moment from 'moment-jalaali'
import { Order } from 'src/models/Order.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import FormBuilder from 'quasar-form-builder/src/FormBuilder.vue'
import ActionBtnComponent from 'src/components/Utils/actionBtn.vue'
// import OrderDetailsCard from 'src/components/UserOrders/OrderDetailsCard.vue'
import OrderDetailsDialog from 'src/components/UserOrders/OrderDetailsDialog.vue'
import EntityIndex from 'quasar-crud/src/components/Entity/Index/EntityIndex.vue'

const ActionBtn = shallowRef(ActionBtnComponent)

export default {
  name: 'MyOrders',
  components: {
    // OrderDetailsCard,
    FormBuilder,
    OrderDetailsDialog,
    EntityIndex
  },
  mixins: [mixinAuth],
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: null
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  emits: ['showDetails'],
  data () {
    return {
      loading: true,
      mounted: false,
      isFirstReq: true,
      filterExpanded: false,
      inputs: [
        { type: 'hidden', name: 'paymentStatuses', class: '', responseKey: 'paymentStatuses', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'since', responseKey: 'since', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'till', responseKey: 'till', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'search', responseKey: 'search', col: 'col-12 col-lg-12 col-sm-6' }
      ],
      filterInputs: [
        {
          type: 'select',
          name: 'paymentStatuses',
          optionValue: 'id',
          optionLabel: 'name',
          multiple: true,
          label: 'وضعیت پرداخت',
          col: 'filter-option col-sm-6 col-lg-3 col-xs-12'
        },
        {
          type: 'date',
          name: 'since',
          responseKey: 'since',
          label: 'تاریخ سفارش از',
          placeholder: ' از',
          col: 'col-lg-3 col-sm-6 col-xs-12'
        },
        {
          type: 'date',
          name: 'till',
          label: 'تاریخ سفارش تا',
          placeholder: 'تا',
          col: 'col-lg-3 col-sm-6 col-xs-12'
        },
        {
          type: ActionBtn,
          name: 'ActionBtn',
          col: 'col-lg-3 col-sm-6 col-xs-12 q-mt-lg'
        }
      ],
      searchInput: '',
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره سفارش',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'paymentstatus',
            required: true,
            label: 'وضعیت ‌پرداخت',
            align: 'left',
            field: row => row.paymentstatus.name,
            classes: row => {
              if (!row) {
                return ''
              }
              return row.paymentstatus.id === 1 ? 'payment-not-okay' : row.paymentstatus.id === 3 ? 'payment-okay' : row.paymentstatus.id === 4 ? 'payment-installment' : ''
            }
          },
          {
            name: 'orderstatus',
            required: true,
            label: 'وضعیت سفارش',
            align: 'left',
            field: row => row.orderstatus.name,
            classes: 'order-status'
          },
          {
            name: 'price',
            required: true,
            label: 'مبلغ',
            align: 'left',
            field: row => row.price
          },
          {
            name: 'completed_at',
            required: true,
            label: 'تاریخ سفارش',
            align: 'left',
            field: row => moment(row.completed_at, 'YYYY-M-D').format('jYYYY/jMM/jDD')
          },
          {
            name: 'details',
            required: true,
            label: 'جزئیات',
            align: 'left'
          }
        ],
        data: []
      },
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      },
      currentOrder: new Order(),
      detailsDialog: false,
      detailsCardToggle: {},
      hasUserOrdered: true,
      firstRowPassed: false,
      getEntityApi: null
    }
  },
  computed: {
    computedUserId () {
      if (this.userId) {
        return this.userId
      }
      if (this.user.id) {
        return this.user.id
      }
      return null
    },
    paymentStatus () {
      return this.getInput('filterInputs', 'paymentStatuses').value
    },
    since () {
      return this.getInput('filterInputs', 'since').value
    },
    till () {
      return this.getInput('filterInputs', 'till').value
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    },
    getCurrentOrderCompletedAt () {
      return (CompletedAt) => {
        return moment(CompletedAt, 'YYYY-M-D').format('jYYYY/jMM/jDD')
      }
    }
  },
  watch: {
    till (value) {
      this.updateInputsValue('till', value)
    },
    since (value) {
      this.updateInputsValue('since', value)
    },
    paymentStatus (value) {
      this.updateInputsValue('paymentStatuses', value)
    },
    searchInput (value) {
      this.updateInputsValue('search', value)
    }
  },
  mounted () {
    this.loadApi()
    this.getPaymentStatus()
    this.mounted = true
  },
  methods: {
    loadApi () {
      this.getEntityApi = APIGateway.user.APIAdresses.ordersById(this.computedUserId)
    },
    onPageChange (response) {
      if (!this.isFirstReq) {
        return
      }
      this.hasUserOrdered = response.data.data.length > 0
      this.isFirstReq = false
    },
    onClickFilterFormBuilder (data) {
      data.event === 'reload' ? this.reloadFilterData() : this.filterFormBuilderData()
    },

    reloadFilterData () {
      if (this.$refs.filterSlot) {
        this.$refs.filterSlot.clearFormBuilderInputValues()
      }
      this.searchInput = ''
      // need to $nextTick
      this.$nextTick(() => {
        if (this.$refs.orderList) {
          this.$refs.orderList.reload()
        }
      })
    },

    filterFormBuilderData () {
      if (!this.$refs.orderList) {
        return
      }
      this.$refs.orderList.search()
    },
    updateInputsValue (name, newValue) {
      const input = this.getInput('inputs', name)
      input.value = newValue
    },
    getInput (src, name) {
      return this[src].find(item => item.name === name)
    },
    async getPaymentStatus () {
      try {
        this.getInput('filterInputs', 'paymentStatuses').options = await APIGateway.order.getPaymentStatus(this.computedUserId)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    showDetailsDialog (rowData) {
      if (this.isAdmin) {
        this.$emit('showDetails', new Order(rowData))
      }
      this.currentOrder = new Order(rowData)
      this.detailsDialog = true
    },
    getRemoveMessage (row) {
      const title = row.title
      return 'آیا از حذف ' + title + ' اطمینان دارید؟'
    },
    toman (key = 500000, suffix) {
      if (key) {
        let string = key.toLocaleString('fa')
        if (typeof suffix === 'undefined' || suffix) {
          string += ' تومان '
        }
        return string
      }
    },
    onUpdateOrders () {
      this.$refs.orderList.search()
    }
  }
}
</script>

<style scoped lang="scss">
.my-orders-list{

  :deep(.entity-index) {
    .q-expansion-item {
      .q-expansion-item__container {
        .expand-filter{
          &:deep(.q-item-type){
            display: none;
          }
        }

        .q-item {
          display: none;
        }
      }
    }
  }
}

.gray-bg{
  background: #E4E8EF;
}

.search-box{
  margin-bottom: 20px;

  @media  screen and (width <= 599px){
    margin-bottom: 20px;
  }
}

.my-orders-list {
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: left;
    color: #434765;
    padding-bottom: 40px;
  }

  :deep(.q-table__bottom){
    display: none;
  }

  .quasar-crud-index-table{
    :deep(.q-table){
      tr{
        border: none;
      }

      th{
        border: none;
      }

      td{
        border: none;
      }
    }

  }

  :deep(.payment-okay) {
    color: $positive;
  }

  :deep(.payment-not-okay) {
    color: $negative
  }

  :deep(.payment-installment) {
    color: $accent;
  }
  :deep(.order-status) {
    color: $positive;
  }

  :deep(.quasar-crud-index-table) {
    padding: 0 !important;

    .q-table__container {
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%);
      border-radius: 16px;

      @media screen and (width <= 599px) {
        //padding-bottom: 20px;
      }

      .q-table__middle {
        //.q-table {
        table {
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
          letter-spacing: -0.03em;
          color: #6D708B;

          th {
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: #6D708B;
            padding: 23px 40px;

            @media screen and (width <= 1439px){
              padding: 20px 30px;
            }
          }

          tbody{
            tr{
              &:nth-child(2n + 1) {
                background: #F6F9FF;
                border-radius: 16px;
              }
            }
          }

          tr {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #434765;

            td{
              padding: 10px 40px;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              letter-spacing: -0.03em;

              @media screen and (width <= 1439px){
                padding: 2px 30px;
              }
            }

            :not(:last-child) > td {
              border-bottom-width: 0 !important;
            }
          }
        }

        //}
      }

      .q-table__grid-content {
        flex-direction: column;
      }
    }

    .q-table__top {
      display: none !important;
    }

    @media screen and (width <= 600px) {
      .q-table__card {
        box-shadow: none;
        border-bottom: 1px solid #E4E8EF;
        padding: 16px 20px;
      }

      .q-table__grid-item {
        padding: 0;

        .q-table__grid-item-row {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .details-dialog {
    background: #FFF;
    box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%) #{"/* rtl:ignore */"};
    border-radius: 16px;
  }

  .details-table-mobile {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid #E4E8EF;

    &:last-child{
      border-radius: 16px;
      border-bottom: none;
    }

    &:first-child{
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .details-info {
      padding: 15px 20px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;

      @media screen and (width <= 599px){
        padding: 15px 18px;
      }

      .item{
        color: var(--Text-2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;

        @media screen and (width <= 599px){
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 22px;
        }

        .value{
          color: var(--Text-1);
        }

        .order {
          .order-id {
            padding-left: 8px;
            color: var(--Text-1);
          }
        }

        .details-btn {
          color:#8075DC ;
          cursor: pointer;

          :deep(.q-icon ){
            font-size: 14px;
            font-weight: 600;
            margin-left: 6px;
          }

          &.dialog{
            @media screen and (width <= 599px) {
              display: none;
            }
          }

          &.toggle{
            display: none;

            @media screen and (width <= 599px) {
              display: block;
            }
          }
        }
      }
    }
  }
}

.empty-order-list {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 37px;
  text-align: center;
  color: #6D708B;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  //.q-img
  .list-text {
    @media screen and (width <= 1439px) {
      font-size: 22px;
      line-height: 34px;
      text-align: center;
      color: #6D708B;
    }
  }

  .image {
    width: 290px;
    height: 290px;
    margin-bottom: 60px;

    @media screen and (width <= 1439px) {
      width: 230px;
      height: 230px;
      margin-bottom: 48px;
    }

    @media screen and (width <= 1023px) {
      width: 290px;
      height: 290px;
    }

    @media screen and (width <= 599px) {
      width: 200px;
      height: 200px;
      margin-bottom: 40px;
    }
  }

  .back-to-shop-btn {
    text-align: center;
    margin-top: 16px;
  }
}
</style>

<style>
.q-table thead, .q-table tr, .q-table th, .q-table td {
  border-color: transparent;
}
</style>

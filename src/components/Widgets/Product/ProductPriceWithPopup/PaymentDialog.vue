<template>
  <q-dialog :model-value="dialog"
            @hide="toggleDialog">
    <q-card class="payment-card"
            :class="{'cash': paymentMethod === 'cash'}">
      <q-card-section>
        <div class="payment-header">
          <div class="header-title">ثبت نام</div>
          <div class="header-subtitle">
            شما میتونید خدمات و دوره های دیگر سال کنکور خودتون رو الان بخرید!
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row"
             :class="{'q-col-gutter-sm': paymentMethod !== 'cash'}">
          <div class="col-12"
               :class="{'col-md-6': paymentMethod !== 'cash'}">
            <div v-if="product.children.length > 0"
                 class="product-selectable">
              <div class="Products-label">
                خدمات بیشتر
              </div>
              <product-selection v-model:selectedIds="selectedIds"
                                 class="q-mb-lg"
                                 :product="product"
                                 @update:selectedIds="onChangeSelectedIds" />
            </div>
            <div v-if="productComplimentary.length > 0"
                 class="product-complimentary">
              <div class="Products-label">
                دوره های مکمل
              </div>
              <div class="complimentary-product">
                <q-checkbox v-for="(complimentary, index) in productComplimentary"
                            :key="index"
                            v-model="complimentarySelected[index]"
                            left-label
                            :label="complimentary.title" />
              </div>
            </div>
            <div v-if="examList.length > 0"
                 class="product-exams">
              <div class="Products-label">
                آزمون شما
              </div>
              <div class="exam-list-wrapper">
                <div v-for="(exam, index) in examList"
                     :key="index"
                     class="exam-item"
                     :class="{'selected': exam.id === selectedExam }"
                     @click="toggleSelectedExam(exam.id)">
                  {{ exam.display_name }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="paymentMethod !== 'cash'"
               class="col-12 col-md-6">
            <div class="product-label">
              اقساط
            </div>
            <div class="installment">
              <q-list class="installment-list">
                <q-item>
                  <q-item-section class="installment-order"
                                  side>
                    قسط
                  </q-item-section>
                  <q-item-section class="installment-date">زمان پرداخت</q-item-section>
                  <q-item-section class="installment-amount"
                                  side>
                    مبلغ
                  </q-item-section>
                </q-item>
                <q-item v-for="(item, index) in installment"
                        :key="index"
                        class="installment-item">
                  <q-item-section class="installment-order"
                                  :class="{'active': index === 0}"
                                  side>
                    {{ getInstallmentOrder(index) }}
                  </q-item-section>
                  <q-item-section class="installment-date"
                                  :class="{'active': index === 0}">{{ getPersianDate(item.date) }}</q-item-section>
                  <q-item-section class="installment-amount"
                                  :class="{'active': index === 0}"
                                  side>{{ item.value }}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="payment-footer">
        <div class="price-info">
          <div class="price-title">
            <ph-tag :size="16"
                    class="price-title-icon" />
            قیمت کل :
          </div>
          <div v-if="productPrice.discount > 0"
               class="price-calculation">
            <div class="discount">
              <q-badge color="negative"
                       text-color="white"
                       :label="'%' + discountInPercent" />
            </div>
            <div class="base">
              {{ basePrice }}
            </div>
          </div>
          <div v-if="productPrice"
               class="price-final">
            <div class="number">{{ finalPrice }}</div>
            <div class="label">تومان</div>
          </div>
        </div>
        <div class="footer-action">
          <q-btn v-if="paymentMethod === 'cash'"
                 color="primary"
                 text-color="grey-9"
                 unelevated
                 class="action-btn full-width"
                 label="ثبت نام نقدی"
                 @click="addToCart('cash')" />
          <q-btn v-else
                 color="primary"
                 text-color="grey-9"
                 unelevated
                 class="action-btn full-width"
                 label="ثبت نام اقساطی"
                 @click="addToCart('installment')" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Price from 'src/models/Price.js'
import { Product, ProductList } from 'src/models/Product.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import ProductSelection from 'src/components/Widgets/Product/ProductPriceWithPopup/ProductSelection.vue'
import moment from 'moment-jalaali'

export default defineComponent({
  name: 'PaymentDialog',
  components: {
    ProductSelection
  },
  mixins: [mixinPrefetchServerData],
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    paymentMethod: {
      type: String,
      default: 'cash'
    },
    product: {
      type: Product,
      default: new Product()
    },
    productComplimentary: {
      type: ProductList,
      default: new ProductList()
    },
    examList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['updateProduct', 'updateProductLoading', 'toggleDialog'],
  data() {
    return {
      productPrice: new Price(),
      selectedIds: [],
      complimentarySelected: [],
      selectedExam: null,
      installment: []
    }
  },
  computed: {
    finalPrice() {
      let finalPrice = 0
      for (let index = 0; index < this.complimentarySelected.length; index++) {
        if (this.complimentarySelected[index]) {
          finalPrice = finalPrice + this.productComplimentary[index].price.final
        }
      }
      finalPrice = finalPrice + this.getPrice('final')

      return finalPrice
    },
    selectedProducts() {
      const selected = []
      for (let index = 0; index < this.complimentarySelected.length; index++) {
        if (this.complimentarySelected[index]) {
          selected.push(this.productComplimentary[index])
        }
      }
      return selected
    },
    basePrice() {
      let basePrice = 0
      for (let index = 0; index < this.complimentarySelected.length; index++) {
        if (this.complimentarySelected[index]) {
          basePrice = basePrice + this.productComplimentary[index].price.final
        }
      }

      basePrice = basePrice + this.getPrice('base')()

      return basePrice
    },
    cart () {
      return this.$store.getters['Cart/cart']
    },
    discountInPercent () {
      if (this.productPrice.discountInPercent && typeof this.productPrice.discountInPercent === 'function') {
        return this.productPrice.discountInPercent()
      }

      return 0
    },
    productId () {
      if (this.urlParam && this.$route.params[this.urlParam]) {
        return this.$route.params[this.localOptions.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    }
  },
  watch: {
    productComplimentary(newProductList) {
      for (let index = 0; index < newProductList.length; index++) {
        this.complimentarySelected[index] = false
      }
    }
  },
  created() {
    moment.loadPersian()
  },
  methods: {
    onChangeSelectedIds (newValue) {
      this.productPrice.loading = true
      this.$apiGateway.product.getPrice({
        product_id: this.product.id,
        products: newValue
      })
        .then((price) => {
          this.productPrice = new Price(price)
          this.productPrice.loading = false
        })
        .catch(() => {
          this.productPrice.loading = false
        })
    },
    prefetchServerDataPromise () {
      this.$emit('updateProductLoading', true)
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (product) {
      this.$emit('updateProduct', product)
      this.productPrice = product.price
      this.installment = product.instalments
      if (window) {
        this.updateEECEventDetail()
      }
      this.$emit('updateProductLoading', false)
    },
    prefetchServerDataPromiseCatch () {
      this.$emit('updateProductLoading', false)
    },
    updateEECEventDetail() {
      AEE.productDetailViews('product.show', this.product.eec.getData(), {
        TTl: 1000,
        key: this.product.id
      })
    },
    getProduct() {
      return this.$apiGateway.product.show(this.productId)
    },
    getPrice(type) {
      // if (this.productPrice.toman) {
      //   return this.productPrice.toman(type, null)
      // } else {
      //   return 0
      // }
      return this.product.price[type]
    },
    getInstallmentOrder(index) {
      const persianOrdinals = ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم', 'دهم']
      return persianOrdinals[index]
    },
    getPersianDate(date) {
      const monthList = ['فرودین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
      const calendarDate = moment(date)
      const calendarMonth = monthList[moment(calendarDate.jMonth(), 'jM').format('jM')]
      const calendarYear = calendarDate.jWeekYear()
      return calendarMonth + ' ' + calendarYear
    },
    addToCart() {
      if (this.product.hasChildren() && this.selectedIds.length === 0) {
        this.$q.notify({
          type: 'negative',
          color: 'negative',
          timeout: 5000,
          position: 'top',
          message: 'یکی از موارد قابل انتخاب محصول را انتخاب کنید.',
          icon: 'report_problem'
        })
        return
      }
      this.$store.dispatch('Cart/addToCart', { product: this.product, products: this.selectedIds })
        .then(() => {
          if (this.selectedProducts.length > 0) {
            const promises = []
            this.selectedProducts.forEach(element => {
              promises.push(this.$store.dispatch('Cart/addToCart', { product: this.product, products: this.selectedIds }))
            })
            Promise.all(promises)
              .then(() => {
                if (this.selectedExam) {
                  this.$apiGateway.user.saveExam({
                    exam_id: this.selectedExam
                  })
                    .then(() => {
                      this.$router.push({ name: 'Public.Checkout.Review' })
                    })
                    .catch(() => {})
                } else {
                  this.$router.push({ name: 'Public.Checkout.Review' })
                }
              })
              .catch(() => {})
          } else if (this.selectedExam) {
            this.$apiGateway.user.saveExam({
              exam_id: this.selectedExam
            })
              .then(() => {
                this.$router.push({ name: 'Public.Checkout.Review' })
              })
              .catch(() => {})
          } else {
            this.$router.push({ name: 'Public.Checkout.Review' })
          }
        })
    },
    toggleSelectedExam(examId) {
      this.selectedExam = examId
    },
    toggleDialog() {
      this.$emit('toggleDialog')
    }
  }
})
</script>

<style lang="scss" scoped>
.payment-card {
  border-radius: 12px;
  background:#FFF;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10);
  width: 800px;
  max-width: 100%;
  height: 649px;
  position: relative;

  &.cash {
    width: 480px;
  }

  .payment-header {
    padding: 20px 20px 0;
    .header-title {
      color: #616161;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.48px;
      margin-bottom: 4px;
    }

    .header-subtitle {
      color: #616161;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.42px;
    }
  }

  .product-exams {
    .exam-list-wrapper {
      display: flex;
      overflow-x: auto;
      width: 100%;
      .exam-item {
        display: flex;
        min-width: 89px;
        height: 44px;
        padding: 9px 16px 10px 16px;
        margin: 8px 7px;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        border: 1.5px solid #E0E0E0;
        background:#FFF;
        cursor: pointer;
        &.selected {
          background:#E0E0E0;
        }
      }
    }
  }
  .products-label {
    padding: 0 20px 9px;

  }

  .installment {
    width: 330px;
    height: 349px;
    border-radius: 8px;
    background: #ECEFF1;
    overflow-y: auto;
    padding: 20px;

    .installment-item {
      border-radius: 4px;
      background: #FFF;
      margin: 8px 0;
      height: 36px;

      .installment-order {
        color:#616161;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.36px;

        &.active {
          color: #616161;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          letter-spacing: -0.42px;
        }
      }
      .installment-date {
        color:#616161;
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.36px;

        &.active {
          color: #616161;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          letter-spacing: -0.42px;
        }
      }
      .installment-amount {
        color:#616161;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.36px;

        &.active {
          color: #616161;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          letter-spacing: -0.42px;
        }
      }
    }
  }

  .payment-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 30px 20px;
    .price-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 16px;

      .price-title {
        display: flex;
        justify-content: center;
        align-items: center;
        color:#303030;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.54px;

        .price-title-icon {
          margin-right: 8px;
        }
      }
      .price-calculation {
        display: flex;
        justify-content: center;
        align-items: center;

        .discount {
          margin-right: 8px;
        }

        .base {
          color:#757575;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.8px;
        }
      }
      .price-final {
        display: flex;
        justify-content: center;
        align-items: center;

        .number {
          color:#424242;
          font-size: 24px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          letter-spacing: -1.2px;
        }

        .label {
          color:#424242;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }
}
</style>

<template>
  <q-dialog :model-value="dialog"
            :position="position"
            @hide="toggleDialog">
    <q-card v-touch-swipe.mouse.down="handleSwipe"
            class="payment-card"
            :class="{'cash': paymentMethod === 'cash'}">
      <q-card-section>
        <div class="header-swapper" />
      </q-card-section>
      <q-card-section class="header-section">
        <div class="payment-header">
          <div class="header-title">
            <div class="header-title__text">ثبت نام</div>
            <q-btn color="grey"
                   class="header-title__action"
                   icon="close"
                   size="xs"
                   flat
                   @click="toggleDialog" />
          </div>
          <div class="header-subtitle">
            شما میتونید در این دوره به صورت قسطی ثبت نام کنید.
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none body-section">
        <div class="row payment-body"
             :class="{'q-col-gutter-lg': paymentMethod !== 'cash'}">
          <div class="col-12 products-col"
               :class="{'col-md-6': paymentMethod !== 'cash'}">
            <div class="installment-roules-and-conditions">
              <div class="installment-roules-and-conditions-title">شرایط ثبت نام قسطی</div>
              <div class="installment-roules-and-conditions-body">
                <div class="installment-roules-and-conditions-content">
                  ۱. درصورت عدم پرداخت اقساط در زمان های مشخص اعلام شده، دسترسی به تمام محتوا و مکمل های دوره به طور موقت غیرفعال می‌گردد تا پرداخت صورت گیرد و مجدد دسترسی فعال شود.
                  <br><br class="gt-md">
                  ۲. استفاده اشتراکی از محتواها در هر دو پرداخت اقساطی و نقدی ممنوع می باشد.
                  <br><br class="gt-md">
                  ۳. درصورت “تاخیر مکرر” در پرداخت اقساط، آلا می‌تواند دسترسی به دوره را به طور دائم غیرفعال نماید.
                </div>
                <div class="
                          installment-roules-and-conditions-accept">
                  <q-checkbox v-model="installmentAccept"
                              left-label
                              color="secondary"
                              label=".شرایط تسهیلات ویژه ثبت نام رو میپذیرم" />
                </div>
              </div>
            </div>
            <div class="product-container"
                 :class="{'hidden-responsive': (independentComplimentary.length === 0 && dependentComplimentary.length === 0 && examList.length === 0)}">
              <div v-if="dependentComplimentary.length > 0"
                   class="product-complimentary">
                <div class="products-label">
                  خدمات بیشتر
                </div>
                <div class="complimentary-product">
                  <div v-for="(complimentary, index) in dependentComplimentary"
                       :key="index"
                       class="complimentary-wrapper">
                    <div class="complimentary-title ellipsis">
                      <q-checkbox v-model="dependentSelected[index]"
                                  :label="complimentary.title"
                                  @update:model-value="toggleProductToCard(index, 'dependent')" />
                    </div>
                    <div class="complimentary-price">
                      {{ getProductPrice(complimentary.price, 'final') }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="independentComplimentary.length > 0"
                   class="product-complimentary complimentary">
                <div class="products-label">
                  دوره های مکمل
                </div>
                <div class="complimentary-product">
                  <div v-for="(complimentary, index) in independentComplimentary"
                       :key="index"
                       class="complimentary-wrapper">
                    <div class="complimentary-title ellipsis">
                      <q-checkbox v-model="independentSelected[index]"
                                  :label="complimentary.title"
                                  @update:model-value="toggleProductToCard(index, 'independent')" />
                    </div>
                    <div class="complimentary-price">
                      {{ getProductPrice(complimentary.price, 'final') }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="examList.length > 0"
                   class="product-exams">
                <div class="products-label">
                  آزمون شما
                </div>
                <div class="exam-list-wrapper">
                  <div v-for="(exam, index) in examList"
                       :key="index"
                       class="exam-item"
                       :class="{'selected': exam.id === selectedExam }"
                       @click="toggleSelectedExam(exam.id)">
                    {{ exam.display_name || exam.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="paymentMethod !== 'cash'"
               class="col-12 col-md-6 installment-col">
            <div class="products-label instalment">
              اقساط
            </div>
            <div class="installment">
              <q-list class="installment-list">
                <q-item class="installment-header">
                  <q-item-section class="installment-order-label"
                                  side>
                    قسط
                  </q-item-section>
                  <q-item-section class="installment-date-label">زمان پرداخت</q-item-section>
                  <q-item-section class="installment-amount-label"
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
                                  side>{{ item.value.toLocaleString('fa') }}</q-item-section>
                </q-item>
                <q-item class="installment-footer">
                  <q-item-section class="installment-footer-label"
                                  side>
                    مجموع
                  </q-item-section>
                  <q-item-section v-if="productPrice.discount > 0"
                                  class="installment-footer-discount">
                    <div class="footer-discount-badge">
                      <q-badge color="negative"
                               text-color="white"
                               :label="'%' + discountInPercent" />
                    </div>
                    <div class="footer-discount-label">
                      {{ getProductPrice(totalPrice, 'base') }}
                    </div>
                  </q-item-section>
                  <q-item-section class="installment-footer-amount"
                                  side>
                    {{ getProductPrice(totalPrice, 'final') }}
                    <div class="footer-amount-label">
                      تومان
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="!hasInstallment"
                      class="payment-footer">
        <div class="price-title-responsive">
          <q-icon name="ph:tag"
                  :size="'16px'"
                  class="price-title-icon" />
          قیمت کل :
        </div>
        <div class="price-info">
          <div class="price-title">
            <q-icon name="ph:tag"
                    :size="'16px'"
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
              {{ getProductPrice(totalPrice, 'base') }}
            </div>
          </div>
          <div v-if="productPrice"
               class="price-final">
            <div class="number">{{ getProductPrice(totalPrice, 'final') }}</div>
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
                 :disable="!installmentAccept"
                 label="ثبت نام اقساطی"
                 @click="addToCart('installment')" />
        </div>
      </q-card-section>
      <q-card-section v-if="hasInstallment"
                      class="payment-footer">
        <div class="instalment-info ellipsis">
          <h6 class="simple-text before">فقط با</h6>
          <template v-if="product.instalments && product.instalments.length > 0">
            <h4 class="price price-value">
              {{ product.instalments[0].value.toLocaleString('fa') }}
            </h4>
            <span class="price price-label">
              تومان
            </span>
          </template>
          <h6 class="simple-text after">بیا تو دوره</h6>
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
                 color="accent"
                 unelevated
                 size="md"
                 class="action-btn full-width"
                 :disable="!installmentAccept"
                 label="ثبت نام اقساطی"
                 @click="addToCart('installment')" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import moment from 'moment-jalaali'
import { defineComponent } from 'vue'
import Price from 'src/models/Price.js'
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'

moment.loadPersian()

export default defineComponent({
  name: 'PaymentDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    paymentMethod: {
      type: String,
      default: 'cash'
    },
    position: {
      type: String,
      default: 'center'
    },
    product: {
      type: Object,
      default: new Product()
    },
    productComplimentary: {
      type: Array,
      default: () => []
    },
    examList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['updateProduct', 'updateProductLoading', 'toggleDialog'],
  data () {
    return {
      installmentAccept: true,
      productPrice: new Price(),
      dependentSelected: [],
      independentSelected: [],
      selectedExam: null,
      installment: []
    }
  },
  computed: {
    dependentComplimentary () {
      return this.productComplimentary.filter(product => product.is_dependent === 1)
    },
    independentComplimentary () {
      return this.productComplimentary.filter(product => product.is_dependent === 0)
    },
    finalPrice () {
      let finalPrice = 0
      for (let index = 0; index < this.dependentSelected.length; index++) {
        if (this.dependentSelected[index]) {
          finalPrice = finalPrice + this.dependentComplimentary[index].price.final
        }
      }
      for (let index = 0; index < this.independentSelected.length; index++) {
        if (this.independentSelected[index]) {
          finalPrice = finalPrice + this.independentComplimentary[index].price.final
        }
      }

      if (this.paymentMethod === 'cash') {
        finalPrice = finalPrice + this.getPrice('final')
      } else {
        finalPrice = finalPrice + this.getPrice('final_instalmentally')
      }

      return finalPrice
    },
    selectedProducts () {
      const selected = []
      for (let index = 0; index < this.dependentSelected.length; index++) {
        if (this.dependentSelected[index]) {
          selected.push(this.dependentComplimentary[index])
        }
      }
      for (let index = 0; index < this.independentSelected.length; index++) {
        if (this.independentSelected[index]) {
          selected.push(this.independentComplimentary[index])
        }
      }
      return selected
    },
    basePrice () {
      let basePrice = 0
      for (let index = 0; index < this.dependentSelected.length; index++) {
        if (this.dependentSelected[index]) {
          basePrice = basePrice + this.dependentComplimentary[index].price.final
        }
      }
      for (let index = 0; index < this.independentSelected.length; index++) {
        if (this.independentSelected[index]) {
          basePrice = basePrice + this.independentComplimentary[index].price.final
        }
      }

      basePrice = basePrice + this.getPrice('base')

      return basePrice
    },
    totalPrice () {
      const total = {
        base: this.basePrice,
        final: this.finalPrice
      }

      return new Price(total)
    },
    cart () {
      return this.$store.getters['Cart/cart']
    },
    discountInPercent () {
      if (this.productPrice.discountInPercent && typeof this.productPrice.discountInPercent === 'function') {
        if (this.paymentMethod === 'cash') {
          return this.productPrice.discountInPercent()
        } else {
          return this.productPrice.discountInPercent('instalment')
        }
      }

      return 0
    },
    productId () {
      if (this.urlParam && this.$route.params[this.urlParam]) {
        return this.$route.params[this.localOptions.urlParam]
      }
      if (!isNaN(this.$route.params.id)) {
        return this.$route.params.id
      }
      return this.product.id
    },
    hasInstallment () {
      if (this.product) {
        return this.product.has_instalment_option
      }
      return false
    }
  },
  watch: {
    productComplimentary () {
      for (let index = 0; index < this.independentComplimentary.length; index++) {
        this.independentSelected[index] = false
      }
      for (let index = 0; index < this.dependentComplimentary.length; index++) {
        this.dependentSelected[index] = false
      }
    },
    examList (newExamList) {
      if (newExamList.length > 0) {
        this.selectedExam = newExamList[0].id
      }
    }
  },
  created () {
    moment.loadPersian()
  },
  mounted () {
    this.loadProductInfo()
  },
  methods: {
    handleSwipe ({ evt, ...newInfo }) {
      if (newInfo.direction === 'down') {
        this.$emit('toggleDialog')
      }
    },
    loadProductInfo () {
      this.productPrice = this.product.price
      this.installment = this.product.instalments
      if (window) {
        this.updateEECEventDetail()
      }
    },
    updateEECEventDetail () {
      if (this.product && this.product.eec.getData) {
        AEE.productDetailViews('product.show', this.product.eec.getData(), {
          TTl: 1000,
          key: this.product.id
        })
      }
    },
    getPrice (type) {
      return this.product.price[type]
    },
    getProductPrice (price, type) {
      const productPrice = new Price(price)
      if (productPrice.toman) {
        return productPrice.toman(type, null)
      } else {
        return 0
      }
    },
    getInstallmentOrder (index) {
      const persianOrdinals = ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم', 'دهم']
      return persianOrdinals[index]
    },
    getPersianDate (date) {
      const getDate = function (date) {
        return moment(date, 'YYYY/M/D HH:mm:ss').locale('fa').format('jDD jMMMM jYYYY')
      }
      const targetDate = getDate(date)
      const localDate = getDate(Date.now())
      return targetDate === localDate ? 'هم اکنون' : targetDate
    },
    addToCart () {
      if (this.paymentMethod === 'cash') {
        this.addProductToCart({ product: this.product })
          .then(() => {
            this.saveProducts()
              .then(() => {
                this.saveUserExam()
                  .then(() => {
                    this.$router.push({ name: 'Public.Checkout.Review' })
                  })
                  .catch(() => {
                  })
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      } else {
        const inInstalment = this.paymentMethod === 'installment'
        this.getGatewayUrl(inInstalment)
      }
    },
    getGatewayUrl (inInstalment) {
      APIGateway.cart.getPaymentRedirectEncryptedLink({
        device: 'web',
        inInstalment: inInstalment ? 1 : 0
      })
        .then(url => {
          window.location.href = url
        })
        .catch(() => {})
    },
    addProductToCart (productData) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('Cart/addToCart', productData)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    removeProductFromCart (productData) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('Cart/removeItemFromCart', productData)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    saveUserExam () {
      return new Promise((resolve, reject) => {
        this.$apiGateway.user.saveExam({
          exam_id: this.selectedExam
        })
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    saveProducts () {
      return new Promise((resolve, reject) => {
        const promises = []
        this.selectedProducts.forEach(element => {
          promises.push(this.$store.dispatch('Cart/addToCart', { product: element }))
        })
        Promise.all(promises)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    toggleSelectedExam (examId) {
      this.selectedExam = examId
    },
    toggleDialog () {
      if (this.dialog) {
        this.$emit('toggleDialog')
      }
    },
    toggleProductToCard (productIndex, dependency) {
      if (this.paymentMethod === 'cash') {
        return
      }
      if (dependency === 'dependent') {
        if (this.dependentSelected[productIndex]) {
          this.addProductToCart({ product: this.dependentComplimentary[productIndex], has_instalment_option: 1 })
        } else {
          this.removeProductFromCart({ product: this.dependentComplimentary[productIndex] })
        }
      } else {
        if (this.dependentSelected[productIndex]) {
          this.addProductToCart({ product: this.independentComplimentary[productIndex], has_instalment_option: 1 })
        } else {
          this.removeProductFromCart({ product: this.independentComplimentary[productIndex] })
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/css/Theme/radius";
@import "src/css/Theme/colors";
@import "src/css/Theme/spacing";
@import "src/css/Theme/Typography/typography";

$page-size-lg: map-get($sizes, "lg");
$page-size-md: map-get($sizes, "md");
$page-size-sm: map-get($sizes, "sm");

.payment-card {
  border-radius: 12px;
  background:#FFF;
  box-shadow: 0 2px 4px -2px rgb(16 24 40 / 6%), 0 4px 8px -2px rgb(16 24 40 / 10%);
  width: 800px;
  max-width: 100%;
  margin: auto;
  //height: 649px;
  position: relative;

  @media screen and (width < #{$page-size-md}){
    //height: 666px;
    // padding: $space-4 $space-5 $space-6 $space-5;
    margin: initial;
  }

  &.cash {
    width: 480px;
  }

  .header-swapper {
    display: none;
    position: absolute;
    top: 8px;
    left: 45%;
    width: 48px;
    height: 6px;
    border-radius: 100px;
    background: $grey-3;

    @media screen and (width < #{$page-size-md}){
      display: block;
    }
  }

  .header-section{

  }

  .body-section{

    @media screen and (width < #{$page-size-md}){
      padding-top: $space-4;
    }
    @media screen and (width < #{$page-size-sm}){
      padding-top: $space-4;
    }
  }

  .payment-header {
    padding: $spacing-none $spacing-none $space-6;

    @media screen and (width < #{$page-size-md}){
      //height: 666px;
      padding-bottom: $space-5;
    }

    .header-title {
      margin-bottom: $space-1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__text {
        color: $grey-9;
        @include subtitle1;
      }

      &__action {
        display: none;

        @media screen and (width < #{$page-size-md}){
          display: block;
        }
      }
    }

    .header-subtitle {
      color: $grey-6;
      @include body2;
    }
  }

  .payment-body {
    //height: 450px;
    overflow-y: auto;
    margin-bottom: $space-8;

    @media screen and (width < #{$page-size-md}){
      height: 420px;
      margin-bottom: $spacing-none;
    }
    @media screen and (width < #{$page-size-sm}){
      height: 420px;
      margin-bottom: $space-4;
    }

    .products-col {
      @media screen and (width < #{$page-size-md}){
        padding-top: $space-5;
      }

      &.hidden-responsive {
        @media screen and (width <= 599px){
          //display: none;
        }
      }
    }

    .installment-col {
      padding-left: $space-7;

      @media screen and (width < #{$page-size-md}){
        padding-left: $space-5;
        padding-top: $space-5;
      }
    }
  }

  .installment-roules-and-conditions {
        height: 100%;

        .installment-roules-and-conditions-title {
          color: $grey-9;
          @include subtitle1;
          margin-bottom: $space-4;
        }

        .installment-roules-and-conditions-body {
          display: flex;
          flex-flow: column;
          justify-content: space-between;

          .installment-roules-and-conditions-content {
            color: $grey-9;
            @include body2;
            padding-bottom: $space-6;
          }

          .installment-roules-and-conditions-accept {
            position: absolute;
            bottom: 0;

            @media screen and (width < #{$page-size-md}){
              position: relative;
              margin-top: $space-4;
            }
          }
        }
      }

  .product-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    &.hidden-responsive {
      display: none;

        // @media screen and (max-width: 600px){
        // }
      }

    .product-complimentary {
      width: 100%;

      &.complimentary {
        max-height: 180px;
        overflow-y: auto;
      }

      .complimentary-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .complimentary-title {
          width: 250px;
        }

        .complimentary-price {

        }
      }
    }
  }

  .product-exams {
    overflow-x: auto;
    width: 100%;

    .exam-list-wrapper {
      display: flex;
      overflow-x: auto;
      width: 100%;

      .exam-item {
        display: flex;
        min-width: 89px;
        height: 44px;
        padding: 9px 15px 10px;
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
    padding: $space-4 $spacing-none;

    &.instalment {
      padding: $spacing-none $spacing-none $space-3;

      @media screen and (width < #{$page-size-md}){
        display: none;
      }
    }

  }

  .installment {
    width: 100%;

    //height: 349px;
    border-radius: $radius-3;
    background: $blue-grey-1;

    //overflow-y: auto;
    padding: $space-4;

    @media screen and (width <= 599px){
      padding: $space-4;
      margin-bottom: $spacing-none;
    }

    .installment-header {
      padding: 0 $space-4;
      min-height: 21px;

      .installment-order-label {
        color: $grey-8;
        text-align: left;
        font-feature-settings: 'clig' off, 'liga' off;
        @include subtitle2
      }

      .installment-date-label {
        color: $grey-8;
        text-align: center;
        font-feature-settings: 'clig' off, 'liga' off;
        @include subtitle2
      }

      .installment-amount-label {
        color: $grey-8;
        text-align: right;
        font-feature-settings: 'clig' off, 'liga' off;
        @include subtitle2
      }
    }

    .installment-item {
      border-radius: $radius-1;
      background: #FFF;
      margin: $space-3 $spacing-none;
      padding: $space-2 $space-4;
      height: 40px;
      min-height: 40px;

      @media screen and (width < #{$page-size-md}){
        margin: $space-2 $spacing-none;
      }

      .installment-order {
        color: $grey-9;
        @include body2;

        &.active {
          @include subtitle1;
        }
      }

      .installment-date {
        color: $grey-9;
        @include body2;
        text-align: center;

        &.active {
          @include subtitle1
        }
      }

      .installment-amount {
        color: $grey-9;
        @include body2;

        &.active {
          @include subtitle1
        }
      }
    }

    .installment-footer {
      padding: $space-4 $spacing-none $spacing-none $space-4;
      min-height: 18px;
      margin: $space-4 0 $space-5;
      border-top: dashed 1px #AEAEAE;

      @media screen and (width <= 1023px){
        padding: 12px 20px 0;
      }

      @media screen and (width <= 599px){
        padding: 12px 0 0;
      }

      .installment-footer-label {
        @include body2;

        color: $grey-8;
      }

      .installment-footer-discount {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        .footer-discount-label {
          @include body2;

          color: $grey-7;
          text-decoration-line: line-through;;
          margin-left: $spacing-base;
        }
      }

      .installment-footer-amount {
        @include body2;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        color: $grey-8;

        .footer-amount-label {
          @include caption1;

          color: $grey-8;
          margin-left: $spacing-base;
        }
      }
    }
  }

  .payment-footer {

    .price-title-responsive {
        display: none;
        justify-content: flex-start;
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

        @media screen and (width <= 599px){
          display: flex;
        }
      }

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

        @media screen and (width <= 599px){
          display: none;
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

    :deep(.action-btn) {
      &.disabled {
        color: #424242 !important;
        opacity: 0.3 !important;;
        background: #FFCA28 !important;

        .q-btn__content {
          color: #424242 !important;
        }
      }
    }

    .instalment-info {
      margin-bottom: $space-6;
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (width < #{$page-size-md}){
        margin: $space-4 $spacing-none;
      }

      .simple-text {
        color: #424242;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.54px;

        &.before {
          margin-right: 12px;
        }

        &.after {
          margin-left: 12px;
        }
      }

      .price {
        color: $secondary;

        &.price-value {
          margin-right: $space-1;
        }

        &.price-label {
          @include body2;
        }
      }
    }
  }
}
</style>

<template>
  <div class="sina-pishraft-register-form">
    <q-select v-model="selectedMajor"
              :loading="majorsLoading"
              :options="majors"
              option-label="title"
              option-value="id"
              emit-value
              map-options
              label="رشته"
              @update:model-value="onChangeMajor" />
    <q-select v-model="selectedProduct"
              :loading="productLoading"
              :options="products.list"
              option-label="title"
              option-value="id"
              emit-value
              map-options
              label="محصول" />
    <q-input v-model="sinaCode"
             label="کد سینا" />
    <q-btn color="primary"
           class="q-mt-md full-width"
           :loading="formLoading"
           label="ثبت"
           @click="recordFirstFormData" />
    <q-dialog v-model="loginDialog"
              persistent>
      <auth :redirect="false" />
    </q-dialog>
    <q-dialog v-model="userMobileVerificationDialog"
              persistent>
      <inside-dialog :header="false">
        <template #body>
          <user-mobile-verification :options="{ redirectTo: false, needToCompleteInfo: false }"
                                    @verified="onUserMobileverified" />
        </template>
      </inside-dialog>
    </q-dialog>
    <q-dialog v-model="resultOfSubmitDialog">
      <inside-dialog :header="false">
        <template #body>
          <div>
            محصول زیر برای شما با کد:
            {{ sinaCode }}
            رایگان فعال شد.
          </div>
          <div v-if="activatedPanelName"
               class="q-mt-md">
            <q-btn color="primary"
                   class="full-width"
                   label="مشاهده پنل"
                   :to="{name: 'UserPanel.Asset.TripleTitleSet.Products', params: {eventName: activatedPanelName}}" />
          </div>
          <div v-if="activatedProduct"
               class="q-mt-md">
            <product-item :options="{product: activatedProduct, canAddToCart: false, showPrice: false, routeToProduct: false}" />
          </div>
        </template>
      </inside-dialog>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Auth from 'src/components/Auth.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { ProductList } from 'src/models/Product.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'
import UserMobileVerification from 'src/components/Widgets/User/UserMobileVerification/UserMobileVerification.vue'

export default defineComponent({
  name: 'SinaPishraftRegisterForm',
  components: {
    Auth,
    ProductItem,
    InsideDialog,
    UserMobileVerification
  },
  mixins: [mixinWidget, mixinAuth],
  data () {
    return {
      majors: [
        {
          id: 1,
          name: 'ریاضی',
          title: 'ریاضی',
          selected: false
        },
        {
          id: 2,
          name: 'تجربی',
          title: 'تجربی',
          selected: false
        },
        {
          id: 3,
          name: 'انسانی',
          title: 'انسانی',
          selected: false
        }
      ],
      products: new ProductList(),
      selectedMajor: null,
      selectedProduct: null,
      sinaCode: null,
      majorsLoading: false,
      productLoading: false,
      formLoading: false,
      resultOfSubmitDialog: false,
      loginDialog: false,
      userMobileVerificationDialog: false,
      activatedProduct: null,
      activatedPanelName: null,
      defaultOptions: {

      }
    }
  },
  computed: {
    isMobileIsVerified () {
      return !!this.user.mobile_verified_at
    }
  },
  mounted () {
    this.$bus.on('onLoggedIn', () => {
      this.loginDialog = false
      this.recordFirstFormData()
    })
  },
  methods: {
    getProducts (majorId) {
      this.productLoading = true
      APIGateway.events.getSinaProducts({
        data: { major_id: majorId }
      })
        .then(productList => {
          this.products = productList
          this.productLoading = false
        })
        .catch(() => {
          this.productLoading = false
        })
    },
    onChangeMajor (majorId) {
      this.getProducts(majorId)
    },
    validateRecordFirstFormData () {
      let state = true
      const messages = []
      if (!this.selectedMajor) {
        state = false
        messages.push('رشته خود را انتخاب کنید.')
      }
      if (!this.selectedProduct) {
        state = false
        messages.push('محصول مورد نظر خود را انتخاب کنید.')
      }
      if (!this.sinaCode) {
        state = false
        messages.push('کد را وارد کنید.')
      }
      messages.forEach(message => {
        this.$q.notify({
          message,
          type: 'warning'
        })
      })

      return state
    },
    recordFirstFormData () {
      if (!this.validateRecordFirstFormData()) {
        return
      }
      if (!this.isUserLogin) {
        this.showLoginDialog()
      } else if (!this.isMobileIsVerified) {
        this.showUserMobileVerificationDialog()
      } else {
        this.submitFormData()
      }
    },
    onUserMobileverified () {
      this.submitFormData()
      this.userMobileVerificationDialog = false
    },
    showLoginDialog () {
      this.loginDialog = true
    },
    showUserMobileVerificationDialog () {
      this.userMobileVerificationDialog = true
    },
    showResultOfSubmitDialog () {
      this.resultOfSubmitDialog = true
    },
    submitFormData () {
      this.formLoading = true
      APIGateway.events.setSinaProduct({
        sina_code: this.sinaCode,
        product_id: this.selectedProduct
      })
        .then(result => {
          this.activatedProduct = result.product
          this.activatedPanelName = result.panel_name
          this.showResultOfSubmitDialog()
          this.formLoading = false
        })
        .catch(() => {
          this.formLoading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.sina-pishraft-register-form {

}
</style>

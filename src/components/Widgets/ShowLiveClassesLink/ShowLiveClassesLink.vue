<template>
  <q-dialog :model-value="dialog"
            full-width
            full-height>
    <q-card class="custom-card ShowLiveClassesLink">
      <q-card-section>
        <q-btn color="primary"
               flat
               icon="close"
               @click="toggleDialog" />
      </q-card-section>
      <q-card-section>
        <div class="products-list">
          <div class="row q-col-gutter-lg">
            <div class="col-12">
              <template v-if="products.loading || liveLinkLoading">
                <div v-for="number in 4"
                     :key="number"
                     class="col-md-3 col-sm-6 col-xs-12">
                  <product-item class="product-item"
                                :options="{
                                  canAddToCart: false,
                                  routeToProduct: false,
                                  loading: true
                                }" />
                </div>
              </template>
              <template v-else-if="products.list.length > 0">
                <div class="row q-col-gutter-lg">
                  <div v-for="product in products.list.filter(product => product.is_live)"
                       :key="product.id"
                       class="col-md-3 col-sm-6 col-xs-12">
                    <product-item class="product-item"
                                  :options="{
                                    canAddToCart: !product.is_purchased,
                                    showPrice: !product.is_purchased,
                                    routeToProduct: !product.is_purchased,
                                    customAction: product.is_purchased,
                                    customActionLabel: 'رفتن به کلاس',
                                    customActionMessage: 'این محصول را خریده اید',
                                    product: product,
                                  }"
                                  @onCustomActionClicked="onProductClicked(product)"
                                  @productClicked="onProductClicked(product)"
                                  @click="onProductClicked(product)" />
                  </div>
                </div>
                <q-separator class="q-my-lg" />
                <div class="row q-col-gutter-lg">
                  <div v-for="product in products.list.filter(product => !product.is_live)"
                       :key="product.id"
                       class="col-md-3 col-sm-6 col-xs-12">
                    <product-item class="product-item"
                                  :options="{
                                    canAddToCart: !product.is_purchased,
                                    showPrice: !product.is_purchased,
                                    routeToProduct: !product.is_purchased,
                                    customAction: product.is_purchased,
                                    customActionLabel: 'رفتن به کلاس',
                                    customActionMessage: 'این محصول را خریده اید',
                                    product: product,
                                  }"
                                  @onCustomActionClicked="onProductClicked(product)"
                                  @productClicked="onProductClicked(product)"
                                  @click="onProductClicked(product)" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="col-12">
                  <q-banner class="bg-primary text-white">
                    <h4 class="text-center">
                      همایش آنلاینی وجود ندارد
                    </h4>
                    <template v-slot:action>
                      <q-btn size="xl"
                             padding="xs xl"
                             color="info"
                             label="بستن"
                             @click="toggleDialog" />
                    </template>
                  </q-banner>
                </div>
              </template>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="infoDialog"
            persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">نام و نام خانوادگی خود را وارد کنید</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="user.first_name"
                 dense
                 autofocus
                 :loading="user.loading || liveLinkLoading"
                 label="نام" />
        <q-input v-model="user.last_name"
                 dense
                 autofocus
                 :loading="user.loading || liveLinkLoading"
                 label="نام خانوادگی" />
      </q-card-section>

      <q-card-actions align="left"
                      class="text-primary">
        <q-btn v-close-popup
               flat
               :loading="user.loading || liveLinkLoading"
               label="انصراف" />
        <q-btn flat
               label="ثبت"
               :loading="user.loading || liveLinkLoading"
               @click="updateFullname" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { User } from 'src/models/User.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { ProductList } from 'src/models/Product.js'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'ShowLiveClassesLink',
  components: {
    ProductItem
  },
  mixins: [mixinWidget],
  data() {
    return {
      user: new User(),
      isUserLogin: false,
      products: new ProductList(),
      dialog: false,
      selectedProduct: null,
      liveLinkLoading: false,
      infoDialog: false,
      defaultOptions: {
        data: [],
        style: {},
        eventName: 'showLiveClassesLink'
      }
    }
  },
  mounted() {
    this.loadAuthData()
    this.$bus.on(this.localOptions.eventName, this.toggleDialog)
  },
  methods: {
    hasNikname () {
      return this.user.first_name && this.user.last_name && this.user.first_name.length + this.user.last_name.length > 1
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    toggleDialog() {
      this.loadAuthData()
      if (this.isUserLogin) {
        this.dialog = !this.dialog
        this.getLiveConductors()
        return
      }

      this.$store.commit('AppLayout/updateLoginDialog', true)
    },
    getLiveConductors () {
      this.products.loading = true
      APIGateway.product.getLiveProducts()
        .then((products) => {
          this.products = new ProductList(products)
          this.products.loading = false
        })
        .catch(() => {
          this.products.loading = false
        })
    },
    updateFullname () {
      this.user.loading = true
      APIGateway.user.updateProfile(this.user)
        .then(() => {
          this.user.loading = false
          this.goToLiveLink()
        })
        .catch(() => {
          this.user.loading = false
        })
    },
    goToLiveLink () {
      this.liveLinkLoading = true
      APIGateway.product.getLiveLink(this.selectedProduct.id)
        .then((liveLink) => {
          window.location.href = liveLink
          this.liveLinkLoading = false
        })
        .catch(() => {
          this.liveLinkLoading = false
        })
    },
    onProductClicked(product) {
      this.selectedProduct = product
      if (!product.is_purchased) {
        return
      }
      if (!this.hasNikname()) {
        this.infoDialog = true
        return
      }
      this.goToLiveLink()
    }
  }
}
</script>

<template>
  <q-dialog :model-value="dialog"
            full-width
            full-height>
    <q-card class="ShowLiveClassesLink">
      <q-card-section>
        <q-btn color="primary"
               class="size-md"
               flat
               icon="close"
               @click="toggleDialog" />
      </q-card-section>
      <q-card-section>
        <template v-if="products.loading || liveLinkLoading">
          <div class="row q-col-gutter-lg">
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
          <div class="flex items-center"
               style="height: 30vh;">
            <q-banner class="info-banner full-width">
              همایش آنلاینی وجود ندارد
              <template v-slot:avatar>
                <q-icon name="ph:info"
                        size="xs" />
              </template>
              <template v-slot:action>
                <q-btn color="accent"
                       class="size-md full-width"
                       outline
                       label="بستن"
                       @click="toggleDialog" />
              </template>
            </q-banner>
          </div>
        </template>
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
import { APIGateway } from 'src/api/APIGateway.js'
import { ProductList } from 'src/models/Product.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'ShowLiveClassesLink',
  components: {
    ProductItem
  },
  mixins: [mixinWidget, mixinAuth],
  data () {
    return {
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
  mounted () {
    this.$bus.on(this.localOptions.eventName, this.toggleDialog)
  },
  methods: {
    hasNikname () {
      return this.user.first_name && this.user.last_name && this.user.first_name.length + this.user.last_name.length > 1
    },
    toggleDialog () {
      this.loadAuthData()
      if (this.isUserLogin) {
        this.dialog = !this.dialog
        this.getLiveConductors()
      } else {
        this.$store.commit('AppLayout/updateLoginDialog', true)
      }
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
    onProductClicked (product) {
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

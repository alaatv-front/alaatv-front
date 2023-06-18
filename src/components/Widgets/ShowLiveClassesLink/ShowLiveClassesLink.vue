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
            <template v-if="products.loading">
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
              <div v-for="product in products.list"
                   :key="product.id"
                   class="col-md-3 col-sm-6 col-xs-12">
                <product-item class="product-item"
                              :options="{
                                canAddToCart: !product.is_purchased,
                                showPrice: !product.is_purchased,
                                routeToProduct: !product.is_purchased,
                                product: product,
                              }"
                              @click="onProductClicked(product)" />
              </div>
            </template>
            <template v-else>
              <div class="col-12">
                <q-banner class="bg-primary text-white">
                  <h4 class="text-center">
                    همایش آنلانی وجود ندارد
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
      </q-card-section>
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
      defaultOptions: {
        eventName: 'showLiveClassesLink'
      }
    }
  },
  mounted() {
    this.loadAuthData()
    this.$bus.on(this.localOptions.eventName, this.toggleDialog)
  },
  methods: {
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
      APIGateway.product.liveConductors()
        .then((products) => {
          this.products = new ProductList(products)
          this.products.loading = false
        })
        .catch(() => {
          this.products.loading = false
        })
    },
    onProductClicked(product) {
      if (product.is_purchased) {
        window.location.href = product.live_link
      }
      // else {
      //   this.$router.push({ name: 'Public.Product.Show', params: { id: product.id } })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.ShowLiveClassesLink{
  .products-list {
    //max-height: 50vh;
  }
}

</style>

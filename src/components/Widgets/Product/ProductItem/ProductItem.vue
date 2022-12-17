<template>
  <q-card class="product-item-box">
    <div class="img-box">
      <router-link :to="{
        name: 'User.Product.Show',
        params: { id: product.id?product.id:-1, title: product.title }
      }"
      >
        <lazy-img :src="product.photo"
                  :alt="product.title"
                  width="1"
                  height="1"
                  class="img"
        />
        <div class="main-title ellipsis-2-lines">
          {{ product.title }}
        </div>
      </router-link>
    </div>
    <div class="product-content-box">
      <div class="info-box">
        <div class="teacher-image"></div>
        <div class="teacher-name">محمد امین نباخته</div>
        <!-- <div class="teacher-score">
          <div class="total-score">
            <div class="counts-score">(۶۲۵)</div>
            ۳.۸
            <div class="star-score"></div>
          </div>
        </div> -->
      </div>
      <div class="action-box">
        <div class="more-detail product-more-detail">
          <div class="price-box">
            <div class="price-info">
              <div v-if="product.price['final'] !== product.price['base']"
                   class="discount"
              >
                <span>
                  %{{
                    (
                      (1 - product.price['final'] / product.price['base']) *
                      100
                    ).toFixed(0)
                  }}
                </span>
              </div>
              <div class="price-container">
                <div class="final-price-box">
                  <div class="final-price">
                    {{ product.price['final'] }}
                  </div>
                  <div class="price-Toman">تومان</div>
                </div>
                <div class="main-price">{{ product.price['base'] }}</div>
              </div>
            </div>
          </div>
        </div>
        <q-btn unelevated
               :productId="product.id"
               :data-product-id="product.id"
               class="btn-green"
               @click="addToCart"
        >
          <q-icon name="add"></q-icon>
          <span>افزودن به سبد</span>
        </q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
import LazyImg from 'components/lazyImg'
import { Product } from 'src/models/Product'

export default {
  name: 'productItem',
  components: { LazyImg },
  props: {
    data: {
      type: Product,
      default: new Product()
    }
  },
  data: () => ({
    product: new Product()
  }),
  mounted() {
    this.product = new Product(this.data)
  },
  methods: {
    addToCart() {
      this.$store.dispatch('Cart/addToCart', this.product).then(() => {
        this.$store.dispatch('Cart/reviewCart', this.product).then(() => {
          this.$q.notify({
            message: 'با موفقیت به سبد خرید شما افزوده شد',
            color: 'green',
            actions: [
              {
                label: 'سبد خرید',
                icon: 'isax:shopping-cart',
                color: 'white',
                class: 'bg-green-3',
                handler: () => {
                  this.$router.push({ name: 'cart' })
                }
              }
            ]
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

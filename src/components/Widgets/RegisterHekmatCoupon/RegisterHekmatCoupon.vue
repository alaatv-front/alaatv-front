<template>
  <div class="RegisterHekmatCoupon">
    <q-card>
      <q-item>
        <q-item-section>
          <q-item-label>
            کد دریافتی از سایت حکمت را اینجا وارد نمایید:
          </q-item-label>
          <q-item-label caption>
            نحوه استفاده از حکمت
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section>
        <q-banner rounded
                  class="bg-light-green text-white">
          پس از خریداری دوره های آلاء از سایت حکمت، کد دریافتی خود را وارد نمایید تا بسته مورد نظر برای شما فعال شود.
          <template v-slot:action>
            <q-btn color="primary"
                   label="برای تهیه کد حکمت اینجا کلیک کنید" />
          </template>
        </q-banner>
        <div class="q-mt-lg">
          <lazy-img src="http://nodes.alaatv.com/upload/hekmat_landing1.jpg"
                    width="472"
                    height="121" />
        </div>
        <div class="q-mt-lg">
          بسته‌های جمع‌بندی کنکوری آلاء از طریق طرح حکمت با تخفیف ویژه در اختیار فرزندان نیروهای مسلح قرار می‌گیرد. این بسته‌های جمع‌بندی در بهینه‌ترین فرصت ممکن، با ارائه دوره‌‌های فشرده‌ مرور و تست زنی، مهارت‌های مورد نیاز شما در مباحث و دروس مختلف کنکوری را ارتقا می‌دهد.
        </div>
        <div class="q-mt-lg">

          <q-input v-model="coupon"
                   filled
                   bottom-slots
                   label="کد">
            <template v-slot:before>
              <q-icon name="isax:ticket" />
            </template>

            <template v-slot:hint>
              کد دریافتی از سایت حکمت
            </template>

            <template v-slot:after>
              <q-btn color="primary"
                     :loading="submitLoading"
                     @click="submitVoucher">
                ثبت کد
              </q-btn>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-banner>
          مرکز پشتیبانی طرح باقرالعلوم (ع):
          <span class="text-primary">
            021-75205701
          </span>
        </q-banner>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { ProductList } from 'src/models/Product.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'Services',
  components: { LazyImg },
  mixins: [mixinWidget, mixinAuth],
  data () {
    return {
      coupon: null,
      submitLoading: false,
      products: new ProductList()
    }
  },
  mounted () {
    this.checkCodeInQueryParam()
  },
  methods: {
    checkCodeInQueryParam () {
      if (!this.$route.query.code) {
        return
      }
      this.coupon = this.$route.query.code

      this.submitVoucher()
    },
    submitVoucher () {
      if (!this.isUserLogin) {
        this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params, query: this.$route.query })
        this.$store.commit('AppLayout/updateLoginDialog', true)
        return
      }
      this.submitLoading = true
      APIGateway.voucher.submit({ code: this.coupon })
        .then((messageAndProductList) => {
          this.$q.notify({
            message: messageAndProductList.message,
            type: 'positive',
            position: 'top'
          })
          this.products = messageAndProductList.products
          this.submitLoading = false
          this.$router.push({ name: 'UserPanel.MyPurchases' })
        })
        .catch((e) => {
          this.submitLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div :style="defaultOptions.style"
       class="select-teacher">
    <q-card class="select-teacher__order-items q-pa-md">
      <order-item v-for="orderItem in productsShouldSelect"
                  :key="orderItem.orderId"
                  :order="orderItem" />
    </q-card>
  </div>
</template>

<script>
import { Set } from 'src/models/Set.js'
import OrderItem from './components/Order.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'SelectTeacher',
  components: { OrderItem },
  mixins: [mixinWidget],
  data () {
    return {
      loading: false,
      productsShouldSelect: [],
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        showCountOfContent: true,
        showCountOfVideo: true,
        showCountOfPamphlet: true,
        showBtnFavorSet: true,
        showBtnFavorContent: true
      },
      tab: '',
      set: new Set(),
      contentVideos: [],
      allGroupsOfContents: [],
      ordered: true
    }
  },
  mounted () {
    this.getProductsShouldSelect()
  },
  methods: {
    getProductsShouldSelect () {
      this.loading = true
      APIGateway.order.getProductsShouldSelect()
        .then((productsShouldSelect) => {
          this.productsShouldSelect = productsShouldSelect
          console.log('this.productsShouldSelect', this.productsShouldSelect)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.select-teacher {
  .select-teacher__orders {
    margin-bottom: $space-1;
    .select-teacher__order-items {
    }
  }
}
</style>

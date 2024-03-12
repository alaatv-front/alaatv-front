<template>
  <q-card :style="defaultOptions.style"
          class="select-teacher outline-card">
    <q-banner class="message-banner">
      <div class="flex justify-start items-center">
        <badge-icon icon="ph:warning"
                    color="warning"
                    class="q-mr-md" />
        <div>
          <template v-if="productsShouldSelect.length > 0">
            دوره های زیر
          </template>
          <template>
            این دوره
          </template>
          دارای چند استاد است. لطفا استاد مورد نظر خود را انتخاب نمایید:
          <br>
          (توجه: بعد از انتخاب، امکان تغییر از طریق سایت وجود ندارد)
        </div>
      </div>
    </q-banner>
    <q-card-section>
      <div class="select-teacher__order-items">
        <order-item v-for="orderItem in productsShouldSelect"
                    :key="orderItem.orderId"
                    :order="orderItem"
                    class="order-item" />
      </div>
    </q-card-section>
    <q-separator class="q-my-md" />
    <q-card-section class="flex justify-end">
      <q-btn color="primary"
             label="ثبت دبیران انتخاب شده"
             :loading="sendSelectedTeacherLoading"
             @click="sendSelectedTeacher" />
    </q-card-section>
  </q-card>
</template>

<script>
import OrderItem from './components/Order.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'

export default {
  name: 'SelectTeacher',
  components: { BadgeIcon, OrderItem },
  mixins: [mixinWidget],
  data () {
    return {
      loading: false,
      sendSelectedTeacherLoading: false,
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
      }
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
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    sendSelectedTeacher () {
      this.sendSelectedTeacherLoading = true
      APIGateway.order.getProductsShouldSelect()
        .then(() => {
          this.sendSelectedTeacherLoading = false
        })
        .catch(() => {
          this.sendSelectedTeacherLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.select-teacher {
  .message-banner {
    @include body1;
    color: $grey-9;
    margin-bottom: $space-4;
    border: solid 2px $warning-3;
  }
  .select-teacher__order-items {
  }
}
</style>

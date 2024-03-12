<template>
  <q-dialog v-model="showDialog"
            persistent>
    <inside-dialog class="select-teacher">
      <template #headerAction>
        <span />
      </template>
      <template #header-icon>
        <badge-icon icon="ph:warning"
                    color="warning"
                    class="q-mr-md" />
      </template>
      <template #header>
        توجه
      </template>
      <template #body>
        <q-banner dense
                  class="message-banner">
          <span v-if="productsShouldSelect.length > 1">
            دوره های زیر
          </span>
          <span>
            این دوره
          </span>
          <span>
            دارای چند استاد است. لطفا استاد مورد نظر خود را انتخاب نمایید:
          </span>
          <br>
          <span>
            (توجه: بعد از انتخاب، امکان تغییر از طریق سایت وجود ندارد)
          </span>
        </q-banner>
        <div class="select-teacher__order-items">
          <order-item v-for="(orderItem, orderIndex) in productsShouldSelect"
                      :key="orderIndex"
                      :ref="'OrderItem' + orderIndex"
                      v-model:selected-products="orderProducts[orderIndex]"
                      :order="orderItem"
                      class="order-item" />
        </div>
      </template>
      <template #action>
        <q-btn color="primary"
               label="ثبت دبیران انتخاب شده"
               :loading="sendSelectedTeacherLoading"
               @click="sendSelectedTeacher" />
      </template>
    </inside-dialog>
  </q-dialog>
</template>

<script>
import OrderItem from './components/Order.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'

export default {
  name: 'SelectTeacher',
  components: {
    InsideDialog,
    BadgeIcon,
    OrderItem
  },
  mixins: [mixinWidget],
  data () {
    return {
      showDialog: false,
      loading: false,
      sendSelectedTeacherLoading: false,
      orderProducts: [],
      productsShouldSelect: [],
      defaultOptions: {
      }
    }
  },
  mounted () {
    this.getProductsShouldSelect()
  },
  methods: {
    allProductSelected () {
      let allProductSelected = true
      this.productsShouldSelect.forEach((item, itemIndex) => {
        if (!this.$refs['OrderItem' + itemIndex][0].allProductSelected()) {
          allProductSelected = false
        }
      })
      return allProductSelected
    },
    getProductsShouldSelect () {
      this.loading = true
      APIGateway.order.getProductsShouldSelect()
        .then((productsShouldSelect) => {
          this.productsShouldSelect = productsShouldSelect
          this.orderProducts = this.productsShouldSelect.map(() => [])
          this.loading = false
          if (this.productsShouldSelect.length > 0) {
            this.showDialog = true
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    sendSelectedTeacher () {
      if (!this.allProductSelected()) {
        this.$q.notify({
          type: 'negative',
          message: 'لطفا تمام موارد فوق را تکمیل کنید.'
        })
        return
      }
      this.sendSelectedTeacherLoading = true
      APIGateway.order.selectProductBetweenMulti(this.orderProducts.reduce((accumulator1, currentValue1) => {
        return accumulator1.concat(currentValue1)
      }, []))
        .then(() => {
          this.sendSelectedTeacherLoading = false
          this.showDialog = false
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
    :deep(.q-banner__content) {
      text-overflow: unset;
      white-space: unset;
    }
  }
  .select-teacher__order-items {
  }
}
</style>

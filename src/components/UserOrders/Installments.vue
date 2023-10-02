<template>
  <q-list separator
          class="Installments">
    <q-item class="text-center justify-center">
      لیست اقساط پرداخت نشده
    </q-item>
    <q-item class="gt-sm">
      <div class="row">
        <div class="col-md-4 col-12">
          مبلغ
        </div>
        <div class="col-md-4 col-12">
          موعد پرداخت
        </div>
        <div class="col-md-4 col-12" />
      </div>
    </q-item>
    <q-item v-for="(installment, installmentIndex) in installments"
            :key="installmentIndex">
      <div class="row">
        <div class="col-md-4 col-sm-6 col-xs-6">
          {{ installment.cost.toLocaleString('fa') }}
        </div>
        <div class="col-md-4 col-sm-6 col-xs-6">
          {{ getPersianDate(installment.deadline_at) }}
        </div>
        <div class="col-md-4 col-12">
          <q-btn color="primary"
                 class="full-width"
                 @click="payInstallment(installment)">
            پرداخت
          </q-btn>
        </div>
      </div>
    </q-item>
  </q-list>
</template>

<script>
import moment from 'moment-jalaali'
import { APIGateway } from 'src/api/APIGateway.js'

moment.loadPersian()

export default {
  name: 'Installments',
  props: {
    installments: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getPersianDate(date) {
      return moment(date, 'YYYY/M/D HH:mm:ss').locale('fa').format('jDD jMMM jYYYY')
    },
    payInstallment(installment) {
      APIGateway.cart.getPaymentRedirectEncryptedLink({
        transactionId: installment.id
      })
        .then(url => {
          window.location.href = url
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.Installments {
  .q-item {
    .row {
      width: 100%;
    }
  }
}
</style>

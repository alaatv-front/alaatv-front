<template>
  <div class="row justify-center q-my-md">
    <div class="col-md-9">
      <h2>
        Toast
      </h2>
      <div class="row justify-around">
        <q-btn label="show info tosat"
               @click="showInfoToast" />
        <q-btn label="show error tosat"
               @click="showErrorToast" />
        <q-btn label="show success tosat"
               @click="showSuccessToast" />
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'

export default {
  name: 'Toast',
  methods: {
    showInfoToast () {
      Notify.create({
        type: 'info',
        color: 'info',
        timeout: 500000,
        position: 'top',
        message: 'لورم ایپسوم شما نشان شد',
        icon: 'info',
        actions: [
          { icon: 'close', color: 'info' }
        ]
      })
    },
    showErrorToast () {
      Notify.create({
        type: 'error',
        color: 'negative',
        timeout: 500000,
        position: 'top',
        message: 'لورم ایپسوم شما نشان شد',
        icon: 'report_problem',
        actions: [
          { icon: 'close', color: 'negative' }
        ]
      })
    },
    showSuccessToast () {
      Notify.create({
        type: 'success',
        color: 'positive',
        timeout: 500000,
        position: 'top',
        message: 'لورم ایپسوم شما نشان شد',
        icon: 'check_circle',
        actions: [
          { icon: 'close', color: 'positive' }
        ]
      })
    }
  }
}
</script>

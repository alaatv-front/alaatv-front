<template>
  <div>
    <q-select
      v-model="activity"
      :options="ActivityOptions"
      label="انتخاب نوع فعالیت :"
    />
    <div v-if="activity === 'لینک'">
      <q-input
        v-model="link"
        label="لینک:" />
      <q-select
        v-model="linkSelect"
        :options="LinkOptions"
      />
    </div>
  </div>
</template>

<script>
import { inputMixin } from 'quasar-form-builder'
export default {
  name: 'ActivityType',
  data() {
    return {
      link: null,
      linkSelect: 'باز شدن در صفحه جدید',
      activity: null,
      ActivityOptions: [
        'بدون فعالیت',
        'لینک'
      ],
      LinkOptions: [
        'باز شدن در صفحه جدید',
        'باز شدن در همین صفحه'
      ]
    }
  },
  props: {
    value: {
      default: null
    },
    name: {
      type: String,
      default: 'ali'
    }
  },
  mixins: [inputMixin],
  methods: {
    addValue () {
      this.inputData++
      this.change(this.inputData)
    }
  }
}
</script>

<style scoped>

</style>

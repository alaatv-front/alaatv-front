<template>
  <div>
    <q-select v-model="inputData.id"
              :options="activityTypeOptions"
              option-value="id"
              emit-value
              map-options
              label="انتخاب نوع فعالیت :"
              @update:model-value="onChangeActivityType" />
    <div v-show="inputData.name !== 'noAction'"
         v-if="inputData.data">
      <q-input v-model="inputData.data.link"
               label="لینک مد نظر خود را وارد کنید:" />
      <q-select v-model="inputData.data.target"
                option-value="value"
                emit-value
                map-options
                :options="LinkStateOptions" />
    </div>
  </div>
</template>

<script>
// import { inputMixin } from 'quasar-form-builder'
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'

export default {
  name: 'ActivityType',
  mixins: [inputMixin],
  props: {
    value: {
      default: null
    }
  },
  data () {
    return {
      activityTypeOptions: [
        {
          id: 0,
          label: 'بدون فعالیت',
          name: 'noAction'
        },
        {
          id: 1,
          label: 'لینک',
          name: 'link'

        },
        {
          id: 2,
          label: 'زوم',
          name: 'zoom'

        }
      ],
      LinkStateOptions: [
        {
          label: 'باز شدن لینک در صفحه جدید',
          value: '_blank'
        },
        {
          label: 'باز شدن لینک در همین صفحه',
          value: '_self'
        }

      ]
    }
  },
  created () {
  },
  methods: {
    onChangeActivityType () {
      const name = this.activityTypeOptions.find(item => item.id === this.inputData.id).name
      const data = { id: this.inputData.id, name, data: {} }
      this.change(data)
    }

  }
}
</script>

<style scoped>

</style>

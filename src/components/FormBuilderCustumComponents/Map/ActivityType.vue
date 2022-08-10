<template>
  <div>
    <q-select
      v-model="activityType"
      :options="activityTypeOptions"
      label="انتخاب نوع فعالیت :"
    />
    <div
      v-show="activityType.value === 'link'"
    >
      <q-input
        v-model="link"
        label="لینک مد نظر خود را وارد کنید:" />
      <q-select
        v-model="linkState"
        :options="LinkStateOptions"
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
      linkState: {
        label: 'باز شدن لینک در صفحه جدید',
        value: '_blank'
      },
      activityType: {
        id: 1,
        label: 'لینک',
        value: 'link'
      },
      activityTypeOptions: [
        {
          id: 0,
          label: 'بدون فعالیت',
          value: 'noAction'
        },
        {
          id: 1,
          label: 'لینک',
          value: 'link'
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
  props: {
    value: {
      default: null
    }
  },
  watch: {
    link: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setActivity()
      }
    },
    activityType: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setActivity()
      }
    },
    linkState: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setActivity()
      }
    }
  },
  mixins: [inputMixin],
  methods: {
    setActivity () {
      if (this.activityType.id === 0) {
        this.inputData = {
          id: this.activityType.id,
          name: this.activityType.value,
          data: {}
        }
      } else {
        this.inputData = {
          id: this.activityType.id,
          name: this.activityType.value,
          data: {
            link: this.link,
            target: this.linkState.value
          }
        }
      }
      this.change(this.inputData)
    }
  }
}
</script>

<style scoped>

</style>

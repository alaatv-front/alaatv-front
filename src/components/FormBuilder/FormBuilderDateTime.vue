<template>
  <div>
    <q-input v-model="outputText" filled dir="ltr" readonly :disable="disable">
      <template v-if="canShowDate" #prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="inputData" :calendar="calendar" :mask="mask" :range="range" :multiple="multiple" :disable="disable" @update:model-value="change($event)">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="بستن" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-if="canShowTime" #append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="inputData" :mask="mask" format24h :disable="disable" @update:model-value="change($event)">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="بستن" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import inputMixin from 'components/FormBuilder/inputMixin'
export default {
  name: 'FormBuilderDateTime',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [String, Array]
    },
    calendar: {
      default: 'persian',
      type: String
    }
  },
  emits: ['update:value'],
  computed: {
    canShowTime () {
      return (!this.range && !this.multiple) && this.time
    },
    canShowDate () {
      return !this.time
    },
    mask () {
      if (this.canShowTime && this.canShowDate) {
        return 'YYYY-MM-DD HH:mm'
      } else if (this.canShowTime && !this.canShowDate) {
        return 'HH:mm'
      } else if (!this.canShowTime && this.canShowDate) {
        return 'YYYY-MM-DD'
      } else {
        return ''
      }
    },
    outputText () {
      if (Array.isArray(this.inputData)) {
        let ranges = this.inputData.map(item => {
          if (item.from) {
            return ('(' + item.from + '-' + item.to + ')')
          } else {
            return ('(' + item + ')')
          }
        })
        ranges = ranges.join(', ')

        return ranges
      } else if (this.inputData.from) {
        return ('(' + this.inputData.from + '-' + this.inputData.to + ')')
      }

      return this.inputData
    }
  },
  watch: {
    value () {
      if (this.calendar === 'persian') {
        this.inputData = this.miladiToShamsiDate(this.inputData)
      }
    }
  },
  methods: {
    change (val) {
      let date = val
      if (this.calendar === 'persian') {
        date = this.shamsiToMiladiDate(val)
      }
      this.$emit('update:value', date)
    },
    miladiToShamsiDate (date) {
      return moment(new Date(date)).format('jYYYY/jMM/jDD')
    },
    shamsiToMiladiDate (date) {
      return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>

</style>

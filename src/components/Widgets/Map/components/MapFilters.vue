<template>
  <div class="filter-options q-mt-md">
    <template v-for="item in filters"
              :key="item">
      <q-checkbox v-if="item.show"
                  v-model="filterValues"
                  :val="item.value"
                  :label="item.label" />
      <q-separator v-if="item.separator"
                   class="q-my-md filter-separator" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'MapFilters',
  data () {
    return {
      filters: [],
      filterValues: []
    }
  },
  computed: {
    getFiltersObject () {
      return (name) => {
        this.filters.find((item) => item.label === name)
      }
    }
  },
  watch: {
    filterValues (newVal, OldVal) {
      if (newVal.indexOf('راه_ابریشم') !== -1) {
        this.showOrHideFilters('abrisham', 'show')
      } else {
        this.showOrHideFilters('abrisham', 'hide')
      }
      if (newVal.indexOf('اقیانوس') !== -1) {
        this.showOrHideFilters('ocean', 'show')
      } else {
        this.showOrHideFilters('ocean', 'hide')
      }
      this.$emit('filterValues', newVal)
    }
  },
  created () {
    this.initFilterData()
  },
  methods: {
    showOrHideFilters (filterClass, mode) {
      this.filters.forEach(item => {
        if (item.class !== filterClass) {
          return null
        }
        item.show = mode === 'show'
        if (item.separator === undefined) {
          return null
        }
        item.separator = mode === 'show'
      })
    },
    initFilterData () {
      this.filters = [
        {
          value: 'رشته_ریاضی',
          label: 'رشته ریاضی',
          show: true
        }, {
          value: 'رشته_تجربی',
          label: 'رشته تجربی',
          show: true,
          separator: true
        }, {
          value: 'راه_ابریشم',
          label: 'راه ابریشم',
          show: true
        }, {
          value: 'اقیانوس',
          label: 'اقیانوس',
          show: true,
          separator: true

        },
        {
          class: 'abrisham',
          value: 'پیله',
          label: 'پیله',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_1',
          label: 'فرسنگ 1',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_2',
          label: 'فرسنگ 2',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_3',
          label: 'فرسنگ 3',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_4',
          label: 'فرسنگ 4',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_5',
          label: 'فرسنگ 5',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_6',
          label: 'فرسنگ 6',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_7',
          label: 'فرسنگ 7',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_8',
          label: 'فرسنگ 8',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فرسنگ_9',
          label: 'فرسنگ 9',
          show: false,
          separator: null
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_1',
          label: 'لنگرگاه 1',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_2',
          label: 'لنگرگاه 2',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_3',
          label: 'لنگرگاه 3',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_4',
          label: 'لنگرگاه 4',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_5',
          label: 'لنگرگاه 5',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_6',
          label: 'لنگرگاه 6',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_7',
          label: 'لنگرگاه 7',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_8',
          label: 'لنگرگاه 8',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_9',
          label: 'لنگرگاه 9',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_10',
          label: 'لنگرگاه 10',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_11',
          label: 'لنگرگاه 11',
          show: false
        },
        {
          class: 'ocean',
          value: 'لنگرگاه_12',
          label: 'لنگرگاه 12',
          show: false,
          separator: null

        },
        {
          class: 'abrisham',
          value: 'ریاضی',
          label: 'ریاضی',
          show: false
        },
        {
          class: 'abrisham',
          value: 'فیزیک',
          label: 'فیزیک',
          show: false
        },
        {
          class: 'abrisham',
          value: 'شیمی',
          label: 'شیمی',
          show: false
        },
        {
          class: 'abrisham',
          value: 'زیست',
          label: 'زیست',
          show: false
        }
      ]
    }
  }
}
</script>

<style scoped>

.filter-options {
  display: grid;
}

.filter-options .filter-separator {
  height: 1px;
  opacity: 1;
  background-color: #212529;
}

</style>

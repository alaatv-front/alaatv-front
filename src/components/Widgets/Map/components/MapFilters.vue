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
  methods: {
    initFilterData () {
      this.filters = [
        {
          value: 'رشته_ریاضی',
          label: 'رشته ریاضی',
          show: true
        }, {
          value: 'رشته_تجربی',
          label: 'رشته تجربی',
          separator: true,
          show: true
        }, {
          value: 'راه_ابریشم',
          label: 'راه ابریشم',
          show: true
        }, {
          value: this.ocean,
          label: 'اقیانوس',
          separator: true,
          show: true
        },
        {
          value: this.pille,
          label: 'پیله',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang1,
          label: 'فرسنگ۱',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang2,
          label: 'فرسنگ 2',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang3,
          label: 'فرسنگ 3',
          show: this.showAbrishamFilters
        },
        {
          value: false,
          label: 'فرسنگ 4',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang5,
          label: 'فرسنگ 5',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang6,
          label: 'فرسنگ 6',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang7,
          label: 'فرسنگ 7',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang8,
          label: 'فرسنگ 8',
          show: this.showAbrishamFilters
        },
        {
          value: this.farsang9,
          label: 'فرسنگ 9',
          show: this.showAbrishamFilters,
          separator: true
        },
        {
          value: this.riyazi,
          label: 'ریاضی',
          show: this.showAbrishamFilters
        },
        {
          value: this.fizik,
          label: 'فیزیک',
          show: this.showAbrishamFilters
        },
        {
          value: this.shimi,
          label: 'شیمی',
          show: this.showAbrishamFilters
        },
        {
          value: this.zistShenasi,
          label: 'زیست',
          show: this.showAbrishamFilters
        }
      ]
    }
  },
  watch: {
    abrisham (newVal, OldVal) {
      console.log('shit')
      if (newVal === true) {
        console.log('Moreshit')
        this.showAbrishamFilters = true
      }
    }
  },
  created () {
    this.initFilterData()
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

<template>
  <q-expansion-item
    v-for="(item, index) in contentSearchData"
    :key="index"
    :label="item.title"
    class="q-mb-sm"
    default-opened
    :header-style="{backgroundColor: 'white' }"
  >
    <q-card
      :style="{ overflow: 'hidden', position: 'relative' }"
      :class="{
        'lessons-expanded': item.title === 'درس' && !lessonsExpand,
        'teachers-expanded': item.title === 'دبیران' && !teachersExpand,
        'animated-expand': true
      }"
    >
      <q-separator class="mb-2" />
      <q-card-section>
        <q-input  class="search"
                  dense
                  v-if="item.title === 'درس'"
                  outlined
                  label="جستجو..."
                  v-model="lessonsSearchField" />
        <q-input  class="search"
                  v-if="item.title === 'دبیران'"
                  outlined
                  label="جستجو..."
                  v-model="teachersSearchField"
                  dense />
      </q-card-section>
      <q-card-section>
        <div class="test row"
             :class="{
               'lessons-not-expanded': item.title === 'درس' && !lessonsExpand,
               'teachers-not-expanded': item.title === 'دبیران' && !teachersExpand,
               'animated-expand': true}"
        >
          <q-checkbox
            v-for="(option) in item.options"
            :key="option.order"
            class="col-12 q-mb-sm"
            :class="{'hidden': (item.title === 'درس' && !doesContain(lessonsSearchField, option.title)) || item.title === 'دبیران' && !doesContain(teachersSearchField, option.title)}"
            dense
            :indeterminate-value="false"
            :label="option.title"
            v-model="option.active"
            :input-value="option.value"
            :disable="loading"
            @update:model-value="onFiltersChange(option)"
          />
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          v-if="item.title === 'درس'"
          color="primary"
          depressed
          class="show-more-expansion"
          @click="lessonsExpand = !lessonsExpand"
        >
          <div v-if="!lessonsExpand">
            <q-icon color="#fff"
                    size="16"
                    name="mdi-plus"
            />
            نمایش بیشتر...
          </div>
          <div v-if="lessonsExpand">
            <q-icon color="#fff"
                    size="16"
                    name="mdi-minus" />
            نمایش کمتر...
          </div>
        </q-btn>
        <q-btn
          v-if="item.title === 'دبیران'"
          color="primary"
          class="show-more-expansion"
          depressed
          @click="teachersExpand = !teachersExpand"
        >
          <div v-if="!teachersExpand">
            <q-icon color="#fff"
                    size="16"
                    name="mdi-plus"
            />
            نمایش بیشتر...
          </div>
          <div v-if="teachersExpand">
            <q-icon color="#fff"
                    size="16"
                    name="mdi-minus"
            />
            نمایش کمتر...
          </div>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<script>

export default {
  directives: {},
  name: 'SideBar',
  props: {
    contentFilterData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedTags: {
      type: Array,
      default: () => []
    },
    mobileMode: {
      type: Boolean,
      default: false
    },
    applyFilter: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      testModel: false,
      lessonsExpand: false,
      teachersExpand: false,
      teachersSearchField: '',
      lessonsSearchField: '',
      panel: [0, 1, 2, 3, 4],
      selectedFields: [],
      contentSearchData: {},
      localFilterData: {}
    }
  },
  created () {
    this.contentSearchData = JSON.parse(JSON.stringify(this.contentFilterData))
    this.mergeContentSearchDataActiveKeyWithSelectedFields()
    this.sortFilterBasedOnSelected()
  },
  emits: ['update:selectedTags'],
  computed: {

  },
  watch: {
    teachersSearchField: {
      handler (newVal) {
        this.filterBySearch('lessonTeacher', newVal)
      }
    },
    lessonsSearchField: {
      handler (newVal) {
        this.filterBySearch('allLessons', newVal)
      }
    },
    applyFilter: {
      handler (newVal) {
        console.log('applyFilter watch in sid', newVal)
        if (newVal) this.emitChanges()
      }
    }
  },
  methods: {
    sortFilterBasedOnSelected () {
      Object.keys(this.contentSearchData).forEach(key => {
        this.contentSearchData[key].options.sort((first, second) => {
          if (first.active && !second.active) {
            return -1
          }
          if (!first.active && second.active) {
            return 1
          }
          return 0
        })
      })
    },
    updateSelectedTags () {
      const selectedTags = []
      Object.keys(this.contentSearchData).forEach(key => {
        this.contentSearchData[key].options.filter(item => item.active).forEach(item => {
          selectedTags.push(item)
        })
      })
      this.$emit('update:selectedTags', selectedTags)
    },
    mergeContentSearchDataActiveKeyWithSelectedFields () {
      this.selectedFields = []
      Object.keys(this.contentSearchData).forEach(key => {
        this.selectedTags.forEach(selectedTag => {
          const index = this.contentSearchData[key].options.findIndex(item => item.value === selectedTag.value)
          if (index === -1) {
            return
          }
          this.contentSearchData[key].options[index].active = true
        })
      })
    },
    updateFilterData () {
      this.sortFilterBasedOnSelected()
      this.updateSelectedTags()
    },
    emitChanges () {
      this.$emit('filter', this.selectedFields)
    },
    onFiltersChange () {
      this.updateFilterData()
      // if (!this.mobileMode) {
      //   this.emitChanges()
      // }
    },

    changeSelectedItem (filterItem, name) {
      this.contentSearchData[name].options.forEach(item => {
        if (item.value === filterItem.value) {
          item.active = filterItem.active
          return true
        }
      })
    },

    doesContain (string, source) {
      return source.search(string) !== -1
    }
  }

}
</script>

<style scoped lang="scss">
.v-expansion-panel-header {
    min-height: 40px;
    font-size: 1.2rem;
    justify-content: space-between;
}

.vertical-scroller {
    margin-top: 20px;
}

.horizontal-scroller {
    flex-wrap: nowrap;
    overflow-x: scroll;
}

.lessons-not-expanded {
    height: 370px;
    overflow: hidden;
}

.lessons-expanded {
    max-height: 540px;
}

.teachers-expanded {
    max-height: 540px;
}

.teachers-not-expanded {
    height: 370px;
    overflow: hidden;
}

.show-more-expansion {
    color: white;
    font-size: 16px;
    letter-spacing: normal;
    font-weight: 500;
    width: 100%;
    @media screen and(max-width:500px) {
        font-size: 12px;
    }
}

.teachersNotExpanded {
    max-height: 400px;
    overflow: hidden;
}
</style>
<style lang="scss">
.q-chip{
  .q-icon{
    font-size: 1.1em;
    color: inherit;
  }
}
</style>

<template>
  <div>
    <v-container>
      <div>
        <v-expansion-panels
          dense
          v-model="panel"
          flat
          multiple
        >
          <v-expansion-panel
            v-for="(item, index) in finalContent"
            :key="index"
            dense
          >
            <v-expansion-panel-header>
              {{ item.title }}
            </v-expansion-panel-header>
            <v-divider class="mb-2" />
            <v-expansion-panel-content
              :style="{ overflow: 'hidden', position: 'relative' }"
              :class="{
                'lessons-expanded': item.title === 'درس' && !lessonsExpand,
                'teachers-expanded': item.title === 'دبیران' && !teachersExpand,
                'animated-expand': true}"
            >
              <v-text-field class="search"
                            dense
                            v-if="item.title === 'درس'"
                            outlined
                            label="جستجو..."
                            v-model="lessonsSearchField" />
              <v-text-field class="search"
                            v-if="item.title === 'دبیران'"
                            outlined
                            label="جستجو..."
                            v-model="teachersSearchField"
                            dense />
              <div class="test"
                   :class="{
                     'lessons-not-expanded': item.title === 'درس' && !lessonsExpand,
                     'teachers-not-expanded': item.title === 'دبیران' && !teachersExpand,
                     'animated-expand': true}"
              >
                <v-checkbox
                  color="#ff9000"
                  dense
                  v-for="(option) in item.options"
                  :key="option.order"
                  :label="option.title"
                  v-model="option.active"
                  :input-value="option.value"
                  :disabled="loading"
                  @change="applyUserSelection(option)"
                />
              </div>
              <v-btn
                v-if="item.title === 'درس'"
                color="#ff9000"
                depressed
                class="show-more-expansion"
                @click="lessonsExpand = !lessonsExpand"
              >
                <div v-if="!lessonsExpand">
                  <v-icon color="#fff"
                          size="16">mdi-plus</v-icon>
                  نمایش بیشتر...
                </div>
                <div v-if="lessonsExpand">
                  <v-icon color="#fff"
                          size="16">mdi-minus</v-icon>
                  نمایش کمتر...
                </div>
              </v-btn>
              <v-btn
                v-if="item.title === 'دبیران'"
                color="#ff9000"
                class="show-more-expansion"
                depressed
                @click="teachersExpand = !teachersExpand"
              >
                <div v-if="!teachersExpand">
                  <v-icon color="#fff"
                          size="16">mdi-plus</v-icon>
                  نمایش بیشتر...
                </div>
                <div v-if="teachersExpand">
                  <v-icon color="#fff"
                          size="16">mdi-minus</v-icon>
                  نمایش کمتر...
                </div>
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-container>
  </div>
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
      finalContent: {}
    }
  },
  created () {
    this.contentSearchData = JSON.parse(JSON.stringify(this.contentFilterData))
    this.getContentSearchFilteredData()
    this.emitChanges()
  },
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
        if (newVal) this.emitChanges()
      }
    }
  },
  methods: {
    getContentSearchFilteredData () {
      const Arr = ['allLessons', 'lessonTeacher', 'allMaghta', 'nezam', 'major']
      Arr.forEach(item => this.sortItems(item))
      this.selectedFields = []
      Arr.forEach(name => this.saveSelectedFields(name))
      this.finalContent = JSON.parse(JSON.stringify(this.contentSearchData))
    },
    emitChanges () {
      this.$emit('filter', this.selectedFields)
    },
    filterBySearch (source, text) {
      if (text) {
        this.resetDataForSearch(source)
        this.filterData(source, text)
      } else {
        this.resetDataForSearch(source)
      }
    },

    sortItems (name) {
      this.contentSearchData[name].options.sort((first, second) => {
        if (first.active && !second.active) {
          return -1
        }
        if (!first.active && second.active) {
          return 1
        }
        return 0
      })
    },

    resetDataForSearch (source) {
      this.finalContent[source].options = JSON.parse(JSON.stringify(this.contentSearchData[source].options))
    },

    filterData (source, text) {
      this.finalContent[source].options = this.finalContent[source].options.filter(item => this.doesContain(text, item.title))
    },

    applyUserSelection (items) {
      const Arr = ['allLessons', 'lessonTeacher', 'allMaghta', 'nezam', 'major']
      Arr.forEach(name => this.changeSelectedItem(items, name))
      this.getContentSearchFilteredData()
      if (!this.mobileMode) this.emitChanges()
    },

    changeSelectedItem (items, name) {
      this.contentSearchData[name].options.forEach(item => {
        if (item.value === items.value) {
          item.active = items.active
          return true
        }
      })
    },

    saveSelectedFields (name) {
      this.contentSearchData[name].options.forEach(item => {
        if (item.active) {
          this.selectedFields.push(item)
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
    max-height: 500px;
}

.teachers-expanded {
    max-height: 500px;
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
.v-expansion-panel {
    .v-expansion-panel-content {
        .v-expansion-panel-content__wrap {
            @media screen and(max-width:500px) {
                margin-bottom: 0;
                padding-bottom: 0;
            }
            .search {
                .v-input__control {
                    .v-text-field__details {
                        display: none;
                        min-height: 0 !important;
                    }
                }
            }

            .test {
                transition: all ease-in-out 3s;

                .v-input {
                    .v-input__control {
                        .v-messages {
                            display: none;
                            min-height: 0 !important;
                        }

                        .v-input__slot {
                            .v-text-field__details {
                                display: none;
                                min-height: 0 !important;
                            }

                            cursor: pointer;

                            .v-label {
                                margin-bottom: 0;
                                right: 25px !important;
                                color: black;
                                font-weight: 400;
                                @media screen and(max-width:500px) {
                                    font-size: 12px;
                                    right: 10px !important;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>

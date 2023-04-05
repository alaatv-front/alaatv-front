<template>
  <q-btn-dropdown flat
                  content-style="width: 1100px; right: 360px; border-radius: 10px"
                  :label="data.menuTitle">
    <div class="row">
      <div class="col-2 q-pb-md">
        <div class="q-mb-md">
          <q-list>
            <div v-for="item in data.megaMenu.categoryItemsCol"
                 :key="item">
              <router-link v-if="item.tags"
                           :to="{ path: 'c', query: { 'tags[]': item.tags } }">
                <q-item :class="{item: isItemSelected(item)}"
                        clickable
                        @mouseover="categories[item.category] = true">
                  <q-item-section>
                    {{ item.title }}
                  </q-item-section>
                </q-item>
              </router-link>
              <router-link v-else
                           :to="{path: item.path}">
                <q-item :class="{item: isItemSelected(item)}"
                        clickable
                        @mouseover="categories[item.category] = true">
                  <q-item-section>
                    {{item.title}}
                  </q-item-section>
                </q-item>
              </router-link>
            </div>
          </q-list>
        </div>
      </div>
      <div class="col-10">
        <div v-for="item in data.megaMenu.subCategoryItemsCol"
             :key="item">
          <div>
            <div v-if="item.photo">
              <div v-if="categories[item.category]">
                <q-responsive :ratio="1998/553">
                  <q-img :src="item.photo" />
                </q-responsive>
              </div>
            </div>
            <div v-else>
              <div v-if="categories[item.category]"
                   :style="{background: item.bg}">
                <div class="row">
                  <div v-for="col in item.cols"
                       :key="col"
                       class="col-md-4 text-subtitle1 q-mb-xs">
                    <q-list>
                      <router-link :to="{ path: 'c', query: { 'tags[]': col.tags } }">
                        <q-item clickable>
                          <q-item-section class="list-title">
                            {{col.title.title}}
                          </q-item-section>
                        </q-item>
                      </router-link>
                      <div v-for="colItem in col.items"
                           :key="colItem">
                        <router-link :to="{ path: 'c', query: { 'tags[]': colItem.tags } }">
                          <q-item clickable>
                            <q-item-section>
                              {{colItem.title}}
                            </q-item-section>
                          </q-item>
                        </router-link>
                      </div>
                    </q-list>
                  </div>
                </div>
                <div v-if="item.category === 'davazdahomVaKonkur'"
                     class="magaMenu-svg-container">
                  <div class="megaMenu-svg-title">
                    دوازدهم و کنکور
                  </div>
                  <div class="megaMenu-svg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 455.431 455.431"
                         width="100"
                         height="100">
                      <g>
                        <path style="fill:#900C3F"
                              d="M405.39,412.764c-69.689,56.889-287.289,56.889-355.556,0s-62.578-300.089,0-364.089  s292.978-64,355.556,0S475.079,355.876,405.39,412.764z"
                              data-original="#5CA4DA"
                              class=""
                              data-old_color="#5CA4DA" />
                        <path style="fill:#AA0F4A"
                              d="M229.034,313.209c-62.578,49.778-132.267,75.378-197.689,76.8  C-17.01,307.52-7.055,106.987,49.834,48.676c51.2-52.622,211.911-62.578,304.356-29.867  C376.945,112.676,330.012,232.142,229.034,313.209z"
                              data-original="#6DAFE0"
                              class="active-path"
                              data-old_color="#6DAFE0" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div v-if="item.category === 'yazdahom'"
                     class="col magaMenu-svg-container">
                  <div class="megaMenu-svg-title">
                    یازدهم
                  </div>
                  <div class="megaMenu-svg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 455.431 455.431"
                         width="100"
                         height="100">
                      <g>
                        <path style="fill:#C70039"
                              d="M405.39,412.764c-69.689,56.889-287.289,56.889-355.556,0s-62.578-300.089,0-364.089  s292.978-64,355.556,0S475.079,355.876,405.39,412.764z"
                              data-original="#5CA4DA"
                              class=""
                              data-old_color="#5CA4DA" />
                        <path style="fill:#E90849"
                              d="M229.034,313.209c-62.578,49.778-132.267,75.378-197.689,76.8  C-17.01,307.52-7.055,106.987,49.834,48.676c51.2-52.622,211.911-62.578,304.356-29.867  C376.945,112.676,330.012,232.142,229.034,313.209z"
                              data-original="#6DAFE0"
                              class="active-path"
                              data-old_color="#6DAFE0" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div v-if="item.category === 'dahom'"
                     class="col magaMenu-svg-container">
                  <div class="megaMenu-svg-title">
                    دهم
                  </div>
                  <div class="megaMenu-svg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 455.431 455.431"
                         width="100"
                         height="100">
                      <g>
                        <path style="fill:#FF5733"
                              d="M405.39,412.764c-69.689,56.889-287.289,56.889-355.556,0s-62.578-300.089,0-364.089  s292.978-64,355.556,0S475.079,355.876,405.39,412.764z"
                              data-original="#5CA4DA"
                              class="active-path"
                              data-old_color="#5CA4DA" />
                        <path style="fill:#FF6F51"
                              d="M229.034,313.209c-62.578,49.778-132.267,75.378-197.689,76.8  C-17.01,307.52-7.055,106.987,49.834,48.676c51.2-52.622,211.911-62.578,304.356-29.867  C376.945,112.676,330.012,232.142,229.034,313.209z"
                              data-original="#6DAFE0"
                              class=""
                              data-old_color="#6DAFE0" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div v-if="item.category === 'nezameGhadim'"
                     class="col magaMenu-svg-container">
                  <div class="megaMenu-svg-title">
                    کنکور نظام قدیم
                  </div>
                  <div class="megaMenu-svg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 455.431 455.431"
                         xml:space="preserve"
                         width="100"
                         height="100">
                      <g>
                        <path style="fill:#FF9000"
                              d="M405.39,412.764c-69.689,56.889-287.289,56.889-355.556,0s-62.578-300.089,0-364.089  s292.978-64,355.556,0S475.079,355.876,405.39,412.764z"
                              data-original="#5CA4DA"
                              class=""
                              data-old_color="#5CA4DA" />
                        <path style="fill:#FFA229"
                              d="M229.034,313.209c-62.578,49.778-132.267,75.378-197.689,76.8  C-17.01,307.52-7.055,106.987,49.834,48.676c51.2-52.622,211.911-62.578,304.356-29.867  C376.945,112.676,330.012,232.142,229.034,313.209z"
                              data-original="#6DAFE0"
                              class="active-path"
                              data-old_color="#6DAFE0" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script>

export default {
  name: 'magaMenu',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    leftSideImage: {
      type: Boolean,
      default: false
    },
    megaMenuConference: {
      type: Boolean,
      default: false
    },
    menuLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menu: false,
      menuOver: false,
      listOver: false,
      categories: {
        davazdahomVaKonkur: true,
        yazdahom: false,
        dahom: false,
        nezameGhadim: false,
        chatrNejat: true,
        raheAbrisham: false,
        giftcard: false
      },
      conferenceCategories: {
      }
    }
  },
  watch: {
    'categories.davazdahomVaKonkur': function(val) {
      if (val) {
        this.categories.yazdahom = this.categories.dahom = this.categories.nezameGhadim = false
      }
    },
    'categories.yazdahom': function(val) {
      if (val) {
        this.categories.davazdahomVaKonkur = this.categories.dahom = this.categories.nezameGhadim = false
      }
    },
    'categories.dahom': function(val) {
      if (val) {
        this.categories.yazdahom = this.categories.davazdahomVaKonkur = this.categories.nezameGhadim = false
      }
    },
    'categories.nezameGhadim': function(val) {
      if (val) {
        this.categories.yazdahom = this.categories.dahom = this.categories.davazdahomVaKonkur = false
      }
    },
    'categories.chatrNejat': function (val) {
      if (val) {
        this.categories.raheAbrisham = this.categories.giftcard = false
      }
    },
    'categories.raheAbrisham': function (val) {
      if (val) {
        this.categories.chatrNejat = this.categories.giftcard = false
      }
    },
    'categories.giftcard': function (val) {
      if (val) {
        this.categories.chatrNejat = this.categories.raheAbrisham = false
      }
    }
  },
  methods: {
    isItemSelected(item) {
      return this.categories[item.category] || this.conferenceCategories[item.category]
    },
    subCategoryBackground(category) {
      if (category === 'davazdahomVaKonkur') {
        return '#ffd6e6'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  font-weight: bold;
  background-color: orange;
}
.list-title{
  font-weight: bold;
}
.magaMenu-svg-container{
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .megaMenu-svg-title{
    color: white;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    z-index: 1;
    text-align: center;
  }
  .megaMenu-svg{
    width: 100px;
    height: 100px;
    position: absolute;
  }
}
</style>

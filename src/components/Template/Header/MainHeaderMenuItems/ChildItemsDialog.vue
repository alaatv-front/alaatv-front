<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-3">
          <div class="outsidelabel">title</div>
          <q-input v-model="localItems[selectedIndex].children[selectedChildIndex].title" />
        </div>
        <div v-if="localItems[selectedIndex].children[selectedChildIndex].route"
             class="col-6">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <div class="outsidelabel">route name</div>
              <q-input v-model="localItems[selectedIndex].children[selectedChildIndex].route.name" />
            </div>
            <div v-if="localItems[selectedIndex].children[selectedChildIndex].route.query"
                 class="col-6">
              <div class="outsidelabel">tags</div>
              <q-input v-model="localItems[selectedIndex].children[selectedChildIndex].route.query['tags[]']" />
            </div>
          </div>
        </div>
        <div v-else-if="localItems[selectedIndex].children[selectedChildIndex].externalLink"
             class="col-3">
          <q-input v-model="localItems[selectedIndex].children[selectedChildIndex].externalLink" />
        </div>
        <div class="col-3">
          <div class="outsidelabel">badge</div>
          <q-input v-model="localItems[selectedIndex].children[selectedChildIndex].badge" />
        </div>
        <div v-if="localItems[selectedIndex].type === 'simpleMenu'"
             class="col-12">
          <q-expansion-item v-for="(item, index) in localItems[selectedIndex].children"
                            :key="index"
                            expand-separator>
            <template v-slot:header>
              <q-btn color="negative"
                     icon="close"
                     size="14px"
                     class="q-mr-sm"
                     @click="removeItemFromSimpleMenu(index)" />
              <q-input v-model="item.title"
                       class="full-width"
                       label="label" />
            </template>
            <q-card>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div v-for="(childItem, childIndex) in item.children"
                       :key="childIndex"
                       class="col-1">
                    <q-input v-model="childItem.title">
                      <q-btn icon="isax:trash"
                             flat
                             color="red"
                             size="sm"
                             @click="removeChildFromSimpleMenuItem(index, childIndex)" />
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-btn icon="add"
                           color="positive"
                           @click="addChildToSimpleMenuItem(index)" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-btn icon="add"
                 color="positive"
                 class="full-width"
                 @click="addItemToSimpleMenu" />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="sub-category-items">
        <div v-for="(item, index) in localItems[selectedIndex].subCategoryItemsCol"
             :key="index">
          <div>
            <div v-if="item.type === 'image' && index === selectedChildIndex">
              <div class="outsidelabel">photo</div>
              <q-input v-model="item.backgroundImage" />
              <div v-show="item.selected">
                <router-link v-if="item.route"
                             :to="item.route">
                  <q-responsive :ratio="1998/553">
                    <q-img :src="item.backgroundImage" />
                  </q-responsive>
                </router-link>
                <a v-else-if="item.externalLink"
                   :href="item.externalLink">
                  <q-responsive :ratio="1998/553">
                    <q-img :src="item.backgroundImage" />
                  </q-responsive>
                </a>
                <q-responsive v-else
                              :ratio="1998/553">
                  <q-img :src="item.backgroundImage" />
                </q-responsive>
              </div>
            </div>
            <div v-else-if="item.type === 'text' && index === selectedChildIndex">
              <div class="row q-mb-md justify-between">
                <div class="col-3">
                  <div class="outsidelabel">background color</div>
                  <q-input v-model="item.backgroundColor"
                           icon="colorize">
                    <template v-slot:append>
                      <q-icon name="colorize"
                              class="cursor-pointer">
                        <q-popup-proxy cover
                                       transition-show="scale"
                                       transition-hide="scale">
                          <q-color v-model="item.backgroundColor"
                                   label="backgroundColor"
                                   format-model="rgba" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-6">
                  <q-btn icon="add"
                         label="اضافه کردن ستون"
                         color="positive"
                         class="q-mt-md"
                         @click="addCol" />
                </div>
              </div>
              <div v-show="item.selected"
                   :style="{background: item.backgroundColor}">
                <div class="row">
                  <div v-for="(col, colIndex) in item.cols"
                       :key="colIndex"
                       class="col-md-4 text-subtitle1 q-mb-xs">
                    <q-list>
                      <q-input v-model="col.title.title"
                               class="q-ma-sm">
                        <q-btn icon="isax:trash"
                               flat
                               color="red"
                               size="sm"
                               @click="removeCol(colIndex)">
                          <q-tooltip>حذف تمام ستون</q-tooltip>
                        </q-btn>
                      </q-input>
                      <div v-for="(colItem, colItemIndex) in col.items"
                           :key="colItemIndex"
                           class="q-ma-sm">
                        <q-input v-model="colItem.title">
                          <q-btn icon="isax:trash"
                                 flat
                                 color="red"
                                 size="sm"
                                 @click="removeColItem(colIndex, colItemIndex)">
                            <q-tooltip>حذف آیتم</q-tooltip>
                          </q-btn>
                        </q-input>
                      </div>
                      <q-btn icon="add"
                             class="full-width bg-white"
                             @click="addSubCategoryItem(colIndex)" />
                    </q-list>
                  </div>
                </div>
                <div v-show="item.selected"
                     class="magaMenu-photo-container">
                  <q-img :src="item.photo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ChildItemsDialog',
  props: {
    items: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedIndex: {
      type: Number,
      default: null
    },
    selectedChildIndex: {
      type: Number,
      default: null
    }
  },
  computed: {
    localItems: {
      get() {
        return this.items
      },
      set(newValue) {
        this.$emit('update:items', newValue)
      }
    }
  },
  methods: {
    removeCol(colIndex) {
      this.localItems[this.selectedIndex].subCategoryItemsCol[this.selectedChildIndex].cols.splice(colIndex, 1)
    },
    removeColItem(colIndex, colItemIndex) {
      this.localItems[this.selectedIndex].subCategoryItemsCol[this.selectedChildIndex].cols[colIndex].items.splice(colItemIndex, 1)
    },
    addSubCategoryItem(colIndex) {
      this.localItems[this.selectedIndex].subCategoryItemsCol[this.selectedChildIndex].cols[colIndex].items.push({
        title: 'آیتم جدید',
        route: {
          path: '/',
          query: {
            'tags[]': []
          }
        }
      })
    },
    removeItemFromSimpleMenu(index) {
      debugger
      this.localItems[this.selectedIndex].children.splice(index, 1)
    },
    addItemToSimpleMenu() {
      this.localItems[this.selectedIndex].children.push({
        title: 'آیتم جدید',
        route: {
          path: '/',
          query: {
            'tags[]': []
          }
        },
        children: []
      })
    },
    addChildToSimpleMenuItem(index) {
      this.localItems[this.selectedIndex].children[index].children.push(
        {
          title: 'آیتم جدید',
          route: {
            path: '/',
            query: {
              'tags[]': []
            }
          }
        })
    },
    removeChildFromSimpleMenuItem(index, childIndex) {
      this.localItems[this.selectedIndex].children[index].children.splice(childIndex, 1)
    }
  }
}
</script>

<style scoped>

</style>

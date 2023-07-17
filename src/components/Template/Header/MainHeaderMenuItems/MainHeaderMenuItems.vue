<template>
  <q-list class="MainHeaderMenuItems">
    <div v-for="(item , index) in items"
         :key="index"
         class="tabs-list-container">
      <div v-if="showMenuItem(/* item */)"
           class="self-center">
        <item-menu v-if="item.type === 'itemMenu'"
                   :data="item"
                   :index="index"
                   :editable="pageBuilderEditable"
                   @open-dialog="openDialog" />
        <mega-menu v-if="item.type === 'megaMenu'"
                   :data="item"
                   :index="index"
                   :editable="pageBuilderEditable"
                   @add-children="addChildToMegaMenu(index)"
                   @open-dialog="openDialog" />
        <simple-menu v-if="item.type === 'simpleMenu'"
                     :data="item"
                     :index="index"
                     :editable="pageBuilderEditable"
                     @add-children="addChildToSimpleMenu(index)"
                     @open-dialog="openDialog" />
      </div>
    </div>
    <q-btn v-if="pageBuilderEditable"
           icon="add"
           flat
           size="10px"
           class="edit-btn"
           @click="addItem" />
  </q-list>
  <q-dialog v-model="optionDialog"
            full-width>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-3">
            <div class="outsidelabel">menu type</div>
            <q-select v-model="items[selectedIndex].type"
                      :options=menuTypeOptions />
          </div>
          <div class="col-3">
            <div class="outsidelabel">title</div>
            <q-input v-model="items[selectedIndex].title" />
          </div>
          <div v-if="itemHasRoute"
               class="col-3">
            <div class="outsidelable">route</div>
            <q-input v-if="items[selectedIndex].route.name"
                     v-model="items[selectedIndex].route.name" />
            <q-input v-else-if="items[selectedIndex].route.path"
                     v-model="items[selectedIndex].route.path" />
          </div>
          <div v-if="itemHasRoute"
               class="col-3">
            <div v-if="items[selectedIndex].route.query"
                 class="outsidelable">tags</div>
            <q-input v-if="items[selectedIndex].route.query"
                     v-model="items[selectedIndex].route.query['tags[]']" />
          </div>
          <div class="col-3 q-mt-lg">
            <q-checkbox v-model="items[selectedIndex].mobileMode"
                        right-label
                        label="show in mobile menu" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="childItemOption"
            full-width>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-3">
            <div class="outsidelabel">title</div>
            <q-input v-model="items[selectedIndex].children[selectedChildIndex].title" />
          </div>
          <div v-if="items[selectedIndex].children[selectedChildIndex].route"
               class="col-6">
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div class="outsidelabel">route name</div>
                <q-input v-model="items[selectedIndex].children[selectedChildIndex].route.name" />
              </div>
              <div v-if="items[selectedIndex].children[selectedChildIndex].route.query"
                   class="col-6">
                <div class="outsidelabel">tags</div>
                <q-input v-model="items[selectedIndex].children[selectedChildIndex].route.query['tags[]']" />
              </div>
            </div>
          </div>
          <div v-else-if="items[selectedIndex].children[selectedChildIndex].externalLink"
               class="col-3">
            <q-input v-model="items[selectedIndex].children[selectedChildIndex].externalLink" />
          </div>
          <div class="col-3">
            <div class="outsidelabel">badge</div>
            <q-input v-model="items[selectedIndex].children[selectedChildIndex].badge" />
          </div>
          <div v-if="items[selectedIndex].type === 'simpleMenu'"
               class="col-12">
            <q-expansion-item v-for="(item, index) in items[selectedIndex].children"
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
          <div v-for="(item, index) in items[selectedIndex].subCategoryItemsCol"
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
                    <q-input v-model="item.backgroundColor" />
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
  </q-dialog>
</template>

<script>
import menuItems from 'src/components/Template/menuData.js'
import itemMenu from 'components/Template/Header/MainHeaderMenuItems/itemMenu.vue'
import megaMenu from 'components/Template/Header/MainHeaderMenuItems/magaMenu.vue'
import simpleMenu from 'components/Template/Header/MainHeaderMenuItems/simpleMenu.vue'

export default {
  name: 'MainHeaderMenuItems',
  components: {
    megaMenu,
    simpleMenu,
    itemMenu
  },
  data() {
    return {
      selectedIndex: null,
      selectedChildIndex: null,
      optionDialog: false,
      childItemOption: false,
      mounted: false,
      conferenceMenu: false,
      showHamburgerConfig: true,
      searchInput: '',
      isAdmin: false,
      items: menuItems,
      menuTypeOptions: ['itemMenu', 'megaMenu', 'simpleMenu']
    }
  },
  computed: {
    itemHasRoute() {
      return this.items[this.selectedIndex].route
    },
    pageBuilderEditable () {
      return this.$store.getters['PageBuilder/pageBuilderEditable']
    },
    showMenuItem () {
      return (/* item */) => {
        return true
        // return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    }
  },
  methods: {
    openDialog({ index, childrenIndex }) {
      this.selectedIndex = index
      if (childrenIndex) {
        this.childItemOption = true
        this.selectedChildIndex = childrenIndex
      } else {
        this.optionDialog = true
      }
    },
    addItem (event) {
      event.preventDefault()
      event.stopPropagation()
      this.items.push({
        title: 'آیتم جدید',
        type: 'itemMenu',
        route: {
          path: '/',
          query: {
            'tags[]': []
          }
        },
        children: [{
          title: 'آیتم جدید',
          route: {
            path: '/',
            query: {
              'tags[]': []
            }
          }
        }],
        subCategoryItemsCol: [{
          cols: [
            {
              title: {
                title: 'آیتم جدید',
                route: {
                  path: '/',
                  query: {
                    'tags[]': []
                  }
                }
              },
              items: [{
                title: 'شیمی',
                route: {
                  path: '/',
                  query: {
                    'tags[]': []
                  }
                }
              }]
            }
          ],
          photo: '',
          backgroundColor: '#ffd6e6',
          backgroundImage: '',
          externalLink: '',
          route: {
            path: '/',
            query: {
              'tags[]': []
            }
          },
          type: 'text'
        }],
        mobileMode: true
      })
    },
    removeCol(colIndex) {
      this.items[this.selectedIndex].subCategoryItemsCol[this.selectedChildIndex].cols.splice(colIndex, 1)
    },
    removeColItem(colIndex, colItemIndex) {
      this.items[this.selectedIndex].subCategoryItemsCol[this.selectedChildIndex].cols[colIndex].items.splice(colItemIndex, 1)
    },
    addCol() {
      this.items[this.selectedIndex].subCategoryItemsCol[this.selectedChildIndex].cols.push({
        title: {
          title: 'آیتم جدید',
          route: {
            path: '/',
            query: {
              'tags[]': []
            }
          }
        },
        items: [{
          title: 'آیتم جدید',
          route: {
            path: '/',
            query: {
              'tags[]': []
            }
          }
        }]
      })
    },
    addSubCategoryItem(colIndex) {
      this.items[this.selectedIndex].subCategoryItemsCol[this.selectedChildIndex].cols[colIndex].items.push({
        title: 'آیتم جدید',
        route: {
          path: '/',
          query: {
            'tags[]': []
          }
        }
      })
    },
    addChildToMegaMenu(index) {
      this.items[index].children.push({
        title: 'آیتم جدید',
        route: {
          path: '/',
          query: {
            'tags[]': []
          }
        },
        badge: ''
      })
      this.items[index].subCategoryItemsCol.push({
        cols: [],
        photo: '',
        backgroundColor: '#ffd6e6',
        backgroundImage: '',
        externalLink: '',
        route: {
          path: '/',
          query: {
            'tags[]': []
          }
        },
        type: 'text'
      })
    },
    addChildToSimpleMenu(index) {
      this.items[index].children.push({
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
      this.items[this.selectedIndex].children.splice(index, 1)
    },
    addItemToSimpleMenu() {
      this.items[this.selectedIndex].children.push({
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
      this.items[this.selectedIndex].children[index].children.push(
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
      this.items[this.selectedIndex].children[index].children.splice(childIndex, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.MainHeaderMenuItems {
  height: 72px;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  overflow: auto;
  .tabs-list-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

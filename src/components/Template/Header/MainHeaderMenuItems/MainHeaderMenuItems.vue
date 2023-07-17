<template>
  <q-list class="MainHeaderMenuItems">
    <div v-for="(item , index) in menuItems"
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
    <div class="bg-white">
      <q-btn color="primary"
             icon="close"
             class="q-ma-md"
             @click="optionDialog = false" />
      <item-dialog v-model:items="items"
                   v-model:selectedIndex="selectedIndex"
                   v-model:selectedChildIndex="selectedChildIndex" />
    </div>
  </q-dialog>
  <q-dialog v-model="childItemOption"
            full-width>
    <div class="bg-white">
      <q-btn icon="close"
             color="primary"
             class="q-ma-md"
             @click="childItemOption = false" />
      <child-items-dialog v-model:items="items"
                          v-model:selectedIndex="selectedIndex"
                          v-model:selectedChildIndex="selectedChildIndex" />
    </div>
  </q-dialog>
</template>

<script>
import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'
// import menuItems from 'src/components/Template/menuData.js'
import childItemsDialog from 'components/Template/Header/MainHeaderMenuItems/ChildItemsDialog.vue'
import itemDialog from 'components/Template/Header/MainHeaderMenuItems/itemDialog.vue'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import itemMenu from 'src/components/Template/Header/MainHeaderMenuItems/itemMenu.vue'
import megaMenu from 'src/components/Template/Header/MainHeaderMenuItems/magaMenu.vue'
import simpleMenu from 'src/components/Template/Header/MainHeaderMenuItems/simpleMenu.vue'

export default {
  name: 'MainHeaderMenuItems',
  components: {
    megaMenu,
    simpleMenu,
    itemMenu,
    childItemsDialog,
    itemDialog
  },
  mixins: [mixinPrefetchServerData],
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
      user: new User(),
      isAdmin: false,
      isUserLogin: false,
      items: [],
      menuTypeOptions: ['itemMenu', 'megaMenu', 'simpleMenu']
    }
  },
  computed: {
    menuItems: {
      get() {
        return this.$store.getters['PageBuilder/menuItems']
      },
      set(newInfo) {
        return this.$store.commit('PageBuilder/updateMenuItems', newInfo)
      }
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
  mounted () {
    this.checkMenurItemsForAuthenticatedUser()
    this.items = this.menuItems
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getPageConfigRequest()
    },
    prefetchServerDataPromiseThen (menuItems) {
      this.menuItems = menuItems
      this.items = this.menuItems
    },
    prefetchServerDataPromiseCatch () {
    },
    getPageConfigRequest() {
      const key = '(menuItems)headerLayout:mainLayout'
      return APIGateway.pageSetting.getMenuItems(key)
    },
    openDialog({ index, childrenIndex }) {
      this.selectedIndex = index
      if (childrenIndex) {
        this.childItemOption = true
        this.selectedChildIndex = childrenIndex
      } else {
        this.optionDialog = true
      }
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    checkMenurItemsForAuthenticatedUser () {
      // ToDo: check menu items by user role
      if (this.isAdmin) {
        const hasAdminPanel = this.items.find((item) => item.routeName === 'Admin.UploadCenter.Contents')
        if (!hasAdminPanel) {
          this.items.push({
            selected: 'adminPanel',
            title: 'پنل ادمین',
            routeName: 'Admin.UploadCenter.Contents',
            type: 'itemMenu',
            permission: 'all',
            show: false
          })
        }
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
                title: 'آیتم جدید',
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

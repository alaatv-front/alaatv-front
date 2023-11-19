<template>
  <q-list class="MainHeaderMenuItems">
    <div v-for="(item , index) in menuItems"
         :key="index"
         class="tabs-list-container">
      <div class="self-center">
        <item-menu v-if="item.type === 'itemMenu' && canShowInTopMenu(item)"
                   v-model:data="menuItems[index]"
                   :index="index"
                   :editable="pageBuilderEditable"
                   @update:data="onUpdateData" />
        <mega-menu v-if="item.type === 'megaMenu' && canShowInTopMenu(item)"
                   v-model:data="menuItems[index]"
                   :index="index"
                   :editable="pageBuilderEditable"
                   @update:data="onUpdateData" />
        <simple-menu v-if="item.type === 'simpleMenu' && canShowInTopMenu(item)"
                     v-model:data="menuItems[index]"
                     :index="index"
                     :editable="pageBuilderEditable"
                     @update:data="onUpdateData" />
      </div>
    </div>
    <q-btn v-if="pageBuilderEditable"
           icon="add"
           flat
           size="10px"
           class="edit-btn"
           @click="addItem" />
  </q-list>
</template>

<script>
import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'
// import menuItems from 'src/components/Template/menuData.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import itemMenu from 'src/components/Template/Header/MainHeaderMenuItems/itemMenu.vue'
import megaMenu from 'src/components/Template/Header/MainHeaderMenuItems/magaMenu.vue'
import simpleMenu from 'src/components/Template/Header/MainHeaderMenuItems/simpleMenu.vue'

export default {
  name: 'MainHeaderMenuItems',
  components: {
    megaMenu,
    itemMenu,
    simpleMenu
  },
  mixins: [mixinPrefetchServerData],
  data() {
    return {
      mounted: false,
      user: new User(),
      isAdmin: false,
      isUserLogin: false
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
    this.loadAuthData()
    this.checkMenurItemsForAuthenticatedUser()
    // this.menuItems = menuItems
  },
  methods: {
    canShowInTopMenu (item) {
      return (typeof item.desktopMode === 'undefined' || item.desktopMode === true || this.pageBuilderEditable)
    },
    prefetchServerDataPromise () {
      return this.getPageConfigRequest()
    },
    prefetchServerDataPromiseThen (menuItems) {
      this.menuItems = menuItems
    },
    prefetchServerDataPromiseCatch () {
    },
    getPageConfigRequest() {
      const key = '(menuItems)headerLayout:mainLayout'
      return APIGateway.pageSetting.getMenuItems(key)
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    checkMenurItemsForAuthenticatedUser () {
      // ToDo: check menu items by user role
      if (this.isAdmin) {
        const hasAdminPanel = this.menuItems.find((item) => item.routeName === 'Admin.UploadCenter.Contents')
        if (!hasAdminPanel) {
          this.menuItems.push({
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
      this.menuItems.push({
        title: 'آیتم جدید',
        type: 'itemMenu',
        route: {
          path: '/',
          query: {
            'tags[]': []
          }
        },
        mobileMode: true
      })
    },
    onUpdateData () {
      const deleteChildren = (list) => {
        list.forEach((subItem, subItemIndex) => {
          if (subItem.deleted) {
            list.splice(subItemIndex, 1)
          } else {
            if (subItem.children) {
              deleteChildren(list[subItemIndex].children)
            }
          }
        })
      }

      deleteChildren(this.menuItems)
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

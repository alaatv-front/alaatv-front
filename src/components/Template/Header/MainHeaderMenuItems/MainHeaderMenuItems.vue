<template>
  <q-list class="MainHeaderMenuItems">
    <div v-for="(item , index) in items"
         :key="index"
         class="tabs-list-container">
      <div v-if="showMenuItem(/* item */)"
           class="self-center">
        <item-menu v-if="item.type === 'itemMenu'"
                   :data="item"
                   :editable="pageBuilderEditable" />
        <mega-menu v-if="item.type === 'megaMenu'"
                   :data="item"
                   :editable="pageBuilderEditable" />
        <simple-menu v-if="item.type === 'simpleMenu'"
                     :data="item"
                     :editable="pageBuilderEditable" />
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
import menuItems from 'src/components/Template/menuData.js'
import itemMenu from 'src/components/Template/Header/itemMenu.vue'
import megaMenu from 'src/components/Template/Header/magaMenu.vue'
import simpleMenu from 'src/components/Template/Header/simpleMenu.vue'

export default {
  name: 'MainHeaderMenuItems',
  components: {
    megaMenu,
    simpleMenu,
    itemMenu
  },
  data() {
    return {
      mounted: false,
      conferenceMenu: false,
      showHamburgerConfig: true,
      searchInput: '',
      user: new User(),
      isAdmin: false,
      isUserLogin: false,
      items: menuItems
    }
  },
  computed: {
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
  },
  methods: {
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

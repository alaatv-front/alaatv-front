<template>
  <div class="side-menu-main-layout">
    <router-link class="side-logo"
                 :to="{name: 'Public.Home'}">
      <lazy-img src="https://nodes.alaatv.com/upload/alaa-footer-desc.png"
                width="180"
                height="52"
                class="logo-image" />
    </router-link>
    <q-list class="side-menu-list"
            padding>
      <template v-if="false">
        <q-input v-model="searchText"
                 dense
                 filled
                 class="gray-input search-input"
                 placeholder="جست و جو"
                 @update:model-value ="search(menuItems)">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <side-menu-items :menu-items="menuItems" />
      <q-item v-if="isUserLogin"
              v-ripple
              clickable
              class="log-out"
              @click="logOut">
        <q-item-section>
          خروج
        </q-item-section>
        <q-item-section avatar>
          <q-icon name="ph:sign-out" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import SideMenuItems from 'src/components/Template/SideBard/SideMenuItems.vue'

export default {
  name: 'MainSideBarTemplate',
  components: {
    LazyImg,
    SideMenuItems
  },
  mixins: [mixinPrefetchServerData],
  data () {
    return {
      user: new User(),
      isAdmin: false,
      isUserLogin: false,
      searchText: ''
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
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.loadAuthData()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
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
    handleResize() {
      const windowWidth = window.innerWidth
      this.menuItems.forEach(item => {
        if (item.mobileMode) {
          item.show = windowWidth < 1024
        }
      })
    },
    // updateMenuItems () {
    //   if (!this.isUserLogin) {
    //     this.titlesList.splice(0, 1)
    //   }
    // },
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-main-layout {
  height: 100%;
  display: flex;
  overflow-y: auto;
  background: white;
  flex-direction: column;
  .side-logo {
    padding: 16px 48px;
    display: block;
    :deep(.logo-image) {
      width: 100%;
    }
  }

  .side-menu-list {
    padding: 0;
  }
}
</style>

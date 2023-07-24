<template>
  <div class="drawer-inside">
    <div class="side-menu-main-layout">
      <div class="side-logo">
        <router-link :to="{name: 'Public.Home'}">
          <div class="logo-image" />
        </router-link>
      </div>
      <div class="side-menu-body">
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
          <!--          <menu-item :items="menuItems"-->
          <!--                     :menu-items-color="'#5867dd'" />-->
          <!--          <menu-item :items="menuItemsExtra"-->
          <!--                     :menu-items-color="'#5867dd'" />-->
        </q-list>
        <div v-if="isUserLogin"
             class="log-out"
             @click="logOut">
          <span>
            <q-avatar icon="isax:logout"
                      size="30"
                      dir="rtl" />
          </span>
          <span class="logout-text">خروج </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import SideMenuItems from 'src/components/Template/SideBard/SideMenuItems.vue'

export default {
  name: 'MainSideBarTemplate',
  components: {
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
.drawer-inside {
  background: white;
  height: 100%;
}
.side-menu-main-layout {
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .side-logo {
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 25px;
    cursor: pointer;
    .alaa-logo {
      width: 50px;
      //&:deep(.q-img__image ){
      //  width:50%;
      //  height:50%;
      //}
    }
    .logo-image {
      text-align: left;
      .q-img__container {
      }
    }
  }

  .side-menu-body {
    display: grid;
    grid-template-rows: auto;
    .q-list {
      padding: 0;
      &.side-menu-list {
        .search-input {
          margin-bottom: 30px;
        }
        margin: 0 24px 109px 24px;
        @media screen and (max-width: 1919px) {
          margin: 0 24px 34px 24px;
        }
        @media screen and (max-width: 1439px) {
          margin: 0 21px 26px 21px;
        }
        @media screen and (max-width: 599px) {
          margin: 0 18px 8px 18px;
        }

        .top-separator {
          margin: 0 40px 32px 40px;
          @media screen and (max-width: 1919px) {
            margin: 0 30px 25px 30px;
          }
          @media screen and (max-width: 1439px) {
            margin: 0 45px 22px 45px;
          }
        }

        .q-item {
          padding: 0;
          min-height: 0;
        }
      }
    }
    .log-out {
      align-self: end;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      height: 40px !important;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      padding: 0 14px 0 10px;
      margin: 0 0 36px 27px;
      @media screen and (max-width: 1439px) {
        margin: 0 31px 33px 31px;
      }
      @media screen and (max-width: 599px) {
        margin: 0 30px 30px 30px;
        //padding: 0 0 0 10px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .q-avatar {
        height: 22px;
        width: 22px;
        margin-right: 12px;
        transform: matrix(-1, 0, 0, 1, 0, 0);
      }
    }
  }
  .log-out {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    height: 40px !important;
    //width: 232px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0 14px 0 10px;
    margin: 0 0 36px 27px;
    @media screen and (max-width: 1439px) {
      margin: 0 31px 33px 31px;
    }
    @media screen and (max-width: 599px) {
      margin: 0 30px 30px 30px;
      //padding: 0 0 0 10px;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .q-avatar {
      height: 22px;
      width: 22px;
      margin-right: 12px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
  }
  &:deep(.side-menu-main-layout) {
    .q-expansion-item__container {
      .q-item {
        display: flex;
        padding: 0 10px !important;
      }
      .q-icon {
        font-size: 21px;
      }
    }
  }
}
</style>

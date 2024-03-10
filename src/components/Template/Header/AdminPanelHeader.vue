<template>
  <div class="header-section">
    <div class="right-section">
      <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
      <div class="logo-section">
        <div class="drawer-btn hamburger">
          <q-btn v-if="showHamburger"
                 class="toolbar-button q-mr-md"
                 icon="ph:list"
                 flat
                 square
                 color="grey"
                 @click="toggleLeftDrawer" />
        </div>
        <div class="logo-pic">
          <div class="homepage">
            <lazy-img src="https://nodes.alaatv.com/upload/alaa-logo.png"
                      :alt="'logo'"
                      width="40"
                      height="40"
                      class="logo-pic-img"
                      @click="routeTo('Public.Home')" />
          </div>
        </div>
      </div>
      <!--        -----------------------------------------------------Tabs Section--------------------------------------------   -->
      <div class="tab-section">
        <q-list class="flex tabs-list">
          <div v-for="(item , index) in headerItems"
               :key="index"
               class="tabs-list-container">
            <div v-if="showMenuItem(/* item */)"
                 class="self-center">
              <q-item v-ripple
                      clickable
                      :active="isRouteSelected(item.routeName)"
                      active-class="active-item"
                      :to="{ name: item.routeName }">
                <q-item-section class="tab-title">
                  {{ item.title }}
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
      </div>
    </div>
    <div class="left-section">
      <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
      <div class="user-action">
        <q-btn flat
               icon="ph:sign-out"
               label="خروج"
               :to="{name:'Public.Home'}" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'AdminPanelHeader',
  components: { LazyImg },
  data () {
    return {
      searchInput: '',
      user: new User(),
      isUserLogin: false,
      headerItems: [],
      profileTitlesList: [
        {
          title: 'پروفایل',
          icon: 'isax:user',
          routeName: 'UserPanel.Profile',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'فیلم ها و جزوه های من',
          icon: 'isax:task-square',
          routeName: 'UserPanel.MyPurchases',
          params: null,
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'علاقه مندی های من',
          icon: 'isax:heart',
          routeName: 'UserPanel.MyFavorites',
          params: null,
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'سفارش‌ ها',
          icon: 'isax:clipboard-text',
          routeName: 'UserPanel.MyOrders',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'کار آفرینی',
          icon: 'isax:clipboard-text',
          routeName: 'UserPanel.Asset.GiftCard.Dashboard',
          permission: 'all',
          active: false,
          children: []
        }
      ]
    }
  },
  computed: {
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    computedUserId () {
      const user = this.$store.getters['Auth/user']
      if (!user) {
        return null
      }

      return user.id
    },
    layoutLeftDrawerVisible () {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    },
    showMenuItem () {
      return (/* item */) => {
        return true
        // return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    },
    isRouteSelected () {
      return (itemName) => {
        return (this.$route.name === itemName)
      }
    }
  },
  watch: {
    computedUserId () {
      this.loadAuthData()
    }
  },
  mounted () {
    this.loadAuthData()
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      this.$bus.on('onLoggedIn', () => {
        this.loadAuthData()
      })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    ...mapMutations('AppLayout', [
      'updateVisibilityBreadcrumb',
      'updateBreadcrumbs',
      'updateBreadcrumbLoading',
      'updateLayoutLeftDrawerVisible'
    ]),
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    hasRoute (route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    goToLogin () {
      this.$router.push({ name: 'login' })
    },
    routeTo (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-section {
  display: flex;
  padding: 0 $space-3;
  justify-content: space-between;
  background: $grey-1;
  .right-section {
    display: flex;
    justify-content: flex-start;
    .logo-section {
      align-items: center;
      display: flex;
      justify-content: space-between;

      @media screen and (width <= 1023px) {
        justify-self: start;
      }

      @media screen and (width <= 599px) {
        justify-self: center;
        justify-content: space-between;
        width: 100%;
      }

      .logo-pic {
        cursor: pointer;
        display: flex;
        height: 72px;
        align-items: center;

        @media screen and (width <= 1023px) {
          height: 64px;
        }

        :deep(.homepage) {
          .logo-pic-img {
            height: 40px;
            width: 40px;

            @media screen and (width <= 1023px) {
              height: 48px;
              width: 48px;
            }
          }
        }

        //img {
        //
        //}
      }

      .hamburger {
        //display: none;
        @media screen and (width <= 1023px) {
          //display: block;
          margin-right: 20px;
          margin-left: -8px;
        }

        @media screen and (width <= 599px) {
          margin-left: 0;
        }
      }

      .drawer-btn {
        :deep(.q-btn) {
          flex-direction: row !important;
        }
      }
    }
    .tab-section {
      height: 72px;
      margin-left: 24px;

      .tabs-list {
        height: 72px;

        .tab-title {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
        }

        .tabs-list-container{
          display: grid;
        }
      }

      @media screen and (width <= 1023px) {
        height: 64px;
        display: none;
      }
    }
    .active-item {
      color: #FFC107;
    }
  }
  .left-section {
    .user-action {
      .action-container {
        display: flex;
        height: 42px;

        .search-section {
          height: 40px;

          .search-input {
            width: 317px;
            height: 40px;
            background: #F1F3F4;
            border-radius: 10px;

            &:deep(.q-field__append) {
              padding-right: 8px !important;

              .q-icon {
                color: #6D708B;
                cursor: pointer;
              }
            }

            &:deep(.q-field__control) {
              background: #F1F3F4;
              height: 40px;
            }

            &:deep(.q-field__marginal) {
              height: auto;
              padding: 0;
            }

            .search {
              color: #6D708B;
              height: 40px;
              width: 40px;

              :deep(.q-field__inner .q-field__control .q-field__append .q-icon) {
                color: #6D708B;
              }

              :deep(.q-btn__content) {
                margin: 0;
              }
            }
          }

          @media screen and (width <= 780px) {
            display: none;
          }
        }

        &:deep(.q-card__section) {
          padding: 0;
          margin-right: 18px;

          .q-field--filled .q-field__inner .q-field__control {
            background: #F1F3F4;
          }

          .q-field--filled .q-field__inner .q-field__control .q-field__append, .q-field--filled .q-field__inner .q-field__control .q-field__prepend {
            padding-right: 16px;
            padding-left: 12px;
            height: 40px;
          }

          .q-field__inner {
            border-radius: 0;

            .q-field__control {
              color: transparent;
              min-height: 0;
              padding: 0;

              &::before {
                border-color: transparent;
              }

              &:hover::before {
                border-color: transparent;
              }
            }
          }
        }
      }

      .sign-up-btn {
        :deep(.q-btn .q-btn__content) {
          margin-left: 10px;
          margin-right: 10px;
        }
      }

      @media screen and (width <= 1023px) {
        justify-self: end;
        height: 64px;
      }

      @media screen and (width <= 599px) {
        display: none;
      }

      display: flex;

      //justify-content: flex-end;
      align-items: center;
      height: 72px;
      justify-self: end;

      .btn-user-profile {
        margin-left: 18px;
        width: 48px;
        height: 48px;
        border-radius: 16px;

        :deep(.q-btn__content) {
          margin: 0;

          .user-photo {
            img {
              border: 2px solid #FFB74D;
              border-radius: 16px;
              max-width: 100%;
              width: 100%;
            }
          }
        }
      }

      .action-btn {
        color: #333;

        .action-btn-title {
          padding-right: 7px;
        }
      }

      .fit-profile-img {
        width: 48px;
        height: 48px;
        border-radius: 16px;
      }
    }
  }
}
</style>

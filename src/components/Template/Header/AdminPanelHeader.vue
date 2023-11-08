<template>
  <div class="app-bar-container">
    <div class="app-bar">
      <div class="header-section">
        <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
        <div class="logo-section">
          <div class="drawer-btn hamburger">
            <q-btn v-if="showHamburger"
                   class="toolbar-button q-btn-sm"
                   icon="ph:list"
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
        <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
        <div class="user-action">
          <q-btn unelevated
                 :to="{name:'Public.Home'}">
            <span class="action-btn-title">خروج از پنل ادمین</span>
            <q-icon name="isax:arrow-left" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { User } from 'src/models/User'
import { mapMutations } from 'vuex'
export default {
  name: 'AdminPanelHeader',
  components: { LazyImg },
  data() {
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
    layoutLeftDrawerVisible() {
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
    checkAuth() {
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
    logOut() {
      return this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer() {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    hasRoute(route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    goToLogin() {
      this.$router.push({ name: 'login' })
    },
    routeTo(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-container {
  background-color: #fff;
  height: 72px;
  width: 100%;
  color: #333333;
  @media screen and (max-width: 1023px) {
    height: 64px;
  }
  @media screen and (max-width: 599px) {
    background-color: #F4F6F9;
  }
  .app-bar {
    max-width: 1360px;
    //min-width: 1360px;
    margin: auto;
    height: 72px;
    @media screen and (max-width: 1919px) {
      width: 100%;
      //padding-left: 40px;
      //padding-right: 40px;
    }
    @media screen and (max-width: 1439px) {
      padding-left: 35px;
      padding-right: 35px;
    }
    @media screen and (max-width: 1023px) {
      padding-left: 30px;
      padding-right: 30px;
      height: 64px;
    }
    @media screen and (max-width: 599px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    .header-section {
      display: grid;
      grid-template-columns: 86px auto 156px;
      height: 100%;
      @media screen and (max-width: 1023px) {
        grid-template-columns: auto auto;
      }
      @media screen and (max-width: 599px) {
        grid-template-columns: 1fr;
      }
      .logo-section {
        align-items: center;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 1023px) {
          justify-self: start;
        }
        @media screen and (max-width: 599px) {
          justify-self: center;
          justify-content: space-between;
          width: 100%;
        }
        .logo-pic {
          cursor: pointer;
          display: flex;
          height: 72px;
          align-items: center;
          @media screen and (max-width: 1023px) {
            height: 64px;
          }
          :deep(.homepage) {
            .logo-pic-img {
              height: 40px;
              width: 40px;
              @media screen and (max-width: 1023px) {
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
          @media screen and (max-width: 1023px) {
            //display: block;
            margin-right: 20px;
            margin-left: -8px;
          }
          @media screen and (max-width: 599px) {
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
        @media screen and (max-width: 1023px) {
          height: 64px;
          display: none;
        }
      }
      .active-item {
        color: #FFC107;
      }
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
            @media screen and (max-width: 780px) {
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
                &:before {
                  border-color: transparent;
                }
                &:hover:before {
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
        @media screen and (max-width: 1023px) {
          justify-self: end;
          height: 64px;
        }
        @media screen and (max-width: 599px) {
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
  .sub-mit-box{
    background: #FFFFFF;
    border-radius: 16px;
    display: flex;
    margin-bottom: 0;
    padding: 0;

    .btn-style{
      width: 96px;
      //color: #6D708B;
      color: #333333 !important;

      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      align-items: center;
      text-align: center;
      letter-spacing: -0.03em;
    }
    .sign-up {
      background: #FFC107;
    }
  }
}
</style>

<style lang="scss">
.user-profile-dropdown {
  width: 280px;
  //height: 300px;
  background: #FFFFFF;
  border: 1px solid #F2F5F9;
  border-radius: 0 16px 16px 16px #{"/* rtl:ignore */"};
  .header {
    box-shadow: 0 6px 10px rgba(49, 46, 87, 0.04) #{"/* rtl:ignore */"};
    border-radius: 0 15px 0 0 #{"/* rtl:ignore */"};
  }
  .profile-box {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #6D708B;
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 16px;
    .profile-detail {
      display: grid;
      grid-template-columns: 70px auto;
      align-items: center;
      .profile-photo-box {
        //background: #FFB74D;

        width: 60px;
        height: 60px;
        border: 3px solid #FFFFFF;
        border-radius: 16px;
        position: relative;
        .profile-photo-img {
          .q-img {
            border-radius: 16px;
            height: 100%;
          }
          width: 60px;
          height: 60px;
          border-radius: 16px;
          .user-photo {
            img {
              border: 2px solid #FFB74D;
              border-radius: 16px;
              max-width: 100%;
              width: 100%;
            }
          }
        }
        .profile-photo-badge {
          position: absolute;
          bottom: -15px;
          left: -7px;
        }
      }
      .profile-detail-info {
        .info-name {
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          color: #434765;
        }
        .info-phoneNumber {}
      }
    }
  }
  .user-panel-base-menu {
    display: flex;
    flex-direction: column;
    color: #6D708B;

    .q-list {
      color: #6D708B;
      padding: 0;

      &.side-menu-list {
        .top-separator {
          margin: 0 40px 32px 40px;
        }

        .q-item {
          padding: 0;
          min-height: 0;

          &.item-list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            cursor: pointer;
            padding: 0 14px 0 10px;
            border-radius: 14px;
            &.alone-item {
              height: 40px;

              &.active-route-side-mode {
                .indicator {
                  height: 8px;
                  width: 8px;
                  background-color: white;
                  border-radius: 50%;
                  margin: auto;
                }
              }
            }
            &.alone-item-mode-drawer {
              &.active-route-side-mode {
                .indicator {
                  background-color: #6D708B6B !important;
                }
              }
            }

            .section-title {
              height: 30px;
              display: flex;
              flex-direction: row;
              align-items: center;

              .title-icon {
                margin-right: 12px;
              }

              .q-item__section--side {
                padding: 0;
              }
            }

            .list-section {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;

              .q-avatar {
                height: 22px;
                width: 22px;
              }
            }
          }
        }

        .side-expansion-list {
          &.top-expansion {
            margin-bottom: 10px;
          }

          .expansion-body {
            display: flex;
            margin-left: 8px;
          }

          .q-expansion-item__content {
            .vertical-separator {
              margin: 6px 9px 9px 9px;
            }
          }

          .q-list {
            &.list-expansion {
              margin-bottom: 0;

              .item-list-expansion {
                height: 30px;
                margin: 5px;

                .item-list-expansion-title {
                  justify-content: start;
                }
              }

              .top-expansion-separator {
              }

              .list-child-item {
                height: 30px;
                justify-content: right;
                margin-bottom: 8px;
                width: 157px;
                border-radius: 10px;
                padding: 0 14px;

                &:last-child {
                  margin-bottom: 0;
                }

                .list-child-section {
                  font-size: 14px !important;
                  justify-content: center;
                }
              }
            }
          }
        }

        .active-route-side-mode {

          background-color: #8075DC;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
          }
        }
        .item-mode-drawer {
          background: #F6F9FF;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
            background-color: #6D708B6B ;
          }
        }

      }

      .q-item__section--avatar {
        min-width: 0 !important;
      }

      a {
        text-decoration: none;
        padding: 0;
      }
    }

    &.list-side-mode {
      color: white;
      .q-list {
        a {
          color: white;
        }
      }
    }

    &.list-drawer-mode {
      color: #6D708B;
      .q-list {
        a {
          color: #6D708B;
        }
      }
    }

    .log-out {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      height: 40px !important;
      padding: 0 6px;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      //@media screen and (max-width: 1439px) {
      //  margin: 0 31px 33px 31px;
      //}
      //@media screen and (max-width: 599px) {
      //  margin: 0 30px 30px 30px;
      //  //padding: 0 0 0 10px;
      //}

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
  .body {
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>

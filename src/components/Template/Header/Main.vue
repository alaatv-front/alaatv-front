<template>
  <div class="app-bar-container">
    <div class="app-bar">
      <div class="header-section">
        <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
        <div class="logo-section">
          <q-btn v-if="showHamburger"
                 class="toolbar-button lt-md"
                 icon="ph:list"
                 color="grey"
                 flat
                 square
                 @click="toggleLeftDrawer" />
          <div class="logo-pic">
            <div class="homepage">
              <lazy-img src="https://nodes.alaatv.com/upload/alaa-logo.png"
                        :alt="'logo'"
                        width="40"
                        height="40"
                        class="logo-pic-img gt-sm"
                        @click="routeTo('Public.Home')" />
              <lazy-img src="https://nodes.alaatv.com/upload/mobile-header-logo.png"
                        :alt="'logo'"
                        width="640"
                        height="72"
                        class="logo-pic-img lt-md"
                        @click="routeTo('Public.Home')" />
            </div>
          </div>
        </div>
        <!--        -----------------------------------------------------Tabs Section--------------------------------------------   -->
        <div class="tab-section">
          <main-header-menu-items />
        </div>
        <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
        <div class="user-action gt-sm">
          <div class="action-container">
            <q-btn icon="ph:shopping-cart"
                   flat
                   square
                   size="xl"
                   class="size-xl"
                   :loading="cartLoading"
                   :to="{name: 'Public.Checkout.Review'}">
              <q-badge v-if="mounted && cartOrdersCount > 0"
                       color="primary badge-xs"
                       floating
                       rounded>
                {{cartOrdersCount}}
              </q-badge>
            </q-btn>
          </div>
          <btn-user-profile-menu />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import BtnUserProfileMenu from 'src/components/BtnUserProfileMenu.vue'
import MainHeaderMenuItems from 'src/components/Template/Header/MainHeaderMenuItems/MainHeaderMenuItems.vue'

export default {
  name: 'MainHeaderTemplate',
  components: {
    LazyImg,
    BtnUserProfileMenu,
    MainHeaderMenuItems
  },
  data() {
    return {
      mounted: false,
      conferenceMenu: false,
      showHamburgerConfig: true,
      searchInput: '',
      user: new User(),
      isAdmin: false,
      isUserLogin: false
    }
  },
  computed: {
    cart () {
      return this.$store.getters['Cart/cart']
    },
    cartOrdersCount () {
      return this.cart.count
    },
    cartLoading () {
      return this.cart.loading
    },
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn']
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
    }
  },
  watch: {
    computedUserId () {
      this.loadAuthData()
    }
  },
  mounted () {
    this.mounted = true
    this.loadAuthData()
    this.refreshCartListener()
    this.checkAuth()
  },
  methods: {
    checkAuth() {
      this.$bus.on('onLoggedIn', () => {
        this.loadAuthData()
      })
    },
    refreshCartListener () {
      this.$bus.on('busEvent-refreshCart', () => {
        this.$store.dispatch('Cart/reviewCart')
      })
    },
    filterByStatement() {
      const param = {
        q: this.searchInput
      }
      this.$router.push({ name: 'Public.Content.Search', query: param })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
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
  color: #333;

  @media screen and (width <= 1023px) {
    height: 64px;
  }

  @media screen and (width <= 599px) {
    background-color: #F4F6F9;
  }

  .app-bar {
    max-width: 1360px;

    //min-width: 1360px;
    margin: auto;
    height: 72px;

    @media screen and (width <= 1919px) {
      width: 100%;

      //padding-left: 40px;
      //padding-right: 40px;
    }

    @media screen and (width <= 1439px) {
      padding-left: 35px;
      padding-right: 35px;
    }

    @media screen and (width <= 1023px) {
      padding-left: 30px;
      padding-right: 30px;
      height: 64px;
    }

    @media screen and (width <= 599px) {
      padding-left: 20px;
      padding-right: 20px;
    }

    .header-section {
      display: grid;
      grid-template-columns: 86px auto 156px;
      height: 100%;

      @media screen and (width <= 1023px) {
        //grid-template-columns: auto auto;
        grid-template-columns: 1fr;
      }

      @media screen and (width <= 599px) {
        //grid-template-columns: 1fr;
      }

      .logo-section {
        align-items: center;
        display: flex;
        position: relative;
        justify-content: space-between;

        @media screen and (width <= 1023px) {
          //justify-self: start;
          justify-self: center;
          justify-content: center;
          width: 100%;
        }

        @media screen and (width <= 599px) {
          justify-self: center;
          justify-content: center;
          width: 100%;
        }

        .logo-pic {
          cursor: pointer;
          display: flex;
          height: 72px;
          align-items: center;

          @media screen and (width <= 1023px) {
            width: 200px;
            height: 64px;
          }

          .homepage {
            :deep(.logo-pic-img) {
              //height: 40px;
              //width: 40px;
              //width: 100%;
              display: flex;
              flex-flow: row;
              justify-content: center;
              align-items: center;
              height: auto;
              width: 48px;

              @media screen and (width <= 1023px) {
                width: 100%;

                img {
                  height: auto !important;
                }
              }
            }

            @media screen and (width <= 1023px) {
              width: 100%;
            }
          }

          @media screen and (width <= 599px) {
            width: 200px;
          }

          //img {
          //
          //}
        }

        .hamburger {
          //display: none;
          @media screen and (width <= 1023px) {
            //display: block;
            //margin-right: 20px;
            //margin-left: -8px;
            position: absolute;
            left: 20px;
            top: 10px;
          }

          @media screen and (width <= 599px) {
            position: absolute;
            left: 20px;
            top: 10px;
          }
        }

        .drawer-btn {
          :deep(.q-btn) {
            flex-direction: row !important;
          }
        }

        .toolbar-button{
          position: absolute;
          left: 0 ;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .tab-section {
        height: 72px;
        margin-left: 24px;
        overflow: auto;

        .tabs-list {
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

        @media screen and (width <= 1023px) {
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

          .q-btn{
            margin-right: 4px ;
          }

          .q-badge{
            position: absolute ;
            right : 10% ;
            top : 10% ;
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
          //display: none;
        }

        display: flex;

        //justify-content: flex-end;
        align-items: center;
        height: 72px;
        justify-self: flex-end;

        .fit-profile-img {
          width: 48px;
          height: 48px;
          border-radius: 16px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.user-profile-dropdown {
  width: 280px;

  //height: 300px;
  background: #FFF;
  border: 1px solid #F2F5F9;
  border-radius: 0 16px 16px 16px #{"/* rtl:ignore */"};

  .header {
    box-shadow: 0 6px 10px rgb(49 46 87 / 4%) #{"/* rtl:ignore */"};
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
        border: 3px solid #FFF;
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
          margin: 0 40px 32px;
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
                margin-left: 12px;
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
              margin: 6px 9px 9px;
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
        background-color: rgb(255 255 255 / 10%);
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

<template>
  <div class="UserDashboardItems">
    <q-list class="side-menu-list"
            padding
            dark>
      <q-item v-if="isUserLogin"
              class="item-list wallet-balance">
        <div class="section-title">
          <q-item-section class="list-section">
            موجودی کیف پول
          </q-item-section>
          <q-item-section class="list-section title-icon"
                          avatar>
            {{ user.wallet_balance ? user.wallet_balance.toLocaleString('fa') : 0 }}
            تومان
          </q-item-section>
          <span class="indicator" />
        </div>
      </q-item>
      <q-item v-for="(item , index) in profileTitlesList"
              :key="index"
              class="item-list"
              :class="{ 'alone-item': !(item.children && item.children.length) }"
              :to="{ name: item.routeName, params: item.params }">
        <div class="section-title">
          <q-item-section class="list-section">
            {{ item.title }}
          </q-item-section>
          <q-item-section class="list-section title-icon"
                          avatar>
            <q-avatar :icon="item.icon"
                      size="30" />
          </q-item-section>
          <span class="indicator" />
        </div>
      </q-item>
      <q-item v-if="isUserLogin && !isEwanoUser"
              class="item-list alone-item q-mt-lg q-mb-md"
              clickable
              @click="logOut">
        <div class="section-title">
          <q-item-section class="list-section">
            خروج
          </q-item-section>
          <q-item-section class="list-section title-icon"
                          avatar>
            <q-avatar icon="isax:logout"
                      size="30" />
          </q-item-section>
          <span class="indicator" />
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import mixinEwano from 'src/components/Widgets/Ewano/mixinEwano.js'

export default {
  name: 'UserDashboardItems',
  mixins: [mixinEwano],
  data() {
    return {
      isAdmin: false,
      user: new User(),
      isUserLogin: false,
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
          title: 'سفارش های من',
          icon: 'isax:stickynote4',
          routeName: 'UserPanel.MyOrders',
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
          icon: 'ph:heart',
          routeName: 'UserPanel.MyFavorites',
          params: null,
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد راه ابریشم',
          icon: 'ph:compass',
          routeName: 'UserPanel.Asset.Abrisham.Progress',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد راه ابریشم پرو',
          icon: 'ph:compass',
          routeName: 'UserPanel.Asset.AbrishamPro.Progress',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد راه ابریشم ۲',
          icon: 'ph:compass',
          routeName: 'UserPanel.Asset.TripleTitleSet.Products',
          params: { eventName: 'abrisham2' },
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد چترنجات',
          icon: 'ph:umbrella',
          routeName: 'UserPanel.Asset.TripleTitleSet.Products',
          params: { eventName: 'chatre-nejat' },
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد امتحان نهایی',
          icon: 'isax:bill',
          routeName: 'UserPanel.Asset.TripleTitleSet.Products',
          params: { eventName: 'emtahan-nahaee' },
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد 110',
          icon: 'ph:fire',
          routeName: 'UserPanel.Asset.TripleTitleSet.Products',
          params: { eventName: '110' },
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'کار آفرینی',
          icon: 'ph:gift',
          routeName: 'UserPanel.Asset.GiftCard.MyGiftCards',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'تیکت',
          icon: 'ph:ticket',
          routeName: 'UserPanel.Ticket.Index',
          permission: 'all',
          active: false,
          children: []
        }
      ]
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    },
    showMenuItem () {
      return (/* item */) => {
        return true
        // return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Dashboard {
  background: #FFFFFF;
  border: 1px solid #F2F5F9;
  border-radius: 0 16px 16px 16px #{"/* rtl:ignore */"};
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

          &.wallet-balance {
            cursor: default !important;
          }

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
</style>

<template>
  <div class="header">
    <div class="title">
      کارت هدیه آلاء
    </div>
    <div class="dropdown-menu">
      <q-btn flat
             class="btn-user-profile">
        <lazy-img :src="user.photo"
                  :alt="'user photo'"
                  width="48"
                  height="48"
                  class="user-photo" />
        <q-menu class="user-profile-dropdown"
                :offset="[170, 10]">
          <div class="dropdown-box">
            <div class="header">
              <div class="profile-box">
                <div class="profile-detail">
                  <div class="profile-photo-box">
                    <div class="profile-photo-img">
                      <lazy-img :src="user.photo"
                                :alt="'user photo'"
                                width="60"
                                height="60"
                                class="user-photo" />
                    </div>
                  </div>
                  <div v-if="isUserLogin"
                       class="profile-detail-info">
                    <div class="info-name">{{user.full_name}}</div>
                    <div class="info-phoneNumber">{{user.mobile}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="body">
              <div class="user-panel-base-menu">
                <q-list class="side-menu-list"
                        padding
                        dark>
                  <div v-for="(item , index) in profileTitlesList"
                       :key="index">
                    <div>
                      <q-item class="item-list"
                              :class="{ 'alone-item': !item.children.length }"
                              :to="{ name: item.routeName, params: item.params }">
                        <div class="section-title">
                          <q-item-section class="list-section title-icon"
                                          avatar>
                            <q-avatar :icon="item.icon"
                                      size="30" />
                          </q-item-section>
                          <q-item-section class="list-section">
                            {{ item.title }}
                          </q-item-section>
                          <span class="indicator" />
                        </div>
                      </q-item>
                    </div>
                  </div>
                </q-list>
                <div class="log-out"
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
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'UserGiftCardPanel',
  components: { LazyImg },
  data() {
    return {
      user: new User(),
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
    },
    logOut() {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #F5F7FA;
  height: 90px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    letter-spacing: -0.03em;
    color: #697D9A;
    margin-top: 40px;
    margin-left: 96px;
  }
  .dropdown-menu {
    margin-top: 40px;
    margin-right: 96px;
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
  }
}

</style>

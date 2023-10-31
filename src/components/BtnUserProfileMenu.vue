<template>
  <q-btn v-if="isUserLogin"
         flat
         class="BtnUserProfileMenu">
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
                            class="user-photo full-width" />
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
        <div v-if="domainSameWithAppDomain"
             class="body">
          <div class="user-panel-base-menu">
            <user-dashboard-items />
          </div>
        </div>
      </div>
    </q-menu>
  </q-btn>
  <div v-else
       class="sub-mit-box">
    <q-btn unelevated
           class="btn-style sign-up lt-lg"
           label="ورود"
           :to="{ name: 'login' }" />
    <q-btn unelevated
           class="btn-style gt-md"
           label="ورود"
           :to="{ name: 'login' }" />
    <q-btn unelevated
           class="btn-style sign-up gt-md"
           label="ثبت نام"
           :to="{ name: 'login' }" />
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinAuth } from 'src/mixin/Mixins.js'
import UserDashboardItems from 'src/components/UserDashboardItems.vue'

export default {
  name: 'MainHeaderTemplate',
  components: { UserDashboardItems, LazyImg },
  mixins: [mixinAuth],
  data() {
    return {
      user: new User(),
      isUserLogin: false
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
    }
  }
}
</script>

<style scoped lang="scss">
.BtnUserProfileMenu {
  //margin-left: 18px;
  width: 48px;
  height: 48px;
  padding: 0 !important;
  overflow: hidden;
  border-radius: 16px;
  :deep(.q-btn__content) {
    width: 100%;
    margin: 0;
    .user-photo {
      width: 100%;
      img {
        border: 2px solid #FFB74D;
        border-radius: 16px;
        max-width: 100%;
        width: 100%;
      }
    }
  }
}
.sub-mit-box{
  background: #FFFFFF;
  border-radius: 16px;
  display: flex;
  margin-bottom: 0px;
  padding: 0px;

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
</style>

<template>
  <q-btn v-if="isUserLogin"
         round
         class="BtnUserProfileMenu size-lg">
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
    <q-btn class="btn-style  lt-lg"
           flat
           label="ورود"
           :to="{ name: 'login' }" />
    <q-btn class="btn-style gt-md"
           flat
           label="ورود"
           :to="{ name: 'login' }" />
    <q-btn color="primary"
           class="btn-style  gt-md"
           label="ثبت نام"
           :to="{ name: 'login' }" />
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins.js'
import LazyImg from 'src/components/lazyImg.vue'
import UserDashboardItems from 'src/components/UserDashboardItems.vue'

export default {
  name: 'MainHeaderTemplate',
  components: { UserDashboardItems, LazyImg },
  mixins: [mixinAuth],
  mounted () {
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      this.$bus.on('onLoggedIn', () => {
        this.loadAuthData()
      })
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
  background: #FFF;
  border-radius: 16px;
  display: flex;
  margin-bottom: 0;
  padding: 0;

  .btn-style{
    width: 96px;
    margin-right:$space-2 ;
    align-items: center;
    text-align: center;
  }
}
</style>

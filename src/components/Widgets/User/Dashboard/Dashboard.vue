<template>
  <q-card class="Dashboard q-mt-none q-mx-sm q-mb-md custom-card">
    <div class="profile-box">
      <div class="profile-detail">
        <div class="profile-photo-box">
          <div class="profile-photo-img">
            <q-avatar>
              <lazy-img :src="user.photo"
                        :alt="'user photo'"
                        width="60"
                        height="60"
                        class="full-width" />
            </q-avatar>
          </div>
        </div>
        <div v-if="isUserLogin"
             class="profile-detail-info">
          <div class="info-name">{{user.full_name}}</div>
          <div class="info-phoneNumber">{{user.mobile}}</div>
        </div>
      </div>
    </div>
    <user-dashboard-items />
  </q-card>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'
import UserDashboardItems from 'src/components/UserDashboardItems.vue'
import { User } from 'src/models/User'

export default {
  name: 'Dashboard',
  components: { LazyImg, UserDashboardItems },
  mixins: [mixinWidget, inputMixin],
  data() {
    return {
      isAdmin: false,
      user: new User(),
      isUserLogin: false
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
          .q-avatar {
            width: 100%;
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
}
</style>

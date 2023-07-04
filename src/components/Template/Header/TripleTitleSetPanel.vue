<template>
  <div class="chatre-nejat-header">
    <div class="logo-box">
      <q-img src="https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png"
             class="logo-image" />
    </div>
    <div class="header-box full-height flex justify-center items-center">
      <q-img :src="event.logo"
             class="header-logo-img" />
    </div>
    <div class="profile-box flex items-center">
      <q-avatar class="avatar">
        <img :src="user.photo"
             alt="profile-photo">
        <q-menu>
          <q-list class="menu-item">
            <q-item>
              <q-avatar class="profile-photo">
                <img alt="profile-photo"
                     class="img"
                     :src="user.photo">
              </q-avatar>
              <q-item-section>
                <div class="name">
                  {{user.first_name || ' '}}
                  {{user.last_name || ' '}}
                </div>
                <div class="phone-number">
                  {{user.mobile}}
                </div>
              </q-item-section>
            </q-item>
            <q-item :to="{name : 'Public.Home'}">
              <q-item-section>
                <q-separator class="separator q-mb-md" />
                رفتن به صفحه اصلی
              </q-item-section>
            </q-item>
            <q-item class="cursor-pointer">
              <span @click="logOut">
                خروج
              </span>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'

export default {
  name: 'TripleTitleSetPanel',
  mixins: [mixinTripleTitleSet],
  data: () => ({
    user: new User(),
    activePage: null
  }),
  mounted () {
    this.loadAuthData()
    if (window.innerWidth < 1024) {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
    }
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    logOut() {
      this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style scoped lang="scss">
.menu-item{
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--abrishamGray);
  .profile-photo{
    margin-right:15px;
    .img{
      width: 36px;
      height: 36px;
    }

  }
  .name{
    font-size: 16px;
    font-weight: 500;
    color: var(--abrishamMain);
    margin-bottom: 3px;
  }
  .phone-number{
    font-size: 14px;
  }
  .separator{
    width: 90%;
  }
}
.chatre-nejat-header{
  height: 64px;
  background: #fff;
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  @media screen and (max-width: 1023px) {

  }

  .logo-box {
    width: 44px;
    height: 44px;
    align-self: center;
    margin-left: 25px;
    visibility: hidden;
    @media screen and (max-width: 990px) {
      visibility: visible;
    }
  }

  .profile-box{

  }

  .header-box {
    .header-logo-img {
      width: 142px;
      @media screen and (max-width: 990px) {
        width: 126px;
      }
      @media screen and (max-width: 768px) {
        width: 86px;
      }
    }
  }
  .profile-box {
    height: 100%;
    @media screen and (max-width: 1904px) {

    }

    .icon {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #3e5480;
      font-weight: 500;
      vertical-align: middle;
      margin-right: 25px;
      @media screen and (max-width: 1904px) {
        margin-left: 15px;
      }
      @media screen and (max-width: 768px) {
        font-size: 19px;
        margin-left: 11px;
      }
    }

    .avatar{
      margin-right: 25px;
      width: 36px;
      height: 36px;
    }

  }
  .expanded-panel{
    margin: 0 30px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  }
}

</style>

<template>
  <div class="chatre-nejat-header">
    <div class="logo-box">
      <router-link :to="{name: 'Public.Home'}">
        <q-img src="https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png"
               class="logo-image" />
      </router-link>
    </div>
    <div class="header-box full-height flex justify-center items-center">
      <q-img :src="event.logo"
             class="header-logo-img" />
    </div>
    <div class="profile-box flex items-center">
      <btn-user-profile-menu />
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import { mixinAuth, mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import BtnUserProfileMenu from 'components/BtnUserProfileMenu.vue'

export default {
  name: 'TripleTitleSetPanel',
  components: { BtnUserProfileMenu },
  mixins: [mixinAuth, mixinTripleTitleSet],
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
    logOut () {
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
  color: #9fa5c0;

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
    color: #3e5480;
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

  @media screen and (width <= 1023px) {

  }

  .logo-box {
    width: 44px;
    height: 44px;
    align-self: center;
    margin-left: 25px;
    visibility: hidden;

    @media screen and (width <= 990px) {
      visibility: visible;
    }
  }

  .profile-box{
    padding-right: 18px;
  }

  .header-box {
    .header-logo-img {
      width: 142px;

      @media screen and (width <= 990px) {
        width: 126px;
      }

      @media screen and (width <= 768px) {
        width: 86px;
      }
    }
  }

  .profile-box {
    height: 100%;
    padding-right: 18px;
  }

  .expanded-panel{
    margin: 0 30px;
    box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
  }
}

</style>

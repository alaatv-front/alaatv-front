<template>
  <div class="abrisham-header">
    <div class="header-box full-height flex justify-center items-center">
      <q-img src="https://nodes.alaatv.com/upload/abrisham-panel-logotype.png"
             class="header-logo-img" />
      <!--      <div class="text-primary">راه ابریشم</div>-->
    </div>
    <div class="profile-box flex items-center">
      <btn-user-profile-menu />
    </div>
  </div>
</template>

<script>
import BtnUserProfileMenu from 'src/components/BtnUserProfileMenu.vue'

export default {
  name: 'abrishamTemplateHeader',
  components: { BtnUserProfileMenu },
  data: () => ({
    activePage: null
  }),
  computed: {
    user() {
      return this.$store.getters['Auth/user']
    }
  },
  methods: {
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
.abrisham-header{
  height: 64px;
  background: #fff;
  position: relative;
  @media screen and (max-width: 1023px) {

  }
  .profile-box{
    padding-right: 18px;
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
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding-right: 18px;
    @media screen and (max-width: 1904px) {
      margin-left: 20px;
    }
  }
  .expanded-panel{
    margin: 0 30px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  }
}

</style>

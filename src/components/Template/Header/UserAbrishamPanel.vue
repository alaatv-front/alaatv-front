<template>
  <div class="abrisham-header">
    <div class="header-box full-height flex justify-center items-center">
      <q-img src="https://nodes.alaatv.com/upload/abrisham-panel-logotype.png"
             class="header-logo-img" />
      <!--      <div class="text-primary">راه ابریشم</div>-->
    </div>
    <div class="profile-box flex items-center">
      <i class="fi fi-rr-bell icon" />
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
export default {
  name: 'abrishamTemplateHeader',
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
.abrisham-header{
  height: 64px;
  background: #fff;
  position: relative;
  @media screen and (max-width: 1023px) {

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
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    @media screen and (max-width: 1904px) {
      margin-left: 20px;
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

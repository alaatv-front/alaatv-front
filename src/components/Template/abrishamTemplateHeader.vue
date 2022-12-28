<template>
  <div class="abrisham-header">
    <div class="header-box full-height flex justify-center items-center">
      <!--      <q-img-->
      <!--        src="https://nodes.alaatv.com/upload/abrisham-panel-logotype.png"-->
      <!--        class="header-logo-img"-->
      <!--      />-->
      <div class="text-primary">راه ابریشم</div>
    </div>
    <div class="profile-box flex items-center">
      <i class="fi fi-rr-bell icon" />
      <q-avatar class="avatar">
        <q-img src="https://cdn.quasar.dev/img/avatar.png" />
        <q-menu>
          <q-list>
            <q-item>
              name
            </q-item>
            <q-item>
              go home page
            </q-item>
            <q-item>
              sign out
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
  })
}
</script>

<style scoped lang="scss">
.abrisham-header{
  height: 64px;
  background: #fff;
  position: relative;
  @media screen and (max-width: 1023px) {

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

<template>
  <div class="header">
    <div class="title">
      کار آفرینی
    </div>
    <div class="dropdown-menu">
      <btn-user-profile-menu />
    </div>
  </div>
</template>

<script>
import BtnUserProfileMenu from 'src/components/BtnUserProfileMenu.vue'

export default {
  name: 'UserGiftCardPanel',
  components: { BtnUserProfileMenu }
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
    margin-top: 24px;
    margin-left: 30px;
  }
  .dropdown-menu {
    margin-top: 24px;
    margin-right: 30px;
  }
}
</style>

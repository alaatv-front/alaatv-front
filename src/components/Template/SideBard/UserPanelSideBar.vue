<template>
  <profile-menu class="UserPanelSideBar" />
</template>

<script>

import ProfileMenu from 'components/Widgets/User/ProfileMenu/ProfileMenu.vue'
export default {
  name: 'UserPanelSideBar',
  components: { ProfileMenu }
}
</script>

<style scoped lang="scss">
.UserPanelSideBar {
  background: white;
  height: 100%;

  :deep(.custom-card){
    box-shadow: none !important;
  }
}
</style>

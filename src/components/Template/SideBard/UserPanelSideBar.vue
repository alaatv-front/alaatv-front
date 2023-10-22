<template>
  <div class="UserPanelSideBar">
    <div class="user-info-section">
      <user-info-section />
    </div>
    <q-separator />
    <div class="items-section">
      <items-section />
    </div>
  </div>
</template>

<script>
import ItemsSection from 'src/components/Template/SideBard/UserPanel/ItemsSection.vue'
import UserInfoSection from 'src/components/Template/SideBard/UserPanel/UserInfoSection.vue'

export default {
  name: 'UserPanelSideBar',
  components: { ItemsSection, UserInfoSection }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";

.UserPanelSideBar {
  height: 100%;
  background: $grey-1;
  .user-info-section {
    padding: 40px 40px 24px;
  }
  .items-section {
    padding: 12px 40px 40px;
  }
}
</style>

<template>
  <main-header-template v-if="type === 'main'" />
  <admin-panel-header v-if="type === 'admin'" />
  <user-abrisham-panel v-if="type === 'abrisham'" />
  <user-gift-card-panel v-if="type === 'gift-card'" />
</template>

<script>
import MainHeaderTemplate from 'components/Template/Header/Main.vue'
import UserAbrishamPanel from 'components/Template/Header/UserAbrishamPanel.vue'
import UserGiftCardPanel from 'components/Template/Header/UserGiftCardPanel.vue'
import AdminPanelHeader from 'components/Template/Header/AdminPanelHeader.vue'

export default {
  name: 'templateHeader',
  components: {
    AdminPanelHeader,
    MainHeaderTemplate,
    UserGiftCardPanel,
    UserAbrishamPanel
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>

<style scoped lang="scss">
.user-panel-bare-layout {
  max-width: 1362px;
  margin: auto;
  padding-top: 30px;
  background: #f4f6f9;
  justify-content: center;
  @media screen and (max-width: 1439px) {
    max-width: 100%;
  }
  @media screen and (max-width: 1439px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media screen and (max-width: 1148px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 1023px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 599px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  .user-side-bar {
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
}
</style>

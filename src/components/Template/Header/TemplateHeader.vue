<template>
  <main-header-template v-if="type === 'main'" />
  <admin-panel-header v-if="type === 'admin'" />
  <user-abrisham-panel v-if="type === 'abrisham'" />
  <user-gift-card-panel v-if="type === 'gift-card'" />
  <triple-title-set-panel v-if="type === 'triple-title-set'" />
</template>

<script>
import MainHeaderTemplate from 'src/components/Template/Header/Main.vue'
import AdminPanelHeader from 'src/components/Template/Header/AdminPanelHeader.vue'
import UserAbrishamPanel from 'src/components/Template/Header/UserAbrishamPanel.vue'
import UserGiftCardPanel from 'src/components/Template/Header/UserGiftCardPanel.vue'
import TripleTitleSetPanel from 'src/components/Template/Header/TripleTitleSetPanel.vue'

export default {
  name: 'templateHeader',
  components: {
    AdminPanelHeader,
    UserGiftCardPanel,
    UserAbrishamPanel,
    MainHeaderTemplate,
    TripleTitleSetPanel
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

  @media screen and (width <= 1439px) {
    max-width: 100%;
  }

  @media screen and (width <= 1439px) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media screen and (width <= 1148px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media screen and (width <= 1023px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media screen and (width <= 599px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  .user-side-bar {
    @media screen and (width <= 1023px) {
      display: none;
    }
  }
}
</style>

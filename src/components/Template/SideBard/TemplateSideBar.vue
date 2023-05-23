<template>
  <abrisham-panel v-if="type === 'abrisham'" />
  <gift-card-panel v-if="type === 'gift-card'" />
  <admin-panel-side-bar v-if="type === 'admin'" />
  <main-side-bar-template v-if="type === 'main'" />
  <user-panel-side-bar v-if="type === 'user-panel'" />
  <triple-title-set-panel v-if="type === 'triple-title-set'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBard/Main.vue'
import AbrishamPanel from 'src/components/Template/SideBard/AbrishamPanel.vue'
import GiftCardPanel from 'src/components/Template/SideBard/GiftCardPanel.vue'
import UserPanelSideBar from 'src/components/Template/SideBard/UserPanelSideBar.vue'
import AdminPanelSideBar from 'src/components/Template/SideBard/AdminPanelSideBar.vue'
import TripleTitleSetPanel from 'src/components/Template/SideBard/TripleTitleSetPanel.vue'

export default {
  name: 'TemplateSideBar',
  components: {
    AbrishamPanel,
    GiftCardPanel,
    UserPanelSideBar,
    AdminPanelSideBar,
    MainSideBarTemplate,
    TripleTitleSetPanel
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>

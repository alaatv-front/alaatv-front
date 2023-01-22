<template>
  <main-side-bar-template v-if="type === 'main'" />
  <admin-panel-side-bar v-if="type === 'admin'" />
  <abrisham-panel v-if="type === 'abrisham'" />
  <gift-card-panel v-if="type === 'gift-card'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBard/Main.vue'
import AbrishamPanel from 'src/components/Template/SideBard/AbrishamPanel.vue'
import GiftCardPanel from 'src/components/Template/SideBard/GiftCardPanel.vue'
import AdminPanelSideBar from 'components/Template/SideBard/AdminPanelSideBar.vue'
export default {
  name: 'TemplateSideBar',
  components: { AdminPanelSideBar, MainSideBarTemplate, AbrishamPanel, GiftCardPanel },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>

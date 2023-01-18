<template>
  <main-side-bar-template v-if="type === 'main'" />
  <abrisham-panel v-if="type === 'abrisham'" />
  <gift-card-panel v-if="type === 'gift-card'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBard/Main.vue'
import AbrishamPanel from 'src/components/Template/SideBard/AbrishamPanel.vue'
import GiftCardPanel from 'src/components/Template/SideBard/GiftCardPanel.vue'
export default {
  name: 'TemplateSideBar',
  components: { MainSideBarTemplate, AbrishamPanel, GiftCardPanel },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>

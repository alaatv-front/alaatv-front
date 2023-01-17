<template>
  <main-side-bar-template v-if="type === 'main'" />
  <abrisham-side-menu v-if="type === 'abrisham'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBard/Main.vue'
import AbrishamSideMenu from 'src/components/Template/SideBard/AbrishamSideMenu.vue'
export default {
  name: 'TemplateSideBar',
  components: { MainSideBarTemplate, AbrishamSideMenu },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>

<style scoped>

</style>

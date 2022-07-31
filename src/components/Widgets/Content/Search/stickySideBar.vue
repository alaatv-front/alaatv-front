<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import StickySidebar from 'sticky-sidebar'
export default {
  name: 'stickySideBar',
  data: () => ({
    slider: null
  }),
  mounted () {

  }
}
</script>

<style scoped>

</style>

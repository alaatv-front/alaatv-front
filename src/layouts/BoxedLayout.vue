<template>
  <div class="boxed-layout-container boxed-container">
    <Router :include="keepAliveComponents" />
  </div>
</template>

<script>
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'
// import 'src/css/Theme/theme.scss'
export default {
  components: { Router },
  created () {
    // console.log('bareLayout created')
  },
  mounted () {
    // console.log('bareLayout mounted')
  },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div class="boxed-layout-container boxed-container">
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'
// import 'src/css/Theme/theme.scss'
export default {
  components: { Router },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  },
  created () {
    // console.log('bareLayout created')
  },
  mounted () {
    // console.log('bareLayout mounted')
  }
}
</script>

<style scoped lang="scss">
</style>

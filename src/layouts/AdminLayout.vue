<template>
  <div class="admin-layout">
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'
export default {
  components: { Router },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>

<style scoped lang="scss">
.admin-layout {
  padding: 0;
}
</style>

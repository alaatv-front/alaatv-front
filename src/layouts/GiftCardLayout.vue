<template>
  <div class="gift-card-layout">
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'assets/js/KeepAliveComponents.js'
export default {
  name: 'AbrishamLayout',
  components: { Router },
  data: () => ({
    keepAliveComponents: KeepAliveComponents
  })
}
</script>

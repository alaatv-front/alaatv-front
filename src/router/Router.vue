<template>
  <router-view v-slot="{ Component, route}">
    <keep-alive :include="include">
      <component :is="Component"
                 :key="route.path" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: 'Router',
  props: {
    exclude: {
      default: [],
      required: false
    },
    include: {
      default: [],
      required: false
    }
  }
}
</script>

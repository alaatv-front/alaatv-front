<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'stickySideBar',
  data: () => ({
    slider: null
  })
}
</script>

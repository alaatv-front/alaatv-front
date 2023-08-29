<template>
  <div class="row">
    <div v-for="(item , index) in 7"
         :key="index">
      {{ 's' + item }}
      <div class="box q-ma-md"
           :class="'shadow-' + item" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleShadow'
}
</script>

<style scoped lang="scss">
.box {
  width: 96px;
  height: 96px;
  border-radius: 9.59574px;
  background: $primary;
}
</style>

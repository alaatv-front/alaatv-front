<template>
  <div class="test">
    <div v-for="(item , index) in 12"
         :key="index">
      <div class="bg-primary"
           :class="'alaa-mb-' + item">
        {{ 'alaa-mb-' + item + ': ' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spacing'
}
</script>

<style scoped lang="scss">
.test {
  margin: $alaa-space-12;
}
</style>

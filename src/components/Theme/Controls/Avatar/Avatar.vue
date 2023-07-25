<template>
  <div class="full-width row justify-center q-gutter-lg q-pa-lg">
    <div v-for="size in sizes"
         :key="size">
      <q-avatar :class="size.className"
                color="primary"
                text-color="white"
                icon="directions" />
      <div>{{ size.className }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  data () {
    return {
      sizes: [
        {
          size: 'xs',
          className: 'avatar-xs'
        },
        {
          size: 'sm',
          className: 'avatar-sm'
        },
        {
          size: 'md',
          className: 'avatar-md'
        },
        {
          size: 'lg',
          className: 'avatar-lg'
        },
        {
          size: 'xl',
          className: 'avatar-xl'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>ExampleTabs</div>
  <q-tabs v-model="tab"
          narrow-indicator
          dense>
    <q-tab v-for="(tab, index) in 12"
           :key="index"
           :name="tab"
           icon="add"
           label="عنوان تب" />
  </q-tabs>
</template>

<script>
export default {
  name: 'ExampleTabs',
  data () {
    return {
      tab: ''
    }
  }
}
</script>

<style scoped>

</style>

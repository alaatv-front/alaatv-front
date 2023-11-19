<template>
  <div>ExampleTabs</div>
  <q-tabs v-model="tab"
          narrow-indicator
          dense>
    <q-tab v-for="(tab, index) in 6"
           :key="index"
           :name="tab"
           :disable="index === 4 || index === 5"
           icon="isax:copyright"
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

<template>
  <div class="map-page">
    <map-widget />
  </div>
</template>

<script>
import MapWidget from 'components/Widgets/Map/Map'
export default {
  name: 'MapPage',
  components: { MapWidget }
}
</script>

<style scoped>
.map-page {
  width: 100%;
  margin: auto;
}
</style>

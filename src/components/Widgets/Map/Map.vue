<template>
  <div class="MapWidget">

    <base-map ref="baseMap"
              v-model:zoom="zoom"
              v-model:center="center"
              :items="visibleMapItems"
              @update:zoom="zoomUpdated"
              @update:center="centerUpdated"
              @update:bounds="boundsUpdated"
              @update:item="updateItem"
              @update:visible-map-items="updateVisibleMapItems" />
    <div class="justify-center flex" />
  </div>
</template>

<script>
import { MapItem, MapItemList } from 'src/models/MapItem'
import BaseMap from 'src/components/Widgets/Map/BaseMap.vue'
import MapItemsResponse from 'src/components/Widgets/Map/MapItemsResponse.js'

export default {
  name: 'MapWidget',
  components: {
    BaseMap
  },
  data () {
    return {
      zoom: 4,
      center: null,
      bounds: null,
      lastZoomTime: 0,
      searchQuery: '',
      lastCenterChangeTime: 0,
      editMapMode: false,
      mapItems: new MapItemList(),
      visibleMapItems: new MapItemList(),
      mapLoading: false
    }
  },
  watch: {
    visibleItems: {
      handler (newValue) {

      },
      deep: true
    }
  },
  created () {
    this.$store.commit('AppLayout/updateLayoutFooterVisible', false)
    this.fetchMapItems()
  },
  beforeUnmount () {
    this.$store.commit('AppLayout/updateLayoutFooterVisible', true)
  },
  methods: {
    fetchMapItems () {
      this.mapLoading = true
      this.mapItems = new MapItemList(MapItemsResponse.data)
      this.mapLoading = false
      // const address = (this.searchQuery.length > 0) ? API_ADDRESS.map.items + '?' + this.searchQuery : API_ADDRESS.map.items
      // this.$axios.get(address)
      //   .then((response) => {
      //     this.mapItems = new MapItemList(response.data.data)
      //     this.mapLoading = false
      //     this.updateVisibleMapItems()
      //   })
      //   .catch(function () {
      //   })
    },
    updateItem (data) {
      this.visibleMapItems.list[data.index] = new MapItem(data.data)
    },
    zoomUpdated (zoom) {
      this.zoom = zoom
      this.updateVisibleMapItems()
    },
    centerUpdated (center) {
      this.center = center
      // this.lastCenterChangeTime = Date.now()
      // if (Date.now() - this.lastZoomTime > 500) {
      //   this.visibleMapItems.forEach((item) => {
      //     item.isInView = this.isInView(item, 50)
      //   })
      // }
      // this.currentCenter = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
      this.updateVisibleMapItems()
    },
    updateVisibleMapItems () {
      this.$nextTick(() => {
        this.visibleMapItems.list = this.mapItems.list.filter((item) => {
          return (item.canShowMapItem(this.bounds, this.zoom) &&
            (
              item.enable ||
              this.editMapMode
            ))
        })
      })
    }
  }
}
</script>

<style scoped>
.MapWidget {
  /* height: 70vh; */
  width: 100%;
}
</style>

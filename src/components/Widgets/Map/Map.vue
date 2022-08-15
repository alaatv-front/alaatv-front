<template>
  <div
    class="MapWidget">
    <base-map
      v-model:zoom="zoom"
      v-model:center="center"
      :items="visibleMapItems"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
      @onClicked="mapClick"
      ref="baseMap"
    />
  </div>
</template>

<script>
import { MapItemList } from 'src/models/MapItem'
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
      hasZoomChanged: false,
      hasCenterChanged: false,
      mapSearchToolShow: false,
      sidebarAdminToolBoxTabName: null,
      editMapMode: false,
      adminToolBox: {
        marker: null,
        polyline: null,
        polygon: {
          latlngs: [],
          color: 'green'
        }
      },
      mapClickActionTypes: [
        { name: 'noAction', selected: true },
        { name: 'addIcon', selected: false },
        { name: 'addPolygonPoint', selected: false }
      ],
      crs: null,
      minZoom: 3.1,
      maxZoom: 11,
      maxBounds: null,
      maxBoundsViscosity: 1,
      rectangle: {
        bounds: [[47.341456, -1.397133], [47.303901, -1.243813]], // down - left - up - right
        style: { color: 'red', weight: 1 }
      },
      polygon: {
        latlngs: [],
        color: 'green'
      },
      url: 'https://nodes.alaatv.com/upload/raheAbrishamMap/{z}/{x}/{y}.png?v=' + this.mapVersion,
      currentZoom: 1,
      currentCenter: [0, 0],
      mapIsAnimated: true,
      mapItems: new MapItemList(),
      visibleMapItems: new MapItemList(),
      mapLoading: false
    }
  },
  created () {
    this.fetchMapItems()
  },
  methods: {
    loadTestMarker () {

    },
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
      this.bounds = bounds
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
    },
    mapClick (event) {
      // console.log('event', event)
      // if (this.selectedMapClickActionTypes.name === 'addIcon') {
      //   this.cleanAdminToolBoxMapItem();
      //   Vue.set(this.adminToolBox.marker.data, 'latlng', event.latlng);
      //   Vue.set(this.adminToolBox.polyline, 'editMode', false);
      //   Vue.set(this.adminToolBox.marker, 'editMode', true);
      //   Vue.set(this.adminToolBox.marker, 'enable', true);
      //   Vue.set(this.adminToolBox.marker, 'min_zoom', 11);
      //   Vue.set(this.adminToolBox.marker, 'max_zoom', 11);
      //   const newMapItemAction = new MapItemAction();
      //   Vue.set(this.adminToolBox.marker, 'action', newMapItemAction.getLink());
      //   this.setMapClickActionType('noAction');
      // }
    }
  }
}
</script>

<style scoped>
.MapWidget {
  height: 70vh;
  width: 100%;
}
</style>

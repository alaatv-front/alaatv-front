<template>
  <div
    class="MapWidget">

    <base-map
      ref="baseMap"
      v-model:zoom="zoom"
      v-model:center="center"
      :items="visibleMapItems"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
      @update:item="updateItem"
      @add_marker="addMarker"
      @chenge_edit_mode="changeEditMode"
    />
    <div class="justify-center flex">
    </div>
  </div>
</template>

<script>
import { MapItemList } from 'src/models/MapItem'
import BaseMap from 'src/components/Widgets/Map/BaseMap.vue'
import MapItemsResponse from 'src/components/Widgets/Map/MapItemsResponse.js'
import MapItemEntity from 'src/models/MapItemEntity'
import { MapItemAction } from 'src/models/MapItemAction'
import { latLng } from 'leaflet'

export default {
  name: 'MapWidget',
  components: {
    BaseMap
  },
  watch: {
    visibleItems: {
      handler(newValue) {

      },
      deep: true
    }
  },
  data() {
    return {
      zoom: 4,
      center: null,
      bounds: null,
      lastZoomTime: 0,
      searchQuery: '',
      lastCenterChangeTime: 0,
      editMapMode: false,
      adminToolBox: {
        marker: {
          id: 0,
          action: {},
          data: {
            latlng: {
              lat: 0,
              lng: 0
            },
            headline: {
              text: null,
              fontSize: 14
            },
            icon: {
              options: {
                iconAnchor: [0, 0],
                iconUrl: null,
                iconSize: 70
              }
            }
          },
          enable: 1,
          tags: [],
          min_zoom: 3.1,
          max_zoom: 11,
          editMode: false,
          type: {
            name: 'marker'
          }
        },
        polyline: null
      },
      mapItems: new MapItemList(),
      visibleMapItems: new MapItemList(),
      mapLoading: false
    }
  },
  created() {
    this.fetchMapItems()
  },
  methods: {
    fetchMapItems() {
      this.mapLoading = true
      this.mapItems = new MapItemList(MapItemsResponse.data)
      // console.log(this.mapItems)
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
    addMarker(data) {
      const lat = data.latlng.lat
      const lng = data.latlng.lng
      this.adminToolBox.marker.data.latlng = latLng(lat, lng)
      this.visibleMapItems.list.push(this.adminToolBox.marker)
    },
    updateItem(data) {
      console.log(data)
      this.visibleMapItems.list[data.index].tags = data.data.tags
      this.visibleMapItems.list[data.index].data.headline.text = data.data.data.headline.text
      this.visibleMapItems.list[data.index].data.headline.fontSize = data.data.data.headline.fontSize
      this.visibleMapItems.list[data.index].data.headline.fillColor = data.data.data.headline.fillColor
      this.visibleMapItems.list[data.index].data.headline.strokeColor = data.data.data.headline.strokeColor
      this.visibleMapItems.list[data.index].data.headline.strokeWidth = data.data.data.headline.strokeWidth
      this.visibleMapItems.list[data.index].data.icon.options.iconAnchor[0] = data.data.data.icon.options.iconAnchor[0]
      this.visibleMapItems.list[data.index].data.icon.options.iconAnchor[1] = data.data.data.icon.options.iconAnchor[1]
      this.visibleMapItems.list[data.index].data.icon.options.iconSize = data.data.data.icon.options.iconSize
      const iconUrl = data.data.data.icon.options.iconUrl
      console.log(data.data.data.icon.options.iconUrl)
      if (typeof iconUrl === 'object') {
        this.visibleMapItems.list[data.index].data.icon.options.iconUrl = URL.createObjectURL(iconUrl) // returns Blob
      } else {
        this.visibleMapItems.list[data.index].data.icon.options.iconUrl = iconUrl
      }
      this.visibleMapItems.list[data.index].entity = new MapItemEntity(data.data.entity)
      this.visibleMapItems.list[data.index].min_zoom = data.data.min_zoom
      this.visibleMapItems.list[data.index].max_zoom = data.data.max_zoom
      this.visibleMapItems.list[data.index].action = new MapItemAction(data.data.action)
    },
    changeEditMode(index) {
      this.visibleMapItems.list[index].editMode = true
    },
    zoomUpdated(zoom) {
      this.zoom = zoom
      this.updateVisibleMapItems()
    },
    centerUpdated(center) {
      this.center = center
      // this.lastCenterChangeTime = Date.now()
      // if (Date.now() - this.lastZoomTime > 500) {
      //   this.visibleMapItems.forEach((item) => {
      //     item.isInView = this.isInView(item, 50)
      //   })
      // }
      // this.currentCenter = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
      this.updateVisibleMapItems()
    },
    updateVisibleMapItems() {
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
  height: 70vh;
  width: 100%;
}
</style>

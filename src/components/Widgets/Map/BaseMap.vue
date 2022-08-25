<template>
  <div class="MapWidget"
       :class="{setMarker: selectedMapClickActionTypes.name === 'addIcon'}"
       dir="ltr"
  >
    <l-map ref="lMap"
           @click="mapClick($event)"
           :options="{zoomControl: false}"
           v-model:zoom="mapZoom"
           v-model:center="mapCenter"
           v-model:options="mapOptions"
           :min-zoom="minZoom"
           :max-zoom="maxZoom"
           :bounds="mapBounds"
           :maxBounds="maxBounds"
           :maxBoundsViscosity="maxBoundsViscosity"
           :crs="crs"
           @update:zoom="zoomUpdated"
           @update:center="centerUpdated"
           @update:bounds="boundsUpdated">
      <l-tile-layer :url="url" />
      <l-control-zoom position="topright"></l-control-zoom>
      <l-marker
        v-if="adminToolBox.marker.data.latlng"
        :lat-lng="adminToolBox.marker.data.latlng"
        :draggable=true
        :visible="adminToolBox.marker.editMode"
        @drag="reportAdminMarker"
      >
        <l-icon
          v-if="adminToolBox.marker.data.icon.options.iconUrl"
          ref="markerIcon"
          :icon-url="adminToolBox.marker.data.icon.options.iconUrl"
          :icon-size="adminToolBox.marker.data.icon.options.iconSize"
          :icon-anchor="adminToolBox.marker.data.icon.options.iconAnchor"
          :shadow-url="adminToolBox.marker.data.icon.options.shadowUrl"
          :shadow-size="adminToolBox.marker.data.icon.options.shadowSize"
          :shadow-anchor="adminToolBox.marker.data.icon.options.shadowAnchor"
        >
          <div class="markerHeadline"
               v-if="adminToolBox.marker.data.headline.text"
               v-html="adminToolBox.marker.data.headline.text"
               :style="{
                 fontSize: adminToolBox.marker.data.headline.fontSize+'px',
                 'text-fill-color': adminToolBox.marker.data.headline.fillColor,
                 '-webkit-text-fill-color': adminToolBox.marker.data.headline.fillColor,
                 'text-stroke-width': adminToolBox.marker.data.headline.strokeWidth+'px',
                 '-webkit-text-stroke-width': adminToolBox.marker.data.headline.strokeWidth+'px',
                 'text-stroke-color': adminToolBox.marker.data.headline.strokeColor,
                 '-webkit-text-stroke-color': adminToolBox.marker.data.headline.strokeColor
               }"
          >
          </div>
          <img class="markerImage adminToolBoxMarker"
               v-if="adminToolBox.marker.data.icon.options"
               :src="adminToolBox.marker.data.icon.options.iconUrl"
          >
        </l-icon>
      </l-marker>

      <l-control
        position="topleft"
      >
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          @click="openFilterDrawer"
          icon="isax:search-normal"
        />
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          @click="openToolsDrawer"
          icon="isax:edit"
        />
      </l-control>
      <l-control
        dir="rtl"
        position="topright"
      >
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          @click="copyToClipboard"
          icon="isax:link"
        >
        </q-btn>
        <div style="width: 130px; background: #ffffff8f;font-family: IRANSans;padding: 5px;border-radius: 5px;">
          زوم:
          {{ currentZoom }}
          <br>
          عرض:
          <span dir="ltr">
            {{ currentCenter.lat  }}
          </span>
          <br>
          طول:
          <span dir="ltr">
            {{ currentCenter.lng  }}
          </span>
        </div>
      </l-control>
    </l-map>
  </div>
  <drawer max-width="300px"
          :is-open="filterDrawer"
          :background-color="'rgba(255, 255, 255, 0.65) none repeat scroll 0% 0%'"
          side="left">
    <q-scroll-area class="fit">
      <q-btn icon="mdi-close"
             unelevated
             class="close-btn"
             @click="filterDrawer = false" />
      <map-filters @filter-values="setFilters" />
    </q-scroll-area>
  </drawer>
  <drawer max-width="700px"
          :is-open="toolsDrawer"
          :expansion-value="expansionVal"
          :is-expanded="expansion"
          side="right">
    <q-scroll-area class="fit">
      <div>
        <q-btn :icon="expansionIcon"
               style="width: 10%"
               unelevated
               color="blue"
               class="close-btn"
               @click="expandPanel" />
        <q-btn icon="mdi-close"
               style="width: 90%"
               unelevated
               class="close-btn"
               @click="toolsDrawer = false" />
      </div>
      <div>
        <admin-tool-box
          ref="adminToolBox"
          :center="currentCenter"
          :zoom="currentZoom"
          :marker="adminToolBox.marker"
          :polyline="adminToolBox.polyline"
          @add_marker="addAdminMarker"
          @save_marker="saveMapItem"
          @marker_change="updateAdminMarker"
          @delete_marker="deleteAdminMapItem"
          @delete_polyline="deleteAdminMapItem"
          @save_polyline="saveMapItem"
          @polyline_change="updateAdminPolyline"

          @tab_changed="sidebarAdminToolBoxOnTabChange"
          @open_map_items_list="openMapItemsList"
          @reset_editable_polyline_to_center_of_map="resetEditablePolylineToCenterOfMap"
        />
      </div>
    </q-scroll-area>
  </drawer>
</template>

<script>
import L, { CRS, latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPolyline, LIcon, LControl, LControlZoom } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapItem, MapItemList } from 'src/models/MapItem'
import Drawer from 'src/components/CustomDrawer'
import adminToolBox from 'components/Widgets/Map/AdminToolBox'
import MapFilters from './components/MapFilters'
import { copyText } from 'vue3-clipboard'
import { MapItemAction } from 'src/models/MapItemAction'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'BaseMap',
  props: {
    canEditMap: {
      type: Boolean,
      default: false
    },
    bounds: {
      default: null
    },
    zoom: {
      default: 1
    },
    center: {
      default: null
    },
    items: {
      type: MapItemList,
      default: new MapItemList()
    }
  },
  components: {
    adminToolBox,
    LMap,
    LControl,
    LControlZoom,
    LTileLayer,
    LIcon,
    LMarker,
    LPolyline,
    Drawer,
    MapFilters
  },
  filters: {

  },
  data () {
    return {
      filterDrawer: false,
      markerAddFlag: false,
      expansion: false,
      expansionVal: '',
      expansionIcon: '',
      toolsDrawer: false,
      filterValues: [],
      crs: null,
      mapZoom: 4,
      mapCenter: latLng(-8560, 21008),
      mapBounds: null,
      minZoom: 3.1,
      maxZoom: 11,
      maxBounds: null,
      maxBoundsViscosity: 1,
      currentZoom: 4,
      currentCenter: [0, 0],
      baseUrl: window.baseUrl,
      mapVersion: window.mapVersion,
      contentSearchApi: window.contentSearchApi,
      url: 'https://nodes.alaatv.com/upload/raheAbrishamMap/{z}/{x}/{y}.png?v=' + this.mapVersion,
      adminToolBox: {
        marker: {
          data: {
            latlng: {
              lng: 0,
              lat: 0
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
          type: {
            name: 'marker'
          }
        },
        polyline: {
          editMode: null
        }
      },
      polygon: {
        latlngs: [],
        color: 'green'
      },

      mapClickActionTypes: [
        {
          name: 'noAction',
          selected: true
        },
        {
          name: 'addIcon',
          selected: false
        },
        {
          name: 'addPolygonPoint',
          selected: false
        }
      ],
      mapOptions: {
        zoomSnap: 1,
        zoomAnimation: true
      }
    }
  },
  created () {
    this.initMap()
    this.initTemplateData()
  },
  computed: {
    selectedMapClickActionTypes () {
      return this.mapClickActionTypes.find(function (item) {
        return item.selected
      })
    },
  },
  methods: {
    reportAdminMarker (event) {
      console.log(event)
      this.adminToolBox.marker.data.latlng = event.latlng
    },
    updateAdminMarker(data) {
      this.adminToolBox.marker = data
      this.adminToolBox.marker.data.headline = data.data.headline
      if (data.data.headline.fillColor) {
        this.adminToolBox.marker.data.headline.fillColor = data.data.headline.fillColor
      }
      if (data.data.headline.strokeColor) {
        this.adminToolBox.marker.data.headline.strokeColor = data.data.headline.strokeColor
      }
      if (data.data.icon.options.iconAnchor) {
        // console.log('markerIcon', this.$refs.markerIcon)
        this.adminToolBox.marker.data.icon.options.iconAnchor = data.data.icon.options.iconAnchor
        this.adminToolBox.marker.data.icon.options.iconSize = data.data.icon.options.iconSize
      }
      console.log('admintoool',this.adminToolBox)
      // console.log(JSON.parse(JSON.stringify(this.adminToolBox.marker.data.icon.options.iconAnchor)))
    },

    mapClick (event) {
      console.log(event)
      if (this.selectedMapClickActionTypes.name === 'addIcon' && event.latlng) {
        // this.cleanAdminToolBoxMapItem()
        this.adminToolBox.marker.data.latlng = event.latlng
        this.adminToolBox.polyline.editMode = false
        this.adminToolBox.marker.editMode = true
        this.adminToolBox.marker.enable = true
        this.adminToolBox.marker.min_zoom = 11
        this.adminToolBox.marker.max_zoom = 11
        const newMapItemAction = new MapItemAction()
        this.adminToolBox.marker.action = newMapItemAction.getLink()
        this.setMapClickActionType('noAction')
        console.log(JSON.parse(JSON.stringify(this.adminToolBox)))
      }
    },
    addAdminMarker (data) {
      this.setMapClickActionType('addIcon')
    },
    setMapClickActionType (type) {
      for (let i = 0; typeof this.mapClickActionTypes[i] !== 'undefined'; i++) {
        this.mapClickActionTypes[i].selected = false
      }
      for (let i = 0; typeof this.mapClickActionTypes[i] !== 'undefined'; i++) {
        if (this.mapClickActionTypes[i].name === type) {
          this.mapClickActionTypes[i].selected = true
        }
      }
      this.polygon.latlngs = []
    },

    setFilters (e) {
      this.filterValues = e
      this.sendFilters()
    },
    expandPanel () {
      if (!this.expansion) {
        this.expansionIcon = 'mdi-plus'
        this.expansion = true
        this.expansionVal = '90%'
        return null
      }
      this.expansionIcon = 'isax:minus'
      this.expansion = false
      this.expansionVal = '0'
    },
    sendFilters () {
      console.log('sent')
    },
    openFilterDrawer () {
      this.filterDrawer = !this.filterDrawer
    },
    openToolsDrawer () {
      this.toolsDrawer = !this.toolsDrawer
    },
    showMessagesInNotify (message, type) {
      if (!type) {
        type = 'negative'
      }
      this.$q.notify({
        type,
        message
      })
    },
    copyToClipboard () {
      const shareLink = this.baseUrl + '/map?lat=' + this.currentCenter.lat + '&lng=' + this.currentCenter.lng + '&z=' + this.currentZoom
      console.log(shareLink)
      copyText('Text to copy', shareLink, (error, event) => {
        if (error) {
          this.showMessagesInNotify('مشکلی در گرفتن لینک رخ داده است.', 'negative')
          console.log(error)
        } else {
          this.showMessagesInNotify('لینک این قسمت از نقشه کپی شد.', 'positive')
          console.log(event)
        }
      })
    },


    initMap () {
      this.setCRS()
      this.setBounds()
      this.setCenter()
      this.setMaxBounds()
    },
    initTemplateData () {
      this.expansionIcon = 'isax:minus'
    },
    getCRS (mapExtent) {
      const mapMaxZoom = 10,
        mapMaxResolution = 0.12500000,
        mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution,
        tileExtent = mapExtent,
        crs = CRS.Simple
      crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3])
      crs.scale = function (zoom) {
        return Math.pow(2, zoom) / mapMinResolution
      }
      crs.zoom = function (scale) {
        return Math.log(scale * mapMinResolution) / Math.LN2
      }
      return crs
    },
    setCRS () {
      this.crs = this.getCRS([0.00000000, -15426.00000000, 26934.00000000, 0.00000000])
    },
    setBounds () {
      const down = -21040,
        left = 220,
        up = -920,
        right = 24550
      this.mapBounds = [[down, left], [up, right]]
    },
    setMaxBounds () {
      this.maxBounds = this.mapBounds
    },
    setCenter (lat, lng) {
      if (typeof lat === 'undefined') {
        lat = -12196
      }
      if (typeof lng === 'undefined') {
        lng = 22008
      }
      this.mapCenter = latLng(lat, lng)
      this.currentCenter = this.mapCenter
      // this.centerUpdated(this.mapCenter)
    },
    zoomUpdated (zoom) {
      this.currentZoom = zoom
      this.$emit('update:zoom', zoom)
    },
    centerUpdated (center) {
      this.currentCenter = center
      this.$emit('update:center', center)
    },
    boundsUpdated (bounds) {
      this.$emit('update:bounds', bounds)
    },
     saveMapItem () {
      let newMapItem = new MapItem(this.adminToolBox.marker);
      this.$axios.post(API_ADDRESS.map.items, newMapItem)
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteAdminMapItem(data) {
    },
    updateAdminPolyline(data) {
    },
    sidebarAdminToolBoxOnTabChange(tabName) {
    },
    openMapItemsList(mapItem) {
    },
    resetEditablePolylineToCenterOfMap() {

    }
  }
}
</script>

<style scoped>
.close-btn {
  width: 100%;
  border-radius: 0;
  color: #212529;
  background: #fbaa00;
}

</style>

<style scoped lang="scss">
.MapWidget {
  height: 100vh;
  width: 100%;

  &.setMarker .leaflet-grab {
    cursor: crosshair;
  }

  .leaflet-container{
    .leaflet-map-pane{
      .leaflet-marker-pane{
        .markerImage {
          text-align: center;
          width: 100%;
        }
      }
    }
  }
}
</style>

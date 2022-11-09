<template>
  <div class="MapWidget"
       :class="{setMarker: selectedMapClickActionTypes.name === 'addIcon'}"
       dir="ltr"
  >
    <l-map ref="lMap"
           v-model:zoom="mapZoom"
           v-model:center="mapCenter"
           v-model:options="mapOptions"
           :options="{zoomControl: false}"
           :min-zoom="minZoom"
           :max-zoom="maxZoom"
           :bounds="mapBounds"
           :maxBounds="maxBounds"
           :maxBoundsViscosity="maxBoundsViscosity"
           :crs="crs"
           @click="mapClick($event)"
           @update:zoom="zoomUpdated"
           @update:center="centerUpdated"
           @update:bounds="boundsUpdated">
      <l-tile-layer :url="url" />
      <l-control-zoom position="topright"></l-control-zoom>

      <div v-for="(item, idx) in items.list">
        <l-marker
          class="bg-red"
          :lat-lng="item.data.latlng"
          :draggable=true
          @click="openNode(item, idx)"
        >
          <l-icon
            v-if="item.data.icon.options.iconUrl"
            ref="markerIcon"
            :icon-url="item.data.icon.options.iconUrl"
            :icon-size="size"
            :icon-anchor="dynamicAnchor(item)"
            :shadow-url="item.data.icon.options.shadowUrl"
            :shadow-size="item.data.icon.options.shadowSize"
            :shadow-anchor="item.data.icon.options.shadowAnchor"
          >
            <div v-if="item.data.headline.text"
                 class="markerHeadline"
                 :style="{
                   fontSize: item.data.headline.fontSize+'px',
                   'text-fill-color': item.data.headline.fillColor,
                   '-webkit-text-fill-color': item.data.headline.fillColor,
                   'text-stroke-width': item.data.headline.strokeWidth+'px',
                   '-webkit-text-stroke-width': item.data.headline.strokeWidth+'px',
                   'text-stroke-color': item.data.headline.strokeColor,
                   '-webkit-text-stroke-color': item.data.headline.strokeColor
                 }"
                 v-html="item.data.headline.text"
            >
            </div>
            <img v-if="item.data.icon.options"
                 class="markerImage adminToolBoxMarker"
                 :class="{'border': item.editMode}"
                 :src="item.data.icon.options.iconUrl"
            >
          </l-icon>
        </l-marker>
      </div>

      <!--      <l-marker-->
      <!--        v-if="adminToolBox.marker.data.latlng"-->
      <!--        :lat-lng="adminToolBox.marker.data.latlng"-->
      <!--        :draggable=true-->
      <!--        :visible="adminToolBox.marker.editMode"-->
      <!--        @drag="reportAdminMarker"-->
      <!--      >-->
      <!--        <l-icon-->
      <!--          v-if="adminToolBox.marker.data.icon.options.iconUrl"-->
      <!--          ref="markerIcon"-->
      <!--          :icon-url="adminToolBox.marker.data.icon.options.iconUrl"-->
      <!--          :icon-size="dynamicSize"-->
      <!--          :icon-anchor="dynamicAnchor"-->
      <!--          :shadow-url="adminToolBox.marker.data.icon.options.shadowUrl"-->
      <!--          :shadow-size="adminToolBox.marker.data.icon.options.shadowSize"-->
      <!--          :shadow-anchor="adminToolBox.marker.data.icon.options.shadowAnchor"-->
      <!--        >-->
      <!--          <div v-if="adminToolBox.marker.data.headline.text"-->
      <!--               class="markerHeadline"-->
      <!--               :style="{-->
      <!--                 fontSize: adminToolBox.marker.data.headline.fontSize+'px',-->
      <!--                 'text-fill-color': adminToolBox.marker.data.headline.fillColor,-->
      <!--                 '-webkit-text-fill-color': adminToolBox.marker.data.headline.fillColor,-->
      <!--                 'text-stroke-width': adminToolBox.marker.data.headline.strokeWidth+'px',-->
      <!--                 '-webkit-text-stroke-width': adminToolBox.marker.data.headline.strokeWidth+'px',-->
      <!--                 'text-stroke-color': adminToolBox.marker.data.headline.strokeColor,-->
      <!--                 '-webkit-text-stroke-color': adminToolBox.marker.data.headline.strokeColor-->
      <!--               }"-->
      <!--               v-html="adminToolBox.marker.data.headline.text"-->
      <!--          >-->
      <!--          </div>-->
      <!--          <img v-if="adminToolBox.marker.data.icon.options"-->
      <!--               class="markerImage adminToolBoxMarker"-->
      <!--               :src="adminToolBox.marker.data.icon.options.iconUrl"-->
      <!--          >-->
      <!--        </l-icon>-->
      <!--      </l-marker>-->

      <l-control
        position="topleft"
      >
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          icon="isax:search-normal"
          @click="openFilterDrawer"
        />
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          icon="isax:edit"
          @click="openToolsDrawer"
        />
      </l-control>
      <l-control
        dir="rtl"
        position="topright"
      >
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          icon="isax:link"
          @click="copyToClipboard"
        >
        </q-btn>
        <div style="width: 130px; background: #ffffff8f;font-family: IRANSans;padding: 5px;border-radius: 5px;">
          زوم:
          {{ currentZoom }}
          <br>
          عرض:
          <span dir="ltr">
            {{ currentCenter.lat }}
          </span>
          <br>
          طول:
          <span dir="ltr">
            {{ currentCenter.lng }}
          </span>
        </div>
      </l-control>
    </l-map>
  </div>
  <drawer max-width="300px"
          :is-open="filterDrawer"
          :background-color="'rgba(255, 255, 255, 0.65) none repeat scroll 0% 0%'"
          side="left">
    <q-btn icon="mdi-close"
           unelevated
           class="close-btn"
           @click="filterDrawer = false;
                   isMapInfo = false" />
    <map-filters v-if="isMapFilters"
                 @filter-values="setFilters" />
    <map-info v-if="isMapInfo"
              @go_to_marker="goToMarker" />
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
               @click="toolsDrawer = false; adminToolBox.marker.editMode = false" />
      </div>
      <div>
        <admin-tool-box
          ref="adminToolBox"
          :center="currentCenter"
          :zoom="currentZoom"
          :marker="adminToolBox.marker"
          :polyline="adminToolBox.polyline"
          :tool-tab="tabName"
          @add_marker="addAdminMarker"
          @save_marker="saveMapItem"
          @show-map-info="showMapInfo"
          @marker_change="updateAdminToolBoxMarker"
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
import mapInfo from './components/mapInfo'
import { copyText } from 'vue3-clipboard'
import { MapItemAction } from 'src/models/MapItemAction'
import API_ADDRESS from 'src/api/Addresses'
import MapItemsResponse from './MapItemsResponse'
import ItemEntity from 'components/FormBuilderCustumComponents/Map/ItemEntity'
import activityType from 'components/FormBuilderCustumComponents/Map/ActivityType'
import MapItemEntity from 'src/models/MapItemEntity'

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
    MapFilters,
    mapInfo
  },
  filters: {},
  data() {
    return {
      nodes: [],
      size: [70, 70],
      tabName: null,
      centerLatLong: {},
      isMapFilters: false,
      isMapInfo: false,
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
          id: 0,
          action: {},
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
          enable: 1,
          tags: [],
          min_zoom: 3.1,
          max_zoom: 11,
          editMode: false,
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
  created() {
    this.getNodes()
    this.initMap()
    this.initTemplateData()
    this.$store.commit('AppLayout/updateLayoutFooterVisible', false)
  },
  beforeUnmount() {
    this.$store.commit('AppLayout/updateLayoutFooterVisible', true)
  },
  watch: {
    itemsList: {
      handler(n) {
        console.log(n)
      },
      deep: true
    }
  },
  computed: {
    selectedMapClickActionTypes() {
      return this.mapClickActionTypes.find(function(item) {
        return item.selected
      })
    },
    itemsList() {
      return this.items
    },
    dynamicAnchor() {
      return (item) => {
        return [item.data.icon.options.iconAnchor[0], item.data.icon.options.iconAnchor[1]]
      }
    },
    dynamicSize() {
      return (item) => {
        return [item.data.icon.options.iconSize, item.data.icon.options.iconSize]
      }
    }
  },
  methods: {
    openNode(item, index) {
      // console.log(item)
      if (this.toolsDrawer) {
        this.adminToolBox.polyline.editMode = false
        this.adminToolBox.marker.editMode = true
        this.$refs.adminToolBox.setInput(item)
        // this.$emit('change_edit_mode', index)
        this.updateAdminToolBoxMarker(item, index)
      } else {
        window.open(item.action.data.link)
      }
    },
    goToMarker(data) {
      // console.log(data)
      this.mapZoom = 11
      setTimeout(() => {
        this.mapCenter = latLng(data.row.data.latlng.lat, data.row.data.latlng.lng)
        this.centerUpdated(this.mapCenter)
      }, 50)
      this.toolsDrawer = true
      this.items.list.forEach(item => {
        item.editMode = false
      })
      this.$emit('change_edit_mode', data.index)
      this.sidebarAdminToolBoxOnTabChange('marker')
      this.adminToolBox.marker.data.latlng = data.row.data.latlng
      this.adminToolBox.polyline.editMode = false
      this.adminToolBox.marker.editMode = true
      this.adminToolBox.marker.min_zoom = 11
      this.adminToolBox.marker.max_zoom = 11
      this.setMapClickActionType('noAction')
      this.updateAdminToolBoxMarker(data.row, data.index)
      this.$nextTick(() => {
        this.$refs.adminToolBox.setInput(data.row)
      })
    },
    reportAdminMarker(event) {
      // console.log(event)
      this.adminToolBox.marker.data.latlng = event.latlng
    },
    updateAdminMarker(data, index) {
      this.$emit('update:item', {
        data,
        index
      })
    },
    updateAdminToolBoxMarker(data, index) {
      if (data.id) {
        this.adminToolBox.marker.id = data.id
      }
      if (data.action) {
        if (typeof data.action === 'object') {
          this.adminToolBox.marker.action = new MapItemAction(data.action)
        } else {
          this.adminToolBox.marker.action = new MapItemAction(JSON.parse(data.action))
        }
      }
      if (data.enable) {
        this.adminToolBox.marker.enable = data.enable
      }
      if (data.data.headline.fillColor) {
        this.adminToolBox.marker.data.headline.fillColor = data.data.headline.fillColor
      }
      if (data.data.headline.strokeColor) {
        this.adminToolBox.marker.data.headline.strokeColor = data.data.headline.strokeColor
      }
      if (data.data.headline.fontSize) {
        this.adminToolBox.marker.data.headline.fontSize = data.data.headline.fontSize
      }
      if (data.data.headline.strokeWidth) {
        this.adminToolBox.marker.data.headline.strokeWidth = data.data.headline.strokeWidth
      }
      if (data.data.headline.text) {
        this.adminToolBox.marker.data.headline.text = data.data.headline.text
      }
      if (data.data.icon.options.iconAnchor) {
        this.adminToolBox.marker.data.icon.options.iconAnchor[0] = data.data.icon.options.iconAnchor[0]
        this.adminToolBox.marker.data.icon.options.iconAnchor[1] = data.data.icon.options.iconAnchor[1]
        this.adminToolBox.marker.data.icon.options.iconSize = data.data.icon.options.iconSize
      }
      if (data.data.icon.options.iconSize) {
        this.adminToolBox.marker.data.icon.options.iconSize = data.data.icon.options.iconSize[0]
      }
      if (data.data.icon.options.iconUrl) {
        this.adminToolBox.marker.data.icon.options.iconUrl = data.data.icon.options.iconUrl
      }
      if (data.data.latlng) {
        this.adminToolBox.marker.data.latlng = data.data.latlng
      }
      if (data.tags) {
        this.adminToolBox.marker.tags = data.tags
      }
      if (data.min_zoom) {
        this.adminToolBox.marker.min_zoom = data.min_zoom
      }
      if (data.max_zoom) {
        this.adminToolBox.marker.max_zoom = data.max_zoom
      }
      if (!index) {
        const index = this.items.list.findIndex(item => item.id === this.adminToolBox.marker.id)
        this.updateAdminMarker(data, index)
      } else {
        this.updateAdminMarker(data, index)
      }
    },

    mapClick(event) {
      // console.log(event)
      if (this.selectedMapClickActionTypes.name === 'addIcon' && event.latlng) {
        // this.cleanAdminToolBoxMapItem()
        this.adminToolBox.marker.data.latlng = event.latlng
        this.adminToolBox.polyline.editMode = false
        this.adminToolBox.marker.editMode = true
        this.adminToolBox.marker.enable = true
        this.adminToolBox.marker.min_zoom = 11
        this.adminToolBox.marker.max_zoom = 11
        this.$emit('add_marker', event)
        const newMapItemAction = new MapItemAction()
        this.adminToolBox.marker.action = newMapItemAction.getLink()
        this.setMapClickActionType('noAction')
      }
    },
    addAdminMarker(data) {
      // console.log(data)
      this.setMapClickActionType('addIcon')
    },
    setMapClickActionType(type) {
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

    setFilters(e) {
      this.filterValues = e
      this.sendFilters()
    },
    expandPanel() {
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
    sendFilters() {
      console.log('sent')
    },
    openFilterDrawer() {
      this.filterDrawer = !this.filterDrawer
      this.isMapFilters = true
    },
    showMapInfo() {
      this.filterDrawer = true
      this.isMapFilters = false
      this.isMapInfo = true
    },
    openToolsDrawer() {
      this.toolsDrawer = !this.toolsDrawer
      this.sidebarAdminToolBoxOnTabChange('marker')
    },
    showMessagesInNotify(message, type) {
      if (!type) {
        type = 'negative'
      }
      this.$q.notify({
        type,
        message
      })
    },
    copyToClipboard() {
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

    initMap() {
      this.setCRS()
      this.setBounds()
      this.setCenter()
      this.setMaxBounds()
    },
    initTemplateData() {
      this.expansionIcon = 'isax:minus'
    },
    getCRS(mapExtent) {
      const mapMaxZoom = 10,
        mapMaxResolution = 0.12500000,
        mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution,
        tileExtent = mapExtent,
        crs = CRS.Simple
      crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3])
      crs.scale = function(zoom) {
        return Math.pow(2, zoom) / mapMinResolution
      }
      crs.zoom = function(scale) {
        return Math.log(scale * mapMinResolution) / Math.LN2
      }
      return crs
    },
    setCRS() {
      this.crs = this.getCRS([0.00000000, -15426.00000000, 26934.00000000, 0.00000000])
    },
    setBounds() {
      const down = -21040,
        left = 220,
        up = -920,
        right = 24550
      this.mapBounds = [[down, left], [up, right]]
    },
    setMaxBounds() {
      this.maxBounds = this.mapBounds
    },
    setCenter(lat, lng) {
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
    zoomUpdated(zoom) {
      // console.log(this.items)
      this.currentZoom = zoom
      this.$emit('update:zoom', zoom)
    },
    centerUpdated(center) {
      this.currentCenter = center
      this.$emit('update:center', center)
    },
    boundsUpdated(bounds) {
      this.$emit('update:bounds', bounds)
    },
    getNodes() {
      this.$axios.get('alaa/api/v2/dar/divar')
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          this.node = MapItemsResponse.data
        })
    },
    saveMapItem() {
      const newMapItem = new MapItem(this.adminToolBox.marker)
      console.log(newMapItem)
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
      this.tabName = tabName
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
::-webkit-scrollbar-thumb {
  direction: ltr;
}

.MapWidget {
  height: 100vh;
  width: 100%;

  //.marker {
  //  border: 1px dotted black
  //}

  &.setMarker .leaflet-grab {
    cursor: crosshair;
  }

  .leaflet-container {
    .leaflet-map-pane {
      .leaflet-marker-pane {
        .markerImage {
          text-align: center;
          width: 100%;
        }

        .border {
          border: 1px dotted black
        }
      }
    }
  }
}
</style>

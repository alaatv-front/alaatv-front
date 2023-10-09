<template>
  <div class="MapWidget"
       :class="{setMarker: selectedMapClickActionTypes.name === 'addIcon'}"
       dir="ltr">
    <q-no-ssr>
      <l-map id="map"
             ref="lMap"
             v-model:zoom="mapZoom"
             v-model:center="mapCenter"
             v-model:options="mapOptions"
             :min-zoom="minZoom"
             :max-zoom="maxZoom"
             :bounds="mapBounds"
             :max-bounds="maxBounds"
             :maxBoundsViscosity="maxBoundsViscosity"
             :zoom-animation="true"
             :crs="crs"
             @click="mapClick($event)"
             @update:zoom="zoomUpdated"
             @update:center="centerUpdated"
             @update:bounds="boundsUpdated">
        <l-tile-layer :url="url" />

        <div v-for="(item, index) in items.list"
             :key="index">
          <l-marker v-bind:key="item.id"
                    :lat-lng="item.data.latlng"
                    :draggable=true
                    @click="openNode(item)">
            <l-icon v-if="item.data.icon.options"
                    ref="markerIcon"
                    :icon-url="item.data.icon.options.iconUrl"
                    :icon-size="dynamicSize(item)"
                    :icon-anchor="dynamicAnchor(item)"
                    :shadow-url="item.data.icon.options.shadowUrl"
                    :shadow-size="item.data.icon.options.shadowSize"
                    :shadow-anchor="item.data.icon.options.shadowAnchor">
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
                   v-html="item.data.headline.text" />
              <img v-if="item.data.icon.options.iconUrl"
                   class="markerImage adminToolBoxMarker"
                   :class="{'border': item && item.editMode}"
                   :src="item.data.icon.options.iconUrl">
              <q-icon v-else
                      name="ph:map-pin" />
            </l-icon>
          </l-marker>
          <l-polyline v-if="(item.type.name === 'polyline' || item.type.id === 2) && item.data.line && item.data.line.options"
                      :options="item.data.line.options"
                      :lat-lngs="item.data.latlngs"
                      :color="item.data.line.color"
                      :bubblingMouseEvents="item.data.line.bubblingMouseEvents"
                      :dashArray="item.data.line.dashArray"
                      :dashOffset="item.data.line.dashOffset"
                      :weight="item.data.line.weight" />
        </div>

        <l-marker v-if="adminToolBox.marker.data.latlng"
                  :lat-lng="adminToolBox.marker.data.latlng"
                  :draggable=true
                  @dragend="reportAdminMarker"
                  @click="openMarker">
          <l-icon v-if="adminToolBox.marker.data.icon.options"
                  ref="markerIcon"
                  :icon-url="adminToolBox.marker.data.icon.options.iconUrl"
                  :icon-size="dynamicSize(adminToolBox.marker)"
                  :icon-anchor="dynamicAnchor(adminToolBox.marker)"
                  :shadow-url="adminToolBox.marker.data.icon.options.shadowUrl"
                  :shadow-size="adminToolBox.marker.data.icon.options.shadowSize"
                  :shadow-anchor="adminToolBox.marker.data.icon.options.shadowAnchor">
            <div v-if="adminToolBox.marker.data.headline.text"
                 class="markerHeadline"
                 :style="{
                   fontSize: adminToolBox.marker.data.headline.fontSize+'px',
                   'text-fill-color': adminToolBox.marker.data.headline.fillColor,
                   '-webkit-text-fill-color': adminToolBox.marker.data.headline.fillColor,
                   'text-stroke-width': adminToolBox.marker.data.headline.strokeWidth+'px',
                   '-webkit-text-stroke-width': adminToolBox.marker.data.headline.strokeWidth+'px',
                   'text-stroke-color': adminToolBox.marker.data.headline.strokeColor,
                   '-webkit-text-stroke-color': adminToolBox.marker.data.headline.strokeColor
                 }"
                 v-html="adminToolBox.marker.data.headline.text" />
            <img v-if="adminToolBox.marker.data.icon.options.iconUrl"
                 class="markerImage adminToolBoxMarker"
                 :class="{'border': adminToolBox.marker.editMode}"
                 :src="adminToolBox.marker.data.icon.options.iconUrl">
            <q-icon v-else
                    name="ph:map-pin" />
          </l-icon>
        </l-marker>

        <l-control position="topleft">
          <q-btn class="btnMapControl btnGetLinkToShare"
                 icon="isax:search-normal"
                 @click="openFilterDrawer" />
          <q-btn class="btnMapControl btnGetLinkToShare"
                 icon="isax:edit"
                 @click="openToolsDrawer" />
        </l-control>
        <l-control dir="rtl"
                   position="topright">
          <q-btn class="btnMapControl btnGetLinkToShare"
                 icon="isax:link"
                 @click="copyToClipboard" />
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
    </q-no-ssr>
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
        <admin-tool-box ref="adminToolBox"
                        :center="currentCenter"
                        :zoom="currentZoom"
                        :buffer-marker="adminToolBox.marker"
                        :selected-marker="selectedMarker"
                        :polyline="adminToolBox.polyline"
                        :tool-tab="tabName"
                        @add_marker="addAdminMarker"
                        @save_marker="saveMapItem"
                        @show-map-info="showMapInfo"
                        @marker_change="updateAdminMarker"
                        @delete_marker="deleteAdminMapItem"
                        @add-polyline="addAdminPolyline"
                        @delete_polyline="deleteAdminMapItem"
                        @save_polyline="saveMapItem"
                        @polyline_change="updateAdminPolyline"
                        @tab_changed="sidebarAdminToolBoxOnTabChange"
                        @open_map_items_list="openMapItemsList"
                        @reset_editable_polyline_to_center_of_map="resetEditablePolylineToCenterOfMap" />
      </div>
    </q-scroll-area>
  </drawer>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import mapInfo from './components/mapInfo.vue'
import MapFilters from './components/MapFilters.vue'
import Drawer from 'src/components/CustomDrawer.vue'
import MapItemsResponse from './MapItemsResponse.js'
import { MapItem, MapItemList } from 'src/models/MapItem.js'
import adminToolBox from 'components/Widgets/Map/AdminToolBox.vue'
let LMap, LTileLayer, LMarker, LIcon, LControl, LPolyline, CRS, latLng
// import { CRS, latLng } from 'leaflet'
// import { LMap, LTileLayer, LMarker, LIcon, LControl, LPolyline } from '@vue-leaflet/vue-leaflet'

if (typeof window !== 'undefined') {
  import('leaflet')
    .then((LeafLet) => {
      CRS = LeafLet.CRS
      latLng = LeafLet.latLng
    })
  import('@vue-leaflet/vue-leaflet')
    .then((VueLeaflet) => {
      LMap = VueLeaflet.LMap
      LIcon = VueLeaflet.LIcon
      LMarker = VueLeaflet.LMarker
      LControl = VueLeaflet.LControl
      LPolyline = VueLeaflet.LPolyline
      LTileLayer = VueLeaflet.LTileLayer
    })
}

// import { copyText } from 'vue3-clipboard'
// import { MapItemAction } from 'src/models/MapItemAction'
// import EditablePolyline from 'vue-leaflet-editable-polyline'

export default {
  name: 'BaseMap',
  components: {
    adminToolBox,
    LMap,
    LControl,
    LTileLayer,
    LIcon,
    LMarker,
    LPolyline,
    Drawer,
    MapFilters,
    mapInfo
  },
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
  emits: ['add_marker', 'change_edit_mode', 'update:item', 'update:zoom', 'update:center', 'update:bounds', 'update:visible-map-items'],
  data() {
    return {
      nodes: [],
      editablePolylinelatlngs: [],
      selectedMarker: new MapItem(),
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
      crs: CRS?.Simple,
      mapZoom: 3,
      mapCenter: null,
      mapBounds: null,
      minZoom: 3,
      maxZoom: 11,
      maxBounds: null,
      maxBoundsViscosity: 1,
      currentZoom: 3,
      currentCenter: [0, 0],
      baseUrl: '',
      mapVersion: '',
      contentSearchApi: '',
      url: '',
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
                iconSize: [70, 70]
              }
            }
          },
          enable: 1,
          tags: [],
          min_zoom: 3,
          max_zoom: 11,
          editMode: false,
          type: {
            name: 'marker'
          }
        },
        polyline: {
          action: {},
          enable: 1,
          min_zoom: 3,
          max_zoom: 11,
          data: {
            line: {
              className: '',
              bubblingMouseEvents: false,
              options: {
                flowing: {
                  dir: 'fixed',
                  style: { 'animation-duration': 20 }
                }
              },
              color: 'red',
              weight: 5,
              dashArray: '10 30',
              dashOffset: '0'
            },
            displayZoom: 3,
            iconSize: [16, 16],
            iconAnchor: [10, 10]
          },
          latlngs: [[-5840, 23056], [-4000, 2500], [-9000, 8000]],
          editMode: false,
          tags: [],
          type: {
            name: 'polyline'
          }
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
        zoomControl: true,
        zoomSnap: 1
      }
    }
  },
  computed: {
    // calcMapHeight() {
    //
    // },
    selectedMapClickActionTypes() {
      return this.mapClickActionTypes.find(function(item) {
        return item.selected
      })
    },
    dynamicUrl() {
      return (item) => {
        return item.data.icon.options.iconUrl
      }
    },
    dynamicAnchor() {
      return (item) => {
        return [
          item.data.icon.options.iconAnchor[0] + item.data.icon.options.iconSize[0] / 2,
          item.data.icon.options.iconAnchor[1] + item.data.icon.options.iconSize[1] / 2
        ]
      }
    },
    dynamicSize() {
      return (item) => {
        return [item.data.icon.options.iconSize[0], item.data.icon.options.iconSize[1]]
      }
    }
  },
  mounted () {
    // this.getNodes()
    this.baseUrl = window.baseUrl
    this.mapVersion = window.mapVersion
    this.contentSearchApi = window.contentSearchApi
    this.url = 'https://nodes.alaatv.com/upload/raheAbrishamMap/{z}/{x}/{y}.png?v=' + this.mapVersion
    this.crs = CRS?.Simple
    this.mapCenter = latLng(-12000, 13200)
    this.initMap()
    this.initTemplateData()
  },
  // watch: {
  //   adminToolBox: {
  //     handler(newVal) {
  //       this.editablePolylinelatlngs = newVal.polyline.latlngs
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    // updateEditablePolylineLatlngs(event, item, index) {
    //   const lat = event.target._latlng.lat
    //   const lng = event.target._latlng.lng
    //   this.adminToolBox.polyline.latlngs[index][0] = lat
    //   this.adminToolBox.polyline.latlngs[index][1] = lng
    //   // this.editablePolylinelatlngs = this.adminToolBox.polyline.latlngs
    //   this.resetEditablePolylineLatlngs()
    // },
    // resetEditablePolylineLatlngs() {
    //   this.editablePolylinelatlngs = this.adminToolBox.polyline.latlngs
    // },
    updateLatlngs(latlngs) {
      this.adminToolBox.polyline.latlngs = latlngs
    },
    openMarker() {
      this.adminToolBox.polyline.editMode = false
      this.adminToolBox.marker.editMode = true
      this.$nextTick(() => {
        this.$refs.adminToolBox.setInput(this.adminToolBox.marker)
      })
    },
    openNode(item) {
      this.cleanAdminToolBoxMapItem()
      this.$emit('update:visible-map-items')
      this.selectedMarker = new MapItem(item)
      if (this.toolsDrawer) {
        this.adminToolBox.marker.editMode = false
        this.selectedMarker.editMode = true
        this.selectedMarker.type.name = 'marker'
        this.selectedMarker.min_zoom = 11
        this.$nextTick(() => {
          this.$refs.adminToolBox.setInput(item)
        })
      } else {
        window.open(item.action.data.link)
      }
    },
    goToMarker(data) {
      this.cleanAdminToolBoxMapItem()
      this.mapZoom = 11
      setTimeout(() => {
        this.mapCenter = latLng(data.row.data.latlng.lat, data.row.data.latlng.lng)
        this.centerUpdated(this.mapCenter)
      }, 50)
      this.toolsDrawer = true
      this.$emit('update:visible-map-items')
      this.sidebarAdminToolBoxOnTabChange('marker')
      this.adminToolBox.polyline.editMode = false
      this.adminToolBox.marker.editMode = false
      this.selectedMarker = new MapItem(data.row)
      this.selectedMarker.editMode = true
      this.selectedMarker.type.name = 'marker'
      this.$nextTick(() => {
        this.$refs.adminToolBox.setInput(data.row)
      })
      this.updateAdminMarker(data.row)
    },
    reportAdminMarker(event) {
      this.adminToolBox.marker.data.latlng = event.target._latlng
    },
    updateAdminMarker(data) {
      const index = this.items.list.findIndex(item => item.id === data.id)
      if (index === -1) {
        this.updateAdminToolBoxMarker(data)
      } else {
        this.$emit('update:item', {
          data,
          index
        })
      }
    },
    updateAdminToolBoxMarker(data) {
      this.adminToolBox.marker = new MapItem(data)
    },

    mapClick(event) {
      if (this.selectedMapClickActionTypes.name === 'addIcon' && event.latlng) {
        if (!this.adminToolBox.polyline.editMode) {
          this.cleanAdminToolBoxMapItem()
          const lat = event.latlng.lat
          const lng = event.latlng.lng
          this.adminToolBox.marker.data.latlng = latLng(lat, lng)
          this.selectedMarker.editMode = false
          this.adminToolBox.polyline.editMode = false
          this.adminToolBox.marker.editMode = true
          this.adminToolBox.marker.id = 0
          this.$nextTick(() => {
            this.$refs.adminToolBox.setInput(this.adminToolBox.marker)
          })
          this.setMapClickActionType('noAction')
        }
      }
    },
    addAdminMarker(data) {
      this.setMapClickActionType('addIcon')
    },
    addAdminPolyline() {
      this.setMapClickActionType('addIcon')
      this.adminToolBox.polyline.editMode = true
      // this.adminToolBox.polyline.latlngs = []
      // const pointA = [this.mapCenter.lat, this.mapCenter.lng]
      // const pointB = [this.mapCenter.lat + 500, this.mapCenter.lng + 500]
      // this.adminToolBox.polyline.latlngs.push(pointA, pointB)
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
      // console.log('sent')
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
      // ToDo: use quasar clipboard
      // const shareLink = this.baseUrl + '/map?lat=' + this.currentCenter.lat + '&lng=' + this.currentCenter.lng + '&z=' + this.currentZoom
      // console.log(shareLink)
      // copyText('Text to copy', shareLink, (error, event) => {
      //   if (error) {
      //     this.showMessagesInNotify('مشکلی در گرفتن لینک رخ داده است.', 'negative')
      //     console.log(error)
      //   } else {
      //     this.showMessagesInNotify('لینک این قسمت از نقشه کپی شد.', 'positive')
      //     console.log(event)
      //   }
      // })
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
        // tileExtent = mapExtent,
        crs = CRS?.Simple
      // crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3])
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
      const down = -20140,
        left = 220,
        up = -920,
        right = 29650
      this.mapBounds = [[down, left], [up, right]]
    },
    setMaxBounds() {
      this.maxBounds = this.mapBounds
    },
    setCenter(lat, lng) {
      if (typeof lat === 'undefined') {
        lat = 0
      }
      if (typeof lng === 'undefined') {
        lng = 0
      }
      this.mapCenter = latLng(lat, lng)
      this.currentCenter = this.mapCenter
    },
    zoomUpdated(zoom) {
      this.currentZoom = zoom
      if (this.currentZoom === 3.1) {
        this.maxBounds = this.mapBounds
      } else {
        this.maxBounds = [[-20200, 200], [-700, 29700]]
      }
      this.$emit('update:zoom', zoom)
    },
    centerUpdated(center) {
      this.currentCenter = center
      this.$emit('update:center', center)
    },
    boundsUpdated(bounds) {
      this.$emit('update:bounds', bounds)
    },
    cleanAdminToolBoxMapItem() {
      this.adminToolBox.marker = {
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
              iconSize: [70, 70]
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
      }
    },
    getNodes() {
      this.$axios.get('/dar/divar')
        .then(() => {
          // console.log(res)
        })
        .catch(e => {
          this.node = MapItemsResponse.data
        })
    },
    saveMapItem() {
      const newMapItem = new MapItem(this.adminToolBox.marker)
      APIGateway.map.saveMapItem(newMapItem)
        .then(() => {})
        .catch(() => {})
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
@import "leaflet/dist/leaflet.css";

::-webkit-scrollbar-thumb {
  direction: ltr;
}

.MapWidget {
  height: 92vh;
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
          border: 1px dotted black;
        }
      }
    }
  }
}
</style>

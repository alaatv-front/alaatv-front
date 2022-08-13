<template>
  <div class="MapWidget"
       dir="ltr">
    <l-map ref="lMap"
           @click="mapClick"
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
      <template v-for="item in items.list"
                :key="item.id">

        <l-marker
          :lat-lng="item.data.latlng"
          :draggable="false"
          @add="onAddMarker($event, item)"
          @click="onClickedMarker($event, item)"
        >
          <l-icon
            :icon-url="item.data.icon.options.iconUrl"
            :icon-size="item.data.icon.options.iconSize"
            :icon-anchor="item.data.icon.options.iconAnchor"
            :shadow-url="item.data.icon.options.shadowUrl"
            :shadow-size="item.data.icon.options.shadowSize"
            :shadow-anchor="item.data.icon.options.shadowAnchor">
            <div class="markerHeadline"
                 v-html="item.data.headline.text"
                 :style="{
                   fontSize: item.data.headline.fontSize+'px',
                   'text-fill-color': item.data.headline.fillColor,
                   '-webkit-text-fill-color': item.data.headline.fillColor,
                   'text-stroke-width': item.data.headline.strokeWidth+'px',
                   '-webkit-text-stroke-width': item.data.headline.strokeWidth+'px',
                   'text-stroke-color': item.data.headline.strokeColor,
                   '-webkit-text-stroke-color': item.data.headline.strokeColor
                 }"
            >
            </div>
            <!--                        <i class="fa fa-edit editMapItem" v-if="item.editMode"></i>-->
            <img
              :src="item.data.icon.options.iconUrl"
              class="markerImage"
            >
          </l-icon>
          <!--                    <l-popup-->
          <!--                        v-if="editMapMode"-->
          <!--                        :contenta="'<div>disable</div>'"-->
          <!--                        :options="{ autoClose: false, closeOnClick: false }"-->
          <!--                    >-->
          <!--                    </l-popup>-->
        </l-marker>
        <l-polyline
          v-if="item.data.line && item.data.line.options"
          :options="item.data.line.options"
          :lat-lngs="item.data.latlngs"
          :color="item.data.line.color"
          :bubblingMouseEvents="item.data.line.bubblingMouseEvents"
          :dashArray="item.data.line.dashArray"
          :dashOffset="item.data.line.dashOffset"
          :weight="item.data.line.weight"
          @add="onAddPolyline($event, item)"
          @click="onClickedPolyline($event, item)"
        >
          <!--                    <l-popup :content="'<div>disable</div>'" :options="{ autoClose: false, closeOnClick: false }"></l-popup>-->
        </l-polyline>
      </template>
      <l-control
        dir="rtl"
        position="topright"
      >
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          @click="openFilterDrawer"
          icon="isax:edit"
        />
        <q-btn
          class="btnMapControl btnGetLinkToShare"
          @click="openToolsDrawer"
          icon="isax:search-normal"
        />
      </l-control>
      <l-control
        dir="rtl"
        position="topleft"
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
          <span dir="rtl">
            {{ currentCenter.lat | latlang }}
          </span>
          <br>
          طول:
          <span dir="rtl">
            {{ currentCenter.lng | latlang }}
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
      <map-filters />
    </q-scroll-area>
  </drawer>
  <drawer max-width="700px"
          :is-open="toolsDrawer"
          side="right">
    <q-scroll-area class="fit">
      <q-btn icon="mdi-close"
             unelevated
             class="close-btn"
             @click="toolsDrawer = false" />
      <div>
        <!--      ------------------tools content------------    -->
      </div>
    </q-scroll-area>
  </drawer>
</template>

<script>
import L, { CRS, latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPolyline, LIcon, LControl } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapItemList } from 'src/models/MapItem'
import Drawer from 'src/components/CustomDrawer'
import MapFilters from './components/MapFilters'

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
    LMap,
    LControl,
    LTileLayer,
    LIcon,
    LMarker,
    LPolyline,
    Drawer,
    MapFilters
  },
  filters: {
    latlang (value) {
      if (!value) return ''
      return parseFloat(value.toString()).toFixed(3)
    }
  },
  data () {
    return {
      filterDrawer: false,
      toolsDrawer: false,

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
      url: 'https://nodes.alaatv.com/upload/raheAbrishamMap/{z}/{x}/{y}.png?v=' + this.mapVersion,
      mapOptions: {
        zoomSnap: 1,
        zoomAnimation: true
      }
    }
  },
  created () {
    this.initMap()
  },
  methods: {
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
      this.$copyText(('Text to copy'), shareLink).then(function (e) {
        this.showMessagesInNotify('لینک این قسمت از نقشه کپی شد.', 'positive')
      }, function (e) {
        this.showMessagesInNotify('مشکلی در گرفتن لینک رخ داده است.', 'negative')
      })
    },

    onAddMarker (event, item) {
      // console.log('onAddMarker', { event, item })
    },
    onClickedMarker (event, item) {
      // console.log('onClickedMarker', { event, item })
    },
    onAddPolyline (event, item) {
      // console.log('onAddPolyline', { event, item })
    },
    onClickedPolyline (event, item) {
      // console.log('onClickedPolyline', { event, item })
    },

    addMarker () {
      L.circleMarker([54.990303, -8.525841], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500 })
        .addTo(this.$refs.lMap.root)
    },
    initMap () {
      this.setCRS()
      this.setBounds()
      this.setCenter()
      this.setMaxBounds()
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
      const down = -20140,
        left = -900,
        up = -920,
        right = 29700
      this.mapBounds = [[down, left], [up, right]]
    },
    setMaxBounds () {
      this.maxBounds = this.bounds
    },
    setCenter (lat, lng) {
      if (typeof lat === 'undefined') {
        lat = -8560
      }
      if (typeof lng === 'undefined') {
        lng = 21008
      }
      this.mapCenter = latLng(lat, lng)
      // this.centerUpdated(this.mapCenter)
    },
    zoomUpdated (zoom) {
      this.currentZoom = zoom
      this.$emit('update:zoom', zoom)
    },
    centerUpdated (center) {
      this.$emit('update:center', center)
    },
    boundsUpdated (bounds) {
      this.$emit('update:bounds', bounds)
    },
    mapClick (event) {
      this.$emit('onClicked', event)
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

.MapWidget {
  height: 70vh;
  width: 100%;
}
</style>

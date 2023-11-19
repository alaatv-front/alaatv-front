<template>
  <div class="adminToolBox">

    <div class="ToolBoxHeader">
      <div class="rightSide">
        <q-icon size="24px"
                name="isax:designtools" />
        <span class="header-title"> جعبه ابزار</span>
      </div>
      <div class="leftSide">
        <q-btn flat
               class=""
               icon="isax:signpost"
               @click="tabChanged('marker')">
          <q-tooltip anchor="top middle"
                     self="bottom middle"
                     :offset="[10, 10]">
            Marker
          </q-tooltip>
        </q-btn>
        <q-btn flat
               class=""
               icon="isax:chart-square"
               @click="tabChanged('polyline')">
          <q-tooltip anchor="top middle"
                     self="bottom middle"
                     :offset="[10, 10]">
            Polyline
          </q-tooltip>
        </q-btn>
        <q-btn flat
               class=""
               icon="isax:menu-1"
               @click="showMapInfo">
          <q-tooltip anchor="top middle"
                     self="bottom middle"
                     :offset="[10, 10]">
            Map Info
          </q-tooltip>

        </q-btn>
      </div>
    </div>

    <q-separator color="gray"
                 inset />

    <div v-if="toolTab === 'marker'"
         class="MarkerFormBuilderContainer q-pa-sm bg-transparent">

      <div v-if="canShowGeneralData"
           class="MarkerFormBuilder">
        <form-builder ref="markerInputsFormBuilder"
                      v-model:value="markerInputs" />
      </div>
      <q-btn class="addMarkerBtn q-mb-xs"
             color="green-6"
             icon="isax:element-plus"
             @click="addMarker" />
      <div v-if="bufferMarker.editMode || selectedMarker.editMode"
           class="markerToolBoxBtns">
        <q-btn class="btns"
               color="primary"
               icon="isax:copy" />
        <q-btn class="btns"
               color="primary"
               icon="isax:save-remove"
               @click="saveMarker" />
        <q-btn class="btns"
               color="red-6"
               icon="isax:trash" />
      </div>

    </div>

    <div v-if="toolTab === 'polyline'"
         class="PolylineFormBuilderContainer q-pa-sm">

      <div v-if="canShowGeneralData"
           class="PolylineFormBuilder">
        <form-builder ref="polylineInputsFormBuilder"
                      v-model:value="polylineInputs" />

      </div>
      <q-btn class="addPolyLineBtn q-mb-xs"
             icon="isax:refresh"
             @click="addPolyLine" />
      <div v-if="bufferPolyline.editMode"
           class="PolylineToolBoxBtns">
        <q-btn class="btns"
               color="blue-6"
               icon="isax:copy" />
        <q-btn class="btns"
               color="blue-6"
               icon="isax:save-remove" />
        <q-btn class="btns"
               color="red-6"
               icon="isax:trash" />

      </div>

    </div>

  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { FormBuilder } from 'quasar-form-builder'

import { MapItem } from 'src/models/MapItem.js'
import MapItemEntity from 'src/models/MapItemEntity.js'
import { MapItemAction } from 'src/models/MapItemAction.js'
import LineType from 'components/FormBuilderCustumComponents/Map/LineType.vue'
import ItemEntity from 'components/FormBuilderCustumComponents/Map/ItemEntity.vue'
import activityType from 'components/FormBuilderCustumComponents/Map/ActivityType.vue'

export default {
  name: 'AdminToolBox',
  components: { FormBuilder },
  props: {
    center: {
      type: Object,
      default () {
        return {}
      }
    },
    zoom: {
      type: [String, Number],
      default: null
    },
    bufferMarker: {
      type: Object,
      default () {
        return {}
      }
    },
    selectedMarker: {
      type: Object,
      default: new MapItem()
    },
    polyline: {
      type: Object,
      default: () => {
        return {}
      }
    },
    toolTab: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      canShowMarker: false,
      toolBoxSelectedMarker: null,
      toolBoxBufferMarker: null,
      bufferPolyline: null,
      expanded: true,
      api: APIGateway.map.APIAddresses.items,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      markerInputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'select',
              name: 'tags',
              label: 'تگ :',
              responseKey: 'data.tags',
              outlined: true,
              multiple: true,
              showNoOption: false,
              createNewValue: true,
              newValueMode: 'add-unique',
              useChips: true,
              hideDropdownIcon: true,
              col: 'col-md-12'
            }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol2',
          col: 'col-md-6',
          value: [
            {
              type: 'checkbox',
              name: 'enable',
              col: 'col-md-12',
              label: 'فعال',
              trueValue: 1,
              falseValue: 0,
              value: 1
            },
            {
              type: ItemEntity,
              name: 'entity',
              value: {
                altNames: [],
                display_name: 'هیچ کدام',
                entity_id: 0,
                entity_type: 'nothing'
              },
              responseKey: 'data.entity',
              col: 'col-md-12'
            }

          ]
        },
        {
          type: 'separator',
          col: 'col-md-12'
        },
        {
          type: activityType,
          responseKey: 'data.action',
          value: {},
          name: 'action',
          col: 'col-md-6'
        },
        {
          type: 'RangeSlider',
          name: 'ZoomRate',
          col: 'col-md-6',
          label: 'میزان زوم',
          min: 0,
          max: 11,
          value: {
            min: 3,
            max: 11
          }
        },
        {
          type: 'hidden',
          name: 'hidden',
          col: 'col-md-6'
        },
        {
          type: 'separator',
          col: 'col-md-12'
        },
        {
          type: 'file',
          name: 'iconImage',
          col: 'col-md-12',
          label: 'فایل خود را در اینجا قرار دهید و یا برای انتخاب فایل اینجا کلیک کنید'
        },
        {
          type: 'input',
          name: 'headlineText',
          label: 'متن بالای آیکن :',
          col: 'col-md-6'
        },
        {
          type: 'Slider',
          name: 'TextSize',
          col: 'col-md-6',
          label: 'اندازه متن بالای آیکن',
          min: 0,
          max: 50,
          value: 14
        },
        {
          type: 'hidden',
          name: 'space',
          col: 'col-md-6'
        },
        {
          type: 'Slider',
          name: 'StrokeSize',
          col: 'col-md-6',
          label: 'ضخامت stroke',
          min: 0,
          max: 50,
          value: 0
        },
        {
          type: 'Color',
          label: 'رنگ متن:',
          name: 'TextColor',
          col: 'col-md-6'
        },
        {
          type: 'Color',
          label: 'رنگ stroke:',
          name: 'StrokeColor',
          col: 'col-md-6'
        },
        {
          type: 'Slider',
          name: 'IconSize',
          col: 'col-md-6',
          label: 'اندازه آیکن',
          min: 0,
          max: 200,
          value: 70
        },
        {
          type: 'Slider',
          name: 'iconAnchorX',
          col: 'col-md-6',
          label: 'موقعیت آیکن نسبت به مختصات  ',
          min: -100,
          max: 100,
          value: 0
        },
        {
          type: 'hidden',
          responseKey: 'data.type_id',
          name: 'type_id',
          value: 1
        },
        {
          type: 'Slider',
          name: 'iconAnchorY',
          col: 'col-md-6',
          label: 'موقعیت آیکن نسبت به مختصات ',
          min: -100,
          max: 100,
          class: 'iconAnchorYClass',
          value: 0
        }
      ],
      polylineInputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'select',
              name: 'tags',
              label: 'تگ :',
              outlined: true,
              multiple: true,
              showNoOption: false,
              createNewValue: true,
              newValueMode: 'add-unique',
              useChips: true,
              hideDropdownIcon: true,
              col: 'col-md-12'
            }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol2',
          col: 'col-md-6',
          value: [
            {
              type: 'checkbox',
              name: 'enable',
              col: 'col-md-12',
              label: 'فعال',
              trueValue: 1,
              falseValue: 0,
              value: 1
            },
            {
              type: ItemEntity,
              name: 'entity',
              value: {
                altNames: [],
                display_name: 'هیچ کدام',
                entity_id: 0,
                entity_type: 'nothing'
              },
              responseKey: 'data.entity',
              col: 'col-md-12'
            }

          ]
        },
        {
          type: 'separator',
          col: 'col-md-12'
        },
        {
          type: activityType,
          responseKey: 'data.action',
          value: {
            data: {},
            id: 1,
            name: 'link'
          },
          name: 'action',
          label: 'action',
          col: 'col-md-6'
        },
        {
          type: 'RangeSlider',
          name: 'ZoomRate',
          col: 'col-md-6',
          label: 'میزان زوم',
          min: 0,
          max: 11,
          value: {
            min: 3,
            max: 11
          }
        },
        {
          type: 'separator',
          col: 'col-md-12'
        },
        {
          type: 'input',
          name: 'LineType',
          label: 'نوع خط :',
          col: 'col-md-12'
        },
        {
          type: 'Slider',
          name: 'LineThickness',
          col: 'col-md-6',
          label: 'ضخامت خط',
          min: 0,
          max: 50,
          value: 4
        },
        {
          type: 'Slider',
          name: 'LineStart',
          col: 'col-md-6',
          label: 'شروع الگوی خط',
          min: 0,
          max: 50,
          value: 0
        },
        {
          type: 'Color',
          label: 'رنگ خط:',
          name: 'color',
          col: 'col-md-6'
        },
        {
          type: LineType,
          label: 'نوع حرکت خط :',
          value: {
            dir: 'fixed',
            style: { 'animation-duration': 0 }
          },
          name: 'lineMoveType',
          col: 'col-md-6'
        },
        {
          type: 'hidden',
          responseKey: 'data.type_id',
          name: 'type_id',
          value: 2
        }

      ],
      categoryOptions: [
        {
          title: 'دفترچه سؤالات عمومی',
          id: '60b7858d743940688b23c7f3'
        },
        {
          title: 'دفترچه سؤالات اختصاصی',
          id: '60b7858d743940688b23c7f4'
        }
      ],
      typeOptions: [],
      defaultMarker: {
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
        min_zoom: 3,
        max_zoom: 11,
        editMode: false,
        type: {
          name: 'marker'
        }
      },
      category: {
        title: '',
        id: '',
        order: 0,
        time: 0
      }
    }
  },
  computed: {
    activeMapItem () {
      if (this.selectedMarker.editMode) {
        return this.selectedMarker
      } else if (this.bufferMarker.editMode) {
        return this.bufferMarker
      } else if (this.bufferPolyline.editMode) {
        return this.bufferPolyline
      } else {
        return false
      }
    },
    canShowGeneralData () {
      return this.activeMapItem.editMode && this.activeMapItem.type.name === this.toolTab
    },
    polyAction () {
      return this.polylineInputs.find(item => item.name === 'action').value
    },
    polyZoomRate () {
      return this.polylineInputs.find(item => item.name === 'ZoomRate').value
    },
    polyLineType () {
      return this.polylineInputs.find(item => item.name === 'LineType').value
    },
    polyLineThickness () {
      return this.polylineInputs.find(item => item.name === 'LineThickness').value
    },
    polyLineStart () {
      return this.polylineInputs.find(item => item.name === 'LineStart').value
    },
    polyColor () {
      return this.polylineInputs.find(item => item.name === 'color').value
    },
    polylineMoveType () {
      return this.polylineInputs.find(item => item.name === 'lineMoveType').value
    },
    polyTags () {
      const formBuilderCol = this.getPolylineInputsValue('formBuilderCol')
      return formBuilderCol.find(item => item.name === 'tags').value
    },
    polyEnable () {
      const formBuilderCol = this.getPolylineInputsValue('formBuilderCol2')
      return formBuilderCol.find(item => item.name === 'enable').value
    },
    polyEntity () {
      const formBuilderCol = this.getPolylineInputsValue('formBuilderCol2')
      return formBuilderCol.find(item => item.name === 'entity').value
    },
    headlineText () {
      return this.getMarkerInputsValue('headlineText')
    },
    ZoomRate () {
      return this.getMarkerInputsValue('ZoomRate')
    },
    iconImage () {
      return this.getMarkerInputsValue('iconImage')
    },
    TextColor () {
      return this.getMarkerInputsValue('TextColor')
    },
    StrokeColor () {
      return this.getMarkerInputsValue('StrokeColor')
    },
    IconSize () {
      return this.getMarkerInputsValue('IconSize')
    },
    TextSize () {
      return this.getMarkerInputsValue('TextSize')
    },
    StrokeSize () {
      return this.getMarkerInputsValue('StrokeSize')
    },
    iconAnchorX () {
      return this.getMarkerInputsValue('iconAnchorX')
    },
    iconAnchorY () {
      return this.getMarkerInputsValue('iconAnchorY')
    },
    action () {
      return this.getMarkerInputsValue('action')
    },
    tags () {
      const formBuilderCol = this.getMarkerInputsValue('formBuilderCol')
      return formBuilderCol.find(item => item.name === 'tags').value
    },
    enable () {
      const formBuilderCol = this.getMarkerInputsValue('formBuilderCol2')
      return formBuilderCol.find(item => item.name === 'enable').value
    },
    entity () {
      const formBuilderCol = this.getMarkerInputsValue('formBuilderCol2')
      return formBuilderCol.find(item => item.name === 'entity').value
    }
  },
  watch: {
    headlineText: {
      handler (newVal) {
        this.toolBoxBufferMarker.data.headline.text = newVal
        this.updateItem()
      }
    },
    ZoomRate: {
      handler (zoom) {
        this.toolBoxBufferMarker.max_zoom = zoom.max
        this.toolBoxBufferMarker.min_zoom = zoom.min
        this.updateItem()
      }
    },
    iconImage: {
      handler (fileList) {
        if (fileList === null) {
          this.toolBoxBufferMarker.data.icon.options.iconUrl = null
        } else if (typeof fileList === 'object') {
          this.toolBoxBufferMarker.data.icon.options.iconUrl = URL.createObjectURL(fileList) // returns Blob
        } else {
          this.toolBoxBufferMarker.data.icon.options.iconUrl = fileList
        }
        this.updateItem()
      }
    },
    TextColor: {
      handler (color) {
        this.toolBoxBufferMarker.data.headline.fillColor = color
        this.updateItem()
      }
    },
    StrokeColor: {
      handler (color) {
        this.toolBoxBufferMarker.data.headline.strokeColor = color
        this.updateItem()
      }
    },
    IconSize: {
      handler (size) {
        this.toolBoxBufferMarker.data.icon.options.iconSize[0] = size
        this.toolBoxBufferMarker.data.icon.options.iconSize[1] = size
        this.updateItem()
      }
    },
    TextSize: {
      handler (size) {
        this.toolBoxBufferMarker.data.headline.fontSize = size
        this.updateItem()
      }
    },
    StrokeSize: {
      handler (size) {
        this.toolBoxBufferMarker.data.headline.strokeWidth = size
        this.updateItem()
      }
    },
    iconAnchorX: {
      handler (anchor) {
        this.toolBoxBufferMarker.data.icon.options.iconAnchor[0] = anchor
        this.updateItem()
      }
    },
    iconAnchorY: {
      handler (anchor) {
        this.toolBoxBufferMarker.data.icon.options.iconAnchor[1] = anchor
        this.updateItem()
      }
    },
    action: {
      handler (data) {
        this.toolBoxBufferMarker.action = data
        this.updateItem()
      }
    },
    tags: {
      handler (tags) {
        this.toolBoxBufferMarker.tags = tags
        this.updateItem()
      }
    },
    enable: {
      handler (newValue) {
        this.toolBoxBufferMarker.enable = newValue
        this.updateItem()
      }
    },
    entity: {
      handler (EntityData) {
        this.toolBoxBufferMarker.entity = EntityData
      }
    },
    polyAction: {
      handler (data) {
        this.bufferPolyline.action = data
        this.updateItem()
      }
    },
    polyZoomRate: {
      handler (zoom) {
        this.bufferPolyline.min_zoom = zoom.min
        this.bufferPolyline.max_zoom = zoom.min
        this.updateItem()
      }
    },
    polyLineType: {
      handler (data) {
        this.bufferPolyline.data.line.dashArray = data
        this.updateItem()
      }
    },
    polyLineThickness: {
      handler (weight) {
        this.bufferPolyline.data.line.weight = weight
        this.updateItem()
      }
    },
    polyLineStart: {
      handler (data) {
        this.bufferPolyline.data.line.dashOffset = data
        this.updateItem()
      }
    },
    polyColor: {
      handler (color) {
        this.bufferPolyline.data.line.color = color
        this.updateItem()
      }
    },
    polylineMoveType: {
      handler (dir) {
        this.bufferPolyline.data.line.options.flowing.dir = dir
        this.updateItem()
      }
    },
    polyTags: {
      handler (tags) {
        this.bufferPolyline.tags = tags
        this.updateItem()
      }
    },
    polyEnable: {
      handler (enable) {
        this.bufferPolyline.enable = enable
        this.updateItem()
      }
    },
    polyEntity: {
      handler (entity) {
        this.bufferPolyline.entity = entity
        this.updateItem()
      }
    }
  },
  created () {
    this.bufferPolyline = this.polyline
  },
  methods: {
    iconFilesChange (fileList) {
    },
    setInput (data) {
      this.toolBoxBufferMarker = this.bufferMarker.editMode ? this.bufferMarker : this.selectedMarker
      this.markerInputs[0].value[0].value = data.tags
      this.markerInputs[8].value = data.data.headline.text
      if (typeof data.enable === 'number') {
        this.markerInputs[1].value[0].value = data.enable
      } else if (data.enable) {
        this.markerInputs[1].value[0].value = 1
      } else {
        this.markerInputs[1].value[0].value = 0
      }
      this.markerInputs[1].value[1].value = new MapItemEntity(data.entity)
      if (typeof data.action === 'string') {
        this.markerInputs[3].value = new MapItemAction(JSON.parse(data.action))
      } else {
        this.markerInputs[3].value = new MapItemAction(data.action)
      }
      this.markerInputs[4].value.min = data.min_zoom
      this.markerInputs[4].value.max = data.max_zoom
      const iconUrl = data.data.icon.options.iconUrl
      if (iconUrl === null) {
        this.markerInputs[7].value = ''
      } else if (typeof iconUrl === 'object') {
        this.markerInputs[7].value = URL.createObjectURL(iconUrl) // returns Blob
      } else {
        this.markerInputs[7].value = iconUrl
      }
      this.markerInputs[9].value = data.data.headline.fontSize
      this.markerInputs[11].value = data.data.headline.strokeWidth
      this.markerInputs[12].value = data.data.headline.fillColor
      this.markerInputs[13].value = data.data.headline.strokeColor
      this.markerInputs[14].value = data.data.icon.options.iconSize[0]
      this.markerInputs[15].value = data.data.icon.options.iconAnchor[0]
      this.markerInputs[17].value = data.data.icon.options.iconAnchor[1]
    },
    getActiveMapItem () {
      if (this.selectedMarker.editMode || this.bufferMarker.editMode) {
        return this.toolBoxBufferMarker
      } else if (this.bufferPolyline.editMode) {
        return this.bufferPolyline
      } else {
        return false
      }
    },
    updateItem () {
      const activeMapItem = this.getActiveMapItem()
      if (!activeMapItem) {
        return
      }
      this.$emit(activeMapItem.type.name + '_change', activeMapItem)
    },
    getMarkerInputsValue (inputName) {
      return this.markerInputs.find(input => input.name === inputName).value
    },
    getPolylineInputsValue (inputName) {
      return this.polylineInputs.find(input => input.name === inputName).value
    },
    addMarker () {
      this.$emit('add_marker', this.defaultMarker)
    },
    addPolyLine () {
      this.bufferPolyline.editMode = true
      this.$emit('add-polyline', this.bufferPolyline)
    },
    saveMarker () {
      this.$emit('save_marker', this.bufferMarker)
      // this.clearData();
    },

    getInputValue (type, inputName) {
      return this[type].find(input => input.name === inputName).value
    },
    getPolylineValue (inputName) {
      return this.polylineInputs.find(input => input.name === inputName).value
    },
    tabChanged (tabName) {
      this.$emit('tab_changed', tabName)
    },
    showMapInfo () {
      this.$emit('show-map-info')
    }
  }
}
</script>

<style>
/* .iconAnchorYClass{ */

/*  transform: rotate(90deg); */

/* } */
</style>

<style scoped lang="scss">

.adminToolBox {
  width: 100%;

  .ToolBoxHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .rightSide {
      .header-title {
        font-size: 24px;
        margin-left: 10px;
      }

    }
  }

  .MarkerFormBuilderContainer {
    .addMarkerBtn {
      width: 100%;
    }

    .markerToolBoxBtns {
      .btns {
        width: 100%;
        margin: 0 0 4px;
      }
    }

    .MarkerFormBuilder {
    }

  }

  .PolylineFormBuilderContainer {
    .addPolyLineBtn {
      width: 100%;
      background-color: orange;
    }

    .PolylineToolBoxBtns {
      .btns {
        width: 100%;
        margin: 0 0 4px;
      }
    }

    .PolylineFormBuilder {
    }
  }

}

</style>

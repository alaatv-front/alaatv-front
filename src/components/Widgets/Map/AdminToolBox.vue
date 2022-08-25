<template>
  <div class="adminToolBox">

    <div class="ToolBoxHeader">
      <div class="rightSide">
        <q-icon
          size="24px"
          name="isax:designtools">
        </q-icon>
        <span class="header-title"> جعبه ابزار</span>
      </div>
      <div class="leftSide">
        <q-btn
          @click="tabChanged('marker')"
          flat
          class=""
          icon="isax:signpost"
        >
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            Marker
          </q-tooltip>
        </q-btn>
        <q-btn
          @click="tabChanged('polyline')"
          flat
          class=""
          icon="isax:chart-square"
        >
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            Polyline
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          class=""
          icon="isax:menu-1"
        >
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            Map Info
          </q-tooltip>

        </q-btn>
      </div>
    </div>

    <q-separator
      color="gray"
      inset/>

    <div class="MarkerFormBuilderContainer"
         v-if="toolTab === 'marker'">

      <div class="MarkerFormBuilder"
           v-if="canShowGeneralData">
        <form-builder
          v-model:value="markerInputs"
          ref="markerInputsFormBuilder"
        />
      </div>
      <q-btn class="addMarkerBtn"
             @click="addMarker"
             icon="isax:element-plus"/>
      <div class="markerToolBoxBtns"
           v-if="bufferMarker.editMode"
      >
        <q-btn class="btns btn-info"
               icon="isax:copy"
        />
        <q-btn class="btns btn-info"
               icon="isax:save-remove"
               @click="saveMarker"
        />
        <q-btn class="btns btn-danger"
               icon="isax:trash"
        />
      </div>

    </div>

    <div class="PolylineFormBuilderContainer"
         v-if="toolTab === 'polyline'">

      <div class="PolylineFormBuilder"
           v-if="canShowGeneralData">
        <form-builder
          v-model:value="polylineInputs"
          ref="polylineInputsFormBuilder"/>

      </div>
      <q-btn class="addPolyLineBtn"
             icon="isax:refresh"/>
      <div class="PolylineToolBoxBtns"
           v-if="bufferPolyline.editMode"
      >
        <q-btn class="btns btn-info"
               icon="isax:copy"/>
        <q-btn class="btns btn-info"
               icon="isax:save-remove"/>
        <q-btn class="btns btn-danger"
               icon="isax:trash"/>


      </div>

    </div>

  </div>
</template>

<script>
import { FormBuilder } from 'quasar-form-builder'
import API_ADDRESS from 'src/api/Addresses'

import activityType from 'components/FormBuilderCustumComponents/Map/ActivityType'
import LineType from 'components/FormBuilderCustumComponents/Map/LineType'
import ItemEntity from 'components/FormBuilderCustumComponents/Map/ItemEntity'

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
    marker: {
      type: Object,
      default: {}
    },
    polyline: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      canShowMarker: false,
      bufferMarker: null,
      bufferPolyline: null,
      expanded: true,
      api: API_ADDRESS.map.items,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      toolTab: null,
      displayZoom: {
        min_zoom: 11,
        max_zoom: 11
      },
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
            min: 3.1,
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
          type: 'File',
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
          min: 0,
          max: 200,
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
          min: 0,
          max: 200,
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
              name: 'NewValueEventSelect',
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
          name: 'formBuilderCol',
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
          name: 'activityType',
          label: 'action',
          col: 'col-md-6'
        },
        {
          type: 'Slider',
          name: 'max',
          col: 'col-md-6',
          label: 'میزان زوم از',
          min: 0,
          max: 11,
          value: 3
        },
        {
          type: 'hidden',
          name: 'hidden',
          col: 'col-md-6'
        },
        {
          type: 'Slider',
          name: 'min',
          col: 'col-md-6',
          label: 'میزان زوم تا',
          min: 0,
          max: 11,
          value: 11
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
          name: 'line',
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
      category: {
        title: '',
        id: '',
        order: 0,
        time: 0
      }
    }
  },
  watch: {
    headlineText: {
      handler (newVal) {
        this.bufferMarker.data.headline.text = newVal
        this.updateItem()
      }
    },
    ZoomRate: {
      handler (zoom) {
        this.displayZoom.max_zoom = zoom.max
        this.displayZoom.min_zoom = zoom.min
        this.updateItem()
      }
    },
    iconImage: {
      handler (fileList) {
        console.log(fileList)
        this.bufferMarker.data.icon.options.iconUrl = URL.createObjectURL(fileList) // returns Blob
      }
    },
    TextColor: {
      handler (color) {
        this.bufferMarker.data.headline.fillColor = color
        this.updateItem()
      }
    },
    StrokeColor: {
      handler (color) {
        this.bufferMarker.data.headline.strokeColor = color
        this.updateItem()
      }
    },
    IconSize: {
      handler (size) {
        this.bufferMarker.data.icon.options.iconSize = size
        this.updateItem()
      }
    },
    TextSize: {
      handler (size) {
        console.log(size)
        this.bufferMarker.data.headline.fontSize = size
        this.updateItem()
      }
    },
    StrokeSize: {
      handler (size) {
        this.bufferMarker.data.headline.strokeWidth = size
        this.updateItem()
      }
    },
    iconAnchorX: {
      handler (anchor) {
        this.bufferMarker.data.icon.options.iconAnchor[0] = anchor
        // this.bufferMarker.data.icon.options.iconSize = this.bufferMarker.data.icon.options.iconSize -1
        this.updateItem()
      }
    },
    iconAnchorY: {
      handler (anchor) {
        this.bufferMarker.data.icon.options.iconAnchor[1] = anchor
        this.updateItem()
      }
    },
    action: {
      handler (data) {
        this.bufferMarker.action = data
        console.log(data)
        this.updateItem()
      }
    },
    tags: {
      handler (tags) {
        this.bufferMarker.tags=tags
        this.updateItem()
      }
    },
    enable: {
      handler (newValue) {
        this.bufferMarker.enable=newValue
        this.updateItem()
      }
    },
    entity: {
      handler (EntityData) {
        this.bufferMarker.entity = EntityData
      }
    },
  },
  computed: {
    activeMapItem () {
      if (this.bufferMarker.editMode) {
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
    headlineText () {
      return this.getInputsValue('headlineText')
    },
    ZoomRate () {
      return this.getInputsValue('ZoomRate')
    },
    iconImage () {
      return this.getInputsValue('iconImage')
    },
    TextColor () {
      return this.getInputsValue('TextColor')
    },
    StrokeColor () {
      return this.getInputsValue('StrokeColor')
    },
    IconSize () {
      return this.getInputsValue('IconSize')
    },
    TextSize () {
      return this.getInputsValue('TextSize')
    },
    StrokeSize () {
      return this.getInputsValue('StrokeSize')
    },
    iconAnchorX () {
      return this.getInputsValue('iconAnchorX')
    },
    iconAnchorY () {
      return this.getInputsValue('iconAnchorY')
    },
    action () {
      return this.getInputsValue('action')
    },
    tags () {
      const formBuilderCol = this.getInputsValue('formBuilderCol')
      return formBuilderCol.find(item => item.name === 'tags').value
    },
    enable () {
      const formBuilderCol = this.getInputsValue('formBuilderCol2')
      return formBuilderCol.find(item => item.name === 'enable').value
    },
    entity () {
      const formBuilderCol = this.getInputsValue('formBuilderCol2')
      return formBuilderCol.find(item => item.name === 'entity').value
    },
  },
  created () {
    this.bufferMarker = this.marker
    this.bufferPolyline = this.polyline
  },
  methods: {
    iconFilesChange (fileList) {
    },
    getActiveMapItem () {
      if (this.bufferMarker.editMode) {
        return this.bufferMarker
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
      activeMapItem.min_zoom = this.displayZoom.min_zoom
      activeMapItem.max_zoom = this.displayZoom.max_zoom
      this.$emit(activeMapItem.type.name + '_change', activeMapItem)
    },
    getInputsValue (inputName) {
      return this.markerInputs.find(input => input.name === inputName).value
    },
    addMarker () {
      this.$emit('add_marker', this.marker)
    },
    saveMarker() {
        this.$emit('save_marker', this.marker);
        // this.clearData();
    },

    getInputValue (type, inputName) {
      return this[type].find(input => input.name === inputName).value
    },
    getPolylineValue (inputName) {
      return this.polylineInputs.find(input => input.name === inputName).value
    },
    tabChanged (tabName) {
      this.toolTab = tabName
      this.$emit('tab_changed', tabName)
    }
  }
}
</script>

<style scoped>
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
      background-color: green;
    }

    .markerToolBoxBtns {
      .btns {
        width: 100%;
      }

      .btns.btn-success {
        background-color: green;
      }

      .btns.btn-info {
        background-color: blue;
      }

      .btns.btn-danger {
        background-color: red;
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
        //border-radius: 0;
        width: 100%;
      }

      .btns.btn-success {
        background-color: green;
      }

      .btns.btn-info {
        background-color: blue;
      }

      .btns.btn-danger {
        background-color: red;
      }
    }

    .PolylineFormBuilder {
    }
  }

}

</style>

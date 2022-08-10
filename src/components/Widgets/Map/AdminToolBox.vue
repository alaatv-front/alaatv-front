<template>
  <div class="adminToolBox">

    <div class="toolBoxHeader">
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
          icon="isax:element-plus"
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
          icon="isax:copy"
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
          icon="isax:save-remove"
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
      inset />

    <q-btn
      v-if="toolTab === 'marker'"
      style="width: 100%"
      icon="isax:cloud-plus"
      class="bg-primary"
    >
      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
      >
        Mark On Map
      </q-tooltip>
    </q-btn>

    <div
      v-if="toolTab === 'marker'"
      class="MarkerFormBuilder"
    >
      <entity-crud-form-builder
        v-model:value="markerInputs"
        ref="EntityCrudFormBuilder"
      />
      <div
        v-if="toolTab === 'polyline' || toolTab === 'marker'"
        class="toolBoxBtns">
        <q-btn
          class="btns btn-success"
          icon="isax:element-plus"
        />
        <q-btn
          class="btns btn-info"
          icon="isax:copy"
        />
        <q-btn
          class="btns btn-info"
          icon="isax:save-remove"
          @click="saveData"
        />
        <q-btn
          class="btns btn-danger"
          icon="isax:trash"
        />
      </div>
    </div>

    <div
      v-if="toolTab === 'polyline'"
      class="PolylineFormBuilder"
    >
      <entity-crud-form-builder
        v-model:value="polylineInputs"
        ref="EntityCrudFormBuilder"
      />
      <div
        v-if="toolTab === 'polyline' || toolTab === 'marker'"
        class="toolBoxBtns">
        <q-btn
          class="btns bg-orange"
          icon="isax:refresh"
        />
        <q-btn
          class="btns btn-info"
          icon="isax:copy"
        />
        <q-btn
          class="btns btn-info"
          icon="isax:save-remove"
        />
        <q-btn
          class="btns btn-danger"
          icon="isax:trash"
        />
      </div>
    </div>

  </div>

</template>

<script>
import { EntityCrudFormBuilder } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

import activityType from 'components/FormBuilderCustumComponents/Map/ActivityType'
import LineType from 'components/FormBuilderCustumComponents/Map/LineType'

export default {
  name: 'AdminToolBox',
  components: { EntityCrudFormBuilder, activityType, LineType },
  data () {
    return {
      expanded: true,
      api: API_ADDRESS.map.items,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      toolTab: null,
      markerInputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'input',
              col: 'col-md-12',
              label: 'تگ :'
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
              col: 'col-md-12',
              label: 'فعال',
              value: false
            },
            {
              type: 'optionGroupCheckbox',
              name: 'enable',
              col: 'col-md-12',
              multiple: false,
              value: 0,
              options: [{
                label: 'هیچکدام',
                value: 0
              }, {
                label: 'محصول',
                value: 1
              }, {
                label: 'دسته محتوا',
                value: 2
              }, {
                label: ' محتوا',
                value: 3
              }]
            }

          ]
        },
        {
          type: 'separator',
          col: 'col-md-12'
        },
        {
          type: activityType,
          value: [],
          name: 'action',
          col: 'col-md-6'
        },
        {
          type: 'RangeSlider',
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
          col: 'col-md-12',
          label: 'فایل خود را در اینجا قرار دهید و یا برای انتخاب فایل اینجا کلیک کنید'
        },
        {
          type: 'input',
          name: 'link',
          label: 'متن بالای آیکن :',
          col: 'col-md-6'
        },
        {
          type: 'RangeSlider',
          name: 'TextSize',
          col: 'col-md-6',
          label: 'اندازه متن بالای آیکن',
          min: 0,
          max: 50,
          value: {
            min: 0,
            max: 0
          }
        },
        {
          type: 'hidden',
          name: 'space',
          col: 'col-md-6'
        },
        {
          type: 'RangeSlider',
          name: 'StrokeSize',
          col: 'col-md-6',
          label: 'ضخامت stroke',
          min: 0,
          max: 50,
          value: {
            min: 0,
            max: 0
          }
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
          type: 'RangeSlider',
          name: 'StrokeSize',
          col: 'col-md-6',
          label: 'اندازه آیکن',
          min: 0,
          max: 200,
          value: {
            min: 0,
            max: 70
          }
        },
        {
          type: 'RangeSlider',
          name: 'IconLocation',
          col: 'col-md-6',
          label: 'موقعیت آیکن نسبت به مختصات انتخاب شده',
          min: 0,
          max: 200,
          value: {
            min: 0,
            max: 0
          }
        }

      ],
      polylineInputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'input',
              col: 'col-md-12',
              label: 'تگ :'
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
              col: 'col-md-12',
              label: 'فعال',
              value: false
            },
            {
              type: 'optionGroupCheckbox',
              name: 'enable',
              col: 'col-md-12',
              multiple: false,
              value: 0,
              options: [{
                label: 'هیچکدام',
                value: 0
              }, {
                label: 'محصول',
                value: 1
              }, {
                label: 'دسته محتوا',
                value: 2
              }, {
                label: ' محتوا',
                value: 3
              }]
            }

          ]
        },
        {
          type: 'separator',
          col: 'col-md-12'
        },
        {
          type: activityType,
          value: [],
          name: 'activityType',
          label: 'action',
          col: 'col-md-6'
        },
        {
          type: 'RangeSlider',
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
          type: 'input',
          name: 'LineType',
          label: 'نوع خط :',
          col: 'col-md-12'
        },
        {
          type: 'RangeSlider',
          name: 'LineThickness',
          col: 'col-md-6',
          label: 'ضخامت خط',
          min: 0,
          max: 50,
          value: {
            min: 0,
            max: 4
          }
        },
        {
          type: 'RangeSlider',
          name: 'LineStart',
          col: 'col-md-6',
          label: 'شروع الگوی خط',
          min: 0,
          max: 50,
          value: {
            min: 0,
            max: 0
          }
        },
        {
          type: 'Color',
          label: 'رنگ خط:',
          name: 'TextColor',
          col: 'col-md-6'
        },
        {
          type: LineType,
          label: 'نوع حرکت خط :',
          name: 'line',
          col: 'col-md-6',
          value: []
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
  },
  methods: {
    saveData() {
      this.getInputValue('markerInputs', 'activityType')
    },
    getInputValue (type, inputName) {
      return this[type].find(input => input.name === inputName).value
    },
    getPolylineValue (inputName) {
      return this.polylineInputs.find(input => input.name === inputName).value
    },
    tabChanged(tabName) {
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
    width: 1000px;
  .toolBoxHeader {
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

  .MarkerFormBuilder {
    .toolBoxBtns {
      margin-top: 10px;

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
  }
  .PolylineFormBuilder {
    .toolBoxBtns {
      margin-top: 10px;

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
  }

}

</style>

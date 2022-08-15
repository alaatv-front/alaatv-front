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
      inset />

    <q-btn
      v-if="toolTab === 'marker'"
      style="width: 100%"
      icon="isax:folder-add"
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
      <form-builder
        v-model:value="markerInputs"
        ref="markerInputsFormBuilder"
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
      <form-builder
        v-model:value="polylineInputs"
        ref="polylineInputsFormBuilder"
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
import { FormBuilder } from 'quasar-form-builder'

import API_ADDRESS from 'src/api/Addresses'

import activityType from 'components/FormBuilderCustumComponents/Map/ActivityType'
import LineType from 'components/FormBuilderCustumComponents/Map/LineType'
import ItemEntity from 'components/FormBuilderCustumComponents/Map/ItemEntity'

export default {
  name: 'AdminToolBox',
  components: { FormBuilder },

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
              value: [],
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
          value: [],
          name: 'action',
          col: 'col-md-6'
        },
        {
          type: 'Slider',
          name: 'min',
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
          col: 'col-md-6',
          name: 'max',
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
          value: 14
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
          name: 'StrokeSize',
          col: 'col-md-6',
          label: 'اندازه آیکن',
          min: 0,
          max: 200,
          value: 70
        },
        {
          type: 'Slider',
          name: 'IconLocation',
          col: 'col-md-6',
          label: 'موقعیت آیکن نسبت به مختصات ',
          min: 0,
          max: 200,
          value: 0
        },
        {
          type: 'hidden',
          responseKey: 'data.type_id',
          name: 'type_id',
          value: 1
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
              value: [],
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
          value: [],
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
    width: 100%;
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

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
          flat
          class=""
          icon="isax:element-plus"
        />
        <q-btn
          flat
          class=""
          icon="isax:copy"
        />
        <q-btn
          flat
          class=""
          icon="isax:save-remove"
        />
      </div>
    </div>
    <q-separator
      color="gray"
      inset />

    <q-btn
      style="width: 100%"
      icon="isax:cloud-plus"
      class="bg-primary"
    />

    <div class="toolBoxFormBuilder">
      <entity-crud-form-builder
        v-model:value="inputs"
        ref="EntityCrudFormBuilder"
      />
    </div>

    <div class="toolBoxBtns">
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
      />
      <q-btn
        class="btns btn-danger"
        icon="isax:trash"
      />
    </div>

  </div>

</template>

<script>
import { EntityCrudFormBuilder } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'AdminToolBox',
  components: { EntityCrudFormBuilder },
  data () {
    return {
      expanded: true,
      api: API_ADDRESS.map.items,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      inputs: [
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
              }],
              value: [0]
            }

          ]
        },
        {
          type: 'separator',
          col: 'col-md-12'
        },
        {
          type: 'Select',
          name: 'type_id',
          responseKey: 'data.type.value',
          label: 'انتخاب نوع فعالیت',
          col: 'col-md-6',
          options: [{
            label: '3',
            value: 'بدون فعالیت'
          }, {
            label: '1',
            value: 'لینک'
          }, {
            label: '2',
            value: 'زوم'
          }],
          optionValue: 'value',
          optionLabel: 'value'
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
          type: 'input',
          name: 'link',
          label: 'لینک',
          col: 'col-md-6'
        },
        {
          type: 'Select',
          name: 'linkFeature',
          label: 'ویژگی لینک :',
          col: 'col-md-6',
          options: [{
            label: '1',
            value: 'بدون باز شدن در صفحه جدید'
          },
          {
            label: '2',
            value: 'باز شدن در همان صفحه'
          }],
          optionValue: 'value',
          optionLabel: 'value'
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
          name: 'StrokeSize',
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
  }
}
</script>
<style scoped>
</style>

<style scoped lang="scss">
.adminToolBox {
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

  .toolBoxFormBuilder {
    display: flex;
    align-items: center;
    width: 900px;
  }

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

</style>

<template>
  <div class="entity-edit-header">
    <div v-if="selectedValues.length > 0">
      <q-card class="upper-card bg-primary flex items-center q-pa-md">
        <div class="base-part flex items-center">
          <div class="header-item">
            {{ selectedValues.length }} مورد انتخاب شده
          </div>
          <div class="line header-item" />
        </div>
        <div v-if="isInEditMode"
             class="edit-mode flex items-center justify-between">
          <div class="header-item">در حال ویرایش {{editSelectorValue.label}}</div>
          <div class="action-btn flex items-center">
            <div>
              <q-btn flat
                     padding="1px 23px"
                     label="لغو"
                     @click="emptyEditSelectorValue" />
            </div>
            <div>
              <q-btn unelevated
                     class="filter-btn"
                     color="positive"
                     padding="1px 23px"
                     label="اعمال"
                     @click="editSelectedContents" />
            </div>
          </div>
        </div>

        <div v-else
             class="menu-mode flex items-center">
          <div class="header-item flex items-center">
            <entity-crud-form-builder v-model:value="setInput" />
            <q-btn color="positive"
                   class="q-ml-sm"
                   unelevated
                   label="افزودن به مجموعه"
                   @click="attachToSet" />
          </div>
          <div class="line header-item" />
          <div class="header-item selector">
            <q-select v-model="editSelectorValue"
                      borderless
                      label="ویرایش"
                      :options="editSelectorOptions" />
          </div>
          <div class="header-item selector">
            <q-select v-model="moreSelectorValue"
                      borderless
                      label="بیشتر"
                      :options="moreSelectorOptions"
                      @update:model-value="executeMoreSelectorAction" /></div>
        </div>
      </q-card>
      <q-card v-if="isInEditMode"
              class="bg-secondary q-pa-md lower-card">
        <form-builder ref="formBuilder"
                      v-model:value="allEditModeInputs[chosenInputIndex]" />
      </q-card>
    </div>
  </div>
</template>

<script>
import FormBuilder from 'quasar-form-builder/src/FormBuilder.vue'
import { APIGateway } from 'src/api/APIGateway'
import { EntityCrudFormBuilder } from 'quasar-crud'
import { shallowRef } from 'vue'
import TagsComponent from 'components/Utils/Tags.vue'
const Tags = shallowRef(TagsComponent)

export default {
  name: 'EntityEditHeader',
  components: { FormBuilder, EntityCrudFormBuilder },
  props: {
    selectedValues: {
      default() {
        return []
      },
      type: Array
    }
  },
  emits: [
    'selectedValues',
    'contentUpdated'
  ],
  data() {
    return {
      moreSelectorValue: 'بیشتر',
      moreSelectorOptions: [
        { label: 'حذف', value: 'delete' }
        // { label: 'دانلود', value: 'download' }
      ],
      editSelectorValue: 'ویرایش',
      editSelectorOptions: [
        { label: 'عنوان', value: 'name-main' },
        { label: 'توضیحات', value: 'description-main' },
        { label: 'تگ ها', value: 'tags-main' },
        { label: 'وضعیت', value: 'status-main' }
      ],
      setInput: [
        {
          type: 'entity',
          responseKey: 'data.set',
          name: 'set',
          placeholder: 'مجموعه محتوا را انتخاب کنید',
          col: 'col-12',
          selectionMode: 'single',
          popUpButtonConfig: {
            unelevated: true,
            color: 'white',
            textColor: 'black',
            badgeColor: 'positive',
            label: 'انتخاب از لیست مجموعه ها'
          },
          dialogConfirmButtonConfig: {
            unelevated: true,
            color: 'positive',
            label: 'ثبت مجموعه'
          },
          indexConfig: {
            apiAddress: APIGateway.set.APIAdresses.base,
            tableTitle: 'مجموعه ها',
            tableKeys: {
              data: 'data',
              total: 'meta.total',
              currentPage: 'meta.current_page',
              perPage: 'meta.per_page',
              pageKey: 'contentsetPage'
            },
            table: {
              columns: [
                {
                  name: 'id',
                  required: true,
                  label: '#',
                  align: 'left',
                  field: row => row.id
                },
                {
                  name: 'title',
                  required: true,
                  label: 'عنوان',
                  align: 'left',
                  field: row => row.title
                }
              ],
              data: []
            },
            inputs: [
              { type: 'input', name: 'search', value: null, outlined: true, placeholder: 'انتخاب نمایید', label: 'جست و جو', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id'
          },
          itemIndicatorKey: 'title',
          value: [],
          selected: []
        }
      ],
      allEditModeInputs: [
        [
          {
            type: 'select',
            name: 'name-main',
            label: 'نوع ویرایش:',
            col: 'col-md-4',
            value: 'concatEnd',
            outlined: true,
            placeholder: 'انتخاب نمایید',
            options: [
              { label: 'افزودن به انتهای عنوان', value: 'concatEnd' },
              { label: 'افزودن به ابتدای عنوان', value: 'concatStart' },
              { label: 'حذف واژه از عنوان', value: 'delete' },
              { label: 'جاگزینی واژه در توضیحات', value: 'replace' }
            ]
          },
          {
            type: 'input',
            name: 'name',
            outlined: true,
            autogrow: true,
            value: null,
            placeholder: 'متن مورد نظر خود را وارد نمایید',
            label: 'متن ویرایش:',
            col: 'col-md-8',
            applyGridSystem: false
          },
          {
            // type: 'formBuilder',
            type: 'hidden',
            name: 'replace',
            col: 'col-md-8',
            value: [
              {
                type: 'input',
                name: 'name',
                outlined: true,
                autogrow: true,
                value: null,
                placeholder: 'واژه مورد نظر خود را وارد نمایید',
                label: 'واژه فعلی:',
                col: 'col-md-6'
              },
              {
                type: 'input',
                name: 'name',
                outlined: true,
                autogrow: true,
                value: null,
                placeholder: 'واژه مورد نظر خود را وارد نمایید',
                label: 'واژه جایگزین:',
                col: 'col-md-6'
              }
            ]
          }
        ],
        [
          {
            type: 'select',
            name: 'description-main',
            label: 'نوع ویرایش:',
            col: 'col-md-4',
            value: 'concatEnd',
            outlined: true,
            placeholder: 'انتخاب نمایید',
            options: [
              { label: 'افزودن به انتهای توضیحات', value: 'concatEnd' },
              { label: 'افزودن به ابتدای توضیحات', value: 'concatStart' },
              { label: 'حذف واژه از توضیحات', value: 'delete' },
              { label: 'جاگزینی واژه در توضیحات', value: 'replace' }
            ]
          },
          {
            type: 'input',
            name: 'description',
            outlined: true,
            autogrow: true,
            value: null,
            placeholder: 'متن مورد نظر خود را وارد نمایید',
            label: 'متن ویرایش:',
            col: 'col-md-8'
          },
          {
            // type: 'formBuilder',
            type: 'hidden',
            name: 'replace',
            col: 'col-md-8',
            value: [
              {
                type: 'input',
                name: 'description',
                outlined: true,
                autogrow: true,
                value: null,
                placeholder: 'واژه مورد نظر خود را وارد نمایید',
                label: 'واژه فعلی:',
                col: 'col-md-6'
              },
              {
                type: 'input',
                name: 'description',
                outlined: true,
                autogrow: true,
                value: null,
                placeholder: 'واژه مورد نظر خود را وارد نمایید',
                label: 'واژه جایگزین:',
                col: 'col-md-6'
              }
            ]
          }
        ],
        [
          {
            type: 'select',
            name: 'tags-main',
            outlined: true,
            placeholder: 'انتخاب نمایید',
            label: 'نوع ویرایش:',
            col: 'col-md-4',
            value: 'add',
            options: [
              { label: 'اضافه کردن تگ', value: 'add' },
              { label: 'حذف کردن تگ', value: 'delete' },
              { label: 'جابجایی تگ', value: 'replace' }
            ]
          },
          {
            type: Tags,
            name: 'description',
            label: 'متن مورد نظر خود را وارد نمایید',
            placeholder: ' ',
            outlined: true,
            responseKey: 'data.tags',
            col: 'col-md-8'
          },
          // {
          //   type: 'input',
          //   name: 'description',
          //   outlined: true,
          //   autogrow: true,
          //   value: null,
          //   placeholder: 'متن مورد نظر خود را وارد نمایید',
          //   label: 'تگ ها:',
          //   col: 'col-md-8'
          // },
          {
            // type: 'formBuilder',
            type: 'hidden',
            name: 'replace',
            col: 'col-md-8',
            hidden: true,
            value: [
              {
                type: 'input',
                name: 'description',
                outlined: true,
                autogrow: true,
                value: null,
                placeholder: 'متن مورد نظر خود را وارد نمایید',
                label: 'تگ فعلی:',
                col: 'col-md-6'
              },
              {
                type: 'input',
                name: 'description',
                outlined: true,
                autogrow: true,
                value: null,
                placeholder: 'متن مورد نظر خود را وارد نمایید',
                label: 'تگ جایگزین:',
                col: 'col-md-6'
              }
            ]
          }
        ],
        [
          {
            type: 'select',
            name: 'status-main',
            outlined: true,
            placeholder: ' ',
            label: 'وضعیت:',
            col: 'col-md-4',
            value: null,
            options: [
              // { label: 'پیش نویس', value: 5 },
              // { label: 'زمان بندی شده', value: 3 },
              // { label: 'منتشر شده', value: 8 },
              { label: 'غیرفعال', value: 0 },
              { label: 'فعال', value: 1 }
            ]
          }
        ]
      ],
      chosenInputIndex: 0
    }
  },
  computed: {
    isInEditMode() {
      return this.editSelectorValue && this.editSelectorValue !== 'ویرایش'
    }
  },
  watch: {
    editSelectorValue(inputObj) {
      if (!this.isInEditMode) {
        return
      }
      this.chooseFormBuilderInputs(inputObj.value)
    },
    allEditModeInputs: {
      handler(newValue) {
        this.setChosenInputForm(newValue)
      },
      deep: true
    }
  },
  methods: {
    editSelectedContents () {
      const currentInput = this.allEditModeInputs[this.chosenInputIndex]
      const requestBody = this.getEditContentRequestBody(currentInput[0].value, currentInput)
      if (!currentInput || !currentInput[0].name) {
        return
      }
      const currentInputName = currentInput[0].name
      const apiInstance = this.$apiGateway.content
      if (currentInputName === 'tags-main') {
        apiInstance.bulkEditTags(requestBody)
          .then((res) => {
            this.$q.notify({
              type: 'positive',
              message: res.message,
              position: 'top'
            })
            this.contentUpdated()
          })
          .catch(() => {})
      } else if (currentInputName === 'status-main') {
        apiInstance.bulkUpdate(requestBody)
          .then((res) => {
            this.$q.notify({
              type: 'positive',
              message: res.message,
              position: 'top'
            })
            this.contentUpdated()
          })
          .catch(() => {})
      } else {
        apiInstance.bulkEditText(requestBody)
          .then((res) => {
            this.$q.notify({
              type: 'positive',
              message: res.message,
              position: 'top'
            })
            this.contentUpdated()
          })
          .catch(() => {})
      }
    },
    contentUpdated () {
      this.$emit('contentUpdated')
    },
    getEditContentRequestBody (mode, currentInput) {
      const currentInputName = currentInput[0].name
      return {
        content_ids: this.getSelectedValuesIds(),
        ...((currentInputName.includes('name') ||
            currentInputName.includes('description')) &&
          { column: currentInputName.replace('-main', '') }),
        ...(((currentInputName !== 'status-main')) &&
          { operation: currentInput[0].value }),
        ...((currentInputName.includes('name') ||
            currentInputName.includes('description')) &&
          { text: currentInput[0].value === 'replace' ? currentInput[2].value[0].value : currentInput[1].value }),
        ...((!currentInputName.includes('tags') && currentInput[0].value === 'replace') &&
          { replacing_text: currentInput[2].value[1].value }),
        ...((currentInputName.includes('tags') && currentInput[0].value === 'replace') &&
          { tag: currentInput[2].value[0].value }),
        ...((currentInputName.includes('tags') && currentInput[0].value !== 'replace') &&
          { tags: currentInput[1].value }),
        ...((currentInputName.includes('tags') && currentInput[0].value === 'replace') &&
          { replacing_tag: currentInput[2].value[1].value }),
        ...(((currentInputName === 'status-main')) &&
          { enable: currentInput[0].value })
        // validSince: '2022-09-03 12:41:55'
      }
    },

    deleteSelectedContents () {
      this.$apiGateway.content.deleteContents({
        contents: this.getSelectedValuesIds()
      })
        .then((res) => {
          this.$q.notify({
            type: 'positive',
            message: res.message,
            position: 'top'
          })
          this.contentUpdated()
        })
        .catch(() => {})
      this.moreSelectorValue = 'بیشتر'
    },
    attachToSet() {
      const setId = this.setInput[0].selected.id
      this.$apiGateway.set.attachContents(setId, {
        contents: this.getSelectedValuesIds()
      })
        .then((res) => {
          this.$q.notify({
            type: 'positive',
            message: res.message,
            position: 'top'
          })
          this.setInput[0].value = []
          this.setInput[0].selected = []
        })
        .catch(() => {})
    },
    getSelectedValuesIds() {
      return this.selectedValues.map(item => item.id)
    },
    executeMoreSelectorAction (selectedAction) {
      if (selectedAction.value === 'delete') {
        this.deleteSelectedContents()
      }
    },
    emptyEditSelectorValue() {
      this.editSelectorValue = 'ویرایش'
      this.$refs.formBuilder.clearFormBuilderInputValues()
    },
    chooseFormBuilderInputs (chosenInputName) {
      this.chosenInputIndex = this.allEditModeInputs.findIndex(input => input[0].name === chosenInputName)
    },
    setChosenInputForm (value) {
      const chosenInput = value[this.chosenInputIndex]
      if (!chosenInput[2]) {
        return
      }
      if (chosenInput[0].value === chosenInput[2].name) {
        this.setFormBuilderReplaceMode(chosenInput)
      } else {
        this.setFormBuilderInputMode(chosenInput)
      }
    },
    setFormBuilderReplaceMode (chosenInput) {
      chosenInput[1].type = 'hidden'
      chosenInput[2].type = 'formBuilder'
    },
    setFormBuilderInputMode (chosenInput) {
      chosenInput[1].type = 'input'
      chosenInput[2].type = 'hidden'
    }
  }
}
</script>

<style scoped lang="scss">
.entity-edit-header {
  padding-top: 20px;

  .upper-card {
    color: #F4F5F6;
    display: grid;
    grid-template-columns: 170px auto;

    :deep(.q-field) {
      .q-field__append {
        color: #F4F5F6;
      }

      .q-field__native {
        color: #F4F5F6;
      }
    }

    .header-item {
      margin-left: 10px;
      margin-right: 10px;
    }

    .line {
      //padding-bottom: 20px;
      //padding-right: 0;
      width: 0;
      height: 42px;
      border: 1px solid #ffe9cc;
    }
    .base-part {}

    .edit-mode {
     .selector {
        width: 120px;
     }

      .lower-card{
        //color: #65677F;
      }
    }
  }

}
</style>

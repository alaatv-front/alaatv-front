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
                     @click="onClick('filter')" />
            </div>
          </div>
        </div>

        <div v-else
             class="menu-mode flex items-center">
          <div class="header-item">
            <q-btn flat
                   label="افزودن به مجموعه"
                   @click="emptyEditSelectorValue" />
          </div>
          <div class="header-item selector">
            <q-select v-model="editSelectorValue"
                      borderless
                      :options="editSelectorOptions" />
          </div>
          <div class="header-item selector">
            <q-select v-model="moreSelectorValue"
                      borderless
                      :options="moreSelectorOptions" /></div>
        </div>
      </q-card>
      <q-card v-if="isInEditMode"
              class="bg-secondary q-pa-md lower-card">
        <form-builder v-model:value="allEditModeInputs[chosenInputIndex]" />
      </q-card>
    </div>
  </div>
</template>

<script>
import FormBuilder from 'quasar-form-builder/src/FormBuilder.vue'
export default {
  name: 'EntityEditHeader',
  components: { FormBuilder },
  props: {
    selectedValues: {
      default() {
        return []
      },
      type: Array
    }
  },
  emits: [
    'selectedValues'
  ],
  data() {
    return {
      moreSelectorValue: 'بیشتر',
      moreSelectorOptions: [
        { label: 'حذف', value: 'delete' },
        { label: 'دانلود', value: 'download' }
      ],
      editSelectorValue: 'ویرایش',
      editSelectorOptions: [
        { label: 'عنوان', value: 'title' },
        { label: 'توضیحات', value: 'description' },
        { label: 'تگ ها', value: 'tags' },
        { label: 'وضعیت', value: 'status' }
      ],
      allEditModeInputs: [
        [
          { type: 'select', name: 'title', outlined: true, label: 'نوع ویرایش:', col: 'col-md-4', value: 0, options: [{ label: 'افزودن به انتهای عنوان', value: 5 }, { label: 'افزودن به ابتدای عنوان', value: 3 }, { label: 'حذف واژه از عنوان', value: 8 }, { label: 'جاگزینی واژه در توضیحات', value: 0 }] },
          { type: 'input', name: 'description', outlined: true, filled: true, autogrow: true, value: null, placeholder: 'متن مورد نظر خود را وارد نمایید', label: 'متن ویرایش:', col: 'col-md-8' }
        ],
        [
          { type: 'select', name: 'description', outlined: true, label: 'نوع ویرایش:', col: 'col-md-4', value: 0, options: [{ label: 'افزودن به انتهای توضیحات', value: 5 }, { label: 'افزودن به ابتدای توضیحات', value: 3 }, { label: 'حذف واژه از توضیحات', value: 8 }, { label: 'جاگزینی واژه در توضیحات', value: 0 }] },
          { type: 'input', name: 'description', outlined: true, filled: true, autogrow: true, value: null, placeholder: 'واژه مورد نظر خود را وارد نمایید', label: 'واژه فعلی:', col: 'col-md-4' },
          { type: 'input', name: 'description', outlined: true, filled: true, autogrow: true, value: null, placeholder: 'واژه مورد نظر خود را وارد نمایید', label: 'واژه جایگزین:', col: 'col-md-4' }
        ],
        [
          { type: 'select', name: 'tags', outlined: true, label: 'نوع ویرایش:', col: 'col-md-4', value: 5, options: [{ label: 'اضافه کردن تگ', value: 5 }, { label: 'حذف کردن تگ', value: 3 }, { label: 'جابجایی تگ', value: 8 }] },
          { type: 'input', name: 'description', outlined: true, filled: true, autogrow: true, value: null, placeholder: 'متن مورد نظر خود را وارد نمایید', label: 'تگ ها:', col: 'col-md-8' }
        ],
        [
          { type: 'select', name: 'status', outlined: true, label: 'وضعیت:', col: 'col-md-4', value: 0, options: [{ label: 'پیش نویس', value: 5 }, { label: 'زمان بندی شده', value: 3 }, { label: 'منتشر شده', value: 8 }, { label: 'غیرفعال', value: 0 }] }
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
    }
  },
  methods: {
    emptyEditSelectorValue() {
      this.editSelectorValue = 'ویرایش'
    },
    chooseFormBuilderInputs (chosenInputName) {
      this.chosenInputIndex = this.allEditModeInputs.findIndex(input => input[0].name === chosenInputName)
    }
  }
}
</script>

<style scoped lang="scss">
.entity-edit-header {
  padding-top: 20px;
  .upper-card {
    color: var(--alaa-Neutral2);
    display: grid;
    grid-template-columns: 180px auto;
    :deep(.q-field) {
      .q-field__append {
        color: var(--alaa-Neutral2);
      }
      .q-field__native {
        color: var(--alaa-Neutral2);
      }
    }
    .header-item {
      margin-right: 20px;
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
        //color: var(--alaa-TextSecondary);
      }
    }
  }

}
</style>

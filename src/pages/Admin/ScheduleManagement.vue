<template>
  <entity-crud v-model:edit-inputs="editInputs"
               v-model:index-inputs="indexInputs"
               v-model:show-inputs="showInputs"
               v-model:create-inputs="createInputs"
               v-model:default-inputs="defaultInputs"
               :before-get-edit-data="testMethod1"
               :before-load-edit-input-data="testMethod2"
               :after-load-edit-input-data="testMethod3"
               v-bind="allProps">
    <template v-slot:before-entity-create>
      <q-select v-model="model"
                use-input
                use-chips
                multiple
                input-debounce="0"
                :options="tags"
                @new-value="createValue" />
    </template>
    <template v-slot:entity-crud-table-cell="{inputData}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.Content.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده شیفت کاری
            </q-tooltip>
          </q-btn>
        </template>
        <template v-else-if="inputData.props.col.name === 'description'">
          <div v-html="inputData.props.value" />
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
  </entity-crud>
</template>

<script>
import EntityCrud from 'src/components/EntityCrud.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ScheduleManagement',
  components: {
    EntityCrud
  },
  data () {
    return {
      model: null,
      tags: [],
      expanded: true,
      allProps: {
        config: {
          // toDo : temp, 'Content' should be replaced with 'ScheduleManagement'
          api: {
            show: APIGateway.content.APIAdresses.scheduleManagement.show,
            edit: APIGateway.content.APIAdresses.scheduleManagement.edit,
            create: APIGateway.content.APIAdresses.scheduleManagement.create,
            index: APIGateway.content.APIAdresses.scheduleManagement.index
          },
          title: {
            show: 'مشاهده شیفت کاری',
            edit: 'ویرایش شیفت کاری',
            create: 'ثبت محتوای جدید',
            index: 'لیست کارمندان'
          },
          // toDo : temp, 'Content' should be replaced with 'ScheduleManagement'
          showRouteName: 'Admin.Content.Show',
          editRouteName: 'Admin.Content.Edit',
          indexRouteName: 'Admin.Content.Index',
          createRouteName: 'Admin.Content.Create',
          tableKeys: {
            data: 'data',
            total: 'meta.total',
            currentPage: 'meta.current_page',
            perPage: 'meta.per_page',
            pageKey: 'contentPage'
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
                name: 'name',
                required: true,
                label: 'نام کاربری',
                align: 'left',
                field: row => row.name
              },
              {
                name: 'description',
                required: true,
                label: 'توضیحات',
                align: 'left',
                field: row => row.description
              },
              {
                name: 'actions',
                required: true,
                label: 'عملیات',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      defaultInputs: [
        { type: 'file', name: 'photo', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'optionGroupRadio', name: 'is_free', responseKey: 'data.is_free', label: '', col: 'col-md-3', options: [{ label: 'رایگان باشد', value: 1 }, { label: 'رایگان نباشد', value: 0 }] },
        { type: 'optionGroupRadio', name: 'enable', options: [{ label: 'غیرفعال', value: 0 }, { label: 'فعال', value: 1 }], responseKey: 'data.enable', label: 'وضعیت', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'discount', options: [{ label: 'عدم نمایش', value: 0 }, { label: 'نمایش', value: 1 }], responseKey: 'data.discount', label: 'نمایش', col: 'col-md-3' },
        { type: 'optionGroupCheckbox', multiple: true, options: [{ label: 'درج کیفیت hq', value: 0 }, { label: 'درج کیفیت HD', value: 1 }, { label: 'درج کیفیت 240p', value: 2 }], name: 'enable', value: [1], label: 'کیفیت محتوا', col: 'col-md-3' },
        { type: 'file', name: 'video-1', label: 'کیفیت عالی', responseKey: 'data.file.video[0].link', size: '250px', col: 'col-md-4' },
        { type: 'file', name: 'video-2', responseKey: 'data.file.video[0].link', label: 'کیفیت خوب', size: '250px', col: 'col-md-4' },
        { type: 'file', name: 'video-3', responseKey: 'data.file.video[0].link', label: 'کیفیت متوسط', size: '250px', col: 'col-md-4' },
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'نمایان شدن برای کاربران', col: 'col-md-3' },
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'تاریخ درج', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', label: 'آیدی دبیر', col: 'col-md-3' },
        { type: 'input', name: 'redirect_url', responseKey: 'data.redirect_url', label: 'آدرس ریدایرکت', col: 'col-md-3' },
        { type: 'select', name: 'redirect_code', responseKey: 'data.product_type.display_name', options: [{ label: '301 (دائمی)', value: 301 }, { label: '302 (موقتی)', value: 302 }], label: 'کد ریدایرکت', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', label: 'ترتیب', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', value: null, options: [{ label: 'ویدئو', value: 0 }, { label: 'جزوه', value: 8 }, { label: 'مقاله', value: 3 }], label: 'نوع محتوا', col: 'col-md-3' },
        { type: 'select', name: 'attribute_set', responseKey: 'data.attribute_set.id', label: 'سکشن محتوا', col: 'col-md-3', options: [{ label: 'اردو', value: 1 }, { label: 'همایش', value: 2 }, { label: 'فیلم استودیو', value: 3 }, { label: 'جزوه درس', value: 4 }, { label: 'کتاب', value: 5 }, { label: 'پیش فرض', value: 6 }, { label: 'محصول اشتراک', value: 7 }, { label: 'آزمون', value: 8 }] },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'نام*', col: 'col-md-3' },
        { type: 'input-editor', name: 'short_description', responseKey: 'data.description.short', label: 'توضیحات', col: 'col-md-12' },
        { type: 'select', name: 'tags', options: [], responseKey: 'data.tags', multiple: true, useChips: true, createNewValue: true, label: 'تگ ها', col: 'col-md-6' },
        { type: 'input', name: 'tags-title', responseKey: 'data.tags.title', label: 'متن تگ ها', col: 'col-md-6' },
        { type: 'input', name: 'order', responseKey: '', label: 'ابر عنوان', col: 'col-md-6' },
        { type: 'input', name: 'order', responseKey: '', label: 'ابر توضیح', col: 'col-md-6' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'name', value: null, label: 'عنوان', col: 'col-md-3' },
        { type: 'time', name: 'created_at_range', value: [], label: 'تاریخ ثبت ایجاد', col: 'col-md-4' }
      ]
    }
  },
  watch: {
    // editInputs: {
    //   handler (newValue, oldValue) {
    //     console.log('inputs', newValue)
    //   },
    //   deep: true
    // }
  },
  created () {},
  methods: {
    createValue (val, done) {
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 0) {
        if (!this.tags.includes(val)) {
          this.tags.push(val)
        }
        done(val, 'toggle')
      }
    },
    testMethod () {},
    testMethod1 () {},
    testMethod2 () {},
    testMethod3 () {}
  }
}
</script>

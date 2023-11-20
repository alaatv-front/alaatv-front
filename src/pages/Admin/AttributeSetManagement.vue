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
    <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.AttributeSetManagement.Edit', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              ویرایش
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="negative"
                 icon="delete"
                 class="q-ml-md"
                 @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
            <q-tooltip>
              حذف
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
  name: 'AttributeSetManagement',
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
          api: {
            show: APIGateway.attribute.attributeSetManagement.show.base,
            edit: APIGateway.attribute.attributeSetManagement.edit.base,
            create: APIGateway.attribute.attributeSetManagement.create.base,
            index: APIGateway.attribute.attributeSetManagement.index.base
          },
          title: {
            show: 'اطلاعات دسته صفت',
            edit: 'اطلاعات دسته صفت',
            create: 'ثبت دسته صفت جدید',
            index: 'لیست دسته صفت'
          },
          showRouteName: 'Admin.AttributeSetManagement.Show',
          editRouteName: 'Admin.AttributeSetManagement.Edit',
          indexRouteName: 'Admin.AttributeSetManagement.Index',
          createRouteName: 'Admin.AttributeSetManagement.Create',
          tableKeys: {
            data: 'data',
            total: 'meta.total',
            currentPage: 'meta.current_page',
            perPage: 'meta.per_page',
            pageKey: 'contentPage'
          },
          table: {
            columns: [
              // {
              //   name: 'id',
              //   required: true,
              //   label: '#',
              //   align: 'left',
              //   field: row => row.id
              // },
              {
                name: 'mobile',
                required: true,
                label: 'نام',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'national_code',
                required: true,
                label: 'توضیح',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'price',
                required: true,
                label: 'زمان درج',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'price',
                required: true,
                label: 'زمان اصلاح',
                align: 'left',
                field: row => row.id
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
        { type: 'input', name: 'name', value: null, label: 'وارد کردن اطلاعات زیر الزامی می باشد:', col: 'col-md-12' },
        { type: 'input', name: 'name', value: null, label: 'نام دسته صفت', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'وارد کردن اطلاعات زیر اختیاری می باشد:', col: 'col-md-12' },
        { type: 'input', name: 'name', value: null, label: 'توضیح درباره دسته صفت', col: 'col-md-3' }
      ],
      createInputs: [
        { type: 'input', name: 'name', value: null, label: 'وارد کردن اطلاعات زیر الزامی می باشد:', col: 'col-md-12' },
        { type: 'input', name: 'name', value: null, label: 'نام دسته صفت', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'وارد کردن اطلاعات زیر اختیاری می باشد:', col: 'col-md-12' },
        { type: 'input', name: 'name', value: null, label: 'توضیح درباره دسته صفت', col: 'col-md-3' }
      ],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', value: null, label: 'عنوان', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'زمان درج', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'زمان اصلاح', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'توضیحات', col: 'col-md-3' }
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
    // for index.vue
    getRemoveMessage (row) {
      const firstName = row.first_name
      const lastName = row.last_name
      return 'آیا از حذف ' + firstName + ' ' + lastName + ' اطمینان دارید؟'
    },
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

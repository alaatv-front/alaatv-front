<template>
  <entity-crud v-model:default-inputs="defaultInputs"
               v-model:create-inputs="createInputs"
               v-bind="allEntityCrudParentProps">
    <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.AttributeManagement.Edit', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              اصلاح
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
    <template v-slot:after-entity-edit>
      <entity-crud v-model:default-inputs="defaultInputs"
                   v-model:create-inputs="createInputs"
                   v-bind="allEntityCrudChildProps">
        <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
          <q-td :props="inputData.props">
            <template v-if="inputData.props.col.name === 'actions'">
              <q-btn round
                     flat
                     dense
                     size="md"
                     color="info"
                     icon="info"
                     :to="{name:'Admin.AttributeValue.Edit', params: {id: inputData.props.row.id}}">
                <q-tooltip>
                  اصلاح
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
  </entity-crud>
</template>

<script>
import EntityCrud from 'src/components/EntityCrud.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'AttributeManagement',
  components: {
    EntityCrud
  },
  data () {
    return {
      model: null,
      tags: [],
      expanded: true,
      allEntityCrudParentProps: {
        config: {
          // toDo : temp, 'Content' should be replaced with 'order'
          api: {
            show: APIGateway.attribute.APIAddresses.attributeManagement.show.base,
            edit: APIGateway.attribute.APIAddresses.attributeManagement.edit.base,
            create: APIGateway.attribute.APIAddresses.attributeManagement.create.base,
            index: APIGateway.attribute.APIAddresses.attributeManagement.index.base
          },
          title: {
            show: 'اطلاعات صفت',
            edit: 'ویرایش صفت',
            create: 'افزودن صفت جدید',
            index: 'لیست صفت ها'
          },
          // toDo : temp, 'Content' should be replaced with 'order'
          showRouteName: 'Admin.AttributeManagement.Show',
          editRouteName: 'Admin.AttributeManagement.Edit',
          indexRouteName: 'Admin.AttributeManagement.Index',
          createRouteName: 'Admin.AttributeManagement.Create',
          tableKeys: {
            data: 'data',
            total: 'meta.total',
            currentPage: 'meta.current_page',
            perPage: 'meta.per_page',
            pageKey: 'productPage'
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
                name: 'first_name',
                required: true,
                label: 'نام (اصلی)',
                align: 'left',
                field: row => row.first_name
              },
              {
                name: 'first_name',
                required: true,
                label: 'نام قابل نمایش (فارسی)',
                align: 'left',
                field: row => row.last_name
              },
              {
                name: 'mobile',
                required: true,
                label: 'نوع کنترل صفت',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'national_code',
                required: true,
                label: 'توضیح',
                align: 'left',
                field: row => row.national_code
              },
              {
                name: 'price',
                required: true,
                label: 'زمان درج',
                align: 'left',
                field: row => row.price
              },
              {
                name: 'paid_price',
                required: true,
                label: 'زمان اصلاح',
                align: 'left',
                field: row => row.price
              },
              {
                name: 'actions',
                required: true,
                label: '',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      allEntityCrudChildProps: {
        config: {
          api: {
            show: APIGateway.attribute.APIAdresses.attributeValue.show.base,
            edit: APIGateway.attribute.APIAdresses.attributeValue.edit.base,
            create: APIGateway.attribute.APIAdresses.attributeValue.create.base,
            index: APIGateway.attribute.APIAdresses.attributeValue.index.base
          },
          title: {
            show: 'اطلاعات مقدار صفت',
            edit: 'ویرایش مقدار صفت',
            create: 'افزودن مقدار صفت جدید',
            index: 'لیست مقدار صفت ها'
          },
          showRouteName: 'Admin.AttributeValue.Show',
          editRouteName: 'Admin.AttributeValue.Edit',
          indexRouteName: 'Admin.AttributeValue.Index',
          createRouteName: 'Admin.AttributeValue.Create',
          tableKeys: {
            data: 'data',
            total: 'meta.total',
            currentPage: 'meta.current_page',
            perPage: 'meta.per_page',
            pageKey: 'productPage'
          },
          table: {
            columns: [
              {
                name: 'paid_price',
                required: true,
                label: 'مقدار',
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
                name: 'actions',
                required: true,
                label: 'عملیات',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        },
        customInitialMode: 'index'
      },
      defaultInputs: [
        { type: 'input', name: 'name', value: null, label: 'نام صفت', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام قابل نمایش', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'نوع کنترل صفت', col: 'col-md-3', value: null, options: [{ label: 'select', value: 0 }, { label: 'groupedCheckbox', value: 8 }, { label: 'switch', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'نوع صفت', col: 'col-md-3', value: null, options: [{ label: 'صفت اصلی', value: 0 }, { label: 'صفت غیر اصلی', value: 8 }, { label: 'صفت توضیحی', value: 3 }, { label: 'اشتراک', value: 3 }] },
        { type: 'input', name: 'name', value: null, label: 'توضیح درباره صفت (اختیاری)', col: 'col-md-12' },
        { type: 'space', col: 'col-md-12' }
      ],
      createInputs: [
        { type: 'input', name: 'name', value: null, label: 'نام صفت', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام قابل نمایش', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'نوع کنترل صفت', col: 'col-md-3', value: null, options: [{ label: 'select', value: 0 }, { label: 'groupedCheckbox', value: 8 }, { label: 'switch', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'نوع صفت', col: 'col-md-3', value: null, options: [{ label: 'صفت اصلی', value: 0 }, { label: 'صفت غیر اصلی', value: 8 }, { label: 'صفت توضیحی', value: 3 }, { label: 'اشتراک', value: 3 }] },
        { type: 'input', name: 'name', value: null, label: 'توضیح درباره صفت (اختیاری)', col: 'col-md-12' }
      ],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', value: null, label: 'نام (اصلی)', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام قابل نمایش (فارسی)', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'نوع کنترل صفت', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'توضیح', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'زمان درج', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'زمان اصلاح', col: 'col-md-3' },
        // todo : مقاله exact value unknown
        { type: 'select', name: 'content_type_id', value: null, options: [{ label: 'ویدئو', value: 0 }, { label: 'جزوه', value: 8 }, { label: 'مقاله', value: 3 }], label: 'نوع محتوا', col: 'col-md-3' },
        { type: 'select', name: 'is_free', value: null, options: [{ label: 'رایگان', value: 1 }, { label: 'غیر رایگان', value: 0 }], label: 'وضعیت رایگان / غیر رایگان', col: 'col-md-3' },
        { type: 'select', name: 'enable', value: null, options: [{ label: 'فعال', value: 1 }, { label: 'غیرفعال', value: 0 }], label: 'وضعیت فعال / غیرفعال', col: 'col-md-3' },
        { type: 'select', name: 'display', value: null, options: [{ label: 'نمایش', value: 1 }, { label: 'عدم نمایش', value: 0 }], label: 'وضعیت نمایش / عدم نمایش', col: 'col-md-3' },
        { type: 'date', calendarIcon: ' ', name: 'created_at_range', value: [], label: 'تاریخ ثبت ایجاد', col: 'col-md-4' }
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
    }
  }
}
</script>

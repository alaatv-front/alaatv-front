<template>
  <!--  v-model:index-inputs="indexInputs"-->
  <entity-crud v-model:default-inputs="defaultInputs"
               v-model:index-inputs="indexInputs"
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
                 :to="{name:'Admin.Content.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده
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
  name: 'Coupons',
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
            show: APIGateway.coupon.APIAdresses.show,
            edit: APIGateway.coupon.APIAdresses.edit,
            create: APIGateway.coupon.APIAdresses.create,
            index: APIGateway.coupon.APIAdresses.index
          },
          title: {
            show: 'اطلاعات  کپن ها',
            edit: 'اطلاعات  کپن ها',
            create: 'افزودن کپن جدید',
            index: 'لیست  کپن ها'
          },
          showRouteName: 'Admin.Coupons.Show',
          editRouteName: 'Admin.Coupons.Edit',
          indexRouteName: 'Admin.Coupons.Index',
          createRouteName: 'Admin.Coupons.Create',
          tableKeys: {
            data: 'data',
            total: 'meta.total',
            currentPage: 'meta.current_page',
            perPage: 'meta.per_page',
            pageKey: 'productPage'
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
                label: 'کد کپن',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'price',
                required: true,
                label: 'وضعیت',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'paid_price',
                required: true,
                label: 'تخفیف',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'orderstatus',
                required: true,
                label: 'حداکثر مبلغ مجاز خرید',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'paymentstatus',
                required: true,
                label: 'تعداد',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'paymentstatus',
                required: true,
                label: 'تعداد استفاده شده',
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
        { type: 'input', name: 'name', value: null, label: 'نام کپن', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'کد کپن', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'کدملی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'وارد کردن اطلاعات زیر اختیاری می باشد:', col: 'col-md-12' },
        { type: 'optionGroupRadio', name: 'is_free', responseKey: 'data.is_free', label: '', col: 'col-md-3', options: [{ label: 'غیر فعال', value: 1 }, { label: 'فعال', value: 0 }] },
        { type: 'input', name: 'name', value: null, label: 'میزان تخفیف کپن', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'حداکثر تعداد مجاز برای استفاده از این کپن', col: 'col-md-3', value: null, options: [{ label: 'محدود', value: 8 }, { label: 'نامحدود', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'محصولات مشمول کپن', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'input', name: 'name', value: null, label: 'توضیح درباره کپن', col: 'col-md-3' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ شروع معتبر بودن کپن', col: 'col-md-3' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ پایان معتبر بودن کپن', col: 'col-md-3' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'name', value: null, label: 'نام کپن', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'کد کپن', col: 'col-md-3' }
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

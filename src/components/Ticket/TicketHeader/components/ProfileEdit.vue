<template>
  <entity-edit ref="entityEdit"
               v-model:value="inputs"
               :api="api"
               :entity-id-key="entityIdKey"
               :entity-param-key="entityParamKey"
               :show-close-button="false"
               :defaultLayout="false"
               :loaded-data="ticketUser">
    <template #after-form-builder>
      <div class="col-12 q-my-md flex justify-end">
        <q-btn v-close-popup
               label="انصراف"
               color="grey"
               outline
               class="size-md q-mr-md" />
        <q-btn label="ثبت تغییرات"
               color="primary"
               class="size-md"
               @click="submit" />
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { defineComponent } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { User } from 'src/models/User'
export default defineComponent({
  name: 'ProfileEdit',
  components: {
    EntityEdit
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  data () {
    return {
      provinces: [],
      cities: [],
      ticketUser: new User(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        {
          type: 'input',
          name: 'first_name',
          responseKey: 'first_name',
          label: 'نام',
          outlined: true,
          placeholder: ' ',
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'input',
          name: 'last_name',
          responseKey: 'last_name',
          label: 'نام خانوادگی',
          outlined: true,
          placeholder: ' ',
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'input',
          name: 'national_code',
          responseKey: 'national_code',
          label: 'کد ملی',
          outlined: true,
          placeholder: ' ',
          col: 'col-sm-6 col-12',
          value: '',
          readonly: true
        },
        {
          type: 'input',
          name: 'mobile',
          responseKey: 'mobile',
          label: 'شماره موبایل',
          outlined: true,
          placeholder: ' ',
          col: 'col-sm-6 col-12',
          value: '09999999999',
          readonly: true
        },
        {
          type: 'select',
          name: 'status',
          label: 'وضعیت حساب',
          responseKey: 'status.displayName',
          placeholder: ' ',
          clearable: false,
          optionLabel: 'status.displayName',
          optionValue: 'status.id',
          outlined: true,
          multiple: false,
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'select',
          name: 'major',
          label: 'رشته تحصیلی',
          responseKey: 'major.title',
          placeholder: ' ',
          clearable: false,
          optionLabel: 'name',
          outlined: true,
          multiple: false,
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'select',
          name: 'grade',
          label: 'مقطع تحصیلی',
          responseKey: 'grade.title',
          placeholder: ' ',
          clearable: false,
          optionLabel: 'name',
          outlined: true,
          multiple: false,
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'select',
          name: 'province',
          label: 'استان',
          responseKey: 'province(read_from_city)',
          placeholder: ' ',
          clearable: false,
          optionLabel: 'title',
          optionValue: 'id',
          outlined: true,
          multiple: false,
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'select',
          name: 'shahr_id',
          label: 'شهر',
          responseKey: 'shahr.id',
          placeholder: ' ',
          optionLabel: 'title',
          optionValue: 'id',
          outlined: true,
          multiple: false,
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'input',
          name: 'school',
          label: 'مدرسه',
          responseKey: 'school',
          placeholder: ' ',
          outlined: true,
          multiple: false,
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'input',
          name: 'address',
          label: 'آدرس',
          responseKey: 'address',
          placeholder: ' ',
          outlined: true,
          multiple: false,
          col: 'col-12',
          value: null
        },
        {
          type: 'hidden',
          name: 'updateType',
          value: 'total'
        }
      ]
    }
  },
  computed: {
    api () {
      return APIGateway.user.APIAdresses.base + '/' + this.ticket.user.id
    }
  },
  mounted () {
    this.getFormData()
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      APIGateway.user.get({ data: { id: this.thicket.user.id } })
        .then(user => {
          this.ticketUser = new User(user)
        })
    },
    getFormData () {
      APIGateway.events.formBuilder({ params: ['majors', 'grades', 'genders', 'provinces', 'cities', 'userStatuses'] })
        .then((formData) => {
          // edit entity

          FormBuilderAssist.setAttributeByName(this.inputs, 'status', 'options', formData.userStatuses)
          FormBuilderAssist.setAttributeByName(this.inputs, 'grade', 'options', formData.grades)
          FormBuilderAssist.setAttributeByName(this.inputs, 'major', 'options', formData.majors)
          FormBuilderAssist.setAttributeByName(this.inputs, 'gender', 'options', formData.genders)
          FormBuilderAssist.setAttributeByName(this.inputs, 'province', 'options', formData.provinces)
          FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'options', formData.cities)

          this.provinces = formData.provinces
          this.cities = formData.cities
        })
        .catch(() => {
        })
    },
    submit () {
      this.$store.commit('loading/loading', true)

      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$store.commit('loading/loading', false)
        })
        .catch(() => {
          this.$store.commit('loading/loading', false)
        })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

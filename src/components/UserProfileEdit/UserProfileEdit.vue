<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-header__avatar">
        <q-avatar v-if="computedUser.photo"
                  size="64px">
          <lazy-img :src="computedUser.photo"
                    width="100%"
                    height="100%" />
        </q-avatar>
        <q-avatar v-else
                  size="64px"
                  font-size="64px"
                  color="grey"
                  text-color="white"
                  icon="ph:user" />
        <q-btn icon="ph:pencil-simple"
               round
               color="secondary"
               class="size-sm profile-header__avatar--edit"
               @click="openAvatarDialog" />
      </div>
      <div class="profile-header__info">
        <div class="profile-header__info__id">
          شناسه کاربر : {{ computedUser.id }}
        </div>
        <div class="profile-header__info__create-date">
          تاریخ ثبت نام : {{ computedUser.shamsiDate('created_at').dateTime }}
        </div>
        <div class="profile-header__info__update-date">
          تاریخ آخرین بروزرسانی : {{ computedUser.shamsiDate('updated_at').dateTime }}
        </div>
      </div>
    </div>
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 :key="entityEditKey"
                 v-model:value="inputs"
                 :api="api"
                 :loading="profileLoading"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-close-button="false"
                 :loaded-data="computedUser"
                 :defaultLayout="false">
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
    <q-dialog v-model="avatarDialog">
      <avatar-form :user="user"
                   @photo-updated="getUserInfo" />
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { User } from 'src/models/User'
import { EntityEdit } from 'quasar-crud'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import AvatarForm from './AvatarForm.vue'

export default defineComponent({
  name: 'UserProfileEdit',
  components: {
    LazyImg,
    EntityEdit,
    AvatarForm
  },
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      cities: [],
      mounted: false,
      provinces: [],
      user: new User(),
      entityEditKey: 0,
      entityIdKey: 'id',
      avatarDialog: false,
      entityParamKey: 'id',
      profileLoading: false,
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
          required: true,
          outlined: true,
          placeholder: ' ',
          col: 'col-sm-6 col-12',
          value: null
        },
        {
          type: 'input',
          name: 'nationalCode',
          responseKey: 'national_code',
          label: 'کد ملی',
          required: true,
          outlined: true,
          placeholder: ' ',
          col: 'col-sm-6 col-12',
          value: ''
        },
        {
          type: 'input',
          name: 'mobile',
          responseKey: 'mobile',
          label: 'شماره موبایل',
          required: true,
          outlined: true,
          placeholder: ' ',
          col: 'col-sm-4 col-8',
          value: ''
        },
        {
          type: 'checkbox',
          name: 'is_mobile_verified',
          responseKey: 'is_mobile_verified',
          label: 'تایید',
          required: false,
          outlined: false,
          placeholder: ' ',
          col: 'col-sm-2 col-4 flex items-end'
        },
        {
          type: 'select',
          name: 'status',
          label: 'وضعیت حساب',
          responseKey: 'status.displayName',
          placeholder: ' ',
          clearable: false,
          optionLabel: 'displayName',
          optionValue: 'id',
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
          optionValue: 'id',
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
          clearable: true,
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
          responseKey: 'shahr.title',
          placeholder: ' ',
          clearable: true,
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
      ],
      api: ''
    }
  },
  computed: {
    computedUser () {
      return this.user
    },
    supporterValue () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'province').value
    }
  },
  watch: {
    supporterValue (value) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'options', this.cities.filter(city => city.ostan.id === value))
    }
  },
  mounted () {
    this.api = APIGateway.user.APIAdresses.admin.show.byId(this.userId)
    this.getUserInfo()
    this.getFormData()
    this.mounted = true
  },
  methods: {
    getUserInfo () {
      APIGateway.user.adminGetUser(this.userId)
        .then(user => {
          this.user = new User(user)
          this.entityEditKey++
        })
        .catch(() => {})
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

          this.provinces = formData.provinces
          this.cities = formData.cities
        })
        .catch(() => {
        })
    },
    openAvatarDialog () {
      this.avatarDialog = true
    },
    submit () {
      this.profileLoading = true

      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.getUserInfo()
          this.profileLoading = false
        })
        .catch(() => {
          this.profileLoading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.profile {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $space-5;
    align-self: stretch;
  }

  &-header {
    display: flex;
    padding-left: $space-5;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    &__avatar {
      position: relative;

      &--edit {
        position: absolute;
        bottom: -$space-1;
        right: -$space-2;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: $space-1;
      color: $grey-7;
      @include caption1;
      text-align: right;
    }
  }
}
</style>

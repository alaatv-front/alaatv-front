<template>
  <div :class="options.className"
       :style="options.style">
    <entity-edit ref="entityEdit"
                 v-model:value="localInputs"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :defaultLayout="defaultLayout"
                 :before-get-data="beforeGetData"
                 :before-send-data="beforeSendData"
                 :after-get-data="afterGetData"
                 :after-send-data="afterSendData">
      <template #after-form-builder>
        <div class="col-12 q-my-md flex justify-end">
          <q-btn class="submitBtn"
                 label="ثبت تغییرات"
                 @click="submit" />
        </div>
      </template>
    </entity-edit>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ProfileCrud',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data() {
    return {
      api: APIGateway.user.APIAdresses.base + '/' + this.$store.getters['Auth/user'].id,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Profile',
      localInputs: [],
      cities: [],
      selectedProvinceId: 0,
      defaultLayout: false
    }
  },
  computed: {
    shahrValues() {
      return this.cities.filter(city => city.province.id === this.$refs.entityEdit.getInputsByName('province').value?.id)
    }
  },
  watch: {
    shahrValues(newValue) {
      this.$refs.entityEdit.getInputsByName('city').options = newValue
    }
  },
  mounted() {
    this.localInputs = this.options.inputs
    if (this.$store.getters['Auth/incompleteProfile']) {
      Notify.create({
        message: 'لطفا ابتدا اطلاعات کاربری را کامل نمایید.',
        color: 'warning'
      })
    }
  },
  methods: {
    beforeGetData() {
      APIGateway.user.formData()
        .then((formData) => {
          // edit entity
          this.$refs.entityEdit.setInputAttributeByName('gender', 'options', formData.genders)
          this.$refs.entityEdit.setInputAttributeByName('province', 'options', formData.provinces)
          this.$refs.entityEdit.setInputAttributeByName('grade', 'options', formData.grades)
          this.$refs.entityEdit.setInputAttributeByName('major', 'options', formData.majors)
          this.cities = formData.cities
          // this.selectedProvinceId = this.localInputs[1].value[6].value?.id
        })
        .catch(() => {})
    },
    afterGetData() {
      this.options.inputs.forEach(input => {
        input.value.forEach(val => {
          if (val.value) {
            val.readonly = true
          }
        })
      })
      this.$store.commit('loading/loading', false)
    },
    beforeSendData(d) {
      d.postal_code = Number(d.postal_code)
      d.grade_id = d.grade ? d.grade.id : null
      d.major_id = d.major ? d.major.id : null
      if (!this.$refs.entityEdit.getInputsByName('gender').disable) {
        d.gender_id = d.gender.id
      }
    },
    afterSendData(d) {
      this.$store.commit('Auth/updateUser', d.data.data)
      this.$store.commit('loading/loading', false)
    },
    submit() {
      this.$store.commit('loading/loading', true)

      this.$refs.entityEdit.editEntity()
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.title) {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.03em;
  color: #333333;
  margin-top: 20px;
}

.submitBtn {
  width: 189px;
  background: #ffc107;
  box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
  border-radius: 8px;
  color: white;
}

:deep(.outsideLabel) {
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  margin-bottom: 11px;
}

:deep(.q-field--labeled .q-field__native) {
  padding-top: 0;
  padding-bottom: 0;
  color: #aeaeae;

  &:focus {
    color: black;
  }
}

:deep(.q-field__inner) {
  background: #f6f7f9;
  border-radius: 8px;
}

:deep(.q-field--auto-height.q-field--labeled .q-field__control-container) {
  padding-top: 0;
  color: #aeaeae;

  &:focus {
    color: black;
  }
}

:deep(.q-field__control) {
  color: #ffc107;
  height: 48px;
}

:deep(.q-input) {
  border: 0px solid #f6f7f9;
  border-radius: 8px;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: 0px;
  height: 48px !important;
}

:deep(.q-field) {
  height: 48px !important;
}

:deep(.q-field__append) {
  height: 48px !important;
}
</style>

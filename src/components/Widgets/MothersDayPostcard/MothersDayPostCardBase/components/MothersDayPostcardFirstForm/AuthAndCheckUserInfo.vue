<template>
  <q-dialog v-model="showInfoDialog"
            persistent>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md justify-center">
          <div class="col-md-6 col-12">
            <q-input v-model="user.first_name"
                     :loading="user.loading"
                     label="نام" />
          </div>
          <div class="col-md-6 col-12">
            <q-input v-model="user.last_name"
                     :loading="user.loading"
                     label="نام خانوادگی" />
          </div>
          <div class="col-md-6 col-12">
            <q-select v-model="user.major"
                      :options="majorOptions"
                      option-label="name"
                      option-value="id"
                      :loading="user.loading"
                      map-options
                      emit-value
                      label="رشته تحصیلی" />
          </div>
          <div class="col-md-6 col-12">
            <q-select v-model="user.grade"
                      :options="gradeOptions"
                      option-label="name"
                      option-value="id"
                      map-options
                      emit-value
                      :loading="user.loading"
                      label="مقطع تحصیلی" />
          </div>
          <div class="col-md-6 col-12">
            <q-btn label="تکمیل اطلاعات"
                   color="primary"
                   class="full-width"
                   :loading="user.loading"
                   @click="updateProfile" />
          </div>
        </div>
      </q-card-section>
      <q-card-section />
    </q-card>
  </q-dialog>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins.js'
import { Postcard } from 'src/models/Postcard.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'MothersDayPostcardFirstForm',
  mixins: [mixinAuth],
  props: {
    postcard: {
      type: Postcard,
      default: new Postcard()
    }
  },
  emits: ['completed'],
  data () {
    return {
      showInfoDialog: false,
      majorOptions: [],
      gradeOptions: []
    }
  },
  mounted () {
    this.checkUser()
    this.$bus.on('onLoggedIn', () => {
      this.checkUserInfo()
    })
  },
  unmounted () {
    this.$store.commit('AppLayout/updateLoginDialogPersistent', false)
  },
  methods: {
    checkUser () {
      if (this.isUserLogin) {
        this.checkUserInfo()
        return
      }

      this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params, query: this.$route.query })
      this.$store.commit('AppLayout/updateLoginDialog', true)
      this.$store.commit('AppLayout/updateLoginDialogPersistent', true)
    },
    updateProfile () {
      this.user.loading = true
      APIGateway.user.updateProfile(this.user.id, {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        major: this.user.major,
        grade: this.user.grade
      })
        .then(() => {
          this.user.loading = false
          this.$store.commit('Auth/updateUser', this.user)
          this.checkUserInfo()
        })
        .catch(() => {
          this.user.loading = false
        })
    },
    checkUserInfo () {
      this.getFormData()
      const noGrade = (!this.user.grade || !this.user.grade.id)
      const noMajor = (!this.user.major || !this.user.major.id)
      if (noGrade || noMajor) {
        this.user.grade = null
        this.user.major = null
        this.showInfoDialog = true
        return
      }

      this.showInfoDialog = false
      this.$emit('completed')
    },
    getFormData () {
      APIGateway.user.formData()
        .then((formData) => {
          this.majorOptions = formData.majors
          this.gradeOptions = formData.grades
        })
        .catch(() => {
          this.mounted = true
        })
    }
  }
}

</script>

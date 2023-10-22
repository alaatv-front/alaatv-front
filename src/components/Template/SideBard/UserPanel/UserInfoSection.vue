<template>
  <div class="UserInfoSection">
    <div class="user-photo">
      <q-avatar>
        <lazy-img :src="previewImg"
                  class="full-width" />
      </q-avatar>
      <q-file ref="file"
              v-model="file"
              :model-value="file"
              label="Label"
              class="hidden"
              @update:model-value="updateFile()" />
      <q-btn v-if="!controls"
             icon="isax:camera"
             size="xs"
             color="white"
             text-color="accent"
             round
             class="photo-edit"
             @click="updatePhoto" />
      <div v-if="controls"
           class="controls">
        <q-btn icon="isax:tick-circle"
               size="xs"
               round
               color="green"
               text-color="white"
               class="controls-btn q-mr-xs"
               @click="confirmUpdate" />
        <q-btn icon="isax:close-circle"
               size="xs"
               round
               color="red"
               text-color="white"
               class="controls-btn"
               @click="discardUpdate" />
      </div>
    </div>
    <div class="q-ml-lg namePhone full-width">
      <div class="fullName ellipsis-2-lines">
        <q-tooltip> {{ fullName }} </q-tooltip>
        {{ fullName }}
      </div>
      <div v-if="user.mobile"
           class="phoneNumber q-mt-sm">
        {{ user.mobile }}
      </div>
    </div>
    <div class="edit-action">
      <q-btn class="q-ml-lg justify-end"
             icon="isax:edit"
             size="sm"
             color="white"
             text-color="accent"
             unelevated
             :to="{name: 'UserPanel.Profile'}" />
    </div>
  </div>
</template>
<script>
import LazyImg from 'components/lazyImg.vue'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'UserInfoSection',
  components: { LazyImg },
  mixins: [mixinAuth],
  data() {
    return {
      api: APIGateway.user.APIAdresses.base,
      file: null,
      previewImg: null,
      controls: false
    }
  },
  computed: {
    fullName() {
      if (!this.user || !this.user.full_name) {
        return 'وارد نشده'
      }

      return this.user.full_name
    }
  },
  mounted () {
    this.previewImg = this.user.photo
  },
  methods: {
    updatePhoto() {
      this.$refs.file.pickFiles()
    },
    updateFile() {
      this.controls = true
      this.previewImg = URL.createObjectURL(this.file)
    },
    discardUpdate() {
      this.controls = false
      this.file = null
      this.previewImg = this.user.photo
    },
    confirmUpdate() {
      const fd = new FormData()
      fd.append('photo', this.file)
      fd.append('updateType', 'photo')
      APIGateway.user.updateProfile(this.user.id, fd)
        .then(() => {
          this.$store.dispatch('Auth/updateUser')
          this.controls = false
        })
        .catch(() => {})
    }
  }
}

</script>

<style scoped lang="scss">
.UserInfoSection {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  .user-photo {
    width: 80px;
    padding: 5px;
  }
  .namePhone {
    width: calc( 100% - 80px );
    .fullName {
      width: 100%;
    }
  }
  .edit-action {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>

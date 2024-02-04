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
             icon="ph:camera"
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
    <div class="q-ml-lg namePhone">
      <h6 class="fullName ellipsis-2-lines">
        {{ fullName }}
      </h6>
      <div v-if="user.mobile"
           class="phoneNumber q-mt-sm">
        {{ user.mobile }}
      </div>
    </div>
    <div v-if="editable"
         class="edit">
      <q-btn icon="ph:pencil-simple"
             size="sm"
             flat
             round />
    </div>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
export default {
  name: 'UserInfoSection',
  components: { LazyImg },
  mixins: [mixinAuth],
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      api: APIGateway.user.APIAdresses.base,
      file: null,
      previewImg: null,
      controls: false
    }
  },
  computed: {
    fullName () {
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
    updatePhoto () {
      this.$refs.file.pickFiles()
    },
    updateFile () {
      this.controls = true
      this.previewImg = URL.createObjectURL(this.file)
    },
    discardUpdate () {
      this.controls = false
      this.file = null
      this.previewImg = this.user.photo
    },
    confirmUpdate () {
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
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";
@import "src/css/Theme/Typography/typography.scss";
.UserInfoSection {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  .user-photo {
    padding: $space-1;
    .q-avatar{
      font-size:56px
    }
    .photo-edit{
      position:absolute;
      top:$space-9;
      left:0;
    }
  }
  .namePhone {
    width: calc( 100% - 80px );
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: $space-4;
    .phoneNumber{
      @include body2;
      color: $grey-7;
    }
  }
  .fullName {
    width: 100%;
    color: $grey-9;
    text-wrap: nowrap;
  }
  .edit-action {
    position: absolute;
    right: 0;
    top: 0;
  }
  .edit{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

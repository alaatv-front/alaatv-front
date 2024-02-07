<template>
  <div class="avatar-form-dialog-wrapper">
    <inside-dialog>
      <template #header-icon>
        <badge-icon icon="ph:ticket"
                    color="primary" />
      </template>
      <template #header>
        انتخاب پروفایل
      </template>
      <template #body>
        <div class="image-preview-wrapper">
          <q-avatar v-if="user.photo"
                    class="avatar-wrapper">
            <lazy-img :src="userImage" />
          </q-avatar>
        </div>
        <q-file ref="imageInput"
                v-model="image"
                class="image-file"
                @update:model-value="onUpdateModel" />
      </template>
      <template #action>
        <div class="profile-action">
          <q-btn flat
                 label="تغییر عکس"
                 color="secondary"
                 class="size-md"
                 @click="triggerFile" />
          <div class="profile-action__base">
            <q-btn v-close-popup
                   label="انصراف"
                   color="grey"
                   outline
                   class="size-md q-mr-sm"
                   @click="removeFile" />
            <q-btn label="ذخیره عکس"
                   color="primary"
                   class="size-md"
                   @click="editImage" />
          </div>
        </div>
      </template>
    </inside-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { User } from 'src/models/User'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'

export default defineComponent({
  name: 'AvatarForm',
  components: {
    LazyImg,
    BadgeIcon,
    InsideDialog
  },
  props: {
    user: {
      type: User,
      default: new User()
    }
  },
  emits: ['photoUpdated'],
  data () {
    return {
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    userImage: {
      get () {
        return this.imageSrc
      },
      set (image) {
        this.imageSrc = image
      }
    }
  },
  mounted () {
    this.userImage = this.user.photo
  },
  methods: {
    editImage () {
      APIGateway.user.adminUpdateUser({
        photo: this.image,
        user: this.user
      })
        .then(() => {
          this.$emit('photoUpdated')
          this.removeFile()
        })
        .catch(() => {})
    },
    triggerFile () {
      this.$refs.imageInput.pickFiles()
    },
    onUpdateModel () {
      this.userImage = this.getImagePreviewUrl()
    },
    getImagePreviewUrl () {
      return URL.createObjectURL(this.image)
    },
    removeFile () {
      this.image = null
      this.imageSrc = this.user.photo
    }
  }
})
</script>

<style lang="scss" scoped>
.image-preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.image-file {
  display: none;
}
.avatar-form-dialog-wrapper {
  overflow-y: hidden;
  width: 600px;
  max-width: 600px;
  @include  media-max-width('md') {
    width: 100%;
    max-width: 100%;
  }

  .avatar-wrapper {
    width: 432px;
    height: 432px;

    @include  media-max-width('md') {
      width: 280px;
      height: 280px;
    }
  }
}

.profile-action {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include  media-max-width('md') {
    flex-direction: column;
  }

  &__base {
    @include  media-max-width('md') {
      margin-top: $space-3;
    }
  }
}
</style>

<template>
  <div>
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="photo"
             label="photo" />
      <q-tab name="video"
             label="video" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="photo">
        <q-inner-loading :showing="visible"
                         label="Please wait..."
                         label-class="text-teal"
                         label-style="font-size: 1.1em" />
        <div class="row col-12">
          <div v-if="visible"
               class="col-12">
            <q-inner-loading :showing="visible"
                             label="Please wait..."
                             label-class="text-teal"
                             label-style="font-size: 1.1em" />
          </div>
          <div class="col-2">
            <q-input v-model="image.width"
                     label="width" />
          </div>
          <div class="col-2 q-mx-sm">
            <q-input v-model="image.height"
                     label="height" />
          </div>
          <div class="col-7">
            <image-upload-inputs v-model:value="image.src" />
          </div>
          <div class="col-12">
            <lazy-img v-if="size"
                      :src="banner.features[size].src"
                      class="full-width" />
            <lazy-img v-else
                      :src="banner.photo.src"
                      class="full-width" />
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="video">
        <div class="row col-12">
          <div class="col-2">
            <q-input v-model="video.width"
                     label="width" />
          </div>
          <div class="col-2 q-mx-sm">
            <q-input v-model="video.height"
                     label="height" />
          </div>
          <div class="col-7">
            <image-upload-inputs v-model:value="video.src" />
          </div>
          <div class="col-12">
            <q-video src="https://dl6.webmfiles.org/big-buck-bunny_trailer.webm"
                     :ratio="16/9"
                     class="full-width" />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { Banner } from 'src/models/Banner.js'
import LazyImg from 'src/components/lazyImg.vue'
import imageUploadInputs from 'src/components/Utils/ImageUploadInput.vue'

export default {
  name: 'bannerPreview',
  components: {
    LazyImg,
    imageUploadInputs
  },
  props: {
    banner: {
      type: Banner,
      default: new Banner()
    },
    size: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      tab: 'photo',
      img: new Image(),
      image: {
        src: '',
        width: 0,
        height: 0
      },
      video: {
        src: '',
        width: 0,
        height: 0
      }
    }
  },
  watch: {
    'image.width'(width) {
      this.img.width = width
    },
    'image.src'(src) {
      this.updateImage(src)
    }
  },
  created() {
    this.loadImage()
  },
  methods: {
    loadImage() {
      if (this.size) {
        this.image.src = this.banner.features[this.size].src
      } else {
        this.image.src = this.banner.photo.src
      }
    },
    updateImage (src) {
      this.visible = true
      this.img.src = this.image.src
      this.img.onload = () => {
        this.image.width = this.img.width
        this.image.height = this.img.height
        this.visible = false
        this.$emit('update:src', {
          src,
          size: this.size,
          width: this.image.width,
          height: this.image.height
        })
      }
      this.img.onerror = () => {
        this.visible = false
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify">
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
        <div class="row q-col-gutter-md">
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
            <!--            https://dl6.webmfiles.org/big-buck-bunny_trailer.webm-->
            <!--            <q-video :src="video.src"-->
            <!--                     :ratio="video.width / video.height"-->
            <!--                     class="full-width" />-->
            <video autoplay
                   loop
                   muted
                   class="full-width shadow-15">
              <source :src="getVideoSrc()">
              Your browser does not support the video tag.
            </video>
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
        width: 16,
        height: 9
      }
    }
  },
  watch: {
    'image.width'(width) {
      this.img.width = width
    },
    'image.src'(src) {
      this.updateImage(src)
    },
    'video.src'(src) {
      this.updateVideo(src)
    }
  },
  created() {
    this.loadImage()
    this.loadVideo()
  },
  methods: {
    loadImage() {
      if (this.size) {
        this.image.src = this.banner.features[this.size].src
      } else {
        this.image.src = this.banner.photo.src
      }
    },
    loadVideo() {
      if (this.size) {
        this.video.src = this.banner.features[this.size].videoSrc
        this.video.width = this.banner.features[this.size].videoWidth
        this.video.height = this.banner.features[this.size].videoHeight
      } else {
        this.video.src = this.banner.video?.src
        this.video.width = this.banner.video?.width
        this.video.height = this.banner.video?.height
      }
    },
    updateImage (src) {
      this.visible = true
      this.img.src = this.image.src
      this.img.onload = () => {
        this.image.width = this.img.width
        this.image.height = this.img.height
        this.visible = false
        this.$emit('updateImage', {
          src,
          size: this.size,
          width: this.image.width,
          height: this.image.height
        })
      }
      this.img.onerror = () => {
        this.visible = false
      }
    },
    updateVideo (src) {
      this.$emit('updateVideo', {
        src,
        size: this.size,
        width: this.video.width,
        height: this.video.height
      })
    },
    getVideoSrc () {
      if (this.banner.video?.src) {
        return this.banner.video.src
      }

      if (this.size && this.banner.features[this.size] && this.banner.features[this.size].videoSrc) {
        return this.banner.features[this.size].videoSrc
      }
    }
  }
}
</script>

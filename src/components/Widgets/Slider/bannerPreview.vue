<template>
  <div class="row col-12">
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
                :src="banner.features[size].src" />
      <lazy-img v-else
                :src="banner.photo.src" />
    </div>
    <q-inner-loading :showing="visible"
                     label="Please wait..."
                     label-class="text-teal"
                     label-style="font-size: 1.1em" />
  </div>
</template>

<script>
import LazyImg from 'components/lazyImg.vue'
import { Banner } from 'src/models/Banner.js'
import imageUploadInputs from 'components/Utils/ImageUploadInput.vue'

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
      img: new Image(),
      image: {
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
      this.$emit('update:src', {
        src,
        size: this.size
      })
      this.updateImage()
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
    updateImage() {
      this.visible = true
      this.img.src = this.image.src
      this.img.onload = () => {
        this.image.width = this.img.width
        this.image.height = this.img.height
        this.visible = false
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

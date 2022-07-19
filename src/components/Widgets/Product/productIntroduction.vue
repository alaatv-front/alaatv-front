<template>
  <div class="product-introduction row">
    <div class="intro-features col-6">
      <div class="title">
        ویژگی های این محصول
      </div>

      <div class="product-info-box">
        <div
          v-for="(info, index) in information"
          :key="index"
          class="product-info"
        >
          <div class="info-header">
            <q-img :src="info.src"/>
            <p class="info-title">
              {{info.title}}
            </p>
          </div>

          <div class="info-content">
            <p class="info-value">
              {{info.value}}
            </p>
          </div>

        </div>
      </div>

      <div class="product-price">
        <span class="discount"></span>
        <span class="discount"></span>
        <q-btn class="discount"></q-btn>
      </div>
    </div>
    <div class="intro-video col-6">
      <video-player/>
    </div>
  </div>
</template>

<script>
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'productIntroduction',
  components: { VideoPlayer },
  data () {
    return {
      information: [
        {
          src: '',
          title: 'مدرس',
          value: ''
        },
        {
          src: '',
          title: '',
          value: ''
        },
        {
          src: '',
          title: '',
          value: ''
        },

      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.product-introduction {
  .intro-features {
    .features {
      .feature {

      }
    }
  }
  .intro-video {

  }
}
</style>

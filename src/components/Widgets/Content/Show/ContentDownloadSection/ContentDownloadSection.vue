<template>
  <q-card class="download-section custom-card q-mx-md bg-white rounded-borders">
    <h6 class="text-grey q-pt-md q-pl-md">دانلود محتوا</h6>
    <q-separator class="q-ma-md" />
    <div v-if="content.is_free && content.file?.video"
         class="q-py-xl flex flex-center column">
      <q-btn v-for="(video, index) in content.file.video"
             :key="index"
             class="button bg-green-4"
             :label="video.caption"
             @click="download(video)" /></div>
    <div v-else
         class="q-py-xl text-center">
      <q-btn class="button bg-green-4"><a target="_blank"
                                          :href="options.link">دانلود اپلیکیشن آلاء</a></q-btn>
      <p class="q-mt-md">با نصب اپ اندروید آلا، می توانید این فیلم را دانلود نمایید.</p>
    </div>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content.js'
import { openURL } from 'quasar'

export default {
  name: 'ContentDownloadSection',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      content: new Content()
    }
  },
  created() {
    this.getContentByRequest()
  },
  methods: {
    getContentByRequest() {
      this.content.loading = true
      const contentId = this.getContentId()
      this.$apiGateway.content.show(contentId)
        .then((response) => {
          this.content = new Content(response)
          this.content.loading = false
        })
        .catch(() => {
          this.content.loading = false
        })
    },
    getContentId () {
      if (this.options.productId) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return null
    },
    download(video) {
      openURL(video.link)
    }
  }
}
</script>

<style scoped>
  .download-section {
    /*box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.03);*/
    /*border-radius: 10px;*/
    height: 100%
  }

  .button {
    border-radius: 25px;
    width: 80%;
    margin: 5px 0;
    color: #ffffff;
  }

  h6 {
    margin: 0 !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>

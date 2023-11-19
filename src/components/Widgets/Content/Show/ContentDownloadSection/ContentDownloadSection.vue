<template>
  <q-card class="download-section custom-card rounded-borders"
          :class="{'canShowBox': canShowBox}">
    <h6 class="text-grey q-pt-md q-pl-md">دانلود محتوا</h6>
    <q-separator class="q-ma-md" />
    <div v-if="!content.is_free && content.file?.video"
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
import { openURL } from 'quasar'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ContentDownloadSection',
  mixins: [mixinWidget, mixinPrefetchServerData],
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
  computed: {
    canShowBox () {
      return this.content?.is_free && this.content?.file?.video && this.content.file.video.length > 0
    }
  },
  methods: {
    prefetchServerDataPromise () {
      this.content.loading = true
      return this.getContentByRequest()
    },
    prefetchServerDataPromiseThen (data) {
      this.content = new Content(data)
      this.content.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.content.loading = false
    },
    loadContent() {
      this.prefetchServerDataPromise()
        .then((content) => {
          this.prefetchServerDataPromiseThen(content)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
    },

    getContentByRequest() {
      this.content.loading = true
      const contentId = this.getContentId()
      return APIGateway.content.show(contentId)
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

<style scoped lang="scss">
  .download-section {
    height: 100%;

    &:not(.canShowBox) {
      display: none;
    }
  }

  .button {
    border-radius: 25px;
    width: 80%;
    margin: 5px 0;
    color: #fff;
  }

  h6 {
    margin: 0 !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>

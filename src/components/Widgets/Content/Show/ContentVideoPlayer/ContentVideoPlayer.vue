<template>
  <div class="bg-white shadow-4 q-mb-md q-mx-sm"
       :style="options.style">
    <video-player v-if="sources.list.length > 0"
                  :sources="sources"
                  :poster="poster" />
    <div class="q-pa-sm flex flex-center">
      <q-pagination v-if="options.paginate"
                    v-model="contentNumber"
                    :max="set.contents.list.length"
                    :to-fn="goToContentPage"
                    :max-pages="6"
                    direction-links
                    boundary-links
                    icon-first="skip_previous"
                    icon-last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward" />
    </div>
  </div>
</template>

<script>
import { Content } from 'src/models/Content.js'
import API_ADDRESS from 'src/api/Addresses.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import VideoPlayer from 'components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { Set } from 'src/models/Set'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ContentVideoPlayer',
  components: { VideoPlayer },
  mixins: [mixinWidget],
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
      content: new Content(),
      set: new Set(),
      sourceItem: [
        {
          src: '',
          type: 'video/mp4',
          label: ''
        },
        {
          src: '',
          type: 'video/mp4',
          label: '',
          selected: true
        },
        {
          src: '',
          type: 'video/mp4',
          label: ''
        }
      ],
      sources: new PlayerSourceList(),
      poster: '',
      contentNumber: 1 // content order may not be continuously
    }
  },
  watch: {
    options() {
      this.loadContent()
    },
    'data.id': function() {
      this.loadContent()
    }
  },
  created() {
    this.loadContent()
  },
  methods: {
    getContentIdByNumberInList(numberInList) {
      return this.set.contents.list[numberInList - 1]?.id
    },
    getContentNumberInListById(contentId) {
      return this.set.contents.list.findIndex(content => parseInt(content.id) === parseInt(contentId)) + 1
    },
    loadContent() {
      this.getContentByRequest()
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
    getContentByRequest() {
      const contentId = this.getContentId()
      this.content.loading = true
      let promise = null
      promise = APIGateway.content.show(contentId)
      if (promise) {
        promise
          .then((response) => {
            this.content = new Content(response)
            this.poster = this.content.photo
            this.setSources(this.content.file.video)
            this.getSetByRequest()
            this.content.loading = false
          })
          .catch(() => {
            this.content.loading = false
          })
      }
    },

    getContent() {
      this.content.loading = true
      const url = API_ADDRESS.content.show(this.options.id)
      let promise = null
      if (typeof this.options.getData === 'function') {
        promise = this.options.getData(url)
      } else {
        promise = this.$axios.get(url)
      }

      promise
        .then(response => {
          this.content = new Content(response.data.data)
          this.content.loading = false
          this.contentNumber = this.getContentNumberInListById(this.content.id)
          this.poster = this.content.photo
          this.setSources(this.content.file.video)
          this.getSet()
        })
        .catch(() => {
          this.content.loading = false
        })
    },
    getSetByRequest() {
      this.set.loading = true
      let promise = null
      promise = APIGateway.set.show(this.content.set.id)
      if (promise) {
        promise
          .then((response) => {
            this.set = new Set(response)
            this.contentNumber = this.getContentNumberInListById(this.content.id)
            this.set.loading = false
          })
          .catch(() => {
            this.set = new Set()
            this.set.loading = false
          })
      }
    },
    getSet() {
      this.set.loading = true
      this.options.getData(API_ADDRESS.set.show(this.content.set.id))
        .then(response => {
          this.set = new Set(response.data.data)
          this.contentNumber = this.getContentNumberInListById(this.content.id)
        })
        .catch((er) => {
          this.set = new Set()
          this.set.loading = false
        })
    },
    setSources(sources) {
      this.sources = new PlayerSourceList(sources)
    },
    goToContentPage(number) {
      const id = this.getContentIdByNumberInList(number)
      if (!id) {
        return null
      }
      return {
        name: 'Public.Content.Show',
        params: { id }
      }
    }
  }
}
</script>

<style scoped>
</style>

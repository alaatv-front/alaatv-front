<template>
  <q-card class="video-player custom-card bg-white q-mx-md full-height q-mb-lg"
          :class="options.paginate? 'q-pb-md': ''"
          :style="options.style">
    <video-player :content="content" />
    <div v-if="options.paginate"
         class="q-pa-sm flex flex-center">
      <q-pagination v-model="contentNumber"
                    :max="set.contents.list.length"
                    :to-fn="goToContentPage"
                    :max-pages="3"
                    direction-links
                    boundary-links
                    icon-first="skip_previous"
                    icon-last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward" />
    </div>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import VideoPlayer from 'src/components/ContentVideoPlayer.vue'
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
    loadContent () {
      if (this.options.noRequestMode || (this.options.content && this.options.content.id)) {
        this.content = new Content(this.options.content)
        this.poster = this.content.photo ? this.content.photo : ''
        this.setSources(this.content.file.video)
        this.getSetByRequest()
        return
      }
      this.getContentByRequest()
    },
    getContentIdByNumberInList(numberInList) {
      return this.set.contents.list[numberInList - 1]?.id
    },
    getContentNumberInListById(contentId) {
      return this.set.contents.list.findIndex(content => parseInt(content.id) === parseInt(contentId)) + 1
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
      APIGateway.content.show(contentId)
        .then((response) => {
          this.content = new Content(response)
          this.poster = this.content.photo ? this.content.photo : ''
          this.setSources(this.content.file.video)
          this.getSetByRequest()
          this.content.loading = false
        })
        .catch(() => {
          this.content.loading = false
        })
    },
    getSetByRequest() {
      this.set.loading = true
      APIGateway.set.show(this.content.set?.id || this.$route.params.setId)
        .then((response) => {
          this.set = new Set(response)
          this.contentNumber = this.getContentNumberInListById(this.$route.params.id)
          this.set.loading = false
        })
        .catch(() => {
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

<style scoped lang="scss">
.video-player{
  border-radius: 10px;
  box-shadow: 0 6px 5px rgba(0, 0, 0, 0.03);
}
</style>

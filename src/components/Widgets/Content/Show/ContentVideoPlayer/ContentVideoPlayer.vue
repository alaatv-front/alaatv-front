<template>
  <div class="video-player-container">
    <template v-if="content.loading">
      <div class="video-player q-mx-md q-mb-lg">
        <q-responsive :ratio="3/2">
          <q-skeleton />
        </q-responsive>
      </div>
    </template>
    <template v-else>
      <q-card class="video-player custom-card bg-white"
              :class="options.paginate? 'q-pb-md': ''"
              :style="options.style">
        <video-player :content="content"
                      @time-updated="updateTime" />
        <div v-if="options.paginate"
             class="q-py-sm flex flex-center paginate">
          <q-pagination v-model="contentNumber"
                        :max="set.contents.list.length"
                        :to-fn="goToContentPage"
                        :max-pages="6"
                        direction-links
                        icon-prev="fast_rewind"
                        icon-next="fast_forward" />
        </div>
      </q-card>
    </template>
  </div>
</template>

<script>
import { Set } from 'src/models/Set.js'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import VideoPlayer from 'src/components/ContentVideoPlayer.vue'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ContentVideoPlayer',
  components: { VideoPlayer },
  mixins: [mixinWidget, mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: ['timeUpdated'],
  data () {
    return {
      content: new Content(),
      set: new Set(),
      sources: new PlayerSourceList(),
      poster: '',
      contentNumber: 1 // content order may not be continuously
    }
  },
  watch: {
    options () {
      this.loadContent()
    },
    'data.id': function () {
      this.loadContent()
    }
  },
  methods: {
    updateTime (data) {
      this.$emit('timeUpdated', data)
    },
    prefetchServerDataPromise () {
      this.content.loading = true
      return this.getContentByRequest()
    },
    prefetchServerDataPromiseThen (data) {
      this.content = new Content(data)
      this.poster = this.content.photo ? this.content.photo : ''
      this.setSources(this.content.file.video)
      this.getSetByRequest()
      this.content.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.content.loading = false
    },

    loadContent () {
      if (this.options.noRequestMode || (this.options.content && this.options.content.id)) {
        this.content = new Content(this.options.content)
        this.poster = this.content.photo ? this.content.photo : ''
        this.setSources(this.content.file.video)
        this.getSetByRequest()
        return
      }
      this.prefetchServerDataPromise()
        .then((content) => {
          this.prefetchServerDataPromiseThen(content)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
    },
    getContentIdByNumberInList (numberInList) {
      return this.set.contents.list[numberInList - 1]?.id
    },
    getContentNumberInListById (contentId) {
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
    getContentByRequest () {
      const contentId = this.getContentId()
      this.content.loading = true
      return APIGateway.content.show(contentId)
    },
    getSetByRequest () {
      const setId = this.content.set?.id || this.$route.params.setId
      if (!setId) {
        return
      }
      this.set.loading = true
      APIGateway.set.show(setId)
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
    setSources (sources) {
      this.sources = new PlayerSourceList(sources)
    },
    goToContentPage (number) {
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
  box-shadow: 0 6px 5px rgb(0 0 0 / 3%);
  overflow: hidden;

  .paginate {
    flex-wrap: wrap;

    :deep(.q-pagination) {
      .q-btn {
        width: 30px;
        height: 30px;
      }

      .q-pagination__content {
        .q-pagination__middle {
          display: inline-flex;
          vertical-align: middle;
        }
      }
    }

    @media screen and (width <= 400px) {
      &:deep(.q-pagination__content) {
        display: block !important;
      }
    }
  }
}
</style>

<template>
  <div class="content-info-container">
    <template v-if="content.loading">
      <div class="q-mb-lg q-mx-sm">
        <q-responsive :ratio="3/1">
          <q-skeleton />
        </q-responsive>
      </div>
    </template>
    <template v-else>
      <div class="q-pa-md q-mb-lg q-mx-sm content-info">
        <div dir="ltr"
             class="float-right">
          <q-btn icon="ph:share-network"
                 square
                 flat>
            <q-tooltip anchor="top middle"
                       self="bottom middle"
                       :offset="[10, 10]">
              اشتراک گزاری
            </q-tooltip>
            <q-popup-proxy :offset="[10, 10]"
                           transition-show="flip-up"
                           transition-hide="flip-down">
              <q-banner dense
                        rounded>
                <share-network :url="pageUrl"
                               @on-select="shareGiftCard" />
              </q-banner>
            </q-popup-proxy>
          </q-btn>
          <bookmark :is-favored="content.is_favored"
                    :loading="bookmarkLoading"
                    :flat="true"
                    @clicked="handleContentBookmark" />
        </div>
        <h6 class="set-title">
          {{content.title}}
        </h6>
        <div class="description q-mt-lg">
          <div v-if="content.author">
            {{content.author.first_name}} {{content.author.last_name}}
          </div>
          <h6 v-if="content.set"
              class="set-title">
            {{content.set.title}}
          </h6>
          <div v-if="content.body"
               class="q-mb-xl"
               v-html="content.body" />
          <div v-if="content.tags"
               class="row">
            <p class="col-1 q-mt-sm text-center">تگ ها</p>
            <div class="col q-pl-sm">
              <router-link v-for="badge in content.tags"
                           :key="badge"
                           :to="{name: 'Public.Content.Search', query: {'tags[]': badge } }">
                <q-badge class="q-pa-sm q-ml-sm q-mb-sm"
                         color="primary">
                  {{badge}}
                </q-badge>
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="hasRelatedProduct"
             class="row">
          <div class="col-md-5 col-sm-6 col-12">
            <product-item :options="{product: content.related_product}" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Bookmark from 'src/components/Bookmark.vue'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ShareNetwork from 'src/components/ShareNetwork.vue'
import { mixinWidget, mixinPrefetchServerData, mixinAuth } from 'src/mixin/Mixins.js'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'ContentShowInfo',
  components: { ProductItem, Bookmark, ShareNetwork },
  mixins: [mixinWidget, mixinPrefetchServerData, mixinAuth],
  beforeRouteUpdate() {
    this.loadContent()
  },
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
      tab: 'info',
      bookmarkLoading: false,
      content: new Content()
    }
  },
  computed: {
    pageUrl() {
      return window.location.href
    },
    hasRelatedProduct() {
      return this.content.related_product
    }
  },
  watch: {
    data() {
      this.loadContent()
    },
    'options.id': function () {
      this.loadContent()
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

    hasPamphlet() {
      return this.content.file.pamphlet && this.content.file.pamphlet.length > 0
    },
    handleContentBookmark () {
      if (!this.isUserLogin) {
        return
      }

      this.bookmarkLoading = true
      if (this.content.is_favored) {
        this.$apiGateway.content.unfavored(this.content.id)
          .then(() => {
            this.content.is_favored = !this.content.is_favored
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$apiGateway.content.favored(this.content.id)
        .then(() => {
          this.content.is_favored = !this.content.is_favored
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    shareGiftCard({ name, url }) {
      window.open(url, '_blank')
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
    }
  }
}
</script>

<style lang="scss" scoped>
  h6 {
    margin: 0 !important;
  }
</style>

<template>
  <div class="q-pa-md q-mb-lg q-mx-sm content-info">
    <div dir="ltr"
         class="float-right">
      <q-btn icon="isax:share"
             flat
             color="black"
             size="13px">
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
                @clicked="handleContentBookmark" />
    </div>
    <h6 class="set-title">
      {{content.title}}
    </h6>
    <q-tabs v-model="tab"
            class="q-mt-md"
            align="left">
      <q-tab name="info"
             label="توضیحات" />
      <q-tab v-if="content.file?.pamphlet"
             name="pamphlets"
             label="جزوات" />
    </q-tabs>
    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="info">
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
      </q-tab-panel>
      <q-tab-panel name="pamphlets">
        psp
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import Bookmark from 'components/Bookmark.vue'
import { Content } from 'src/models/Content.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ShareNetwork from 'src/components/ShareNetwork.vue'

export default {
  name: 'ContentShowInfo',
  components: { Bookmark, ShareNetwork },
  mixins: [mixinWidget],
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
      bookmarkLoading: false,
      tab: 'info',
      content: new Content(),
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: []
                  }
                ],
                options: {
                  boxed: false
                }
              }
            ]
          }
        }
      ]
    }
  },
  computed: {
    pageUrl() {
      return window.location.href
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
  created() {
    this.loadContent()
  },
  methods: {
    handleContentBookmark () {
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
    loadContent() {
      this.getContentByRequest()
    },
    bookmarkContent () {
      if (this.content.is_favored) {
        return this.$apiGateway.content.unfavored(this.content.id)
      }
      return this.$apiGateway.content.favored(this.content.id)
    },
    getContentByRequest() {
      const contentId = this.getContentId()
      APIGateway.content.show(contentId)
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
    }
  }
}
</script>

<style lang="scss" scoped>
  h6 {
    margin: 0 !important;
  }

  .content-info {
    :deep(.q-tab-panels) {
      background: transparent;
    }
    .set-title {
      //color: black;
    }
  }
</style>

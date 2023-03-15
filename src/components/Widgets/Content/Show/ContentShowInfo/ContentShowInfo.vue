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
      <bookmark v-model:value="content.is_favored"
                :bookmark-function="bookmarkContent"
                @on-change-favorite-status="onChangeFavoriteStatus" />
    </div>
    <h6 class="set-title">
      {{content.title}}
    </h6>
    <q-tabs v-model="tab">
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
             v-html="content.body" />
        <q-separator v-if="content.tags"
                     class="q-my-lg" />
        <q-separator v-if="content.tags"
                     class="q-my-lg" />
        <div v-if="content.tags"
             class="row">
          <p class="col-1 q-mt-sm text-center">تگ ها</p>
          <div class="col q-pl-sm">
            <q-badge v-for="badge in content.tags"
                     :key="badge"
                     class="q-px-sm q-ml-sm"
                     color="blue">
              {{badge}}
            </q-badge>
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
      return 'https://alaatv.com' + this.$route.fullPath
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
    onChangeFavoriteStatus (/* result */) {
      // console.log(result)
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

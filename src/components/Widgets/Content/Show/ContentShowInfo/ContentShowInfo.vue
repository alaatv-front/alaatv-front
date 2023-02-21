<template>
  <div class="shadow-5 bg-white q-pa-md q-mb-lg q-mx-sm rounded-borders content-info">
    <h6 class="set-title">
      {{content.title}}
    </h6>
    <q-tabs>
      <q-tab name="توضیحات"
             label="توضیحات" />
    </q-tabs>
    <div v-if="content.author">
      {{content.author.first_name}} {{content.author.last_name}}
    </div>
    <h6 v-if="content.set"
        class="set-title">
      {{content.set.title}}
    </h6>
    <div v-if="content.body"
         v-html="content.body" />
    <q-separator class="q-my-lg" />
    <q-separator class="q-my-lg" />
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
  </div>
</template>

<script>
import { Content } from 'src/models/Content.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ContentShowInfo',
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
    loadContent() {
      this.getContentByRequest()
    },
    getContentByRequest() {
      const contentId = this.getContentId()
      let promise = null
      promise = APIGateway.content.show(contentId)
      if (promise) {
        promise
          .then((response) => {
            this.content = new Content(response)
            this.content.loading = false
          })
          .catch(() => {
            this.content.loading = false
          })
      }
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
    .set-title {
      color: blue;
    }
  }
</style>

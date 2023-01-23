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
    <div v-html="content.inputData.body" />
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
import API_ADDRESS from 'src/api/Addresses.js'
import { Content } from 'src/models/Content.js'
import { mixinWidget } from 'src/mixin/Mixins.js'

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
    'data.id': function () {
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
      this.content.loading = true
      let promise = null
      promise = this.$apiGateway.content.show(this.options.id)
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

    getContent() {
      this.content.loading = true
      const url = API_ADDRESS.content.show(this.content.id)
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
        })
        .catch(() => {
          this.content.loading = false
        })
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

<template>
  <div class="video-list bg-white q-mx-sm q-pb-md shadow-4 ">
    <div class="q-px-md row">
      <h6 class="main-title col-3 q-pt-lg">
        فیلم ها
      </h6>
      <div class="set-title col q-ml-lg q-mt-lg">
        {{ set.title }}
      </div>
    </div>
    <q-separator class="q-my-md" />
    <q-scroll-area class="scroll"
                   :thumb-style="thumbStyle">
      <div v-for="(content,index) in set.contents.list"
           :key="index"
           ref="items"
           :class="{current: isCurrent(content)}"
           class="other-contents row q-pt-md">
        <div class="col-2">
          <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}"><img width="80"
                                                                                          height="45"
                                                                                          :src=content.photo>
          </router-link>
        </div>
        <router-link class="col q-ml-lg"
                     :to="{name:'Public.Content.Show', params: {id: content.id}}">
          <h6 class="video-title">
            {{ content.title }}
          </h6>
        </router-link>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { Content } from 'src/models/Content'
import { Set } from 'src/models/Set'
import { mixinWidget } from 'src/mixin/Mixins'
import { scroll } from 'quasar'
import { APIGateway } from 'src/api/APIGateway'

const {
  getScrollTarget,
  setVerticalScrollPosition
} = scroll

export default {
  name: 'ContentVideoList',
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
      thumbStyle: {
        left: '2px',
        borderRadius: '10px',
        backgroundColor: '#ff9000',
        width: '8px',
        opacity: '0.75'
      },
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
    options() {
      this.loadContent()
    },
    'options.id': function() {
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
      this.content.loading = true
      const contentId = this.getContentId()
      let promise = null
      promise = APIGateway.content.show(contentId)
      if (promise) {
        promise
          .then((response) => {
            this.content = new Content(response)
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
            this.scrollToElement()
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
          this.scrollToElement(this.set.contents.list)
        })
        .catch(() => {
          this.set.loading = false
        })
    },
    isCurrent(content) {
      return this.$route.params.id === content.id
    },
    scrollToElement() {
      const index = this.set.contents.list.findIndex(content => content.id === this.content.id)
      this.$nextTick(() => {
        const el = this.$refs.items[index]
        const target = getScrollTarget(el)
        const offset = el.offsetTop
        const duration = 1000
        setVerticalScrollPosition(target, offset, duration)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h6 {
  margin: 0 !important;
  font-size: 20px;
}

.scroll {
  height: 41vh !important;
}

.video-list {
  height: 100%;
}

.video-title {

  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.video-title, .main-title {
  font-size: 18px;
  color: #575962;
}

.set-title {
  color: #afb2c1
}

.current {
  background: #ffd196;
}

@media (min-width: 1023px) {
  .scroll {
    height: 80%;
  }
}

@media (max-width: 1023px) {
  .scroll {
    height: 300px !important;
  }
}
</style>

<template>
  <q-card v-if="content.file?.pamphlet && content.file.pamphlet[0]?.link"
          class="download-section custom-card q-pa-md q-mx-md q-mb-md bg-white flex">
    <q-btn icon="isax:document-download"
           flat
           color="primary"
           size="13px"
           @click="downloadPdf" />
    <h6 class="q-pt-xs q-pl-md">دانلود<a class="text-primary"
                                         :href="content.file.pamphlet[0].link"
                                         target="_blank"> PDF </a>{{content.title}}</h6>
  </q-card>
  <q-card class="video-list custom-card bg-white q-mx-md q-pb-md ">
    <div class="q-px-md row">
      <h6 class="main-title col-4 q-pt-lg">
        فیلم/جزوه ها
      </h6>
      <div class="set-title col q-ml-lg q-mt-lg">
        {{ set.title }}
      </div>
    </div>
    <q-separator class="q-ma-md" />
    <q-scroll-area class="scroll"
                   :thumb-style="thumbStyle">
      <div v-for="(content,index) in set.contents.list"
           :key="index"
           ref="items"
           :class="{current: isCurrent(content)}"
           class="other-contents row q-py-md">
        <div class="col-1 q-mx-xs">
          <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}"><q-icon name="isax:play-circle"
                                                                                             size="sm" />
          </router-link>
        </div>
        <div class="col">
          <router-link :to="{name:'Public.Content.Show', params: {id: content.id}}">
            <h6 class="video-title">
              {{ content.title }}
            </h6>
          </router-link>
        </div>
      </div>
    </q-scroll-area>
  </q-card>
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
      }
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
    downloadPdf() {
      window.open(this.content.file.pamphlet.link, '_blank')
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
      promise = APIGateway.set.show({
        id: this.content.set.id
      })
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
      const id = content.id.toString()
      return this.$route.params.id === id
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
.download-section, .video-list{
  border-radius: 10px;
  box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.03);
}
h6 {
  margin: 0 !important;
  font-size: 20px;
}

.scroll {
  height: 41vh !important;
  .other-contents{
    align-items: center;
  }
}

.video-list {
  height: 100%;
}

.video-title {

  width: 330px;
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

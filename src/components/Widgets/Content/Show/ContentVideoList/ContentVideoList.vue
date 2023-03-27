<template>
  <div class="video-list-container q-mb-md">
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
    <q-card class="video-list custom-card bg-white q-mx-md q-pb-md">
      <div class="q-px-md row">
        <h6 class="main-title col-4 q-pt-lg">
          فیلم/جزوه ها
        </h6>
        <div class="set-title col q-ml-lg q-mt-lg">
          {{ set.title }}
        </div>
      </div>
      <q-separator class="q-ma-md" />
      <q-responsive class="responsive"
                    :ratio="11/12">
        <q-scroll-area class="scroll"
                       :thumb-style="thumbStyle">
          <div v-for="(content,index) in set.contents.list"
               :key="index"
               ref="items"
               class="other-contents">
            <div class="content q-pt-md q-px-sm"
                 :class="{current: isCurrent(content)}">
              <div class="row content-show">
                <div class="col-1 q-mr-sm">
                  <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}"><q-icon name="isax:play-circle"
                                                                                                     :color="isCurrent(content) ? 'primary' : ''"
                                                                                                     size="sm" />
                  </router-link>
                </div>
                <div class="col-10">
                  <router-link :to="{name:'Public.Content.Show', params: {id: content.id}}">
                    <h6 class="video-title">
                      {{ content.title }}
                    </h6>
                  </router-link>
                </div>
                <q-tooltip>
                  {{ content.title }}
                </q-tooltip>
                <div v-if="content.duration"
                     class="duration q-pl-md q-my-sm col-6">
                  {{(content.duration / 60 | 0)}}
                  دقیقه
                </div>
                <div v-else
                     class="col-6" />
                <div class="date text-right q-pr-sm q-my-sm col-6">
                  {{convertToShamsi(content.updated_at, 'date')}}
                </div>
              </div>
              <q-separator />
            </div>
          </div>
        </q-scroll-area>
      </q-responsive>
    </q-card>
  </div>
</template>

<script>
import { Content } from 'src/models/Content'
import { Set } from 'src/models/Set'
import { mixinWidget } from 'src/mixin/Mixins'
import { scroll } from 'quasar'
import { APIGateway } from 'src/api/APIGateway'
import mixinDateOptions from 'src/mixin/DateOptions'
import Time from 'src/plugins/time'

const {
  getScrollTarget,
  setVerticalScrollPosition
} = scroll

export default {
  name: 'ContentVideoList',
  mixins: [mixinWidget, mixinDateOptions],
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
    showTime(duration) {
      return Time.msToTime(duration * 1000)
    },
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
      APIGateway.content.show(contentId)
        .then((response) => {
          this.content = new Content(response)
          this.getSetByRequest()
          this.content.loading = false
        })
        .catch(() => {
          this.content.loading = false
        })
    },

    getSetByRequest() {
      this.set.loading = true
      APIGateway.set.show(this.content.set.id)
        .then((response) => {
          this.set = new Set(response)
          this.set.loading = false
          this.scrollToElement()
        })
        .catch(() => {
          this.set = new Set()
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
        if (!this.$refs.items || !this.$refs.items[index]) {
          return
        }
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
.video-list-container {
  h6 {
    margin: 0 !important;
    font-size: 20px;
  }
  .download-section {
  }
  .video-list {
    .main-title{
      font-size: 18px;
      color: #575962;
    }
    .set-title{
      color: #afb2c1
    }
    .responsive{
      max-height: 500px !important;
      .scroll{
        .other-contents{
          .content{
            border-radius: 10px;
            margin-left: 30px;
            margin-right: 42px;
            .video-title{
              font-size: 16px;
              color: #575962;
              font-weight: 400;
              width: 250px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .content-show{
              align-items: center;
              .time, .date{
                font-size: 12px;
                font-weight: 400;
              }
            }
          }
          .current {
            background: #ffd196 12%;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="video-list-container">
    <template v-if="content.loading">
      <div class="q-mx-md">
        <q-responsive :ratio="3/4">
          <q-skeleton />
        </q-responsive>
      </div>
    </template>
    <template v-else>
      <q-card v-if="hasPamphlet()"
              class="download-section custom-card q-pa-md q-mx-md q-mb-md bg-white flex">
        <div class="row">
          <div class="col-md-1">
            <a :href="content.file.pamphlet[0].link"
               :title="content.file.pamphlet[0].ext"
               target="_blank">
              <q-btn icon="isax:document-download"
                     flat
                     :disable="!!content.can_see"
                     color="primary"
                     size="13px" />
            </a>
          </div>
          <div class="col-md-11">
            <h6 class="q-pt-xs q-pl-md">دانلود<a class="text-primary"
                                                 :href="content.file.pamphlet[0].link"
                                                 target="_blank"> PDF </a>{{content.title}}</h6>
          </div>
        </div>
      </q-card>
      <q-card class="video-list custom-card">
        <div class="q-px-md row">
          <h6 class="main-title col-4 q-pt-lg">
            فیلم/جزوه ها
          </h6>
          <div class="set-title col q-ml-lg q-mt-lg q-mb-sm">
            {{ set.title }}
          </div>
        </div>
        <q-separator class="q-ma-md" />
        <q-responsive class="responsive"
                      :ratio="videoListRatio">
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
                    <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}">
                      <q-icon v-if="content.type === 8"
                              name="isax:play-circle"
                              :color="isCurrent(content) ? 'primary' : ''"
                              size="sm" />
                      <q-icon v-else
                              name="isax:book-1"
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
    </template>
  </div>
</template>

<script>
import { scroll } from 'quasar'
import Time from 'src/plugins/time.js'
import { Set } from 'src/models/Set.js'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget, mixinDateOptions } from 'src/mixin/Mixins.js'

const {
  getScrollTarget,
  setVerticalScrollPosition
} = scroll

export default {
  name: 'ContentVideoList',
  mixins: [mixinWidget, mixinDateOptions, mixinPrefetchServerData],
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
      defaultOptions: {
        listHeight: ''
      },
      videoListRatio: 11 / 12,
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
  methods: {
    prefetchServerDataPromise () {
      this.content.loading = true
      return this.getContentByRequest()
    },
    prefetchServerDataPromiseThen (data) {
      this.content = new Content(data)
      if (this.hasPamphlet()) {
        this.videoListRatio = 5 / 4
      }
      this.getSetByRequest()
      this.content.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.content.loading = false
    },
    loadContent() {
      // this.prefetchServerDataPromise()
      //   .then((content) => {
      //     this.prefetchServerDataPromiseThen(content)
      //   })
      //   .catch(() => {
      //     this.prefetchServerDataPromiseCatch()
      //   })
    },

    hasPamphlet() {
      return this.content.file.pamphlet && this.content.file.pamphlet[0]
    },
    showTime(duration) {
      return Time.msToTime(duration * 1000)
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
      return APIGateway.content.show(contentId)
    },

    getSetByRequest() {
      this.set.loading = true
      APIGateway.set.show(this.content.set.id)
        .then((set) => {
          this.set = new Set(set)
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

  .video-list {
    .main-title{
      font-size: 18px;
      color: #575962;
    }

    .set-title{
      color: #afb2c1
    }

    .responsive{
      max-height: v-bind('options.listHeight') !important;

      .scroll{
        .other-contents{
          .content{
            border-radius: 10px;
            margin-left: 10px;
            margin-right: 15px;

            .video-title{
              font-size: 16px;
              color: #575962;
              font-weight: 400;
              max-width: 300px;
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

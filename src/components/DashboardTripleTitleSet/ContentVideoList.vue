<template>
  <div class="video-list-container">
    <q-card v-if="!loading && doesHaveSet"
            class="video-list custom-card bg-white q-mx-md q-pb-md ">
      <div class="q-px-md row header">
        <q-btn v-if="!hidePrevBtn"
               flat
               square
               class="q-mt-md"
               icon="chevron_right"
               @click="previousSetClicked" />
        <div class="set-title col q-ml-lg q-mt-lg">
          {{ set.title || set.short_title }}
        </div>
        <q-btn v-if="!hideNextBtn"
               flat
               square
               icon="chevron_left"
               class="q-mt-md"
               @click="nextSetClicked" />
      </div>
      <q-separator class="q-ma-md" />
      <q-scroll-area class="scroll"
                     :thumb-style="thumbStyle">
        <template v-if="!videoListLoading">
          <div v-for="(content,index) in set.contents.list"
               :key="index"
               ref="items"
               class="other-contents">
            <q-item v-ripple
                    clickable
                    :active="isCurrent(content.id)"
                    class="item-list"
                    @click="itemSelected(content)">
              <div class="content-show items-center">
                <div class="">
                  <q-icon v-if="content.type === 8"
                          :name="content.has_watched ? 'check_circle' : 'isax:play-circle'"
                          :color="isCurrent(content.id) ? 'primary' : ''"
                          size="sm" />
                  <q-icon v-else
                          name="isax:book-1"
                          :color="isCurrent(content.id) ? 'primary' : ''"
                          size="sm" />
                </div>
                <div class="video-title q-pl-sm">
                  {{ content.title || content.short_title }}
                </div>
              </div>
            </q-item>
          </div>
        </template>
        <!--   v-if=      set.contents.list.length < 2 && !videoListLoading-->
        <q-item v-if="false"
                class="item-list"
                @click="itemSelected(content)">
          این مبحث گام سوم ندارد.
          <span class="item-list-last"
                @click="dialog =!dialog"> بیشتر بدانید</span>
        </q-item>
        <q-item v-if="videoListLoading">
          <q-skeleton type="rect"
                      style="width: 100%;" />
        </q-item>
        <q-item v-if="videoListLoading">
          <q-skeleton type="rect"
                      style="width: 100%;" />
        </q-item>
        <q-item v-if="videoListLoading">
          <q-skeleton type="rect"
                      style="width: 100%;" />
        </q-item>
      </q-scroll-area>
    </q-card>
    <q-skeleton v-else
                width="100%"
                height="450px" />
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">گام سوم</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          فقط مباحث مهم و عمیق گام سوم دارن، و تشخیص این موضوع به عهده دبیران و مشاوران آموزشی آلائه، پس خیالت از این بابت راحت باشه.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup
                 label="گرفتم"
                 color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Content } from 'src/models/Content'
import { Set } from 'src/models/Set'
import { scroll } from 'quasar'

const {
  getScrollTarget,
  setVerticalScrollPosition
} = scroll

export default {
  name: 'ContentVideoList',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    content: {
      type: [Content, Object],
      default: new Content()
    },
    set: {
      type: [Set, Object],
      default: new Set()
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    },
    videoListLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    hideNextBtn: {
      type: Boolean,
      default () {
        return false
      }
    },
    hidePrevBtn: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  emits: ['contentSelected', 'nextSetClicked', 'previousSetClicked'],
  data () {
    return {
      dialog: false,
      clickedItem: new Content(),
      thumbStyle: {
        left: '2px',
        borderRadius: '10px',
        backgroundColor: '#ff9000',
        width: '8px',
        opacity: '0.75'
      }
    }
  },
  computed: {
    doesHaveSet () {
      return !!this.set.id
    }
  },
  watch: {
    doesHaveSet () {
      this.scrollToElement()
    }
  },
  created () {},
  methods: {
    itemSelected (item) {
      this.clickedItem = item
      if (item.isPamphlet()) {
        window.open(item.file?.pamphlet[0]?.link, '_blank')
        return
      }
      this.$emit('contentSelected', item)
    },
    nextSetClicked () {
      this.$emit('nextSetClicked')
    },
    previousSetClicked () {
      this.$emit('previousSetClicked')
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
    isCurrent (contentId) {
      return this.content.id === contentId
    },
    scrollToElement () {
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
    .header {
      box-shadow: none;
    }

    .main-title{
      font-size: 18px;
      color: #575962;
    }

    .set-title{
      color: #afb2c1
    }

    .last-item-dialog {
      .last-item-dialog-card {
        width: 350px;
        height: 240px;
      }

    }

    .scroll{
      height: 40vh !important;
      overflow-x: hidden;

      .other-contents{
        overflow-x: hidden;
        cursor: pointer;

        .content-show{
          align-items: center;
          display: grid;
          grid-template-columns: 24px auto;
        }

        .content{
          border-radius: 10px;
          margin-left: 30px;
          margin-right: 42px;

          .video-title{
            font-size: 18px;
            color: #575962;
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

        }

        .current {
          background: #ffd196 12%;
        }
      }

      .item-list-last {
        color: #3e5480;
        cursor: pointer;
      }

      @media (width >= 1023px) {
        height: 80%;
      }

      @media (width <= 1023px) {
        height: 300px !important;
      }
    }
  }
}
</style>

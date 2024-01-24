<template>
  <div class="video-box">
    <div v-if="content.id"
         class="video-main">
      <div class="video-wrapper">
        <content-video-player v-if="content.can_see?.toString() === '1'"
                              :options="{
                                paginate: false,
                                urlParam: 'contentId',
                                noRequestMode: true,
                                content
                              }"
                              @time-updated="updateTime" />
        <div v-else
             class="row justify-center">
          <div class="video-not-available col-12">
            <product-item class="product-item"
                          :options="{
                            showPrice: domainSameWithAppDomain,
                            canAddToCart: domainSameWithAppDomain,
                            routeToProduct: domainSameWithAppDomain,
                            product: selectedProduct
                          }" />
          </div>
        </div>
      </div>

    </div>
    <div class="video-description">
      <div class="description row justify-between items-center">
        <div class="">
          <div class="flex flex-wrap video-title ellipsis-2-lines">
            {{content.title}}
          </div>
          <div class="flex subtitle">
            <div class="flex part align-start" />
            <div v-if="content.author && (content.author.first_name || content.author.last_name) "
                 class="flex part align-center">
              <i class="fi fi-rr-graduation-cap icon flex" />
              <p class="video-paragraph">
                {{ content.author.first_name }} {{content.author.last_name }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="content.id"
             class="icon-btn-box">
          <q-btn class="seen-btn"
                 color="accent"
                 :class="{ 'seen-video-btn': content.has_watched, 'video-btn': !content.has_watched }"
                 :loading="content.loading"
                 @click="clickSeenButton">
            <span v-if="content.has_watched"
                  class="video-btn-text">
              تکمیل شده
            </span>
            <i v-if="content.has_watched"
               class="fi fi-rr-check seen-icon" />
            <span v-else
                  class="video-btn-text">
              تکمیل جلسه
            </span>
          </q-btn>
          <div class="video-box-icon">
            <q-btn flat
                   square
                   :href="content.isPamphlet() ? content.file?.pamphlet[0]?.link: null"
                   :target="content.isPamphlet() ? '_blank': null"
                   icon="ph:download"
                   :disable="!content.file"
                   @click="downloadContent">
              <q-tooltip anchor="top middle"
                         self="bottom middle"
                         :offset="[10, 10]">
                دانلود
              </q-tooltip>
            </q-btn>
            <q-btn flat
                   square
                   icon="ph:share-network">
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
                  <share-network :url="content.url.web"
                                 :title="content.title"
                                 @on-select="shareVideo" />
                </q-banner>
              </q-popup-proxy>
            </q-btn>
            <bookmark :is-favored="contentFavored"
                      :flat="true"
                      :loading="bookmarkLoading"
                      @clicked="handleContentBookmark" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="downloadVideo"
            full-width
            position="bottom">
    <q-card class="full-width download-box">
      <div class="download-title">
        دانلود
      </div>
      <q-card-section class="flex items-center justify-around">
        <div v-for="(item, index) in content.file.video"
             :key="index"
             class="flex items-center justify-around download-item">
          {{item.caption}}
          <div class="quality">
            {{item.res}}
          </div>
          <q-btn flat
                 square
                 icon="ph:download"
                 :href="item.link + (item.link.includes('?') ? '' : '?') +'download=1'" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { Content } from 'src/models/Content.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import Bookmark from 'src/components/Bookmark.vue'
import ShareNetwork from 'src/components/ShareNetwork.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'
import ContentVideoPlayer from 'src/components/Widgets/Content/Show/ContentVideoPlayer/ContentVideoPlayer.vue'

export default {
  name: 'VideoBox',
  components: { ProductItem, Bookmark, ContentVideoPlayer, ShareNetwork },
  mixins: [mixinAuth],

  props: {
    content: {
      type: [Content, Object],
      default: new Content()
    },
    lesson: {
      type: Object,
      default: () => {
        return {}
      }
    },
    set: {
      type: Object,
      default: () => {}
    }
  },

  emits: ['favorite', 'toggle-video-status', 'bookmarkTimestamp', 'toggleFavorite', 'videoIsWatched'],

  data () {
    return {
      bookmarkLoading: false,
      sheet: false,
      keepCalculating: true,
      timePoints: [],
      sources: new PlayerSourceList(),
      markedRatios: [
        { ratio: 90, hasSeen: false }
      ],
      downloadVideo: false,
      videoDuration: null,
      lastSeenPercentage: 0
    }
  },
  computed: {
    selectedProduct () {
      return this.$store.getters['TripleTitleSet/selectedProduct']
    },
    contentFavored: {
      get () {
        return this.content.is_favored
      },
      set (value) {
        this.toggleFavorite(value)
      }
    }
  },

  watch: {
    'content.id': function () {}
  },
  methods: {
    updateTime (data) {
      if (this.content.has_watched) {
        return
      }
      const percentage = (data.currentTime / data.duration)
      if (isNaN(percentage) || percentage - this.lastSeenPercentage <= 0.1) {
        return
      }

      if (percentage >= 0.9) {
        this.$emit('videoIsWatched', 1)
      } else {
        // this.$emit('videoIsWatched', data.currentTime)
      }

      this.lastSeenPercentage = percentage
    },
    handleContentBookmark () {
      this.bookmarkLoading = true
      if (this.contentFavored) {
        this.$apiGateway.content.unfavored(this.content.id)
          .then(() => {
            this.contentFavored = !this.contentFavored
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$apiGateway.content.favored(this.content.id)
        .then(() => {
          this.contentFavored = !this.contentFavored
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    downloadContent () {
      if (this.content.isPamphlet()) {
        return
      }
      this.downloadVideo = !this.downloadVideo
    },
    setVideoDuration (data) {
      this.videoDuration = data
    },
    clickSeenButton () {
      this.$emit('toggle-video-status')
      this.markedRatios.forEach(markedRatio => {
        if (markedRatio.hasSeen) {
          markedRatio.hasSeen = false
        }
      })
    },
    toggleFavorite (val) {
      this.$emit('toggleFavorite', val)
    },
    setContentSources (sources) {
      const customSources = []
      sources.forEach(source => {
        customSources.push(
          {
            link: source.link,
            type: 'video/mp4',
            label: source.res,
            selected: source.res === '480p'
          }
        )
      })
      this.sources = new PlayerSourceList(customSources)
    },

    setContentTimePoint (timePoints) {
      const customTimePoints = []
      timePoints.forEach(timePoint => {
        customTimePoints.push({
          title: timePoint.title,
          time: timePoint.time,
          id: timePoint.id,
          isFavored: timePoint.isFavored,
          loading: timePoint.loading
        })
      })
      this.timePoints = customTimePoints
    },
    changeVideoStatusToSeen (timeData) {
      this.saveProgress(timeData.watchedPercentage, timeData)
    },
    saveProgress (progressPercent) {
      let reachedProgressPercent = 0
      this.markedRatios.forEach(markedRatio => {
        if (!markedRatio.hasSeen && markedRatio.ratio < progressPercent) {
          markedRatio.hasSeen = true
          if (markedRatio.ratio > reachedProgressPercent) {
            reachedProgressPercent = markedRatio.ratio
          }
        }
      })
      // if (reachedProgressPercent) {
      //   const watchableData = {
      //     watchable_id: this.content.id,
      //     watchable_type: 'content',
      //     duration: timeData.duration
      //   }
      //   // await this.$axios.post('/api/v2/watched', watchableData)
      //   if (timeData.watchedPercentage >= 90) {
      //     this.$emit('toggle-video-status', true)
      //     // this.content.has_watched = true
      //   }
      // }
    },
    bookmarkPostIsFavored (timeStampData) {
      this.$emit('bookmarkTimestamp', timeStampData)
    },
    shareVideo ({ name, url }) {
      window.open(url, '_blank')
    }
  }

}
</script>

<style lang="scss" scoped>
.download-item{
  width: 488px;
  padding: 15px 24px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.89;
  letter-spacing: normal;
  text-align: right;
  border-radius: 15px;
  border: solid 2px;
  color: #3e5480;
  border-color: #eff3ff;

  .quality{
    background: #eff3ff;
    padding: 11px 19px 9px 20px;
    border-radius: 10px;
    height: 48px;
  }

  .download-btn{
    width: 48px;
    height: 48px;
    font-size: 22px;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0 rgb(76 175 80 / 20%);
    background-color: #f8fff8;
  }
}

.download-box{
  border-radius: 40px;
  padding: 15px;

  .download-title{
    color: #3e5480;
    font-size: 20px;
    font-weight: 500;
    margin-top: 30px;
    text-align: center;
  }
}

.video-box {
  .video-wrapper{
    border-radius: 30px;

    @media screen and (width <= 1920px) {
      border-radius: 20px;
    }

    @media screen and (width <= 990px) {
      border-radius: 15px;
    }

    .img{
      border-radius: 30px;

      @media screen and (width <= 1920px) {
        border-radius: 20px;
      }

      @media screen and (width <= 990px) {
        border-radius: 15px;
      }
    }
  }

  .video-paragraph {
    margin-bottom: 0;
  }

  .video-main {
    margin-bottom: 25px;
    border-radius: 30px;

    .video-not-available {
      //margin: 200px auto;
      .content{
        padding: 30px;
        border: 1px solid #FFCA28;
        font-size: 18px;
        border-radius: 15px;
        font-weight: 500;
      }
    }

    @media screen and (width <= 1200px) {
      margin-bottom: 16px;
    }

    @media screen and (width <= 576px) {
      margin-bottom: 10px;
    }
  }

  .video-description {
    align-items: flex-start;
    margin-bottom: 10px;

    @media screen and (width <= 1200px) {
      margin-bottom: 20px !important;
    }

    @media screen and (width <= 350px) {
      margin-bottom: 16px;
    }

    @media screen and (width <= 350px) {
      margin-bottom: 10px;
    }

    .description {
      @media screen and (width <= 576px) {
        display: flex !important;
        flex-direction: column !important;
      }

      @media only screen and (width >= 359px) and (width <= 403px) {
        flex-direction: column !important;
      }

      .video-title {
        color: #3e5480;
        font-size: 20px;
        line-height: 40px;
        max-width: 450px;

        @media screen and (width <= 350px) {
          font-size: 16px !important;
          text-align: right;
        }

        .title-item {
          font-size: 20px;

          @media screen and (width <= 960px) {
            font-size: 16px;
            font-weight: bold;
          }

          &::after {
            content: ")";
            color: #ff8f00;
            padding: 0 6px;

            @media screen and (width <= 768px) {
              padding:0 5px;
              font-size: 16px;
            }
          }

          &:last-child {
            &::after {
              display: none;
            }
          }
        }

        .title-text {
          font-weight: bold;

          @media screen and (width <= 768px) {
            font-size: 16px;
          }
        }
      }

      .subtitle {
        font-size: 16px;
        font-weight: 500;
        color: #9fa5c0;

        @media screen and (width <= 768px) {
          font-size: 14px !important;
          margin-bottom: 16px;
        }

        @media screen and (width <= 350px) {
          margin-bottom: 10px;
        }

        .part {
          margin-left: 40px;

          @media screen and (width <= 768px) {
            margin-left: 10px;
          }

          @media screen and (width <= 350px) {
            margin-left: 30px;
          }

          .alaa-logo {
            width: 13px;
          }

          .icon {
            margin-left: 10px;
          }
        }
      }

      .icon-btn-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        @media screen and (width <= 1200px) {
          flex-direction: column !important;
        }

        @media screen and (width <= 959px) {
          flex-direction: row !important;
          align-items: center !important;
        }

        @media screen and (width <= 768px) {
          flex-direction: column !important;
        }

        @media screen and (width <= 576px) {
          display: flex;
          flex-direction: row !important;
          justify-content: space-between !important;
        }

        .seen-btn {
          @media screen and (width <= 1200px) {
            //margin-bottom: 15px;
          }

          @media screen and (width <= 960px) {
            height: 40px !important;
            margin-bottom: 0;
            box-sizing: border-box;
          }

          .video-btn-text {
            font-size: 16px;
            font-weight: 500;

            @media screen and (width <= 768px) {
              font-size: 14px !important;
            }
          }

        }

        .seen-video-btn {
          background-color: #fff;
          color: #ff8f00;
          width: 120px;
          height: 48px;
          border-radius: 10px;
          border: solid 2px #ff8f00;
          box-shadow: none;

          @media screen and (width <= 768px) {
            width: 110px !important;
            height: 36px !important;
            border: solid 1px #ff8f00 !important;
          }

          .video-btn-text {
            font-size: 16px;
            font-weight: 500;

            @media screen and (width <= 768px) {
              font-size: 14px !important;
            }
          }
        }

        .seen-icon {
          margin-top: 5px;
          font-size: 14px;
          margin-right: 5px;
        }

        .video-btn {
          background-color: #ff8f00;
          color: #fff;
          width: 120px;
          height: 48px;
          border-radius: 10px;
          box-shadow: 0 5px 10px 0 rgb(62 84 128 / 20%);

          @media screen and (width <= 576px) {
            height: 40px;
          }

          @media screen and (width <= 768px) {
            width: 110px !important;
            height: 36px !important;
          }
        }

        .video-box-icon {
          margin-left: 20px;
          padding-top: 10px;

          @media screen and (width <= 1200px) {
            margin-left: 0;
            padding-top: 0;
          }

          @media screen and (width <= 960px) {
            margin-left: 20px;
            padding-top: 0;
          }

          @media screen and (width <= 768px) {
            margin-left: 0;
          }

          @media screen and (width <= 576px) {
            margin-left: 10px;
            padding-top: 0;
            padding-bottom: 0;
          }

          .icon-btn {
            margin-left: 41px;

            &:deep(.q-btn__content){
              margin: 0;
              color: #3e5480;
              font-size: 24px !important;

              @media screen and (width <= 600px) {
                font-size: 18px !important;
              }
            }

            @media screen and (width <= 768px) {
              font-size: 20px !important;
            }

            @media screen and (width <= 576px) {
              margin-left: 20px;
            }

            @media screen and (width <= 350px) {
              font-size: 18px !important;
            }
          }

          .q-btn {
            &:not(.v-btn--round) {
              &.v-size--default {
                padding: 0;

                @media screen and (width <= 1920px) {
                  min-width: 57px !important;
                }

                @media screen and (width <= 960px) {
                  min-width: 54px !important;
                }

                @media screen and (width <= 768px) {
                  min-width: 50px !important;
                }
              }
            }
          }

          .favorite-bookmark {
            color: #ff8f00;
          }
        }
      }
    }
  }

  .video-js {
    height: 100%;
    width: 100%;

    .vjs-big-play-button {
      left: calc(50% - 43px);
      top: calc(50% - 20px);
    }
  }

  .v-sheet {
    &.v-card {
      &:not(.v-sheet--outlined) {
        border-radius: 30px;
        overflow: hidden;

        @media only screen and (width <= 960px) {
          border-radius: 15px;
          overflow: hidden;
        }
      }
    }
  }
}

.download-sheet {
  padding-top: 10px;
  border-radius: 40px 40px 0 0 !important;

  .download-btn {
    display: flex;
    flex-direction: column !important;
    place-content: center center;

    .download-header {
      text-align: center;
      margin: 35px 0;
      font-weight: 500;

      @media screen and (width <= 1264px) {
        margin: 30px 0;
      }

      @media screen and (width <= 960px) {
        margin: 27px 0;
      }

      @media screen and (width <= 600px) {
        margin: 22px 0;
      }

      .download-title {
        color: #3e5480;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 0 !important;

        @media screen and (width <= 600px) {
          font-size: 16px;
        }
      }
    }

    .download-list {
      display: flex;
      flex-direction: row !important;

      @media screen and (width <= 960px) {
        flex-direction: column !important;
      }

      .download-part {
        width: 488px;
        height: 96px;
        border-radius: 15px;
        border: #eff3ff 2px solid !important;
        margin-left: 30px;
        margin-bottom: 42px;
        padding: 24px;

        @media screen and (width <= 1904px) {
          width: 380px;
          height: 80px;
          margin-left: 16px;
          padding: 16px;
        }

        @media screen and (width <= 1264px) {
          width: 260px;
          height: 126px;

        }

        @media screen and (width <= 960px) {
          width: 488px;
          height: 96px;
          margin-left: 0;
          margin-bottom: 16px;
          padding: 24px;
        }

        @media screen and (width <= 600px) {
          width: 318px;
          height: 70px;
          padding: 16px;
        }

        @media screen and (width <= 350px) {
          width: 288px;
          height: 70px;
        }

        .details {
          display: flex;
          flex-direction: row;
          color: #3e5480;
          font-size: 18px !important;
          font-weight: 500;
          justify-content: space-between;

          @media only screen and (width >= 961px) and (width <= 1264px) {
            flex-direction: column;
            text-align: center;
          }

          @media screen and (width <= 600px) {
            font-size: 14px !important;
          }

          .download-caption {
            padding-top: 12px;

            @media only screen and (width >= 961px) and (width <= 1264px) {
              margin-bottom: 18px;
              padding-top: 0;
            }

            @media screen and (width <= 600px) {
              padding-top: 8px;
            }
          }

          .column-details {
            display: flex;
            flex-direction: row;

            .size {
              margin-left: 49px;
              padding-top: 13px;

              @media screen and (width <= 1904px) {
                margin-left: 24px;
              }

              @media screen and (width <= 1264px) {
                margin-left: 20px;
              }

              @media screen and (width <= 960px) {
                margin-left: 49px;
              }

              @media screen and (width <= 600px) {
                margin-left: 21px;
                padding-top: 8px;
              }

              @media screen and (width <= 350px) {
                margin-left: 11px;
              }
            }

            .quality {
              color: #3e5480;
              border-radius: 10px;
              background-color: #eff3ff;
              margin-left: 36px;
              font-size: 18px !important;
              font-weight: 500;
              height: 48px;

              @media screen and (width <= 1904px) {
                margin-left: 16px;
              }

              @media screen and (width <= 1264px) {
                margin-left: 20px;
              }

              @media screen and (width <= 960px) {
                margin-left: 24px;
              }

              @media screen and (width <= 600px) {
                height: 36px !important;
                margin-left: 16px;
                font-size: 14px !important;
              }
            }

            .download-part-icon {
              background-color: #f8fff8;
              justify-content: center;
              padding-top: 14px;
              width: 48px;
              height: 48px;
              box-shadow: 0 5px 10px 0 rgb(76 175 80 / 20%);
              border-radius: 10px;

              @media screen and (width <= 600px) {
                width: 36px;
                height: 36px;
                padding-top: 12px;
              }

              a {
                text-decoration: none;
              }

              .icon {
                color: #4caf50;
                font-size: 21px;

                @media screen and (width <= 600px) {
                  font-size: 19px;
                }
              }
            }
          }
        }

      }
    }
  }
}

.v-bottom-sheet {
  .v-sheet {
    .download-btn {
      .share-parent {
        margin: 35px;
        text-align: center;

        @media screen and (width <= 1264px) {
          margin: 30px;
        }

        @media screen and (width <= 960px) {
          margin: 27px;
        }

        @media screen and (width <= 600px) {
          margin: 22px;
        }
      }
    }
  }
}
</style>

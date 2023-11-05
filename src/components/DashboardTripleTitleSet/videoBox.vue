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
                   icon="ph:share-network"
                   @click="socialMediaDialog = !socialMediaDialog">
              <q-tooltip anchor="top middle"
                         self="bottom middle"
                         :offset="[10, 10]">
                اشتراک گذاری
              </q-tooltip>
              <!--              <i class="fi fi-rr-share icon " />-->
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
  <q-dialog v-model="socialMediaDialog"
            position="bottom">
    <q-card style="width: 500px">
      <q-card-section class="flex items-center justify-around">
        <div v-for="(item,index) in socialMediaList"
             :key="index">
          <q-btn flat
                 :icon="item.icon || undefined"
                 @click="share(item.name)">
            <div v-if="item.name === 'whatsapp'"
                 style="height:24px;">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="24"
                   height="24"
                   shape-rendering="geometricPrecision"
                   text-rendering="geometricPrecision"
                   image-rendering="optimizeQuality"
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   viewBox="0 0 640 640"><path d="M546.704 91.89C486.526 31.584 406.482-1.582 321.229-1.582 145.609-1.583 2.67 141.368 2.67 317.118c0 56.139 14.705 111.05 42.567 159.297L.001 641.595l168.959-44.34c46.595 25.382 99.013 38.835 152.222 38.835h.13C496.944 636.09 640 493.14 640 317.401c0-85.182-33.166-165.179-93.344-225.463l.047-.047zM321.323 582.315c-47.599 0-94.218-12.827-134.895-36.957l-9.697-5.788-100.265 26.257 26.776-97.726-6.272-10.04C70.312 415.965 56.4 367.244 56.4 317.13c0-146.082 118.832-264.96 265.066-264.96 70.713 0 137.328 27.65 187.302 77.622 49.996 50.127 77.493 116.588 77.493 187.42-.118 146.187-118.95 265.066-264.96 265.066l.024.036zM466.541 383.85c-7.913-4.028-47.115-23.233-54.39-25.89-7.276-2.658-12.58-4.028-17.977 4.027-5.268 7.914-20.587 25.89-25.252 31.265-4.666 5.28-9.284 6.035-17.197 2.008-7.914-4.028-33.674-12.426-64.064-39.568-23.634-21.095-39.662-47.221-44.328-55.134-4.665-7.914-.52-12.308 3.532-16.193 3.661-3.544 7.925-9.284 11.941-13.95 4.028-4.665 5.28-7.925 7.925-13.31 2.658-5.28 1.359-9.946-.637-13.95-2.008-4.015-17.977-43.217-24.485-59.185-6.39-15.603-13.063-13.43-17.965-13.701-4.665-.237-9.945-.237-15.2-.237-5.257 0-13.95 1.996-21.225 9.933-7.276 7.914-27.898 27.26-27.898 66.45 0 39.201 28.512 77.009 32.516 82.407 4.027 5.267 56.162 85.784 136.029 120.238 18.98 8.161 33.803 13.063 45.355 16.854 19.098 6.024 36.425 5.15 50.126 3.13 15.32-2.256 47.115-19.229 53.788-37.831 6.662-18.615 6.662-34.536 4.666-37.831-1.89-3.544-7.158-5.504-15.201-9.58l-.06.048z" /></svg>
            </div>
            <div v-if="item.name === 'twitter'"
                 style="height:24px;"><svg xmlns="http://www.w3.org/2000/svg"
                                           viewBox="0 0 3333 3333"
                                           width="24"
                                           height="24"
                                           shape-rendering="geometricPrecision"
                                           text-rendering="geometricPrecision"
                                           image-rendering="optimizeQuality"
                                           fill-rule="evenodd"
                                           clip-rule="evenodd"><path d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm900 1108c-66 30-137 49-212 58 76-46 135-118 162-204-71 42-151 73-234 90-68-72-163-116-270-116-204 0-369 165-369 369 0 29 3 57 9 84-307-16-579-162-761-386-33 56-50 120-50 186 0 128 65 241 164 307-61-2-117-19-167-46v5c0 179 127 328 296 362-31 8-64 13-97 13-24 0-47-2-70-7 47 147 183 253 345 257-127 99-285 158-459 158-30 0-59-2-88-5 164 105 358 166 566 166 679 0 1051-563 1051-1051 0-16 0-32-1-48 72-52 135-117 184-191z" /></svg></div>
            <div v-if="item.name === 'linkedin'"
                 style="height:24px;">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="24"
                   height="24"
                   viewBox="0 0 3333 3333"
                   shape-rendering="geometricPrecision"
                   text-rendering="geometricPrecision"
                   image-rendering="optimizeQuality"
                   fill-rule="evenodd"
                   clip-rule="evenodd"><path d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm-215 1336h342v175h5c48-86 164-175 338-175 361 0 428 225 428 517v596h-357v-528c0-126-3-288-186-288-186 0-214 137-214 279v537h-357V1336zm-247-309c0 102-83 186-186 186-102 0-186-83-186-186 0-102 83-186 186-186 102 0 186 83 186 186zm-371 309h371v1113H834V1336z" /></svg>
            </div>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
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
import shareSocial from 'assets/js/shareSocialMedia.js'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'

import ContentVideoPlayer from 'src/components/Widgets/Content/Show/ContentVideoPlayer/ContentVideoPlayer.vue'

export default {
  name: 'VideoBox',
  components: { ProductItem, Bookmark, ContentVideoPlayer },
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

  data() {
    return {
      bookmarkLoading: false,
      sheet: false,
      keepCalculating: true,
      timePoints: [],
      sources: new PlayerSourceList(),
      markedRatios: [
        { ratio: 90, hasSeen: false }
      ],
      socialMediaDialog: false,
      downloadVideo: false,
      socialMediaList: [
        {
          icon: '',
          name: 'whatsapp'
        },
        {
          icon: 'mail',
          name: 'mail'
        },
        {
          icon: '',
          name: 'linkedin'
        },
        {
          icon: '',
          name: 'twitter'
        },
        {
          icon: 'facebook',
          name: 'facebook'
        },
        {
          icon: 'telegram',
          name: 'telegram'
        }
      ],
      videoDuration: null,
      lastSeenPercentage: 0
    }
  },
  computed: {
    selectedProduct() {
      return this.$store.getters['TripleTitleSet/selectedProduct']
    },
    contentFavored: {
      get() {
        return this.content.is_favored
      },
      set(value) {
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
    setVideoDuration(data) {
      this.videoDuration = data
    },
    share(name) {
      const url = shareSocial.getShareLink(
        {
          link: this.content.url.web,
          title: this.content.title
        }, name)
      open(url)
    },

    show() {
    },

    clickSeenButton() {
      this.$emit('toggle-video-status')
      this.markedRatios.forEach(markedRatio => {
        if (markedRatio.hasSeen) {
          markedRatio.hasSeen = false
        }
      })
    },

    toggleFavorite(val) {
      this.$emit('toggleFavorite', val)
    },

    getShareLink(content, socialMedia) {
      if (socialMedia === 'telegram') {
        return 'https://telegram.me/share/url?url=' + content.url.web + '&text=' + content.title
      } else if (socialMedia === 'whatsapp') {
        return 'https://web.whatsapp.com/send?l=en&text=' + content.url.web
      } else if (socialMedia === 'mail') {
        return 'mailto:info@alaatv.com?&subject=' + content.title + '&body=' + content.url.web
      } else if (socialMedia === 'linkedin') {
        return 'https://www.linkedin.com/shareArticle?mini=true&url=' + content.url.web + '&title=' + content.title + '&summary=&source=alaatv.com'
      } else if (socialMedia === 'pinterest') {
        return 'https://pinterest.com/pin/create/button/?url=' + content.url.web + '&media=&description=alaatv.com'
      } else if (socialMedia === 'twitter') {
        return 'https://twitter.com/home?status=' + content.url.web
      } else if (socialMedia === 'facebook') {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + content.url.web
      }
    },

    openUrl(content, socialMedia) {
      const url = this.getShareLink(content, socialMedia)
      open(url)
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

    changeVideoStatusToSeen(timeData) {
      this.saveProgress(timeData.watchedPercentage, timeData)
    },

    saveProgress(progressPercent) {
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

    bookmarkPostIsFavored(timeStampData) {
      this.$emit('bookmarkTimestamp', timeStampData)
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
    box-shadow: 0 5px 10px 0 rgba(76, 175, 80, 0.2);
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
    @media screen and (max-width: 1920px) {
      border-radius: 20px;
    }
    @media screen and (max-width: 990px) {
      border-radius: 15px;
    }
    .img{
      border-radius: 30px;
      @media screen and (max-width: 1920px) {
        border-radius: 20px;
      }
      @media screen and (max-width: 990px) {
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

    @media screen and (max-width: 1200px) {
      margin-bottom: 16px;
    }
    @media screen and (max-width: 576px) {
      margin-bottom: 10px;
    }
  }

  .video-description {
    align-items: flex-start;
    margin-bottom: 10px;
    @media screen and (max-width: 1200px) {
      margin-bottom: 20px !important;
    }
    @media screen and (max-width: 350px) {
      margin-bottom: 16px;
    }
    @media screen and (max-width: 350px) {
      margin-bottom: 10px;
    }

    .description {
      @media screen and (max-width: 576px) {
        display: flex !important;
        flex-direction: column !important;
      }
      @media only screen and (min-width: 359px) and (max-width: 403px) {
        flex-direction: column !important;
      }

      .video-title {
        color: #3e5480;
        font-size: 20px;
        line-height: 40px;
        max-width: 450px;
        @media screen and (max-width: 350px) {
          font-size: 16px !important;
          text-align: right;
        }

        .title-item {
          font-size: 20px;
          @media screen and (max-width: 960px) {
            font-size: 16px;
            font-weight: bold;
          }

          &:after {
            content: ")";
            color: #ff8f00;
            padding: 0 6px;
            @media screen and (max-width: 768px) {
              padding:0 5px;
              font-size: 16px;
            }
          }

          &:last-child {
            &:after {
              display: none;
            }
          }
        }

        .title-text {
          font-weight: bold;
          @media screen and (max-width: 768px) {
            font-size: 16px;
          }
        }
      }

      .subtitle {
        font-size: 16px;
        font-weight: 500;
        color: #9fa5c0;
        @media screen and (max-width: 768px) {
          font-size: 14px !important;
          margin-bottom: 16px;
        }
        @media screen and (max-width: 350px) {
          margin-bottom: 10px;
        }

        .part {
          margin-left: 40px;
          @media screen and (max-width: 768px) {
            margin-left: 10px;
          }
          @media screen and (max-width: 350px) {
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
        @media screen and (max-width: 1200px) {
          flex-direction: column !important;
        }
        @media screen and (max-width: 959px) {
          flex-direction: row !important;
          align-items: center !important;
        }
        @media screen and (max-width: 768px) {
          flex-direction: column !important;
        }
        @media screen and (max-width: 576px) {
          display: flex;
          flex-direction: row !important;
          justify-content: space-between !important;
        }

        .seen-btn {
          @media screen and (max-width: 1200px) {
            //margin-bottom: 15px;
          }
          @media screen and (max-width: 960px) {
            height: 40px !important;
            margin-bottom: 0;
            box-sizing: border-box;
          }

          .video-btn-text {
            font-size: 16px;
            font-weight: 500;
            @media screen and (max-width: 768px) {
              font-size: 14px !important;
            }
          }

        }

        .seen-video-btn {
          background-color: #ffffff;
          color: #ff8f00;
          width: 120px;
          height: 48px;
          border-radius: 10px;
          border: solid 2px #ff8f00;
          box-shadow: none;
          @media screen and (max-width: 768px) {
            width: 110px !important;
            height: 36px !important;
            border: solid 1px #ff8f00 !important;
          }

          .video-btn-text {
            font-size: 16px;
            font-weight: 500;
            @media screen and (max-width: 768px) {
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
          color: #ffffff;
          width: 120px;
          height: 48px;
          border-radius: 10px;
          box-shadow: 0 5px 10px 0 rgba(62, 84, 128, 0.2);
          @media screen and (max-width: 576px) {
            height: 40px;
          }
          @media screen and (max-width: 768px) {
            width: 110px !important;
            height: 36px !important;
          }
        }

        .video-box-icon {
          margin-left: 20px;
          padding-top: 10px;
          @media screen and (max-width: 1200px) {
            margin-left: 0;
            padding-top: 0;
          }
          @media screen and (max-width: 960px) {
            margin-left: 20px;
            padding-top: 0;
          }
          @media screen and (max-width: 768px) {
            margin-left: 0;
          }
          @media screen and (max-width: 576px) {
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
              @media screen and (max-width: 600px) {
                font-size: 18px !important;
              }
            }
            @media screen and (max-width: 768px) {
              font-size: 20px !important;
            }
            @media screen and (max-width: 576px) {
              margin-left: 20px;
            }
            @media screen and (max-width: 350px) {
              font-size: 18px !important;
            }
          }

          .q-btn {
            &:not(.v-btn--round) {
              &.v-size--default {
                padding: 0;
                @media screen and (max-width: 1920px) {
                  min-width: 57px !important;
                }
                @media screen and (max-width: 960px) {
                  min-width: 54px !important;
                }
                @media screen and (max-width: 768px) {
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
        @media only screen and (max-width: 960px) {
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
    justify-content: center;
    align-content: center;

    .download-header {
      text-align: center;
      margin: 35px 0;
      font-weight: 500;
      @media screen and (max-width: 1264px) {
        margin: 30px 0;
      }
      @media screen and (max-width: 960px) {
        margin: 27px 0;
      }
      @media screen and (max-width: 600px) {
        margin: 22px 0;
      }

      .download-title {
        color: #3e5480;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 0 !important;
        @media screen and (max-width: 600px) {
          font-size: 16px;
        }
      }
    }

    .download-list {
      display: flex;
      flex-direction: row !important;
      @media screen and (max-width: 960px) {
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
        @media screen and (max-width: 1904px) {
          width: 380px;
          height: 80px;
          margin-left: 16px;
          padding: 16px;
        }
        @media screen and (max-width: 1264px) {
          width: 260px;
          height: 126px;

        }
        @media screen and (max-width: 960px) {
          width: 488px;
          height: 96px;
          margin-left: 0;
          margin-bottom: 16px;
          padding: 24px;
        }
        @media screen and (max-width: 600px) {
          width: 318px;
          height: 70px;
          padding: 16px;
        }
        @media screen and (max-width: 350px) {
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
          @media only screen and (min-width: 961px) and (max-width: 1264px) {
            flex-direction: column;
            text-align: center;
          }
          @media screen and (max-width: 600px) {
            font-size: 14px !important;
          }

          .download-caption {
            padding-top: 12px;
            @media only screen and (min-width: 961px) and (max-width: 1264px) {
              margin-bottom: 18px;
              padding-top: 0;
            }
            @media screen and (max-width: 600px) {
              padding-top: 8px;
            }
          }

          .column-details {
            display: flex;
            flex-direction: row;

            .size {
              margin-left: 49px;
              padding-top: 13px;
              @media screen and (max-width: 1904px) {
                margin-left: 24px;
              }
              @media screen and (max-width: 1264px) {
                margin-left: 20px;
              }
              @media screen and (max-width: 960px) {
                margin-left: 49px;
              }
              @media screen and (max-width: 600px) {
                margin-left: 21px;
                padding-top: 8px;
              }
              @media screen and (max-width: 350px) {
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
              @media screen and (max-width: 1904px) {
                margin-left: 16px;
              }
              @media screen and (max-width: 1264px) {
                margin-left: 20px;
              }
              @media screen and (max-width: 960px) {
                margin-left: 24px;
              }
              @media screen and (max-width: 600px) {
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
              box-shadow: 0 5px 10px 0 rgba(76, 175, 80, 0.2);
              border-radius: 10px;
              @media screen and (max-width: 600px) {
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
                @media screen and (max-width: 600px) {
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
        @media screen and (max-width: 1264px) {
          margin: 30px;
        }
        @media screen and (max-width: 960px) {
          margin: 27px;
        }
        @media screen and (max-width: 600px) {
          margin: 22px;
        }
      }
    }
  }
}
</style>

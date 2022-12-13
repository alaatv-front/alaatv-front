<template>
  <div class="video-box">
    <q-card
      flat
      color="#eff3ff"
      class="video-main"
    >
      <!--      :aspect-ratio="16/9"-->
      <div>
        <video-player
          v-if="content.file && content.file.video && content.inputData.can_see"
          :time-points="timePoints"
          :poster="content.photo"
          :sources="sources"
          :keepCalculating="keepCalculating"
          @calcTimeData="changeVideoStatusToSeen"
          @toggleBookmark="bookmarkPostIsFavored"
        />
        <div v-else-if="(!content.id || !content.photo)">
          <v-alert
            class="null-video"
            outlined
            type="warning"
            prominent
            border="left"
            max-width="290"
            rounded
          >
            اوه نه! ویدیویی وجود نداره...
          </v-alert>
        </div>
        <div v-else>
          <a
            :href="content.url.web"
            target="_blank"
          >
            <v-img :src="content.photo" />
          </a>
        </div>
      </div>

    </q-card>
    <div class="video-description">
      <div
        class="description row"
      >
        <div class="col-12">
          <div class="flex flex-wrap video-title">
            <p
              v-if="content.lesson_name || lesson.title"
              class="title-item title-text video-paragraph"
            >
              <span
                v-if="lesson.title"
              >
                {{ lesson.title }}
              </span>
              <span
                v-else-if="content.lesson_name"
              >
                {{ content.lesson_name }}
              </span>
            </p>
            <p
              v-if="(set && set.short_title) || (content.set && content.set.short_title)"
              class="title-item title-text video-paragraph"
            >
              <span
                v-if="set && set.short_title"
              >
                {{ set.short_title }}
              </span>
              <span
                v-else-if="content.set && content.set.short_title"
              >
                {{ content.set.short_title }}
              </span>
            </p>
            <p
              v-if="content.order || content.order === 0"
              class="title-item title-text video-paragraph"
            >
              جلسه {{ content.order }}
            </p>
          </div>
          <div class="flex subtitle">
            <div class="flex part align-start">
              <q-img
                src="https://nodes.alaatv.com/upload/abrisham-panel-ic_alaa.png"
                class="alaa-logo icon"
              />
              <p class="video-paragraph">گروه آموزشی آلاء</p>
            </div>
            <div
              v-if="content.author && (content.author.first_name || content.author.last_name)"
              class="flex part align-center"
            >
              <i class="fi fi-rr-graduation-cap icon" />
              <p class="video-paragraph">
                {{ content.author.first_name }} {{content.author.last_name }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="content.id"
          class="icon-btn-box"
        >
          <q-btn
            dark
            unelevated
            class="seen-btn"
            :class="{ 'seen-video-btn': content.has_watched, 'video-btn': !content.has_watched }"
            :loading="content.loading"
            @click="clickSeenButton"
          >
            <span
              v-if="content.has_watched"
              class="video-btn-text"
            >
              دیده شده
            </span>
            <i v-if="content.has_watched"
               class="fi fi-rr-check seen-icon" />
            <span
              v-else
              class="video-btn-text"
            >
              دیده نشده
            </span>
          </q-btn>
          <div class="video-box-icon">
            <!--            <v-bottom-sheet-->
            <!--              v-if="content.file && content.file.video"-->
            <!--              transparent-->
            <!--            >-->
            <!--              <template v-slot:activator="{ on, attrs }">-->
            <!--                <v-btn-->
            <!--                  color="transparent"-->
            <!--                  depressed-->
            <!--                  dark-->
            <!--                  v-bind="attrs"-->
            <!--                  class="video-box-icon-button"-->
            <!--                  v-on="on"-->
            <!--                >-->
            <!--                  <i class="fi fi-rr-download icon" />-->
            <!--                </v-btn>-->
            <!--              </template>-->
            <!--              <v-list class="align-center download-sheet">-->
            <!--                <v-row-->
            <!--                  class="download-btn"-->
            <!--                >-->
            <!--                  <div class="download-header">-->
            <!--                    <p class="download-title">دانلود</p>-->
            <!--                    &lt;!&ndash;                                       <p class="file-time">&ndash;&gt;-->
            <!--                    &lt;!&ndash;                                           <i class="fi fi-rr-clock icon"/>&ndash;&gt;-->
            <!--                    &lt;!&ndash;                                           <span>زمان فیلم: 38:57 دقیقه</span>&ndash;&gt;-->
            <!--                    &lt;!&ndash;                                       </p>&ndash;&gt;-->
            <!--                  </div>-->
            <!--                  <div class="download-list">-->
            <!--                    <v-card-->
            <!--                      v-for="(file , index) in content.file.video"-->
            <!--                      :key="index"-->
            <!--                      class="download-part"-->
            <!--                      flat-->
            <!--                      @click="sheet = false"-->
            <!--                    >-->
            <!--                      <v-row>-->
            <!--                        <v-col class="details">-->
            <!--                          <span class="download-caption">-->
            <!--                            {{ file.caption }}-->
            <!--                          </span>-->
            <!--                          <div class="column-details">-->
            <!--                            <span class="size">-->
            <!--                              {{ file.size }}-->
            <!--                            </span>-->
            <!--                            <v-btn-->
            <!--                              class="quality"-->
            <!--                              depressed-->
            <!--                            >-->
            <!--                              {{ file.res }}-->
            <!--                            </v-btn>-->
            <!--                            <v-card-actions-->
            <!--                              class="download-part-icon"-->
            <!--                            >-->
            <!--                              <a :href="file.link">-->
            <!--                                <i class="fi fi-rr-download icon" />-->
            <!--                              </a>-->
            <!--                            </v-card-actions>-->
            <!--                          </div>-->
            <!--                        </v-col>-->
            <!--                      </v-row>-->
            <!--                    </v-card>-->
            <!--                  </div>-->
            <!--                </v-row>-->
            <!--              </v-list>-->
            <!--            </v-bottom-sheet-->>-->
            <!--            <v-bottom-sheet>-->
            <!--              <template v-slot:activator="{ on, attrs }">-->
            <!--                <v-btn-->
            <!--                  color="transparent"-->
            <!--                  depressed-->
            <!--                  dark-->
            <!--                  v-bind="attrs"-->
            <!--                  class="video-box-icon-button"-->
            <!--                  v-on="on"-->
            <!--                >-->
            <!--                  <i class="fi fi-rr-share icon" />-->
            <!--                </v-btn>-->
            <!--              </template>-->
            <!--              <v-list class="align-center">-->
            <!--                <v-row class="download-btn"-->
            <!--                       justify="center">-->
            <!--                  <div class="share-parent">-->
            <!--                    <ShareNetwork-->
            <!--                      network="whatsapp"-->
            <!--                      class="social-share"-->
            <!--                    >-->
            <!--                      <v-btn-->
            <!--                        class="ma-2"-->
            <!--                        color="amber darken-3"-->
            <!--                        dark-->
            <!--                        @click="openUrl (content, 'whatsapp')"-->
            <!--                      >-->
            <!--                        <v-icon>mdi-whatsapp</v-icon>-->
            <!--                      </v-btn>-->
            <!--                    </ShareNetwork>-->
            <!--                    <ShareNetwork-->
            <!--                      network="telegram"-->
            <!--                      class="social-share"-->
            <!--                    >-->
            <!--                      <v-btn-->
            <!--                        class="ma-2"-->
            <!--                        color="amber darken-3"-->
            <!--                        dark-->
            <!--                        @click="openUrl (content, 'telegram')"-->
            <!--                      >-->
            <!--                        <v-icon>mdi-telegram</v-icon>-->
            <!--                      </v-btn>-->
            <!--                    </ShareNetwork>-->
            <!--                    <ShareNetwork-->
            <!--                      network="mail"-->
            <!--                      class="social-share"-->
            <!--                    >-->
            <!--                      <v-btn-->
            <!--                        class="ma-2"-->
            <!--                        color="amber darken-3"-->
            <!--                        dark-->
            <!--                        @click="openUrl (content, 'mail')"-->
            <!--                      >-->
            <!--                        <v-icon>mdi-mail</v-icon>-->
            <!--                      </v-btn>-->
            <!--                    </ShareNetwork>-->
            <!--                    <ShareNetwork-->
            <!--                      network="linkedin"-->
            <!--                      class="social-share"-->
            <!--                    >-->
            <!--                      <v-btn-->
            <!--                        class="ma-2"-->
            <!--                        color="amber darken-3"-->
            <!--                        dark-->
            <!--                        @click="openUrl (content, 'linkedin')"-->
            <!--                      >-->
            <!--                        <v-icon>mdi-linkedin</v-icon>-->
            <!--                      </v-btn>-->
            <!--                    </ShareNetwork>-->
            <!--                    <ShareNetwork-->
            <!--                      network="pinterest"-->
            <!--                      class="social-share"-->
            <!--                    >-->
            <!--                      <v-btn-->
            <!--                        class="ma-2"-->
            <!--                        color="amber darken-3"-->
            <!--                        dark-->
            <!--                        @click="openUrl (content, 'pinterest')"-->
            <!--                      >-->
            <!--                        <v-icon>mdi-pinterest</v-icon>-->
            <!--                      </v-btn>-->
            <!--                    </ShareNetwork>-->
            <!--                    <ShareNetwork-->
            <!--                      network="twitter"-->
            <!--                      class="social-share"-->
            <!--                    >-->
            <!--                      <v-btn-->
            <!--                        class="ma-2"-->
            <!--                        color="amber darken-3"-->
            <!--                        dark-->
            <!--                        @click="openUrl (content, 'twitter')"-->
            <!--                      >-->
            <!--                        <v-icon>mdi-twitter</v-icon>-->
            <!--                      </v-btn>-->
            <!--                    </ShareNetwork>-->
            <!--                    <ShareNetwork-->
            <!--                      network="facebook"-->
            <!--                      class="social-share"-->
            <!--                    >-->
            <!--                      <v-btn-->
            <!--                        class="ma-2"-->
            <!--                        color="amber darken-3"-->
            <!--                        dark-->
            <!--                        @click="openUrl (content, 'facebook')"-->
            <!--                      >-->
            <!--                        <v-icon>mdi-facebook</v-icon>-->
            <!--                      </v-btn>-->
            <!--                    </ShareNetwork>-->
            <!--                  </div>-->
            <!--                </v-row>-->
            <!--              </v-list>-->
            <!--            </v-bottom-sheet>-->
            <q-btn
              color="transparent"
              unelevated
              dark
              :loading="content.loading"
              class="video-box-icon-button"
              @click="toggleFavorite"
            >
              <i
                class="fi fi-rr-bookmark icon bookmark-button"
                :class="{ 'favorite-bookmark': content.is_favored , 'icon': !content.is_favored }"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Content } from 'src/models/Content'
import VideoPlayer from 'src/components/VideoPlayer'
import { PlayerSourceList } from 'src/models/PlayerSource'
export default {
  name: 'VideoBox',

  components: { VideoPlayer },

  props: {
    content: {
      type: Content,
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

  data() {
    return {
      sheet: false,
      keepCalculating: true,
      timePoints: [],
      sources: new PlayerSourceList(),
      markedRatios: [
        { ratio: 90, hasSeen: false }
      ]
    }
  },

  watch: {
    'content.id': function () {
      if (this.content && this.content.file && this.content.file.video) {
        this.setContentSources(this.content.file.video)
        this.setContentTimePoint(this.content.timepoints.list)
      }
    }
  },

  methods: {
    clickSeenButton() {
      this.content.loading = true
      this.$emit('has_watched')
      this.markedRatios.forEach(markedRatio => {
        if (markedRatio.hasSeen) {
          markedRatio.hasSeen = false
        }
      })
    },

    toggleFavorite() {
      // eslint-disable-next-line vue/no-mutating-props
      this.content.loading = true
      this.$emit('favorite')
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

    saveProgress(progressPercent, timeData) {
      let reachedProgressPercent = 0
      this.markedRatios.forEach(markedRatio => {
        if (!markedRatio.hasSeen && markedRatio.ratio < progressPercent) {
          markedRatio.hasSeen = true
          if (markedRatio.ratio > reachedProgressPercent) {
            reachedProgressPercent = markedRatio.ratio
          }
        }
      })
      if (reachedProgressPercent) {
        const watchableData = {
          watchable_id: this.content.id,
          watchable_type: 'content',
          duration: timeData.duration
        }
        this.$axios.post('/api/v2/watched', watchableData)
          .then(() => {
            if (timeData.watchedPercentage >= 90) {
              this.content.has_watched = true
            }
          })
      }
    },

    bookmarkPostIsFavored(timeStampData) {
      this.$emit('bookmarkTimestamp', timeStampData)
    }
  }

}
</script>
<style lang="scss" scoped>

.video-box {
    .video-paragraph {
        margin-bottom: 0;
    }

    .video-main {
        margin-bottom: 25px;

        .null-video {
            margin: 200px auto;
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
        @media screen and (max-width: 1200px) {
            margin-bottom: 0 !important;
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
                        padding-left: 6px;
                        @media screen and (max-width: 768px) {
                            padding-left: 5px;
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
                justify-content: flex-end;
                @media screen and (max-width: 1200px) {
                    flex-direction: column !important;
                    align-items: flex-end !important;
                }
                @media screen and (max-width: 959px) {
                    flex-direction: row !important;
                    align-items: flex-start !important;
                }
                @media screen and (max-width: 768px) {
                    flex-direction: column !important;
                    align-items: flex-end !important;
                }
                @media screen and (max-width: 576px) {
                    display: flex;
                    flex-direction: row !important;
                    justify-content: space-between !important;
                }

                .seen-btn {
                    @media screen and (max-width: 1200px) {
                        margin-bottom: 15px;
                    }
                    @media screen and (max-width: 960px) {
                        height: 40px !important;
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
                    margin-right: 20px;
                    padding-top: 10px;
                    @media screen and (max-width: 576px) {
                        padding-top: 0px;
                        padding-bottom: 10px;
                    }

                    .icon {
                        font-size: 24px !important;
                        color: #3e5480;
                        padding: 6px 0;
                        @media screen and (max-width: 768px) {
                            font-size: 20px !important;
                        }
                        @media screen and (max-width: 576px) {
                            margin-right: 20px;
                        }
                        @media screen and (max-width: 350px) {
                            font-size: 18px !important;
                        }
                    }

                    .v-btn {
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

                    .video-box-icon-button {
                        @media screen and (max-width: 1200px) {
                            justify-content: flex-end;
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
<style lang="scss">
.video-box {
    .video-description {
        .description {
            .icon-btn-box {
                .video-box-icon {
                    .bookmark-button {
                        .v-btn__loader {
                            color: #ff8f00 !important;
                        }
                    }
                }
            }
        }
    }
}

.v-sheet {
    &.v-list {
        &:not(.v-sheet--outlined) {
            border-radius: 40px 40px 0 0;
        }
    }
}
</style>

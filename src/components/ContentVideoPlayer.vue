<template>
  <div ref="videoPlayerWrapper"
       style="width: 100%;"
       class="vPlayer">
    <div id="videoPlayer-timeStamp"
         dir="rtl">
         <!--      <v-navigation-drawer v-show="videoIsPlaying"-->
         <!--                           v-model="drawer"-->
         <!--                           right-->
         <!--                           absolute-->
         <!--                           :height="calcTheHeight"-->
         <!--                           :width="calcTheWidth"-->
         <!--                           temporary-->
         <!--                           hide-overlay>-->
         <!--        <v-list-item>-->

         <!--          <i class="fi-sr-bookmark" />-->
         <!--          <v-list-item-title>زمانکوب ها</v-list-item-title>-->
         <!--          &lt;!&ndash; <v-btn-->
         <!--                              icon-->
         <!--                              @click.stop="drawer = false"-->
         <!--                          >-->
         <!--                              <v-icon>mdi-chevron-right</v-icon>-->
         <!--                          </v-btn> &ndash;&gt;-->
         <!--        </v-list-item>-->
         <!--        <v-divider color="rgba(255, 255, 255, 0.6)" />-->
         <!--        <v-list nav-->
         <!--                dense>-->
         <!--          <v-list-item-group>-->
         <!--            <v-list-item v-for="(timeStamp,index) in timePoints"-->
         <!--                         :key="index"-->
         <!--                         @click="activate(timeStamp.time)">-->
         <!--              <v-list-item-title>{{ timeStamp.title }}</v-list-item-title>-->
         <!--              <v-list-item-action>-->
         <!--                <v-list-item-action-text>-->
         <!--                  <v-menu bottom-->
         <!--                          left>-->
         <!--                    <template v-slot:activator="{ /* on */ }">-->
         <!--                      <v-btn class="video-box-icon-button"-->
         <!--                             icon-->
         <!--                             :loading="timeStamp.loading"-->
         <!--                             @click.stop="toggleFavorite(timeStamp.id , $event)">-->

         <!--                        &lt;!&ndash;fi-sr-bookmark  &ndash;&gt;-->
         <!--                        <span class='bookmark-button'-->
         <!--                              :class="{ 'is-favorite': timeStamp.isFavored , 'is-not-favorite': !timeStamp.isFavored }" />-->
         <!--                      </v-btn>-->
         <!--                    </template>-->
         <!--                  </v-menu>-->
         <!--                </v-list-item-action-text>-->
         <!--              </v-list-item-action>-->
         <!--            </v-list-item>-->
         <!--          </v-list-item-group>-->
         <!--        </v-list>-->
         <!--      </v-navigation-drawer>-->
         <!-- <transition name="fade">
        <v-btn v-show="videoIsPlaying"
               color="rgba(0, 0, 0, 0.6)"
               class="white--text vPlayer-drawer-btn"
               @click.stop="drawer = true">
          <span class='vPlayer-timestamp-icon' />
        </v-btn>
      </transition> -->
    </div>
    <video-player ref="videoPlayer"
                  :source="content.getVideoSource()"
                  :over-player="hasTimepoint"
                  :over-player-width="'250px'"
                  :use-over-player="hasTimepoint">
      <template #overPlayer>
        <div class="timepoint-list">
          <q-banner class="timepoint-list-title">
            زمان کوب ها
          </q-banner>
          <q-list>
            <q-item v-for="timepoint in content.timepoints.list"
                    :key="timepoint.id"
                    v-ripple
                    clickable
                    @click="goToTimpoint(timepoint)">
              <q-item-section avatar>
                <bookmark v-model:value="timepoint.is_favored"
                          color="white"
                          size="30"
                          :bookmark-function="bookmarkTimepoint(timepoint)" />
              </q-item-section>
              <q-item-section>
                {{ timepoint.title }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>
    </video-player>
  </div>
</template>

<script>
import Bookmark from 'components/Bookmark.vue'
import { Content } from 'src/models/Content.js'
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'ContentVideoPlayer',
  components: { VideoPlayer, Bookmark },
  props: {
    content: {
      type: Content,
      default: new Content()
    },
    showTimePoints: {
      type: Boolean,
      default: true
    },
    poster: {
      type: String,
      default () {
        return ''
      }
    },
    keepCalculating: {
      type: Boolean,
      default () {
        return true
      }
    },
    bookmarkLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    currentTimed: {
      type: Number
    }
  },
  emits: ['seeked'],
  data() {
    return {
      currentContent: new Content()
    }
  },
  computed: {
    hasTimepoint () {
      return this.content.timepoints.list.length > 0
    }
  },
  watch: {
    content(newValue) {
      this.currentContent = newValue
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    goToTimpoint (timepoint) {
      if (!this.$refs.videoPlayer) {
        return
      }
      this.$refs.videoPlayer.changeCurrentTime(timepoint.time)
    },
    bookmarkTimepoint (timepoint) {
      return () => {
        if (timepoint.is_favored) {
          return this.$apiGateway.contentTimepoint.unfavored(timepoint.id)
        }
        return this.$apiGateway.contentTimepoint.favored(timepoint.id)
      }
    },
    activate(time) {
      this.player.currentTime(time)
      this.player.play()
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
    },
    setSources() {
      this.options.sources = this.source
    },
    setPoster() {
      this.options.poster = this.poster
    },
    reInitVideo() {
      this.player.src(this.source)
      this.player.poster(this.poster)
    },
    toggleFavorite(id, event) {
      const that = this
      let count = -1
      // let currentTimepointIndex = null
      this.timePoints.forEach(function (item, index) {
        count++
        if (parseInt(item.id) === parseInt(id)) {
          // currentTimepointIndex = index
          item.loading = true
          item.isFavored = !item.isFavored
          that.postIsFavored = {
            id: item.id,
            isFavored: item.isFavored,
            numberOfTimestamp: count
          }
        }
      })
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
      this.$emit('toggleBookmark', this.postIsFavored)
      // setTimeout(function() { that.timePoints[currentTimepointIndex].loading = false }, 200) // vue/no-mutating-props
    },
    // postIsFavored(timeStampData){
    //     var postStatus = 'unfavored'
    //     if (timeStampData.isFavored){
    //         postStatus = 'favored'
    //     }
    //     // /api/v2/timepoint/{timepoint_id}/favored
    //     axios.post('/api/v2/c/timepoint/' + parseInt(timeStampData.id) + '/'+ postStatus)
    //         .then(response => {
    //             if (response.status === 200){
    //                 this.timePoints.forEach( function (item) {
    //                     if (parseInt(item.id) === parseInt(timeStampData.id)) {
    //                         item.loading = false
    //                     }
    //                 })
    //             }
    //         })
    //         .catch(err => console.error(err));
    // },
    calcWatchedPercentage(currentTime, duration) {
      const watchedPercentage = ((currentTime / duration) * 100)
      const videoPlayerTimeData = {
        currentTime,
        duration,
        watchedPercentage
      }
      this.$emit('calcTimeData', videoPlayerTimeData)
    },
    videoStatus(val) {
      this.videoIsPlaying = val
    }
  }
}
</script>

<style scoped lang="scss">
.timepoint-list {
  direction: ltr;
  width: 100%;
  color: white;
  height: 100%;
  background: rgba(0,0,0,0.4);
  .timepoint-list-title {
    text-align: center;
    background: rgba(0,0,0,0.7);
  }
  :deep(.q-list) {
    height: calc(100% - 54px);
    overflow: auto;
    .bookmark-btn.q-btn {
      width: 26px;
      height: 26px;
      padding: 0;
      .q-btn__content {
        margin: 3px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="ChatreNejatContent-page q-pa-md">
    <div v-if="isAdvisor"
         class="row">
      <div class="col-12 flex justify-between q-mb-md">
        <div class="breadcrumbs flex items-center">
          <router-link class="breadcrumbs-item"
                       :to="{ name: 'UserPanel.Asset.TripleTitleSet.Products', params: {eventName: $route.params.eventName} }">
            دوره ها
          </router-link>
          <q-icon name="chevron_left" />
          <div class="content-title">
            مشاوره
          </div>
        </div>
        <div class="back-btn">
          <q-btn flat
                 icon-right="chevron_left"
                 @click="goBack">بازگشت</q-btn>
        </div>
      </div>
    </div>
    <!--   --------------------------------- video box &&  content list item ------------------------- -->
    <div class="row q-col-gutter-x-md">
      <div class="video-box-col col-12 col-xs-12 col-sm-12 col-lg-8">
        <video-box :set="selectedSet"
                   :content="selectedContent"
                   @toggleFavorite="toggleFavor"
                   @toggle-video-status="updateVideoStatus"
                   @video-is-watched="videoIsWatched"
                   @bookmarkTimestamp="bookmarkPostIsFavored" />
        <div class="mobile-view">
          <comment-box :value="watchingContentComment"
                       :loading="commentLoading"
                       :doesnt-have-content="doesntHaveContent"
                       @updateComment="saveComment" />
        </div>
      </div>
      <div class="col-12 col-xs-12 col-sm-12 col-lg-4 content-list-col">
        <content-video-list :key="ContentVideoListKey"
                            :loading="contentVideoListLoading"
                            :video-list-loading="videoListLoading"
                            :content="selectedContent"
                            :set="selectedSet"
                            :hide-prev-btn="hidePrevBtn"
                            :hide-next-btn="hideNextBtn"
                            @nextSetClicked="goToNextSet"
                            @previousSetClicked="goToPrevSet"
                            @contentSelected="setSelectedContent" />
      </div>
    </div>
    <!--   --------------------------------- comment box &&  content list item------------------------- -->
    <div class="row  q-col-gutter-x-md q-mt-lg">
      <div class="col-12 col-lg-8">
        <div class="desktop-view">
          <comment-box :value="watchingContentComment"
                       :loading="commentLoading"
                       :doesnt-have-content="doesntHaveContent"
                       @updateComment="saveComment" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { SetList } from 'src/models/Set.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import { SetSectionList } from 'src/models/SetSection.js'
import { Content, ContentList } from 'src/models/Content.js'
import videoBox from 'src/components/DashboardTripleTitleSet/videoBox.vue'
import commentBox from 'src/components/DashboardTripleTitleSet/CommentBox.vue'
import ContentVideoList from 'src/components/DashboardTripleTitleSet/ContentVideoList.vue'

export default {
  name: 'TripleTitleSetContent',
  components: {
    videoBox,
    commentBox,
    ContentVideoList
  },
  mixins: [mixinTripleTitleSet],
  data: () => ({
    commentLoading: false,
    ContentVideoListKey: 0,
    socialMediaDialog: false,
    selectedLessonId: 0,
    selectedLessonGroupId: null,
    contentLoading: false,
    videoListLoading: false,
    lessonGroups: [],
    lessons: [],
    contents: new ContentList(),
    currentContent: new Content(),
    sets: new SetList(),
    sections: new SetSectionList(),
    currentSetId: null,
    currentSectionId: 'all',
    lessonGroupsLoading: false,
    userLastState: {
      setId: null,
      contentId: null
    }
  }),
  computed: {
    isAdvisor () {
      return this.$route.name === 'UserPanel.Asset.TripleTitleSet.Adviser.Content'
    },
    hidePrevBtn () {
      return this.currentSetIndex === 0
    },
    hideNextBtn () {
      return this.currentSetIndex === (this.setList.length - 1)
    },
    selectedTopic() {
      const topic = this.$store.getters['TripleTitleSet/selectedTopic']
      if (!topic) {
        this.storeSelectedTopic()
      }
      return topic
    },
    doesntHaveContent() {
      return !(this.watchingContent?.id > 0)
    },
    contentVideoListLoading() {
      return !this.selectedContent?.id || this.contentLoading
    },
    selectedContent() {
      return this.$store.getters['TripleTitleSet/selectedContent']
    },
    selectedSet() {
      return this.$store.getters['TripleTitleSet/selectedSet']
    },
    selectedTopicList() {
      return this.$store.getters['TripleTitleSet/setTopicList']
    },
    setList() {
      const setList = this.$store.getters['TripleTitleSet/setList']
      if (setList.length === 0) {
        return [this.selectedSet]
      }
      return setList.filter(set => {
        return set.short_title.includes(this.selectedTopic)
      })
    },
    watchingContentComment() {
      if (!this.watchingContent?.comments) {
        return ''
      }
      return this.watchingContent.comments[0]?.comment || ''
    },
    currentSetIndex() {
      return this.setList.findIndex(set => set.id === this.selectedSet.id)
    },
    watchingContent: {
      get () {
        return this.selectedContent || new Content()
      },
      set(newValue, oldValue) {
        newValue.has_watched = oldValue.has_watched ? true : newValue.has_watched
        this.$store.commit('TripleTitleSet/setSelectedContent', newValue)
      }
    }
  },
  watch: {
    'watchingContent.has_watched': function (val) {
      this.isVideoWatched = val
    }
  },
  mounted() {
    if (this.$route.params.productId) {
      this.getProductSets(this.$route.params.productId)
      this.getProduct()
    } else {
      this.$store.commit('TripleTitleSet/updateSetList', [])
      this.$store.commit('TripleTitleSet/updateTopicList', [])
    }
    this.storeSelectedSet(this.$route.params.setId)
  },
  methods: {
    goBack () {
      this.$router.push(
        { name: 'UserPanel.Asset.TripleTitleSet.Products' }
      )
    },
    storeSelectedTopic () {
      if (!this.selectedSet.id) {
        return
      }
      const topic = this.selectedSet.short_title.split('-')[1].trim()
      const topicList = this.selectedTopicList.map(topic => topic.trim())
      this.updateSelectedTopic(topicList.find(item => item === topic))
    },
    storeSelectedSet (setId) {
      this.contentLoading = true
      this.getSelectedSet(setId)
        .then(set => {
          this.updateSelectedSet(set)
          this.contentLoading = false
          this.ContentVideoListKey++
          this.storeSelectedContent(this.$route.params.contentId)
        }).catch(() => {
          this.contentLoading = false
          this.ContentVideoListKey++
        })
    },
    storeSelectedContent (contentId) {
      this.contentLoading = true
      this.getSelectedContent(contentId)
        .then(content => {
          this.setSelectedContent(content)
          this.contentLoading = false
          this.ContentVideoListKey++
        }).catch(() => {
          this.contentLoading = false
          this.ContentVideoListKey++
        })
    },
    getProductSets(productId) {
      this.$store.dispatch('TripleTitleSet/getSet', productId)
    },
    getProduct() {
      this.$store.dispatch('TripleTitleSet/getSelectedProduct', this.$route.params.productId)
    },
    goToNextSet() {
      const nextSet = this.setList[this.currentSetIndex + 1]
      this.videoListLoading = true
      this.getSelectedSet(nextSet.id)
        .then(res => {
          this.updateSelectedSet(res)
          this.videoListLoading = false
          this.ContentVideoListKey++
        }).catch(() => {
          this.updateSelectedSet(nextSet)
          this.videoListLoading = false
          this.ContentVideoListKey++
        })
    },
    goToPrevSet() {
      const prevSet = this.setList[this.currentSetIndex - 1]
      this.videoListLoading = true
      this.getSelectedSet(prevSet.id)
        .then(res => {
          this.updateSelectedSet(res)
          this.videoListLoading = false
          this.ContentVideoListKey++
        }).catch(() => {
          this.updateSelectedSet(prevSet)
          this.videoListLoading = false
          this.ContentVideoListKey++
        })
    },
    setSelectedContent(content) {
      this.$store.commit('TripleTitleSet/setSelectedContent', content)
      if (!content.id) {
        return
      }
      if (this.$route.params.contentId === content.id.toString()) {
        return
      }
      const contentId = content.id || this.selectedContent.id
      if (content.isPamphlet()) {
        this.$router.push({
          name: 'UserPanel.Asset.TripleTitleSet.ProductPage',
          params: { productId: this.productId }
        })
        return
      }
      this.$router.push({
        name: 'UserPanel.Asset.TripleTitleSet.Content',
        params: {
          productId: this.$route.params.productId,
          setId: this.selectedSet.id,
          contentId
        }
      })
    },
    updateSelectedSet(set) {
      this.$store.commit('TripleTitleSet/setSelectedSet', set)
      if (!set.id) {
        return
      }
      if (this.$route.params.setId === set.id.toString()) {
        return
      }
      this.$router.push({
        name: 'UserPanel.Asset.TripleTitleSet.Content',
        params: {
          productId: this.$route.params.productId,
          setId: set.id,
          contentId: set.contents.list[0].id || this.selectedContent.id
        }
      })
    },
    updateSelectedTopic(topic) {
      this.$store.dispatch('TripleTitleSet/setSelectedTopic', topic)
    },
    getSelectedSet (setId) {
      return new Promise((resolve, reject) => {
        APIGateway.set.show(setId)
          .then(res => {
            this.getSelectedSetContents(setId)
              .then(contentList => {
                if (contentList.list.length > 0) {
                  let selectedContentIndex = contentList.list
                    .findIndex(content => content.id.toString() ===
                      this.$route.params.contentId.toString())
                  if (selectedContentIndex === -1) {
                    selectedContentIndex = 0
                  }

                  this.selectedContent.has_watched = contentList.list[selectedContentIndex].has_watched

                  // this.setSelectedContent(contentList.list[selectedContentIndex])
                }
                const selectedSet = res
                selectedSet.contents = contentList
                this.contentLoading = false
                this.videoListLoading = false
                this.ContentVideoListKey++
                resolve(selectedSet)
              })
              .catch(() => {
                this.contentLoading = false
                this.videoListLoading = false
                this.ContentVideoListKey++
                reject()
              })
          })
          .catch(() => {
            reject()
          })
      })
    },
    getSelectedSetContents (setId) {
      return APIGateway.set.getContents(setId)
    },
    getSelectedContent (contentId) {
      return APIGateway.content.show(contentId)
    }
  }
}
</script>

<style lang="scss" scoped>
.ChatreNejatContent-page {
  margin: 0 60px 100px;
  @media screen and (max-width: 1904px) {
    margin: 0 10px;
  }
  @media screen and (max-width: 1023px) {
    //margin: 0 20px;
  }
  @media screen and (max-width: 400px) {
    margin: 0;
  }

  .back-btn {
    text-align: end;
    cursor: pointer;
    .alaa-logo {
      width: 50px;
    }
    .logo-image {
      text-align: left;
      .q-img__container {
      }
    }
  }

  .breadcrumbs {
    @media screen and (max-width: 1024px) {
      justify-self: self-start;
      padding-left: 10px;
    }
  }

  .chip-parent{
    .page-title{
      color: var(--abrishamMain);
      font-size: 20px;
      font-weight: 500;
      line-height: 1.7;
      letter-spacing: normal;
      margin-bottom:15px ;
      @media screen and (max-width: 1920px){
        margin-top: 19px;
      }
      @media screen and (max-width: 990px){
        margin-top: 26px;
        font-size: 16px;
        width: 100%;
        text-align: center;

      }
      @media screen and (max-width: 576px){
        margin-top: 15px;

      }
    }
  }

  .header {
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 1904px) {
      flex-direction: column !important;
    }

    .header-label {
      font-size: 20px;
      color: #3e5480;
      font-weight: 500;
      padding-right: 20px;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      @media screen and (max-width: 1904px) {
        padding-bottom: 15px !important;
      }
      @media screen and (max-width: 1023px) {
        padding-bottom: 10px !important;
      }
      @media screen and (max-width: 768px) {
        padding-bottom: 20px !important;
      }
      @media screen and (max-width: 600px) {
        padding-bottom: 15px !important;
        font-size: 16px;
      }
    }

  }

  .current-content-title {
    font-size: 20px;
    font-weight: 500;
    color: #3e5480;
    margin-bottom: 21px;
    @media screen and (max-width: 1920px) {
      margin-bottom: 15px;
    }
    @media screen and (max-width: 1023px) {
      display: block;
    }
    @media screen and (max-width: 576px) {
      font-size: 14px;
    }

    &.current-content-title-mobile {
      display: none;
      @media screen and (max-width: 1023px) {
        display: block;
        margin-top: 15px;
        margin-bottom: 5px;
      }
      @media screen and (max-width: 768px) {
        margin-top: 5px;
      }
      @media screen and (max-width: 576px) {
        margin-bottom: 2px;
      }
      @media screen and (max-width: 350px) {
        margin-bottom: 0;
      }
    }
  }

  .content-list-col {
    padding-top: 0 !important;
    overflow: auto;
    overflow-x: hidden;
    .select-wrapper{
      &:deep(.q-field__control){
        background: #eff3ff;
      }
      &:deep(.q-field__native){
        color: #3e5480;
        font-size: 14px;
        font-weight: 500;
      }
      &:deep(.q-icon){
        color: #3e5480;
        font-size: 24px;
      }
      &:deep(.q-field__control::after){
        height: 0;
      }
      &:deep(.q-field__control::before){
        background: transparent;
      }
      .popup-content-class{
      }
      &:deep(.q-field--filled .q-field__control::before){
        border-bottom: none;
      }
    }
  }

  .video-box-col {
    padding-top: 0 !important;

    .mobile-view {
      display: none;
      @media screen and (max-width: 1023px) {
        display: block;
      }
    }
  }

  .current-content-title {
    font-size: 20px;
    font-weight: 500;
    color: #3e5480;
    margin-bottom: 21px;
    @media screen and (max-width: 1920px) {
      margin-bottom: 15px;
    }
    @media screen and (max-width: 768px) {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 576px) {
      font-size: 16px;
      margin-bottom: 10px;
    }
    @media screen and (max-width: 350px) {
      margin-bottom: 5px;
    }
  }

  .desktop-view {
    display: block;
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
}
</style>

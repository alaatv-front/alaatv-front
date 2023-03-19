<template>
  <div class="ChatreNejatContent-page q-pa-md">
    <!--   --------------------------------- video box &&  content list item ------------------------- -->
    <div class="row q-col-gutter-x-md">
      <div class="video-box-col col-12 col-xs-12 col-sm-12 col-lg-8">
        <!--        :afterLoad="contentsIsEmpty"-->
        <video-box :set="selectedSet"
                   :content="selectedContent"
                   @favorite="toggleFavor"
                   @toggle-video-status="updateVideoStatus"
                   @bookmarkTimestamp="bookmarkPostIsFavored" />
        <div class="mobile-view">
          <comment-box v-model:value="watchingContentComment"
                       :doesnt-have-content="watchingContent.comments.length > 0"
                       @updateComment="saveComment" />
        </div>
      </div>
      <div class="col-12 col-xs-12 col-sm-12 col-lg-4 content-list-col">
        <chatr-content-video-list :key="ContentVideoListKey"
                                  :loading="contentVideoListLoading"
                                  :video-list-loading="videoListLoading"
                                  :content="selectedContent"
                                  :set="selectedSet"
                                  :hide-prev-btn="currentSetIndex === 0"
                                  :hide-next-btn="currentSetIndex === (setList.length - 1 )"
                                  @nextSetClicked="goToNextSet"
                                  @previousSetClicked="goToPrevSet"
                                  @contentSelected="setSelectedContent" />
      </div>
    </div>
    <!--   --------------------------------- comment box &&  content list item------------------------- -->
    <div class="row  q-col-gutter-x-md q-mt-lg">
      <div class="col-8">
        <div class="desktop-view">
          <comment-box v-model:value="watchingContentComment"
                       :doesnt-have-content="watchingContent.comments.length > 0"
                       @updateComment="saveComment" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { SetList } from 'src/models/Set.js'
import { mixinChatreNejat } from 'src/mixin/Mixins.js'
import { Content, ContentList } from 'src/models/Content.js'
import videoBox from 'src/components/DashboardChatreNejat/videoBox.vue'
// SetSection
import { SetSectionList } from 'src/models/SetSection.js'
import commentBox from 'src/components/DashboardChatreNejat/CommentBox.vue'
import chatrContentVideoList from 'components/DashboardChatreNejat/ChatrContentVideoList.vue'

export default {
  name: 'ChatreNejatContent',
  components: {
    chatrContentVideoList,
    videoBox,
    commentBox
  },
  mixins: [mixinChatreNejat],
  data: () => ({
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
    selectedTopic() {
      return this.$store.getters['ChatreNejat/selectedTopic']
    },
    contentVideoListLoading() {
      return !this.selectedContent?.id || this.contentLoading
    },
    selectedContent() {
      return this.$store.getters['ChatreNejat/selectedContent']
    },
    selectedSet() {
      return this.$store.getters['ChatreNejat/selectedSet']
    },
    setList() {
      return this.$store.getters['ChatreNejat/setList'].filter(set => {
        return set.short_title.includes(this.selectedTopic)
      })
    },
    watchingContentComment() {
      if (!this.watchingContent?.comments) {
        return
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
      set(value) {
        this.$store.commit('ChatreNejat/setSelectedContent', value)
      }
    }
  },
  watch: {
    selectedTopic () {
      this.$router.push({
        name: 'UserPanel.Asset.ChatreNejat.ProductPage',
        params: {
          productId: this.$route.params.productId
        }
      })
    }
  },
  mounted() {
    if (this.$route.params.productId) {
      this.getProductSets(this.$route.params.productId)
      this.getProduct()
      // this.$apiGateway.product.getContents({
      //   id: this.$route.params.productId
      // }).then()
    }
    if (!this.selectedContent.id || !this.selectedSet.id) {
      this.storeSelectedSet(this.$route.params.setId)
      this.storeSelectedContent(this.$route.params.contentId)
    }
  },
  methods: {
    storeSelectedSet (setId) {
      this.contentLoading = true
      this.getSelectedSet(setId).then(res => {
        this.setSelectedSet(res)
        this.contentLoading = false
        this.ContentVideoListKey++
      }).catch(() => {
        this.contentLoading = false
        this.ContentVideoListKey++
      })
    },
    storeSelectedContent (contentId) {
      this.contentLoading = true
      this.getSelectedContent(contentId).then(res => {
        this.setSelectedContent(res)
        this.contentLoading = false
        this.ContentVideoListKey++
      }).catch(() => {
        this.contentLoading = false
        this.ContentVideoListKey++
      })
    },
    getProductSets(productId) {
      this.$store.dispatch('ChatreNejat/getSet', productId)
    },
    getProduct() {
      this.$store.dispatch('ChatreNejat/getSelectedProduct', this.$route.params.productId)
    },
    goToNextSet() {
      const nextSet = this.setList[this.currentSetIndex + 1]
      this.videoListLoading = true
      this.getSelectedSet(nextSet.id).then(res => {
        this.setSelectedSet(res)
        this.setSelectedContent(res.contents.list[0])
        this.videoListLoading = false
        this.ContentVideoListKey++
      }).catch(() => {
        this.setSelectedSet(nextSet)
        this.videoListLoading = false
        this.ContentVideoListKey++
      })
    },
    goToPrevSet() {
      const prevSet = this.setList[this.currentSetIndex - 1]
      this.videoListLoading = true
      this.getSelectedSet(prevSet.id).then(res => {
        this.setSelectedSet(res)
        this.setSelectedContent(res.contents.list[0])
        this.videoListLoading = false
        this.ContentVideoListKey++
      }).catch(() => {
        this.setSelectedSet(prevSet)
        this.videoListLoading = false
        this.ContentVideoListKey++
      })
    },
    setSelectedContent(content) {
      this.$store.commit('ChatreNejat/setSelectedContent', content)
    },
    setSelectedSet(set) {
      this.$store.commit('ChatreNejat/setSelectedSet', set)
    },
    getSelectedSet (setId) {
      return this.$apiGateway.set.show(setId)
    },
    getSelectedContent (contentId) {
      return this.$apiGateway.content.show(contentId)
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

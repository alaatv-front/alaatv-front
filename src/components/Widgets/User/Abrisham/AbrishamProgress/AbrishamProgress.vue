<template>
  <div class="userAbrishamProgress-page">
    <div class="row q-col-gutter-x-md items-center chip-parent">
      <div class="col-xl-3 col-sm-12 order-xl-first order-xs-last text-center  page-title">نمایش محتوا بر اساس فعالیت شما</div>
      <div class="col-xl-3 col-lg-6 col-sm-12 col-xs-6">
        <chip-group v-model:value="selectedLessonGroupId"
                    :items="lessonGroups"
                    item-text="title"
                    item-value="id"
                    @update:value="onChangeLessonGroup" />
      </div>
      <div class="col-xl-5 col-lg-6 col-sm-12 col-xs-6">
        <chip-group v-model:value="selectedLessonId"
                    :items="lessons"
                    item-text="title"
                    item-value="id"
                    class="col-md-3"
                    chip-title="درس"
                    @update:value="onChangeLesson" />
      </div>
    </div>
    <!--   --------------------------------- video box &&  content list item ------------------------- -->
    <div class="row q-col-gutter-x-md">
      <div v-if="!contents.loading && !lessonGroupsLoading"
           class="video-box-col col-12 col-md-8 col-xs-12">
        <!--        :afterLoad="contentsIsEmpty"-->
        <video-box :lesson="currentLesson"
                   :set="currentSet"
                   :content="watchingContent"
                   @toggleFavorite="toggleFavor"
                   @toggle-video-status="updateVideoStatus"
                   @bookmarkTimestamp="bookmarkPostIsFavored" />
        <div class="mobile-view">
          <div class="current-content-title"
               v-text="watchingContent?.title" />

          <comment-box v-model:value="watchingContentComment"
                       :doesnt-have-content="contentsIsEmpty"
                       @updateComment="saveComment" />
        </div>
      </div>
      <div v-else
           class="video-box-col col-12 col-md-8 col-xs-12">
        <q-skeleton :height="$q.screen.lt.md ? '200px' : '700px'" />
        <div class="mobile-view">

          <q-skeleton width="50px"
                      class="q-my-sm" />
          <q-skeleton width="150px"
                      class="q-my-sm" />

          <q-skeleton height="200px" />
        </div>
      </div>
      <div v-if="!contents.loading && !lessonGroupsLoading"
           class="col-md-4 col-12 content-list-col">
        <content-list-component v-model:value="watchingContent"
                                :loading="contents.loading"
                                :afterLoad="contentsIsEmpty"
                                :contents="filteredContents"
                                :header="{ title: 'لیست فیلم ها', button: { title: 'من کجام؟' } }"
                                type="video"
                                @itemClicked="setWatchingContent"
                                @whereAmI="loadUserLastState">
          <template v-slot:filter>
            <div class="row q-col-gutter-md">
              <div class="col-sm-6 col-xs-8 select-wrapper">
                <q-select :key="sets.list.length"
                          :loading="contents.loading"
                          :options="sets.list"
                          option-label="short_title"
                          option-value="id"
                          class="no-title"
                          emit-value
                          map-options
                          popup-content-class="popup-content-class"
                          placeholder="انتخاب فرسنگ ها"
                          :model-value="currentSetId"
                          @update:model-value="setCurrentSet" />
              </div>
              <div class="col-sm-6 col-xs-4 select-wrapper">
                <q-select v-model="currentSectionId"
                          :loading="contents.loading"
                          value="all"
                          :options="sections.list"
                          option-label="title"
                          option-value="id"
                          class="no-title"
                          emit-value
                          map-options
                          placeholder="همه"
                          @update:model-value="setCurrentSection" />
              </div>
            </div>
          </template>
        </content-list-component>
      </div>
      <div v-else
           class="col-md-4 col-12 content-list-col">
        <q-skeleton :height="$q.screen.lt.md ? '200px' : '700px'" />
      </div>
    </div>
    <!--   --------------------------------- comment box &&  content list item------------------------- -->
    <div class="row  q-col-gutter-x-md q-mt-lg">
      <div class="col-8">
        <div v-if="!contents.loading && !lessonGroupsLoading"
             class="desktop-view">
          <div class="current-content-title"
               v-text="watchingContent?.title" />
          <comment-box v-model:value="watchingContentComment"
                       :doesnt-have-content="contentsIsEmpty"
                       @updateComment="saveComment" />
        </div>
        <div v-else
             class="desktop-view">
          <q-skeleton width="50px"
                      class="q-my-sm" />
          <q-skeleton width="150px"
                      class="q-my-sm" />

          <q-skeleton height="200px" />
        </div>
      </div>
      <div class="col-12 col-md-4">
        <content-list-component v-if="!contents.loading && !lessonGroupsLoading"
                                :header="{ title: 'جزوه ها' }"
                                :loading="contents.loading"
                                :afterLoad="contentsIsEmpty"
                                :contents="filteredContents"
                                type="pamphlet"
                                @itemClicked="setWatchingContent"
                                @whereAmI="loadUserLastState" />
        <template v-else>
          <q-skeleton width="50px"
                      class="q-my-sm" />
          <q-skeleton width="150px"
                      class="q-my-sm" />

          <q-skeleton height="200px" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { SetList } from 'src/models/Set.js'
import { mixinAbrisham } from 'src/mixin/Mixins.js'
import { Content, ContentList } from 'src/models/Content.js'
import videoBox from 'src/components/DashboardAbrisham/videoBox.vue'
import { SetSection, SetSectionList } from 'src/models/SetSection.js'
import ChipGroup from 'src/components/DashboardAbrisham/chipGroup.vue'
import commentBox from 'src/components/DashboardAbrisham/CommentBox.vue'
import ContentListComponent from 'src/components/DashboardAbrisham/ContentListComponent.vue'

export default {
  name: 'AbrishamProgress',
  components: {
    ChipGroup,
    videoBox,
    commentBox,
    ContentListComponent
  },
  mixins: [mixinAbrisham],
  data: () => ({
    socialMediaDialog: false,
    selectedLessonId: 0,
    selectedLessonGroupId: null,
    lessonGroups: [],
    lessons: [],
    contents: new ContentList(),
    filteredContents: new ContentList(),
    watchingContent: new Content(),
    sets: new SetList(),
    sections: new SetSectionList(),
    currentSetId: null,
    currentSectionId: 'all',
    lessonGroupsLoading: false,
    userLastState: {
      setId: null,
      contentId: null
    },
    progressLoading: false
  }),
  computed: {
    contentsIsEmpty () {
      return this.contents.list.length === 0
    },
    watchingContentComment() {
      return this.watchingContent.comments[0]?.comment || ''
    },
    currentSet () {
      return this.getSet(this.currentSetId)
    },
    currentLesson () {
      return this.getLesson(this.selectedLessonId)
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    loadUserLastState() {
      this.setCurrentSet(this.userLastState.setId, this.userLastState.contentId)
    },
    async showUserLastState() {
      try {
        const userLastState = await this.$apiGateway.product.getUserLastState(this.selectedLessonId)
        const setId = userLastState.set.id
        const contentId = userLastState.id
        this.userLastState.setId = setId
        this.userLastState.contentId = contentId
        this.setCurrentSet(setId, contentId)
      } catch {
      }
    },

    async initPage () {
      this.progressLoading = true
      const lessonGroups = await this.getLessonGroups()
      this.progressLoading = false
      this.showLessonGroups(lessonGroups)
    },

    showLessonGroups (lessonGroups) {
      this.lessonGroups = lessonGroups
      this.setLessonGroupsId()
      const selectedLessonGroupId = this.getSelectedLessonGroupIdFromSelectedLesson()
      if (!selectedLessonGroupId) {
        return
      }
      this.setSelectedLessonGroupId(selectedLessonGroupId)
      this.lessonGroupsLoading = false
    },

    setSelectedLessonGroupId (selectedLessonGroupId) {
      this.selectedLessonGroupId = selectedLessonGroupId
    },

    showFirstLesson () {
      if (this.lessons.length === 0) {
        return
      }
      const firstLessonId = this.lessons[0].id
      this.setSelectedLessonId(firstLessonId)
    },

    onChangeLessonGroup () {
      this.showLessons(this.selectedLessonGroupId)
    },

    onChangeLesson () {
      this.showSets(this.selectedLessonId)
    },

    getLesson (id) {
      return this.lessons.find((lesson) => lesson.id === id)
    },

    showLessons (lessonGroupId) {
      const selectedLessonGroup = this.getLessonGroup(lessonGroupId)
      this.lessons = selectedLessonGroup.lessons
      this.showFirstLesson()
    },

    setLessonGroupsId () {
      this.lessonGroups.forEach((item, index) => {
        item.id = index + 1
      })
    },

    setSelectedLessonId (lessonId) {
      this.selectedLessonId = lessonId
    },

    getLessonGroup (lessonGroupId) {
      return this.lessonGroups.find(item => parseInt(item.id) === parseInt(lessonGroupId))
    },

    getSelectedLessonGroupIdFromSelectedLesson () {
      const selectedLessonGroup = this.lessonGroups.find(lessonGroup => !!lessonGroup.lessons.find(lesson => lesson.selected))
      if (!selectedLessonGroup) {
        if (this.lessonGroups.length === 0 || this.lessonGroups[0].lessons.length === 0) {
          return null
        }

        return this.lessonGroups[0].lessons[0].id
      }
      return selectedLessonGroup.id
    },

    async getLessonGroups() {
      this.lessonGroupsLoading = true
      this.progressLoading = true
      try {
        const isPro = this.$route.name.includes('UserPanel.Asset.AbrishamPro.')
        const lessonList = await this.$apiGateway.abrisham.getLessons(isPro)
        return lessonList.map((item) => {
          return {
            title: item.title,
            lessons: item.lessons.list
          }
        })
      } catch {
        this.lessonGroupsLoading = false
        this.progressLoading = false
        return []
      }
    },

    async showSets (lessonId) {
      this.lessonGroupsLoading = true
      const sets = await this.getSets(lessonId)
      this.setSets(sets)
      await this.showUserLastState()
      this.lessonGroupsLoading = false
      // const firstSet = this.getFirstSet()
      // this.setCurrentSet(firstSet.id)
    },

    async getSets (lessonId) {
      // lesson is a product
      return await this.$apiGateway.product.getSets(lessonId)
    },

    setSets (sets) {
      this.sets = sets
    },

    setCurrentSection (sectionId) {
      this.filterContentsBasedOnSection(sectionId)
    },

    filterContentsBasedOnSection (sectionId) {
      if (sectionId === 'all') {
        this.filteredContents.list = this.contents.list
        return
      }
      this.filteredContents.list = this.contents.list.filter(content => content.section.id === sectionId)
    },

    setCurrentSet (setId, contentId) {
      this.currentSetId = setId
      this.showFirstSections(contentId)
    },

    showFirstSections (contentId) {
      this.addAllSectionToSections()
      this.setSections()
      const firstSection = this.getFirstSection()
      this.setSectionActive(firstSection.id, contentId)
    },

    async setSectionActive (sectionId, contentId) {
      this.currentSectionId = sectionId
      await this.showFirstContent(contentId)
      this.filterContentsBasedOnSection(sectionId)
    },

    getSet (setId) {
      return this.sets.list.find(setItem => setItem.id === setId)
    },

    setSections () {
      if (!this.currentSet) {
        return
      }
      this.sections = this.currentSet.sections
    },

    addAllSectionToSections () {
      this.sets.list.forEach(set => {
        if (!set.sections.list.find(item => item.id === 'all')) {
          set.sections.list.unshift(new SetSection({ id: 'all', title: 'همه' }))
        }
      })
    },

    getFirstSet () {
      if (this.sets.list.length === 0) {
        return null
      }
      return this.sets.list[0]
    },

    getFirstContent () {
      if (this.contents.list.length === 0) {
        return null
      }
      return this.contents.list[0]
    },

    getFirstSection () {
      if (this.sections.list.length === 0) {
        return null
      }
      return this.sections.list[0]
    },

    async showFirstContent (contentId) {
      const contents = await this.getContentsOfSet(this.currentSetId)
      this.contents.loading = false
      this.setContents(contents)
      if (!contentId) {
        contentId = contents.list[0].id
      }
      const content = this.getContent(contentId)
      this.setWatchingContent(content)
    },

    getContent(contentId) {
      if (contentId) {
        return this.contents.list.find(content => content.id === contentId)
      }
      return this.getFirstContent()
    },

    setWatchingContent (content) {
      this.watchingContent = content || new Content()
    },

    async getContentsOfSet (setId) {
      this.contents.loading = true
      try {
        return await this.$apiGateway.set.getContents(setId)
      } catch {
        this.contents.loading = false
      }
    },

    setContents (contents) {
      this.contents = contents
    }

  }
}
</script>

<style lang="scss" scoped>
.userAbrishamProgress-page {
  margin: 0 60px 100px;
  @media screen and (max-width: 1904px) {
    margin: 0 10px 40px;
  }
  @media screen and (max-width: 1023px) {
    margin: 0 0 30px;
  }

  .chip-parent{
    .page-title{
      color: #3e5480;
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

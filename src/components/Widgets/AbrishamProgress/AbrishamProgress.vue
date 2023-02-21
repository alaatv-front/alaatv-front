<template>
  <div class="userAbrishamProgress-page">
    <div class="row q-col-gutter-x-md items-center chip-parent">
      <div class="col-xl-3 col-sm-12 order-xl-first order-xs-last text-center  page-title">نمایش محتوا بر اساس فعالیت شما</div>
      <div class="col-xl-3 col-lg-6 col-sm-12 col-xs-6">
        <chip-group v-model:value="selectedLessonGroupId"
                    :items="lessonGroups"
                    item-text="title"
                    item-value="id"
                    :loading="lessonGroupsLoading"
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
      <div class="video-box-col col-12 col-md-8 col-xs-12">
        <!--        :afterLoad="contentsIsEmpty"-->
        <video-box :lesson="currentLesson"
                   :set="currentSet"
                   :content="watchingContent"
                   @favorite="toggleFavor"
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
      <div class="col-md-4 col-12 content-list-col">
        <content-list-component v-model:value="watchingContent"
                                :loading="contents.loading"
                                :afterLoad="contentsIsEmpty"
                                :contents="contents"
                                :header="{ title: 'لیست فیلم ها', button: { title: 'من کجام؟' } }"
                                type="video"
                                @input="setWatchingContent"
                                @whereAmI="loadUserLastState">
          <template v-slot:filter>
            <div class="row q-col-gutter-md">
              <div class="col-sm-6 col-xs-8 select-wrapper">
                <q-select :key="sets.list.length"
                          :loading="contents.loading"
                          filled
                          :options="sets.list"
                          class="v-select"
                          option-label="short_title"
                          option-value="id"
                          :menu-props="{ bottom: true, offsetY: true }"
                          dropdown-icon="mdi-chevron-down"
                          dense
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
                          color="#3e5480"
                          :menu-props="{ bottom: true, offsetY: true }"
                          :options="sections.list"
                          option-label="title"
                          option-value="id"
                          filled
                          dropdown-icon="mdi-chevron-down"
                          dense
                          emit-value
                          map-options
                          placeholder="همه" />
              </div>
            </div>
          </template>
        </content-list-component>
      </div>
    </div>
    <!--   --------------------------------- comment box &&  content list item------------------------- -->
    <div class="row  q-col-gutter-x-md q-mt-lg">
      <div class="col-8">
        <div class="desktop-view">
          <div class="current-content-title"
               v-text="watchingContent?.title" />
          <comment-box v-model:value="watchingContentComment"
                       :doesnt-have-content="contentsIsEmpty"
                       @updateComment="saveComment" />
        </div>
      </div>
      <div class="col-12 col-md-4">
        <content-list-component :header="{ title: 'جزوه ها' }"
                                :loading="contents.loading"
                                :afterLoad="contentsIsEmpty"
                                :contents="contents"
                                type="pamphlet"
                                @input="setWatchingContent" />
      </div>
    </div>
  </div>

</template>

<script>
import { SetList } from 'src/models/Set.js'
import { mixinAbrisham } from 'src/mixin/Mixins.js'
import { Content, ContentList } from 'src/models/Content.js'
import ChipGroup from 'components/DashboardAbrisham/chipGroup.vue'
import videoBox from 'src/components/DashboardAbrisham/videoBox.vue'
import { SetSectionList, SetSection } from 'src/models/SetSection.js'
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
    watchingContent: new Content(),
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
        const response = await this.$apiGateway.abrisham.getUserLastState(this.selectedLessonId)
        const setId = response.data.data.set.id
        const contentId = response.data.data.id
        this.userLastState.setId = setId
        this.userLastState.contentId = contentId
        this.setCurrentSet(setId, contentId)
      } catch {

      }
    },

    // getUserLastState() {
    //   return this.$axios.get('/api/v2/product/' + this.selectedLessonId + '/toWatch')
    // },

    async initPage () {
      const lessonGroups = await this.getLessonGroups()
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
      this.lnssonGroupsLoading = true
      try {
        const response = await this.$apiGateway.abrisham.getLessons()
        if (response.status === 200) {
          return response.data.data
        }
        return []
      } catch {
        this.lnssonGroupsLoading = true
        return []
      }
    },

    async showSets (lessonId) {
      this.lnssonGroupsLoading = true
      const sets = await this.getSets(lessonId)
      this.setSets(sets)
      await this.showUserLastState()
      this.lnssonGroupsLoading = false
      // const firstSet = this.getFirstSet()
      // this.setCurrentSet(firstSet.id)
    },

    async getSets (lessonId) {
      // lesson is a product
      const response = await this.$apiGateway.abrisham.requestToGetSets(lessonId)

      if (response.status === 200) {
        return new SetList(response.data.data)
      }

      return new SetList()
    },

    setSets (sets) {
      this.sets = sets
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

    setSectionActive (id, contentId) {
      this.currentSectionId = id
      this.showFirstContent(contentId)
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
      this.sets.list.forEach(set => set.sections.list.unshift(new SetSection({ id: 'all', title: 'همه' })))
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

    // requestToGetSets (params) {
    //   return this.$axios.get('/api/v2/product/' + params.lessonId + '/sets')
    // },

    async showFirstContent (contentId) {
      const contents = await this.getContents()
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

    async getContents () {
      this.contents.loading = true
      try {
        const response = await this.$apiGateway.abrisham.requestToGetContents(this.currentSetId)
        this.contents.loading = false
        return response
      } catch {
        this.contents.loading = false
      }
    },

    setContents (contents) {
      this.contents = contents
    }

    // requestToGetContents () {
    //   return this.$axios.get('/api/v2/set/' + this.currentSetId + '/contents')
    // }

    // getLessons () {
    //   return this.$axios.get('/api/v2/abrisham/lessons')
    // }

  }
}
</script>

<style lang="scss" scoped>
.userAbrishamProgress-page {
  margin: 0 60px 100px;
  @media screen and (max-width: 1904px) {
    margin: 0 10px;
  }
  @media screen and (max-width: 1023px) {
    margin: 0;
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

<template>
  <div
    class="userAbrishamProgress-page"
  >
    <div class="row">
      <div class="col-lg-9 col-md-7 col-12 justify-center chip-parent ">
        <div class="row">
          <div class="col-md-6 col-sm-12 chips-1 chip-top">
            <chip-group
              v-model="selectedLessonGroupId"
              :items="lessonGroups"
              item-text="title"
              item-value="id"
              :loading="lessonGroupsLoading"
              @input="onChangeLessonGroup"
            />
          </div>
          <div class="col"></div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6- col-md-6 col-12 text-md-right text-center d-flex flex-column justify-center header-label ">

      </div>
    </div>
  </div>
</template>

<script>

import { Content, ContentList } from 'src/models/Content'
import { SetList } from 'src/models/Set'
import { SetSectionList } from 'src/models/SetSection'
import ChipGroup from 'components/DashboardAbrisham/chipGroup'
import { mixinAbrisham } from 'src/mixin/Mixins'

export default {
  name: 'AbrishamProgress',
  components: {
    ChipGroup
  },
  mixins: [mixinAbrisham],
  data: () => ({
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
    lessonGroupsLoading: false
  }),
  computed: {
    contentsIsEmpty () {
      return !this.contents.list.length
    },
    currentSet () {
      return this.getSet(this.currentSetId)
    },
    currentLesson () {
      return this.getLesson(this.selectedLessonId)
    }
  },

  created () {
    this.initPage()
  },

  methods: {
    async showUserLastState() {
      try {
        const response = await this.$apiGateway.abrisham.getUserLastState(this.selectedLessonId)
        const setId = response.data.data.set.id
        const contentId = response.data.data.id
        this.setCurrentSet(setId, contentId)
      } catch (e) {

      }
    },
    //
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
      return this.lessons.find(lesson => lesson.id === id)
    },

    showLessons (lessonGroupId) {
      const selectedLessonGroup = this.getLessonGroup(lessonGroupId)
      this.lessons = selectedLessonGroup.lessons
      this.showFirstLesson()
    },

    setLessonGroupsId () {
      this.lessonGroups.forEach((item, index) => item.id = index)
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
      const sets = await this.getSets(lessonId)
      this.setSets(sets)
      await this.showUserLastState()
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
      this.watchingContent = content
    },

    async getContents () {
      this.contents.loading = true
      const response = await this.$apiGateway.abrisham.requestToGetContents()
      this.contents.loading = false
      return response
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
  margin: 0 60px;
  @media screen and (max-width: 1904px) {
    margin: 0 10px;
  }
  @media screen and (max-width: 960px) {
    margin: 0;
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
      @media screen and (max-width: 960px) {
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

    .chip-parent {
      display: flex;
      @media screen and (max-width: 1264px) {
        flex-direction: column;
      }

      .chips-1 {
        @media screen and (max-width: 600px) {
          padding-bottom: 0 !important;
          padding-top: 0 !important;
        }

        &.chip-top {
          @media screen and (max-width: 1204px) {
            padding-bottom: 0 !important;
          }
        }

        &.chip-down {
          @media screen and (max-width: 1204px) {
            padding-top: 0 !important;
          }
        }
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
    @media screen and (max-width: 960px) {
      display: block;
    }
    @media screen and (max-width: 576px) {
      font-size: 14px;
    }

    &.current-content-title-mobile {
      display: none;
      @media screen and (max-width: 960px) {
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
      @media screen and (max-width: 959px) {
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
    @media screen and (max-width: 959px) {
      display: none;
    }
  }
}

.v-select-box {
  .theme--light {
    &.v-label {
      color: #3e5480;
      font-size: 14px;
      font-weight: 500;
    }

    &.v-icon {
      color: #3e5480;
    }
  }
}

.theme--light {
  &.v-chip {
    &:not(.v-chip--active) {
      padding-right: 7.5px;
      padding-left: 7.5px;
    }

    .v-size--default {
      border-radius: 16px;
      font-size: 16px;
      height: 32px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.13;
      letter-spacing: normal;
      color: #9fa5c0;
    }
  }
}

@media screen and (max-width: 768px) {
  .v-text-field {
    &.v-text-field--enclosed {
      .v-text-field__details {
        display: none;
      }
    }
  }
  .v-application {
    .text-center {
      padding-bottom: 0px;
      margin-top: 9px;
    }
  }
}

</style>
<style lang="scss">
.v-menu__content {
  .v-list {
    width: 100%;
    border-radius: 0 !important;

    .v-list-item {
      .v-list-item__content {
        padding: 0;

        .v-list-item__title {
          font-size: 14px;
        }
      }
    }
  }
}

.v-select-box {
  .v-input {
    border-radius: 10px;

    .v-input__slot {
      border: 4px solid #eff3ff;
    }

    &.v-select--is-menu-active {
      .v-input__control {
        .v-input__slot {
          background-color: transparent !important;
          box-sizing: border-box;
        }
      }
    }

  }

}
</style>

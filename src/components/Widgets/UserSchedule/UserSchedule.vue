<template>
  <div class="schedule-page">
    <!--   --------------------------------- chip group ------------------------- -->
    <div class="row items-center">
      <div ref="schedule" />
      <div class="col-lg-4 col-md-5 col-12 text-md-right text-center d-flex flex-column justify-center header-label">
        نمایش محتوا بر اساس برنامه مطالعاتی
      </div>
      <div class="d-flex col-lg-4 col-md-7 col-12 justify-center">
        <chip-group v-model:value="currentMajorId"
                    :items="majors.list"
                    :loading="majors.loading"
                    chip-title="رشته: " />
      </div>
    </div>
    <!--   --------------------------------- video box &&  content list item ------------------------- -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-8">
        <!--        @has_watched="watched"-->
        <video-box :content="watchingContent"
                   @favorite="toggleFavor"
                   @bookmarkTimestamp="bookmarkPostIsFavored" />
        <div class="mobile-view">
          <div class="current-content-title"
               v-text="watchingContent.title" />
          <comment-box v-model="watchingContent.comment"
                       :doesnt-have-content="contentsIsEmpty"
                       @input="saveComment" />
        </div>
      </div>
      <div class="col-12 col-md-4">
        <!--        <date-picker-->
        <!--          v-model="dateValue"-->
        <!--          element="null"-->
        <!--          input-format="YYYY-MM-DD"-->
        <!--          format="YYYY/MM/DD"-->
        <!--          :show="datePickerVisibility"-->
        <!--          @close="closeDatePicker"-->
        <!--          @change="changeDate"-->
        <!--        />-->
        <content-list-component v-model="watchingContent"
                                :loading="contents.loading"
                                :afterLoad="contentsIsEmpty"
                                :contents="contentsOfMajor"
                                :header="{ title: currentDate, button: { title: 'روزهای دیگر' }}"
                                type="video"
                                @input="changeContent($event.id)"
                                @headerAction="openDatePicker" />
      </div>
    </div>
    <!--   --------------------------------- comment box &&  content list item ------------------------- -->
    <div class="row q-col-gutter-md">
      <div class="col-md-8 col-12">
        <div class="desktop-view">
          <div class="current-content-title"
               v-text="watchingContent.title" />
          <comment-box v-model="watchingContent.comment"
                       :doesnt-have-content="contentsIsEmpty"
                       @input="saveComment" />
        </div>
      </div>
      <div class="col-md-4 col-12">
        <content-list-component :header="{ title: 'جزوه ها' }"
                                :loading="contents.loading"
                                :afterLoad="contentsIsEmpty"
                                :contents="contentsOfMajor"
                                type="pamphlet"
                                @input="changeContent($event.id)" />
      </div>
    </div>
    <!--   --------------------------------- study plan ------------------------- -->
    <study-plan-group v-model:value="currentMajorId"
                      :majors="majors"
                      class="q-mt-lg"
                      :current-date="dateValue"
                      @contentClicked="contentClicked"
                      @scrollIsMoved="scrollIsMoved" />
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import { MajorList } from 'src/models/Major.js'
import { mixinAbrisham } from 'src/mixin/Mixins.js'
import { Content, ContentList } from 'src/models/Content.js'
import chipGroup from 'components/DashboardAbrisham/chipGroup.vue'
import videoBox from 'src/components/DashboardAbrisham/videoBox.vue'
import CommentBox from 'src/components/DashboardAbrisham/CommentBox.vue'
import ContentListComponent from 'components/DashboardAbrisham/ContentListComponent.vue'
import StudyPlanGroup from 'src/components/DashboardAbrisham/studyPlanGroup/StudyPlanGroup.vue'
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

export default {
  name: 'UserSchedule',

  components: {
    StudyPlanGroup,
    ContentListComponent,
    CommentBox,
    chipGroup,
    videoBox
    // datePicker: VuePersianDatetimePicker
  },

  mixins: [mixinAbrisham],

  data () {
    return {
      majors: new MajorList(),
      currentMajorId: null,
      datePickerVisibility: false,
      dateValue: '',
      contents: new ContentList(),
      watchingContent: new Content()
    }
  },

  computed: {
    datePickerInShamsi () {
      const shamsi = moment(this.dateValue).format('jYYYY/jMM/jDD')
      return shamsi
    },

    contentsOfMajor () {
      if (!this.contents.list) return
      return new ContentList(this.contents.list.filter(content => {
        const selectedMajor = this.majors.list.find(major => major.id === this.currentMajorId)
        return selectedMajor ? content.major.id === selectedMajor.id : content.major.id === this.currentMajorId
      }))
    },

    currentDate () {
      let string = 'فیلم های '
      if (!this.dateValue) {
        string = string.concat('امروز')
      } else {
        string = string.concat(this.datePickerInShamsi)
      }
      return string
    },

    contentsIsEmpty () {
      return !this.contents.list.length && !this.contentsOfMajor.list.length
    }
  },

  watch: {
    currentMajorId () {
      this.changeMajor()
    }
  },

  created () {
    this.loadInitialData()
  },

  methods: {

    loadInitialData () {
      this.loadMajors()
      this.loadContents()
    },

    // getDataFromCache (cacheKey) {
    //   return Assist.getAjaxCache(cacheKey)
    // },

    async loadMajors () {
      this.majors.loading = true
      const majors = await this.$apiGateway.abrisham.requestToGetMajors()
      this.setMajors(majors)
      this.loadCurrentMajor(majors)
      this.setMajorsColor()
    },

    setMajors (majors) {
      this.majors = new MajorList(majors)
    },

    loadCurrentMajor (majors) {
      let selectedMajorId = null

      majors.forEach(major => {
        if (major.id === this.currentMajorId) {
          selectedMajorId = major.id
        }
      })

      if (!selectedMajorId) {
        this.setCurrentMajor(majors[0].id)
        return
      }

      this.setCurrentMajor(selectedMajorId)

      this.majors.loading = false
    },

    setMajorsColor () {
      this.majors.list.forEach(major => {
        major.color = '#ff8f00'
      })
    },

    setCurrentMajor (id) {
      this.currentMajorId = id
    },

    // requestToGetMajors () {
    //   return this.$axios.get('/api/v2/abrisham/majors')
    // },

    changeMajor () {
      this.changeContentsList()
    },

    changeContentsList () {
      this.loadWatchingContent()
    },

    async loadContents (params) {
      this.contents.loading = true
      const data = {
        date: '',
        content: null
      }
      Object.assign(data, params)
      const response = await this.requestToGetContents()
      const contents = response.data.data
      this.SetContents(contents)
      await this.loadContentsColor()
      this.loadWatchingContent(data.content)
    },

    requestToGetContents (date) {
      // return this.$axios.get('/api/v2/abrisham/whereIsKarvan', { params: { date } })
      return this.$apiGateway.abrisham.whereIsKarvan({ params: { date } }) // 500 mide

      // return {
      //   data: {
      //     data: [
      //       {
      //         id: 28960,
      //         redirect_url: null,
      //         type: 8,
      //         section: {
      //           id: 1,
      //           name: 'تابلو راهنما'
      //         },
      //         title: 'جلسه صفر، معرفی دوره',
      //         file: null,
      //         duration: 181,
      //         photo: 'https://nodes.alaatv.com/media/thumbnails/1128/1128000chiz.jpg',
      //         is_free: 0,
      //         order: 0,
      //         major: {
      //           id: 1,
      //           name: 'ریاضی',
      //           title: 'ریاضی',
      //           selected: false
      //         },
      //         updated_at: '2021-11-20 14:44:23',
      //         url: {
      //           web: 'https://alaatv.com/c/28960',
      //           api: 'https://alaatv.com/api/v2/c/28960'
      //         },
      //         redirect_code: null,
      //         comments: [],
      //         short_title: 'جلسه 0 پیله راه ابریشم زبان ',
      //         has_watched: false,
      //         content_type: {
      //           id: 8,
      //           display_name: 'فیلم',
      //           name: 'video',
      //           enable: null,
      //           description: 'فیلم',
      //           created_at: '2018-03-04 17:39:17',
      //           updated_at: '2018-03-04 17:39:17'
      //         },
      //         is_favored: false,
      //         author: {
      //           id: 1210950,
      //           first_name: 'مهدی',
      //           last_name: 'چیذری',
      //           photo: 'https://nodes.alaatv.com/upload/images/profile/1641631685_7539.jpg'
      //         },
      //         can_see: 0,
      //         timepoints: null
      //       },
      //       {
      //         id: 28961,
      //         redirect_url: null,
      //         type: 8,
      //         section: {
      //           id: 6,
      //           name: 'درسنامه'
      //         },
      //         title: 'درسنامه پیله (قسمت اول)، زمان حال ساده و زمان حال استمراری',
      //         file: null,
      //         duration: 2005,
      //         photo: 'https://nodes.alaatv.com/media/thumbnails/1128/1128001toto.jpg',
      //         is_free: 0,
      //         order: 1,
      //         major: {
      //           id: 2,
      //           name: 'تجربی',
      //           title: 'تجربی',
      //           selected: false
      //         },
      //         updated_at: '2021-11-20 14:44:23',
      //         url: {
      //           web: 'https://alaatv.com/c/28961',
      //           api: 'https://alaatv.com/api/v2/c/28961'
      //         },
      //         redirect_code: null,
      //         comments: [],
      //         short_title: 'جلسه 1 پیله راه ابریشم زبان ',
      //         has_watched: false,
      //         content_type: {
      //           id: 8,
      //           display_name: 'فیلم',
      //           name: 'video',
      //           enable: null,
      //           description: 'فیلم',
      //           created_at: '2018-03-04 17:39:17',
      //           updated_at: '2018-03-04 17:39:17'
      //         },
      //         is_favored: false,
      //         author: {
      //           id: 1210950,
      //           first_name: 'مهدی',
      //           last_name: 'چیذری',
      //           photo: 'https://nodes.alaatv.com/upload/images/profile/1641631685_7539.jpg'
      //         },
      //         can_see: 0,
      //         timepoints: null
      //       }
      //     ]
      //   }
      // }
    },

    SetContents (contents) {
      this.contents = new ContentList(contents)
    },

    async loadContentsColor () {
      const lessonGroups = await this.$apiGateway.abrisham.getLessons().map((item) => {
        return {
          title: item.title,
          lessons: item.lessons.list
        }
      })
      this.setContentsColor(this.contents, lessonGroups)
    },

    setContentsColor (contents, lessonGroups) {
      contents.list.forEach(content => {
        lessonGroups.forEach(lessonGroup => {
          if (lessonGroup.lessons) {
            // const lesson = lessonGroup.lessons.find(lesson => lesson.title === content.inputData?.lesson_name)

            // if (lessonGroup.lessons && lesson) {
            //   content.color = lesson.color
            //   return
            // }

            content.color = 'red'
          }
        })
      })
    },

    loadWatchingContent (content) {
      if (!content) {
        content = this.getCurrentContent()
      }

      this.setWatchingContent(content)
      this.contents.loading = false
    },

    setWatchingContent (content) {
      this.watchingContent = new Content(content)
    },

    getCurrentContent () {
      const currentContent = this.contentsOfMajor.list.find(content => content.is_current)
      if (!currentContent) {
        return this.contentsOfMajor.list[0]
      }

      return currentContent
    },

    getWatchingContent () {
      return this.watchingContent
    },

    // requestToGetLessonsOfEachMajor () {
    //   return this.$axios.get('/api/v2/abrisham/lessons')
    // },

    changeContent (id, content) {
      const currentContent = this.findContent(id)
      this.loadWatchingContent(currentContent)
    },

    findContent (id) {
      return this.contents.list.find(content => parseInt(content.id) === parseInt(id))
    },

    async changeDate () {
      await this.loadContents({ date: this.dateValue })
    },

    scrollIsMoved (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.schedule.scrollIntoView({ alignToTop: true, block: 'end', inline: 'start' })
        })
      }
    },

    async contentClicked (data) {
      // const content = this.findContent(data.content.id)
      const customData = {
        date: data.date,
        content: data.content
      }
      this.dateValue = data.date
      this.$vuetify.goTo('.schedule-page')
      await this.loadContents(customData)
    },

    closeDatePicker () {
      this.datePickerVisibility = false
    },

    openDatePicker () {
      this.datePickerVisibility = true
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-page {
  margin: 0 60px;

  @media screen and (width <= 1904px) {
    margin: 0 10px;
  }

  @media screen and (width <= 960px) {
    margin: 0;
  }

  .header-label {
    font-size: 20px;
    color: #3e5480;
    font-weight: 500;
    padding-right: 20px;
    padding-top: 0 !important;
    padding-bottom: 0 !important;

    @media screen and (width <= 1904px) {
      padding-bottom: 15px !important;
    }

    @media screen and (width <= 960px) {
      padding-bottom: 10px !important;
    }

    @media screen and (width <= 768px) {
      padding-bottom: 20px !important;
    }

    @media screen and (width <= 600px) {
      padding-bottom: 15px !important;
      font-size: 16px;
    }
  }

  .current-content-title {
    font-size: 20px;
    font-weight: 500;
    color: #3e5480;
    margin-bottom: 21px;

    @media screen and (width <= 1920px) {
      margin-bottom: 15px;
    }

    @media screen and (width <= 768px) {
      margin-bottom: 20px;
    }

    @media screen and (width <= 576px) {
      font-size: 16px;
      margin-bottom: 10px;
    }

    @media screen and (width <= 350px) {
      margin-bottom: 5px;
    }
  }

  .desktop-view {
    display: block;

    @media screen and (width <= 959px) {
      display: none;
    }
  }

  .mobile-view {
    display: none;

    @media screen and (width <= 959px) {
      display: block;
    }
  }
}
</style>

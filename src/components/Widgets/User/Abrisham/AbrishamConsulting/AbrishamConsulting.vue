<template>
  <div class="consulting-page">

    <div v-if="news.loading || this.contentListLoading"
         class="consulting-msg">
      <p class="consulting-title">
        <q-skeleton width="150px" />
      </p>
      <div class="consulting-main text-center">
        <q-skeleton height="190px" />
      </div>
      <div class="title-style">  <q-skeleton width="150px" /> </div>
      <div class="row q-col-gutter-x-md q-mt-md">
        <div class="video-box-col col-12 col-md-8 col-xs-12">
          <q-skeleton :height="$q.screen.lt.md ? '200px' : '700px'" />
          <div class="mobile-view">
            <q-skeleton width="50px" />

            <q-skeleton height="200px" />
          </div>
        </div>
        <div class="col-md-4 col-12 content-list-col">
          <q-skeleton :height="$q.screen.lt.md ? '200px' : '700px'" />
        </div>
      </div>
      <div class="row  q-col-gutter-x-md q-mt-lg">
        <div class="col-8 ">
          <div class="desktop-view">
            <q-skeleton width="50px"
                        class="q-my-sm" />
            <q-skeleton width="150px"
                        class="q-my-sm" />

            <q-skeleton height="200px" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!news.loading && !this.contentListLoading && contents.list.length > 0"
         class="consulting-msg">
      <p class="consulting-title">
        پیام مشاور
      </p>
      <div class="consulting-main text-center">
        <q-virtual-scroll v-slot="{item, index}"
                          :items="news.list"
                          virtual-scroll-horizontal
                          @virtual-scroll="scrollMoved">
          <consultingMessage :key="index"
                             :new-item="item" />
        </q-virtual-scroll>
        <q-skeleton v-if="news.loading"
                    type="QToolbar" />
        <div v-if="news.list.length === 0 && !news.loading"
             class="rounded-borders empty-list text-primary">
          در حال حاضر پیامی موجود نیست :(
        </div>

      </div>
      <div class="title-style">   مشاوره راه ابریشم آلاء</div>
      <div class="row q-col-gutter-x-md q-mt-md">
        <div class="video-box-col col-12 col-md-8 col-xs-12">
          <!--          @has_watched="watched"-->
          <!--                               :afterLoad="hasLoaded"-->
          <video-box :content="currentContent"
                     @favorite="toggleFavor" />
          <div class="mobile-view">
            <div class="current-content-title"
                 v-text="currentContent.title" />

            <comment-box v-model:value="watchingContentComment"
                         @updateComment="saveComment" />
          </div>
        </div>
        <div class="col-md-4 col-12 content-list-col">
          <content-list-component v-model:value="currentContent"
                                  :loading="contents.loading"
                                  :afterLoad="hasLoaded"
                                  :contents="filteredContents"
                                  :header="{ title: 'لیست فیلم ها'}"
                                  type="video"
                                  @itemClicked="changeCurrentContent($event.id)" />
        </div>
      </div>
      <div class="row  q-col-gutter-x-md q-mt-lg">
        <div class="col-8 ">
          <div class="desktop-view">
            <div class="current-content-title"
                 v-text="currentContent.title" />
            <comment-box v-model:value="watchingContentComment"
                         @updateComment="saveComment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinAbrisham } from 'src/mixin/Mixins.js'
import { Content, ContentList } from 'src/models/Content.js'
import { LiveDescriptionList } from 'src/models/LiveDescription.js'
import videoBox from 'src/components/DashboardAbrisham/videoBox.vue'
import commentBox from 'src/components/DashboardAbrisham/CommentBox.vue'
import ContentListComponent from 'components/DashboardAbrisham/ContentListComponent.vue'
import consultingMessage from 'src/components/DashboardAbrisham/consulting/consultingMessage.vue'
export default {
  name: 'AbrishamConsulting',
  components: {
    ContentListComponent,
    commentBox,
    videoBox,
    consultingMessage
  },
  mixins: [mixinAbrisham],
  data() {
    return {
      testList: [],
      news: new LiveDescriptionList(),
      newsNextPage: 1,
      newsLastPage: null,
      pagination: true,
      contents: new ContentList(),
      currentContent: new Content(),
      contentListLoading: false,
      comment: '',
      hasLoaded: false,
      watchingContent: new Content()
    }
  },
  computed: {
    filteredContents() {
      return new ContentList(this.contents.list)
    },
    watchingContentComment() {
      return this.watchingContent?.comments[0]?.comment || ''
    }
  },
  async created() {
    await this.loadContents()
    await this.nextPage()
  },
  methods: {
    scrollMoved(data) {
      if (data.direction === 'decrease') return
      const lastElementIndex = data.ref.items.length - 1
      const currentElementIndex = data.index
      if (currentElementIndex === lastElementIndex) {
        this.nextPage()
      }
    },
    generateParams() {
      // const param = 'tags[]=مشاوره&order_by[]=created_at&order_type[]=desc&liveDescriptionPage=' + this.newsNextPage;
      return 'liveDescriptionPage=' + this.newsNextPage
    },
    async nextPage() {
      if (this.newsLastPage !== null && parseInt(this.newsLastPage) < parseInt(this.newsNextPage)) {
        return
      }
      const param = this.generateParams()
      const liveDescriptionParams = {
        ...param,
        created_at_since: this.$enums.Events.abrisham,
        'order_by[]': 'created_at',
        'order_type[]': 'desc'
      }
      this.news.loading = true
      // livedescription?created_at_since=2022-07-09&order_by[]=created_at&order_type[]=desc&liveDescriptionPage=1
      //  s.get(window.APIAddresses.liveDescription + '&' + param)
      try {
        const newsList = await this.$apiGateway.liveDescription.getNewsList(liveDescriptionParams)
        this.newsNextPage = parseInt(newsList.meta.current_page) + 1
        this.newsLastPage = newsList.meta.last_page
        this.news = newsList.data
        this.news.loading = false
      } catch {
        this.news.loading = false
      }
    },
    async loadContents() {
      this.contentListLoading = true
      try {
        const isPro = this.$route.name.includes('UserPanel.Asset.AbrishamPro.')
        this.contents = await this.$apiGateway.content.getConsultingContentList(isPro)
        this.contents.list = this.contents.list.filter(content => content.isVideo())
        this.setCurrentContent()
        this.contentListLoading = false
        this.hasLoaded = true
      } catch {
        this.contentListLoading = false
      }
    },
    setCurrentContent() {
      const currentContent = this.contents.list.find(content => content.isVideo())
      if (!currentContent) return
      this.changeCurrentContent(currentContent.id)
    },
    changeCurrentContent(id) {
      this.currentContent = this.contents.list.find(content => content.id === id)
      this.loadComment(id)
    },
    loadComment(id) {
      this.currentContent = this.contents.list.find(content => content.id === id)
      if (this.currentContent.comments[0]) {
        this.comment = this.currentContent.comments[0].comment
      } else {
        this.comment = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.consulting-page {
  margin: 20px 60px 0;

  @media screen and (width <= 1904px) {
    margin: 0 10px;
  }

  @media screen and (width <= 960px) {
    margin: 0;
  }

  .title-style{
    font-size: 20px;
    font-weight: 500;
    color: #3e5480;
    margin-top: 10px;

    @media screen and (width <= 1023px) {
      font-size: 16px;
    }
  }

  .consulting-msg {
    padding-bottom: 0 !important;
    margin-bottom: 30px;

    @media screen and (width <= 1904px) {
      margin-bottom: 25px;
    }

    @media screen and (width <= 1200px) {
      margin-bottom: 16px;
    }

    @media screen and (width <= 990px) {
      margin-bottom: 20px;
    }

    @media screen and (width <= 768px) {
      padding-right: 0 !important;
    }

    .consulting-title {
      font-size: 20px;
      font-weight: 500;
      color: #3e5480;
      margin-bottom: 20px;

      @media screen and (width <= 1904px) {
        margin-bottom: 15px;
      }

      @media screen and (width <= 990px) {
        margin-bottom: 20px;
        text-align: center;
      }

      @media screen and (width <= 768px) {
        margin-bottom: 15px;
        font-size: 16px;
      }
    }

    .consulting-main {
      height: 190px;
      border-radius: 30px;
      background-color: #eff3ff;

      //padding: 20px 0;
      @media screen and (width <= 990px) {
        height: 170px;
        border-radius: 20px;
        padding: 15px 0;
      }

      @media screen and (width <= 768px) {
        height: 150px;
        width: 100vw;
        border-radius: 0;
      }

      @media screen and (width <= 576px) {
        height: 162px;
      }

      @media screen and (width <= 350px) {
        height: 167px;
      }

      .empty-list{
        border: 1px solid;
        padding: 15px;
        font-size: 18px;
        font-weight: 500;
        border-radius: 15px;
        width: 300px;
        margin: 50px auto auto;
        text-align: center;
      }

      .no-message {
        margin: auto;
      }

      .loading {
        margin: auto;
      }
    }
  }

  .content-show {
    font-size: 20px;
    color: #3e5480;
    font-weight: 500;
    margin-bottom: 30px;
    padding: 0 20px !important;

    @media screen and (width <= 1904px) {
      margin-bottom: 15px;
    }

    @media screen and (width <= 1200px) {
      margin-bottom: 10px;
    }

    @media screen and (width <= 990px) {
      margin-bottom: 20px;
    }

    @media screen and (width <= 768px) {
      margin-bottom: 15px;
      font-size: 15px;
    }
  }

  .video-box-col {
    padding-bottom: 0 !important;

    .video-box-parent {
      margin-bottom: 20px;

      @media screen and (width <= 1904px) {
        margin-bottom: 15px;
      }

      @media screen and (width <= 990px) {
        margin-bottom: 20px;
      }

      @media screen and (width <= 576px) {
        margin-bottom: 10px;
      }

      @media screen and (width <= 350px) {
        margin-bottom: 5px;
      }
    }
  }

  .mobile-view {
    display: none;

    @media screen and (width <= 1023px) {
      display: block;
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
}
</style>

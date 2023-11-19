<template>
  <div class="content-item">
    <div class="content-item-top-border" />
    <div class="content-item-title q-px-md-lg q-px-xs-md">
      <bookmark v-if="canFavor"
                :flat="true"
                :is-favored="localContent.is_favored"
                :loading="bookmarkLoading"
                @clicked="handleContentBookmark" />
      <template v-if="localContent.isVideo()">
        <router-link v-if="localContent.id !== null"
                     :to="{ name: 'Public.Content.Show', params: { id: localContent.id } }"
                     class="content-item-link">
          <div class="content-item-title-icon">
            <q-icon name="ph:play-circle"
                    size="16.5px" />
          </div>
          <div class="content-item-title-text ellipsis-2-lines">
            {{ localContent.title }}
          </div>
        </router-link>
      </template>
      <template v-else>
        <div class="content-item-link"
             @click="downloadPdf">
          <div class="content-item-title-icon">
            <q-icon name="ph:file-text"
                    size="16.5px" />
          </div>
          <div class="content-item-title-text ellipsis-2-lines">
            {{ localContent.title }}
          </div>
        </div>
      </template>
    </div>
    <div class="content-item-meta q-pr-md-lg q-pr-xs-md">
      <template v-if="localContent.isVideo()">
        <div v-if="false"
             :class="{'content-item-meta-updated-at': this.doesHaveDuration(localContent.duration)}">
          {{ getShamsiDate(localContent.updated_at.split(' ')[0], false) }}
        </div>
        <div class="content-item-meta-time">
          {{ getContentDurationTitle(localContent.duration)}}
        </div>
      </template>
      <template v-else>
        <q-btn color="primary"
               class="btn-download-pdf"
               @click="downloadPdf">
          pdf
        </q-btn>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import Bookmark from 'components/Bookmark.vue'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway'

moment.loadPersian()

export default {
  name: 'ContentItem',
  components: { Bookmark },
  props: {
    content: {
      type: Content,
      default: new Content()
    },
    canFavor: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      bookmarkLoading: false,
      localContent: new Content()
    }
  },
  mounted () {
    this.localContent = new Content(this.content)
  },
  methods: {
    handleContentBookmark () {
      this.bookmarkLoading = true
      if (this.localContent.is_favored) {
        this.$apiGateway.content.unfavored(this.content.id)
          .then(() => {
            this.localContent.is_favored = !this.localContent.is_favored
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$apiGateway.content.favored(this.content.id)
        .then(() => {
          this.localContent.is_favored = !this.localContent.is_favored
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    downloadPdf () {
      if (!this.content?.file?.pamphlet || !this.content?.file?.pamphlet[0] || !this.content?.file?.pamphlet[0].link) {
        this.$q.notify({
          type: 'negative',
          message: 'مشکلی در دانلود فایل pdf این محتوا رخ داده است.'
        })
        return
      }

      window.open(this.content.file.pamphlet[0].link, '_blank')
    },
    getContentBookmarkBaseRoute(id) {
      return APIGateway.content.show(id)
    },
    getContentDurationTitle (duration) {
      if (!this.doesHaveDuration(duration)) {
        return
      }
      return Math.floor(duration / 60) + ' دقیقه'
    },
    doesHaveDuration(duration) {
      return !!duration
    },
    getShamsiDate (date) {
      return moment(date, 'YYYY/M/D').locale('fa').format('jD jMMMM jYYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-item {
  //padding: 0 40px;
  height: 95px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f3f3f3;
  }

  .content-item-top-border {
    position: absolute;
    top: 0;
    left: 40px;
    right: 40px;
  }

  &:not(:first-child) {
    .content-item-top-border {
      border-top: solid 1px #e5e5e5;
    }
  }

  .content-item-title {
    display: flex;
    justify-content: flex-start;
    width: calc( 100% - 170px );

    .content-item-link {
      display: flex;
      flex-wrap: nowrap;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
    }

    .bookmark-btn {
      margin: 0;
      padding: 0;
    }

    .content-item-title-icon {
      margin-right: 11px;
      font-size: 16px;
    }
  }

  .content-item-meta {
    width: 170px;
    display: flex;
    justify-content: flex-end;

    .content-item-meta-updated-at {
      //margin-right: 40px;
      width: 100px;
      padding-right: 10px;
    }

    .content-item-meta-time {
      width: 60px;

      //padding-right: 10px;
    }

    .btn-download-pdf {
      width: 46px;
      height: 24px;
      max-height: 24px;
      min-height: 24px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 12px;
    }
  }

  @media screen and (width <= 600px) {
    flex-wrap: wrap;

    .content-item-title {
      width: 100%;
      height: 65px;
    }

    .content-item-meta {
      width: 100%;
      height: 30px;
    }
  }
}
</style>

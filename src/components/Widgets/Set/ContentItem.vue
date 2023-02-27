<template>
  <div class="content-item">
    <div class="content-item-top-border" />
    <div class="content-item-title">
      <bookmark v-if="canFavor"
                v-model:value="localContent.is_favored"
                :bookmark-function="bookmarkContent"
                @on-change-favorite-status="onChangeFavoriteStatus" />
      <router-link v-if="content && content.id !== null"
                   :to="{ name: 'Public.Content.Show', params: { id: content.id } }"
                   class="content-item">
        <div class="content-item-title-icon">
          <q-icon :name="content.isVideo() ? 'isax-svg:play-circle' : 'isax-svg:document-download'"
                  size="16.5px" />
        </div>
        <div class="content-item-title-text">
          {{ content.title }}
        </div>
      </router-link>
    </div>
    <div class="content-item-meta">
      <template v-if="content.isVideo()">
        <div class="content-item-meta-updated-at">
          {{ getShamsiDate(content.updated_at.split(' ')[0], false) }}
        </div>
        <div class="content-item-meta-time">
          {{ getContentDuration(content.duration) }}
          دقیقه
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
import API_ADDRESS from 'src/api/Addresses.js'
import { Content } from 'src/models/Content.js'

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
      localContent: new Content()
    }
  },
  mounted () {
    this.localContent = this.content
  },
  methods: {
    downloadPdf () {
      if (!this.content?.file?.pamphlet || !this.content?.file?.pamphlet[0] || !!this.content?.file?.pamphlet[0].link) {
        this.$q.notify({
          type: 'negative',
          message: 'مشکلی در دانلود فایل pdf این محتوا رخ داده است.'
        })
        return
      }

      window.open(this.content.file.pamphlet[0].link, '_blank')
    },
    getContentBookmarkBaseRoute(id) {
      return API_ADDRESS.content.show(id)
    },
    bookmarkContent () {
      if (this.localContent.is_favored) {
        return this.$apiGateway.content.unfavored(this.content.id)
      }
      return this.$apiGateway.content.favored(this.content.id)
    },
    onChangeFavoriteStatus (result) {
      console.log(result)
    },
    getContentDuration (duration) {
      return Math.floor(duration / 60)
    },
    getShamsiDate (date) {
      return moment(date, 'YYYY/M/D').locale('fa').format('jD jMMMM jYYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-item {
  padding: 0 40px;
  height: 64px;
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
    .content-item-title-icon {
      margin-right: 11px;
      font-size: 16px;
    }
  }
  .content-item-meta {
    display: flex;
    justify-content: flex-end;
    .content-item-meta-updated-at {
      margin-right: 40px;
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
}
</style>

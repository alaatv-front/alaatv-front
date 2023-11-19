<template>
  <div :style="defaultOptions.style"
       class="set">
    <div class="header">
      <div class="title">
        <bookmark v-if="localOptions.showBtnFavorSet && !set.loading"
                  :is-favored="set.is_favored"
                  :flat="false"
                  :loading="bookmarkLoading"
                  @clicked="handleSetBookmark" />
        <template v-if="set.loading">
          <q-skeleton width="300px"
                      type="text" />
        </template>
        <template v-else>
          {{ set.title }}
        </template>
      </div>
    </div>
    <div class="archives-row">
      <div class="archives-header">
        <div class="archives-title">
          <template v-if="!set.loading">
            آرشیو محتوا
          </template>
          <template v-if="set.loading">
            <q-skeleton width="100px"
                        type="text" />
          </template>
        </div>
        <div class="archives-meta">
          <template v-if="set.loading">
            <q-skeleton type="text" />
          </template>
          <template v-else>
            {{ set.contents_count }}
            جلسه
          </template>
        </div>
      </div>
      <div class="archives-list">
        <template v-if="set.loading">
          <q-skeleton height="100px"
                      class="q-mb-sm" />
          <q-skeleton height="100px"
                      class="q-mb-sm" />
          <q-skeleton height="100px"
                      class="q-mb-sm" />
          <q-skeleton height="100px"
                      class="q-mb-sm" />
        </template>
        <template v-else>
          <q-expansion-item v-for="section in definedSections"
                            :key="section.section.id"
                            :default-opened="definedSections.length === 1"
                            class="section-item">
            <template #header>
              <div class="section-expansion-header">
                <div class="section-expansion-header-title">
                  <div class="icon">
                    <q-icon name="ph:book-open-text"
                            size="16.5px" />
                  </div>
                  <div class="text">
                    {{ section.section.name }}
                  </div>
                </div>
                <div class="section-expansion-header-meta">
                  {{ getCountOfVideosInContents(section.contents) }}
                  فیلم
                  <span class="dot" />
                  {{ getCountOfPamphletsInContents(section.contents) }}
                  جزوه
                </div>
              </div>
            </template>
            <div class="contents-list">
              <content-item v-for="content in section.contents.list"
                            :key="content.id"
                            :content="content" />
            </div>
          </q-expansion-item>
          <div v-if="contentsWithNullSection && contentsWithNullSection.length > 0"
               class="contents-list contents-with-null-section">
            <content-item v-for="content in contentsWithNullSection"
                          :key="content.id"
                          :content="content" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import { Set } from 'src/models/Set.js'
import ContentItem from './ContentItem.vue'
import Bookmark from 'src/components/Bookmark.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { ContentList } from 'src/models/Content.js'
import { SetSection } from 'src/models/SetSection.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

moment.loadPersian()

export default {
  name: 'SetShowInfo',
  components: { ContentItem, Bookmark },
  mixins: [mixinWidget, mixinPrefetchServerData],
  props: {
    data: {
      type: [Set, Number, String],
      default: null
    }
  },
  data () {
    return {
      bookmarkLoading: false,
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        showCountOfContent: true,
        showCountOfVideo: true,
        showCountOfPamphlet: true,
        showBtnFavorSet: true,
        showBtnFavorContent: true
      },
      tab: '',
      set: new Set(),
      sections: [],
      contentVideos: [],
      allGroupsOfContents: [],
      ordered: true
    }
  },
  computed: {
    definedSections () {
      return this.sections.filter(section => section.section.id !== 'all')
    },
    contentsWithNullSection () {
      const target = this.sections.find(section => section.section.id === 'all')
      if (!target) {
        return []
      }

      return (new ContentList(target.contents)).list
    }
  },
  methods: {
    prefetchServerDataPromise () {
      this.set.loading = true
      return this.loadSet()
    },
    prefetchServerDataPromiseThen (data) {
      this.set = new Set(data.set)
      this.set.contents = data.contents
      this.sections = data.sections
      this.set.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.set.loading = false
    },

    handleSetBookmark () {
      this.bookmarkLoading = true
      if (this.set.is_favored) {
        this.$apiGateway.set.unfavored(this.set.id)
          .then(() => {
            this.set.is_favored = !this.set.is_favored
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$apiGateway.set.favored(this.set.id)
        .then(() => {
          this.set.is_favored = !this.set.is_favored
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    getCountOfVideosInContents (contents) {
      if (!contents || !contents.list) {
        return 0
      }
      return (new ContentList(contents)).list.filter(content => content.isVideo()).length
    },
    getCountOfPamphletsInContents (contents) {
      if (!contents || !contents.list) {
        return 0
      }
      return (new ContentList(contents)).list.filter(content => content.isPamphlet()).length
    },
    loadSet () {
      return new Promise((resolve, reject) => {
        if (this.data && typeof this.data === 'object') {
          resolve({
            set: this.data,
            contents: [],
            sections: []
          })
        } else if (
          typeof this.data === 'number' ||
          typeof this.data === 'string'
        ) {
          this.getSet(this.data)
            .then((data) => {
              resolve(data)
            })
            .catch(() => {
              reject()
            })
        } else {
          this.getSet(this.$route.params.id)
            .then((data) => {
              resolve(data)
            })
            .catch(() => {
              reject()
            })
        }
      })
    },
    getSplitedContentsToSections (contents) {
      const sections = contents.getSections()
      const splitedContents = []
      sections.forEach((section) => {
        const contentsOfSection = contents.list.filter(content => content.section.id === section.id)
        splitedContents.push({
          section: new SetSection(section),
          contents: new ContentList(contentsOfSection)
        })
      })

      return splitedContents
    },
    getSet (setId) {
      return new Promise((resolve, reject) => {
        APIGateway.set.show(setId)
          .then((set) => {
            APIGateway.set.getContents(setId)
              .then((contents) => {
                set.contents = (new ContentList(contents))
                resolve({
                  set,
                  contents: (new ContentList(contents)),
                  sections: this.getSplitedContentsToSections(set.contents)
                })
              })
              .catch(() => {
                reject()
              })
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.set {
  background: #f6f8fa;
  border-radius: 25px;

  .header {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    @media screen and (width <= 599px) {
      flex-direction: column;
    }

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .archives-row {
    .archives-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;
      padding: 0 25px;

      .archives-title {
        display: flex;
        justify-content: center;
        align-items: center;

      }

      .archives-meta {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .archives-list {
      margin-top: 20px;

      //@media screen and (max-width: 599px) {
      //  margin-left: 10px;
      //  margin-right: 10px;
      //}
      .section-item {
        margin-bottom: 20px;
        border-radius: 16px;
        background: white;
      }

      :deep(.q-expansion-item) {
        .q-expansion-item__container {
          .q-item {
            height: 100px;
            background: white;
            box-shadow: 2px -4px 10px rgb(255 255 255 / 60%), -2px 4px 10px rgb(112 108 162 / 5%);
            border-radius: 16px;

            .q-item__section.q-item__section--side {
              .q-icon {
                width: 32px;
                height: 32px;
                background: #FFC943;
                border-radius: 16px;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }

      .section-expansion-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .section-expansion-header-title {
          display: flex;
          justify-content: flex-start;

          .icon {
            margin-right: 21px;
          }
        }

        .section-expansion-header-meta {
          display: flex;
          justify-content: flex-end;
          padding-right: 40px;

          .dot {
            width: 6px;
            height: 6px;
            margin: 6px;
            background: #FFC943;
          }
        }
      }

      .contents-list {
        padding-top: 16px;

        &.contents-with-null-section {
          border-radius: 16px;
          background: white;
        }
      }
    }
  }
}
</style>

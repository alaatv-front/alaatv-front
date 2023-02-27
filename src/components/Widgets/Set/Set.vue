<template>
  <div :style="defaultOptions.style"
       class="set">
    <div class="header">
      <div class="title">
        <bookmark v-if="localOptions.showBtnFavorSet"
                  v-model:value="set.is_favored"
                  :base-route="getSetBookmarkBaseRoute(set.id)" />
        <template v-if="set.loading">
          <q-skeleton type="text" />
        </template>
        <template v-else>
          {{ set.title }}
        </template>
      </div>
      <div class="meta">
        <template v-if="set.loading">
          <q-skeleton type="text" />
        </template>
        <template v-else>
          {{ set.contents_count }}
          جلسه
        </template>
      </div>
    </div>
    <div class="archives-row">
      <div class="title">
        آرشیو محتوا
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
                            class="section-item">
            <template #header>
              <div class="section-expansion-header">
                <div class="section-expansion-header-title">
                  <div class="icon">
                    <q-icon name="isax-svg:book-1"
                            size="16.5px" />
                  </div>
                  <div class="text">
                    {{ section.section.name }}
                  </div>
                </div>
                <div class="section-expansion-header-meta">
                  {{ getCountOfVideosInContents(section.contents) }}
                  جلسه
                  <span class="dot" />
                  {{ getCountOfPamphletsInContents(section.contents) }}
                  جزوه
                </div>
              </div>
            </template>
            <div class="contents-list">
              <content-item v-for="content in section.contents"
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
import API_ADDRESS from 'src/api/Addresses.js'
import Bookmark from 'src/components/Bookmark.vue'
import { SetSection } from 'src/models/SetSection.js'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'

moment.loadPersian()

export default {
  name: 'SetShowInfo',
  components: { ContentItem, Bookmark },
  mixins: [PageBuilderOptionPanel],
  props: {
    data: {
      type: [Set, Number, String],
      default() {
        return new Set()
      }
    }
  },
  data() {
    return {
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
      return this.sections.filter(section => section.section.id !== null)
    },
    contentsWithNullSection () {
      const target = this.sections.find(section => section.section.id === null)
      if (!target) {
        return []
      }

      return target.contents
    }
  },
  watch: {
    data() {
      this.loadSet()
    },
    'data.id': function () {
      this.loadSet()
    }
  },
  created() {
    this.loadSet()
  },
  methods: {
    getCountOfVideosInContents (contents) {
      return contents.filter(content => content.isVideo()).length
    },
    getCountOfPamphletsInContents (contents) {
      return contents.filter(content => content.isPamphlet()).length
    },
    getSetBookmarkBaseRoute(id) {
      return API_ADDRESS.set.show(id)
    },
    loadSet() {
      if (typeof this.data === 'object') {
        this.set = this.data
      } else if (
        typeof this.data === 'number' ||
        typeof this.data === 'string'
      ) {
        this.set.id = this.data
        this.getSet()
      }
      this.set.id = this.$route.params.id
      this.getSet()
    },
    getSplitedContentsToSections (contentList) {
      const sections = this.getSectionsFromContents(contentList)
      const splitedContents = []
      sections.forEach((section) => {
        const contentsOfSection = contentList.list.filter(content => content.section.id === section.id)
        splitedContents.push({
          section: new SetSection(section),
          contents: contentsOfSection
        })
      })

      return splitedContents
    },
    getSectionsFromContents (contentList) {
      return contentList.list.map((content) => content.section)
        .filter((section, sectionIndex, sections) => sections.findIndex(sectionItem => sectionItem.id === section.id) === sectionIndex)
    },
    getSet() {
      this.set.loading = true
      this.$apiGateway.set.show(this.set.id)
        .then((set) => {
          this.set = set
          this.sections = this.getSplitedContentsToSections(this.set.contents)
          this.set.loading = false
        })
        .catch(() => {
          this.set.loading = false
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
    .title {}
    .meta {}
  }
  .archives-row {
    .title {
      margin-top: 40px;
    }
    .archives-list {
      margin-top: 20px;
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

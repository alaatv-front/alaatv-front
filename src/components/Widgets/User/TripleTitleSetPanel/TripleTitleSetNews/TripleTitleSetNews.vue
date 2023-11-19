<template>
  <div class="news-page">
    <div class="row">
      <div :class="bannerImages.length > 0 ? 'col-xl-8 col-lg-9' : 'col-12'">
        <div class="news-part">
          <div class="news-top">
            <div class="news-header">
              <div class="news-filter">
                <div class="news-title">
                  <p>
                    اخبار و اطلاعیه ها
                  </p>
                </div>
                <div class="filter-select">
                  <q-btn unelevated
                         class="filter-default"
                         :class="{'filter-button':!doFilter , 'filter-clicked':doFilter}"
                         @click="clicked">
                    فیلترها
                    <i class="fi fi-rr-settings-sliders icon" />
                  </q-btn>
                  <div class="order-parent">
                    <q-select v-model="filtersData.sort"
                              filled
                              dropdown-icon="mdi-chevron-down"
                              dense
                              placeholder="مرتب کردن بر اساس"
                              class="order"
                              :options="sorts"
                              option-label="text"
                              option-value="value"
                              map-options
                              emit-value
                              :loading="unpinNews.loading"
                              :disabled="unpinNews.loading && emptyNews"
                              @update:model-value="selectedItem" />
                  </div>
                </div>
              </div>
              <div v-if="doFilter"
                   class="filter-list">
                <div class="lesson-parent">
                  <q-select v-model="filtersData.lesson"
                            :options="lessons"
                            option-label="title"
                            option-value="id"
                            use-input
                            dropdown-icon="mdi-chevron-down"
                            dense
                            background-color="#eff3ff"
                            filled
                            label="درس"
                            placeholder="درس"
                            class="lesson"
                            :menu-props="{ bottom: true, offsetY: true }"
                            return-object
                            :loading="unpinNews.loading"
                            :disabled="unpinNews.loading && emptyNews"
                            map-options
                            emit-value
                            @update:model-value="selectedItem" />
                </div>
                <div class="category-parent">
                  <q-select v-model="filtersData.category"
                            :options="categories"
                            filled
                            dropdown-icon="mdi-chevron-down"
                            dense
                            label="دسته بندی"
                            placeholder="دسته بندی"
                            class="category"
                            :menu-props="{ bottom: true, offsetY: true }"
                            :loading="unpinNews.loading"
                            :disabled="unpinNews.loading && emptyNews"
                            @update:model-value="selectedItem" />
                </div>
              </div>
            </div>
          </div>
          <div class="news-bottom">
            <div ref="pinedNewsList"
                 class="">
              <q-infinite-scroll :offset="250"
                                 scroll-target="pinedNewsList"
                                 @load="getNewPinLiveDescription">
                <news-item v-for="(item, index) in pinNews.list"
                           :key="index"
                           :pin="true"
                           class="q-mb-md-lg"
                           :new-item="item"
                           @seenNews="seenNews" />
              </q-infinite-scroll>
            </div>
            <q-separator class="q-my-md" />
            <div ref="unPinedNewsList">
              <q-infinite-scroll :offset="250"
                                 scroll-target="pinedNewsList"
                                 @load="getNewUnpinLiveDescription">
                <news-item v-for="(item, index) in unpinNews.list"
                           :key="index"
                           :pin="false"
                           class="q-mb-md-lg"
                           :new-item="item"
                           @seenNews="seenNews" />
              </q-infinite-scroll>
            </div>
            <div class="text-center my-5">
              <div v-if="emptyNews"
                   class="text-primary no-news"
                   type="warning">
                اخباری موجود نیست.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="bannerImages.length > 0"
           class="banner-col col-xl-4 col-lg-3 col-12">
        <div class="banner-part">
          <div class="banner">
            <div v-for="(item , index) in bannerImages"
                 :key="index">
              <news-banner :bannerData="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import { LiveDescriptionList } from 'src/models/LiveDescription.js'
import NewsItem from 'src/components/DashboardAbrisham/news/NewsItem.vue'
import NewsBanner from 'src/components/DashboardAbrisham/news/NewsBanner.vue'

export default {
  name: 'TripleTitleSetNews',
  components: { NewsBanner, NewsItem },
  mixins: [mixinTripleTitleSet],
  data() {
    return {
      pinNews: new LiveDescriptionList(),
      pinNewsNextPage: 1,
      pinNewsLastPage: null,
      unpinNews: new LiveDescriptionList(),
      unpinNewsNextPage: 1,
      unpinNewsLastPage: null,
      doFilter: false,
      banner: true,
      filtersData: {
        sort: {
          value: 'created_at-desc',
          text: 'جدیدترین ها',
          key: 'created_at',
          type: 'desc'
        },
        category: null,
        lesson: null
      },
      sorts: [
        {
          value: 'created_at-desc',
          text: 'جدیدترین ها',
          key: 'created_at',
          type: 'desc'
        },
        {
          value: 'created_at-asc',
          text: 'قدیمی ترین ها',
          key: 'created_at',
          type: 'asc'
        },
        {
          value: 'seen_counter-desc',
          text: 'پربازدید ترین ها',
          key: 'seen_counter',
          type: 'desc'
        }
      ],
      lessons: [],
      categories: [
        'همه',
        'مشاوره',
        'اطلاعیه',
        'انتشار'
      ],
      bannerImages: []
    }
  },
  computed: {
    emptyNews() {
      return this.unpinNews.list.length === 0 && this.pinNews.list.length === 0
    }
  },
  methods: {
    async seenNews(newsId) {
      await this.$apiGateway.liveDescription.getNewsHasBeenSeen(newsId)
    },
    async getNewPinLiveDescription(index, done) {
      this.pinNews.loading = true
      try {
        if (this.pinNewsLastPage !== null && parseInt(this.pinNewsLastPage) < parseInt(this.pinNewsNextPage)) {
          this.$refs.pinedNewsList.stop()
          return
        }
        const pinnedNews = await this.$apiGateway.liveDescription.getPinedNews()
        this.pinNewsNextPage = parseInt(pinnedNews.meta.current_page) + 1
        this.pinNewsLastPage = pinnedNews.meta.last_page
        this.pinNews = pinnedNews.data
        this.pinNews.loading = false
        done()
      } catch {
        this.pinNews.loading = false
      }
    },
    async getNewUnpinLiveDescription(index, done, stop) {
      this.unpinNews.loading = true
      try {
        if (this.unpinNewsLastPage !== null && parseInt(this.unpinNewsLastPage) < parseInt(this.unpinNewsNextPage)) {
          stop()
          return
        }
        const params = this.generateParams()
        const liveDescriptionParams = {
          ...params,
          created_at_since: this.event.id,
          'order_by[]': 'created_at',
          'order_type[]': 'desc'
        }
        const newsList = await this.$apiGateway.liveDescription.getNewsList(liveDescriptionParams)
        this.unpinNewsNextPage = +newsList.meta.current_page + 1
        this.unpinNewsLastPage = newsList.meta.last_page
        this.unpinNews = newsList.data
        // this.unpinNews = new LiveDescriptionList(this.fakeData)
        this.unpinNews.loading = false
        done()
      } catch {
        this.unpinNews.loading = false
      }
    },
    clicked() {
      this.doFilter = !this.doFilter
    },
    generateParams() {
      const params = []
      if (
        this.filtersData.lesson &&
        this.filtersData.lesson.id !== null &&
        typeof this.filtersData.lesson.id !== 'undefined'
      ) {
        params.push({
          key: 'product_id',
          value: this.filtersData.lesson.id
        })
      }

      if (this.filtersData.category && this.filtersData.category !== 'همه') {
        params.push({
          key: 'tags[]',
          value: this.filtersData.category
        })
      }
      if (this.filtersData.sort) {
        params.push({
          key: 'order_by[]',
          value: this.filtersData.sort.key
        })
        params.push({
          key: 'order_type[]',
          value: this.filtersData.sort.type
        })
      }

      params.push({
        key: 'liveDescriptionPage',
        value: this.unpinNewsNextPage
      })

      return params.map(item => item.key + '=' + item.value).join('&')
    },
    selectedItem() {
      this.unpinNewsNextPage = 1
      this.unpinNews = new LiveDescriptionList()
      this.getNewUnpinLiveDescription()
    }
  }
}
</script>

<style lang="scss" scoped>
.news-page {
  padding: 0 60px;
  background: white;

  @media screen and (width <= 1904px) {
    padding: 0 21px;
  }

  @media screen and (width <= 1264px) {
    padding: 0 11px;
  }

  @media screen and (width <= 960px) {
    padding: 0 6px;
  }

  .news-part {
    margin-left: 9px;

    @media screen and (width <= 1904px) {
      margin-left: -4px;
    }

    @media screen and (width <= 1264px) {
      margin-left: 0;
    }

    .news-top {
      padding-bottom: 0 !important;

      .news-header {
        align-items: center;

        .news-filter {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          @media screen and (width <= 960px) {
            flex-direction: column !important;
          }

          .news-title {
            font-size: 20px;
            font-weight: 500;
            color: #3e5480;

            @media screen and (width <= 960px) {
              font-size: 16px !important;
              text-align: center;
            }
          }

          .filter-select {
            display: flex;
            flex-direction: row;
            margin-bottom: 21px;

            @media screen and (width <= 960px) {
              justify-content: space-between !important;
              margin-bottom: 25px;
            }

            @media screen and (width <= 575px) {
              margin-bottom: 20px;
            }

            .filter-default {
              width: 119px;
              height: 48px;
              color: #3e5480;
              font-size: 16px;
              font-weight: 500;
              border-radius: 10px;
              margin-right: 16px;
              justify-content: space-between;

              @media screen and (width <= 1264px) {
                height: 40px !important;
              }

              @media screen and (width <= 960px) {
                width: 100px !important;
                height: 36px;
                font-size: 14px !important;
              }

              @media screen and (width <= 768px) {
                width: 100px !important;
              }

              &.filter-button {
                background-color: #eff3ff;
              }

              &.filter-clicked {
                border: solid 4px #eff3ff;
                box-sizing: border-box;
                background-color: #fff;
              }

              .fi {
                font-size: 16px;
                font-weight: 500;
              }
            }

            .order-parent {
              width: 165px;

              &:deep(.q-field__native ){
                span{
                  color: #3e5480;
                }

              }

              @media screen and (width <= 768px) {
                width: 134px !important;
              }

              @media screen and (width <= 575px) {
                width: 152px !important;
              }

              .order {
                border-radius: 10px;
              }
            }
          }
        }
      }

      .filter-list {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;

        @media screen and (width <= 960px) {
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .lesson-parent {
          width: 55%;

          .lesson {
            margin-right: 16px;
            border-radius: 10px;
          }
        }

        .category-parent {
          width: 245px;

          .category {
            border-radius: 10px;
          }
        }
      }
    }

    .news-bottom {
      padding-top: 0 !important;

      .no-news{
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
  }

  .banner-col {
    padding-bottom: 0 !important;

    .banner-part {
      display: flex;
      flex-direction: column;

      @media screen and (width <= 1264px) {
        display: grid;
        grid-template-rows: auto;
        overflow: hidden;
      }

      .banner {
        margin-bottom: 20px;

        @media screen and (width <= 1264px) {
          margin-bottom: 5px !important;
          overflow: scroll hidden;
          display: flex;
          grid-row-start: 2;
        }

        @media screen and (width <= 960px) {
          margin-bottom: 0 !important;
        }

        @media screen and (width <= 600px) {
          margin-bottom: 0 !important;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.news-page {
  .news-part {
    .news-header {
      .mdi-chevron-down {
        &::before {
          color: #3e5480;
        }
      }

      .v-select {
        &.v-input--dense {
          .v-select__selection--comma {
            color: #3e5480;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }

      .v-text-field {
        &.v-text-field--solo {
          &.v-input--dense {
            > {
              .v-input__control {
                min-height: 48px !important;

                @media screen and (width <= 1264px) {
                  min-height: 40px !important;
                }

                @media screen and (width <= 768px) {
                  min-height: 36px !important;
                }
              }
            }
          }
        }
      }
    }

    .theme--light {
      &.v-label {
        color: #3e5480;
        font-size: 16px;
        font-weight: 500;

        @media screen and (width <= 768px) {
          font-size: 14px;
        }
      }

      &.v-icon {
        color: #3e5480;
      }
    }
  }
}

.v-menu__content {
  border-radius: 0 0 20px 20px;
}
</style>

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
import { LiveDescriptionList } from 'src/models/LiveDescription.js'
import NewsItem from 'components/DashboardAbrisham/news/NewsItem.vue'
import NewsBanner from 'components/DashboardAbrisham/news/NewsBanner.vue'
export default {
  name: 'AbrishamNews',
  components: { NewsBanner, NewsItem },
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
      bannerImages: [],
      fakeData: new LiveDescriptionList()
    }
  },
  computed: {
    emptyNews() {
      return this.unpinNews.list.length === 0 && this.pinNews.list.length === 0
    }
  },
  created() {
    this.lessons = [
      {
        id: 347,
        title: 'راه ابریشم ریاضی تجربی آلاء',
        price: { base: 1500000, discount: 375000, final: 1125000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/2_20220709061554.jpg',
        url: { web: 'http://127.0.0.1/product/347', api: 'http://127.0.0.1/api/v2/product/347' }
      }, {
        id: 439,
        title: 'راه ابریشم ریاضیات ریاضی آلاء',
        price: { base: 2000000, discount: 500000, final: 1500000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/1 (3)_20220709061546.jpg',
        url: { web: 'http://127.0.0.1/product/439', api: 'http://127.0.0.1/api/v2/product/439' }
      }, {
        id: 440,
        title: 'راه ابریشم فیزیک آلاء(با تدریس آقای طلوعی)',
        price: { base: 1500000, discount: 375000, final: 1125000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/3_20220709061541.jpg',
        url: { web: 'http://127.0.0.1/product/440', api: 'http://127.0.0.1/api/v2/product/440' }
      }, {
        id: 441,
        title: 'راه ابریشم فیزیک آلاء(با تدریس آقای کازرانیان)',
        price: { base: 1500000, discount: 375000, final: 1125000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/4_20220709061537.jpg',
        url: { web: 'http://127.0.0.1/product/441', api: 'http://127.0.0.1/api/v2/product/441' }
      }, {
        id: 442,
        title: 'راه ابریشم زیست شناسی آلاء',
        price: { base: 2000000, discount: 500000, final: 1500000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/6_20220709061743.jpg',
        url: { web: 'http://127.0.0.1/product/442', api: 'http://127.0.0.1/api/v2/product/442' }
      }, {
        id: 443,
        title: 'راه ابریشم شیمی آلاء',
        price: { base: 1500000, discount: 375000, final: 1125000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/5_20220709061529.jpg',
        url: { web: 'http://127.0.0.1/product/443', api: 'http://127.0.0.1/api/v2/product/443' }
      }, {
        id: 445,
        title: 'پک اختصاصی راه ابریشم رشته تجربی آلاء',
        price: { base: 6500000, discount: 1950000, final: 4550000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/11_20220709061521.jpg',
        url: { web: 'http://127.0.0.1/product/445', api: 'http://127.0.0.1/api/v2/product/445' }
      }, {
        id: 446,
        title: 'پک اختصاصی راه ابریشم رشته ریاضی آلاء',
        price: { base: 5000000, discount: 1500000, final: 3500000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/22_20220709061506.jpg',
        url: { web: 'http://127.0.0.1/product/446', api: 'http://127.0.0.1/api/v2/product/446' }
      }, {
        id: 569,
        title: 'راه ابریشم زبان انگلیسی آلاء',
        price: { base: 900000, discount: 225000, final: 675000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/10_20220709061459.jpg',
        url: { web: 'http://127.0.0.1/product/569', api: 'http://127.0.0.1/api/v2/product/569' }
      }, {
        id: 570,
        title: 'راه ابریشم دین و زندگی آلاء',
        price: { base: 900000, discount: 225000, final: 675000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/8_20220709061451.jpg',
        url: { web: 'http://127.0.0.1/product/570', api: 'http://127.0.0.1/api/v2/product/570' }
      }, {
        id: 571,
        title: 'راه ابریشم عربی آلاء',
        price: { base: 900000, discount: 225000, final: 675000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/9_20220709061444.jpg',
        url: { web: 'http://127.0.0.1/product/571', api: 'http://127.0.0.1/api/v2/product/571' }
      }, {
        id: 572,
        title: 'راه ابریشم ادبیات آلاء',
        price: { base: 900000, discount: 225000, final: 675000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/7_20220709061436.jpg',
        url: { web: 'http://127.0.0.1/product/572', api: 'http://127.0.0.1/api/v2/product/572' }
      }, {
        id: 573,
        title: 'پک راه ابریشم عمومی آلاء',
        price: { base: 3600000, discount: 1080000, final: 2520000, payableByWallet: null },
        photo: 'https://nodes.alaatv.com/upload/images/product/33_20220709061424.jpg',
        url: { web: 'http://127.0.0.1/product/573', api: 'http://127.0.0.1/api/v2/product/573' }
      }]
    this.fakeData = [
      {
        id: 123,
        title: ' منطقه 2 کنکور تجربی',
        photo: 'https://nodes.alaatv.com/upload/images/product/33_20220709061424.jpg?w=322&h=322',
        description: ' فیلم جلسه 14 - مصاحبه با رتبه برتر های آلاء کنکور 1401' +
          '، علی شریعتی رتبه 7 منطقه 2 کنکور تجربی 140فیلم جلسه 14 - مصاحبه ب' +
          'ا رتبه برتر های آلاء کنکور 1401، علی شریعتی رتبه 7 منطقه 2 کنکور تج' +
          'ربی 140فیلم جلسه 14 - مصاحبه با رتبه برتر های آلاء کنکور 1401، علی ' +
          'شریعتی رتبه 7 منطقه 2 کنکور تجربی 140فیلم جلسه 14 - مصاحبه با رتبه' +
          ' برتر های آلاء کنکور 1401، علی شریعتی رتبه 7 منطقه 2 کنکور تجربی 140' +
          'فیلم جلسه 14 - مصاحبه با رتبه برتر های آلاء کنکور 1401، علی شریع' +
          'تی رتبه 7 منطقه 2 کنکور تجربی 140فیلم جلسه 14 - مصاحبه با رتبه ' +
          'برتر های آلاء کنکور 1401، علی شریعتی رتبه 7 منطقه 2 کنکور ' +
          'تجربی 140فیلم جلسه 14 - مصاحبه با رتبه برتر های آلاء کن' +
          'کور 1401، علی شریعتی رتبه 7 منطقه 2 کنکور تجربی' +
          ' 140فیلم جلسه 14 - مصاحبه با رتبه برتر های آلاء' +
          ' کنکور 1401، علی شریعتی رتبه 7 منطقه 2 کنکور تجربی 140',
        seen_counter: 500,
        has_pinned: false,
        tags: ['اطلاعیه']
      },
      {
        id: 125,
        title: ' علی شریعتی رتبه',
        photo: 'https://nodes.alaatv.com/upload/images/product/33_20220709061424.jpg?w=322&h=322',
        description: 'فیلم جلسه 14 - مصاحبه با رتبه برتر های آلاء کنکور 1401، علی شریعتی رتبه 7 منطقه 2 کنکور تجربی 140',
        seen_counter: 500,
        has_pinned: false,
        tags: []
      }]
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
        // this.pinNews = new LiveDescriptionList(this.fakeData)
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
          created_at_since: this.$enums.Events.abrisham,
          'order_by[]': 'created_at',
          'order_type[]': 'desc'
        }
        if (this.$route.name.includes('UserPanel.Asset.AbrishamPro.')) {
          liveDescriptionParams.isPro = 1
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
  @media screen and (max-width: 1904px) {
    padding: 0 21px;
  }
  @media screen and (max-width: 1264px) {
    padding: 0 11px;
  }
  @media screen and (max-width: 960px) {
    padding: 0 6px;
  }

  .news-part {
    margin-left: 9px;
    @media screen and (max-width: 1904px) {
      margin-left: -4px;
    }
    @media screen and (max-width: 1264px) {
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
          @media screen and (max-width: 960px) {
            flex-direction: column !important;
          }

          .news-title {
            font-size: 20px;
            font-weight: 500;
            color: #3e5480;
            @media screen and (max-width: 960px) {
              font-size: 16px !important;
              text-align: center;
            }
          }

          .filter-select {
            display: flex;
            flex-direction: row;
            margin-bottom: 21px;
            @media screen and (max-width: 960px) {
              justify-content: space-between !important;
              margin-bottom: 25px;
            }
            @media screen and (max-width: 575px) {
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
              @media screen and (max-width: 1264px) {
                height: 40px !important;
              }
              @media screen and (max-width: 960px) {
                width: 100px !important;
                height: 36px;
                font-size: 14px !important;
              }
              @media screen and (max-width: 768px) {
                width: 100px !important;
              }

              &.filter-button {
                background-color: #eff3ff;
              }

              &.filter-clicked {
                border: solid 4px #eff3ff;
                box-sizing: border-box;
                background-color: #ffffff;
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
              @media screen and (max-width: 768px) {
                width: 134px !important;
              }
              @media screen and (max-width: 575px) {
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
        @media screen and (max-width: 960px) {
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
      @media screen and (max-width: 1264px) {
        display: grid;
        grid-template-rows: auto;
        overflow: hidden;
      }

      .banner {
        margin-bottom: 20px;
        @media screen and (max-width: 1264px) {
          margin-bottom: 5px !important;
          overflow-x: scroll;
          overflow-y: hidden;
          display: flex;
          grid-row-start: 2;
        }
        @media screen and (max-width: 960px) {
          margin-bottom: 0 !important;
        }
        @media screen and (max-width: 600px) {
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
        &:before {
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
                @media screen and (max-width: 1264px) {
                  min-height: 40px !important;
                }
                @media screen and (max-width: 768px) {
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
        @media screen and (max-width: 768px) {
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

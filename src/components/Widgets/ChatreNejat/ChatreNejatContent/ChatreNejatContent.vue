<template>
  <div class="news-page">
    ff
  </div>
</template>

<script>
import { LiveDescriptionList } from 'src/models/LiveDescription.js'
import NewsItem from 'components/DashboardAbrisham/news/NewsItem.vue'
import NewsBanner from 'components/DashboardAbrisham/news/NewsBanner.vue'
export default {
  name: 'ChatreNejatContent',
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
      await this.$apiGateway.abrisham.getNewsHasBeenSeen(newsId)
    },
    async getNewPinLiveDescription(index, done) {
      this.pinNews.loading = true
      try {
        if (this.pinNewsLastPage !== null && parseInt(this.pinNewsLastPage) < parseInt(this.pinNewsNextPage)) {
          this.$refs.pinedNewsList.stop()
          return
        }
        const response = await this.$apiGateway.abrisham.getPinedNews()
        this.pinNewsNextPage = parseInt(response.meta.current_page) + 1
        this.pinNewsLastPage = response.meta.last_page
        this.pinNews = response.data
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
        const response = await this.$apiGateway.abrisham.getNewsList(params)
        this.unpinNewsNextPage = +response.meta.current_page + 1
        this.unpinNewsLastPage = response.meta.last_page
        this.unpinNews = response.data
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
                  color: var(--abrishamMain);
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

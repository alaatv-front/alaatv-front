<template>
  <div class="content-search-vue">
    <q-scroll-observer @scroll="onScroll" />
    <div class="row  q-col-gutter-x-md main-content content-body">
      <div v-if="mobileMode"
           class="mobile-mode col-12 text-center">
        <div class="advance-search-btn-on-mobile-mode q-mx-lg q-mb-md">
          <q-btn outline
                 class="full-width advance-search-btn-text"
                 color="primary"
                 label="جستجوی پیشرفته"
                 icon-right="mdi-feature-search-outline"
                 @click="advanceSearchModal = true" />
        </div>
        <q-dialog v-model="advanceSearchModal"
                  persistent>
          <q-card class="modal-container">
            <div class="modal-content">
              <q-card-section class="row justify-between">
                <div class="advance-search-modal-title">
                  جستجوی پیشرفته
                </div>
                <div class="btn-box">
                  <q-btn v-close-popup
                         unelevated
                         class="q-mr-sm"
                         color="primary"
                         data-dismiss="modal"
                         @click="applyFilter=true">
                    اعمال فیلتر
                  </q-btn>
                  <q-btn v-close-popup
                         flat
                         color="red"
                         outline
                         icon-right="mdi-close"
                         label="بستن" />
                </div>
              </q-card-section>
              <q-card-section>
                <side-bar-content ref="sideBar"
                                  v-model:selectedTags="selectedTags"
                                  :contentFilterData="contentSearchFilterData"
                                  :mobileMode="mobileMode"
                                  :applyFilter="applyFilter"
                                  :loading="searchLoading"
                                  @update:selectedTags="onFilterChange" />
              </q-card-section>
              <q-card-actions>
                <q-btn v-close-popup
                       unelevated
                       color="primary"
                       class="q-mx-sm"
                       @click="applyFilter=true">
                  اعمال فیلتر
                </q-btn>
                <q-btn v-close-popup
                       color="red"
                       outline
                       icon-right="mdi-close"
                       label="بستن"
                       flat />
              </q-card-actions>
            </div>
          </q-card>

        </q-dialog>
      </div>
      <div v-if="!mobileMode"
           class="col-md-3 col-sm-0">
        <sticky-both-sides :top-gap="70"
                           :bottom-gap="20"
                           :max-width="1024">
          <side-bar-content ref="sideBar"
                            v-model:selectedTags="selectedTags"
                            :contentFilterData="contentSearchFilterData"
                            :mobileMode="mobileMode"
                            :applyFilter="applyFilter"
                            :loading="searchLoading"
                            @update:selectedTags="onFilterChange" />
        </sticky-both-sides>
      </div>
      <div class="col-md-9 col-sm-12 content-list">
        <div class="content">
          <div class="tag-loading-container">
            <div class="tags-chip-group-wrapper">
              <div v-if="selectedTags.length > 0"
                   class="flex q-mr-lg-md q-ml-lg-sm">
                <p class="tags-title">
                  تگ‌ها :
                </p>
                <div class=" tag-container">
                  <q-chip v-for="(tag,index) in selectedTags"
                          :key="index"
                          outlined
                          removable
                          outline
                          color="primary"
                          class="q-ml-sm"
                          @remove="removeTags(tag)">
                    {{ tag.title }}
                  </q-chip>
                </div>
              </div>
            </div>
            <div v-if="noData"
                 class="alert alert-warning alert-dismissible fade show error-alert"
                 role="alert">
              <strong>متاسفیم!</strong>با توجه به خواسته شما موردی یافت نشد.
            </div>
          </div>
          <div class="">
            <div class="q-mb-sm">
              <q-virtual-scroll v-slot="{ item, index }"
                                :items="sets.list"
                                virtual-scroll-horizontal
                                class="set-container"
                                @virtual-scroll="scrollMoved">
                <div :key="index"
                     class="q-mr-sm">
                  <div v-if="searchLoading">
                    <div v-if="item.type === 'loading' && setLoading">
                      <q-spinner-dots color="primary"
                                      size="40px" />
                    </div>
                  </div>
                  <div v-else>
                    <set-item :data="item" />
                  </div>
                </div>
              </q-virtual-scroll>
            </div>
            <div class="searchResult">
              <div class="listType">
                <q-infinite-scroll ref="contentAndProductList"
                                   :offset="2000"
                                   @load="chargeProductAndContentList">
                  <specifer-type v-for="(item, index) in productAndContentList"
                                 :key="index"
                                 :info="item" />
                  <template v-if="searchLoading"
                            v-slot:loading>
                    <div class="row justify-center q-my-md">
                      <q-spinner-dots color="primary"
                                      size="40px" />
                    </div>
                  </template>
                </q-infinite-scroll>
                <div v-if="canSendVideoReq || canSendProductReq"
                     class="scroll-loader" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { SetList } from 'src/models/Set.js'
import { ProductList } from 'src/models/Product.js'
import { ContentList } from 'src/models/Content.js'
import FilterData from 'src/assets/js/contentSearchFilterData.js'
import StickyBothSides from 'src/components/Utils/StickyBothSides.vue'
import SetItem from 'src/components/Widgets/Content/Search/ContentSearch/components/SetItem.vue'
import SideBarContent from 'src/components/Widgets/Content/Search/SideBarContent/SideBarContent.vue'
import SpeciferType from 'src/components/Widgets/Content/Search/ContentSearch/components/SpeciferType.vue'

export default {
  name: 'ContentSearch',
  components: {
    SetItem,
    SpeciferType,
    StickyBothSides,
    SideBarContent
  },
  provide() {
    return {
      scrollInfo: computed(() => this.scrollInfo)
    }
  },
  data: () => ({
    scrollInfo: null,
    setLoading: false,
    advanceSearchModal: false,
    slider: null,
    stopReq: true,
    sets: new SetList(),
    products: new ProductList(),
    contents: new ContentList(),
    productAndContentList: [],
    contentSearchFilterData: {},
    canSendVideoReq: true,
    canSendProductReq: true,
    canSendSetsReq: true,
    searchLoading: false,
    new_url: '',
    selectedTags: [],
    q_param: [],
    sizeOfScreen: null,
    applyFilter: false,
    backData: null,
    contentSearchApi: null
  }),
  computed: {
    noData () {
      return !this.canSendSetsReq && !this.canSendVideoReq && !this.canSendProductReq && this.sets.list.length === 0 && this.productAndContentList.length === 0
    },
    mobileMode () {
      return this.$store.getters['AppLayout/windowSize'].x <= 1024
    }
  },
  watch: {
    $route: {
      handler () {
        this.setContentSearch()
      },
      deep: true
    }
  },
  created () {
    this.setInitData()
    // this.setContentSearch()
  },
  mounted () {
    this.setContentSearch()
    // if (!this.mobileMode) {
    //   this.setSideBarSticky()
    // }
  },
  methods: {
    setContentSearch () {
      this.convertFilterData()
      this.getUrlParams()
      this.updateNewUrl()
      this.getPageData()
      if (this.$refs.contentAndProductList) {
        this.onFilterChange()
      }
    },

    setInitData () {
      this.contentSearchApi = this.$apiGateway.content.APIAdresses.search
      this.backData = FilterData
    },

    getSearchUrl () {
      this.getUrlParams()
      this.updateNewUrl()
      let url = this.contentSearchApi
      if (this.new_url && this.new_url.length > 2) {
        url = url.concat(this.new_url)
      }

      return url
    },

    getPageData () {
      const url = this.getSearchUrl()
      this.searchLoading = true
      this.$apiV2.get(url)
        .then(res => {
          const sets = res.data.data.sets
          const products = res.data.data.products
          const videos = res.data.data.videos
          this.loadSets(sets)
          const arr = [{ count: 4, key: 'contents', response: videos }, { count: 1, key: 'products', response: products }]
          arr.forEach((data) => {
            const responseData = data.response
            let oldList = {}
            if (data.key === 'products') {
              oldList = this.products
            }
            if (data.key === 'contents') {
              oldList = this.contents
            }
            if (responseData === null) {
              if (data.key === 'contents') this.canSendVideoReq = false
              else this.canSendProductReq = false
            }
            this.loadItemFromResponse(responseData, oldList, data.key)
            this.resetLists(data, oldList)
          })
          this.stopReq = false
          this.searchLoading = false
        })
        .catch(() => {
          this.stopReq = false
          this.searchLoading = false
        }
        )
    },

    setSideBarSticky () {
      // this.slider = new StickySidebar('.sidebar', {
      //   topSpacing: 100,
      //   bottomSpacing: 0,
      //   resizeSensor: true,
      //   containerSelector: '.main-content',
      //   innerWrapperSelector: '.sidebar__inner'
      // })
    },

    scrollMoved (data) {
      if (data.direction === 'decrease') return
      const lastElementIndex = data.ref.items.length - 1
      const currentElementIndex = data.index
      if (currentElementIndex === lastElementIndex && !this.setLoading && this.canSendSetsReq) {
        // this.loadMoreData()
        this.chargeSet()
      }
    },

    convertFilterData () {
      this.contentSearchFilterData = {
        nezam: {
          options: [],
          isSearchable: false,
          title: 'نظام آموزشی'
        },
        allMaghta: {
          options: [],
          isSearchable: false,
          title: 'مقطع'
        },
        major: {
          options: [],
          isSearchable: false,
          title: 'رشته'
        },
        allLessons: {
          options: [],
          isSearchable: true,
          title: 'درس'
        },
        lessonTeacher: {
          options: [],
          isSearchable: true,
          title: 'دبیران'
        }
      }
      const keyArray = ['nezam', 'allMaghta', 'major', 'allLessons', 'lessonTeacher']
      keyArray.forEach((key) => {
        if (key === 'lessonTeacher') {
          this.backData[key]['همه_دروس'].forEach((item, index) => {
            this.contentSearchFilterData[key].options.push(
              {
                active: false,
                value: item.value,
                title: item.firstName,
                order: index
              }
            )
          })
        } else {
          this.backData[key].forEach((item, index) => {
            this.contentSearchFilterData[key].options.push(
              {
                active: false,
                value: item.value,
                title: item.name,
                order: index
              }
            )
          })
        }
      })
    },

    getNormalizedQueryTags () {
      let tags = []
      const routQuery = this.$route.query['tags[]']
      if (Array.isArray(routQuery)) {
        tags = routQuery
      } else if (typeof routQuery === 'string') {
        tags.push(routQuery)
      } else {
        tags = []
      }

      return tags
    },

    getUrlParams () {
      this.selectedTags = this.getNormalizedQueryTags().map(item => {
        return {
          active: true,
          value: item,
          title: item.replace('_', ' '),
          order: 1
        }
      })
    },

    onFilterChange () {
      this.searchLoading = true
      this.setTagsOnAddressBare()
      this.updateNewUrl()
      this.resetPageContent()
    },

    setTagsOnAddressBare () {
      const tags = {
        'tags[]': this.selectedTags.map(item => item.value)
      }
      this.$router.push({ name: 'Public.Content.Search', query: tags })
    },

    updateNewUrl (fresh = false) {
      const tags = []
      this.selectedTags.forEach((tag) => {
        tags.push('tags[]=' + encodeURIComponent(tag.value))
      })
      this.new_url = '?' + tags.join('&')
    },

    resetPageContent () {
      this.clearPageContent()
      this.$refs.contentAndProductList.trigger()
      this.chargeSet()
    },

    clearPageContent () {
      this.products = new ProductList()
      this.contents = new ContentList()
      this.sets = new SetList()
      this.applyFilter = false
      this.canSendVideoReq = true
      this.canSendProductReq = true
      this.canSendSetsReq = true
      this.productAndContentList = []
    },

    removeTags (tag) {
      this.searchLoading = true
      this.updateSelectedTags(tag)
      this.setTagsOnAddressBare()
      this.updateNewUrl()
      this.resetPageContent()
    },

    updateSelectedTags (tag) {
      tag.active = false
      this.selectedTags = this.selectedTags.filter(tag => tag.active)
    },

    async chargeSet () {
      try {
        const data = await this.getItems(this.sets, 'sets')
        if (data) this.loadSets(data)
        else this.canSendSetsReq = false
        this.searchLoading = false
      } catch (err) {
        this.searchLoading = false
      }
    },

    loadSets (data) {
      if (!data) {
        return
      }
      data.data.forEach(responseItem => {
        this.sets.list.unshift(responseItem)
        // const lastElementIndex = this.sets.list.length - 1
        // this.sets.list[lastElementIndex][type] = 'loading'
        this.$nextTick(() => {
          // if (window?.imageObserver) window.imageObserver.observe()
        })
      })
      this.sets.paginate = { links: data.links, meta: data.meta }
      // this.loadItemFromResponse(data, this.sets, 'sets')
      if (data.data.length < 20) {
        this.$nextTick(() => {
          this.canSendSetsReq = false
        })
      }
    },

    loadNewProductAndContent (index, done) {
      // if (!this.searchLoading) {
      //   return
      // }
      this.chargeProductAndContentList(index, done)
    },

    chargeProductAndContentList (index, done) {
      const promises = []
      if (this.canSendVideoReq) {
        const contentsPromise = this.chargeItems(this.contents, 'contents', 4)
        promises.push(contentsPromise)
      }
      if (this.canSendProductReq) {
        const productsPromise = this.chargeItems(this.products, 'products', 1)
        promises.push(productsPromise)
      }
      const that = this
      Promise.all(promises)
        .then((responseDataArray) => {
          this.searchLoading = false
          done()
          responseDataArray.forEach((data) => {
            const responseData = data.response
            let oldList = {}
            if (data.key === 'products') {
              oldList = that.products
            }
            if (data.key === 'contents') {
              oldList = that.contents
            }
            if (responseData === null) {
              if (data.key === 'contents') this.canSendVideoReq = false
              else this.canSendProductReq = false
            }
            that.loadItemFromResponse(responseData, oldList, data.key)
            that.resetLists(data, oldList)
          })
        })
        .catch(() => {
          this.searchLoading = false
        })
    },

    resetLists (data, oldList) {
      let count = data.count
      if (data.status && data.status === 'noMorePage' && oldList.list.length < count) {
        count = oldList.list.length
        if (count === 0) {
          if (data.key === 'contents') this.canSendVideoReq = false
          else this.canSendProductReq = false
          return
        }
      }
      const sample = JSON.parse(JSON.stringify(oldList.list))
      sample.splice(count)
      sample.forEach(item => this.productAndContentList.push(item))
      oldList.list.splice(0, count)
      this.$nextTick(() => {
        // if (window?.imageObserver) window.imageObserver.observe()
      })
    },

    chargeItems (items, key, count) {
      return new Promise((resolve, reject) => {
        const remainCount = items.list.length

        if (items.paginate && items.paginate.links && items.paginate.links.prev && !items.paginate.links.next) {
          resolve({ status: 'noMorePage', key, count })
          return
        }
        if (remainCount > (count + 1)) {
          resolve({ status: 'remainCount > 10', key, count })
          return
        }
        this.getItems(items, key)
          .then(response => {
            resolve({ response, count, key })
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getItems (items, key) {
      let url = this.getSearchUrl()
      if (items.paginate && items.paginate.links.next) {
        url = items.paginate.links.next
      }
      const that = this
      return new Promise(function (resolve, reject) {
        that.$axios.get(url)
          .then(response => {
            const responseData = response.data.data
            let newKey = key
            if (key === 'contents') {
              newKey = 'videos'
            }
            resolve(responseData[newKey])
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    loadItemFromResponse (response, data, key) {
      if (!response) {
        return
      }
      response.data.forEach(responseItem => {
        responseItem.type = key
        data.addItem(responseItem)
      })
      data.paginate = { links: response.links, meta: response.meta }
    },

    onScroll(info) {
      this.scrollInfo = info
    }
  }
}
</script>

<style lang="scss" scoped>
.content-search-vue{
  .content-list{
    @media screen and  (width <= 599px){
      max-width: 100%;
    }
  }

  padding-top: 30px;

  .tags-title{
    font-size: 18px;
    font-weight: 500;

    @media only screen and (width <= 1024px){
      font-size: 16px;
    }
  }

  .modal-container{
    border-radius: 15px;
  }

  .tag-container{
    max-width: 90%;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
  }

  .mobile-mode{
    .advance-search-btn-text{
      font-size: 16px;
      font-weight: 500;
    }

    .modal-content{
      .advance-search-modal-title{
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  .set-container{
    padding-bottom: 10px;

    @media only screen and (width <= 599px){
      //width: calc(100vw - 30px);
    }
  }

}

</style>

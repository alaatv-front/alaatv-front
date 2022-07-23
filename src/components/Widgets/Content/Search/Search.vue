<template>
  <div class="content-search-vue"
  >
    <div class="row  main-content content-body">
      <q-resize-observer @resize="onResize" />
      <!--      <div class="mobile-modeeeee">-->
      <!--        <div class="modal-side-bar"-->
      <!--             v-if="mobileMode"-->
      <!--        >-->
      <!--          <div-->
      <!--            class="advance-search"-->
      <!--          >-->
      <!--            <button-->
      <!--              type="button"-->
      <!--              class="btn"-->
      <!--              data-toggle="modal"-->
      <!--              data-target="#sideBarModal"-->
      <!--            >-->
      <!--              <span>جستوجوی پیشرفته</span>-->
      <!--              <i class="fa fa-sliders-h m--padding-left-5" />-->
      <!--            </button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div  class="side-bar-mobile-mode"-->
      <!--              v-if="mobileMode"-->
      <!--        >-->
      <!--          <div-->
      <!--            class="modal"-->
      <!--            id="sideBarModal"-->
      <!--            :tabindex="-1"-->
      <!--            role="dialog"-->
      <!--            aria-labelledby="exampleModalLongTitle"-->
      <!--            aria-hidden="true"-->
      <!--          >-->
      <!--            <div-->
      <!--              class="modal-dialog"-->
      <!--              role="document"-->
      <!--            >-->
      <!--              <div class="modal-content">-->
      <!--                <div class="modal-header">-->
      <!--                  <h2-->
      <!--                    class="modal-title"-->
      <!--                    id="exampleModalLongTitle">-->
      <!--                    جستوجوی پیشرفته-->
      <!--                  </h2>-->
      <!--                  <div class="btn-box">-->
      <!--                    <button type="button"-->
      <!--                            class="filter-btn"-->
      <!--                            data-dismiss="modal"-->
      <!--                            @click="applyFilter=true">-->
      <!--                      اعمال فیلتر-->
      <!--                    </button>-->
      <!--                    <button type="button"-->
      <!--                            class="close"-->
      <!--                            data-dismiss="modal"-->
      <!--                            aria-label="Close" />-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--                <div class="modal-body">-->
      <!--                  <vue-sticky-sidebar-->
      <!--                    class="sidebar"-->
      <!--                    containerSelector=".container"-->
      <!--                    innerWrapperSelector='.sidebar__inner'-->
      <!--                  >-->
      <!--                    <side-bar-->
      <!--                      :contentFilterData="contentSearchFilterData"-->
      <!--                      :mobileMode="mobileMode"-->
      <!--                      :applyFilter="applyFilter"-->
      <!--                      @filter="filterData"-->
      <!--                      :key="sideBarKey"-->
      <!--                      ref="sideBar"-->
      <!--                    />-->
      <!--                  </vue-sticky-sidebar>-->
      <!--                </div>-->
      <!--                <div class="modal-footer">-->
      <!--                  <button type="button"-->
      <!--                          class="close-btn"-->
      <!--                          data-dismiss="modal">بستن</button>-->
      <!--                  <button type="button"-->
      <!--                          class="filter-btn"-->
      <!--                          data-dismiss="modal"-->
      <!--                          @click="applyFilter=true">اعمال فیلتر</button>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="col-2 q-pr-lg">
        <div class="sidebar">
          <div class="sidebar__inner">
            <side-bar-content
              :contentFilterData="contentSearchFilterData"
              @filter="filterData"
              :mobileMode="mobileMode"
              :applyFilter="applyFilter"
              :key="sideBarKey"
              :loading="searchLoading"
              ref="sideBar"
            />
          </div>
        </div>
      </div>
      <div class="col-10 content-list">
        <div class="content">
          <div class="tag-loading-container">
            <div class="tags-chip-group-wrapper">
              <div
                class="tags-chip-group"
                :class="mobileMode?'tags-chip-group-mobile': ''"
                v-if="selectedFields.length > 0"
              >
                <p class="tags-title">
                  تگ‌ها :
                </p>
                <q-chip
                  v-for="(field,index) in selectedFields"
                  :key="index"
                  close
                  color="#ff8f00"
                  label
                  dir="ltr"
                  outlined
                  @click:close="closeField(field)"
                  class="ma-2"
                >
                  {{ field.title }}
                </q-chip>
              </div>
            </div>
            <div
              v-if="noData"
              class="alert alert-warning alert-dismissible fade show error-alert"
              role="alert"
            >
              <strong>متاسفیم!</strong>با توجه به خواسته شما موردی یافت نشد.
              <button type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div>
            <div
              class=" horizontal-scroller q-mb-sm">
              <q-virtual-scroll
                :items="sets.list"
                virtual-scroll-horizontal
                v-slot="{ item, index }"
                @virtual-scroll="scrollMoved"
              >
                <div
                  :key="index"
                  class="set q-mr-sm"
                >
                  <div v-if="item.type === 'loading' && setLoading">
                    <q-spinner-dots color="primary"
                                    size="40px" />
                  </div>
                  <div v-else>
                    <set-item :data="item" />
                  </div>
                </div>
              </q-virtual-scroll>
              <div
                class="scroll-loader"
                v-if="canSendSetsReq"
              >
              </div>
            </div>
            <div class="vertical-scroller searchResult">
              <div class="listType">
                <q-infinite-scroll @load="chargeProductAndContentList"
                                   :offset="250">
                  <specifer-type
                    v-for="(item, index) in productAndContentList"
                    :key="index"
                    :info="item"
                  />
                  <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                      <q-spinner-dots color="primary"
                                      size="40px" />
                    </div>
                  </template>
                </q-infinite-scroll>
                <div class="scroll-loader"
                     v-if="canSendVideoReq || canSendProductReq"
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StickySidebar from 'sticky-sidebar'
import SpeciferType from 'src/components/Widgets/Content/Search/SpeciferType'
import SideBarContent from 'src/components/Widgets/Content/Search/SideBarContent'
import SetItem from 'src/components/Widgets/Content/Search/SetItem'
import { ContentList } from 'src/models/Content'
import { ProductList } from 'src/models/Product'
import { SetList } from 'src/models/Set'
import Addresses from 'src/api/Addresses'
import FilterData from 'src/assets/js/contentSearchFilterData'

export default {
  name: 'Search',
  components: {
    SetItem,
    SpeciferType,
    SideBarContent
  },
  data: () => ({
    setLoading: false,
    slider: null,
    heavyList: [{ type: 'loading' }],
    items: [{}],

    stopReq: true,
    sets: new SetList([{ type: 'loading' }]),
    products: new ProductList(),
    contents: new ContentList(),
    sideBarKey: 0,
    selectedFields: [],
    productAndContentList: [],
    contentSearchFilterData: {},
    canSendVideoReq: true,
    canSendProductReq: true,
    canSendSetsReq: true,
    searchLoading: false,
    new_url: '',
    tags_params: [],
    q_param: [],
    sizeOfScreen: null,
    mobileMode: false,
    applyFilter: false,
    backData: null,
    contentSearchApi: null,
    window: {
      width: 0
    }
  }),
  computed: {
    noData () {
      return !this.canSendSetsReq && !this.canSendVideoReq && !this.canSendProductReq && this.sets.list.length === 0 && this.productAndContentList.length === 0
    }
  },
  created () {
    this.setInitData()
    this.convertFilterData()
    this.getUrlParams()
    this.$nextTick(() => {
      this.getPageData()
    })
  },
  mounted () {
    // this.onResize()
    this.setSideBarSticky()
    this.addEventListenerToSearchBar()
    console.log('url :', Addresses.content.search)
  },
  methods: {
    setInitData () {
      this.contentSearchApi = Addresses.content.search
      this.backData = FilterData
    },
    addEventListenerToSearchBar () {
      const forms = document.getElementsByClassName('m-list-search__form')
      if (forms && forms.length > 0) {
        const formsArr = [forms[0], forms[1]]
        formsArr.forEach(form => {
          form.addEventListener('submit', (e) => {
            const inputValue = e.target[0].value
            e.preventDefault()
            this.getValueOfSearchInput(inputValue)
          })
        })
      }
    },

    getPageData () {
      console.log('getPageData :')
      let url = this.contentSearchApi
      if (this.new_url && this.new_url.length > 2) {
        url = url.concat(this.new_url)
      }
      this.searchLoading = true
      const that = this
      that.$axios.get(url)
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
          this.stopReq = false
          this.searchLoading = false
        })
        .catch(() => {
          this.stopReq = false
          this.searchLoading = false
        }
        )
    },

    onResize (size) {
      this.mobileMode = size.width <= 1024
    },

    setSideBarSticky () {
      this.slider = new StickySidebar('.sidebar', {
        topSpacing: 100,
        bottomSpacing: 0,
        resizeSensor: true,
        containerSelector: '.main-content',
        innerWrapperSelector: '.sidebar__inner'
      })
    },

    scrollMoved (data) {
      if (data.direction === 'decrease') return
      const lastElementIndex = data.ref.items.length - 1
      const currentElementIndex = data.index
      if (currentElementIndex === lastElementIndex && !this.setLoading) {
        // this.loadMoreData()
        this.chargeSet()
        // console.log('load more----------------------------------------------------------------')
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
                value: item.value,
                title: item.name,
                order: index
              }
            )
          })
        }
      })
    },

    getUrlParams () {
      let urlParams = window.location.search
      console.log('urlParams :', urlParams)
      urlParams = urlParams.slice(1) // delete ? from first of url
      const arr = urlParams.split('&')
      const urlParamsArr = []
      arr.forEach((item, index) => {
        urlParamsArr[index] = {
          key: item.split('=')[0],
          value: item.split('=')[1]
        }
      })
      const tags = []
      urlParamsArr.forEach(item => {
        if (item.key === 'tags[]') {
          tags.push(decodeURIComponent(item.value))
        } else if (item.key === 'q') {
          this.q_param[0] = {
            key: 'q',
            value: item.value
          }
        }
      })
      this.getTags(tags)

      // --------------------------------- for test -------------------------------------------------------------------------------

      // let urlParams = '?tags[]=نظام_آموزشی_جدید&tags[]=هفتم&q=کنکور&tags[]=دهم'
      // let urlParams ='?q=awdawdnawd$#@^%!@#%!@&tags[]=دهم'
      // let urlParams ='?tags[]=نظام_آموزشی_جدید&tags[]=هفتم&q=awdawdnawd$#@^%!@#%!@'
      // let urlParams ='?tags[]=نظام_آموزشی_جدید&tags[]=هفتم'
      // let urlParams ='?q=awdawdnawd$#@^%!@#%!@'

      // --------------------------------- for test -------------------------------------------------------------------------------
    },

    filterData (data) {
      this.searchLoading = true
      this.selectedFields = []
      this.tags_params = []
      if (data) {
        this.searchLoading = true
        data.forEach((item, index) => {
          this.tags_params[index] = {
            key: 'tags[]',
            value: encodeURIComponent(item.value)
          }
          this.selectedFields.push(item)
          this.setChangesOnData(item)
        })
      }
      this.pushUrl()
      this.resetPageContent()
    },

    getValueOfSearchInput (text) {
      if (text) {
        this.q_param[0] = {
          key: 'q',
          value: encodeURIComponent(text)
        }
      } else {
        this.q_param = []
      }
      this.pushUrl()
      this.resetPageContent()
    },

    getTags (tags) {
      tags.forEach(item => {
        this.setChangesOnData({ value: item, active: true })
      })
      this.sideBarKey++
    },

    handleResize () {
      this.window.width = window.innerWidth
      this.mobileMode = this.window.width <= 1024
    },

    pushUrl () {
      const finalArray = this.tags_params.concat(this.q_param)
      const er_url = []
      const er_request = []
      let params_url = ''
      finalArray.forEach((item, index) => {
        er_url[index] = item.key.concat('=', decodeURIComponent(item.value))
        er_request[index] = item.key.concat('=', item.value)
      })
      params_url = '?' + er_url.join('&')
      this.new_url = '?' + er_request.join('&')
      if (params_url === '?') params_url = 'c'
      window.history.pushState({}, '', params_url)
    },

    resetPageContent () {
      this.products = new ProductList()
      this.contents = new ContentList()
      this.sets = new SetList([{ type: 'loading' }])
      this.applyFilter = false
      this.canSendVideoReq = true
      this.canSendProductReq = true
      this.canSendSetsReq = true
      this.productAndContentList = []
    },

    closeField (chipData) {
      this.searchLoading = true
      chipData.active = false
      this.setChangesOnData(chipData)
      this.resetPageContent()
      this.sideBarKey++
    },

    setChangesOnData (data) {
      const Arr = ['allLessons', 'lessonTeacher', 'allMaghta', 'nezam', 'major']
      Arr.forEach(name => this.applyItemChanges(name, data))
    },

    applyItemChanges (name, chipData) {
      this.contentSearchFilterData[name].options.forEach(item => {
        if (item.value === chipData.value) {
          item.active = chipData.active
          return true
        }
      })
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
        this.$nextTick(() => {
          if (window.imageObserver) window.imageObserver.observe()
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

    chargeProductAndContentList (index, done) {
      console.log('chargeProductAndContentList ')
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
            this.slider.updateSticky()
          })
        })
        .catch(errors => {
          this.searchLoading = false
          console.log('-------------', errors)
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
        if (window.imageObserver) window.imageObserver.observe()
      })
    },

    chargeItems (items, key, count) {
      const that = this
      return new Promise(function (resolve, reject) {
        const remainCount = items.list.length

        if (items.paginate && items.paginate.links && items.paginate.links.prev && !items.paginate.links.next) {
          resolve({ status: 'noMorePage', key, count })
          return
        }
        if (remainCount > (count + 1)) {
          resolve({ status: 'remainCount > 10', key, count })
          return
        }
        that.getItems(items, key)
          .then(response => {
            resolve({ response, count, key })
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getItems (items, key) {
      let url = this.contentSearchApi
      if (this.new_url && this.new_url.length > 2) {
        url = url.concat(this.new_url)
      }
      if (items.paginate && items.paginate.links.next) {
        url = items.paginate.links.next
      }
      // console.log('url :',url)
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

    loadMoreData () {
      this.setLoading = true
      setTimeout(() => {
        this.setLoading = false
        // console.log(this.heavyList)
        this.heavyList.unshift({}, {}, {}, {}, {}, {}, {})
      }, 2000)
    },

    onLoad (index, done) {
      if (this.items.length > 50) {
        done(true)
        return
      }
      setTimeout(() => {
        this.items.push({}, {}, {}, {}, {}, {}, {})
        this.slider.updateSticky()
        done()
        this.slider.updateSticky()
      }, 100)
    }

  }
}
</script>

<style scoped>
/*@import 'src/css/content-search.scss';*/
.side-bar{
  overflow: scroll;
}
.infinit{
  /*direction: ltr;*/
}
.set-container{
  max-width: 800px;
  overflow-x: scroll;
  max-height: 150px;
  background: #f3cfcf;
}
.test{
}

</style>

<style lang="scss" scoped>
.test2{
  border: 1px green solid;

}
.content-search-vue {
  .modal-side-bar{
    display: none;
    position:fixed;
    right: 0;
    top: 65px;
    z-index: 4;
    @media screen and(max-width: 1024px) {
      display: block;
      width: 100%;
    }
    .advance-search {
      margin: 0 7px;
      .btn{
        font-size: 16px;
        width: 100%;
        border: 2px solid #fd7e14;
        background-color: #fff;
        color:  #fd7e14;
        padding: 15px;
        &:hover {
          background-color: #fd7e14;
          color:  #fff;
        }
      }
    }
  }

  .side-bar-mobile-mode{
    background-color: white;
    .modal{
      .modal-dialog {
        .modal-content {
          .modal-header {
            padding: 20px;
            .modal-title {
              color: #3e5480;
              @media screen and(max-width: 400px) {
                font-size: 14px;
              }
            }
            .btn-box {
              justify-content: space-between;
            }
          }
          .filter-btn {
            font-size: 14px;
            font-weight: 500;
            margin-left: 5px;
            border: 2px solid #fd7e14;
            background-color: #fff;
            color:  #fd7e14;
            padding: 5px 15px;
            &:hover {
              background-color: #fd7e14;
              color:  #fff;
            }
            @media screen and(max-width: 400px) {
              font-size: 12px;
              padding: 5px 10px;
              font-weight: 300;
            }
          }
          .close-btn{
            background-color: #fff;
            color: #ff0909;
            font-weight: 500;
            padding: 5px 10px;
            &:hover {
              background-color: #ffb9b9;
              color: #ff4343;
            }
          }
        }
      }
    }
  }

  .loading{
    width: 200px;
    .loading-text{
      color: #3e5480;
      font-size: 18px;
      font-weight: 500;
      @media screen and(max-width: 500px) {
        font-size: 14px;
      }
    }
    .spinner {
      width: 70px;
      margin:10px;
      text-align: center;
      div {
        width: 18px;
        height: 18px;
        background-color: #ff9000;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: spinner-loading 1.4s infinite ease-in-out both;
        animation: spinner-loading 1.4s infinite ease-in-out both;
        @media screen and(max-width: 500px) {
          width: 12px;
          height: 12px;
        }
      }
      .dot1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      .dot2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
    }
    @-webkit-keyframes spinner-loading {
      0%, 80%, 100% { -webkit-transform: scale(0) }
      40% { -webkit-transform: scale(1.0) }
    }
    @keyframes spinner-loading {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      } 40% {
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
        }
    }
  }

  .scroll-loader {
    margin: auto;
    .loader {
      color: #3e5480;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .content-body {
    display: flex;
    flex-direction: row;
    @media screen and(max-width: 1024px) {
      flex-direction: column;
    }
    .sticky-search-bar {
      width:25%;
      @media screen and(max-width: 1024px) {
        display: none;
      }
    }
    .content-list {
      //border: 1px solid red;
      width: 74%;
      @media screen and(max-width: 1024px) {
        width: 100%;
      }
      .tags-chip-group-wrapper {
        overflow: auto;
        .tags-chip-group {
          display: flex;
          align-items: center;
          margin-right: 15px;
          margin-top: 10px;
          margin-top: 30px;
          @media screen and(max-width: 767px) {
            margin-right: 0;
          }
          .tags-title{
            margin-bottom: 0;
            font-size: 18px;
            color: #3e5480;
            font-weight: 500;
            @media screen and(max-width: 1024px) {
              min-width: 55px;
            }
            @media screen and(max-width: 500px) {
              font-size: 14px;
            }
          }
        }
      }
      .tags-chip-group-mobile{
        margin-top: 50px;
      }
      .error-alert {
        margin: 5% 10%;
      }
    }
  }
}

.vertical-scroller {
  margin-top: 20px;
}

.horizontal-scroller {
  width: 100%;
  margin-top: 10px;
  display: flex;
  overflow-x: scroll;
  @media screen and(max-width: 1024px) {
    margin-top: 40px;
  }
  .sets{
    margin-left: 10px;
    margin-bottom: 20px;
  }
}
</style>

<style>

@media only screen and (max-width: 1024px) {
  .searchResult .listType .item .content .title {
    width: calc( 100% - 130px );
  }
  .searchResult .listType .item .m-link {
    width: 100%;
  }
  .row {
    margin-left: -5px;
    margin-right: -5px;
  }
}
</style>

<template>
  <div class="row main-content">
    <q-resize-observer @resize="onResize" />
    <div class="col-2">
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
    <div class="col-10">
      <div class="content row">
        <div class="col-11 sets-container">
          <q-virtual-scroll
            :items="heavyList"
            virtual-scroll-horizontal
            v-slot="{ item, index }"
            @virtual-scroll="scrollMoved"
          >
            <div
              :key="index"
              :class="item.class"
              class="set"
            >
              <div v-if="item.type === 'loading' && setLoading">
                <q-spinner-dots color="primary"
                                size="40px" />
              </div>
              <div v-else>
                #{{ index }} - {{ item.label }}
              </div>
            </div>
          </q-virtual-scroll>
        </div>
      </div>
      <div class="row">
        <div class="col-12 product-contents-container">
          <div class="">
            <q-infinite-scroll @load="onLoad"
                               :offset="250">
              <div v-for="(item, index) in items"
                   :key="index"
                   class="caption">

              </div>
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary"
                                  size="40px" />
                </div>
              </template>
            </q-infinite-scroll>
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
import { ContentList } from 'src/models/Content'
import { ProductList } from 'src/models/Product'
import { SetList } from 'src/models/Set'
import Addresses from 'src/api/Addresses'
import FilterData from 'src/assets/js/contentSearchFilterData'

export default {
  name: 'Search',
  components: {
    SpeciferType,
    SideBarContent
  },
  data: () => ({
    setLoading: false,
    slider: null,
    heavyList: [{ type: 'loading' }],
    items: [{}],

    stopReq: true,
    sets: new SetList(),
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
      this.$axios.get(url)
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
        this.loadMoreData()
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
      this.sets = new SetList()
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
        this.sets.list.push(responseItem)
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

    chargeProductAndContentList () {
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
      return new Promise(function (resolve, reject) {
        this.$axios.get(url)
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
.set{
  width: 160px;
  background: #b4edb4;
  margin: 5px
}
.test{
}
.caption{
  background: pink;
  margin: 10px
}
</style>

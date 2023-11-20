<template>
  <div class="my-favorites">
    <div class="lt-sm flex justify-end">
      <q-btn flat
             color="grey"
             :to="{name: 'UserPanel.Dashboard'}">
        <q-icon name="isax:layer"
                class="q-mr-sm" />
        >
      </q-btn>
    </div>
    <div class="row">
      <div class="col-12">
        <q-tabs v-model="activePanel"
                indicator-color="yellow-8"
                align="left">
          <q-tab name="product"
                 label="محصولات" />
          <q-tab name="set"
                 label="مجموعه ها" />
          <q-tab name="content"
                 label="فیلم ها" />
        </q-tabs>
        <q-tab-panels v-model="activePanel"
                      animated
                      transition-prev="jump-down"
                      transition-next="jump-up ">
          <q-tab-panel name="product">
            <template v-if="productFavoreds.loading">
              <q-skeleton type="text" />
            </template>
            <template v-else>
              <div class="search-box q-mb-md">
                <q-input v-model="searchTextIn.products"
                         outlined
                         placeholder="جستجو ..."
                         dense
                         rounded
                         @keydown.enter="searchInProductFavoreds" />
              </div>
              <template v-if="productFavoreds.list.length > 0">
                <div class="row q-col-gutter-md justify-center">
                  <div v-for="favoredItem in productFavoreds.list"
                       :key="favoredItem.id"
                       class="col-12 col-sm-4 col-md-4 product-item">
                    <product-item :options="{
                                    product: favoredItem,
                                    canAddToCart: false ,
                                    showPrice: false,
                                    showBookmark: true
                                  }"
                                  @onBookmarkClicked="getProductFavoreds" />
                  </div>
                </div>
                <div v-if="productPaginationLastPage > 1"
                     class="row">
                  <div class="col flex justify-center">
                    <pagination :meta="productPaginationMeta"
                                :disable="productFavoreds.loading"
                                @updateCurrentPage="getProductFavoreds" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center text-color-primary">
                  <q-icon name="isax:danger"
                          size="100px" />
                  <br>
                  محصولی به علاقه مندی شما اضافه نشده است.
                </div>
              </template>
            </template>
          </q-tab-panel>

          <q-tab-panel name="set">
            <template v-if="setFavoreds.loading">
              <q-skeleton type="text" />
            </template>
            <template v-else>
              <div class="search-box q-mb-md">
                <q-input v-model="searchTextIn.sets"
                         outlined
                         placeholder="جستجو ..."
                         dense
                         rounded
                         @keydown.enter="searchInSetFavoreds" />
              </div>
              <template v-if="setFavoreds.list.length > 0">
                <div class="row q-col-gutter-md justify-center">
                  <div v-for="favoredItem in setFavoreds.list"
                       :key="favoredItem.id"
                       class="col-12 col-sm-6 col-md-4 set-item">
                    <set-item :options="{
                                set: favoredItem,
                                showBookmark: true
                              }"
                              @onBookmarkClicked="getSetFavoreds" />
                  </div>
                </div>
                <div v-if="setPaginationLastPage > 1"
                     class="row">
                  <div class="col flex justify-center">
                    <pagination :meta="setPaginationMeta"
                                :disable="setFavoreds.loading"
                                @updateCurrentPage="getSetFavoreds" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center text-color-primary">
                  <q-icon name="isax:danger"
                          size="100px" />
                  <br>
                  دوره ای به علاقه مندی شما اضافه نشده است.
                </div>
              </template>
            </template>
          </q-tab-panel>

          <q-tab-panel name="content">
            <template v-if="contentFavoreds.loading">
              <q-skeleton type="text" />
            </template>
            <template v-else>
              <div class="search-box q-mb-md">
                <q-input v-model="searchTextIn.contents"
                         outlined
                         placeholder="جستجو ..."
                         dense
                         rounded
                         @keydown.enter="searchInContentFavoreds" />
              </div>
              <template v-if="contentFavoreds.list.length > 0">
                <div class="row q-col-gutter-md justify-center">
                  <div v-for="favoredItem in contentFavoreds.list"
                       :key="favoredItem.id"
                       class="col-12 col-sm-6 col-md-4 content-item">
                    <content-item :options="{
                                    content: favoredItem,
                                    showDownloadMenu: true,
                                    showBookmark: true
                                  }"
                                  @onBookmarkClicked="getContentFavoreds" />
                  </div>
                </div>
                <div v-if="contentPaginationLastPage > 1"
                     class="row">
                  <div class="col flex justify-center">
                    <pagination :meta="contentPaginationMeta"
                                :disable="contentFavoreds.loading"
                                @updateCurrentPage="getContentFavoreds" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center text-color-primary">
                  <q-icon name="isax:danger"
                          size="100px" />
                  <br>
                  محتوایی به علاقه مندی شما اضافه نشده است.
                </div>
              </template>
            </template>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { FavoredList } from 'src/models/Favored'
import SetItem from 'components/Widgets/SetItem/SetItem.vue'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'
import Pagination from 'components/Utils/Pagination.vue'

export default {
  name: 'MyFavorites',
  components: { Pagination, ProductItem, ContentItem, SetItem },
  data: () => ({
    contentPaginationMeta: {
      current_page: 1,
      from: 0,
      last_page: 1,
      links: [],
      path: '',
      per_page: 0,
      to: 0,
      total: 0
    },
    productPaginationMeta: {
      current_page: 1,
      from: 0,
      last_page: 1,
      links: [],
      path: '',
      per_page: 0,
      to: 0,
      total: 0
    },
    setPaginationMeta: {
      current_page: 1,
      from: 0,
      last_page: 1,
      links: [],
      path: '',
      per_page: 0,
      to: 0,
      total: 0
    },
    searchTextIn: {
      products: '',
      sets: '',
      contents: ''
    },
    activePanel: 'product',
    setFavoredsPage: 1,
    contentFavoredsPage: 1,
    productFavoredsPage: 1,
    setFavoredsLastPage: 0,
    setFavoreds: new FavoredList(),
    contentFavoreds: new FavoredList(),
    productFavoreds: new FavoredList()
  }),
  computed: {
    contentPaginationLastPage () {
      return this.contentPaginationMeta.last_page
    },
    productPaginationLastPage () {
      return this.productPaginationMeta.last_page
    },
    setPaginationLastPage () {
      return this.setPaginationMeta.last_page
    }
  },
  mounted () {
    this.getFavoreds()
  },
  methods: {
    searchInContentFavoreds () {
      if (!(this.searchTextIn.contents.length > 0)) {
        this.getContentFavoreds(1)
        return
      }
      this.getContentFavoreds(this.contentFavoredsPage, this.searchTextIn.contents)
    },
    searchInSetFavoreds () {
      if (!(this.searchTextIn.sets.length > 0)) {
        this.getSetFavoreds(1)
        return
      }
      this.getSetFavoreds(this.setFavoredsPage, this.searchTextIn.sets)
    },
    searchInProductFavoreds () {
      if (!(this.searchTextIn.products.length > 0)) {
        this.getProductFavoreds(1)
        return
      }
      this.getProductFavoreds(this.productFavoredsPage, this.searchTextIn.products)
    },
    getFavoreds () {
      this.getSetFavoreds()
      this.getContentFavoreds()
      this.getProductFavoreds()
    },
    getSetFavoreds (page = 1, searchTitle) {
      this.setFavoreds.loading = true
      APIGateway.user.getFavored({
        page,
        type: 'set',
        ...(searchTitle !== undefined && { search: searchTitle })
      })
        .then(({ favoredList, paginate }) => {
          this.setFavoreds = favoredList
          this.setPaginationMeta = paginate
          this.setFavoredsPage = paginate.current_page
          this.setFavoreds.loading = false
        })
        .catch(() => {
          this.setFavoreds.loading = false
        })
    },
    getContentFavoreds (page = 1, searchTitle) {
      this.contentFavoreds.loading = true
      APIGateway.user.getFavored({
        page,
        type: 'content',
        ...(searchTitle !== undefined && { search: searchTitle })
      })
        .then(({ favoredList, paginate }) => {
          this.contentFavoreds = favoredList
          this.contentPaginationMeta = paginate
          this.contentFavoredsPage = paginate.current_page
          this.contentFavoreds.loading = false
        })
        .catch(() => {
          this.contentFavoreds.loading = false
        })
    },
    getProductFavoreds (page = 1, searchTitle) {
      this.productFavoreds.loading = true
      APIGateway.user.getFavored({
        page,
        type: 'product',
        ...(searchTitle !== undefined && { search: searchTitle })
      })
        .then(({ favoredList, paginate }) => {
          this.productFavoreds = favoredList
          this.productPaginationMeta = paginate
          this.productFavoredsPage = paginate.current_page
          this.productFavoreds.loading = false
        })
        .catch(() => {
          this.productFavoreds.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-favorites {
  .q-tab-panels {
    border-radius: 10px;
    box-shadow: 0 6px 5px rgb(0 0 0 / 3%);
  }
}
</style>

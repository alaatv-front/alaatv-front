<template>
  <div class="my-favorites">
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
              <template v-if="productFavoreds.list.length > 0">
                <div class="search-box q-mb-md">
                  <q-input v-model="searchText"
                           outlined
                           placeholder="جستجو ..."
                           dense
                           rounded />
                </div>
                <div class="row q-col-gutter-md">
                  <div v-for="favoredItem in productFavoreds.list"
                       :key="favoredItem.id"
                       class="col-12 col-md-4">
                    <product-item :options="{product: favoredItem.getProduct(), canAddToCart: false}" />
                  </div>
                </div>
                <div v-if="productFavoredsLastPage > 1"
                     class="row">
                  <div class="col flex justify-center">
                    <q-pagination v-model="productFavoredsPage"
                                  :max="productFavoredsLastPage"
                                  :max-pages="6"
                                  boundary-links
                                  icon-first="isax:arrow-left-2"
                                  icon-last="isax:arrow-right-3"
                                  class="gift-card-pagination"
                                  @update:model-value="getProductFavoreds(productFavoredsPage)" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center text-color-primary">
                  <q-icon name="isax-svg:danger"
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
              <template v-if="setFavoreds.list.length > 0">
                <div class="search-box q-mb-md">
                  <q-input v-model="searchText"
                           outlined
                           placeholder="جستجو ..."
                           dense
                           rounded />
                </div>
                <div class="row q-col-gutter-md">
                  <div v-for="favoredItem in setFavoreds.list"
                       :key="favoredItem.id"
                       class="col-12 col-md-4">
                    <set-item :options="{set: favoredItem.getSet()}" />
                  </div>
                </div>
                <div v-if="setFavoredsLastPage > 1"
                     class="row">
                  <div class="col flex justify-center">
                    <q-pagination v-model="setFavoredsPage"
                                  :max="setFavoredsLastPage"
                                  :max-pages="6"
                                  boundary-links
                                  icon-first="isax:arrow-left-2"
                                  icon-last="isax:arrow-right-3"
                                  class="gift-card-pagination"
                                  @update:model-value="getSetFavoreds(setFavoredsPage)" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center text-color-primary">
                  <q-icon name="isax-svg:danger"
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
              <template v-if="contentFavoreds.list.length > 0">
                <div class="search-box q-mb-md">
                  <q-input v-model="searchText"
                           outlined
                           placeholder="جستجو ..."
                           dense
                           rounded />
                </div>
                <div class="row q-col-gutter-md">
                  <div v-for="favoredItem in contentFavoreds.list"
                       :key="favoredItem.id"
                       class="col-12 col-md-4">
                    <content-item :options="{content: favoredItem.getContent()}" />
                  </div>
                </div>
                <div v-if="setFavoredsLastPage > 1"
                     class="row">
                  <div class="col flex justify-center">
                    <q-pagination v-model="contentFavoredsPage"
                                  :max="contentFavoredsLastPage"
                                  :max-pages="6"
                                  boundary-links
                                  icon-first="isax:arrow-left-2"
                                  icon-last="isax:arrow-right-3"
                                  class="gift-card-pagination"
                                  @update:model-value="getContentFavoreds(contentFavoredsPage)" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="text-center text-color-primary">
                  <q-icon name="isax-svg:danger"
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

export default {
  name: 'MyFavorites',
  components: { ProductItem, ContentItem, SetItem },
  data: () => ({
    searchText: '',
    activePanel: 'product',
    setFavoredsPage: 1,
    contentFavoredsPage: 1,
    productFavoredsPage: 1,
    setFavoredsLastPage: 0,
    contentFavoredsLastPage: 0,
    productFavoredsLastPage: 0,
    setFavoreds: new FavoredList(),
    contentFavoreds: new FavoredList(),
    productFavoreds: new FavoredList()
  }),
  mounted() {
    this.getFavoreds()
  },
  methods: {
    getFavoreds () {
      this.getSetFavoreds()
      this.getContentFavoreds()
      this.getProductFavoreds()
    },
    getSetFavoreds (page) {
      this.setFavoreds.loading = true
      APIGateway.user.getFavored({ page, type: 'set' })
        .then(({ favoredList, paginate }) => {
          this.setFavoreds = favoredList
          this.setFavoredsLastPage = paginate.last_page
          this.setFavoreds.loading = false
        })
        .catch(() => {
          this.setFavoreds.loading = false
        })
    },
    getContentFavoreds (page) {
      this.contentFavoreds.loading = true
      APIGateway.user.getFavored({ page, type: 'content' })
        .then(({ favoredList, paginate }) => {
          this.contentFavoreds = favoredList
          this.contentFavoredsLastPage = paginate.last_page
          this.contentFavoreds.loading = false
        })
        .catch(() => {
          this.contentFavoreds.loading = false
        })
    },
    getProductFavoreds (page) {
      this.productFavoreds.loading = true
      APIGateway.user.getFavored({ page, type: 'product' })
        .then(({ favoredList, paginate }) => {
          this.productFavoreds = favoredList
          this.productFavoredsLastPage = paginate.last_page
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

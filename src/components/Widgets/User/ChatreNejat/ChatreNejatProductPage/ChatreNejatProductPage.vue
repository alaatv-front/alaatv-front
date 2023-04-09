<template>
  <div class="product-page">
    <q-list v-if="!setListLoading"
            class="rounded-borders">
      <q-expansion-item v-for="(set, index) in setList"
                        :key="index"
                        v-model="set.expand"
                        header-class="bg-white"
                        separator
                        switch-toggle-side
                        expand-separator
                        @show="getSet(set.id)">
        <template v-slot:header>
          <q-item-section class="set-title">
            <div class="ellipsis set-title-text">
              {{ set.short_title.split('-')[2] }}
            </div>
          </q-item-section>

          <q-item-section side>
            {{set.contents_count}} گام
          </q-item-section>
          <q-item-section side>
            {{set.contents_duration}} دقیقه
          </q-item-section>
        </template>
        <q-separator inset />
        <q-card>
          <q-card-section v-if="!setLoading || set.contents.list.length > 0">
            <q-list class="set-list"
                    separator>
              <q-item v-for="(content, index) in set.contents.list"
                      :key="index"
                      :to="content.isPamphlet() ? '' : { name: 'UserPanel.Asset.ChatreNejat.Content', params: {productId: this.$route.params.productId, setId: set.id, contentId: content.id} }"
                      clickable
                      @click="setSelectedData($event,content,set)">
                <q-item-section avatar>
                  <q-icon color="grey"
                          :name="content.isPamphlet() ? 'description' : content.has_watch ? 'check_circle' : 'play_circle_outline'" />
                </q-item-section>
                <q-item-section class="cursor-pointer content-title"
                                @click="download(content)">
                  <div class="ellipsis content-title-text">
                    {{ content.title }}
                  </div>
                </q-item-section>
                <q-item-section v-if="content.isPamphlet()"
                                side>
                  <q-btn color="primary"
                         label="دانلود"
                         @click="download(content)" />
                </q-item-section>
                <q-item-section v-else
                                side>
                  {{ content.duration === null ? 'مدت ندارد' : content.duration + ' دقیقه' }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section v-else>
            <q-list>
              <q-item v-for="item in 4"
                      :key="item">
                <q-skeleton width="100%"
                            bordered />
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <q-list v-else>
      <q-item v-for="item in 10"
              :key="item">
        <q-skeleton width="100%"
                    bordered />
      </q-item>
    </q-list>
    <q-dialog v-model="productItemDialog">
      <q-card class="custom-card">
        <q-card-section class="flex justify-between items-center">
          <div class="h1">
            شما محصول را خریداری نکرده اید
          </div>
          <q-btn color="primary"
                 icon="close"
                 flat
                 @click="toggleProductItemDialog" />
        </q-card-section>
        <q-card-section class="row items-center">
          <product-item class="product-item"
                        :options="{
                          product: selectedProduct
                        }" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { openURL } from 'quasar'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'ChatreNejatProductPage',
  components: {
    ProductItem
  },
  data() {
    return {
      productItemDialog: false
    }
  },
  computed: {
    selectedTopic() {
      return this.$store.getters['ChatreNejat/selectedTopic']
    },
    setList() {
      return this.$store.getters['ChatreNejat/setList']
        .filter(set => (new RegExp('\\-\\s*' + this.selectedTopic + '\\s*\\-')).test(set.short_title))
        .map(set => {
          set.expand = false
          return set
        })
    },
    setTopicList() {
      return this.$store.getters['ChatreNejat/setTopicList']
    },
    setLoading() {
      return this.$store.getters['ChatreNejat/setLoading']
    },
    setListLoading() {
      return this.$store.getters['ChatreNejat/setListLoading']
    },
    selectedProduct() {
      return this.$store.getters['ChatreNejat/selectedProduct']
    }
  },
  watch: {
    setTopicList(newVal, oldVal) {
      if (!this.selectedTopic) {
        this.$store.dispatch('ChatreNejat/setSelectedTopic', this.setTopicList[0])
      }
    }
  },
  mounted() {
    this.getProductSets(this.$route.params.productId)
    this.getProduct()
  },
  methods: {
    download(content) {
      if (content.can_see === 0) {
        this.toggleProductItemDialog()
      } else if (content.isPamphlet() && content.file !== null && content.file.pamphlet.length > 0) {
        openURL(content.file.pamphlet[0].link)
      }
    },
    toggleProductItemDialog() {
      this.productItemDialog = !this.productItemDialog
    },
    setSelectedData(event, content, set) {
      if (content.isPamphlet()) {
        event.stopPropagation()
      } else {
        this.$store.commit('ChatreNejat/setSelectedContent', content)
        this.$store.commit('ChatreNejat/setSelectedSet', set)
      }
    },
    getProductSets(productId) {
      this.$store.dispatch('ChatreNejat/getSet', productId)
    },
    getSet(setId) {
      this.$store.dispatch('ChatreNejat/updateSet', setId)
    },
    getProduct() {
      this.$store.dispatch('ChatreNejat/getSelectedProduct', this.$route.params.productId)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  width: 318px;
  height: 510px;
}
.product-page {
  width: 100%;
  padding: 50px 170px 170px;
  @media only screen and (max-width: 1450px) {
    padding: 5px;
  }

  &:deep(.q-item) {
    flex-wrap: wrap !important;
  }
  &:deep(.q-expansion-item--expanded) {
    .set-title {
      .set-title-text {
        white-space: normal;
      }
    }
    .content-title {
      max-width: 80%;
      .content-title-text {
      }
    }
  }

  .set-title {
    max-width: 70%;

    .set-title-text {
      max-width: 100%;
    }
  }
  .content-title {
    max-width: 80%;

    .content-title-text {
      max-width: 100%;
    }
  }
}
</style>

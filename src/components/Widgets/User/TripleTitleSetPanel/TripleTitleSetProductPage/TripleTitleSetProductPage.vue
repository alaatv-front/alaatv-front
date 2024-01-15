<template>
  <div class="product-page">
    <q-list v-if="!setListLoading"
            separator>
      <expansion-item-component v-for="(set, index) in setList"
                                :key="index"
                                v-model:modelValue="set.expand"
                                :switch-toggle-side="false"
                                :hasAction="true"
                                :separated="false"
                                :label="set.short_title.split('-')[2]"
                                :grey="false"
                                @show="getSet(set.id)">
        <template v-slot:action>
          <span class="product-set-item-header">{{set.contents_count + ' گام '}}</span> <span>{{set.contents_duration === 0 || set.contents_duration === null ? ' ' : humanizeDuration(set.contents_duration) }}</span>
        </template>
        <q-card>
          <q-card-section v-if="!setLoading || set.contents.list.length > 0"
                          class="set-list-section">
            <q-list class="set-list"
                    separator>
              <q-item v-for="(content, index) in set.contents.list"
                      :key="index"
                      :to="content.isPamphlet() ? '' : { name: 'UserPanel.Asset.TripleTitleSet.Content', params: {productId: this.$route.params.productId, setId: set.id, contentId: content.id} }"
                      clickable
                      @click="setSelectedData($event,content,set)">
                <q-item-section avatar>
                  <q-icon color="grey"
                          :name="content.isPamphlet() ? 'description' : content.has_watch ? 'check_circle' : 'play_circle_outline'" />
                </q-item-section>
                <q-item-section class="content-title ellipsis-2-lines"
                                @click="download(content)">
                  {{ content.title }}
                </q-item-section>
                <q-item-section v-if="content.isPamphlet()"
                                side>
                  <q-btn color="primary"
                         label="دانلود"
                         @click="download(content)" />
                </q-item-section>
                <q-item-section v-else
                                side>
                  {{ content.duration === null || content.duration == 0 ? 'مدت ندارد' : humanizeDuration(content.duration) }}
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

      </expansion-item-component>
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
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import ExpansionItemComponent from 'src/components/Utils/ExpansionItem.vue'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'TripleTitleSetProductPage',
  components: {
    ProductItem,
    ExpansionItemComponent
  },
  mixins: [mixinTripleTitleSet],
  data () {
    return {
      productItemDialog: false
    }
  },
  computed: {
    selectedTopic () {
      return this.$store.getters['TripleTitleSet/selectedTopic']
    },
    setList () {
      return this.$store.getters['TripleTitleSet/setList']
        .filter(set => (new RegExp('\\-\\s*' + this.selectedTopic + '\\s*\\-')).test(set.short_title))
        .map(set => {
          set.expand = false
          return set
        })
    },
    setTopicList () {
      return this.$store.getters['TripleTitleSet/setTopicList']
    },
    setLoading () {
      return this.$store.getters['TripleTitleSet/setLoading']
    },
    setListLoading () {
      return this.$store.getters['TripleTitleSet/setListLoading']
    },
    selectedProduct () {
      return this.$store.getters['TripleTitleSet/selectedProduct']
    }
  },
  watch: {
    setTopicList (newVal, oldVal) {
      if (!this.selectedTopic) {
        this.$store.dispatch('TripleTitleSet/setSelectedTopic', this.setTopicList[0])
      }
    }
  },
  methods: {
    afterAuthenticate () {
      this.getProductSets(this.$route.params.productId)
      this.getProduct()
    },
    humanizeDuration (durationInSeconds) {
      const durationInMinutes = Math.floor(durationInSeconds / 60)
      const houres = Math.floor(durationInMinutes / 60)
      const minutes = durationInMinutes % 60
      if (houres > 0) {
        return houres + ' ساعت و ' + minutes + ' دقیقه'
      }

      return minutes + ' دقیقه'
    },
    download (content) {
      if (content.can_see === 0) {
        this.toggleProductItemDialog()
      } else if (content.isPamphlet() && content.file !== null && content.file.pamphlet.length > 0) {
        openURL(content.file.pamphlet[0].link)
      }
    },
    toggleProductItemDialog () {
      this.productItemDialog = !this.productItemDialog
    },
    setSelectedData (event, content, set) {
      if (content.isPamphlet()) {
        event.stopPropagation()
      } else {
        this.$store.commit('TripleTitleSet/setSelectedContent', content)
        this.$store.commit('TripleTitleSet/setSelectedSet', set)
      }
    },
    getProductSets (productId) {
      this.$store.dispatch('TripleTitleSet/getSet', productId)
    },
    getSet (setId) {
      this.$store.dispatch('TripleTitleSet/updateSet', setId)
    },
    getProduct () {
      this.$store.dispatch('TripleTitleSet/getSelectedProduct', this.$route.params.productId)
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
  max-width: 100%;
  padding: 50px 170px 170px;

  @media only screen and (width <= 1450px) {
    padding: 5px;
  }

  .product-set-item-header {
    margin-right: $space-7;

    @include media-max-width('md') {
      margin-right: $space-3;
    }
  }

  .set-list-section {
    padding: $spacing-none;
  }

  .set-title {
    max-width: 70%;

    .set-title-text {
      max-width: 100%;
    }
  }

  .content-title {

  }
}
</style>

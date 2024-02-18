<template>
  <div class="content-selection-container">
    <div class="row q-col-gutter-md">
      <div class="col-12 inout-col">
        <q-select v-model="localMajor"
                  :options="productTypeOptions"
                  :loading="productTypeLoading"
                  option-label="title"
                  option-value="id"
                  label="رشته" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="localProduct"
                  :options="products.list"
                  :loading="productLoading"
                  :readOnly="products.list.length === 0"
                  label="محصول"
                  option-label="title"
                  option-value="id" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="localTopic"
                  :options="setTopicList"
                  :loading="setListLoading"
                  :readOnly="setTopicList.length === 0"
                  label="سرفصل" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="localSet"
                  :options="setList"
                  :readOnly="setList.length === 0"
                  label="مجموعه"
                  option-label="short_title"
                  option-value="id" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="computedSelectedContentList"
                  :options="contents.list"
                  :loading="contentLoading"
                  label="محتوا"
                  option-label="short_title"
                  option-value="id"
                  multiple
                  counter>
          <template v-slot:selected>
            <q-badge v-if="computedSelectedContentList.length > 0"
                     color="secondary"
                     label=" برای مشاهده محتوا ها دکمه زیر را بزنید" />
            <q-badge v-else
                     color="secondary">محتوایی انتخاب نشده است</q-badge>
          </template>
        </q-select>
        <q-btn v-if="computedSelectedContentList.length > 0"
               color="secondary"
               flat
               label="مشاهده محتوا اهای انتخاب شده"
               @click="toggleDialog" />
        <q-dialog v-model="contentDialog">
          <q-card class="selected-content-list-card">
            <q-card-section class="text-h6 text-center text-dark items-center">
              لیست محتوا های انتحاب شده
            </q-card-section>
            <q-card-section class="row items-center">
              <q-list class="selected-content-list"
                      bordered
                      separator>
                <q-item v-for="(content, index) in computedSelectedContentList"
                        :key="index"
                        class="items-center"
                        clickable>
                  <q-item-section avatar>
                    {{ content.id }}
                  </q-item-section>
                  <q-item-section class="selected-content ellipsis-2-lines">
                    {{ content.short_title || content.title }}
                  </q-item-section>
                  <q-item-section side>
                    <q-btn color="secondary"
                           flat
                           square
                           icon="ph:eye"
                           @click="gotoContent(content.id)" />
                  </q-item-section>
                  <q-item-section side>
                    <q-btn color="secondary"
                           flat
                           square
                           icon="ph:x"
                           @click="deleteContent(index)" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-actions class="q-pa-md"
                            align="right">
              <q-btn v-close-popup
                     flat
                     label="حذف همه"
                     color="negative"
                     @click="deleteAllContents" />
              <q-btn v-close-popup
                     flat
                     label="بستن"
                     color="secondary"
                     @click="toggleDialog" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { openURL } from 'quasar'
import { defineComponent } from 'vue'
import { Set } from 'src/models/Set.js'
import { Major } from 'src/models/Major.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { ContentList } from 'src/models/Content.js'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import { Product, ProductList } from 'src/models/Product.js'

export default defineComponent({
  name: 'TripleTitleSetContentSelection',
  mixins: [mixinTripleTitleSet],
  props: {
    major: {
      type: [Major, Object],
      default: new Major()
    },
    product: {
      type: [Product, Object],
      default: new Product()
    },
    set: {
      type: [Set, Object],
      default: new Set()
    },
    topic: {
      type: String,
      default: null
    },
    selectedContentList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:major', 'update:product', 'update:topic', 'update:set', 'update:selectedContentList'],
  data () {
    return {
      productTypeOptions: [],
      contents: new ContentList(),
      products: new ProductList(),
      contentDialog: false,
      productTypeLoading: false,
      productLoading: false,
      setLoading: false,
      contentLoading: false
    }
  },
  computed: {
    setListLoading () {
      return this.$store.getters['TripleTitleSet/setListLoading']
    },
    setList () {
      const setList = this.$store.getters['TripleTitleSet/setList']
      return setList.filter(set => {
        return set.short_title.includes(this.localTopic)
      })
    },
    computedSelectedContentList: {
      get () {
        return this.selectedContentList || []
      },
      set (value) {
        this.$emit('update:selectedContentList', value)
      }
    },
    localMajor: {
      get () {
        return this.major
      },
      set (value) {
        this.$emit('update:major', value)
      }
    },
    localProduct: {
      get () {
        return this.product
      },
      set (value) {
        this.$emit('update:product', value)
      }
    },
    localSet: {
      get () {
        return this.set
      },
      set (value) {
        this.$emit('update:set', value)
      }
    },
    localTopic: {
      get () {
        return this.topic
      },
      set (value) {
        this.$emit('update:topic', value)
      }
    },
    selectedSet () {
      return this.$store.getters['TripleTitleSet/selectedSet']
    },
    setTopicList () {
      return this.$store.getters['TripleTitleSet/setTopicList']
    }
  },
  watch: {
    localMajor (selectedMajor) {
      this.localProduct = new Product()
      this.productList = new ProductList()
      this.$store.commit('TripleTitleSet/updateSelectedTopic', null)
      if (selectedMajor.id) {
        this.getProducts(selectedMajor.id)
      }
    },
    localProduct (selectedProduct) {
      this.localTopic = null
      this.$store.commit('TripleTitleSet/updateSetList', [])
      this.$store.commit('TripleTitleSet/updateTopicList', [])
      if (selectedProduct.id) {
        this.$store.dispatch('TripleTitleSet/getSet', selectedProduct.id)
      }
    },
    localTopic () {
      this.localSet = new Set()
    },
    localSet (selectedSet) {
      this.contents = new ContentList()
      if (selectedSet.id) {
        this.getSelectedSetContents(selectedSet.id)
      }
    },
    selectedContentList (newValue) {
      this.$emit('update:selectedContentList', newValue)
    }
  },
  mounted () {
    this.setEvent()
    this.$nextTick(() => {
      if (!this.localMajor?.id) {
        this.getProductType()
      }
      if (this.localMajor?.id && !this.localProduct?.id) {
        this.getProducts(this.localMajor.id)
      }
      if (this.localMajor?.id && this.localProduct?.id && !this.localTopic) {
        this.localTopic = null
        this.$store.commit('TripleTitleSet/updateSetList', [])
        this.$store.commit('TripleTitleSet/updateTopicList', [])
        this.$store.dispatch('TripleTitleSet/getSet', this.localProduct.id)
      }
      if (this.localMajor?.id && this.localProduct?.id && this.localTopic && !this.localSet?.id) {
        this.contents = new ContentList()
      }
      if (this.localMajor?.id && this.localProduct?.id && this.localTopic && this.localSet?.id) {
        this.getSelectedSetContents(this.localSet.id)
      }
    })
  },
  methods: {
    toggleDialog () {
      this.contentDialog = !this.contentDialog
    },
    gotoContent (contentID) {
      const contentRoute = this.$router.resolve({ name: 'Public.Content.Show', params: { id: contentID } })
      openURL(contentRoute.href)
    },
    deleteAllContents () {
      this.computedSelectedContentList = []
    },
    deleteContent (index) {
      this.computedSelectedContentList.splice(index, 1)
    },
    getProductType () {
      this.productTypeLoading = true
      APIGateway.events.formBuilder({
        params: ['majors']
      }).then(res => {
        this.productTypeOptions = res.majors
        this.localMajor = res.majors[0]
        this.productTypeLoading = false
      }).catch(() => {
        this.productTypeLoading = false
      })
    },
    getProducts (type) {
      this.productLoading = true
      APIGateway.events.getEventsProducts({
        data: { major_id: type },
        eventId: this.event.id
      }).then(productList => {
        this.products = new ProductList(productList.list)
        this.productLoading = false
      }).catch(() => {
        this.productLoading = false
      })
    },
    getSet (setId) {
      this.setLoading = true
      this.$store.dispatch('TripleTitleSet/updateSet', setId)
        .then(() => {
          this.setLoading = false
        })
        .catch(() => {
          this.setLoading = false
        })
    },
    getSelectedSetContents (setId) {
      this.contentLoading = true
      APIGateway.set.getContents(setId)
        .then(contentList => {
          this.contents = contentList
          this.contentLoading = false
        })
        .catch(() => {
          this.contentLoading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.selected-content-list-card {
  width: 600px;

  .selected-content-list {
    width: 100%;
    max-height: 520px;
    overflow-y: auto;

    .selected-content {
      max-width: 400px;
    }
  }

  @media screen and (max-width: $breakpoint-sm) {
    width: 100%;
  }
}
</style>

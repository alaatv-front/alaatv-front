<template>
  <div class="content-selection-container">
    <div class="row q-col-gutter-md">
      <div class="col-12 inout-col">
        <q-select v-model="productType"
                  :options="productTypeOptions"
                  :loading="productTypeLoading"
                  option-label="title"
                  option-value="id"
                  label="رشته" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="product"
                  :options="products.list"
                  :loading="productLoading"
                  :readOnly="products.list.length === 0"
                  label="محصول"
                  option-label="title"
                  option-value="id" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="topic"
                  :options="setTopicList"
                  :readOnly="setTopicList.length === 0"
                  label="سرفصل" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="set"
                  :options="setList"
                  :readOnly="setList.length === 0"
                  label="مجموعه"
                  option-label="short_title"
                  option-value="id" />
      </div>
      <div class="col-12 inout-col">
        <q-select v-model="computedSelectedContentList"
                  :options="contents.list"
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
                        clickable>
                  <q-item-section avatar>
                    {{ content.id }}
                  </q-item-section>
                  <q-item-section class="selected-content ellipsis-2-lines">
                    {{ content.short_title }}
                  </q-item-section>
                  <q-item-section side>
                    <q-btn color="secondary"
                           flat
                           label="مشاهده"
                           @click="gotoContent(content.id)" />
                  </q-item-section>
                  <q-item-section side>
                    <q-btn color="secondary"
                           flat
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
import { defineComponent } from 'vue'
import { Set } from 'src/models/Set.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { SetSectionList } from 'src/models/SetSection.js'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import { ContentList } from 'src/models/Content.js'
import { Product, ProductList } from 'src/models/Product'
import { openURL } from 'quasar'

export default defineComponent({
  name: 'TripleTitleSetContentSelection',
  mixins: [mixinTripleTitleSet],
  props: {
    selectedContentList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['selectedContentList'],
  data() {
    return {
      productType: {
        id: null,
        name: null,
        selected: false,
        title: null
      },
      productTypeOptions: [],
      contents: new ContentList(),
      topic: null,
      set: new Set(),
      sections: new SetSectionList(),
      product: new Product(),
      products: new ProductList(),
      contentDialog: false,
      productTypeLoading: false,
      productLoading: false
    }
  },
  computed: {
    setList() {
      const setList = this.$store.getters['TripleTitleSet/setList']
      return setList.filter(set => {
        return set.short_title.includes(this.topic)
      })
    },
    computedSelectedContentList: {
      get () {
        return this.selectedContentList
      },
      set (value) {
        this.$emit('update:selectedContentList', value)
      }
    },
    selectedSet() {
      return this.$store.getters['TripleTitleSet/selectedSet']
    },
    setTopicList() {
      return this.$store.getters['TripleTitleSet/setTopicList']
    }
  },
  watch: {
    productType(selectedMajor) {
      this.product = new Product()
      this.productList = new ProductList()
      this.$store.dispatch('TripleTitleSet/updateSelectedTopic', null)
      if (selectedMajor.id) {
        this.getProducts(selectedMajor.id)
      }
    },
    product(selectedProduct) {
      this.topic = null
      this.$store.commit('TripleTitleSet/updateSetList', [])
      this.$store.commit('TripleTitleSet/updateTopicList', [])
      if (selectedProduct.id) {
        this.$store.dispatch('TripleTitleSet/getSet', selectedProduct.id)
      }
    },
    topic() {
      this.set = new Set()
    },
    set(selectedSet) {
      this.contents = new ContentList()
      if (selectedSet.id) {
        this.getSelectedSetContents(selectedSet.id)
      }
    },
    selectedContentList(newValue) {
      this.$emit('update:selectedContentList', newValue)
    }
  },
  mounted() {
    this.getProductType()
  },
  methods: {
    toggleDialog() {
      this.contentDialog = !this.contentDialog
    },
    gotoContent(contentID) {
      const contentRoute = this.$router.resolve({ name: 'Public.Content.Show', params: { id: contentID } })
      openURL(contentRoute.href)
    },
    deleteContent(index) {
      this.computedSelectedContentList.splice(index, 1)
    },
    getProductType() {
      this.productTypeLoading = true
      APIGateway.events.formBuilder({
        params: ['majors']
      }).then(res => {
        this.productTypeOptions = res.majors
        this.productType = res.majors[0]
        this.productTypeLoading = false
      }).catch(() => {
        this.productTypeLoading = false
      })
    },
    getProducts(type) {
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
    getSet(setId) {
      this.$store.dispatch('TripleTitleSet/updateSet', setId)
    },
    getSelectedSetContents (setId) {
      return APIGateway.set.getContents(setId)
        .then(contentList => {
          this.contents = contentList
        })
        .catch(() => {})
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

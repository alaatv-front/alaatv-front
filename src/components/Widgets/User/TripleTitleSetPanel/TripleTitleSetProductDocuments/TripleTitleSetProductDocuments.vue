<template>
  <div class="product-documents">
    <entity-index ref="pamphletIndex"
                  v-model:value="inputs"
                  v-model:table-selected-values="selected"
                  class="orders-list-entity-index"
                  :api="api"
                  :table-selection-mode="selectionMode"
                  :item-indicator-key="'id'"
                  :identifyKey="'id'"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false"
                  :default-layout="false"
                  :table-grid-size="true"
                  @onInputClick="onInputClick($event)">
      <template v-slot:no-entity>
        <div class="flex column items-center q-pa-lg">
          <div class="q-mb-sm">
            <q-avatar size="100px"
                      font-size="52px"
                      color="grey"
                      text-color="white"
                      icon="description" />
          </div>
          <div>حزوه ای وجود نداره!</div>
        </div>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-12 content-col"
             :class="{ 'col-md-4': grid }">
          <q-card class="content-box">
            <q-item class="content-item">
              <q-item-section middle
                              avatar>
                <q-avatar color="white"
                          class="cursor-pointer"
                          text-color="primary"
                          icon="download"
                          @click="downloadPamphlet(inputData.props.row)" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="ellipsis-2-lines cursor-pointer"
                              style="line-height: 22px !important;"
                              @click="downloadPamphlet(inputData.props.row)">{{inputData.props.row.title}}</q-item-label>
              </q-item-section>
              <q-item-section side
                              middle>
                <q-btn color="primary"
                       label="دانلود"
                       @click="downloadPamphlet(inputData.props.row)" />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </entity-index>
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
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'

export default {
  name: 'TripleTitleSetProductDocuments',
  components: {
    EntityIndex,
    ProductItem
  },
  mixins: [mixinTripleTitleSet],
  data () {
    return {
      api: '',
      grid: true,
      selected: [],
      productItemDialog: false,
      selectionMode: 'single',
      tableGridSize: true,
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'productPage'
      },
      table: {
        columns: [
          {
            name: 'short_title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.short_title
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: row => row.id
          }
        ],
        data: []
      },
      inputs: [
        { type: 'input', name: 'search', outlined: true, label: 'جستجو در جزوه ها', placeholder: 'عبارت مورد نظر را وارد کنید', col: 'col-md-3 col-xs-6 align-left q-mt-lg q-ml-lg' },
        { type: 'button', name: 'search-btn', responseKey: 'statement', class: '', icon: 'search', unelevated: true, col: 'col-md-1 col-sm-1 col-xs-1 q-mt-lg q-ml-lg self-end' },
        { type: 'separator', col: 'col-sm-2 col-md-4 col-lg-5 col-xl-6', size: '0' },
        { type: 'button', name: 'toggle', responseKey: 'statement', class: '', icon: 'filter_alt', unelevated: true, col: 'flex-end q-mt-lg q-ml-lg self-end' },
        { type: 'button', name: 'grid', responseKey: 'statement', class: 'grid-btn', icon: 'apps', unelevated: true, col: 'flex-end q-mt-lg q-ml-lg q-sm-xs self-end' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          class: 'entity-filter-box',
          ignoreValue: true,
          value: [
            { type: 'select', name: 'contentset_title', outlined: true, placeholder: ' ', label: 'فصل', col: 'col-md-2 q-mt-lg q-ml-lg', value: null, options: [] },
            { type: 'hidden', name: 'type', value: [1] }
          ]
        }
      ]
    }
  },
  computed: {
    setTopicList () {
      return this.$store.getters['TripleTitleSet/setTopicList']
    },
    selectedTopicInput () {
      return this.inputs.find(x => x.name === 'formBuilderCol').value[0].value
    },
    selectedTopic () {
      return this.$store.getters['TripleTitleSet/selectedTopic']
    },
    selectedProduct () {
      return this.$store.getters['TripleTitleSet/selectedProduct']
    }
  },
  watch: {
    selected (value) {
      this.$emit('selectedUpdated', value)
    },
    selectedTopicInput () {
      this.$refs.pamphletIndex.search()
    },
    setTopicList (value) {
      this.inputs.find(x => x.name === 'formBuilderCol').value[0].options = value
    }
  },
  created () {
    this.api = APIGateway.product.APIAdresses.getContents(this.$route.params.productId)
  },
  methods: {
    afterAuthenticate () {
      this.loadData(this.$route.params.productId)
      this.updateSelectedTopic('...')
    },
    updateSelectedTopic (content) {
      this.$store.commit('TripleTitleSet/updateSelectedTopic', content)
    },
    toggleDialog () {
      this.$emit('toggleDialog')
    },
    setContent (e) {
      this.selected = e
      this.toggleDialog()
    },
    downloadPamphlet (content) {
      if (content.can_see === 0) {
        this.toggleProductItemDialog()
      } else {
        openURL(content.file.pamphlet[0].link)
      }
    },
    toggleProductItemDialog () {
      this.productItemDialog = !this.productItemDialog
    },
    onInputClick (e) {
      if (e.input.name === 'toggle') {
        document.getElementsByClassName('entity-filter-box')[0].classList.toggle('opened')
      }
      if (e.input.name === 'grid') {
        this.grid = !this.grid
      }
      if (e.input.name === 'search-btn') {
        this.$refs.pamphletIndex.search()
      }
    },
    loadData (productId) {
      this.$store.dispatch('TripleTitleSet/getSet', productId)
      this.$store.dispatch('TripleTitleSet/getSelectedProduct', productId)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  width: 318px;
  height: 510px;
}

.grid-btn {
  @media only screen and (width <= 600px) {
    display: none;
  }
}

.product-documents {
  &:deep(.entity-filter-box) {
    display: none;

    &.opened {
      display: flex;
    }
  }

  // this is a piece of shit and must be fixed
  &:deep(.q-table__top) {
    display: none !important;
  }

  &:deep(.q-field__control) {
    background-color: #fff !important;
  }

  &:deep(.grid-btn) {
    @media only screen and (width <= 1024px) {
      display: none;
    }
  }

  .content-col{
    padding: 10px;

    .content-box {
      display: flex;
      width: 100%;
      min-height: 80px;

      .content-item {
        width: 100%;
      }
    }
  }
}
</style>

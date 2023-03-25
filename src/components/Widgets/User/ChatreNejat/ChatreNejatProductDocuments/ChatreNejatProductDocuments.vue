<template>
  <div class="product-documents">
    <entity-index ref="pamphletIndex"
                  v-model:value="inputs"
                  v-model:table-selected-values="selected"
                  class="orders-list-entity-index"
                  :api="$apiGateway.product.APIAdresses.getContents($route.params.productId)"
                  :table-selection-mode="selectionMode"
                  :item-indicator-key="'id'"
                  :identifyKey="'id'"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-search-button="false"
                  :create-route-name="'User.Create'"
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
          <div>محتوایی وجود نداره!</div>
        </div>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-12 content-col"
             :class="{'col-md-4':grid}">
          <q-card class="content-box">
            <q-item class="content-item">
              <q-item-section middle
                              avatar>
                <q-avatar color="white"
                          text-color="primary"
                          icon="download" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="ellipsis-2-lines"
                              style="line-height: 22px !important;">{{inputData.props.row.title}}</q-item-label>
              </q-item-section>
              <q-item-section side
                              middle>
                <q-btn color="primary"
                       label="دانلود"
                       :disable="inputData.props.row.file === null || inputData.props.row.file.pamphlet[0] == null"
                       @click="downloadPamphlet(inputData.props.row.file.pamphlet[0].link)" />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { openURL } from 'quasar'

export default {
  name: 'ChatreNejatProductDocuments',
  components: {
    EntityIndex
  },
  data() {
    return {
      grid: true,
      selected: [],
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
        { type: 'input', name: 'search', outlined: true, label: 'جستجو در جزوه ها', placeholder: 'عبارت مورد نظر را وارد کنید', col: 'col-md-3 align-left q-mt-lg q-ml-lg' },
        { type: 'button', name: 'search-btn', responseKey: 'statement', class: '', icon: 'search', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' },
        { type: 'separator', col: 'col-md-5', size: '0' },
        { type: 'button', name: 'toggle', responseKey: 'statement', class: '', icon: 'filter_alt', unelevated: true, col: 'q-mt-lg q-ml-lg self-end' },
        { type: 'button', name: 'grid', responseKey: 'statement', class: '', icon: 'apps', unelevated: true, col: 'q-mt-lg q-ml-lg self-end' },
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
    setTopicList() {
      return this.$store.getters['ChatreNejat/setTopicList']
    },
    selectedTopicInput() {
      return this.inputs.find(x => x.name === 'formBuilderCol').value[0].value
    },
    selectedTopic() {
      return this.$store.getters['ChatreNejat/selectedTopic']
    }
  },
  watch: {
    selected(value) {
      this.$emit('selectedUpdated', value)
    },
    selectedTopicInput(value) {
      this.$refs.pamphletIndex.search()
    },
    setTopicList(value) {
      this.inputs.find(x => x.name === 'formBuilderCol').value[0].options = value
    },
    selectedTopic (newVal) {
      if (!newVal) {
        return
      }
      this.$router.push({
        name: 'UserPanel.Asset.ChatreNejat.ProductPage',
        params: {
          productId: this.$route.params.productId
        }
      })
    }
  },
  mounted() {
    this.loadData(this.$route.params.productId)
    this.updateSelectedTopic('')
  },
  methods: {
    updateSelectedTopic (content) {
      this.$store.commit('ChatreNejat/updateSelectedTopic', content)
    },
    toggleDialog() {
      this.$emit('toggleDialog')
    },
    setContent(e) {
      this.selected = e
      this.toggleDialog()
    },
    downloadPamphlet(url) {
      openURL(url)
    },
    onInputClick(e) {
      if (e.input.name === 'toggle') {
        document.getElementsByClassName('entity-filter-box')[0].classList.toggle('opened')
      }
      if (e.input.name === 'grid') {
        this.grid = !this.grid
      }
      if (e.input.name === 'search-btn') {
        this.$refs.commentsIndex.search()
      }
    },
    loadData(productId) {
      this.$store.dispatch('ChatreNejat/getSet', productId)
      this.$store.dispatch('ChatreNejat/getSelectedProduct', productId)
    }
  }
}
</script>

<style lang="scss" scoped>
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

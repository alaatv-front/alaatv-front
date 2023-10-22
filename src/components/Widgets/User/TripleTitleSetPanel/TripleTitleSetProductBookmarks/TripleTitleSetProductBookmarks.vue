<template>
  <div class="chatr-bookmarks">
    <entity-index ref="entityIndex"
                  v-model:value="inputs"
                  class="bookmarks-entity-index"
                  show-no-entity-slot
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-expand-button="false"
                  :item-indicator-key="'id'"
                  :default-layout="false"
                  :show-search-button="false"
                  :show-reload-button="false"
                  :table-grid-size="true"
                  @onInputClick="onInputClick($event)">
      <template #entity-index-table-item-cell="{inputData}">
        <div class="q-pa-md col-12 col-sm-6 col-lg-3">
          <content-item :options="{
                          content: inputData.props.row,
                          routeToContent: false,
                          showBookmark:true,
                          showSetTitle: true
                        }"
                        @onBookmarkLoaded="reloadEntity(false)"
                        @click="goToContent($event,inputData.props.row)" />
        </div>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'

export default {
  name: 'TripleTitleSetProductBookmarks',
  components: {
    EntityIndex,
    ContentItem
  },
  mixins: [mixinTripleTitleSet],
  data() {
    return {
      bookmarkClicked: false,
      isFilterBoxHidden: false,
      api: APIGateway.user.APIAdresses.favored,
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      },
      table: {
        columns: [
          {
            name: 'photo',
            required: true,
            label: 'فیلم',
            align: 'left',
            field: row => row.photo
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row
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
        { type: 'hidden', name: 'type', value: 'content' },
        { type: 'hidden', name: 'product_id', value: this.$route.params.productId },
        { type: 'input', name: 'search', outlined: true, label: 'جستجو در نشان شده ها', placeholder: 'عبارت مورد نظر را وارد کنید', col: 'col-md-3 col-xs-6 align-left q-mt-lg q-ml-lg align-left q-mt-lg q-ml-lg' },
        { type: 'button', name: 'search-btn', responseKey: 'statement', class: '', icon: 'search', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' },
        { type: 'separator', col: 'col-sm-2 col-md-4 col-lg-5 col-xl-6', size: '0' },
        { type: 'button', name: 'toggle', responseKey: 'statement', class: '', icon: 'filter_alt', unelevated: true, col: 'col-md-1 q-mt-lg  self-end' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          class: 'entity-filter-box',
          ignoreValue: true,
          value: [
            { type: 'select', name: 'contentset_title', outlined: true, placeholder: ' ', label: 'فصل', col: 'col-6  col-md-4 col-lg-2 col-md-2 q-mt-lg q-ml-lg', value: null, options: [] },
            { type: 'button', name: 'filter-btn', responseKey: 'statement', class: '', label: 'اعمال', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-md self-end' }
          ]
        }
      ]
    }
  },
  computed: {
    setTopicList() {
      return this.$store.getters['TripleTitleSet/setTopicList']
    },
    selectedTopic () {
      return this.$store.getters['TripleTitleSet/selectedTopic']
    },
    selectedTopicList() {
      return this.$store.getters['TripleTitleSet/setTopicList']
    },
    selectedTopicInput() {
      return this.inputs.find(x => x.name === 'formBuilderCol').value[0].value
    }
  },
  watch: {
    selectedTopicList(value) {
      this.inputs.find(x => x.name === 'formBuilderCol').value[0].options = value
    },
    selected(value) {
      this.$emit('selectedUpdated', value)
    }
  },
  methods: {
    afterAuthenticate() {
      const productId = this.$route.params.productId
      if (productId) {
        this.getProductSets(productId)
        this.getProduct(productId)
      }
      this.updateSelectedTopic('...')
    },
    updateSelectedTopic (content) {
      this.$store.commit('TripleTitleSet/updateSelectedTopic', content)
    },
    toggleDialog() {
      this.$emit('toggleDialog')
    },
    onInputClick(e) {
      if (e.input.name === 'toggle') {
        document.getElementsByClassName('entity-filter-box')[0].classList.toggle('opened')
      }
      if (e.input.name === 'search-btn') {
        this.$refs.entityIndex.search()
      }
      if (e.input.name === 'formBuilderCol') {
        this.$refs.entityIndex.search()
      }
    },
    reloadEntity (doRefresh = false) {
      if (doRefresh) {
        this.$refs.entityIndex.refreshAllInputs()
      }
      this.$refs.entityIndex.search()
    },
    getProductSets(productId) {
      this.$store.dispatch('TripleTitleSet/getSet', productId)
    },
    getProduct(productId) {
      this.$store.dispatch('TripleTitleSet/getSelectedProduct', productId)
    },
    goToContent(event, content) {
      if (event.target.localName === 'i' || event.target.localName === 'button') {
        return
      }
      this.$router.push({
        name: 'UserPanel.Asset.TripleTitleSet.Content',
        params: {
          eventName: this.$route.params.eventName,
          productId: this.$route.params.productId,
          setId: content.set.id,
          contentId: content.id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.chatr-bookmarks {
  padding: 16px 16px;
  .content-box {
    cursor: pointer;
    justify-content: center;
    .bookmarks-entity-index {

    }
  }
  @media screen and (max-width: 599px) {
    padding: 0;
  }
  &:deep(.entity-filter-box) {
    display: none;
    &.opened {
      display: flex;
    }
  }
  &:deep(.q-field__control) {
    background-color: #fff !important;
  }
  &:deep(.q-table__top) {
    display: none !important;
  }
  &:deep(.quasar-crud-index-table) {
    padding: 20px 10 !important;
  }
  &:deep(.formBuilder-actionBtn-ActionBtn) {
    padding: 20px;
  }
  &:deep(.q-table--grid .q-table__grid-content) {
    justify-content: center;
  }
}
</style>

<template>
  <div class="chatr-bookmarks q-pa-md">
    <entity-index ref="entityIndex"
                  v-model:value="inputs"
                  class="bookmarks-entity-index"
                  show-no-entity-slot
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :item-indicator-key="'id'"
                  :default-layout="false"
                  :show-search-button="false"
                  :show-reload-button="false"
                  :table-grid-size="true"
                  @onInputClick="onInputClick($event)">
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-6 col-md-9 col-lg-4 content-col q-pa-md">
          <!--          <content-item :options="{content: inputData.props.row}" />-->
          <q-card class="content-box flex">
            <q-img height="200px"
                   class="text-center"
                   :src="inputData.props.row.photo"
                   @click="goToContent(inputData.props.row)" />
            <q-card-section class="row justify-between"
                            style="min-width: 320px;">
              <div class="col-10"
                   @click="goToContent(inputData.props.row)">
                <div>{{ inputData.props.row.set.short_title }}</div>
                <div>{{ inputData.props.row.title }}</div>
              </div>
              <div class="col-2">
                <bookmark v-model:value="inputData.props.row.is_favored"
                          :unfavored-route="$apiGateway.content.APIAdresses.unfavored(inputData.props.row.id)"
                          :favored-route="$apiGateway.content.APIAdresses.favored(inputData.props.row.id)"
                          @onLoad="reloadEntity(false)" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'
import Bookmark from 'components/Bookmark.vue'
// import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'

export default {
  name: 'ProductBookmarks',
  components: {
    Bookmark,
    EntityIndex
    // ContentItem
  },
  data() {
    return {
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
        { type: 'input', name: 'search', outlined: true, label: 'جستجو در یادداشت ها', placeholder: 'عبارت مورد نظر را وارد کنید', col: 'col-md-3 align-left q-mt-lg q-ml-lg' },
        { type: 'button', name: 'search-btn', responseKey: 'statement', class: '', icon: 'search', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' },
        { type: 'separator', col: 'col-md-6', size: '0' },
        { type: 'button', name: 'toggle', responseKey: 'statement', class: '', icon: 'filter_alt', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          class: 'entity-filter-box',
          ignoreValue: true,
          value: [
            { type: 'select', name: 'contentset_title', outlined: true, placeholder: ' ', label: 'فصل', col: 'col-md-2 q-mt-lg q-ml-lg', value: null, options: [] },
            { type: 'button', name: 'filter-btn', responseKey: 'statement', class: '', label: 'اعمال', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' }
          ]
        }
      ]
    }
  },
  computed: {
    setTopicList() {
      return this.$store.getters['ChatreNejat/setTopicList']
    },
    selectedTopic () {
      return this.$store.getters['ChatreNejat/selectedTopic']
    },
    selectedTopicList() {
      return this.$store.getters['ChatreNejat/setTopicList']
    },
    selectedTopicInput() {
      return this.inputs.find(x => x.name === 'formBuilderCol').value[0].value
    }
  },
  watch: {
    selectedTopicList(value) {
      this.inputs.find(x => x.name === 'formBuilderCol').value[0].options = value
    },
    selectedTopic (newVal, oldVal) {
      if (!newVal || newVal === '' || !oldVal || oldVal === '') {
        return null
      }
      this.$router.push({
        name: 'UserPanel.Asset.ChatreNejat.ProductPage',
        params: {
          productId: this.$route.params.productId
        }
      })
    },
    selected(value) {
      this.$emit('selectedUpdated', value)
    }
  },
  mounted() {
    const productId = this.$route.params.productId
    if (productId) {
      this.getProductSets(productId)
      this.getProduct(productId)
    }
    this.updateSelectedTopic('')
  },
  methods: {
    updateSelectedTopic (content) {
      this.$store.commit('ChatreNejat/updateSelectedTopic', content)
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
      this.$store.dispatch('ChatreNejat/getSet', productId)
    },
    getProduct(productId) {
      this.$store.dispatch('ChatreNejat/getSelectedProduct', productId)
    },
    goToContent(content) {
      this.$router.push({
        name: 'UserPanel.Asset.ChatreNejat.Content',
        params: {
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
  .content-box {
    cursor: pointer;
    justify-content: center;
    .bookmarks-entity-index {

    }
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
    padding: 0 !important;
  }
  &:deep(.formBuilder-actionBtn-ActionBtn) {
    padding: 20px;
  }
}
</style>

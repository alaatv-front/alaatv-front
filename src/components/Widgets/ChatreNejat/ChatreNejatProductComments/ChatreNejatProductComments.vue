<template>
  <div class="product-comments">
    <entity-index ref="commentsIndex"
                  v-model:value="inputs"
                  v-model:table-selected-values="selected"
                  class="orders-list-entity-index"
                  :api="$apiGateway.product.APIAdresses.getComments($route.params.productId)"
                  :table-selection-mode="selectionMode"
                  :item-indicator-key="'id'"
                  :identifyKey="'id'"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="'User.Create'"
                  :show-search-button="false"
                  show-no-entity-slot
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
                      icon="comment" />
          </div>
          <div>یادداشتی وجود نداره!</div>
        </div>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-md-4 col-12 content-col">
          <q-card class="content-box"
                  @click="gotoComment(inputData.props.row.id)">
            <q-card-section class="comment-header">
              <q-icon name="description"
                      size="18px"
                      color="grey" />
              <div class="comment-time">
                {{ inputData.props.row.created_at }}
              </div>
            </q-card-section>
            <q-card-section class="ellipsis-3-lines comment-main">
              {{ inputData.props.row.comment }}
            </q-card-section>
            <q-card-section class="ellipsis comment-footer">
              {{ inputData.props.row.set.short_title + ' > ' + inputData.props.row.content.title }}
            </q-card-section>
          </q-card>
        </div>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
export default {
  name: 'ChatreNejatProductComments',
  components: {
    EntityIndex
  },
  data() {
    return {
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
            { type: 'date', name: 'created_at_since', outlined: true, placeholder: 'انتخاب نمایید', value: null, label: 'تاریخ ایجاد شده', col: 'col-md-2 q-mt-lg q-ml-lg' },
            { type: 'date', name: 'created_at_till', outlined: true, placeholder: 'انتخاب نمایید', value: null, label: 'تا', col: 'col-md-2 q-mt-lg q-ml-lg' },
            { type: 'button', name: 'filter-btn', responseKey: 'statement', class: '', label: 'اعمال', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' }
          ]
        }
      ]
    }
  },
  computed: {
    selectedTopic() {
      return this.$store.getters['ChatreNejat/setTopicList']
    }
  },
  watch: {
    selected(value) {
      this.$emit('selectedUpdated', value)
    },
    selectedTopic(value) {
      this.inputs.find(x => x.name === 'formBuilderCol').value[0].options = value
    }
  },
  mounted() {
    this.loadData(this.$route.params.productId)
  },
  methods: {
    toggleDialog() {
      this.$emit('toggleDialog')
    },
    setContent(e) {
      this.selected = e
      this.toggleDialog()
    },
    onInputClick(e) {
      if (e.input.name === 'toggle') {
        document.getElementsByClassName('entity-filter-box')[0].classList.toggle('opened')
      }
      if (e.input.name === 'search-btn') {
        this.$refs.commentsIndex.search()
      }
      if (e.input.name === 'formBuilderCol') {
        this.$refs.commentsIndex.search()
      }
    },
    loadData(productId) {
      this.$store.dispatch('ChatreNejat/getSet', productId)
      this.$store.dispatch('ChatreNejat/getSelectedProduct', productId)
    },
    gotoComment(commentId) {
      this.$router.push({ name: 'UserPanel.Asset.ChatreNejat.ProductSingleComment', params: { productId: this.$route.params.productId, commentId } })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-comments{

  &:deep(.entity-filter-box) {
    display: none;
    &.opened {
      display: flex;
    }
  }
  // this is piece of shit and must fixed
  &:deep(.q-table__top) {
    display: none !important;
  }
  .content-col{
    padding: 10px;

    .content-box {
      width: 100%;
      min-height: 240px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 30px;
      cursor: pointer;

      @media only screen and (max-width: 390px) {
        padding: 5PX;
      }

      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 30px;
      }

      .comment-time {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: -0.02em;
        color: #666666;
      }

      .comment-main {
        padding: 5px;
        min-height: 120px;
      }

      .comment-footer{
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: -0.02em;
        color: #666666;
      }
    }
  }
}

</style>

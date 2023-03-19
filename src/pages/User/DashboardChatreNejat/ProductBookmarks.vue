<template>
  <div class="chatr-bookmarks q-pa-md">
    <entity-index ref="entityIndex"
                  v-model:value="inputs"
                  class="bookmarks-entity-index"
                  show-no-entity-slot
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :table-selection-mode="'multiple'"
                  :item-indicator-key="'id'"
                  :default-layout="false"
                  :show-search-button="false"
                  :show-reload-button="false"
                  :table-grid-size="true">
      <!--      @onInputClick="onEntityButtonsClicked"-->
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-6 col-lg-3 content-col q-pa-md">
          <q-card class="content-box flex"
                  @click="goToContent(inputData.props.row)">
            <!--              inputData.props.row.photo || -->
            <q-img width="325px"
                   height="200px"
                   class="text-center"
                   :src="'https://cdn.quasar.dev/img/mountains.jpg'" />
            <q-card-section class="row justify-between"
                            style="min-width: 320px;">
              <div class="col-10">
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
import jalali from 'moment-jalaali'
import { APIGateway } from 'src/api/APIGateway'
import ActionBtnComponent from 'components/Utils/actionBtn.vue'
import { shallowRef } from 'vue'
import Bookmark from 'components/Bookmark.vue'
const ActionBtn = shallowRef(ActionBtnComponent)

export default {
  name: 'ProductBookmarks',
  components: {
    Bookmark,
    EntityIndex
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
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => row.enable ? 'فعال' : 'غیرفعال'
          },
          {
            name: 'updated_at',
            required: true,
            label: 'تاریخ بارگذاری',
            align: 'left',
            field: row => jalali(row.updated_at)
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
        { type: 'hidden', name: 'timed', value: null },
        { type: 'input', name: 'name', outlined: true, label: 'جستجو در فیلم ها', placeholder: 'انتخاب نمایید', col: 'col-md-3' },
        { type: 'button', name: 'search', class: '', icon: 'search', unelevated: true, col: 'col-md-1 self-end' },
        { type: 'button', label: 'فیلتر', class: '', name: 'filter-button', icon: 'isax:filter', unelevated: true, col: 'col-md-1 self-end q-pr-md' },
        { type: 'separator', col: 'col-md-4', size: '0' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          class: 'entity-filter-box',
          ignoreValue: true,
          value: [
            { type: 'select', name: 'enable', outlined: true, placeholder: ' ', label: 'وضعیت', col: 'col-md-2', value: null, options: [{ label: 'فعال', value: 1 }, { label: 'غیر فعال', value: 0 }] },
            { type: 'date', name: 'createdAtSince', outlined: true, placeholder: 'انتخاب نمایید', value: null, label: 'تاریخ بارگزاری از', col: 'col-md-2' },
            { type: 'date', name: 'createdAtTill', outlined: true, placeholder: 'انتخاب نمایید', value: null, label: 'تا', col: 'col-md-2' },
            { type: ActionBtn, name: 'ActionBtn', col: 'col-12' }
          ]
        }
      ]
    }
  },
  computed: {
    selectedTopic () {
      return this.$store.getters['ChatreNejat/selectedTopic']
    }
  },
  watch: {
    selectedTopic () {
      this.$router.push({
        name: 'UserPanel.Asset.ChatreNejat.ProductPage',
        params: {
          productId: this.$route.params.productId
        }
      })
    }
  },
  mounted() {
    const productId = this.$route.params.productId
    if (productId) {
      this.getProductSets(productId)
      this.getProduct(productId)
    }
  },
  methods: {
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
    .bookmarks-entity-index {

    }
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

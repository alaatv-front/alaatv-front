<template>
  <div class="product-documents">
    <entity-index ref="orderList"
                  v-model:value="inputs"
                  v-model:table-selected-values="selected"
                  class="orders-list-entity-index"
                  :api="$apiGateway.product.APIAdresses.getContents(975)"
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
            <svg width="100"
                 height="100"
                 viewBox="0 0 100 100"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="50"
                      cy="50"
                      r="50"
                      fill="#E9E9E9" />
              <g opacity="0.2">
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M30 36.3137C30 33.9313 31.9313 32 34.3137 32H65.6863C68.0687 32 70 33.9313 70 36.3137V64.549C70 66.9314 68.0687 68.8627 65.6863 68.8627H34.3137C31.9313 68.8627 30 66.9314 30 64.549V36.3137ZM34.3137 34.3529C33.2308 34.3529 32.3529 35.2308 32.3529 36.3137V64.549C32.3529 65.6319 33.2308 66.5098 34.3137 66.5098H65.6863C66.7692 66.5098 67.6471 65.6319 67.6471 64.549V36.3137C67.6471 35.2308 66.7692 34.3529 65.6863 34.3529H34.3137Z"
                      fill="black" />
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M30 36.3137C30 33.9313 31.9313 32 34.3137 32H44.902V43.7647H30V36.3137ZM34.3137 34.3529C33.2308 34.3529 32.3529 35.2308 32.3529 36.3137V41.4118H42.549V34.3529H34.3137Z"
                      fill="black" />
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M42.5488 32H57.4508V43.7647H42.5488V32ZM44.9018 34.3529V41.4118H55.0978V34.3529H44.9018Z"
                      fill="black" />
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M55.0981 32H65.6864C68.0688 32 70.0001 33.9313 70.0001 36.3137V43.7647H55.0981V32ZM57.4511 34.3529V41.4118H67.6472V36.3137C67.6472 35.2308 66.7693 34.3529 65.6864 34.3529H57.4511Z"
                      fill="black" />
                <path d="M55.4901 53.7787C56.5359 54.3825 56.5359 55.8919 55.4901 56.4956L48.4313 60.571C47.3855 61.1748 46.0783 60.4201 46.0783 59.2126V51.0618C46.0783 49.8542 47.3855 49.0995 48.4313 49.7033L55.4901 53.7787Z"
                      fill="black" />
              </g>
            </svg>
          </div>
          <div>محتوایی وجود نداره!</div>
        </div>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-md-4 col-12 content-col">
          <q-card class="content-box"
                  @click="setContent(inputData.props.row)">
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
        { type: 'input', name: 'search-btn', outlined: true, label: 'جستجو در فیلم ها', placeholder: 'انتخاب نمایید', col: 'col-md-3 align-left q-mt-lg q-ml-lg' },
        { type: 'button', name: 'search', responseKey: 'statement', class: '', icon: 'search', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' },
        { type: 'separator', col: 'col-md-6', size: '0' },
        { type: 'button', name: 'toggle', responseKey: 'statement', class: '', icon: 'filter_alt', unelevated: true, col: 'col-md-1 q-mt-lg q-ml-lg self-end' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          class: 'entity-filter-box',
          ignoreValue: true,
          value: [
            { type: 'select', name: 'contentset_title', outlined: true, placeholder: ' ', label: 'فصل', col: 'col-md-2 q-mt-lg q-ml-lg', value: null, options: [] }
          ]
        }
      ]
    }
  },
  computed: {
    setTopicList() {
      return this.$store.getters['ChatreNejat/setTopicList']
    }
  },
  watch: {
    selected(value) {
      this.$emit('selectedUpdated', value)
    }
  },
  mounted() {
    this.getProductSets(this.$route.params.productId)
  },
  methods: {
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
    },
    getProductSets(productId) {
      this.$store.dispatch('ChatreNejat/getSet', productId).then(() => {
        this.inputs.find(x => x.name === 'formBuilderCol').value[0].options = this.setTopicList
      })
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

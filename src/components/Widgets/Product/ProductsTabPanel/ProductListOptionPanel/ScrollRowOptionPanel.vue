<template>
  <div class="scroll-row-container">
    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-3">
        <q-checkbox v-model="localOptions.options.hasLabel"
                    label="hasLabel" />
      </div>
      <div class="col-3">
        <q-checkbox v-model="localOptions.options.hasAction"
                    label="hasAction" />
      </div>
      <div class="col-12 q-pa-md">
        <q-expansion-item v-if="localOptions.options.hasLabel"
                          label="Label Settings">
          <text-widget-option-panel v-model:options="localOptions.options.labelOptions" />
        </q-expansion-item>
        <q-expansion-item v-if="localOptions.options.hasAction"
                          label="Action Button Settings">
          <action-button-option-panel v-model:options="localOptions.options.actionButtonOptions" />
        </q-expansion-item>
      </div>
      <div class="col-12 q-pa-md">
        <q-expansion-item expand-separator
                          label="grid system">
          <q-card>
            <q-card-section>
              <q-item v-for="size in sizes"
                      :key="size">
                <q-item-section avatar>
                  {{ size }}
                </q-item-section>
                <q-item-section>
                  <q-slider v-model="sizeValue[size]"
                            :min="1"
                            :max="12"
                            :step="1"
                            :label-value="sizeValue[size] ? (sizeValue[size] + '/12') : 0"
                            label
                            color="light-green"
                            @update:modelValue="calcColNumberClass" />
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 q-ml-md">
        <div class="outsideLabel">اضافه کردن محصول</div>
        <div class="flex items-center">
          <q-input v-model="productId"
                   class="q-mr-sm"
                   dense
                   label="id" />
          <div>
            <q-btn color="positive"
                   icon="check"
                   class="q-mr-sm"
                   @click="openProduct(productId)" />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="outsideLabel">layout</div>
        <q-select v-model="localOptions.options.layout"
                  :options="layoutOptions" />
      </div>
    </div>
    <q-card class="custom-card bg-grey-1">
      <q-list v-for="(product, productIndex) in localOptions.data"
              :key="productIndex">
        <q-item v-ripple
                class=" shadow-3"
                tag="label">
          <q-item-section>
            <q-item-label>{{product.id}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="negative"
                   icon="close"
                   size="10px"
                   class="q-mr-sm"
                   @click="removeProduct(product.id,productIndex)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-dialog v-model="productDialog"
              persistent>
      <q-card class="custom-card q-ma-md">
        <product-item class="product-item"
                      :options="{
                        productId: dialogProductId
                      }" />
        <div class="q-ma-md">
          <div class="row q-gutter-xs justify-center">
            <q-btn color="positive"
                   class="full-width"
                   label="محصول را اضافه کن"
                   @click="addProduct(dialogProductId)" />
            <q-btn color="negative"
                   class="full-width"
                   label="بیخیال"
                   @click="cancelProduct(dialogProductId)" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import TextWidgetOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ActionButtonOptionPanel from 'src/components/Widgets/ActionButton/OptionPanel.vue'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'productListScrollOptionPanel',
  components: {
    ProductItem,
    TextWidgetOptionPanel,
    ActionButtonOptionPanel
  },
  mixins: [PageBuilderOptionPanel],
  props: {
    layout: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      sizeValue: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0
      },
      responsiveOptions: ['xs', 'sm', 'md', 'lg', 'xl'],
      textAlignOptions: ['right', 'center', 'left'],
      responsive: 'lg',
      layoutOptions: ['ScrollRow', 'GridRow'],
      productId: null,
      currentTabIndex: '',
      specialProductId: '',
      dialogProductId: '',
      productDialog: false,
      defaultOptions: {
        type: '',
        options: {
          label: '',
          layout: '',
          labelStyle: {
            color: '',
            fontSize: '',
            textAlign: ''
          },
          hasAction: false,
          hasLabel: false,
          labelOptions: {
            text: '',
            fontFamily: null,
            color: null,
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            xs: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null
            },
            sm: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null
            },
            md: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null
            },
            lg: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null
            },
            xl: {
              fontSize: null,
              fontWeight: null,
              fontStyle: null,
              lineHeight: null
            },
            hasTheme: null,
            activeTheme: null,
            themes: {
              theme1: {
                borderColor: null,
                borderSize: null,
                borderWidth: null,
                borderHeight: null,
                top: null,
                left: null,
                bottom: null,
                right: null
              }
            }
          },
          actionButtonOptions: {
            color: null,
            icon: null,
            label: null,
            flat: false,
            callBack: null,
            imageSource: null,
            className: null,
            fixed: false,
            fixedPosition: null,
            hasAction: true,
            action: null,
            scrollTo: null,
            route: null,
            eventName: null,
            eventArgs: null
          },
          colNumber: 'col'
        },
        data: []
      }
    }
  },
  methods: {
    calcColNumberClass () {
      this.localOptions.options.colNumber = Object.keys(this.sizeValue).map(key => this.getCol(key, this.sizeValue[key])).join(' ')
    },
    getCol (size, number) {
      if (!size) {
        return ''
      }
      return 'col-' + size + '-' + number
    },
    openProduct (id) {
      if (!id) {
        return
      }
      this.dialogProductId = id
      this.productDialog = true
    },
    removeProduct (id, productIndex) {
      if (!this.localOptions.data[productIndex]) {
        return
      }
      this.localOptions.data.splice(productIndex, 1)
    },
    addProduct (id) {
      const productId = Number(id)
      // const newProduct = new Product({ id: productId })
      this.localOptions.data.push(productId)

      this.cancelProduct()
    },
    cancelProduct () {
      this.productDialog = false
      this.currentTabIndex = ''
      this.specialProductId = ''
      this.productId = null
    }
  }
}
</script>

<style scoped>

</style>

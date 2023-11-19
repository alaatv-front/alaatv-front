<template>
  <div class="scroll-row-container">

    <div class="row q-my-xs q-col-gutter-md">
      <div class="col-3">
        <q-checkbox v-model="localOptions.options.hasLabel"
                    label="hasLabel" />
      </div>
      <div v-if="layout === 'ProductShelf'"
           class="col-md-9">
        <div class="row q-col-gutter-md">
          <div class="col-md-3">
            <div class="outsideLabel">label color</div>
            <q-input v-model="localOptions.options.labelStyle.color"
                     label="label color" />
          </div>
          <div class="col-md-3">
            <div class="outsideLabel">label font size</div>
            <q-input v-model="localOptions.options.labelStyle.fontSize"
                     label="label font size" />
          </div>
          <div class="col-md-3">
            <div class="outsideLabel">label align</div>
            <q-select v-model="localOptions.options.labelStyle.textAlign"
                      :options="textAlignOptions"
                      label="label align" />
          </div>
        </div>
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
      <div class="col-12 q-py-md">
        <q-expansion-item expand-separator
                          label="تنظیمات محصول">
          <product-option-panel v-model:options="localOptions.options.productOptions" />
        </q-expansion-item>
      </div>
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
      <q-list v-for="(productId, productIndex) in localOptions.data"
              :key="productIndex">
        <q-item class=" shadow-3"
                tag="label">
          <q-item-section>
            <q-item-label>{{ productId }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="negative"
                   icon="close"
                   size="10px"
                   class="q-mr-sm"
                   @click="removeProduct(productIndex)" />
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
// import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'
import ProductOptionPanel from 'src/components/Widgets/Product/ProductItem/OptionPanel.vue'
// import { Product } from 'src/models/Product'

export default {
  name: 'ProductListGridOptionPanel',
  components: {
    ProductItem,
    ProductOptionPanel
  },
  // mixins: [PageBuilderOptionPanel],
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
      }
    },
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
      layoutOptions: ['ScrollRow', 'GridRow'],
      responsiveOptions: ['xs', 'sm', 'md', 'lg', 'xl'],
      textAlignOptions: ['right', 'center', 'left'],
      responsive: 'lg',
      productId: null,
      currentTabIndex: '',
      specialProductId: '',
      dialogProductId: '',
      productDialog: false,
      defaultOptions: {
        options: {
          label: '',
          layout: 'GridRow',
          // labelStyle: {
          //   color: '',
          //   fontSize: '',
          //   textAlign: 'center'
          // },
          colNumber: 'col',
          productOptions: {
            theme: 'ThemeDefault',
            className: '',
            height: 'auto',
            boxed: false,
            boxedWidth: 1200,
            style: {},
            borderStyle: {
              borderCssString: '',
              borderRadiusCssString: '20px'
            },
            boxShadows: [
              '-2px -4px 10px rgba(255, 255, 255, 0.6)',
              '2px 4px 10px rgba(46, 56, 112, 0.05)'
            ],
            cssHoverEffects: {
              boxShadows: [
                '-5px -6px 10px rgba(255, 255, 255, 0.6)',
                '5px 5px 20px rgba(0, 0, 0, 0.1)'
              ],
              borderStyle: {
                borderCssString: '',
                borderRadiusCssString: '20px'
              },
              transition: {
                time: 0.4
              },
              transform: {
                rotate: 0,
                scaleX: 1,
                scaleY: 1,
                skewX: 0,
                skewY: 0,
                translateX: 0,
                translateY: -10
              }
            }
          }
        },
        data: [],
        type: ''
      }
    }
  },
  computed: {
    localOptions: {
      get() {
        return this.options
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    }
  },
  // watch: {
  //   localOptions: {
  //     handler(newValue) {
  //       // this.updateLocalOptions(newValue)
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    calcColNumberClass() {
      this.localOptions.options.colNumber = Object.keys(this.sizeValue).map(key => this.getCol(key, this.sizeValue[key])).join(' ')
    },
    getCol(size, number) {
      if (!number) {
        return ''
      }
      return 'col-' + size + '-' + number
    },
    openProduct(id) {
      if (!id) {
        return
      }
      this.dialogProductId = id
      this.productDialog = true
    },
    removeProduct(productIndex) {
      if (!this.localOptions.data[productIndex]) {
        return
      }
      this.localOptions.data.splice(productIndex, 1)
    },
    addProduct(id) {
      const productId = Number(id)
      // const newProduct = new Product({ id: productId })
      this.localOptions.data.push(productId)

      this.cancelProduct()
    },
    cancelProduct() {
      this.productDialog = false
      this.currentTabIndex = ''
      this.specialProductId = ''
      this.productId = null
    }
  }
}
</script>

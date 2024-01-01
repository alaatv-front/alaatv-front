<template>
  <div class="scroll-row-container">

    <div class="row q-my-xs q-col-gutter-md items-center">

      <div v-if="layout === 'ProductShelf'"
           class="col-md-12 q-py-sm">
        <q-expansion-item expand-separator
                          label="Label settings">
          <div class="row q-col-gutter-md q-pb-sm items-center">
            <div class="col-2">
              <q-checkbox v-model="localOptions.options.hasLabel"
                          label="hasLabel" />
            </div>
            <div class="col-md-3">
              <q-input v-model="localOptions.options.labelStyle.color"
                       label="label color" />
            </div>
            <div class="col-md-3">
              <q-input v-model="localOptions.options.labelStyle.fontSize"
                       label="label font size" />
            </div>
            <div class="col-md-4">
              <q-select v-model="localOptions.options.labelStyle.textAlign"
                        :options="textAlignOptions"
                        label="label align" />
            </div>
          </div>
        </q-expansion-item>
      </div>
      <div v-if="layout === 'ProductShelf'"
           class="col-md-12 q-py-sm">
        <q-expansion-item expand-separator
                          label="Expanding Setting">
          <div class="row q-col-gutter-md q-pb-sm items-center">
            <div class="col-3">
              <q-checkbox v-model="localOptions.options.hasExpand"
                          label="hasExpand" />
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.options.showInCollapse"
                       type="number"
                       label="showInCollapse" />
            </div>
          </div>
          <div v-if="localOptions.options.hasExpand"
               class="col-12 q-py-sm">
            <q-expansion-item expand-separator
                              label="تنظیمات دکمه expand">
              <action-button-option-panel v-model:options="localOptions.options.expandedButtonOptions" />
            </q-expansion-item>
          </div>
          <div v-if="localOptions.options.hasExpand"
               class="col-12 q-py-sm">
            <q-expansion-item expand-separator
                              label="تنظیمات دکمه collapse">
              <action-button-option-panel v-model:options="localOptions.options.collapsedButtonOptions" />
            </q-expansion-item>
          </div>
        </q-expansion-item>
      </div>
      <div class="col-12 q-py-sm">
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
      <div class="col-12 q-py-sm">
        <q-expansion-item expand-separator
                          label="تنظیمات محصول">
          <product-option-panel v-model:options="localOptions.options.productOptions" />
        </q-expansion-item>
      </div>

      <div class="col-12 q-py-sm">
        <q-expansion-item expand-separator
                          label="اضافه کردن محصول و layout">
          <div class="row q-col-gutter-md">
            <div class="col-md-6">
              <q-input v-model="productId"
                       class="q-mr-sm"
                       dense
                       label="id">
                <template v-slot:after>
                  <q-btn color="positive"
                         icon="check"
                         square
                         @click="openProduct(productId)" />
                </template>
              </q-input>
            </div>
            <div class="col-md-6 ">
              <q-select v-model="localOptions.options.layout"
                        label="layout"
                        :options="layoutOptions" />
            </div>
          </div>
          <q-card class="custom-card q-py-sm bg-grey-1">
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
                         class="size-sm"
                         square
                         @click="removeProduct(productIndex)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-expansion-item>
      </div>
    </div>

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
import ActionButtonOptionPanel from 'components/Widgets/ActionButton/OptionPanel.vue'

export default {
  name: 'ProductListGridOptionPanel',
  components: {
    ProductItem,
    ProductOptionPanel,
    ActionButtonOptionPanel
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
  data () {
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
        collapsedButtonOptions: {
          name: 'ActionButton',
          options: {
            color: null,
            icon: null,
            label: null,
            flat: false,
            callBack: null,
            imageSource: null,
            className: null,
            fixed: false,
            fixedPosition: null,
            eventArgs: null,
            hasAction: true,
            action: null,
            scrollTo: null,
            route: null,
            eventName: null,
            responsiveSpacing: {
              xs: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              sm: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              md: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              lg: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              xl: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              }
            }
          }
        },
        expandedButtonOptions: {
          name: 'ActionButton',
          options: {
            color: null,
            icon: null,
            label: null,
            flat: false,
            callBack: null,
            imageSource: null,
            className: null,
            fixed: false,
            fixedPosition: null,
            eventArgs: null,
            hasAction: true,
            action: null,
            scrollTo: null,
            route: null,
            eventName: null,
            responsiveSpacing: {
              xs: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              sm: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              md: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              lg: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              },
              xl: {
                marginTop: null,
                marginLeft: null,
                marginRight: null,
                marginBottom: null,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null
              }
            }
          }
        },
        options: {
          label: '',
          hasLabel: false,
          hasExpand: false,
          showInCollapse: 3,
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
      get () {
        return this.options
      },
      set (newValue) {
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
    calcColNumberClass () {
      this.localOptions.options.colNumber = Object.keys(this.sizeValue).map(key => this.getCol(key, this.sizeValue[key])).join(' ')
    },
    getCol (size, number) {
      if (!number) {
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
    removeProduct (productIndex) {
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

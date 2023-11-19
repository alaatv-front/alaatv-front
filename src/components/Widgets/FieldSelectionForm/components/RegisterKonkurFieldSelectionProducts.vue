<template>
  <div class="RegisterKonkurFieldSelectionProducts">
    <template v-if="!loading && !isSelectionFieldProductsEnable">
      <q-banner class="text-center q-mb-md">
        از اینکه رتبه خود را ثبت کرده اید متشکریم
        <br>
        متاسفانه
        ظرفیت انتخاب رشته کنکور 1402 به پایان رسیده است.
      </q-banner>
    </template>
    <template v-else>
      <div class="title-text q-mb-md">
        ثبت نام در انتخاب رشته آلاء
      </div>
      <div class="content-text q-mb-xl">
        بر اساس نیازت میتونی یکی از طرح ها زیر رو انتخاب کنی؛ البته اگه راه ابریشمی (خصوصا راه ابریشم پرو) بودی پیشنهاد آلاء اینه که از طرح های بررسی انتخاب رشته استفاده کنی.
      </div>

      <div class="entity-crud-formBuilder q-mb-lg">
        <div class="form-builder-separator form-builder-separator-col">
          <div class="form-builder-separator">
            <b>
              انتخاب طرح
            </b>
          </div>
        </div>
      </div>

      <q-skeleton v-if="loading"
                  type="rect"
                  width="100%"
                  height="200px" />
      <q-list v-else>
        <product-item v-for="(product, productIndex) in products"
                      :key="productIndex"
                      v-model:selected="selectedProduct"
                      :label="product.label"
                      :items="product.items"
                      :value="product.value"
                      class="q-mb-md" />
      </q-list>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn color="white"
                 class="full-width"
                 @click="onBack">
            <q-icon name="arrow_forward" />
            بازگشت
          </q-btn>
        </div>
        <div class="col-6">
          <q-btn color="primary"
                 class="full-width"
                 :loading="loading"
                 @click="onForward">
            مرحله بعد
            <q-icon name="arrow_back" />
          </q-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { ProductList } from 'src/models/Product.js'

export default {
  name: 'RegisterKonkurFieldSelectionProducts',
  components: { ProductItem },
  props: {
    orderId: {
      type: Number,
      default: null
    },
    selectedProductId: {
      type: Number,
      default: null
    },
    product1Id: {
      type: Number,
      default: 1098
    },
    product2Id: {
      type: Number,
      default: 1097
    },
    product3Id: {
      type: Number,
      default: 1096
    },
    product4Id: {
      type: Number,
      default: 1095
    },
    product5Id: {
      type: Number,
      default: 1094
    }
  },
  emits: ['update:orderId', 'update:selectedProductId', 'onBack', 'onForward'],
  data () {
    return {
      loading: false,
      selectedProduct: 0,
      productList: new ProductList(),
      productObjectList: new ProductList(),
      products: [
        {
          value: 0,
          label: 'بررسی انتخاب رشته ویژه کاربران راه ابریشم پرو',
          items: [
            {
              enable: true,
              caption: '',
              detail: '',
              value: 'رایگان',
              unit: ''
            }
          ]
        },
        {
          value: 1,
          label: 'بررسی انتخاب رشته ویژه کاربران راه ابریشم 1',
          items: [
            {
              enable: true,
              caption: '',
              detail: '',
              value: '2,000,000',
              unit: 'تومان'
            }
          ]
        },
        {
          value: 2,
          label: 'انجام صفر تا صد انتخاب رشته توسط تیم آلاء',
          items: [
            {
              id: null,
              enable: true,
              caption: 'ظرفیت محدود',
              detail: '1 تا 1000 نفر',
              value: '6,000,000',
              unit: 'تومان'
            },
            {
              id: null,
              enable: false,
              caption: '',
              detail: '1000 تا 5000 نفر',
              value: '9,000,000',
              unit: 'تومان'
            },
            {
              id: null,
              enable: false,
              caption: '',
              detail: 'بیش از 5000 نفر',
              value: '14,000,000',
              unit: 'تومان'
            }
          ]
        }
      ]
    }
  },
  computed: {
    productIds () {
      return [
        this.product1Id,
        this.product2Id,
        this.product3Id,
        this.product4Id,
        this.product5Id
      ]
    },
    isSelectionFieldProductsEnable () {
      const disableProduct = this.productObjectList.list.find(p => !p.is_active)
      return this.productObjectList.list.length > 0 && !disableProduct
    }
  },
  mounted () {
    this.setProductIds()
    this.getProducts()
  },
  methods: {
    setProductIds () {
      this.products[0].value = this.product1Id
      this.products[1].value = this.product2Id
      this.products[2].value = this.product3Id
      this.selectedProduct = this.product1Id
    },
    loadProductPrice () {
      this.products[1].items[0].value = this.getPriceString(this.getProductById(this.product2Id))
      this.products[2].items[0].value = this.getPriceString(this.getProductById(this.product3Id))
      this.products[2].items[1].value = this.getPriceString(this.getProductById(this.product4Id))
      this.products[2].items[2].value = this.getPriceString(this.getProductById(this.product5Id))
    },
    getProductById (productId) {
      return this.productObjectList.list.find(product => product.id === parseInt(productId))
    },
    getPriceString (product) {
      return product.price.final.toLocaleString('fa')
    },
    getProducts () {
      this.loading = true
      APIGateway.product.getProductList({
        productIds: this.productIds,
        params: {
          length: this.productIds.length
        }
      })
        .then((productList) => {
          this.productObjectList = productList
          this.loadProductPrice()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onBack () {
      this.$emit('onBack')
    },
    onForward () {
      this.checkSelectedProduct()
    },
    checkSelectedProduct () {
      this.loading = true
      APIGateway.user.isPermittedToPurchase(this.selectedProduct)
        .then((orderId) => {
          this.$emit('update:orderId', orderId)
          this.$emit('update:selectedProductId', this.selectedProduct)
          this.$emit('onForward')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.RegisterKonkurFieldSelectionProducts {
  .q-list {
    margin-bottom: 71px;

    .q-item {
      border-radius: 10px;
      background: #FFF;
      box-shadow: -2px 2px 3px 0 rgb(16 24 40 / 6%);
      flex-wrap: wrap;
      padding-right: 16px;
      padding-left: 16px;
      padding-bottom: 21px;

      .more-info {
        max-width: 100%;
        min-width: 100%;
        margin: 0;

        .items {
          .item {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            align-items: center;

            .price-and-detail {
              display: flex;
              flex-flow: row;
              justify-content: flex-end;
              align-items: center;

              .price {
                display: flex;
                flex-flow: row;
                justify-content: flex-end;
                align-items: center;
                width: 100px;

                .value {
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: normal;
                  letter-spacing: -0.36px;
                }

                .unit {
                  margin-left: 4px;
                  font-size: 10px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                  letter-spacing: -0.2px;
                }
              }

              .detail {
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: -0.2px;
                margin-right: 14px;
              }
            }

            .caption {
              padding: 4px;
              border-radius: 6px;
              background: #EEE;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.24px;
            }
          }
        }
      }
    }
  }
}
</style>

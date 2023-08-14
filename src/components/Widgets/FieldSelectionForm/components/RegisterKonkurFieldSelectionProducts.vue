<template>
  <div class="RegisterKonkurFieldSelectionProducts">
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

    <q-list>
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
               @click="onForward">
          مرحله بعد
          <q-icon name="arrow_back" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'RegisterKonkurFieldSelectionProducts',
  components: { ProductItem },
  props: {
    konkurRankFormData: {
      type: Object,
      default: null
    }
  },
  emits: ['onBack', 'onForward'],
  data () {
    return {
      selectedProduct: 0,
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
              enable: true,
              caption: 'ظرفیت محدود',
              detail: '1 تا 1000 نفر',
              value: '6,000,000',
              unit: 'تومان'
            },
            {
              enable: false,
              caption: '',
              detail: '1000 تا 5000 نفر',
              value: '9,000,000',
              unit: 'تومان'
            },
            {
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
  mounted () {
  },
  methods: {
    onBack () {
      this.$emit('onBack')
    },
    onForward () {
      this.checkSelectedProduct()
    },
    checkSelectedProduct () {
      APIGateway.user.isPermittedToPurchase(this.selectedProduct)
        .then(() => {
          this.$emit('onForward')
        })
        .catch(() => {})
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
      box-shadow: -2px 2px 3px 0 rgba(16, 24, 40, 0.06);
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

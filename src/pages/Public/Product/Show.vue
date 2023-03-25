<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinSEO, mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Show',
  mixins: [mixinPageOptions, mixinSEO],
  data() {
    return {
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ProductInfoShow',
                        options: {
                          productId: this.$route.params.id,
                          teacher: true,
                          shipping_method: true,
                          services: true,
                          major: true,
                          production_year: true
                        }
                      },
                      {
                        name: 'ProductPrice',
                        options: {
                          productId: this.$route.params.id,
                          className: '',
                          basePrice: true,
                          discount: true,
                          finalPrice: true,
                          addToCart: true
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-6 col-xs-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ProductIntroduction',
                        options: {
                          productId: this.$route.params.id,
                          className: 'q-mt-lg',
                          download_date: true,
                          duration: true
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-6 col-xs-12'
                    }
                  }
                ],
                options: {
                  boxed: true
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ProductGifts',
                        options: {
                          productId: this.$route.params.id,
                          className: 'q-my-md'
                        }
                      },
                      {
                        name: 'ProductDemos',
                        options: {
                          productId: this.$route.params.id,
                          className: 'q-my-md'
                        }
                      },
                      {
                        name: 'ProductReview',
                        options: {
                          productId: this.$route.params.id
                        }
                      },
                      {
                        name: 'ProductContents',
                        options: {
                          productId: this.$route.params.id
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          }
        }
      ]
    }
  },
  created () {
    this.currenSections = this.sections
  }
}
</script>

<style scoped>

</style>

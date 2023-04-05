<template>
  <q-page-builder :sections="currenSections"
                  :options="options"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinSEO, mixinPageOptions } from 'src/mixin/Mixins.js'
export default {
  name: 'Cart',
  mixins: [mixinPageOptions, mixinSEO],
  data() {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'CartEmpty',
                        options: {
                          text: 'سبد خرید شما خالی است',
                          link: {
                            text: 'بازگشت به فروشگاه',
                            url: '/shop'
                          },
                          photo: 'https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_cart.png'
                        }
                      }
                    ],
                    options: {
                      className: 'col-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362,
                  style: {}
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'CartView',
                        options: {
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-8 col-xs-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'CartInvoice',
                        options: {
                          className: 'q-mt-md'
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-4 col-xs-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362,
                  style: {}
                }
              }
            ]
          },
          options: {}
        }
      ],
      options: []
    }
  },
  created () {
    this.currenSections = this.sections
  }
}
</script>

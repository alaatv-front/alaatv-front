<template>
  <div class="cart-page">
    <q-page-builder :sections="sections"
                    :options="options"
                    :containerFullHeight="calculateHeightStyle"
                    :editable="pageBuilderEditable" />
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      scrollInfo: null,
      key: 0,
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
                        name: 'CartView'
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
                      },
                      {
                        name: 'Login',
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
  computed: {
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    },
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  },
  created() {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>

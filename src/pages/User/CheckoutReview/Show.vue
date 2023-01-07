<template>
  <div class="cart-page">
    <q-page-builder
      :sections="sections"
      :options="options"
      :containerFullHeight="calculateHeightStyle"
      :editable="pageBuilderEditable"
    ></q-page-builder>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
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
  created() {}
}
</script>

<style lang="scss" scoped>
</style>

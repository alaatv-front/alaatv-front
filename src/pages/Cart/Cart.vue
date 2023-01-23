<template>
  <div class="cart-page">
    <q-page-builder :sections="sections"
                    :options="options"
                    :containerFullHeight="calculateHeightStyle" />
  </div>
</template>

<script>
export default {
  name: 'Cart',
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
                        name: 'Cart'
                      }
                    ]
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
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
</style>

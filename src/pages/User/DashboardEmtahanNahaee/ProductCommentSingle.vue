<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
</template>

<script>
export default {
  name: 'index',
  data: () => ({
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
                      name: 'emtahan-nahaee-product-comment-single'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  })
}
</script>

<style scoped>

</style>

<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig" />
</template>

<script>
export default {
  name: 'ProductIndex',
  data () {
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
                        name: 'AdminProductIndex'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false
                }
              }
            ]
          }
        }
      ]
    }
  }
}
</script>

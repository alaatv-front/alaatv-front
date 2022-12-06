<template>
  <div class="myPurchases-page">
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
    />
  </div>
</template>

<script>
export default {
  name: 'MyPurchases',
  data () {
    return {
      pageConfig: {
        padding: {
          // a: 'md'
        }
      },
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'purchases'
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
  },
}
</script>

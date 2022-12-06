<template>
  <div class="userOrders-page">
    <q-page-builder
      v-model:sections="sections"
    />
  </div>
</template>

<script>
export default {
  name: 'userOrders',
  data () {
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
                        name: 'UserOrders'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
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

<style scoped>

</style>

<template>
  <div>
    Transactions
  </div>
</template>

<script>
export default {
  name: 'Transactions',
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
                      name: 'map'
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

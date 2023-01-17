<template>
  <div>
    MyGiftCards
  </div>
</template>

<script>
export default {
  name: 'MyGiftCards',
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

<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
</template>

<script>
export default {
  name: 'DownloadGiftCard',
  data: () => ({
    pageConfig: {},
    sections: [
      {
        data: {
          rows: [
            {
              cols: [
                {
                  widgets: [{ name: 'GiftCardDownload' }]
                }
              ],
              options: {
                boxed: true,
                boxedWidth: 1602
              }
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

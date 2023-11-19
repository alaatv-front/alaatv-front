<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
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
                  widgets: [{ name: 'GiftCardTransactions' }]
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

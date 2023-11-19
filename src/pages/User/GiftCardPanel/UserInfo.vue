<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
</template>

<script>
export default {
  name: 'UserInfo',
  data: () => ({
    pageConfig: {},
    sections: [
      {
        data: {
          rows: [
            {
              cols: [
                {
                  widgets: [{ name: 'GiftCardUserInfo' }]
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

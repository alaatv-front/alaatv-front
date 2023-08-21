<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="false"
                  :loading="false" />
</template>

<script>
// import { mixinPrefetchServerD, mixinPageOptions, mixinSEO } from 'src/mixin/Mixins.js'

export default {
  name: 'ShopPage',
  // mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  data: () => {
    return {
      pageConfig: {},
      currenSections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminEntekhabReshte' }], options: {} }], options: {} }] } }]
    }
  }
}
</script>

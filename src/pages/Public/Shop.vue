<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPrefetchServerData, mixinPageOptions, mixinSEO } from 'src/mixin/Mixins.js'

export default {
  name: 'ShopPage',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
}
</script>

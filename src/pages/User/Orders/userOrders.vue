<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'PageUserOrders',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
}
</script>

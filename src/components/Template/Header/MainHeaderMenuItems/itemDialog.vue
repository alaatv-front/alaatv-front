<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn icon="cancel"
                 color="red"
                 label="حذف آیتم از منو"
                 @click="removeItemFromMenuList" />
        </div>
        <div class="col-6">
          <q-checkbox v-model="localItems[selectedIndex].mobileMode"
                      right-label
                      label="نمایش در منوی جانبی ( موبایل )" />
        </div>
        <div class="col-2">
          <div class="outsidelabel">menu type</div>
          <q-select v-model="localItems[selectedIndex].type"
                    :options=menuTypeOptions />
        </div>
        <div class="col-2">
          <div class="outsidelabel">title</div>
          <q-input v-model="localItems[selectedIndex].title" />
        </div>
        <div v-if="itemHasRoute"
             class="col-2">
          <div class="outsidelable">route</div>
          <q-input v-if="localItems[selectedIndex].route.name"
                   v-model="localItems[selectedIndex].route.name" />
          <q-input v-else-if="localItems[selectedIndex].route.path"
                   v-model="localItems[selectedIndex].route.path" />
        </div>
        <div v-if="itemHasRoute"
             class="col-6">
          <div v-if="localItems[selectedIndex].route.query"
               class="outsidelable">tags</div>
          <q-input v-if="localItems[selectedIndex].route.query"
                   v-model="localItems[selectedIndex].route.query['tags[]']" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'itemDialog',
  props: {
    items: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedIndex: {
      type: Number,
      default: null
    },
    selectedChildIndex: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      menuTypeOptions: ['itemMenu', 'megaMenu', 'simpleMenu']
    }
  },
  computed: {
    localItems: {
      get() {
        return this.items
      },
      set(newValue) {
        this.$emit('update:items', newValue)
      }
    },
    itemHasRoute() {
      return this.items[this.selectedIndex].route
    }
  },
  methods: {
    removeItemFromMenuList() {
      this.menuItems.splice(this.selectedIndex, 1)
      this.optionDialog = false
    }
  }
}
</script>

<style scoped>

</style>

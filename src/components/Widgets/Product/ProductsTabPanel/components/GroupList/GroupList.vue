<template>
  <div :style="options.style"
       :class="options.className">
    <component :is="options.layout"
               :ref="'component' + options.layout"
               :loading="loading"
               :data="data"
               :options="options" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'GroupList',
  components: {
    ProductTab: defineAsyncComponent(() =>
      import('./ProductTab.vue')
    ),
    ProductShelf: defineAsyncComponent(() =>
      import('./ProductShelf.vue')
    )
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.options.events) {
      this.options.events.forEach((event, index) => {
        this.$bus.on(this.options.events[index], () => {
          if (this.$refs.componentProductTab || this.$refs.componentProductShelf) {
            if (this.options.layout === 'ProductTab') {
              this.$refs.componentProductTab.changeTab(this.options[event])
            } else {
              this.$refs.componentProductShelf.scrollToShelf(this.options[event])
            }
          }
        })
      })
    }
  },
  methods: {
    takeAction (index) {
      if (this.$refs.componentProductTab || this.$refs.componentProductShelf) {
        if (this.options.layout === 'ProductTab') {
          this.$refs.componentProductTab.changeTab(this.options[this.options.events[index]])
        } else {
          this.$refs.componentProductShelf.scrollToShelf(this.options[this.options.events[index]])
        }
      }
    }
  }
}
</script>

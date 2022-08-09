<template>
  <div
    class="page-builder"
    :class="className"
    :style="style"
  >
    <page-builder-section
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex"
      :data="section.data"
      :options="section.options"
      :containerFullHeight="containerFullHeight"
    />
  </div>
</template>

<script>
import PageBuilderSection from 'src/components/PageBuilder/PageBuilderSection.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'PageBuilder',
  mixins: [mixinWidget],
  components: {
    PageBuilderSection
  },

  methods: {},
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created() {
    this.defaultOptions = Object.assign(this.defaultOptions, this.options)
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>

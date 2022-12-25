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
      :containerFullHeight="height"
      :get-data="getData"
    />
  </div>
</template>

<script>
import PageBuilderSection from 'src/components/PageBuilder/PageBuilderSection.vue'
import { mixinWidget } from 'src/mixin/Mixins'
import GetWidgetsData from 'assets/js/GetWidgetsData'

export default {
  name: 'PageBuilder',
  components: {
    PageBuilderSection
  },
  mixins: [mixinWidget],
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
  data() {
    let height
    return {
      height
    }
  },
  created() {
    this.defaultOptions = Object.assign(this.defaultOptions, this.options)
  },

  methods: {
    getData (url) {
      return GetWidgetsData.getData(url)
    },
    calculateHeight (height) {
      this.height = height
    }
  }
}
</script>

<style scoped></style>

<template>
  <div class="faq-container">
    <q-card class="custom-card">
      <q-card-section>
        <q-expansion-item v-for="(item, index) in FAQList"
                          :key="index"
                          expand-separator
                          :label="item.label">
          <div class="text">
            {{ item.text }}
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'FAQ',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      FAQList: []
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.FAQList = this.options.FAQList
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-container {
  &:deep(.q-item__label) {
    font-size: 16px
  }
  .text {
    padding: 1.5rem 2rem;
    text-align: justify;
  }
}
</style>

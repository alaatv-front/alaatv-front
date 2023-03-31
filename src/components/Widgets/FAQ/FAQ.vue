<template>
  <div class="faq-container">
    <div class="faq-title ">
      {{ title }}
    </div>
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
      title: '',
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
      this.title = this.options.title
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-container {
  &:deep(.q-item__label) {
    font-size: 16px
  }

  .faq-title {
    margin-top: 30px;
    margin-bottom: 26px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 41px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #575962;
  }
  .text {
    padding: 1.5rem 2rem;
    text-align: justify;
  }
}
</style>

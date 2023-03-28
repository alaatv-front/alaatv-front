<template>
  <q-card class="custom-card feature-card">
    <q-card-section class="feature-horizontal-section"
                    horizontal>
      <img class="feature-image"
           :src="img">
      <q-card-section>
        <div class="feature-title ellipsis">{{ title }}</div>
        <div class="feature-description">
          {{ description }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'FeatureBox',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      title: '',
      description: '',
      img: ''
    }
  },
  watch: {
    options: {
      handler() {
        this.setFeature()
      },
      deep: true
    }
  },
  mounted() {
    this.setFeature()
  },
  methods: {
    setFeature() {
      this.title = this.options.title
      this.description = this.options.description
      this.img = this.options.image
    }
  }
}
</script>

<style lang="scss" scoped>
.feature-card {
  width: 100%;
  max-width: 350px;
  .feature-horizontal-section {

    .feature-image {
      width: 100px;
      height: 100px;
    }

    .feature-description {
      max-width: 300px;
    }
  }
}
</style>

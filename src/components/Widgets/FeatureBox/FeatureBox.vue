<template>
  <q-card class="feature-card">
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
      title: null,
      description: null,
      img: null
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
  max-width: 100%;
  box-shadow: none;
  .feature-horizontal-section {

    .feature-image {
      width: 100px;
      height: 100px;
    }

    .feature-title {
      font-weight: 700;
      font-size: 20px;
      line-height: 35px;

      @media screen and (max-width: 600px) {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
      }
    }

    .feature-description {
      max-width: 300px;
      font-weight: 400;
      font-size: 18px;
      line-height: 31px;

      @media screen and (max-width: 600px) {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
}
</style>

<template>
  <div class="sentry row justify-center items-center">
    <div class="col-12">
      <q-btn v-if="$route.query.sentry === '1'"
             color="primary"
             class="full-width"
             @click="testSentry">
        test sentry
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sentry',
  data () {
    return {
    }
  },
  methods: {
    testSentry () {
      throw new Error('Sentry Error')
    }
  }
}

</script>

<style scoped lang="scss">
.sentry {
  height: 100vh;
}
</style>

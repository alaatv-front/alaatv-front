<template>
  <div class="product-page">
    <q-list class="rounded-borders">
      <q-expansion-item popup
                        header-class="bg-white"
                        separator
                        switch-toggle-side
                        expand-separator>
        <template v-slot:header>
          <q-item-section>
            فیلان یاخته ها در بدن انسان
          </q-item-section>

          <q-item-section side>
            2 گام
          </q-item-section>
          <q-item-section side>
            38 دقیقه
          </q-item-section>
        </template>
        <q-separator inset />
        <q-card>
          <q-card-section>
            <q-list separator>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="
                    dark"
                          name="check_circle" />
                </q-item-section>
                <q-item-section>گام اول - فیلان یاخته ها در بدن انسان</q-item-section>
                <q-item-section side="">
                  ۲۲ دقیقه
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'ChatreNejatProductPage',
  data() {
    return {
    }
  },
  computed: {
    setList() {
      return this.$store.getters['ChatreNejat/setList']
    },
    setTopics() {
      return this.$store.getters['ChatreNejat/setTopicList']
    }
  },
  mounted() {
    this.getProductSets()
  },
  methods: {
    getProductSets() {
      this.$store.dispatch('ChatreNejat/getSet', 976)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-page {
  padding: 170px;
}
</style>

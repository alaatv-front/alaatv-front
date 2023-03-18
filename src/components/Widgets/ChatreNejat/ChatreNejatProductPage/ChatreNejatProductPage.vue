<template>
  <div class="product-page">
    <q-list v-if="!setListLoading"
            class="rounded-borders">
      <q-expansion-item v-for="(set, index) in setList"
                        :key="index"
                        popup
                        header-class="bg-white"
                        separator
                        switch-toggle-side
                        expand-separator
                        @show="getSet(set.id)">
        <template v-slot:header>
          <q-item-section class="ellipsis   ">
            {{ set.short_title.split('-')[2] }}
          </q-item-section>

          <q-item-section side>
            {{set.contents_count}} گام
          </q-item-section>
          <q-item-section side>
            {{set.contents_duration}} دقیقه
          </q-item-section>
        </template>
        <q-separator inset />
        <q-card>
          <q-card-section v-if="!setLoading || set.contents.list.length > 0">
            <q-list separator>
              <q-item v-for="(content, index) in set.contents.list"
                      :key="index"
                      :to="{ name: 'UserPanel.Asset.ChatreNejat.Content', params: {productId: this.$route.params.productId, setId: set.id, contentId: content.id} }"
                      clickable
                      @click="setSelectedData(content,set)">
                <q-item-section avatar>
                  <q-icon color="
                    dark"
                          name="check_circle" />
                </q-item-section>
                <q-item-section class="ellipsis">{{ content.title }}</q-item-section>
                <q-item-section side>
                  {{ content.duration === null ? 'مدت ندارد' : content.duration + ' دقیقه' }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section v-else>
            <q-list>
              <q-item v-for="item in 4"
                      :key="item">
                <q-skeleton width="100%"
                            bordered />
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <q-list v-else>
      <q-item v-for="item in 10"
              :key="item">
        <q-skeleton width="100%"
                    bordered />
      </q-item>
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
    selectedTopic() {
      return this.$store.getters['ChatreNejat/selectedTopic']
    },
    setList() {
      return this.$store.getters['ChatreNejat/setList'].filter(set => {
        return set.short_title.includes(this.selectedTopic)
      })
    },
    setTopicList() {
      return this.$store.getters['ChatreNejat/setTopicList']
    },
    setLoading() {
      return this.$store.getters['ChatreNejat/setLoading']
    },
    setListLoading() {
      return this.$store.getters['ChatreNejat/setListLoading']
    }
  },
  mounted() {
    this.getProductSets(this.$route.params.productId)
    this.getProduct()
  },
  methods: {
    setSelectedData(content, set) {
      this.$store.commit('ChatreNejat/setSelectedContent', content)
      this.$store.commit('ChatreNejat/setSelectedSet', set)
    },
    getProductSets(productId) {
      this.$store.dispatch('ChatreNejat/getSet', productId)
    },
    getSet(setId) {
      this.$store.dispatch('ChatreNejat/updateSet', setId)
    },
    getProduct() {
      this.$store.dispatch('ChatreNejat/getSelectedProduct', this.$route.params.productId)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-page {
  padding: 50px 170px 170px;
  @media only screen and (max-width: 1450px) {
    padding: 5px;
  }
}
</style>

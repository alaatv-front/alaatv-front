<template>
  <router-link :to="getRouteObject(item)">
    <q-card class="ttsp-panel-item">
      <q-skeleton v-if="loading"
                  height="100px"
                  class="q-mb-sm" />
      <template v-else>
        <div class="ttsp-panel-item__image">
          <lazy-img :src="item.logo" />
        </div>
        <div class="ttsp-panel-item__title">{{ item.title }}</div>
      </template>
    </q-card>
  </router-link>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'TTSPPanel',
  components: { LazyImg },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: null,
          name: null,
          title: null,
          logo: null,
          study_plan: {
            category_id: null
          },
          showDashboard: false,
          showStudyPlan: false
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getRouteObject (item) {
      if (item.name) {
        return { name: 'UserPanel.Asset.TripleTitleSet', params: { eventName: item.name } }
      }

      return item.route
    }
  }
}
</script>

<style lang="scss" scoped>
.ttsp-panel-item {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  &__image {
    width: 60%;
    padding: $spacing-none $space-1;
    margin-bottom: $space-3;
    margin-top: $space-2;
    :deep(*) {
      width: 100%;
    }
  }
  &__title {
    color: $grey-9;
    @include body1;
    text-align: center;
    margin-bottom: $space-3;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-6;
  }
}
</style>

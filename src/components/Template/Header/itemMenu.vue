<template>
  <div class="itemMenu">
    <q-item v-if="item.tags"
            v-ripple
            clickable
            :active="isRouteSelected(item.routeName)"
            active-class="active-item"
            :to="{ name: item.routeName, query: {'tags[]': item.tags} }">
      <q-item-section class="tab-title">
        {{ item.title }}
      </q-item-section>
    </q-item>
    <q-item v-else
            clickable
            :active="isRouteSelected(item.routeName)"
            active-class="active-item"
            :to="{ name: item.routeName }">
      <q-item-section class="tab-title">
        {{ item.title }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'itemMenu',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    isRouteSelected (itemName) {
      return (this.$route.name === itemName)
    }
  }
}
</script>

<style scoped lang="scss">
.itemMenu {
  .active-item {
    color: #FFC107;
  }
  .tab-title {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    white-space: nowrap;
  }
}
</style>

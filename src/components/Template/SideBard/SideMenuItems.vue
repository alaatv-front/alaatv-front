<template>
  <q-list v-for="(item , index) in menuItems"
          :key="index"
          class="SideMenuItems">
    <q-expansion-item v-if="!loading && item.children && item.children.length > 0 && canShowInSideMenu(item)"
                      :header-style="{height:'40px', borderRadius: '14px'}"
                      :label="item.title"
                      :icon="item.icon"
                      :default-opened="item.open">
      <side-menu-items :menu-items="item.children" />
    </q-expansion-item>
    <q-item v-else-if="!loading && !item.children && canShowInSideMenu(item)"
            v-ripple
            clickable
            :to="isValidRoute(item.route) ? item.route : null"
            @click="itemSelected(item)">
      <q-item-section>
        {{ item.title }}
      </q-item-section>
      <q-item-section v-if="item.badge"
                      avatar>
        <q-badge align="middle"
                 class="badge">
          {{ item.badge }}
        </q-badge>
      </q-item-section>
    </q-item>
    <q-skeleton v-if="loading" />
  </q-list>
</template>

<script>
export default {
  name: 'SideMenuItems',
  props: {
    menuItemsColor: {
      type: String,
      default: ''
    },
    menuItems: {
      type: Array,
      default: () => []
    },
    showChildItemTooltip: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  emits: ['itemSelected', 'update:menu'],
  data () {
    return {
      clickedItem: {
        title: ''
      }
    }
  },
  computed: {
    localMenuItems: {
      get () {
        return this.menuItems
      },
      set (newValue) {
        this.$emit('update:menuItems', newValue)
      }
    },
    selectedTopic() {
      return this.$store.getters['TripleTitleSet/selectedTopic']
    }
  },
  methods: {
    canShowInSideMenu (item) {
      return (typeof item.mobileMode === 'undefined' || item.mobileMode === true)
    },
    isValidRoute (route) {
      return route || route?.name || route?.path || (route?.query['tags[]'] && route.query['tags[]'].length > 0)
    },
    isActive(item) {
      return (item.title === this.selectedTopic) || (item.title === this.clickedItem.title)
    },
    redirectRoute(item) {
      if (item.tags) {
        return { name: 'Public.Content.Search', query: { 'tags[]': item.tags } }
      } else if (item.href) {
        return { path: item.href }
      } else if (!item.routeName) {
        return undefined
      }
      return { name: item.routeName }
    },
    itemSelected(item) {
      this.clickedItem = item
      this.$emit('itemSelected', item)
      if (!this.redirectRoute(item) && item.externalLink) {
        window.location.href = item.externalLink
      }
    },
    inactiveAllItems () {

    }
  }
}
</script>

<style lang="scss" scoped>
.SideMenuItems {
  :deep(.badge) {
    animation: badge 1s infinite;
  }

  :deep(.q-expansion-item) {
    .q-expansion-item__container {
      .q-expansion-item__content {
        padding-left: 18px;
      }
    }
  }

  :deep(.q-item) {
    &.q-router-link--active {
      color: inherit;
    }

    &.q-item--active,
    &.q-router-link--exact-active {
      color: $primary;
    }
  }
}

@keyframes badge {
  0% {
    box-shadow:0 0 0 0 rgb(55 55 55 / 68%);
  }

  70% {
    box-shadow:0 0 0 10px rgb(0 0 0 / 0%);
  }

  100% {
    box-shadow:0 0 0 0 rgb(0 0 0 / 0%);
  }
}
</style>

<template>
  <q-list class="side-menu-list"
          padding>
    <q-item class="menu-item top-search"
            :class="{'show-hamburger': showHamburger}">
      <div v-if="showHamburger"
           class="drawer-btn hamburger">
        <q-btn icon="ph:list"
               flat
               square
               @click="toggleLeftDrawer" />
      </div>
      <q-input v-model="searchText"
               class="gray-input search-input no-title"
               placeholder="جست و جو"
               @update:model-value ="search(topicsRouteArray)">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-item>
    <template v-if="!productLoading && !setListLoading && topicList.length > 0">
      <menu-item :key="menuKey"
                 :items="topicsRouteArray"
                 :show-child-item-tooltip="true"
                 @item-selected="itemSelected" />
      <q-item v-for="(item, index) in productItems"
              :key="index"
              :active="item.routeName === $route.name || item.name === selectedTopic"
              class="menu-item"
              :to="(item.routeName) ? { name: item.routeName, params: item.params } : null"
              exact>
        <q-item-section>
          {{item.label}}
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <q-item v-for="item in 4"
              :key="item"
              class="menu-item">
        <q-skeleton type="text"
                    class="full-width" />
      </q-item>
    </template>
  </q-list>
</template>

<script>
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'
import mixinEwano from 'src/components/Widgets/Ewano/mixinEwano.js'

export default {
  name: 'LayoutMenu',
  components: { menuItem },
  mixins: [mixinEwano],
  props: {
    productItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    topicsRouteArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    topicList: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedTopic: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  emits: ['itemSelected'],
  data () {
    return {
      menuKey: 0,
      searchText: '',
      clickedProductItem: ''
    }
  },
  computed: {
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    layoutLeftDrawerVisible () {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    },
    setListLoading () {
      return this.$store.getters['TripleTitleSet/setListLoading']
    },
    productLoading () {
      return this.$store.getters['TripleTitleSet/productLoading']
    }
  },
  watch: {
    topicList () {
      this.menuKey++
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', !this.layoutLeftDrawerVisible)
    },
    itemSelected (topic) {
      const isIframe = window.self !== window.top
      if (this.$q.screen.gt.sm && !isIframe) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 100)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', true)
      } else {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 350)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
        if (this.isEwanoUser) {
          setTimeout(() => {
            this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 350)
            this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
          }, 100)
        }
      }
      if (!this.$route.params.productId) {
        return
      }
      this.$emit('itemSelected', topic)
      this.$store.commit('TripleTitleSet/updateSelectedTopic', topic.title)
      this.$router.push({
        name: 'UserPanel.Asset.TripleTitleSet.ProductPage',
        params: {
          productId: this.$route.params.productId
        }
      })
    },
    search (list, parentContain = false) {
      // if (!list || list.length === 0) {
      //   return false
      // }
      // if (parentContain) {
      //   return true
      // }
      // let flag = false
      // list.forEach(item => {
      //   const contain = item.title.includes(this.searchText)
      //   if (this.search(item.children, contain) || contain) {
      //     flag = true
      //     item.show = true
      //     item.open = true
      //   } else {
      //     item.open = false
      //     item.show = false
      //   }
      // })
      // return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style scoped lang="scss">
.q-list {
  padding: 0;
  height: calc(100vh - 200px);
  &.side-menu-list {
    :deep(.menu-item) {
      .q-expansion-item {
        margin-left: 0;
        box-shadow: none;
        .q-expansion-item__container {
          .q-item {
            padding-top: $space-2;
            padding-bottom: $space-2;
            min-height: $space-9;
            border-radius: $radius-none;
          }
          .q-expansion-item__content {
            padding-left: 0;
            padding-right: 0;
            .expansion-body {
              & > .q-separator {
                display: none;
              }
              & > .q-list {
                .q-item {
                  margin-left: $space-1;
                }
              }
            }
          }
        }
      }
    }

    & > .q-item {
      :deep(.q-btn) {
        padding: 0;
        .q-btn__content {
          padding-left: $space-1;
          padding-right: $space-1;
          display: flex;
        }
      }
    }
  }
}
</style>

<template>
  <div class="side-menu-body chatr-menu-body">
    <q-list class="side-menu-list"
            padding>
      <div v-if="showHamburger"
           class="drawer-btn hamburger">
        <q-btn icon="ph:list"
               flat
               @click="toggleLeftDrawer" />
      </div>
      <q-input v-model="searchText"
               class="gray-input search-input"
               placeholder="جست و جو"
               @update:model-value ="search(topicsRouteArray)">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <menu-item :key="menuKey"
                 :items="topicsRouteArray"
                 :show-child-item-tooltip="true"
                 :loading="topicList.length === 0"
                 @item-selected="itemSelected" />
      <q-item v-for="(item, index) in productItems"
              :key="index"
              :active="item.routeName === $route.name"
              class="menu-item">
        <q-btn flat
               class="full-width menu-item-btn"
               color="background: #EAEAEA;"
               :to="(item.routeName) ?{ name: item.routeName, params: item.params }: null"
               :style="{background: item.name === selectedTopic? '#EAEAEA' : ''}"
               @click="setSelectedTopic(item.name)">
          <div class="label">{{item.label}}</div>
          <div />
        </q-btn>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'

export default {
  name: 'LayoutMenu',
  components: { menuItem },
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
      if (this.$q.screen.lt.md) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
      }
      if (!this.$route.params.productId) {
        return
      }
      this.$emit('itemSelected', topic)
      this.$router.push({
        name: 'UserPanel.Asset.TripleTitleSet.ProductPage',
        params: {
          productId: this.$route.params.productId
        }
      })
    },
    setSelectedTopic (TopicName) {
      this.clickedProductItem = TopicName
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
.side-menu-body {
  display: grid;
  height: calc(100vh - 200px);
  grid-template-rows: 1fr 2fr;

  .q-list {
    padding: 0;

    &.side-menu-list {
      .search-input {
        margin-bottom: 30px;
      }

      margin: 0 24px 109px;

      :deep(.menu-item) {
        .list-child-item {
          max-width: 260px;
        }
      }

      .menu-item-btn {
        :deep(.q-btn__content) {
          width: 100%;
          display: grid;
          grid-template-columns: auto auto auto;

          //width: 100%;
          padding: 5px 10px;
          justify-content: normal;

          .label {
            font-weight: 400;
            font-size: 20px ;
            line-height: 28px;
          }
        }
      }

      @media screen and (width <= 1919px) {
        margin: 0 24px 34px;
      }

      @media screen and (width <= 1439px) {
        margin: 0 21px 26px;
      }

      @media screen and (width <= 599px) {
        margin: 0 18px 8px;
      }

      .top-separator {
        margin: 0 40px 32px;

        @media screen and (width <= 1919px) {
          margin: 0 30px 25px;
        }

        @media screen and (width <= 1439px) {
          margin: 0 45px 22px;
        }
      }

      .q-item {
        padding: 0;
        min-height: 0;
      }
    }
  }

  .log-out {
    align-self: end;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    height: 40px !important;

    //width: 232px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0 14px 0 10px;
    margin: 0 0 36px 27px;

    @media screen and (width <= 1439px) {
      margin: 0 31px 33px;
    }

    @media screen and (width <= 599px) {
      margin: 0 30px 30px;

      //padding: 0 0 0 10px;
    }

    &:hover {
      background-color: rgb(255 255 255 / 10%);
    }

    .q-avatar {
      height: 22px;
      width: 22px;
      margin-right: 12px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
  }
}
</style>

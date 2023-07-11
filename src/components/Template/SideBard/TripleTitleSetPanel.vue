<template>
  <div class="chatr-side-menu">
    <div v-if="isDesktop"
         class="side-menu">
      <div class="menu-logo">
        <router-link :to="{name: 'Public.Home'}">
          <q-img src="https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png"
                 class="logo-image" />
        </router-link>
      </div>
      <div class="menu-items">
        <q-list class="menu-items-list">
          <q-item v-for="(item, index) in menuItems"
                  :key="index"
                  :to="{name:item.routeName }"
                  class="menu-item">
            <div v-if="$route.name === item.routeName"
                 class="menu-indicator" />
            <q-icon class="icon"
                    :class="[ $route.name===item.routeName ? 'activate' :'']"
                    :name="item.icon" />
          </q-item>
        </q-list>
      </div>
      <div class="log-out menu-items">
        <q-list class="menu-items-list">
          <q-item class="menu-item">
            <q-btn round
                   flat
                   dense
                   size="md"
                   color="black"
                   icon="isax:logout"
                   @click="logOut" />
          </q-item>
        </q-list>
      </div>
    </div>
    <layout-menu v-else
                 class="side-menu-items"
                 :topics-route-array="topicsRouteArray"
                 :topic-list="topicList"
                 :menu-key="menuKey"
                 :selected-topic="selectedTopic"
                 :product-items="productItems"
                 @item-selected="itemSelected" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import LayoutMenu from 'src/components/DashboardTripleTitleSet/LayoutMenu.vue'

export default {
  name: 'TripleTitleSetPanel',
  components: { LayoutMenu },
  data: () => ({
    isActive: null,
    menuItems: [
      {
        icon: 'isax:play',
        routeName: 'UserPanel.Asset.TripleTitleSet.Products'
      }
      // {
      //   icon: 'list-check',
      //   routeName: 'my-performance'
      //
      // },
      // {
      //   icon: 'stats',
      //   routeName: 'assessment'
      // },
    ],
    topicsRouteArray: [
      {
        title: 'سر فصل ها',
        icon: 'isax:document-upload',
        routeName: '',
        active: false,
        show: true,
        open: true,
        children: [
          {
            title: 'تایتل ست',
            routeName: 'UserPanel.Asset.TripleTitleSet.Products',
            active: false,
            show: true,
            open: false
          }
        ]
      }
    ],
    menuKey: 0,
    productItems: [
      {
        name: 'pamphlet',
        routeName: 'UserPanel.Asset.TripleTitleSet.ProductDocuments',
        label: 'جزوات'
      },
      {
        name: 'notes',
        routeName: 'UserPanel.Asset.TripleTitleSet.ProductComments',
        label: 'یادداشت ها'
      },
      {
        name: 'favoredContents',
        routeName: 'UserPanel.Asset.TripleTitleSet.ProductBookmarks',
        label: 'نشان شده ها'
      }
    ]
  }),
  computed: {
    topicList () {
      const topicList = this.$store.getters['TripleTitleSet/setTopicList']
      this.fillTopicsRouteArray(topicList)
      return topicList
    },
    selectedTopic () {
      return this.$store.getters['TripleTitleSet/selectedTopic'] || ''
    },
    isDesktop () {
      if (this.$q.screen.lt.md) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 350)
      } else {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 100)
      }
      return !this.$q.screen.lt.md
    }
  },
  created() {
  // this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 350)
  },
  methods: {
    ...mapMutations('TripleTitleSet', [
      'updateSelectedTopic'
    ]),
    logOut() {
      this.$store.dispatch('Auth/logOut')
    },
    fillTopicsRouteArray (topicList) {
      this.topicsRouteArray[0].children = []
      topicList.forEach(topic => {
        this.topicsRouteArray[0].children.push({
          title: topic,
          value: topic,
          active: false,
          show: true,
          open: false
        })
      })
      this.menuKey++
    },
    itemSelected (topic) {
      this.updateSelectedTopic(topic.title)
    }
  }
}
</script>

<style scoped lang="scss">
.side-menu{
  min-height: calc(100vh - 2px) ;
  height: 100vh;
  display: grid !important;
  border-right: 1px solid #e0e0e0;
  .menu-logo {
    text-align: center;
    margin: 30px auto 130px;
    height: 60px;
    @media screen and (max-width: 1904px){
      margin: 20px auto 76px;
    }
    @media screen and (max-width: 1200px){
      margin: 20px auto 66px;
    }
    @media screen and (max-width: 960px){
      margin: 10px auto 266px !important;
    }
    .logo-image{
      width: 60px;
      height: 60px;
      @media screen and (max-width: 1200px){
        width: 50px;
        height: 50px;
      }
      @media screen and (max-width: 960px){
        width: 40px;
        height: 40px;
      }
    }
    @media screen and (max-width: 1200px){
      height: 50px;
    }
    @media screen and (max-width: 960px){
      height: 40px;
    }
  }
  .menu-items{
    position: relative;
    .menu-items-list{
      position: relative;
      padding: 0;
      .menu-item{
        margin-bottom: 26px;
        text-align: center;
        display: flex;
        justify-content: center;
        .activate{
          color: var(--alaa-Secondary) !important;
        }
        .menu-indicator{
          position: absolute;
          height: 36px;
          width: 8px;
          background-color:var(--alaa-Secondary) ;
          border: none;
          border-radius:0 6px 6px 0;
          left: 0;
          @media screen and (max-width: 1200px){
            height: 32px;
            border-radius:4px 0 0 4px;
          }
          @media screen and (max-width: 960px){
            height: 28px;
            width: 6px;
          }
        }
        :deep(.icon){
          color: #333333;
          font-size: 26px;
          position: relative;
          top: 5px;
          @media screen and (max-width: 1200px){
            font-size: 20px;
          }
          @media screen and (max-width: 960px){
            font-size: 19px;
          }
        }
        @media screen and (max-width: 1200px){
          margin-bottom:16px !important;
          vertical-align: middle;
        }
        @media screen and (max-width: 960px){
          margin-bottom:12px !important;
        }
      }
    }
  }
  @media screen and (max-width: 768px){
    display: none;
  }
}
.side-menu-items{
  padding: 20px;
}
</style>

<template>
  <div class="chatre-nejat-layout">
    <div class="side-menu-main-layout bg-white">
      <div class="header">
        <div class="product-box">
          <div class="photo">
            <q-img v-if="!productLoading"
                   :src="productImg"
                   class="product-image" />
            <q-skeleton v-else
                        size="50px"
                        class="q-pb-md" />
          </div>
          <div class="title">
            <div class="hidden">{{topicList}}</div>
            {{ productTitle }}
            <q-skeleton v-if="productLoading" />
          </div>
        </div>
        <div class="back-btn">
          <q-btn flat
                 icon-right="ph:caret-left"
                 :to="{ name: 'UserPanel.Asset.TripleTitleSet.Products' }">بازگشت</q-btn>
        </div>
      </div>
<!--      <layout-menu :menu-key="menuKey"-->
<!--                   :topics-route-array="topicsRouteArray"-->
<!--                   :topic-list="topicList"-->
<!--                   :selected-topic="selectedTopic"-->
<!--                   :product-items="productItems"-->
<!--                   @item-selected="itemSelected" />-->
    </div>
    <div class="container">
      <div class="header">
        <div v-if="showHamburger"
             class="drawer-btn hamburger">
          <q-btn class="toolbar-button"
                 icon="ph:list"
                 square
                 color="grey"
                 @click="toggleLeftDrawer" />
        </div>
        <div class="breadcrumbs flex items-center">
          <div class="product-title">
            {{ productTitle }}
            <q-skeleton v-if="productLoading"
                        type="QBadge" />
          </div>
          <q-icon v-if="!!selectedTopic"
                  name="chevron_left" />
          <div v-if="!!selectedTopic"
               class="set-title">{{ selectedTopic }}</div>
          <q-icon v-if="!!selectedContentTitle"
                  name="chevron_left" />
          <div v-if="!!selectedContentTitle"
               class="content-title">{{ selectedContentTitle }}</div>
        </div>
        <div class="back-btn">
          <q-btn flat
                 icon-right="chevron_left"
                 @click="goBack">بازگشت</q-btn>
        </div>
      </div>
      <div class="content">
        <router :include="keepAliveComponents" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Router from 'src/router/Router.vue'
import { Content } from 'src/models/Content.js'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'
// import LayoutMenu from 'src/components/DashboardTripleTitleSet/LayoutMenu.vue'

export default {
  name: 'TripleTitleSetLayout',
  components: {
    // LayoutMenu,
    Router
  },
  data () {
    return {
      menuKey: 0,
      keepAliveComponents: KeepAliveComponents,
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
      ],
      clickedItem: null,
      searchText: '',
      topicsRouteArray: [
        {
          title: 'سر فصل ها',
          icon: '',
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
      ]
    }
  },
  computed: {
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    topicList () {
      const topicList = this.$store.getters['TripleTitleSet/setTopicList']
      this.fillTopicsRouteArray(topicList)
      return topicList
    },
    setList () {
      return this.$store.getters['TripleTitleSet/setList']
    },
    selectedProduct () {
      return this.$store.getters['TripleTitleSet/selectedProduct']
    },
    selectedTopic () {
      return this.$store.getters['TripleTitleSet/selectedTopic'] || ''
    },
    selectedContent () {
      if (!this.$route.params?.contentId) {
        return new Content()
      }
      return this.$store.getters['TripleTitleSet/selectedContent']
    },
    selectedContentTitle () {
      return this.selectedContent?.title
    },
    productTitle () {
      return this.selectedProduct?.title
    },
    productLoading () {
      return !this.selectedProduct?.title
    },
    productImg () {
      return this.selectedProduct?.photo
    },
    productId () {
      return this.selectedProduct?.id
    }
  },
  methods: {
    goBack () {
      if (this.$route.name === 'UserPanel.Asset.TripleTitleSet.ProductPage') {
        this.$router.push(
          { name: 'UserPanel.Asset.TripleTitleSet.Products' }
        )
        return
      } else if (this.$route.params?.contentId) {
        this.$router.push(
          { name: 'UserPanel.Asset.TripleTitleSet.ProductPage', params: { productId: this.productId } }
        )
        return
      }
      this.$router.back()
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
    },
    updateSetList (normalizedSets) {
      this.setList = normalizedSets
    },
    updateTopicList (topicList) {
      this.topicList = topicList
    },
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    ...mapMutations('TripleTitleSet', [
      'updateSelectedTopic'
    ]),
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    setSelectedTopic (TopicName) {},
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.chatre-nejat-layout {
  display: grid;
  grid-template-columns: 350px auto;

  @media screen and (width <= 1024px) {
    grid-template-columns: auto;
  }

  .side-menu-main-layout {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: calc(100vh - 65px);
    width: 350px;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: #333;

    .back-btn {
      text-align: end;
      cursor: pointer;

      .alaa-logo {
        width: 50px;
      }

      .logo-image {
        text-align: left;

        .q-img__container {
        }
      }
    }

    .header {
      //display: grid;
      //grid-template-columns: auto auto;
      padding: 0 25px;

      .product-box {
        margin-bottom: 20px;

        .photo {
          width: 50px;
          height: 50px;
          margin-bottom: 10px;

          :deep(.q-img) {
            border-radius: 10px;
          }
        }
      }

      .back-btn {
        position: absolute;
        top: 70px;
        left: 350px;
      }
    }

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

          .menu-item-btn {
            :deep(.q-btn__content) {
              width: 100%;
              display: grid;
              grid-template-columns: auto auto auto;

              //width: 100%;
              padding: 5px 10px;
              justify-content: normal;

              .label {
                font-size: 16px;
                font-weight: 400;
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

    &:deep(.side-menu-main-layout) {
      .q-expansion-item__container {
        .q-item {
          display: flex;
          padding: 0 10px !important;
        }

        .q-icon {
          font-size: 21px;
        }
      }
    }

    @media screen and (width <= 1024px) {
      display: none;
    }
  }

  .container {
    //justify-self: center;
    .header {
      padding-right: 20px;
      padding-left: 20px;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;

      @media screen and (width <= 1024px) {
        display: grid;
        grid-template-columns: 40px 1fr auto;
      }

      .breadcrumbs {
        @media screen and (width <= 1024px) {
          justify-self: self-start;
          padding-left: 10px;
        }
      }
    }

    .content {
      height: calc(100vh - 124px);
      overflow-x: scroll;
    }
  }
}

</style>

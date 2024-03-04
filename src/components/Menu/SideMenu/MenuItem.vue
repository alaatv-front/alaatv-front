<template>
  <div v-for="(item , index) in computedMenu"
       :key="index"
       class="menu-item">
    <q-expansion-item v-if="!loading && item.children && item.children.length > 0"
                      :header-style="{height:'40px', borderRadius: '14px'}"
                      :label="item.title"
                      :icon="item.icon"
                      :default-opened="item.open"
                      class="side-expansion-list">
      <div class="expansion-body">
        <q-separator dark
                     size="2px"
                     vertical
                     class="vertical-separator" />
        <q-list class="list-expansion">
          <div v-for="(subItem , i) in item.children"
               :key="i">
            <menu-item v-if="subItem.children && subItem.children.length > 0"
                       :items="[subItem]"
                       @item-selected="itemSelected(item)" />
            <q-item v-else
                    v-ripple
                    clickable
                    :active="isActive(subItem)"
                    :to="redirectRoute(subItem)"
                    class="list-child-item"
                    exact-active-class="active-route"
                    @click="itemSelected(subItem)">
              <q-tooltip v-if="showChildItemTooltip"
                         anchor="top middle"
                         self="bottom middle"
                         :offset="[10, 10]">
                {{ subItem.title }}
              </q-tooltip>
              <q-item-section class="list-child-section">
                <q-item-label lines="1">{{ subItem.title }}</q-item-label>
              </q-item-section>
              <q-badge v-if="subItem.badge"
                       class="badge q-py-xs"
                       align="middle">
                {{subItem.badge}}
              </q-badge>
              <span class="indicator" />
            </q-item>
          </div>
        </q-list>
      </div>
    </q-expansion-item>
    <!--    (item.title === clickedItem.title) || -->
    <q-item v-else-if="!loading && !item.children"
            v-ripple
            clickable
            :active="isActive(item)"
            :to="redirectRoute(item)"
            class="item-list"
            :class="{ 'alone-item': !item.children }"
            exact-active-class="active-route"
            @click="itemSelected(item)">
      <q-item-section class="list-section title-icon"
                      avatar>
        <q-icon :name="item.icon"
                size="30" />
      </q-item-section>
      <q-item-section class="list-section">
        {{ item.title }}
      </q-item-section>
    </q-item>
    <q-badge v-if="item.badge"
             align="middle">
      {{item.badge}}
    </q-badge>
    <q-skeleton v-if="loading" />
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuItemsColor: {
      type: String,
      default: ''
    },
    menu: {
      // ToDO: will be deprecate
      type: Array,
      default: () => []
    },
    items: {
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
      },
      menuItems: []
    }
  },
  computed: {
    computedMenu: {
      get () {
        if (this.menu.length > 0) {
          return this.menu
        } else {
          return this.items
        }
      },
      set (value) {
        this.menuItems = value
        this.$emit('update:menu', this.menuItems)
      }
    },
    selectedTopic () {
      return this.$store.getters['TripleTitleSet/selectedTopic']
    }
  },
  methods: {
    isActive (item) {
      return (item.title === this.selectedTopic) || (item.title === this.clickedItem.title)
    },
    redirectRoute (item) {
      if (item.tags) {
        return { name: 'Public.Content.Search', query: { 'tags[]': item.tags } }
      } else if (item.href) {
        return { path: item.href }
      } else if (!item.routeName) {
        return undefined
      }
      return { name: item.routeName }
    },
    itemSelected (item) {
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
.side-menu-main-layout {
  display: flex;
  flex-direction: column;
  width: 280px;
  min-height: 840px;
  border-radius: 30px;
  margin: 40px 24px;

  @media screen and (width <= 1919px) {
    width: 260px;
    min-height: 740px;
    margin: 30px 30px 30px 24px;
  }

  @media screen and (width <= 1439px) {
    margin: 0 !important;
    border-radius: 0;
    width: 280px;
    min-height: 680px;
    height: 100%;
  }

  @media screen and (width <= 599px) {
    width: 100%;
  }

  .side-logo {
    display: flex;
    height: 167px;
    align-items: center;
    justify-content: center;

    @media screen and (width <= 1919px) {
      height: 136px;
    }

    @media screen and (width <= 1439px) {
      height: 100px;
    }

    @media screen and (width <= 599px) {
      height: 110px;
    }

    .logo-image {
      width: 140px;
      height: 95px;

      @media screen and (width <= 1919px) {
        height: 76px;
      }

      @media screen and (width <= 1439px) {
        width: 100px;
        height: 50px;
      }

      .q-img__container {
        width: 140px;
        height: 95px;

        @media screen and (width <= 1919px) {
          height: 76px;
        }

        @media screen and (width <= 1439px) {
          width: 100px;
          height: 50px;
        }
      }
    }
  }

  .q-list {
    padding: 0;

    &.side-menu-list {
      margin: 0 24px 109px;

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

        &.item-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          line-height: 28px;
          cursor: pointer;
          padding: 0 14px 0 10px;
          border-radius: 14px;

          &.alone-item {
            height: 40px;

            &.active-route {
              .indicator {
                height: 8px;
                width: 8px;
                background-color: white;
                border-radius: 50%;
                margin: auto;
              }
            }
          }

          .list-section {
            display: flex;
            flex-direction: row;
            justify-content: left;

            .q-avatar {
              height: 22px;
              width: 22px;
            }
          }
        }
      }

      .side-expansion-list {
        margin-left: 12px;

        :deep(.q-item) {
          padding-left: 40px;
        }

        &.top-expansion {
          margin-bottom: 10px;
        }

        .expansion-body {
          color: v-bind('menuItemsColor');
        }

        .q-expansion-item__content {
          .vertical-separator {
            margin: 6px 9px 9px;

            @media screen and (width <= 599px) {
              margin: 0 10px 12px;
            }
          }
        }

        .q-list {
          &.list-expansion {
            margin-bottom: 0;

            .item-list-expansion {
              height: 30px;
              margin: 5px;

              .item-list-expansion-title {
                justify-content: start;
                font-weight: 400;
                font-size: 20px;
                line-height: 28px;
              }
            }

            .top-expansion-separator {
              margin: 0 40px 5px;

              @media screen and (width <= 1439px) {
                margin: 0 30px 5px;
              }

              @media screen and (width <= 599px) {
                margin: 0 45px 5px;
              }
            }

            .list-child-item {
              height: 40px;
              justify-content: right;
              margin-bottom: 8px;
              margin-left: 20px;

              //width: 157px;
              border-radius: 10px;
              padding: 0 14px;
              display: flex;
              align-items: center;

              .list-child-section {
                font-weight: 400;
                font-size: 15px;
                line-height: 25px;
                margin-right: 5px;
              }

              @media screen and (width <= 1439px) {
                width: 100%;
              }

              @media screen and (width <= 599px) {
                width: 100%;
                margin-bottom: 5px;
                padding: 0 10px 0 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }

              .list-child-section {
                //font-size: 16px !important;
                justify-content: center;
              }
            }
          }
        }
      }

      .active-route {
        background-color: #ffe9cc;

        .indicator {
          height: 6px;
          width: 6px;
          background-color: white;
          border-radius: 50%;
          margin: auto;
        }
      }

    }

    .q-item__section--avatar {
      min-width: 0 !important;
    }

    a {
      text-decoration: none;
      padding: 0;
    }
  }

  .log-out {
    color: white;
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

.expansion-header {
  font-size: 20px;
  line-height: 28px;
}
</style>

<style lang="css" scoped>
.badge{
  animation: badge 1s infinite;
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

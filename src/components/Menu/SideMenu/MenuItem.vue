<template>
  <div v-for="(item , index) in menu"
       :key="index">
    <q-expansion-item v-if="item.children && item.children.length && item.show"
                      v-model="item.open"
                      :header-style="{fontSize:'16px', height:'40px', borderRadius: '14px'}"
                      :label="item.title"
                      :icon="item.icon"
                      class="side-expansion-list">
      <div class="expansion-body">
        <q-separator dark
                     size="2px"
                     vertical
                     class="vertical-separator" />
        <q-list class="list-expansion">
          <div v-for="(subItem , i) in item.children"
               :key="i">
            <menu-item v-if="subItem.children && subItem.children.length && item.show"
                       :menu="[subItem]" />
            <q-item v-else-if="subItem.show"
                    :to="{ name: subItem.routeName, params: subItem.params }"
                    class="list-child-item"
                    exact-active-class="active-route">
              <q-item-section class="list-child-section">
                {{ subItem.title }}
              </q-item-section>
              <span class="indicator" />
            </q-item>
          </div>
        </q-list>
      </div>
    </q-expansion-item>
    <q-item v-else-if="item.show"
            v-model="clickedItem"
            :to="(item.routeName) ? {name: item.routeName} : null"
            class="item-list"
            :class="{ 'alone-item': !item.children }"
            exact-active-class="active-route">
      <div class="section-title">
        <q-item-section class="list-section title-icon"
                        avatar>
          <q-avatar :icon="item.icon"
                    size="30" />
        </q-item-section>
        <q-item-section class="list-section">
          {{ item.title }}
        </q-item-section>
        <!--        <span class="indicator" />-->
      </div>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data () {
    return {
      clickedItem: null
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
  @media screen and (max-width: 1919px) {
    width: 260px;
    min-height: 740px;
    margin: 30px 30px 30px 24px;
  }
  @media screen and (max-width: 1439px) {
    margin: 0 !important;
    border-radius: 0;
    width: 280px;
    min-height: 680px;
    height: 100%;
  }
  @media screen and (max-width: 599px) {
    width: 100%;
  }

  .side-logo {
    display: flex;
    height: 167px;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1919px) {
      height: 136px;
    }
    @media screen and (max-width: 1439px) {
      height: 100px;
    }
    @media screen and (max-width: 599px) {
      height: 110px;
    }

    .logo-image {
      width: 140px;
      height: 95px;
      @media screen and (max-width: 1919px) {
        height: 76px;
      }
      @media screen and (max-width: 1439px) {
        width: 100px;
        height: 50px;
      }

      .q-img__container {
        width: 140px;
        height: 95px;
        @media screen and (max-width: 1919px) {
          height: 76px;
        }
        @media screen and (max-width: 1439px) {
          width: 100px;
          height: 50px;
        }
      }
    }
  }

  .q-list {
    padding: 0;

    &.side-menu-list {
      margin: 0 24px 109px 24px;
      @media screen and (max-width: 1919px) {
        margin: 0 24px 34px 24px;
      }
      @media screen and (max-width: 1439px) {
        margin: 0 21px 26px 21px;
      }
      @media screen and (max-width: 599px) {
        margin: 0 18px 8px 18px;
      }

      .top-separator {
        margin: 0 40px 32px 40px;
        @media screen and (max-width: 1919px) {
          margin: 0 30px 25px 30px;
        }
        @media screen and (max-width: 1439px) {
          margin: 0 45px 22px 45px;
        }
      }

      .q-item {
        padding: 0;
        min-height: 0;

        &.item-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
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

          .section-title {
            height: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;

            .title-icon {
              margin-right: 12px;
            }

            .q-item__section--side {
              padding: 0;
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
        &.top-expansion {
          margin-bottom: 10px;
        }

        .expansion-body {
          display: flex;
          margin-left: 8px;
        }

        .q-expansion-item__content {
          .vertical-separator {
            margin: 6px 9px 9px 9px;
            @media screen and (max-width: 599px) {
              margin: 0 10px 12px 10px;
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
              }
            }

            .top-expansion-separator {
              margin: 0 40px 5px 40px;
              @media screen and (max-width: 1439px) {
                margin: 0 30px 5px 30px;
              }
              @media screen and (max-width: 599px) {
                margin: 0 45px 5px 45px;
              }
            }

            .list-child-item {
              height: 30px;
              justify-content: right;
              margin-bottom: 8px;
              width: 157px;
              border-radius: 10px;
              padding: 0 14px;
              @media screen and (max-width: 1439px) {
                width: 148px;
              }
              @media screen and (max-width: 599px) {
                width: 160px;
                margin-bottom: 5px;
                padding: 0 10px 0 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }

              .list-child-section {
                font-size: 14px !important;
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
    @media screen and (max-width: 1439px) {
      margin: 0 31px 33px 31px;
    }
    @media screen and (max-width: 599px) {
      margin: 0 30px 30px 30px;
      //padding: 0 0 0 10px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
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

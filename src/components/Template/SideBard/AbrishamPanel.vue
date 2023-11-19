<template>
  <div class="side-menu">
    <div class="menu-logo">
      <q-img src="https://nodes.alaatv.com/upload/abrisham-panel-logo.png"
             class="logo-image" />
    </div>
    <div class="menu-items">
      <q-list class="menu-items-list">
        <q-item v-for="(item, index) in menuItems"
                :key="index"
                :to="{name:item.routeName(isPro) }"
                class="menu-item">
          <div v-if="$route.name === item.routeName(isPro)"
               class="menu-indicator" />
          <q-icon :name="item.icon"
                  size="26px" />
        </q-item>
      </q-list>
    </div>

  </div>
</template>

<script>

export default {
  name: 'AbrishamSideMenu',
  data: () => ({
    isActive: null,
    menuItems: [
      {
        icon: 'isax:play',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Progress'
      },
      // {
      //   icon: 'isax:calendar',
      //   routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Schedule'
      // },
      {
        icon: 'isax:headphone',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Consulting'
      },
      {
        icon: 'isax:firstline',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.News'
      },
      {
        icon: 'isax:map',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Map'
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

    ]
  }),
  computed: {
    isPro () {
      return this.$route.name.includes('UserPanel.Asset.AbrishamPro.')
    }
  }
}
</script>

<style scoped lang="scss">
.side-menu{
  min-height: calc(100vh - 2px) ;
  display: flex !important;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  background: white;
  height: 100%;

  .menu-logo {
    text-align: center;
    margin: 30px auto 130px;
    height: 60px;

    @media screen and (width <= 1904px){
      margin: 20px auto 76px;
    }

    @media screen and (width <= 1200px){
      margin: 20px auto 66px;
    }

    @media screen and (width <= 960px){
      margin: 10px auto 266px !important;
    }

    .logo-image{
      width: 60px;
      height: 60px;

      @media screen and (width <= 1200px){
        width: 50px;
        height: 50px;
      }

      @media screen and (width <= 960px){
        width: 40px;
        height: 40px;
      }
    }

    @media screen and (width <= 1200px){
      height: 50px;
    }

    @media screen and (width <= 960px){
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
        align-items: center;

        .activate{
          color: #ff8f00 !important;
        }

        .menu-indicator{
          position: absolute;
          height: 36px;
          width: 8px;
          background-color:#ff8f00 ;
          border: none;
          border-radius:0 6px 6px 0;
          left: 0;

          @media screen and (width <= 1200px){
            height: 32px;
            border-radius:4px 0 0 4px;
          }

          @media screen and (width <= 960px){
            height: 28px;
            width: 6px;
          }
        }

        :deep(.icon){
          color: #b1ccee;
          font-size: 26px;
          position: relative;
          top: 5px;

          @media screen and (width <= 1200px){
            font-size: 20px;
          }

          @media screen and (width <= 960px){
            font-size: 19px;
          }
        }

        @media screen and (width <= 1200px){
          margin-bottom:16px !important;
          vertical-align: middle;
        }

        @media screen and (width <= 960px){
          margin-bottom:12px !important;
        }
      }
    }
  }

  @media screen and (width <= 768px){
    display: none;
  }
}
</style>

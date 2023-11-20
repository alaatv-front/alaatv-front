<template>
  <div class="abrisham-layout">
    <q-expansion-item v-model="expandedNavigation"
                      class="md-hide xl-hide lg-hide  bg-white expanded-navigation q-mt-lg"
                      :icon="activePage?.icon"
                      :label="activePage?.title"
                      expand-icon-class="expanded-icon-color">
      <template v-slot:header>
        <q-item-section avatar>
          <i class="header-icon flex"
             :class="['fi-rr-' + activePage.icon]" />
        </q-item-section>

        <q-item-section class="text-center">
          {{activePage.title}}
        </q-item-section>

        <q-item-section side />
      </template>
      <q-list class="">
        <div v-for="(item, index) in menuItem"
             :key="index">
          <q-separator class="q-mx-lg" />
          <q-item v-if="activePage && item.icon !== activePage.icon"
                  v-ripple
                  clickable
                  :to="{name:item.routeName(isPro)}"
                  class="menu-item"
                  @click='setActivePage(item)'>
            <q-item-section class="text-center">
              <q-icon :name="item.icon"
                      size="20px" />
              <!--              <i class="menu-item-icon flex"-->
              <!--                 :class="['fi-rr-' + item.icon]" />-->
              <span class="title">
                {{item.title}}
              </span>
            </q-item-section>
          </q-item>

        </div>

      </q-list>
    </q-expansion-item>
    <router :include="keepAliveComponents" />
  </div>

</template>

<script>
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'assets/js/KeepAliveComponents.js'
export default {
  name: 'AbrishamLayout',
  components: { Router },
  data: () => ({
    keepAliveComponents: KeepAliveComponents,
    expandedNavigation: null,
    activePage: {
      icon: 'isax:play',
      routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Progress',
      title: 'فیلم ها'
    },
    menuItem: [
      {
        icon: 'isax:play',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Progress',
        title: 'فیلم ها'
      },
      // {
      //   icon: 'isax:calendar',
      //   routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Schedule',
      //   title: 'برنامه مطالعاتی'
      // },
      {
        icon: 'isax:headphone',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Consulting',
        title: 'مشاوره'
      },
      {
        icon: 'isax:firstline',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.News',
        title: 'اخبار و اطلاعیه'
      }, {
        icon: 'isax:map',
        routeName: (isPro) => 'UserPanel.Asset.Abrisham' + (isPro ? 'Pro' : '') + '.Map',
        title: 'نقشه'
      }
    ]
  }),
  computed: {
    isPro () {
      return this.$route.name.includes('UserPanel.Asset.AbrishamPro.')
    }
  },
  created () {
    this.activePage = this.getPageFromRouteName()
  },
  mounted () {
    this.activePage = this.getPageFromRouteName()
    if (window.innerWidth < 1024) {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
    }
  },
  methods: {
    getPageFromRouteName () {
      const page = this.menuItem.find(item => item.routeName(this.isPro) === this.$route.name)
      if (page) {
        return page
      }

      return this.menuItem[0]
    },
    setActivePage (currentPage) {
      this.activePage = currentPage
    }
  }
}
</script>
<style>
.q-menu{
  border-radius: 0 0 20px 20px;
  box-shadow: 0 3px 10px 0 rgb(44 91 185 / 15%);
  background-color: #fff;
}

.q-menu .q-item--active{
color: #3e5480;
}
</style>
<style scoped lang="scss">
.desktop{
  &:deep(.q-menu){
    background: #bd70ff !important;
  }
}

.body.body--light{
  background: white!important;
}

.abrisham-layout{
  background: white;

  .menu-item {
    :deep(.q-item__section) {
      align-items: center;
      display: grid;
      grid-template-columns: 20px 1fr;
    }

    .title {
      justify-self: center;
    }
  }

  @media screen and (width <= 1023px) {
    padding: 0 21px;
  }

  @media screen and (width <= 990px) {
    padding: 0 15px;
  }

  @media screen and (width <= 575px) {
    padding: 0 10px;
  }

  .expanded-navigation{
    max-width: 554px;
    margin: 10px auto;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #3e5480;

    &:deep(.q-icon){
      color: #FFCA28;
      font-weight: 500;
    }

    &:deep(.expanded-icon-color){
      font-size: 50px;

      i {
        color: #3e5480 !important;
        font-weight: 500;
      }
    }

    &:deep(.q-item){
      padding: 11px 24px;
    }

    &:deep(.q-list){
      padding: 0;
    }

    .header-icon{
      color: #FFCA28;
      font-size: 22px;
    }

    .menu-item-icon{
      position: absolute;
      font-size: 22px;
      color: #b1ccee;
    }

  }

  &:deep(.q-expansion-item){
    border-radius: 15px;
    box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
  }

  &:deep(.q-item__label){
    text-align: center;
  }
}

</style>

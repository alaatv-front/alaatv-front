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
                  :to="{name:item.routeName}"
                  @click='setActivePage(item)'>
            <q-item-section class="text-center">
              <i class="menu-item-icon flex"
                 :class="['fi-rr-' + item.icon]" />
              {{item.title}}
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
      icon: 'calendar',
      routeName: 'UserPanel.Asset.Abrisham.Schedule',
      title: 'برنامه مطالعاتی'
    },
    menuItem: [
      {
        icon: 'play-alt',
        routeName: 'UserPanel.Asset.Abrisham.Progress',
        title: 'فیلم ها'
      },
      {
        icon: 'calendar',
        routeName: 'UserPanel.Asset.Abrisham.Schedule',
        title: 'برنامه مطالعاتی'
      },
      {
        icon: 'headphones',
        routeName: 'UserPanel.Asset.Abrisham.Consulting',
        title: 'مشاوره'
      },
      {
        icon: 'envelope',
        routeName: 'UserPanel.Asset.Abrisham.News',
        title: 'اخبار و اطلاعیه'
      }, {
        icon: 'world',
        routeName: 'UserPanel.Asset.Abrisham.Map',
        title: 'نقشه'
      }
    ]
  }),
  created() {
    this.activePage = this.getPageFromRouteName()
  },
  mounted () {
    this.activePage = this.getPageFromRouteName()
  },
  methods: {
    getPageFromRouteName () {
      const page = this.menuItem.find(item => item.routeName === this.$route.name)
      if (page) {
        return page
      }

      return this.menuItem[0]
    },
    setActivePage(currentPage) {
      this.activePage = currentPage
    }
  }
}
</script>
<style>
.q-menu{
  border-radius: 0 0 20px 20px;
  box-shadow: 0 3px 10px 0 rgba(44, 91, 185, 0.15);
  background-color: #fff;
}
.q-menu .q-item--active{
color: var(--abrishamMain);
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
  @media screen and(max-width: 1023px) {
    padding: 0 21px;
  }
  @media screen and(max-width: 990px) {
    padding: 0 15px;
  }
  @media screen and(max-width: 575px) {
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
    color: var(--abrishamMain);
    &:deep(.q-icon){
      color: var(--alaa-Primary);
      font-weight: 500;
    }
    &:deep(.expanded-icon-color){
      font-size: 50px;
      i {
        color: var(--abrishamMain) !important;
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
      color: var(--alaa-Primary);
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
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  }
  &:deep(.q-item__label){
    text-align: center;
  }
  &:deep(.q-field__control::after){
    height: 0;
  }
  &:deep(.q-field__control::before){
    background: transparent;
  }
  &:deep(.q-field__control){
    background: #eff3ff;
  }
  &:deep(.q-field--filled .q-field__control::before){
    border-bottom: none;
  }
}

</style>

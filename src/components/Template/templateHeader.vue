<template>
  <div class="header-inside row">
    <div class="right-side col-6">
      <q-btn
        flat
        icon="isax:menu-1"
        @click="toggleLeftDrawer"
      />
      <q-btn
        flat
        :to="{ name: 'home' }"
      >
        <q-img
          src="img/alaa-logo.svg"
          width="40px"
        />
      </q-btn>
      <q-list>
        <q-item
          :to="{ name: 'home' }"
          exact
        >
          <q-item-section> صفحه اصلی </q-item-section>
        </q-item>
        <q-item
          :to="{ name: 'Shop' }"
          exact
        >
          <q-item-section> فروشگاه </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="left-side col-6">
      <q-btn
        flat
        icon="isax:shopping-cart"
        :to="{ name: 'User.Checkout' }"
      />
      <q-btn
        v-if="user.id !== null"
        flat
        icon="isax:user"
      >
        <q-menu>
          <q-list>
            <q-item
              :to="{ name: 'Profile' }"
              clickable
              v-close-popup
            >
              <q-item-section> پروفایل </q-item-section>
            </q-item>
            <q-item
              :to="{
                name: 'User.Dashboard.purchases',
                params: { id: user.id }
              }"
              clickable
              v-close-popup
            >
              <q-item-section>فیلم ها و جزوه های من</q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
            >
              <q-item-section>خروج</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn
        v-if="user.id === null"
        color="primary"
        :to="{ name: 'login' }"
      >
        ورود/ثبت نام
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'templateHeader',
  data() {
    return {}
  },
  mounted() {
    this.$store.commit('AppLayout/updateBreadcrumbLoading', false)
    this.$store.commit('AppLayout/updateVisibilityBreadcrumb', true)
    this.user = this.$store.getters['Auth/user']
  },
  computed: {
    ...mapGetters('Auth', ['user']),
    ...mapGetters('AppLayout', [
      'breadcrumbsVisibility',
      'breadcrumbs',
      'breadcrumbLoading',
      'layoutLeftDrawerVisible',
      'windowSize'
    ])
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateVisibilityBreadcrumb',
      'updateBreadcrumbs',
      'updateBreadcrumbLoading',
      'updateLayoutLeftDrawerVisible'
    ]),
    toggleLeftDrawer() {
      console.log('this.layoutLeftDrawerVisible', this.layoutLeftDrawerVisible)
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    hasRoute(route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    getRoute(route) {
      if (!this.hasRoute(route)) {
        return { name: null }
      }
      if (route.name) {
        return { name: route.name }
      } else if (route.path) {
        return { path: route.path }
      } else {
        return { name: null }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-inside {
  color: #333333;
  width: 1362px;
  max-width: 1362px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1362px) {
    width: 100%;
    padding: 0 15px;
  }
  .right-side {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    .q-list {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .left-side {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>

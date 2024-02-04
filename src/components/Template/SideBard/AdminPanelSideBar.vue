<template>
  <div class="AdminPanelSideBar">
    <q-btn flat
           square
           icon="ph:x"
           class="absolute-top-right"
           @click="closeDrawer" />
    <div class="logo-image">
      <router-link :to="{name: 'Public.Home'}">
        <lazy-img src="https://nodes.alaatv.com/upload/alaa-logo.png"
                  width="48"
                  height="48" />
      </router-link>
    </div>
    <profile-info />
    <div class="side-menu-body">
      <q-list class="side-menu-list"
              padding>
        <menu-item :items="titlesList" />
        <q-item v-ripple
                class="item-list"
                clickable
                @click="logOut">
          <q-item-section avatar>
            <q-icon name="ph:sign-out"
                    size="30" />
          </q-item-section>
          <q-item-section class="list-section">
            خروج
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import list from 'src/assets/js/AdminSidePanelConfig.js'
import ProfileInfo from 'src/components/Utils/ProfileInfo.vue'
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'
export default {
  name: 'AdminPanelSideBar',
  components: { LazyImg, ProfileInfo, menuItem },
  data () {
    return {
      clickedItem: null,
      searchText: '',
      titlesList: list,
      examsPlan: [
        {
          divider: true
        },
        {
          name: 'دهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_dahom.pdf'
        },
        {
          name: 'دهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_dahom.pdf'
        },
        {
          name: 'دهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_dahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'یازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_yazdahom.pdf'
        },
        {
          name: 'یازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_yazdahom.pdf'
        },
        {
          name: 'یازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_yazdahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'دوازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_davazdahom.pdf'
        }
      ]
    }
  },
  computed: {
    isUserLogin () {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  methods: {
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    },
    closeDrawer () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.AdminPanelSideBar {
  height: 100%;
  padding: $space-3;
  background: $grey-1;
  .logo-image {
    width: 20%;
    margin: auto;
    :deep(.lazy-img) {
      width: 100%;
    }
  }
}
</style>

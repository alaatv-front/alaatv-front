<template>
  <div class="AdminPanelSideBar">
    <q-btn flat
           square
           icon="ph:x"
           class="absolute-top-right z-top lt-md"
           @click="closeDrawer" />
    <div class="user-info-section">
      <user-info-section />
    </div>
    <div class="separator" />
    <div class="items-section">
      <items-section :items="items"
                     @onClickItem="onClickItem" />
    </div>
  </div>
</template>

<script>
import ItemsSection from 'src/components/Template/SideBard/components/ItemsSection.vue'
import UserInfoSection from 'src/components/Template/SideBard/components/UserInfoSection.vue'
export default {
  name: 'AdminPanelSideBar',
  components: { ItemsSection, UserInfoSection },
  data () {
    return {
      items: [
        {
          separator: true
        },
        {
          title: 'آپلود سنتر',
          icon: 'ph:cloud-arrow-up',
          route: { name: 'Admin.UploadCenter.Contents' }
        },
        {
          title: 'تیکت پشتیبانی',
          icon: 'ph:ticket',
          route: { name: 'Admin.Ticket.Index' }
        },
        {
          title: 'برنامه مطالعاتی',
          icon: 'ph:calendar',
          route: { name: 'Admin.StudyPlan' }
        },
        {
          title: 'مدیریت درخت های برچسب',
          icon: 'ph:tree-structure',
          route: { name: 'Admin.Forrest.Index' }
        },
        {
          title: 'مدیریت مجموعه محتوا ها',
          icon: 'ph:bounding-box',
          route: { name: 'Admin.Set.Index' }
        },
        {
          title: 'مدیریت محصولات',
          icon: 'ph:codesandbox-logo',
          route: { name: 'Admin.Product.Index' }
        },
        {
          separator: true
        },
        {
          title: 'چیدمان صفحه',
          icon: 'ph:layout',
          route: { name: 'Admin.Settings' }
        }
      ],
      clickedItem: null,
      searchText: '',
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
    },
    screenName () {
      if (typeof window === 'undefined') {
        return null
      }

      return this.$q.screen.name
    }
  },
  watch: {
    screenName: {
      immediate: true,
      handler () {
        if (this.screenName === 'xl') {
          this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 360)
        }
        if (this.screenName === 'lg') {
          this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 312)
        }
        if (this.screenName === 'md') {
          this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 259)
        }
        if (this.screenName === 'sm') {
          this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 259)
        }
        if (this.screenName === 'xs') {
          this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 259)
        }
      }
    }
  },
  created () {
    this.updateItemsActiveKey()
  },
  methods: {
    updateItemsActiveKey () {
      const currentRoute = this.$route.name
      this.items.forEach(item => {
        item.selected = item.route?.name === currentRoute
      })
    },
    onClickItem (item) {
      if (!item.route || typeof item.route !== 'object') {
        return
      }
      this.$router.push(item.route)
    },
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

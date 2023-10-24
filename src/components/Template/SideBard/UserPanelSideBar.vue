<template>
  <div class="UserPanelSideBar">
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
import ItemsSection from 'src/components/Template/SideBard/UserPanel/ItemsSection.vue'
import UserInfoSection from 'src/components/Template/SideBard/UserPanel/UserInfoSection.vue'

export default {
  name: 'UserPanelSideBar',
  components: { ItemsSection, UserInfoSection },
  data () {
    return {
      items: [
        {
          icon: 'ph:house',
          title: 'داشبورد',
          selected: false,
          route: { name: 'UserPanel.Dashboard' }
        },
        {
          separator: true
        },
        {
          icon: 'ph:book-open',
          title: 'دوره های من',
          selected: true,
          route: { name: 'UserPanel.Asset' }
        },
        {
          icon: 'ph:bookmarks',
          title: 'نشان شده ها',
          selected: false,
          route: { name: 'UserPanel.MyFavorites' }
        },
        {
          icon: 'ph:envelope-simple',
          title: 'تیکت پشتیبانی',
          selected: false,
          route: { name: 'UserPanel.Ticket' }
        },
        {
          icon: 'ph:user-circle',
          title: 'اطلاعات کاربری',
          selected: false,
          route: { name: 'UserPanel.Profile' }
        },
        {
          separator: true
        },
        {
          icon: 'ph:credit-card',
          title: 'سفارش های من',
          selected: false,
          route: { name: 'UserPanel.MyOrders' }
        },
        {
          icon: 'ph:wallet',
          title: 'کیف پول و تراکنش',
          selected: false,
          route: { name: 'UserPanel.MyPurchases' }
        },
        {
          icon: 'ph:money',
          title: 'کارت هدیه',
          selected: false
        },
        {
          separator: true
        },
        {
          icon: 'ph:gear-six',
          title: 'تنظیمات',
          selected: false
        }
      ]
    }
  },
  created() {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";

.UserPanelSideBar {
  height: 100%;
  background: $grey-1;
  .user-info-section {
    padding: 40px 40px 24px;
  }
  .items-section {
    padding: 12px 40px 40px;
  }
  .separator {
    background: $grey-2;
    height: 1.5px;
    padding: 0;
    margin: 12px 0;
  }
}
</style>

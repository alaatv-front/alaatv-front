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
          icon: 'ph:book-open',
          title: 'دوره های من',
          route: { name: 'UserPanel.MyPurchases' }
        },
        {
          icon: 'ph:bookmarks',
          title: 'نشان شده ها',
          route: { name: 'UserPanel.MyFavorites' }
        },
        {
          icon: 'ph:envelope-simple',
          title: 'تیکت پشتیبانی',
          route: { name: 'UserPanel.Ticket.Index' }
        },
        {
          icon: 'ph:user-circle',
          title: 'اطلاعات کاربری',
          route: { name: 'UserPanel.Profile' }
        },
        {
          separator: true
        },
        {
          icon: 'ph:credit-card',
          title: 'سفارش های من',
          route: { name: 'UserPanel.MyOrders' }
        },
        {
          icon: 'ph:money',
          title: 'کارت هدیه',
          route: { name: 'UserPanel.Asset.GiftCard.MyGiftCards' }
        },
        {
          separator: true
        },
        {
          icon: 'ph:radio',
          title: 'داشبوردهام',
          expandable: true,
          subItems: [
            {
              title: 'راه ابریشم',
              route: { name: 'UserPanel.Profile' }
            },
            {
              title: ' راه ابریشم پرو',
              route: { name: 'UserPanel.Profile' }
            },
            {
              title: ' راه ابریشم ۲',
              route: { name: 'UserPanel.Profile' }
            },
            {
              title: 'چترنجات',
              route: { name: 'UserPanel.Profile' }
            },
            {
              title: 'امتحان نهایی',
              route: { name: 'UserPanel.Profile' }
            },
            {
              title: '110',
              route: { name: 'UserPanel.Profile' }
            }
          ]
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
    padding: 40px 40px 12px;
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

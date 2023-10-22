<template>
  <div class="ItemsSection">
    <item-section v-for="(item, itemIndex) in items"
                  :key="itemIndex"
                  :separator="item.separator"
                  :selected="item.selected" />
  </div>
</template>

<script>
import ItemSection from 'src/components/Template/SideBard/UserPanel/ItemSection.vue'
export default {
  name: 'ItemsSection',
  components: { ItemSection },
  data () {
    return {
      items: [
        {
          icon: 'ph:house',
          title: 'داشبورد',
          selected: false
        },
        {
          separator: true
        },
        {
          icon: 'ph:book-open',
          title: 'دوره های من',
          selected: true
        },
        {
          icon: 'ph:bookmarks',
          title: 'نشان شده ها',
          selected: false
        },
        {
          icon: 'ph:envelope-simple',
          title: 'تیکت پشتیبانی',
          selected: false
        },
        {
          icon: 'ph:user-circle',
          title: 'اطلاعات کاربری',
          selected: false
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.ItemsSection{

}
</style>

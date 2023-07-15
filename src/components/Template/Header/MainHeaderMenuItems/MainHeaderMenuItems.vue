<template>
  <q-list class="MainHeaderMenuItems">
    <div v-for="(item , index) in items"
         :key="index"
         class="tabs-list-container">
      <div v-if="showMenuItem(/* item */)"
           class="self-center">
        <item-menu v-if="item.type === 'itemMenu'"
                   :data="item"
                   :editable="pageBuilderEditable" />
        <mega-menu v-if="item.type === 'megaMenu'"
                   :data="item"
                   :editable="pageBuilderEditable" />
        <simple-menu v-if="item.type === 'simpleMenu'"
                     :data="item"
                     :editable="pageBuilderEditable" />
      </div>
    </div>
    <q-btn v-if="pageBuilderEditable"
           icon="add"
           flat
           size="10px"
           class="edit-btn"
           @click="addItem" />
  </q-list>
  <q-dialog v-model="optionDialog"
            full-width>
    <q-card>
      <q-card-section>
        sss
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import menuItems from 'src/components/Template/menuData.js'
import itemMenu from 'components/Template/Header/MainHeaderMenuItems/itemMenu.vue'
import megaMenu from 'components/Template/Header/MainHeaderMenuItems/magaMenu.vue'
import simpleMenu from 'components/Template/Header/MainHeaderMenuItems/simpleMenu.vue'

export default {
  name: 'MainHeaderMenuItems',
  components: {
    megaMenu,
    simpleMenu,
    itemMenu
  },
  data() {
    return {
      optionDialog: false,
      mounted: false,
      conferenceMenu: false,
      showHamburgerConfig: true,
      searchInput: '',
      isAdmin: false,
      items: menuItems
    }
  },
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['PageBuilder/pageBuilderEditable']
    },
    showMenuItem () {
      return (/* item */) => {
        return true
        // return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    }
  },
  methods: {
    addItem (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
</script>

<style scoped lang="scss">
.MainHeaderMenuItems {
  height: 72px;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  overflow: auto;
  .tabs-list-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

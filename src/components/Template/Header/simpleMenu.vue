<template>
  <div class="q-pa-md">
    <q-btn-dropdown v-model="menu"
                    flat
                    :label="menuContent.title"
                    class="dropdown-btn">
      <q-list bordered
              padding
              style="width: 200px"
              class="rounded-borders dropdown">
        <q-item v-for="item in menuContent.children"
                :key="item"
                v-ripple
                clickable>
          {{item.title}}
          <q-menu fit
                  anchor="top left"
                  self="top right"
                  class="dropdown2">
            <q-list style="width: 200px">
              <q-item v-for="child in item.items"
                      :key="child"
                      clickable>
                {{child}}
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>

export default {
  name: 'simpleMenu',
  props: {
    menuContent: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      menu: false,
      menuOver: false,
      listOver: false
    }
  },
  watch: {
    menuOver (val) {
      this.debounceFunc()
    },
    listOver (val) {
      this.debounceFunc()
    }
  },
  methods: {
    checkMenu () {
      if (this.menuOver || this.listOver) {
        this.menu = true
      } else {
        this.menu = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-btn{

}
.dropdown-btn :hover{

}
</style>

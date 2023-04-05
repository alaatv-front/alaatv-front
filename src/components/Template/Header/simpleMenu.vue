<template>
  <div class="q-pa-md">
    <q-btn-dropdown flat
                    :label="menuContent.title"
                    content-style="right: 905px !important; width: 200px"
                    class="dropdown-btn">
      <q-list bordered
              padding
              class="rounded-borders dropdown">
        <div v-for="item in menuContent.children"
             :key="item">
          <router-link :to="{path: 'c', query: {'tags[]': item.tags}}">
            <q-item v-ripple
                    clickable
                    :class="{hoveredItem: isItemSelected(item)}"
                    @mouseover="categories[item.category] = true">
              <q-item-section>
                {{item.title}}
              </q-item-section>
              <q-menu v-model="categories[item.category]"
                      fit
                      anchor="top left"
                      class="dropdown2">
                <q-list style="width: 200px"
                        @mouseover="categories[item.category] = true">
                  <div v-for="child in item.items"
                       :key="child">
                    <router-link v-if="child.tags"
                                 :to="{path: 'c', query: {'tags[]': child.tags }}">
                      <q-item clickable
                              class="childItem">
                        <q-item-section>
                          {{child.title}}
                        </q-item-section>
                      </q-item>
                    </router-link>
                    <router-link v-else
                                 :to="{path: child.href}">
                      <q-item clickable
                              class="childItem">
                        <q-item-section>
                          {{child.title}}
                        </q-item-section>
                      </q-item>
                    </router-link>
                  </div>
                </q-list>
              </q-menu>
            </q-item>
          </router-link>
        </div>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>

import { debounce } from 'quasar'

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
      listOver: false,
      categories: {
        haftom: false,
        hashtom: false,
        nohom: false
      }
    }
  },
  watch: {
    menuOver (val) {
      this.debounceFunc()
    },
    listOver (val) {
      this.debounceFunc()
    },
    'categories.haftom': function(val) {
      if (val) {
        this.categories.hashtom = this.categories.nohom = false
      }
    },
    'categories.hashtom': function(val) {
      if (val) {
        this.categories.haftom = this.categories.nohom = false
      }
    },
    'categories.nohom': function(val) {
      if (val) {
        this.categories.hashtom = this.categories.haftom = false
      }
    }
  },
  methods: {
    isItemSelected(item) {
      return this.categories[item.category]
    }
  },
  debounceFunc: debounce(function() { this.checkMenu() }, 1),
  checkMenu () {
    if (this.menuOver || this.listOver) {
      this.menu = true
    } else {
      this.menu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.hoveredItem{
    font-weight: bold;
    background-color: orange;
}
.childItem:hover{
  font-weight: bold;
  background-color: orange;
}
</style>

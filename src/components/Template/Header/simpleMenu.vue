<template>
  <div class="q-pa-md">
    <q-btn-dropdown flat
                    :label="menuContent.title"
                    content-style="right: 905px !important; width: 200px"
                    class="dropdown-btn">
      <q-list bordered
              padding
              class="rounded-borders dropdown">
        <div v-for="(item, index) in menuContent.children"
             :key="index">
          <router-link :to="{name: 'Public.Content.Search', query: {'tags[]': item.tags}}">
            <q-item v-ripple
                    clickable
                    class="item"
                    @mouseover="showData(index)">
              <q-item-section>
                {{item.title}}
              </q-item-section>
              <q-menu v-model="item.selected"
                      fit
                      anchor="top left"
                      class="dropdown2">
                <q-list style="width: 200px"
                        @mouseover="showData(index)">
                  <div v-for="child in item.children"
                       :key="child">
                    <router-link v-if="child.tags"
                                 :to="{name: 'Public.Content.Search', query: {'tags[]': child.tags }}">
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
    isItemSelected(item) {
      return item.selected
    },
    showData(colIndex) {
      this.menuContent.children.forEach((item, subIndex) => {
        item.selected = colIndex === subIndex
      })
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
.item:hover{
    font-weight: bold;
    background-color: orange;
}
.childItem:hover{
  font-weight: bold;
  background-color: orange;
}
</style>

<template>
  <q-btn-dropdown v-model="showMenu"
                  flat
                  :label="menuContent.title"
                  content-style="right: 905px !important; width: 200px"
                  class="dropdown-btn"
                  @mouseover="onMouseover"
                  @mouseleave="onMouseleave">
    <q-list bordered
            padding
            class="list rounded-borders"
            @mouseover="onMouseover"
            @mouseleave="onMouseleave">
      <div v-for="(item, index) in menuContent.children"
           :key="index"
           class="items">
        <router-link :to="{name: 'Public.Content.Search', query: {'tags[]': item.tags}}">
          <q-item v-ripple
                  clickable
                  class="item"
                  @mouseover="showData(index)">
            <q-item-section>
              {{item.title}}
            </q-item-section>
            <p><i class="arrow" /></p>
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
      showMenu: false,
      onMouseleaveSetTimeout: null
    }
  },
  methods: {
    onMouseover () {
      this.showMenu = true
      if (window && this.onMouseleaveSetTimeout) {
        window.clearInterval(this.onMouseleaveSetTimeout)
      }
    },
    onMouseleave () {
      this.onMouseleaveSetTimeout = setTimeout(() => {
        this.showMenu = false
      }, 50)
      this.menuContent.children.forEach(item => {
        item.selected = false
      })
    },
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
  .list {
    .items {
      .item {
        &:hover {
          font-weight: bold;
          background-color: orange;
          &:deep(.q-focus-helper) {
            background-color: transparent !important;
          }
        }
        &:deep(.q-focus-helper) {
          background-color: transparent !important;
        }
        .arrow {
          position: absolute;
          top: 18px;
          right: 15px;
          border: solid black;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
        }
        .dropdown2 {
          .childItem:hover{
            font-weight: bold;
            background-color: orange;
          }
        }
      }
    }
  }
</style>

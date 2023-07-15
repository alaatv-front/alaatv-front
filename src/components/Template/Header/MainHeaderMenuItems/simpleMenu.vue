<template>
  <router-link :to="data.route">
    <q-btn-dropdown v-model="showMenu"
                    flat
                    content-style="width: 200px"
                    class="dropdown-btn"
                    @mouseover="onMouseover"
                    @mouseleave="onMouseleave">
      <template #label>
        {{ data.title }}
        <q-btn v-if="editable"
               icon="edit"
               flat
               size="10px"
               class="edit-btn"
               @click="editItem" />
      </template>
      <template #default>
        <q-list bordered
                padding
                class="list rounded-borders"
                @mouseover="onMouseover"
                @mouseleave="onMouseleave">
          <div v-for="(item, index) in data.children"
               :key="index"
               class="items">
            <router-link :to="item.route">
              <q-item v-ripple
                      clickable
                      class="item"
                      @mouseover="showData(index)">
                <q-item-section>
                  {{item.title}}
                  <q-btn v-if="editable"
                         icon="edit"
                         flat
                         size="10px"
                         class="edit-btn"
                         @click="editItem" />
                </q-item-section>
                <p><i class="arrow" /></p>
                <q-menu v-model="item.selected"
                        fit
                        anchor="top left"
                        class="dropdown2"
                        @mouseover="onMouseover"
                        @mouseleave="onMouseleave">
                  <q-list style="width: 200px"
                          @mouseover="showData(index)">
                    <div v-for="(child, childIndex) in item.children"
                         :key="childIndex">
                      <router-link :to="child.route">
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
      </template>
    </q-btn-dropdown>
  </router-link>
</template>

<script>

export default {
  name: 'simpleMenu',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMenu: false,
      onMouseleaveSetTimeout: null
    }
  },
  methods: {
    editItem (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    onMouseover () {
      this.showMenu = true
      if (window && this.onMouseleaveSetTimeout) {
        window.clearInterval(this.onMouseleaveSetTimeout)
      }
    },
    onMouseleave () {
      this.onMouseleaveSetTimeout = setTimeout(() => {
        this.showMenu = false
        this.data.children.forEach(item => {
          item.selected = false
        })
      }, 50)
    },
    isItemSelected(item) {
      return item.selected
    },
    showData(colIndex) {
      this.data.children.forEach((item, subIndex) => {
        item.selected = colIndex === subIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    .items {
      .item {
        position: relative;
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
        .edit-btn {
          position: absolute;
          left: 0px;
          top: -10px;
        }
      }
    }
  }
  .dropdown2 {
    .childItem:hover {
      font-weight: bold;
      background-color: orange;
    }
  }
</style>

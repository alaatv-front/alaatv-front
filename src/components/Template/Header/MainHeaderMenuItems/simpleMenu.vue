<template>
  <router-link :to="data.route">
    <q-btn-dropdown v-model="showMenu"
                    flat
                    content-class="simpleMenu"
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
               @click="editItem($event, data)" />
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
            <template v-if="item.route">
              <router-link :to="item.route">
                <q-item v-ripple
                        clickable
                        class="item"
                        @mouseover="showData(index)">
                  <q-item-section>
                    {{item.title}}
                    <!--                    <q-btn v-if="editable"-->
                    <!--                           icon="edit"-->
                    <!--                           flat-->
                    <!--                           size="10px"-->
                    <!--                           class="edit-btn"-->
                    <!--                           @click="editItem($event, data.children[index])" />-->
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
                        <template v-if="child.route">
                          <router-link :to="child.route">
                            <q-item clickable
                                    class="childItem">
                              <q-item-section>
                                {{child.title}}
                                <!--                                <q-btn v-if="editable"-->
                                <!--                                       icon="edit"-->
                                <!--                                       flat-->
                                <!--                                       size="10px"-->
                                <!--                                       class="edit-btn"-->
                                <!--                                       @click="editItem($event, item.children[childIndex])" />-->
                              </q-item-section>
                            </q-item>
                          </router-link>
                        </template>
                        <template v-else>
                          <q-item clickable
                                  class="childItem">
                            <q-item-section>
                              {{child.title}}
                              <!--                              <q-btn v-if="editable"-->
                              <!--                                     icon="edit"-->
                              <!--                                     flat-->
                              <!--                                     size="10px"-->
                              <!--                                     class="edit-btn"-->
                              <!--                                     @click="editItem($event, item.children[childIndex])" />-->
                            </q-item-section>
                          </q-item>
                        </template>
                      </div>
                    </q-list>
                  </q-menu>
                </q-item>
              </router-link>
            </template>
            <template v-else>
              <q-item v-ripple
                      clickable
                      class="item"
                      @mouseover="showData(index)">
                <q-item-section>
                  {{item.title}}
                  <!--                  <q-btn v-if="editable"-->
                  <!--                         icon="edit"-->
                  <!--                         flat-->
                  <!--                         size="10px"-->
                  <!--                         class="edit-btn"-->
                  <!--                         @click="editItem($event, data.children[index])" />-->
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
                      <template v-if="child.route">
                        <router-link :to="child.route">
                          <q-item clickable
                                  class="childItem">
                            <q-item-section>
                              {{child.title}}
                              <!--                              <q-btn v-if="editable"-->
                              <!--                                     icon="edit"-->
                              <!--                                     flat-->
                              <!--                                     size="10px"-->
                              <!--                                     class="edit-btn"-->
                              <!--                                     @click="editItem($event, item.children[childIndex])" />-->
                            </q-item-section>
                          </q-item>
                        </router-link>
                      </template>
                      <template v-else>
                        <q-item clickable
                                class="childItem">
                          <q-item-section>
                            {{child.title}}
                            <!--                            <q-btn v-if="editable"-->
                            <!--                                   icon="edit"-->
                            <!--                                   flat-->
                            <!--                                   size="10px"-->
                            <!--                                   class="edit-btn"-->
                            <!--                                   @click="editItem($event, item.children[childIndex])" />-->
                          </q-item-section>
                        </q-item>
                      </template>
                    </div>
                  </q-list>
                </q-menu>
              </q-item>
            </template>
          </div>
        </q-list>
      </template>
    </q-btn-dropdown>
  </router-link>
  <q-dialog v-if="editable"
            v-model="optionDialog"
            full-width>
    <div class="bg-white">
      <q-btn color="primary"
             icon="close"
             class="q-ma-md"
             @click="optionDialog = false" />
      <option-panel v-model:menuItem="selectedMenuItem" />
    </div>
  </q-dialog>
</template>

<script>

import OptionPanel from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/OptionPanel.vue'

export default {
  name: 'simpleMenu',
  components: { OptionPanel },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: null
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedMenuItem: null,
      optionDialog: false,
      showMenu: false,
      onMouseleaveSetTimeout: null
    }
  },
  computed: {
    localData: {
      set (newValue) {
        this.$emit('update:data', newValue)
      },
      get () {
        return this.data
      }
    }
  },
  methods: {
    editItem (event, data) {
      event.preventDefault()
      event.stopPropagation()
      this.selectedMenuItem = data
      this.optionDialog = true
      // this.$emit('open-dialog', { index: this.index, childrenIndex })
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
        }

        .edit-btn {
          position: absolute;
          left: 0;
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

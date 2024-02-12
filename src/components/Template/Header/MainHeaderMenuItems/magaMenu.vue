<template>
  <q-btn-dropdown v-model="showMenu"
                  flat
                  content-class="megaMenu"
                  :auto-close="false"
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
      <div class="row justify-between"
           @mouseover="onMouseover"
           @mouseleave="onMouseleave">
        <div class="col-lg-2 col-md-3 category-container">
          <q-scroll-area class="scroll">
            <q-list>
              <div v-for="(item, index) in data.children"
                   :key="index">
                <router-link v-if="isValidRoute(item.route)"
                             :to="item.route">
                  <q-item class="item"
                          :class="{selectedItem: isSelectedItem(index) }"
                          clickable
                          @mouseover="showData(index)">
                    <q-item-section>
                      <q-icon name="ph:book-open"
                              class="size-lg" />
                      <div class="item-title ellipsis">{{ item.title }}</div>
                    </q-item-section>
                    <q-badge v-if="item.badge"
                             color="blue"
                             class="badge q-py-xs"
                             align="middle">
                      {{item.badge}}
                    </q-badge>
                  </q-item>
                </router-link>
                <a v-else-if="item.externalLink"
                   :href="item.externalLink">
                  <q-item class="item"
                          :class="{selectedItem: isSelectedItem(index) }"
                          clickable
                          @mouseover="showData(index)">
                    <q-item-section>
                      <q-icon name="ph:book-open"
                              class="size-lg" />
                      <div class="item-title ellipsis">{{ item.title }}</div>
                      <!--                        <q-btn v-if="editable"-->
                      <!--                               icon="edit"-->
                      <!--                               flat-->
                      <!--                               size="10px"-->
                      <!--                               class="edit-btn"-->
                      <!--                               @click="editItem($event, index)" />-->
                    </q-item-section>
                    <q-badge v-if="item.badge"
                             color="blue"
                             class="badge q-py-xs"
                             align="middle">
                      {{item.badge}}
                    </q-badge>
                  </q-item>
                </a>
                <q-item v-else
                        class="item"
                        :class="{selectedItem: isSelectedItem(index) }"
                        clickable
                        @mouseover="showData(index)">
                  <q-item-section>
                    {{item.title}}
                    <!--                      <q-btn v-if="editable"-->
                    <!--                             icon="edit"-->
                    <!--                             flat-->
                    <!--                             size="10px"-->
                    <!--                             class="edit-btn"-->
                    <!--                             @click="editItem($event, index)" />-->
                  </q-item-section>
                  <q-badge v-if="item.badge"
                           color="blue"
                           class="badge q-py-xs"
                           align="middle">
                    {{item.badge}}
                  </q-badge>
                </q-item>
              </div>
              <q-item class="item"
                      clickable>
                <q-item-section>
                  <!--                    <q-btn v-if="editable"-->
                  <!--                           icon="add"-->
                  <!--                           flat-->
                  <!--                           size="10px"-->
                  <!--                           class="edit-btn"-->
                  <!--                           @click="addItem" />-->
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
        <div class="col-lg-10 col-md-9 sub-category-items">
          <div v-for="(item, index) in data.children"
               :key="index">
            <div>
              <div v-if="item.type === 'image'">
                <div v-show="item.selected">
                  <router-link v-if="isValidRoute(item.route)"
                               :to="item.route">
                    <q-responsive :ratio="1998/553">
                      <q-img :src="item.backgroundImage" />
                    </q-responsive>
                  </router-link>
                  <a v-else-if="item.externalLink"
                     :href="item.externalLink">
                    <q-responsive :ratio="1998/553">
                      <q-img :src="item.backgroundImage" />
                    </q-responsive>
                  </a>
                  <q-responsive v-else
                                :ratio="1998/553">
                    <q-img :src="item.backgroundImage" />
                  </q-responsive>
                </div>
              </div>
              <div v-else-if="item.type === 'text'">
                <div v-show="item.selected"
                     :style="{background: item.backgroundColor}">
                  <div class="row list-container">
                    <div v-for="(col, colIndex) in item.children"
                         :key="colIndex"
                         class="col-md-4 q-mb-xs">
                      <q-list>
                        <router-link v-if="isValidRoute(col.route)"
                                     :to="col.route">
                          <q-item clickable>
                            <q-item-section class="list-title">
                              {{col.title}}
                            </q-item-section>
                          </q-item>
                        </router-link>
                        <q-item v-else
                                clickable>
                          <q-item-section class="list-title">
                            {{col.title}}
                          </q-item-section>
                        </q-item>
                        <div v-for="(colItem, colItemIndex) in col.children"
                             :key="colItemIndex">
                          <router-link v-if="isValidRoute(colItem.route)"
                                       :to="colItem.route">
                            <q-item clickable>
                              <q-item-section class="list-items">
                                {{colItem.title}}
                              </q-item-section>
                            </q-item>
                          </router-link>
                          <q-item v-else
                                  clickable>
                            <q-item-section class="list-items">
                              {{colItem.title}}
                            </q-item-section>
                          </q-item>
                        </div>
                      </q-list>
                    </div>
                  </div>
                  <div v-show="item.selected"
                       class="magaMenu-photo-container">
                    <q-img :src="item.backgroundImage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </q-btn-dropdown>
  <q-dialog v-if="editable"
            v-model="optionDialog"
            full-width>
    <div class="bg-white">
      <q-btn color="primary"
             icon="close"
             class="q-ma-md"
             @click="optionDialog = false" />
      <option-panel v-model:menuItem="localData" />
    </div>
  </q-dialog>
</template>

<script>
import OptionPanel from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/OptionPanel.vue'

export default {
  name: 'magaMenu',
  components: { OptionPanel },
  props: {
    data: {
      type: Object,
      default () {
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
  data () {
    return {
      showMenu: false,
      optionDialog: false,
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
  mounted () {
    this.selectFirstItem()
  },
  methods: {
    isValidRoute (route) {
      return route && (route?.name || route?.path || (route?.query['tags[]'] && route.query['tags[]'].length > 0))
    },
    addItem (event) {
      event.preventDefault()
      event.stopPropagation()
      this.$emit('add-children')
    },
    selectFirstItem () {
      if (!this.data.children) {
        return
      }
      this.data.children.forEach((item, subIndex) => {
        item.selected = subIndex === 0
      })
    },
    editItem (event) {
      event.preventDefault()
      event.stopPropagation()
      this.optionDialog = true
      // this.$emit('open-dialog', { index: this.index, childrenIndex })
    },
    isSelectedItem (index) {
      return this.data.children.findIndex(item => item.selected) === index
    },
    onMouseover () {
      this.showMenu = true
      if (window && this.onMouseleaveSetTimeout) {
        window.clearInterval(this.onMouseleaveSetTimeout)
      }
    },
    onMouseleave (event) {
      if (event.relatedTarget?.nodeName === 'HTML' || event.relatedTarget?.nodeName === 'html') {
        return
      }
      this.onMouseleaveSetTimeout = setTimeout(() => {
        this.showMenu = false
      }, 50)
    },
    showData (colIndex) {
      this.data.children.forEach((item, subIndex) => {
        item.selected = colIndex === subIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
.megaMenu{
  transform: translateY(16px);
  .category-container {
    background:$blue-grey-2;
    :deep(.scroll) {
      height: 100%;
      padding: $spacing-none;
      //padding: $space-8 0 $space-8 $space-7;
      .q-list {
        margin: $space-8 0 $space-8 $space-7;
      }
      //:deep(.scroll){
      //  .absolute{
      //    position: relative;
      //  }
      //}
      .item {
        position: relative;

        .edit-btn {
          position: absolute;
          left: 0;
          top: -10px;
        }
      }
    }
  }

  .sub-category-items {
    place-self: center;
  }

  .item {
    margin-bottom: $space-2;
    .q-item__section{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .item-title{
        @include subtitle1;
        color: $blue-grey-8;
        max-width: calc(100% - $space-7);
      }
      .q-icon{
        color: $blue-grey-7;
        margin-right: $space-2;
      }
    }

    &.selectedItem{
      border-radius: $radius-3 0 0 $radius-3;
      background-color:  $grey-1;

      .q-item__section{
        .item-title{
          color: $grey-9;
        }
        .q-icon{
          color: $primary-5;
        }
      }
    }

    &:hover {
      :deep(.q-focus-helper) {
        background: transparent !important;
      }
    }

    .badge{
      align-self: center;
      animation: badge 1s infinite;
    }

    @keyframes badge {
      0% {
        box-shadow:0 0 0 0 rgb(55 55 55 / 68%);
      }

      70% {
        box-shadow:0 0 0 10px rgb(0 0 0 / 0%);
      }

      100% {
        box-shadow:0 0 0 0 rgb(0 0 0 / 0%);
      }
    }
  }

  .list-container{
    padding: $space-6 0 $space-6 $space-6;

    .q-list{
      .q-item{
        padding: $space-3 $space-4;
        .list-title{
          color: $grey-9;
          display: flex;
          align-items: center;
          @include subtitle1;
          flex-direction: row;
          justify-content: flex-start;
          &:before{
            content: ' ';
            width: 3px;
            height: 18px;
            margin-right: $space-2;
            border-radius: $space-1;
            background: $primary-5;
          }
        }

        .list-items{
          color: $grey-9;
          @include body2;
        }

        &:hover {
          background: $primary-1 ;
          border-radius: $radius-3;
          :deep(.q-focus-helper) {
            background: unset ;
          }
        }
      }
    }
  }

  .magaMenu-photo-container{
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    .megaMenu-svg{
      width: 100px;
      height: 100px;
      position: absolute;
    }
  }
}
</style>

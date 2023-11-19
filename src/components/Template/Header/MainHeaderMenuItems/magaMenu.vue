<template>
  <q-btn-dropdown v-model="showMenu"
                  flat
                  content-class="megaMenu"
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
        <div class="col-lg-2 col-md-3 category-items">
          <q-scroll-area class="scroll">
            <div class="q-mb-xs q-mr-md">
              <q-list>
                <div v-for="(item, index) in data.children"
                     :key="index">
                  <router-link v-if="isValidRoute(item.route)"
                               :to="item.route">
                    <q-item class="item"
                            :class="{arrow: isSelectedItem(index) }"
                            clickable
                            @mouseover="showData(index)">
                      <q-item-section>
                        {{ item.title }}
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
                      <div class="left-arrow" />
                    </q-item>
                  </router-link>
                  <a v-else-if="item.externalLink"
                     :href="item.externalLink">
                    <q-item class="item"
                            :class="{arrow: isSelectedItem(index) }"
                            clickable
                            @mouseover="showData(index)">
                      <q-item-section>
                        {{item.title}}
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
                      <div class="left-arrow" />
                    </q-item>
                  </a>
                  <q-item v-else
                          class="item"
                          :class="{arrow: isSelectedItem(index) }"
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
                    <div class="left-arrow" />
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
            </div>
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
                  <div class="row">
                    <div v-for="(col, colIndex) in item.children"
                         :key="colIndex"
                         class="col-md-4 text-subtitle1 q-mb-xs">
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
                              <q-item-section>
                                {{colItem.title}}
                              </q-item-section>
                            </q-item>
                          </router-link>
                          <q-item v-else
                                  clickable>
                            <q-item-section>
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
    editItem (event, childrenIndex) {
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
    onMouseleave () {
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
.category-items {
  width: 175px;

  .scroll {
    height: 100%;

    .item {
      position: relative;

      .edit-btn {
        position: absolute;
        left: 0;
        top: -10px;
      }
    }
  }

  @media screen and (width <= 1400px) {
    width: 200px;

    .scroll {
      height: 200px;
    }
  }
}

.sub-category-items {
  place-self: center;
}

.item {
  .badge{
    position: absolute;
    top: 13px;
    left: 115px;
    z-index: 100;
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

.arrow{
  margin-right: 14px;
  transition: border-left 1s;
  z-index: 2;
  font-weight: bold;
  background-color: orange;

  &::after {
    content:'';
    position: absolute;
    left: 145px;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 25px solid orange;
    border-top: 24px solid transparent;
    border-bottom: 24px solid transparent;

    @media screen and (width <= 1400px){
      left: 170px;
    }
  }

  &:deep(.q-focus-helper) {
    background-color: transparent !important;
  }
}

.list-title{
  font-weight: bold;
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

  .megaMenu-svg-title{
    color: white;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .megaMenu-svg{
    width: 100px;
    height: 100px;
    position: absolute;
  }
}
</style>

<style lang="scss">
.megaMenu {
  width: 1060px;
  max-width: 1060px !important;
  left: 360px;
  border-radius: 10px;
  padding: 0;

  @media screen and (width <= 1439px){
    max-width: 850px !important;
    width: 850px;
    left: 140px;
  }
}
</style>

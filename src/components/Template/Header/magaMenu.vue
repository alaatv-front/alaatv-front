<template>
  <q-btn-dropdown v-model="showMenu"
                  flat
                  content-style="width: 1100px; right: 360px; border-radius: 10px"
                  :label="data.title"
                  @mouseover="onMouseover"
                  @mouseleave="onMouseleave">
    <div class="row"
         @mouseover="onMouseover"
         @mouseleave="onMouseleave">
      <div class="col-2 q-pb-md">
        <div class="q-mb-md">
          <q-list>
            <div v-for="(item, index) in data.children"
                 :key="index">
              <router-link v-if="item.tags"
                           :to="{ name: 'Public.Content.Search', query: { 'tags[]': item.tags } }">
                <q-item class="item"
                        :class="{arrow: selectedIndex === index }"
                        clickable
                        @mouseover="showData(index)">
                  <q-item-section>
                    {{ item.title }}
                  </q-item-section>
                  <div class="left-arrow" />
                </q-item>
              </router-link>
              <router-link v-else
                           :to="{name: item.route.name, params: item.route.params}">
                <q-item class="item"
                        :class="{arrow: selectedIndex === index }"
                        clickable
                        @mouseover="showData(index)">
                  <q-item-section>
                    {{item.title}}
                  </q-item-section>
                  <div class="left-arrow" />
                </q-item>
              </router-link>

            </div>
          </q-list>
        </div>
      </div>
      <div class="col-10">
        <div v-for="(item, index) in data.subCategoryItemsCol"
             :key="index">
          <div>
            <div v-if="item.type === 'image'">
              <div v-if="item.selected">
                <router-link :to="{name: item.route.name, params: item.route.params}">
                  <q-responsive :ratio="1998/553">
                    <q-img :src="item.backgroundImage" />
                  </q-responsive>
                </router-link>
              </div>
            </div>
            <div v-else-if="item.type === 'text'">
              <div v-if="item.selected"
                   :style="{background: item.backgroundColor}">
                <div class="row">
                  <div v-for="col in item.cols"
                       :key="col"
                       class="col-md-4 text-subtitle1 q-mb-xs">
                    <q-list>
                      <router-link :to="{ name: 'Public.Content.Search', query: { 'tags[]': col.tags } }">
                        <q-item clickable>
                          <q-item-section class="list-title">
                            {{col.title.title}}
                          </q-item-section>
                        </q-item>
                      </router-link>
                      <div v-for="colItem in col.items"
                           :key="colItem">
                        <router-link :to="{ name: 'Public.Content.Search', query: { 'tags[]': colItem.tags } }">
                          <q-item clickable>
                            <q-item-section>
                              {{colItem.title}}
                            </q-item-section>
                          </q-item>
                        </router-link>
                      </div>
                    </q-list>
                  </div>
                </div>

                <div v-if="item.selected"
                     class="magaMenu-photo-container">
                  <q-img :src="item.photo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script>

export default {
  name: 'magaMenu',
  props: {
    data: {
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
  computed: {
    selectedIndex() {
      return this.data.subCategoryItemsCol.findIndex(item => item.selected)
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
    },
    showData(colIndex) {
      this.data.subCategoryItemsCol.forEach((item, subIndex) => {
        item.selected = colIndex === subIndex
      })
      this.data.children.forEach((item, subIndex) => {
        item.hover = colIndex === subIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
.arrow{
  margin-right: 14px;
  transition: border-left 1s;
  z-index: 2;
  font-weight: bold;
  background-color: orange;
  &:after {
    content:'';
    position: absolute;
    left: 169px;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 25px solid orange;
    border-top: 24px solid transparent;
    border-bottom: 24px solid transparent;
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

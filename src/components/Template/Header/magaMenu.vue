<template>
  <q-btn-dropdown flat
                  content-style="width: 1100px; right: 360px; border-radius: 10px"
                  :label="data.menuTitle">
    <div class="row">
      <div class="col-2 q-pb-md">
        <div class="q-mb-md">
          <q-list>
            <div v-for="item in data.megaMenu.categoryItemsCol"
                 :key="item">
              <router-link v-if="item.tags"
                           :to="{ name: 'Public.Content.Search', query: { 'tags[]': item.tags } }">
                <q-item class="item"
                        clickable
                        @mouseover="showData(item.category)">
                  <q-item-section>
                    {{ item.title }}
                  </q-item-section>
                </q-item>
              </router-link>
              <router-link v-else
                           :to="{path: item.path}">
                <q-item class="item"
                        clickable
                        @mouseover="showData(item.category)">
                  <q-item-section>
                    {{item.title}}
                  </q-item-section>
                </q-item>
              </router-link>
            </div>
          </q-list>
        </div>
      </div>
      <div class="col-10">
        <div v-for="item in data.megaMenu.subCategoryItemsCol"
             :key="item">
          <div>
            <div v-if="item.photo">
              <div v-if="item.showData">
                <q-responsive :ratio="1998/553">
                  <q-img :src="item.photo" />
                </q-responsive>
              </div>
            </div>
            <div v-else>
              <div v-if="item.showData"
                   :style="{background: item.bg}">
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

                <div v-if="item.showData"
                     class="magaMenu-svg-container">
                  <div class="megaMenu-svg-title">
                    {{item.svg.title}}
                  </div>
                  <div class="megaMenu-svg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 455.431 455.431"
                         width="100"
                         height="100">
                      <g>
                        <path :style="{fill: item.svg.pathColor1}"
                              d="M405.39,412.764c-69.689,56.889-287.289,56.889-355.556,0s-62.578-300.089,0-364.089  s292.978-64,355.556,0S475.079,355.876,405.39,412.764z"
                              data-original="#5CA4DA"
                              class=""
                              data-old_color="#5CA4DA" />
                        <path :style="{fill: item.svg.pathColor2}"
                              d="M229.034,313.209c-62.578,49.778-132.267,75.378-197.689,76.8  C-17.01,307.52-7.055,106.987,49.834,48.676c51.2-52.622,211.911-62.578,304.356-29.867  C376.945,112.676,330.012,232.142,229.034,313.209z"
                              data-original="#6DAFE0"
                              class="active-path"
                              data-old_color="#6DAFE0" />
                      </g>
                    </svg>
                  </div>
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
  methods: {
    showData(category) {
      this.data.megaMenu.subCategoryItemsCol.forEach(item => {
        item.showData = item.category === category
      })
    }
  }
}
</script>

<style scoped lang="scss">
.item:hover {
  font-weight: bold;
  background-color: orange;
}
.list-title{
  font-weight: bold;
}
.magaMenu-svg-container{
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

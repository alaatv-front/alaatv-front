<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div v-for="(col, colIndex) in localMenuItem.children"
             :key="colIndex"
             class="col-md-4 text-subtitle1 q-mb-xs">
          <q-list>
            <q-item class="q-mb-md bg-grey-5">
              <q-item-section>
                <div>
                  <q-btn icon="delete"
                         flat
                         color="grey-8"
                         @click="removeChildren(localMenuItem.children, colIndex)" />
                  عنوان هدر
                </div>
                <q-input v-model="localMenuItem.children[colIndex].title" />
                <q-expansion-item label="لینک">
                  <link-option-panel v-model:menu-item="localMenuItem.children[colIndex]" />
                </q-expansion-item>
              </q-item-section>
            </q-item>
            <q-item v-for="(colItem, colItemIndex) in localMenuItem.children[colIndex].children"
                    :key="colItemIndex"
                    class="q-mb-md bg-grey-4">
              <q-item-section>
                <div>
                  <q-btn icon="delete"
                         color="grey-6"
                         flat
                         @click="removeChildren(localMenuItem.children[colIndex].children, colItemIndex)" />
                  عنوان آیتم
                </div>
                <q-input v-model="localMenuItem.children[colIndex].children[colItemIndex].title" />
                <q-expansion-item label="لینک">
                  <link-option-panel v-model:menu-item="localMenuItem.children[colIndex].children[colItemIndex]" />
                </q-expansion-item>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-btn icon="add"
                       flat
                       @click="addChildren(localMenuItem.children[colIndex])" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-md-4 text-subtitle1 q-mb-xs">
          <q-btn icon="add"
                 class="full-width"
                 @click="addChildren(localMenuItem)">
            ستون جدید
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>

import LinkOptionPanel from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/LinkOptionPanel.vue'

export default {
  name: 'OptionPanelMegaMenuItemTextType',
  components: { LinkOptionPanel },
  props: {
    menuItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      menuTypeOptions: [
        {
          label: 'تصویر',
          value: 'image'
        },
        {
          label: 'متن',
          value: 'text'
        }
      ]
    }
  },
  computed: {
    localMenuItem: {
      set (newValue) {
        this.$emit('update:menuItem', newValue)
      },
      get () {
        return this.menuItem
      }
    }
  },
  methods: {
    removeChildren (list, index) {
      list.splice(index, 1)
    },
    createSubChildren (index) {
      this.localChildren[index].children = []
    },
    addChildren (menuItem) {
      if (!menuItem.children) {
        menuItem.children = []
      }
      menuItem.children.push({
        title: 'مورد جدید',
        route: null
      })
    }
  }
}
</script>

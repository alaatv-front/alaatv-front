<template>
  <q-card>
    <q-card-section>
      <q-list>
        <q-item v-for="(localChildrenItem, localChildrenIndex) in localChildren"
                :key="localChildrenIndex"
                v-ripple
                clickable
                @click="showOptionsInDialog(localChildren[localChildrenIndex])">
          <q-item-section thumbnail>
            <q-btn icon="delete"
                   flat
                   @click="removeChildren($event, localChildrenIndex)" />
          </q-item-section>
          <q-item-section>
            {{ localChildren[localChildrenIndex].title }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn icon="add"
                   flat
                   @click="addChildren" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
  <q-dialog v-model="optionsDialog"
            full-width>
    <q-card>
      <q-card-section>
        <q-btn v-close-popup
               icon="close"
               color="primary"
               class="absolute-top-right z-top" />
        <option-panel-mega-menu-general v-model:menu-item="selectedItem" />
        <option-panel-mega-menu-item-text-type v-if="selectedItem.type === 'text'"
                                               v-model:menu-item="selectedItem" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

import OptionPanelMegaMenuGeneral
  from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/OptionPanelMegaMenuGeneral.vue'
import OptionPanelMegaMenuItemTextType
  from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/OptionPanelMegaMenuItemTextType.vue'

export default {
  name: 'OptionPanelMegaMenu',
  components: { OptionPanelMegaMenuItemTextType, OptionPanelMegaMenuGeneral },
  props: {
    children: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      optionsDialog: false,
      selectedItem: null
    }
  },
  computed: {
    localChildren: {
      set (newValue) {
        this.$emit('update:children', newValue)
      },
      get () {
        return this.children
      }
    }
  },
  methods: {
    showOptionsInDialog (item) {
      this.selectedItem = item
      this.optionsDialog = true
    },
    removeChildren (event, index) {
      event.stopPropagation()
      this.localChildren.splice(index, 1)
      this.localChildren.forEach((item, subIndex) => {
        item.selected = subIndex === 0
      })
    },
    createSubChildren (index) {
      this.localChildren[index].children = []
    },
    addChildren () {
      this.localChildren.push({
        title: 'مورد جدید',
        route: null
      })
      this.$emit('update:children', this.localChildren)
    }
  }
}
</script>

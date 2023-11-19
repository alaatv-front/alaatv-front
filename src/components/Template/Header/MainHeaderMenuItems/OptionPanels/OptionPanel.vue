<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <div class="row q-col-gutter-md">
            <div class="col-md-8 col-12">
              <q-select v-model="localMenuItem.type"
                        map-options
                        emit-value
                        label="نوع منو"
                        :options=menuTypeOptions />
            </div>
            <div class="col-md-4 col-12">
              <q-btn icon="cancel"
                     color="red"
                     label="حذف آیتم از منو"
                     @click="removeItemFromMenuList" />
            </div>
          </div>
        </div>
        <div class="col-md-8 col-12">
          <div class="outsidelabel">عنوان</div>
          <q-input v-model="localMenuItem.title" />
        </div>
        <div class="col-md-4 col-12">
          <q-checkbox v-model="localMenuItem.desktopMode"
                      right-label
                      label="نمایش در منوی اصلی ( دسکتاپ )" />
          <q-checkbox v-model="localMenuItem.mobileMode"
                      right-label
                      label="نمایش در منوی جانبی ( موبایل )" />
        </div>
        <div class="col-12">
          <link-option-panel v-model:menu-item="localMenuItem" />
        </div>
        <div class="col-12">
          <q-separator class="q-mb-md" />
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <option-panel-simple-menu v-if="localMenuItem.type === 'simpleMenu'"
                                        v-model:children="localMenuItem.children" />
              <option-panel-mega-menu v-if="localMenuItem.type === 'megaMenu'"
                                      v-model:children="localMenuItem.children" />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>

import LinkOptionPanel from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/LinkOptionPanel.vue'
import OptionPanelMegaMenu from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/OptionPanelMegaMenu.vue'
import OptionPanelSimpleMenu from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/OptionPanelSimpleMenu.vue'

export default {
  name: 'itemMenu',
  components: { LinkOptionPanel, OptionPanelMegaMenu, OptionPanelSimpleMenu },
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
          label: 'بدون زیر منو',
          value: 'itemMenu'
        },
        {
          label: 'مگامنو',
          value: 'megaMenu'
        },
        {
          label: 'با زیرمنو ساده',
          value: 'simpleMenu'
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
    removeItemFromMenuList() {
      this.localMenuItem.deleted = true
      this.$emit('update:menuItem', this.localMenuItem)
    }
  }
}
</script>

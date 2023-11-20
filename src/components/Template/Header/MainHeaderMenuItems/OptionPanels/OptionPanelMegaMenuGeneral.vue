<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-12">
          <div>
            نوع منو
          </div>
          <q-select v-model="localMenuItem.type"
                    map-options
                    emit-value
                    label="نوع منو"
                    :options=menuTypeOptions />
          <br>
          <div>
            عنوان
          </div>
          <q-input v-model="localMenuItem.title" />
          <br>
          <div>
            badge
          </div>
          <q-input v-model="localMenuItem.badge" />
        </div>
        <div class="col-md-6 col-12">
          <div>
            تصویر پس زمینه
          </div>
          <q-input v-model="localMenuItem.backgroundImage" />
          <br>
          <div>
            رنگ پس زمینه
          </div>
          <q-color v-model="localMenuItem.backgroundColor"
                   label="backgroundColor"
                   format-model="rgba" />
        </div>
        <div class="col-12">
          <link-option-panel v-model:menu-item="localMenuItem" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>

import LinkOptionPanel from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/LinkOptionPanel.vue'

export default {
  name: 'OptionPanelMegaMenuGeneral',
  components: { LinkOptionPanel },
  props: {
    menuItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
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
    removeChildren (index) {
      this.localChildren.splice(index, 1)
    },
    createSubChildren (index) {
      this.localChildren[index].children = []
    },
    addChildren () {
      this.localChildren.push({
        title: 'مورد جدید',
        route: null
      })
    }
  }
}
</script>

<template>
  <component
    :is="currentComponent"
    v-model:value="getNeededInputs"
    v-bind="neededConfig"
    ref="entityComponent"
  >
    <template v-slot:before-form-builder>
      <slot name="entity-crud-before-form-builder"></slot>
    </template>
    <template v-slot:after-form-builder>
      <slot name="entity-crud-after-form-builder"></slot>
    </template>
    <template v-slot:before-index-table>
      <slot name="entity-crud-before-index-table"></slot>
    </template>
    <template v-slot:after-index-table>
      <slot name="entity-crud-after-index-table"></slot>
    </template>
    <template v-slot:table-cell="{inputData, showConfirmRemoveDialog}">
      <slot name="entity-crud-table-cell" :inputData="inputData" :showConfirmRemoveDialog="showConfirmRemoveDialog"></slot>
    </template>
  </component>
</template>

<script>
import { EntityEdit, EntityCreate, EntityIndex, EntityShow } from 'quasar-crud'

export default {
  name: 'EntityCrud',
  components: {
    EntityEdit,
    EntityCreate,
    EntityIndex,
    EntityShow
  },
  props: {
    createInputs: {
      type: Array,
      default () {
        return []
      }
    },
    showInputs: {
      type: Array,
      default () {
        return []
      }
    },
    editInputs: {
      type: Array,
      default () {
        return []
      }
    },
    indexInputs: {
      type: Array,
      default () {
        return []
      }
    },
    defaultInputs: {
      type: Array,
      default () {
        return []
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: [
    'update:defaultInputs',
    'update:indexInputs',
    'update:editInputs',
    'update:createInputs',
    'update:showInputs'
  ],
  data () {
    return {
      currentComponent: '',
      currentMode: '',
      neededConfig: {}
    }
  },
  computed: {
    getNeededInputs () {
      if (this[this.currentMode + 'Inputs'].length > 0) {
        return this[this.currentMode + 'Inputs']
      }
      return this.inputDefaultValue
    },
    inputDefaultValue: {
      get () {
        return this.defaultInputs
      },
      set (value) {
        this.$emit('update:defaultInputs', value)
      }
    },
    indexDefaultValue: {
      get () {
        return this.indexInputs
      },
      set (value) {
        this.$emit('update:indexInputs', value)
      }
    },
    showDefaultValue: {
      get () {
        return this.showInputs
      },
      set (value) {
        this.$emit('update:showInputs', value)
      }
    },
    editDefaultValue: {
      get () {
        return this.editInputs
      },
      set (value) {
        this.$emit('update:editInputs', value)
      }
    },
    createDefaultValue: {
      get () {
        return this.createInputs
      },
      set (value) {
        this.$emit('update:createInputs', value)
      }
    },
    getRouteChange () {
      return this.$route.path
    }
  },
  created () {
    this.getComponent()
  },
  mounted () {},
  watch: {
    getRouteChange (to, from) {
      this.getComponent()
    }
  },
  methods: {
    getComponent () {
      const cName = this.getRoutesMode()
      let componentName = ''
      if (cName) {
        componentName = 'entity-' + cName
        this.createComponentConfig(cName)
      }
      this.currentComponent = componentName
      this.currentMode = cName
    },
    SetApiId () {
      if (this.$route.params.id) {
        this.neededConfig.api += this.$route.params.id
      }
    },
    createComponentConfig (mode) {
      const componentConfig = {}
      let currentModeProps = {}
      if (mode === 'show') {
        currentModeProps = EntityShow.props
      } else if (mode === 'index') {
        currentModeProps = EntityIndex.props
      } else if (mode === 'edit') {
        currentModeProps = EntityEdit.props
      } else if (mode === 'create') {
        currentModeProps = EntityCreate.props
      }
      for (const key in currentModeProps) {
        if (this.checkIfPropertyExists(key)) {
          componentConfig[key] = this.config[key]
        }
      }
      componentConfig.api = this.config.api[mode]
      if (this.config.title[mode]) {
        componentConfig.title = this.config.title[mode]
      }
      console.log('componentConfig', componentConfig)
      this.neededConfig = componentConfig
      this.SetApiId()
    },
    checkIfPropertyExists (key) {
      return !!(this.config[key])
    },
    getRoutesMode () {
      const allModes = ['show', 'index', 'edit', 'create']
      const routeMode = this.$route.name.toLowerCase()
      let mode = ''
      allModes.forEach((item) => {
        if (routeMode.includes(item)) {
          mode = item
        }
      })
      return mode
    }
  }
}
</script>

<style scoped>

</style>

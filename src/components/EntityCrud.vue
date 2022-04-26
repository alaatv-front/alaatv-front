<template>
  <component
    :is="currentComponent"
    v-model:value="getNeededInputs"
    v-bind="neededConfig"
    ref="entityComponent"
  />
</template>

<script>
import { EntityEdit, EntityCreate, EntityIndex, EntityShow } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'EntityCrud',
  components: {
    EntityEdit,
    EntityCreate,
    EntityIndex,
    EntityShow
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
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
    }
  },
  created () {
    this.getComponent()
  },
  mounted () {},
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
    createComponentConfig (mode) {
      const componentConfig = {}
      let currentModeProps = {}
      if (mode === 'show') {
        console.log('EntityShow.props', EntityShow.props)
        currentModeProps = EntityShow.props
      } else if (mode === 'index') {
        console.log('EntityIndex.props', EntityIndex.props)
        currentModeProps = EntityIndex.props
      } else if (mode === 'edit') {
        console.log('EntityEdit.props', EntityEdit.props)
        currentModeProps = EntityEdit.props
      } else if (mode === 'create') {
        console.log('EntityCreate.props', EntityCreate.props)
        currentModeProps = EntityCreate.props
      }
      for (const key in currentModeProps) {
        if (this.checkIfPropertyExists(key)) {
          componentConfig[key] = this.config[key]
        }
      }
      componentConfig.api = API_ADDRESS.users[mode].base
      if (this.$route.params.id) {
        this.neededConfig.api += this.$route.params.id
      }
      console.log('componentConfig', componentConfig)
      this.neededConfig = componentConfig
    },
    checkIfPropertyExists (key) {
      return !!(this.config[key])
    },
    getRoutesMode () {
      const modes = ['show', 'index', 'edit', 'create']
      const routeMode = this.$route.name.toLowerCase()
      // eslint-disable-next-line no-unused-vars
      let mode = ''
      modes.forEach((item) => {
        if (routeMode.includes(item)) {
          mode = item
        }
      })
      mode = 'edit'
      return mode
    }
  }
}
</script>

<style scoped>

</style>

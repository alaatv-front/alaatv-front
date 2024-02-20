<template>
  <triple-title-set-content-selection v-model:major="localMajor"
                                      v-model:product="localProduct"
                                      v-model:topic="localTopic"
                                      v-model:set="localSet"
                                      v-model:selectedContentList="localContents" />
</template>

<script>
import { Set } from 'src/models/Set.js'
import { Major } from 'src/models/Major.js'
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import TripleTitleSetContentSelection from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetContentSelection/TripleTitleSetContentSelection.vue'

export default {
  name: 'FormBuilderInputStudyPlanContentsSelector',
  components: { TripleTitleSetContentSelection },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    major: {
      type: [Major, Object],
      default: new Major()
    },
    product: {
      type: [Product, Object],
      default: new Product()
    },
    set: {
      type: [Set, Object],
      default: new Set()
    },
    topic: {
      type: String,
      default: null
    }
  },
  emits: ['update:major', 'update:product', 'update:topic', 'update:set', 'update:value'],
  data () {
    return {
      content: null,
      contents: [],
      loading: false
    }
  },
  computed: {
    localMajor: {
      get () {
        return this.major
      },
      set (value) {
        this.$emit('update:major', value)
        this.$bus.emit('FormBuilderInputStudyPlanContentsSelector-update:major', value)
      }
    },
    localProduct: {
      get () {
        return this.product
      },
      set (value) {
        this.$emit('update:product', value)
        this.$bus.emit('FormBuilderInputStudyPlanContentsSelector-update:product', value)
      }
    },
    localSet: {
      get () {
        return this.set
      },
      set (value) {
        this.$emit('update:set', value)
        this.$bus.emit('FormBuilderInputStudyPlanContentsSelector-update:set', value)
      }
    },
    localTopic: {
      get () {
        return this.topic
      },
      set (value) {
        this.$emit('update:topic', value)
        this.$bus.emit('FormBuilderInputStudyPlanContentsSelector-update:topic', value)
      }
    },
    localContents: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value)
      }
    }
  },
  watch: {
    value (value) {
      const contentsIds = []
      value.forEach(content => {
        contentsIds.push(content.id)
      })
      this.$emit('update:value', contentsIds)
    }
  },
  mounted () {
    this.value.forEach(content => {
      this.contents.push(content.id)
    })
  },
  methods: {
    onKeyUp (event) {
      if (event.key === 'Enter') {
        this.showContentDemo()
      }
    },
    removeContentDemo (index) {
      this.localContents.slice(index, 1)
      this.contents.splice(index, 1)
      this.$emit('update:value', this.contents)
    },
    showContentDemo () {
      this.loading = true
      APIGateway.content.show(this.content)
        .then(content => {
          this.content = null
          this.localContents.push(content)
          this.contents.push(content.id)
          this.$emit('update:value', this.contents)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

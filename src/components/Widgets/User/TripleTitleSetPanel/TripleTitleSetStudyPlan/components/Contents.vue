<template>
  <q-inner-loading v-if="loading"
                   :showing="loading" />
  <div v-else>
    <div>
      کد جلسات
    </div>
    <div>
      <q-select v-model="localValue"
                option-value="id"
                option-label="id"
                filled
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add"
                @add="showContentDemo"
                @remove="removeContentDemo" />
      <div v-for="(content, index) in contentsList"
           :key="index"
           class="row q-mt-sm">
        <q-icon class="col-1"
                name="isax:play-circle" />
        <span class="col-10">{{content.id}} - {{content.title}}</span>
        <q-icon name="isax:trash"
                color="red"
                class="col-1 cursor-pointer"
                @click="removeContentDemo({value: content.id})" />
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'AddLink',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      contentsList: [],
      loading: false
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('update:value', newValue.map(item => parseInt(item)))
      }
    }
  },
  mounted() {
    this.contentsList = this.localValue
  },
  methods: {
    removeContentDemo(item) {
      this.contentsList.splice(this.contentsList.findIndex(content => content.id === item.value))
      this.localValue.splice(this.localValue.findIndex(value => value === item.value))
    },
    showContentDemo(item) {
      this.loading = true
      APIGateway.content.show(item.value)
        .then(content => {
          this.contentsList.push(content)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

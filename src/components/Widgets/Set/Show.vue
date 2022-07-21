<template>
  <div>
    hi {{ set.id }}
    <br>
    {{ set.title }}
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { mixinWidget } from 'src/mixin/Mixins'
import { Set } from 'src/models/Set'

export default {
  name: 'SetShowInfo',
  mixins: [mixinWidget],
  props: {
    data: {
      type: [Set, Number, String],
      default () {
        return new Set()
      }
    }
  },
  watch: {
    data () {
      this.loadSet()
    },
    'data.id': function () {
      this.loadSet()
    }
  },
  data () {
    return {
      set: new Set(),
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: []
                  }
                ],
                options: {
                  boxed: false
                }
              }
            ]
          }
        }
      ]
    }
  },
  created () {
    this.loadSet()
  },
  methods: {
    loadSet () {
      if (typeof this.data === 'object') {
        this.set = this.data
      } else if (typeof this.data === 'number' || typeof this.data === 'string') {
        this.set.id = this.data
        this.getSet()
      }
    },
    getSet () {
      this.set.loading = true
      const url = API_ADDRESS.set.show(this.set.id)
      let promise = null
      if (typeof this.options.getData === 'function') {
        promise = this.options.getData(url)
      } else {
        promise = this.$axios.get(url)
      }

      promise
        .then(response => {
          this.set = new Set(response.data.data)
          this.set.loading = false
        })
        .catch(() => {
          this.set.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>

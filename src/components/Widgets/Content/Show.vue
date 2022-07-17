<template>
  <div>
    hi {{ content.id }}
    <br>
    {{ content.title }}
  </div>
</template>

<script>
import API_ADDRESS from "src/api/Addresses";
import {Content} from "src/models/Content";

export default {
  name: "ContentShowInfo",
  props: {
    data: {
      type: [Content, Number, String],
      default () {
        return new Content()
      }
    }
  },
  watch: {
    data () {
      this.loadContent()
    },
    'data.id': function () {
      this.loadContent()
    }
  },
  data () {
    return {
      content: new Content(),
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
    this.loadContent()
  },
  methods: {
    loadContent () {
      if (typeof this.data === 'object') {
        this.content = this.data
      } else if (typeof this.data === 'number' || typeof this.data === 'string') {
        this.content.id = this.data
        this.getContent()
      }
    },
    getContent () {
      this.content.loading = true
      this.$axios.get(API_ADDRESS.content.show(this.content.id))
        .then(response => {
          this.content = new Content(response.data.data)
          this.content.loading = false
        })
        .catch(() => {
          this.content.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>

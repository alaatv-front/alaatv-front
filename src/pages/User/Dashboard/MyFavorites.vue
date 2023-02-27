<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageBuilder } from 'src/mixin/Mixins'
export default {
  name: 'MyFavorites',
  mixins: [mixinPageBuilder],
  data () {
    return {
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ProfileMenu'
                      }
                    ],
                    options: {
                      className: 'col-md-3 q-pr-md '
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'MyFavorites'
                      }
                    ],
                    options: {
                      className: 'col-md-9 q-pl-md'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  style: {
                    marginTop: '30px',
                    marginBottom: '30px'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  computed: {
    calculateHeightStyle () {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  },
  mounted () {
    this.loadPageBuilderData()
  },
  methods: {
    loadPageBuilderData () {
      this.currenSections = this.sections
    }
  }
}
</script>

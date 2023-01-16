<template>
  <q-page-builder
    v-model:sections="sections"
    v-model::options="pageConfig"
    :editable="pageBuilderEditable"
  />
</template>

<script>
import { Notify } from 'quasar'
export default {
  name: 'PageProfile',
  data() {
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
                        name: 'ProfileCrud'
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
          },
          options: {}
        }
      ],
      options: {}
    }
  },
  computed: {
    pageBuilderEditable() {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    },
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  },
  created() {
    if (this.$store.getters['Auth/incompleteProfile']) {
      Notify.create({
        message: 'لطفا ابتدا اطلاعات کاربری را کامل نمایید.',
        color: 'warning'
      })
    }
  }
}
</script>

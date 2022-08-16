<template>
  <div>
    <page-builder
      :sections="sections"
      :options="options"
    ></page-builder>
  </div>
</template>

<script>
import pageBuilder from 'components/PageBuilder/PageBuilder'
import { Notify } from 'quasar'
export default {
  name: 'Profile.vue',
  components: {
    pageBuilder
  },
  data() {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'profile-menu'
                      }
                    ],
                    options: {
                      className: 'col-md-3 q-pr-md '
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'profile-crud',
                        data: { test: 'test' },
                        options: { test: 'test' }
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
                    marginTop: '30px'
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
  created() {
    if (this.$store.getters['Auth/incompleteProfile']) {
      Notify.create({
        message: 'لطفا ابتدا اطلاعات کاربری را کامل نمایید.',
        color: 'warning'
      })
    }
  },
  methods: {},
  computed: {
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

<style scoped></style>

<template>
  <div class="Profile-vue-page">
    <q-page-builder
      v-model:sections="sections"
    />
  </div>
</template>

<script>
import { Notify } from 'quasar'
export default {
  name: 'Profile.vue',
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
                        name: 'ProfileCrud',
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

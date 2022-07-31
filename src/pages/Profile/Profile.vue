<template>
  <div>
    <page-builder :sections="sections" :options="pageConfig"></page-builder>
  </div>
</template>

<script>
import pageBuilder from 'components/PageBuilder/PageBuilder'
export default {
  name: 'Profile.vue',
  components: {
    pageBuilder
  },
  data() {
    return {
      pageConfig:{
          // a: "md"
        },
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
                        },
                      ],
                      options: {
                        col: 'col-md-3'
                      }
                    },
                    {
                      widgets: [
                        {
                          name: 'profile',
                        },
                      ],
                      options: {
                        col: 'col-md-9'
                      }
                    }
                  ],
                  options: {
                    boxed: true
                  }
                }
              ]
            },
            options: {}
          },
        ],
    }
  }

}
</script>

<style scoped>

</style>

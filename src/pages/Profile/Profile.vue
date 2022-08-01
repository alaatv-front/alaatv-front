<template>
  <div>
    <page-builder :sections="sections" :options="pageConfig"></page-builder>
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
                        // {
                        //   name: 'profile',
                        // },
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
  },
  created () {
    if(this.$store.getters['Auth/incompleteProfile']){
      Notify.create({message: 'لطفا ابتدا اطلاعات کاربری را کامل نمایید.', color: 'warning'})
    }
  },
  methods: {
    test(){
      return this.$store.getters['Auth']
    }
  }
}
</script>

<style scoped>

</style>

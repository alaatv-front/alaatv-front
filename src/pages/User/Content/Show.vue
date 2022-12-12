<template>
  <div class="content-show-page">
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
      :preview="true"
      :editable="editable"
      @toggleEdit="toggleEdit"
    />
  </div>
</template>

<script>
import GetWidgetsData from 'src/assets/js/GetWidgetsData.js'

export default {
  name: 'Show',
  beforeRouteUpdate(to, from) {
    this.updateData(to.params.id, this.sections)
  },
  data() {
    return {
      editable: false,
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
                        name: 'ContentVideoPlayer',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
                        }
                      }
                    ],
                    options: {
                      className: 'col-12 col-xs-12 col-sm-12 col-md-8'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ContentVideoList',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
                        }
                      }
                    ],
                    options: {
                      className: 'col-12 col-xs-12 col-sm-12 col-md-4',
                      style: {
                        paddingBottom: '16px'
                      }
                    }
                  }
                ],
                options: {
                  style: {
                    marginTop: '16px'
                  },
                  boxed: true
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ContentShowInfo',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
                        }
                      }
                    ],
                    options: {
                      className: 'col-sm-8 col-xs-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ContentDownloadSection',
                        // data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
                        }
                      }
                    ],
                    options: {
                      className: 'col-sm-4 col-xs-12',
                      style: {
                        paddingBottom: '24px'
                      }
                    }
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          }
        }
      ],
      objectNames: ['rows', 'cols', 'widgets', 'data'],
      widgetNames: ['ContentShowInfo', 'ContentVideoPlayer', 'ContentVideoList']
    }
  },
  mounted() {
    this.paddingStyle()
  },
  methods: {
    toggleEdit() {
      this.editable = !this.editable
    },
    paddingStyle() {
      // document.getElementsByClassName('padding-list')[0].style.paddingBottom='16px'
      // document.getElementsByClassName('padding-download')[0].style.paddingBottom='24px'
    },
    updateData(id, data) {
      if (data.name && this.widgetNames.includes(data.name)) {
        data.data = id
        return
      }
      if (Array.isArray(data)) {
        data.forEach(e => {
          this.updateData(id, e)
        })
      } else {
        for (const key in data) {
          if (this.objectNames.includes(key)) {
            this.updateData(id, data[key])
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

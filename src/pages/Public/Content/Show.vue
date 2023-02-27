<template>
  <div class="content-show-page">
    <q-page-builder v-model:sections="sections"
                    v-model::options="pageConfig"
                    :preview="true"
                    :editable="pageBuilderEditable"
                    @toggleEdit="toggleEdit" />
  </div>
</template>

<script>
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
                        options: {
                          paginate: true
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
                        name: 'ContentVideoList'
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
                        name: 'ContentShowInfo'
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
                        options: {
                          link: '#'
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
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'Block',
                        options: {
                          apiName: 'content'
                        }
                      }
                    ],
                    options: {
                      className: 'col-12'
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
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
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

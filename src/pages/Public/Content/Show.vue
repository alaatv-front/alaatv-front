<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageOptions, mixinSEO } from 'src/mixin/Mixins'

export default {
  name: 'Show',
  mixins: [mixinPageOptions, mixinSEO],
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
                          link: 'https://play.google.com/store/apps/details?id=ir.sanatisharif.android.konkur96'
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
      ]
    }
  },
  created () {
    this.currenSections = this.sections
  }
}
</script>

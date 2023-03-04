<template>
  <div v-if="false"
       class="row">
    <div class="col-12">
      <div class="row items-center justify-center">
        <div class="col-6">
          <video-player :source="'https://alaatv.com/hls/input.m3u8'" />
        </div>
      </div>
    </div>
  </div>
  <div v-if="false"
       class="row">
    <div class="col-6 text-center">
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
      aaaaaaaaaaaaaaaaaaa
      <br>
    </div>
    <div class="col-6 text-center">
      <div ref="MainContent"
           class="MainContent"
           style="height: 100%;">
        <div ref="Sidebar">
          <div ref="SidebarInner"
               class="sidebar__inner">
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
            ---------------------
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <q-select v-model="model"
                filled
                use-input
                option-label="title"
                option-value="id"
                input-debounce="0"
                label="Simple filter"
                :options="filterOptions"
                @filter="filterFn" />
    </div>
  </div>

<!--  <q-page-builder v-model:sections="sections"-->
<!--                  :editable="true" />-->
</template>

<script>
// const MinioServer = require('minio')
// import * as MinioServer from 'minio'
// import MinioServer from 'minio'

// let Minio = null
// let MinioServer = null
// if (typeof window !== 'undefined') {
//   // Minio = require('minio')
// // import MinioServer from 'src/assets/js/Minio.js'
//   import('src/assets/js/Minio.js')
//   // import('minio')
//     .then((minio) => {
//       console.log('hiiii', minio)
//       MinioServer = minio
//       // Minio = minio
//     })
//     .catch(err => {
//       console.log('err', err)
//     })
// }

let StickySidebar
if (typeof window !== 'undefined') {
  import('sticky-sidebar-v2')
    .then((stickySidebar) => {
      StickySidebar = stickySidebar.default
    })
}

import VideoPlayer from 'src/components/DashboardAbrisham/VideoPlayer.vue'
// import AWSS3UploadAsh from 'aws-s3-upload-ash'
// const S3CustomClient = new AWSS3UploadAsh({
//   bucketName: 'temp-upload',
//   dirName: '',
//   // region: 'us-east-1',
//   accessKeyId: 'temp-upload',
//   secretAccessKey: 'X&d2UF4d78Ar*w#Y',
//   // s3Url: 'https://stage-minio.alaatv.com'
//   // s3Url: 'http://192.168.8.30:9000'
//   s3Url: '192.168.8.30:9000'
//   // s3Url: '/alaa/minio'
// })

// import MinioServer from 'src/assets/js/Minio.js'

export default {
  name: 'debug',
  components: { VideoPlayer },
  mixins: [],
  beforeRouteEnter() {
    // console.log('debug beforeRouteEnter')
  },
  beforeRouteLeave() {
    // console.log('debug beforeRouteLeave')
  },
  beforeRouteUpdate() {
    // console.log('debug beforeRouteUpdate')
  },
  props: {
    testProp: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      model: null,
      filterOptions: [],
      stringOptions: [
        {
          id: '63ff427566344faf860f0f9f',
          title: 'دبیر 1',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '0',
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:47:57'
        },
        {
          id: '63ff427c66344faf860f0fa0',
          title: 'دبیر 2',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '2',
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:48:04'
        },
        {
          id: '63ff429866344faf860f0fa2',
          title: 'دبیر 3',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '3',
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:48:32'
        },
        {
          id: '63ff42b466344faf860f0fa3',
          title: 'دبیر 4',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '4',
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:49:00'
        },
        {
          id: '63ff42ef66344faf860f0fa5',
          title: 'رشته 1',
          parent: {
            id: '63f37272c590054efc012d13',
            title: 'رشته'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d13',
              title: 'رشته'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 2,
          updated_at: '2023-03-01 15:50:52',
          created_at: '2023-03-01 15:49:59'
        },
        {
          id: '63ff42f766344faf860f0fa6',
          title: 'رشته 2',
          parent: {
            id: '63f37272c590054efc012d13',
            title: 'رشته'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d13',
              title: 'رشته'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:50:52',
          created_at: '2023-03-01 15:50:07'
        },
        {
          id: '63ff42fe66344faf860f0fa7',
          title: 'رشته 3',
          parent: {
            id: '63f37272c590054efc012d13',
            title: 'رشته'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d13',
              title: 'رشته'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:50:52',
          created_at: '2023-03-01 15:50:14'
        },
        {
          id: '63ff433766344faf860f0fab',
          title: 'نظام آموزشی 1',
          parent: {
            id: '63f37272c590054efc012d14',
            title: 'نظام آموزشی'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d14',
              title: 'نظام آموزشی'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:51:11',
          created_at: '2023-03-01 15:51:11'
        },
        {
          id: '63ff433c66344faf860f0fac',
          title: 'نظام آموزشی 2',
          parent: {
            id: '63f37272c590054efc012d14',
            title: 'نظام آموزشی'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d14',
              title: 'نظام آموزشی'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:51:16',
          created_at: '2023-03-01 15:51:16'
        },
        {
          id: '63ff434166344faf860f0fad',
          title: 'نظام آموزشی 3',
          parent: {
            id: '63f37272c590054efc012d14',
            title: 'نظام آموزشی'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d14',
              title: 'نظام آموزشی'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:51:21',
          created_at: '2023-03-01 15:51:21'
        },
        {
          id: '63ff437c66344faf860f0fb1',
          title: 'دوره 1',
          parent: {
            id: '63f37272c590054efc012d15',
            title: 'دوره (متوسطه اول یا دوم بودن)'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d15',
              title: 'دوره (متوسطه اول یا دوم بودن)'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:52:59',
          created_at: '2023-03-01 15:52:20'
        },
        {
          id: '63ff438066344faf860f0fb2',
          title: 'دوره 2',
          parent: {
            id: '63f37272c590054efc012d15',
            title: 'دوره (متوسطه اول یا دوم بودن)'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d15',
              title: 'دوره (متوسطه اول یا دوم بودن)'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:52:59',
          created_at: '2023-03-01 15:52:24'
        },
        {
          id: '63ff43845b791cba140f7ff2',
          title: 'دوره 3',
          parent: {
            id: '63f37272c590054efc012d15',
            title: 'دوره (متوسطه اول یا دوم بودن)'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d15',
              title: 'دوره (متوسطه اول یا دوم بودن)'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:52:59',
          created_at: '2023-03-01 15:52:28'
        }
      ],

      stickySidebarInstance: null,
      file: null,
      pictureURL: null,
      uid: null,
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget',
                                      options: {
                                        style: { color: 'yellow !important' },
                                        className: 'q-ma-lg'
                                      }
                                    }
                                  ],
                                  options: {
                                    style: { border: '1px blue solid' }
                                  }
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ],
                              options: {
                                style: {},
                                className: 'boxed'
                              }
                            }
                          ]
                        }
                      },
                      {
                        name: 'Slider',
                        options: {
                          list: [
                            {
                              title: 'آزمون سه‌آ-21 مهر',
                              photo: {
                                src: 'https://nodes.alaatv.com/upload/images/slideShow/1665642162_5080.jpg?w=1280&h=500'
                              },
                              features: {
                                xl: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                lg: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                md: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                sm: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                xs: {
                                  src: '',
                                  width: '',
                                  height: ''
                                }
                              },
                              link: 'https://soalaa.com/'
                            },
                            {
                              title: 'مدرسه آنلاین آلاء',
                              photo: {
                                src: 'https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1280&h=500'
                              },
                              features: {
                                xl: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                lg: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                md: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                sm: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                xs: {
                                  src: '',
                                  width: '',
                                  height: ''
                                }
                              },
                              link: null
                            },
                            {
                              title: 'هدیه یلدایی 1401 - اسلایدر',
                              photo: {
                                src: 'https://nodes.alaatv.com/upload/images/slideShow/1671353744_7001.jpg?w=1280&h=500'
                              },
                              features: {
                                xl: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                lg: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                md: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                sm: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                xs: {
                                  src: '',
                                  width: '',
                                  height: ''
                                }
                              },
                              link: 'https://alaatv.com/shop'
                            }
                          ]
                        }
                      },
                      {
                        name: 'Block',
                        options: {
                          apiName: 'home',
                          from: 1
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-12 col-sm-6',
                      style: { color: 'blue !important' }
                    }
                  }
                ],
                options: {
                  style: { color: 'white' },
                  className: 'q-ma-md boxed'
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          },
          options: {
            style: {
              backgroundImage:
                'url("http://twintower.ir/api/media/tracks/368/thumbnail9-5777.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            className: '',
            fullHeight: true,
            verticalAlign: 'center'
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          options: {
            style: {
              backgroundImage:
                'url("https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1845&h=720")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            fullHeight: true,
            verticalAlign: 'center'
          }
        }
      ],
      // this is page options
      options: {
        // className: "q-ma-xs q-pa-lg",
        // style: {background: "black !important", color: "white", marginTop: '200px'}
      }
    }
  },
  activated() {
    // console.log('debug activated')
  },
  updated() {
    // console.log('debug updated')
  },
  created() {
    // console.log('debug created')
  },
  mounted() {
    // console.log('debug mounted')
    // this.loadSticky()
  },
  methods: {
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.stringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = this.stringOptions.filter(
            v => v.title.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    loadSticky () {
      this.stickySidebarInstance = new StickySidebar(this.$refs.Sidebar, {
        topSpacing: 72,
        bottomSpacing: 20,
        containerSelector: '.MainContent',
        innerWrapperSelector: '.sidebar__inner',
        scrollContainer: '#main-viewport'
      })
    },
    loggg (newFile) {
      // eslint-disable-next-line
      console.log('newFile', newFile)
      // eslint-disable-next-line
      // console.log('MinioServer', MinioServer)

      // S3CustomClient
      //   .uploadFile(newFile, undefined, '192.168.8.30:9000', 'test.pdf')
      //   .then(response => console.log(response))
      //   .catch(err => console.error(err))

      // const minioServer = new MinioServer()
      // minioServer.upload(newFile)
      // const minioClient = new MinioServer.Client({
      //   // endPoint: '/alaa/minio',
      //   endPoint: 'http://192.168.8.30',
      //   // endPoint: 'https://stage-minio.alaatv.com',
      //   port: 9000,
      //   useSSL: false,
      //   accessKey: 'temp-upload',
      //   secretKey: 'X&d2UF4d78Ar*w#Y'
      // })
      // const metaData = {
      //   'Content-Type': 'application/octet-stream',
      //   'X-Amz-Meta-Testing': 1234,
      //   example: 5678
      // }
      // minioClient.fPutObject('temp-upload', 'test.png', newFile, metaData, function(err, etag) {
      //   if (err) return console.log(err)
      //   console.log('File uploaded successfully.')
      // })
    },
    upload () {
      // S3CustomClient
      //   .uploadFile(newFileNameWithExtesion)
      //   .then(response => console.log(response))
      //   .catch(err => console.error(err))
    },
    updatePicture(files) {
      // this.pictureURL = this.onFileChange(files).resolve
    }
    // async getURL(key) {
    //   try {
    //     const url = await Storage.get(key)
    //     console.log('url from getURL' + url.substring(0, url.lastIndexOf('?')))
    //     this.pictureURL = url.substring(0, url.lastIndexOf('?'))
    //   } catch (error) {
    //     console.log('Error getting url: ', error)
    //   }
    // },
    // async onFileChange(files) {
    //   console.log('uploading')
    //   const file = files[0]
    //   // console.dir(files);
    //   try {
    //     let response = await Storage.put(this.uid + file.name, file, {
    //       // acl: "public-read",
    //       contentType: file.type // contentType is optional
    //     })
    //     console.log('uploaded')
    //     console.log(response)
    //     response = this.getURL(response.key).then((url) => {
    //       console.log('url ' + url)
    //       return url
    //     })
    //
    //     console.log('Uploaded with URL' + response)
    //     return response
    //   } catch (error) {
    //     console.log('Error uploading file: ', error)
    //   }
    // }
  }
}

</script>

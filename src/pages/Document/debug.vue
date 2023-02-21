<template>
  <div class="row">
    <div class="col-12">
      <div class="row items-center justify-center">
        <div class="col-6">
          <video-player :source="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'" />
        </div>
      </div>
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
  },
  methods: {
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

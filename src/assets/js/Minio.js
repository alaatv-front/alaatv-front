// const Minio = require('minio')
import * as Minio from './vite-minio/index.js'
class MinioServer {
  constructor () {
    this._config = {
      // endPoint: '/alaa/minio',
      endPoint: 'https://stage-minio.alaatv.com',
      // port: 9000,
      // useSSL: true,
      accessKey: 'temp-upload',
      secretKey: 'X&d2UF4d78Ar*w#Y'
    }
    this._client = new Minio.Client(this._config)
  }

  upload (file) {
    const metaData = {
      'Content-Type': 'application/octet-stream',
      'X-Amz-Meta-Testing': 1234,
      example: 5678
    }
    this._client.fPutObject('temp-upload', 'test.png', file, metaData, function(err, etag) {
      if (err) return console.log(err)
      console.log('File uploaded successfully.')
    })
  }
}

export default MinioServer

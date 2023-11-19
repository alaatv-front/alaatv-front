import axios from 'axios'
// import { xml2json } from 'xml-js'
import APIRepository from '../classes/APIRepository'

export default class VastAPI extends APIRepository {
  constructor () {
    super('vast', axios)
    this.APIAdresses = {
      base: 'https://nodes.alaatv.com/upload/vast/xml/vast_20220316102600100059.xml'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
  }

  getXml (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: axios,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data // vastXml
        // return Assist.parseXmlToJson(response.data)
        // return xml2json(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

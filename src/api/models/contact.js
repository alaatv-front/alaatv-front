import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Contact, ContactList } from 'src/models/Contact.js'
export default class ContactAPI extends APIRepository {
  constructor () {
    super('contact', apiV2)
    this.APIAdresses = {
      contact: '/contacts',
      edit: (id) => `/contacts/${id}`
    }
    this.CacheList = {
      contact: this.name + this.APIAdresses.contact
    }
  }

  getContacts (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.contact,
      cacheKey: this.CacheList.contact,
      ...(cache && { cache }),
      ...(data && { data }),
      resolveCallback: (response) => {
        return new ContactList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  saveContact (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.contact,
      data: this.getNormalizedSendData({
        number: null, // Mobile Number
        contacttype_id: null, // Number
        relative_id: null, // Number
        name: null, // String (name of event)
        phonetype_id: null // Number
      }, data),
      resolveCallback: (response) => {
        return new Contact(response)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  editContact (data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.edit(data.contactId),
      data: this.getNormalizedSendData({
        number: null, // Mobile Number
        phone_id: 1 // Number
      }, data.phone),
      resolveCallback: (response) => {
        return new Contact(response)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

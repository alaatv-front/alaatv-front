import APIRepository from '../classes/APIRepository.js'
import { apiV2 } from 'src/boot/axios.js'

const APIAdresses = {
  studyPlan: '/studyPlan'
}
export default class PlanAPI extends APIRepository {
  constructor() {
    super('plan', apiV2, '/plan', '', APIAdresses)
    this.CacheList = {
      studyPlan: this.name + this.APIAdresses.studyPlan
    }
  }
}

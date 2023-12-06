/* eslint-disable camelcase,prefer-const */
import { Model, Collection } from 'js-abstract-model'

class User extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: '/user'
      },
      { key: 'id' },
      { key: 'first_name' },
      { key: 'last_name' },
      { key: 'full_name' },
      { key: 'birthdate' },
      { key: 'mobile' },
      { key: 'city' },
      { key: 'province' },
      { key: 'ostan_id' },
      {
        key: 'shahr',
        default: {
          id: null,
          title: null
        }
      },
      { key: 'shahr_id' },
      { key: 'address' },
      { key: 'postal_code' },
      { key: 'email' },
      { key: 'school' },
      { key: 'user_exam_status' },
      { key: 'photo' },
      { key: 'name_slug' },
      { key: 'kartemeli' },
      { key: 'role' },
      { key: 'token' },
      { key: 'national_code' },
      { key: 'has_purchased_anything' },
      { key: 'has_admin_permission' },
      { key: 'has_educational_permission' },

      { key: 'mobile_verified_at' },
      { key: 'wallet_balance' },
      { key: 'profile_completion' },
      {
        key: 'permissions',
        default: []
      },

      {
        key: 'gender',
        default: { id: null }
      },
      {
        key: 'major',
        default: { id: null }
      },
      {
        key: 'grade',
        default: { id: null }
      },
      {
        key: 'updateType',
        default: 'profile'
      }

    ])

    if (!this.full_name) {
      this.full_name = (this.first_name ? this.first_name : '') + ' ' + (this.last_name ? this.last_name : '')
    }

    if (!this.shahr_id) {
      this.shahr_id = this.shahr?.id || this.city?.id
    }
  }

  hasPermission (permission) {
    return !!this.permissions.includes(permission)
  }

  getCompletionInfoKeys () {
    return [
      'first_name',
      'last_name',
      'major',
      'shahr_id',
      // 'school',
      // 'mobile_verified_at',
      'grade'
    ]
  }

  checkInformationCompletionKey (key) {
    return (
      (this[key] !== null && typeof this[key] === 'object' && typeof this[key].id !== 'undefined' && this[key].id !== null) ||
      (this[key] && typeof this[key].id === 'undefined')
    )
  }

  percentageOfInformationCompletion () {
    let percentage = 0
    let completionInfoKeys = this.getCompletionInfoKeys()
    let percentageStep = (100 / completionInfoKeys.length)

    completionInfoKeys.forEach(item => {
      if (this.checkInformationCompletionKey(item)) {
        percentage += percentageStep
      }
    })

    if (percentage > 100) {
      percentage = 100
    }

    return percentage
  }

  needToCompleteInfo () {
    const completionInfoKeys = this.getCompletionInfoKeys()
    let status = false
    try {
      completionInfoKeys.forEach(item => {
        if (!this.checkInformationCompletionKey(item)) {
          // eslint-disable-next-line no-throw-literal
          throw 'needToCompleteInfo: ' + item
        }
      })
    } catch (e) {
      status = true
    }

    return status
  }

  getFullNameOrPhoneNumber () {
    if (!this.full_name || this.full_name === ' ') {
      return this.mobile
    } else return this.full_name
  }
}
class UserList extends Collection {
  model () {
    return User
  }
}

export { User, UserList }

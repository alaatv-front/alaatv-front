import * as PersianDate from 'persian-date'

const ajaxCachePrefix = 'ajaxCache-'
const ajaxCacheTTLPrefix = 'ajaxCacheTTL-'

class Assist {
  // constructor() {}

  static isValidData(data) {
    return (typeof data !== 'undefined' && data !== null && data !== '')
  }

  static optional(data, optionalData, refinementData) {
    if (this.isValidData(data)) {
      if (typeof refinementData === 'function') {
        return refinementData(data)
      } else {
        return data
      }
    } else {
      if (typeof optionalData !== 'undefined') {
        return optionalData
      } else {
        return null
      }
    }
  }

  static miladiToShamsi(miladi, justDate) {
    if (!miladi) {
      return null
    }

    if (justDate) {
      return new PersianDate(new Date(miladi)).format('YYYY/MM/DD')
    }
    return new PersianDate(new Date(miladi)).format('HH:mm:ss YYYY/MM/DD')
  }

  static diffDate(date1, date2, diffType) {
    const a = new PersianDate(new Date(date1)),
      b = new PersianDate(new Date(date2))
    return a.diff(b, diffType)
  }

  static relatedModelId(model, relatedModelName) {
    model[relatedModelName + '_id'] = model[relatedModelName].id
  }

  static bufferNewData(item, props) {
    for (let i = 0; typeof props[i] !== 'undefined'; i++) {
      item[props[i] + '_updated'] = item[props[i]]
    }
  }

  static applyNewData(item, props) {
    for (let i = 0; typeof props[i] !== 'undefined'; i++) {
      item[props[i] + '_old'] = item[props[i]]
      item[props[i]] = item[props[i] + '_updated']
    }
  }

  static revertToOldData(item, props) {
    for (let i = 0; typeof props[i] !== 'undefined'; i++) {
      item[props[i]] = item[props[i] + '_old']
      item[props[i] + '_updated'] = null
    }
  }

  static getErrors(errors) {
    const errorsArray = []

    for (const prop in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, prop)) {
        for (let i = 0; typeof errors[prop][i] !== 'undefined'; i++) {
          errorsArray.push(errors[prop][i])
        }
      }
    }

    return errorsArray
  }

  static handleErrorMessage(error) {
    if (error.response) {
      if (error.response.status === 422) {
        const errorsArray = Assist.getErrors(error.response.data.errors)
        for (let i = 0; (typeof errorsArray[i] !== 'undefined'); i++) {
          // toastr.error(errorsArray[i])
        }
      } else if (error.response.status === 413) {
        // toastr.error('حجم فایل زیاد می باشد.')
      } else {
        // toastr.error(error.response.data.message)
      }
    } else {
      // toastr.error(error.message)
    }
  }

  static stringContain(search, string) {
    if (typeof search === 'undefined' || search === null || search.trim().length === 0) {
      return true
    }

    const filterWords = search.split(' ')
    for (let i = 0; typeof filterWords[i] !== 'undefined'; i++) {
      const exp = '^.*(' + filterWords[i] + ')+.*$',
        patt = new RegExp(exp)
      if (!patt.test(string)) {
        return false
      }
    }

    return true
  }

  static setAjaxCache (key, value) {
    const cacheKey = ajaxCachePrefix + key
    const cacheTtlKey = ajaxCacheTTLPrefix + key
    const ajaxCacheTTL = Date.now() + ((window.ajaxCacheTTL ? window.ajaxCacheTTL : 30) * 60 * 1000)
    window.localStorage.setItem(cacheKey, JSON.stringify(value))
    window.localStorage.setItem(cacheTtlKey, ajaxCacheTTL)
    this.purgeOldCaches()
  }

  static getAjaxCache (key) {
    const cacheKey = ajaxCachePrefix + key
    const cacheTtlKey = ajaxCacheTTLPrefix + key
    const ajaxCache = window.localStorage.getItem(cacheKey)
    const ajaxCacheTTL = window.localStorage.getItem(cacheTtlKey)

    if (ajaxCache !== null && ajaxCacheTTL !== null && Date.now() < parseInt(ajaxCacheTTL)) {
      return JSON.parse(ajaxCache)
    } else {
      return false
    }
  }

  static purgeAjaxCache (key) {
    window.localStorage.removeItem(ajaxCachePrefix + key)
    window.localStorage.removeItem(ajaxCacheTTLPrefix + key)
  }

  static purgeAjaxCaches (key) {
    if (typeof key === 'undefined') {
      key = ''
    }

    this.purgeAjaxCache(key)
    // Object.keys(window.localStorage)
    //     .filter( item => (new RegExp('^' + ajaxCachePrefix + key, 'i')).test(item))
    //     .forEach( item => {
    //         this.purgeAjaxCache(item)
    //     })
  }

  static purgeOldCaches () {
    Object.keys(window.localStorage)
      .filter(item => (new RegExp('^' + ajaxCacheTTLPrefix, 'i')).test(item))
    // .map( item => {
    //     return ajaxCachePrefix + item.substring(ajaxCacheTTLPrefix.length)
    // })
      .forEach(item => {
        const ajaxCacheTTL = parseInt(window.localStorage.getItem(item))
        if (Date.now() > ajaxCacheTTL) {
          const cacheKey = item.substring(ajaxCacheTTLPrefix.length)
          this.purgeAjaxCache(cacheKey)
        }
      })
  }
}
export default Assist

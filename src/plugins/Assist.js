// ToDo: use moment-jalaali
// import * as PersianDate from 'persian-date'
const PersianDate = null

class Assist {
  static isValidData (data) {
    return (typeof data !== 'undefined' && data !== null && data !== '')
  }

  static optional (data, optionalData, refinementData) {
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

  static miladiToShamsi (miladi) {
    if (miladi) {
      return new PersianDate(new Date(miladi)).format('HH:mm:ss YYYY/MM/DD')
    } else {
      return null
    }
  }

  static diffDate (date1, date2, diffType) {
    const a = new PersianDate(new Date(date1)),
      b = new PersianDate(new Date(date2))
    return a.diff(b, diffType)
  }

  static stringContain (search, string) {
    // console.log('stringContain :', search, string)
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
}
export default Assist

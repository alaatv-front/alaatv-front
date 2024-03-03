import process from 'process'
import moment from 'moment'
import { getServerDate } from '@nodeguy/server-date'

const Time = (function () {
  async function synchronizeTime () {
    if (!process.browser) {
      return
    }
    window.serverDate = {}
    const { date, offset, uncertainty } = await getServerDate({
      fetchSample: async () => {
        const requestDate = new Date()
        const url = process.env.GET_TIME_SERVER
        const { headers, ok, statusText } = await fetch(url, {
          cache: 'no-store',
          method: 'HEAD'
        })
        console.info('{ headers, ok, statusText }', { headers, ok, statusText })

        if (!ok) {
          throw new Error(`Bad date sample from server: ${statusText}`)
        }

        return {
          requestDate,
          responseDate: new Date(),
          serverDate: new Date(headers.get('Date'))
        }
      }
    })
    window.serverDate = { date, offset, uncertainty }
    console.info(`The server's date is ${date} +/- ${uncertainty} milliseconds. offset:` + offset)
  }

  async function synchronizeTimeWithData (response) {
    if (!process.browser) {
      return
    }
    window.serverDate = {}
    const { date, offset, uncertainty } = await getServerDate({
      fetchSample: async () => {
        if (response.status !== 200) {
          throw new Error(`Bad date sample from server: ${response.statusText}`)
        }
        const requestDate = new Date()
        return {
          requestDate,
          responseDate: new Date(),
          serverDate: new Date(response.headers.date)
        }
      }
    })
    window.serverDate = { date, offset, uncertainty }
    console.info(`The server's date is ${date} +/- ${uncertainty} milliseconds. offset:` + offset)
  }

  function now (justDate) {
    if (typeof window !== 'undefined' && !window.serverDate?.offset) {
      if (!window.serverDate) {
        window.serverDate = {}
      }
      window.serverDate.offset = 0
    }
    const serverDate = new Date(Date.now() + window.serverDate.offset)
    if (justDate) {
      return moment(serverDate).format('YYYY-MM-DD')
    }
    return moment(serverDate).format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  function getPassedTime (startTime, formattedTime) {
    const passedDiff = diff(now(), startTime)
    if (typeof formattedTime === 'undefined' || formattedTime === true) {
      return msToTime(passedDiff)
    }
    return passedDiff
  }

  function getRemainTime (endTime, formattedTime) {
    const remainDiff = diff(endTime, now())
    if (typeof formattedTime === 'undefined' || formattedTime === true) {
      return msToTime(remainDiff)
    }
    return remainDiff
  }

  function msToTime (s) {
    // Pad to 2 or 3 digits, default is 2
    const pad = (n, z = 2) => ('00' + n).slice(-z)
    // + '.' + pad(s%1000, 3)
    return pad(s / 3.6e6 | 0) + ':' + pad((s % 3.6e6) / 6e4 | 0) + ':' + pad((s % 6e4) / 1000 | 0)
  }

  function addTime (amount, type, formattedTime, base) {
    if (formattedTime) {
      return moment(base).add(amount, type).format('YYYY-MM-DD HH:mm:ss')
    }
    return moment().add(amount, type).unix()
  }

  function diff (a, b) {
    const aDiff = moment(a)
    const bDiff = moment(b)
    return aDiff.diff(bDiff) // 86400000
  }

  return {
    now,
    diff,
    msToTime,
    synchronizeTime,
    synchronizeTimeWithData,
    getRemainTime,
    getPassedTime,
    addTime
  }
}())

export default Time

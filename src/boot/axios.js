import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

const apiV2Server = process.env.ALAA_API_V2
const apiV1Server = process.env.ALAA_API_V1
const webServer = process.env.ALAA_WEB
const AjaxResponseMessages = (function () {
  const messageMap = {
    0: 'مشکلی پیش آمده است. مجدد تلاش کنید.',
    400: 'ابتدا وارد سامانه شوید.',
    401: 'ابتدا وارد سامانه شوید.',
    1: 'پیش از این در این آزمون ثبت نام انجام شده است.',
    2: 'زمان آزمون فرا نرسیده است',
    3: 'ثبت نام در این آزمون انجام نشده است.',
    4: 'دانش آموز برای این آزمون ثبت نام نکرده است.',
    5: 'نتیجه آزمونی برای این آزمون وجود ندارد.',
    6: 'پاسخنامه داوطلب پیش از این ارسال شده است.',
    7: 'زمان پاسخگویی قبل از شروع آزمون است.',
    8: 'آزمون متعلق به کاربر نیست.',
    13: 'سوالات آزمون آماده نشده است.',
    14: 'آزمون بسته شده است.',
    17: 'ثبت درس تکراری در یک دفترچه امکان پذیر نیست.'
  }

  function isCustomMessage (statusCode) {
    return !!(messageMap[statusCode.toString()])
  }

  function getMessage (statusCode) {
    return messageMap[statusCode]
  }

  return {
    isCustomMessage,
    getMessage
  }
}())

const AxiosHooks = (function () {
  let $notify = null

  function setNotifyInstance ($q) {
    if (!$q.notify) {
      return
    }
    $notify = $q.notify
  }

  function handleErrors (error, router, store) {
    let messages = []
    if (!error || !error.response) {
      return
    }
    const statusCode = parseInt(error.response.status)
    if (statusCode >= 500 && statusCode <= 599) {
      messages.push('مشکلی رخ داده است. مجدد تلاش کنید.')
    } else if (statusCode === 404) {
      messages.push('موردی یافت نشد.')
    } else if (statusCode === 401) {
      messages.push('ابتدا وارد سامانه شوید.')
      deAuthorizeUser(router, store)
    } else if (error.response.data.error && AjaxResponseMessages.isCustomMessage(error.response.data.error.code)) {
      console.error('error.response.data.error.code', AjaxResponseMessages.getMessage(error.response.data.error.code))
      messages.push(AjaxResponseMessages.getMessage(error.response.data.error.code))
    } else if (error.response.data.error && !AjaxResponseMessages.isCustomMessage(error.response.data.error.code)) {
      for (const [key, value] of Object.entries(error.response.data.error)) {
        if (typeof error.response.data.error[key] === 'string') {
          messages.push(value)
        }
      }
    } else if (error.response.data.errors) {
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        if (typeof error.response.data.errors[key] === 'string') {
          messages.push(value)
        } else {
          messages = messages.concat(getMessagesFromArrayWithRecursion(value))
        }
      }
    }

    toastMessages(messages)
  }

  function deAuthorizeUser (router, store) {
    store.dispatch('Auth/logOut')
    const loginRouteName = 'login'
    const currentRoute = (router?.currentRoute?._value) ? router.currentRoute._value : (router?.history?.current) ? router.history.current : null
    if (currentRoute && currentRoute.name === loginRouteName) {
      return
    }
    store.commit('Auth/updateRedirectTo', currentRoute)
    router.push({ name: loginRouteName })
  }

  function toastMessages (messages) {
    messages.forEach((item) => {
      if ($notify) {
        $notify({
          type: 'negative',
          color: 'negative',
          message: item,
          icon: 'report_problem'
        })
      } else {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 5000,
          position: 'top',
          message: item,
          icon: 'report_problem'
        })
      }
    })
  }

  function getMessagesFromArrayWithRecursion (array) {
    if (array) {
      if (Array.isArray(array)) {
        return array.flat(Math.min())
      }
      return array[0]
    }
  }

  return {
    handleErrors,
    setNotifyInstance
  }
}())

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const apiV2 = axios.create({ baseURL: apiV2Server })
const apiV1 = axios.create({ baseURL: apiV1Server })
const apiWeb = axios.create({ baseURL: webServer })

export default boot(({ app, store, router }) => {
  const accessToken = store.getters['Auth/accessToken']
  if (accessToken) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
    apiV2.defaults.headers.common.Authorization = 'Bearer ' + accessToken
    apiV1.defaults.headers.common.Authorization = 'Bearer ' + accessToken
    apiWeb.defaults.headers.common.Authorization = 'Bearer ' + accessToken
  }
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const instance = axios.create(/* ... */)

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$apiV2 = apiV2
  app.config.globalProperties.$apiV1 = apiV1
  app.config.globalProperties.$apiWeb = apiWeb
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  AxiosHooks.setNotifyInstance(app.config.globalProperties.$q)
  axios.interceptors.response.use(undefined, function (error) {
    AxiosHooks.handleErrors(error, router, store)
    return Promise.reject(error)
  })
  apiV2.interceptors.response.use(undefined, function (error) {
    AxiosHooks.handleErrors(error, router, store)
    return Promise.reject(error)
  })

  app.axios = instance
  store.$axios = instance
  router.$axios = instance

  app.apiV1 = apiV1
  store.$apiV1 = apiV1
  router.$apiV1 = apiV1

  app.apiV2 = apiV2
  store.$apiV2 = apiV2
  router.$apiV2 = apiV2

  app.apiWeb = apiWeb
  store.$apiWeb = apiWeb
  router.$apiWeb = apiWeb
})

export { axios, apiV1, apiV2, apiWeb }

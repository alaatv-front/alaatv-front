import process from 'process'
const alaaServer = process.env.AUTH_API
const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  socket: 'https://office.alaatv.com:501',
  server: {
    auth: alaaServer
  },
  auth: {
    login: alaaServer + '/login'
  },
  user: {
    base: alaaServer + '/user',
    mobile: {
      resend: alaaServer + '/mobile/resend',
      verify: alaaServer + '/mobile/verify'
    },
    formData: alaaServer + '/megaroute/getUserFormData',
    show_user: alaaServer + '/getUserFor3a'
  },
  set: {
    base: alaaServer + '/set'
  },
  content: {
    base: alaaServer + '/c'
  }
}
export default API_ADDRESS

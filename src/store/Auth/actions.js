import { Cookies } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

export function login (context, data) {
  const setVars = (user, accessToken) => {
    context.commit('updateUser', user)
    context.commit('updateAccessToken', accessToken)
    Cookies.set('BearerAccessToken', accessToken)
    const tokenType = 'Bearer'
    this.$accessToken = accessToken
    this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    this.$apiV1.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    this.$apiV2.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    this.$apiWeb.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
  }
  return new Promise((resolve, reject) => {
    APIGateway.auth.login(data)
      .then(({ user, accessToken }) => {
        setVars(user, accessToken)
        APIGateway.user.getUserRoleAndPermission()
          .then((permissions) => {
            user.permissions = permissions
            context.commit('updateUser', user)
            resolve({ accessToken, user })
          })
          .catch(() => {
            setVars(null, '')
            reject()
          })
      })
      .catch(() => {
        reject()
      })
  })
}
export function logOut (context, clearRedirectTo = true) {
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  Cookies.set('BearerAccessToken', '')
  if (clearRedirectTo) {
    context.commit('updateRedirectTo', null)
  }
  this.$router.push({ name: 'login' })
}

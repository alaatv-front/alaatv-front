import { Cookies } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

export function login (context, data) {
  return APIGateway.auth.login(data)
    .then(({ accessToken, user }) => {
      context.commit('updateUser', user)
      context.commit('updateAccessToken', accessToken)
      Cookies.set('BearerAccessToken', accessToken)
      const tokenType = 'Bearer'
      this.$accessToken = accessToken
      this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      this.$apiV1.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      this.$apiV2.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      this.$apiWeb.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    })
}
export function logOut (context, clearRedirectTo = true) {
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  if (clearRedirectTo) {
    context.commit('updateRedirectTo', null)
  }
  this.$router.push({ name: 'login' })
}

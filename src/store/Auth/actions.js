import { Cookies } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

export function login (context, data) {
  return APIGateway.auth.login(data)
    .then(({ accessToken, user }) => {
      context.commit('updateUser', user)
      context.commit('updateAccessToken', accessToken)
      Cookies.set('BearerAccessToken', accessToken)
      console.log('BearerAccessToken', accessToken)
      const tokenType = 'Bearer'
      this.$accessToken = accessToken
      console.log('this.$accessToken', this.$accessToken)
      this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      console.log('this.$axios')
      this.$apiV1.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      console.log('this.$apiV1')
      this.$apiV2.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      console.log('this.$apiV2')
      this.$apiWeb.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      console.log('this.$apiWeb')
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

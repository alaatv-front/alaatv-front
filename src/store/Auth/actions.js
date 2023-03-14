import { APIGateway } from 'src/api/APIGateway.js'

export function login (context, data) {
  return APIGateway.auth.login(data)
    .then(({ accessToken, user }) => {
      context.commit('updateAccessToken', accessToken)
      context.commit('updateUser', user)

      debugger
      const tokenType = 'Bearer'
      this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      this.$apiV1.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      this.$apiV2.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      this.$apiWeb.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    })
}
export function logOut (context) {
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  context.commit('updateRedirectTo', null)
  this.$router.push({ name: 'login' })
}

export function updateUser(state, newInfo) {
  state.user = newInfo
}
export function updateAxiosAuthorization (state, accessToken) {
  const tokenType = 'Bearer'
  const token = accessToken ? (tokenType + ' ' + accessToken) : null

  this.$accessToken = accessToken
  this.$axios.defaults.headers.common.Authorization = token
  this.$apiV1.defaults.headers.common.Authorization = token
  this.$apiV2.defaults.headers.common.Authorization = token
  this.$apiWeb.defaults.headers.common.Authorization = token
}

export function updateAccessToken(state, newInfo) {
  state.accessToken = newInfo
}
export function updateRedirectTo(state, newInfo) {
  state.redirectTo = newInfo
}
export function setAccessToken() {
  // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + newInfo
}
export function updateIncompleteProfile(state, newInfo) {
  state.incompleteProfile = newInfo
}

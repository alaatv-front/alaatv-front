export function updateUser(state, newInfo) {
  console.log('updateUser', newInfo)
  state.user = newInfo
}
export function updateAccessToken(state, newInfo) {
  console.log('updateAccessToken', newInfo)
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

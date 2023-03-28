import { User } from 'src/models/User'

export function user (state) {
  return new User(state.user)
}

export function isUserLogin (state) {
  return !!new User(state.user).id
}

export function isAdmin (state) {
  return new User(state.user).mobile === '09358745928'
}

export function accessToken (state) {
  return state.accessToken
}

export function redirectTo (state) {
  return state.redirectTo
}
export function incompleteProfile (state) {
  return state.incompleteProfile
}

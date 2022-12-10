/* eslint-disable camelcase */
export default function incompleteProfile(
  /* { to, from, next, store } */ { next, store, to }
) {
  // defining incompleteness of the personal information due to issue #52 is inside here
  // possible changes may occur here
  const { first_name, last_name, gender, city, grade, major } =
    store.getters['Auth/user']

  if (
    !(
      !!first_name &&
      !!last_name &&
      !!gender.id &&
      !!city &&
      !!grade.id &&
      !!major.id
    )
  ) {
    if (to.name !== 'profile') {
      // force user to first complete its information
      store.commit('Auth/updateIncompleteProfile', true)
      return next({ name: 'profile' })
    }
  }
  return next()
}

import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default async function incompleteProfile (
  /* { to, from, next, store } */ { next, store, to }
) {
  // defining incompleteness of the personal information due to issue #52 is inside here
  // possible changes may occur here
  // const { first_name, last_name, gender, city, grade, major } =
  //   store.getters['Auth/user']
  // if (
  //   !(
  //     !!user.first_name &&
  //     !!user.last_name &&
  //     !!user.gender.id &&
  //     !!user.city &&
  //     !!user.grade.id &&
  //     !!user.major.id
  //   )
  // ) {
  //   if (to.name !== 'profile') {
  //     // force user to first complete its information
  //     store.commit('Auth/updateIncompleteProfile', true)
  //     return next({ name: 'profile' })
  //   }
  // }

  const userWithPermissions = await APIGateway.user.getCurrent()
  const user = await APIGateway.user.get({ data: { id: userWithPermissions.id } })

  if ((new User(user)).needToCompleteInfo()) {
    store.commit('Auth/updateRedirectTo', { name: to.name, params: to.params, query: to.query })
    return next({ name: 'UserPanel.Profile' })
  }

  return next()
}

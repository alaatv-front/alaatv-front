import { auth } from './middleware/middleware'
// import Login from '../pages/Auth/Login.vue'
function getEntityCrudRouteObject (path, baseRouteName, componentPath, breadcrumbs) {
  const AllNeededRoutes = [
    { mode: 'Index', path: '' },
    { mode: 'Create', path: 'create' },
    { mode: 'Show', path: ':id' },
    { mode: 'Edit', path: ':id/edit' }
  ]
  const children = []
  const removedFirstPart = componentPath.split('/')
  AllNeededRoutes.forEach(item => {
    // Todo : find a way for 'pages/'
    children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import('pages/' + componentPath.replace(removedFirstPart[0] + '/', '')) })
  })
  return {
    path: path,
    component: () => import('pages/Admin/index'),
    breadcrumbs: breadcrumbs,
    children
  }
}
const allEntityCrudRouteObjects = [
  // Todo : refactor this
  getEntityCrudRouteObject('users', 'Admin.UserManagement', 'pages/Admin/User/UserManagement', { title: 'مدیریت کاربران' }),
  getEntityCrudRouteObject('scheduleManagement', 'Admin.UserManagement', 'pages/Admin/ScheduleManagement', { title: 'مدیریت ساعت کاری' }),
  getEntityCrudRouteObject('permission', 'Admin.Permission', 'pages/Admin/User/Permission', { title: 'مدیریت دسترسی ها' }),
  getEntityCrudRouteObject('rolesManagement', 'Admin.Roles', 'pages/Admin/User/Roles', { title: 'مدیریت نقش ها' }),
  getEntityCrudRouteObject('product', 'Admin.Product', 'pages/Admin/Product', { title: 'محصولات' }),
  getEntityCrudRouteObject('content', 'Admin.Content', 'pages/Admin/Content', { title: 'محتوا' }),
  getEntityCrudRouteObject('attributeManagement', 'Admin.AttributeManagement', 'pages/Admin/AttributeManagement', { title: 'مدیریت صفت ها' }),
  getEntityCrudRouteObject('attributeSetManagement', 'Admin.AttributeSetManagement', 'pages/Admin/AttributeSetManagement', { title: 'مدیریت دسته صفت ها' }),
  getEntityCrudRouteObject('orders', 'Admin.Orders', 'pages/Admin/Orders/Order', { title: 'مدیریت سفارشات' }),
  getEntityCrudRouteObject('transactions', 'Admin.Transaction', 'pages/Admin/Orders/Transaction', { title: 'مدیریت تراکنش ها' }),
  getEntityCrudRouteObject('set', 'Admin.Set', 'pages/Admin/Sets', { title: 'دسته محتوا' }),
  getEntityCrudRouteObject('coupon', 'Admin.Coupon', 'pages/Admin/Coupon', { title: 'کوپن ها' })

]
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    breadcrumbs: { title: 'خانه', loading: false, icon: 'home', route: { name: 'dashboard' } },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/BaseComponent.vue'),
        breadcrumbs: { title: 'پیشخوان' },
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: 'component',
        name: 'component',
        component: () => import('src/pages/component'),
        breadcrumbs: { title: 'component' },
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: 'admin',
        component: () => import('layouts/AdminLayout.vue'),
        meta: {
          middlewares: [auth]
        },
        children: [
          { name: 'Admin.Settings', path: 'settings', component: () => import('pages/Admin/Settings'), breadcrumbs: { title: 'تنظیمات' } },
          ...allEntityCrudRouteObjects
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Auth/Login.vue')
  },
  // are u mr Esmaeili ? '' : dont touch this route
  {
    path: '/debug',
    name: 'debug',
    component: () => import('pages/debug'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('pages/User/UserInfoForm'),
    meta: {
      middlewares: [auth]
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component:
  () => import('pages/Error404.vue')
  }
]
console.log('routes', routes)
export default routes

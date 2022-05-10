import { auth } from './middleware/middleware'
// import Login from '../pages/Auth/Login.vue'
function getEntityCrudRouteObject (componentName, defaultFolderPath) {
  const AllNeededRoutes = [
    { mode: 'Index', path: '' },
    { mode: 'Create', path: 'create' },
    { mode: 'Show', path: ':id' },
    { mode: 'Edit', path: ':id/edit' }
  ]
  const finalChildren = []
  AllNeededRoutes.forEach(item => {
    finalChildren.push({ name: 'Admin.' + componentName + '.' + item.mode, path: item.path, component: () => import('pages/Admin/' + ((defaultFolderPath) ? (defaultFolderPath + '/') : '') + componentName) })
  })
  return finalChildren
}
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
          // {
          //   path: 'users',
          //   component: () => import('pages/Admin/index'),
          //   breadcrumbs: { title: 'کاربران' },
          //   children: [
          //     { name: 'Admin.OldUser.Index', path: '', component: () => import('pages/Admin/OldUser/Index') },
          //     { name: 'Admin.OldUser.Create', path: 'create', component: () => import('pages/Admin/OldUser/Create') },
          //     { name: 'Admin.OldUser.Show', path: ':id', component: () => import('pages/Admin/OldUser/Show') },
          //     { name: 'Admin.OldUser.Edit', path: ':id/edit', component: () => import('pages/Admin/OldUser/Edit') }
          //   ]
          // },
          {
            path: 'scheduleManagement',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت ساعت کاری' },
            children: getEntityCrudRouteObject('ScheduleManagement')
          },
          {
            path: 'users',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت کاربران' },
            children: getEntityCrudRouteObject('UserManagement', 'User')
          },
          {
            path: 'accessManagement',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت دسترسی ها' },
            children: getEntityCrudRouteObject('Access', 'User')
          },
          {
            path: 'rolesManagement',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت نقش ها' },
            children: getEntityCrudRouteObject('Roles', 'User')
          },
          {
            path: 'product',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'محصولات' },
            children: [
              { name: 'Admin.Product.Index', path: '', component: () => import('pages/Admin/Product/Index') },
              { name: 'Admin.Product.Create', path: 'create', component: () => import('pages/Admin/Product/Create') },
              { name: 'Admin.Product.Show', path: ':id', component: () => import('pages/Admin/Product/Show') },
              { name: 'Admin.Product.Edit', path: ':id/edit', component: () => import('pages/Admin/Product/Edit') }
            ]
          },
          {
            path: 'content',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'محتوا' },
            children: getEntityCrudRouteObject('Content')
          },
          {
            path: 'attributeManagement',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت صفت ها' },
            children: getEntityCrudRouteObject('AttributeManagement')
          },
          {
            path: 'attributeSetManagement',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت دسته صفت ها' },
            children: getEntityCrudRouteObject('AttributeSetManagement')
          },
          {
            path: 'orders',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت سفارشات' },
            children: getEntityCrudRouteObject('Order', 'Orders')
          },
          {
            path: 'transactions',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'مدیریت تراکنش ها' },
            children: getEntityCrudRouteObject('Transaction', 'Orders')
          },
          {
            path: 'set',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'دسته محتوا' },
            children: [
              { name: 'Admin.Set.Index', path: '', component: () => import('pages/Admin/Sets/Index') },
              { name: 'Admin.Set.Create', path: 'create', component: () => import('pages/Admin/Sets/Create') },
              { name: 'Admin.Set.Show', path: ':id', component: () => import('pages/Admin/Sets/Show') },
              { name: 'Admin.Set.Edit', path: ':id/edit', component: () => import('pages/Admin/Sets/Edit') }
            ]
          },
          {
            path: 'coupon',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'کوپن ها' },
            children: [
              { name: 'Admin.Coupon.Index', path: '', component: () => import('pages/Admin/Coupon/Index') },
              { name: 'Admin.Coupon.Create', path: 'create', component: () => import('pages/Admin/Coupon/Create') },
              { name: 'Admin.Coupon.Show', path: ':id', component: () => import('pages/Admin/Coupon/Show') },
              { name: 'Admin.Coupon.Edit', path: ':id/edit', component: () => import('pages/Admin/Coupon/Edit') }
            ]
          }
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

export default routes

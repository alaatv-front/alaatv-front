import { auth } from './middleware/middleware'
// import Login from '../pages/Auth/Login.vue'
function getEntityCrudRouteObject (componentName) {
  const AllNeededRoutes = [
    { mode: 'Index', path: '' },
    { mode: 'Create', path: 'create' },
    { mode: 'Show', path: ':id' },
    { mode: 'Edit', path: ':id/edit' }
  ]
  const finalChildren = []
  AllNeededRoutes.forEach(item => {
    finalChildren.push({ name: 'Admin.' + componentName + '.' + item.mode, path: item.path, component: () => import('pages/Admin/' + componentName) })
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
        name: 'home',
        component: () => import('pages/Home.vue'),
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
          //     { name: 'Admin.User.Index', path: '', component: () => import('pages/Admin/User/Index') },
          //     { name: 'Admin.User.Create', path: 'create', component: () => import('pages/Admin/User/Create') },
          //     { name: 'Admin.User.Show', path: ':id', component: () => import('pages/Admin/User/Show') },
          //     { name: 'Admin.User.Edit', path: ':id/edit', component: () => import('pages/Admin/User/Edit') }
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
            breadcrumbs: { title: 'کاربران' },
            children: getEntityCrudRouteObject('User')
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
            breadcrumbs: { title: 'سفارشات' },
            children: getEntityCrudRouteObject('Order')
          },
          {
            path: 'transactions',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'تراکنش ها' },
            children: [
              { name: 'Admin.Transaction.Index', path: '', component: () => import('pages/Admin/Transaction/Index') },
              { name: 'Admin.Transaction.Create', path: 'create', component: () => import('pages/Admin/Transaction/Create') },
              { name: 'Admin.Transaction.Show', path: ':id', component: () => import('pages/Admin/Transaction/Show') },
              { name: 'Admin.Transaction.Edit', path: ':id/edit', component: () => import('pages/Admin/Transaction/Edit') }
            ]
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

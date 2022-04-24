import { auth } from './middleware/middleware'

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
          {
            name: 'Admin.KnowledgeTree.tree',
            path: 'knowledge-tree',
            component: () => import('pages/Admin/KnowledgeTree/index'),
            breadcrumbs: { title: 'درخت دانش' }
          },
          { name: 'Admin.Settings', path: 'settings', component: () => import('pages/Admin/Settings'), breadcrumbs: { title: 'تنظیمات' } },
          {
            path: 'users',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'کاربران' },
            children: [
              { name: 'Admin.User.Index', path: '', component: () => import('pages/Admin/User/Index') },
              { name: 'Admin.User.Create', path: 'create', component: () => import('pages/Admin/User/Create') },
              { name: 'Admin.User.Show', path: ':id', component: () => import('pages/Admin/User/Show') },
              { name: 'Admin.User.Edit', path: ':id/edit', component: () => import('pages/Admin/User/Edit') }
            ]
          },
          {
            path: 'products',
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
            path: 'contents',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'محتوا' },
            children: [
              { name: 'Admin.Content.Index', path: '', component: () => import('pages/Admin/Content/Index') },
              { name: 'Admin.Content.Create', path: 'create', component: () => import('pages/Admin/Content/Create') },
              { name: 'Admin.Content.Show', path: ':id', component: () => import('pages/Admin/Content/Show') },
              { name: 'Admin.Content.Edit', path: ':id/edit', component: () => import('pages/Admin/Content/Edit') }
            ]
          },
          {
            path: 'orders',
            component: () => import('pages/Admin/index'),
            breadcrumbs: { title: 'سفارشات' },
            children: [
              { name: 'Admin.Order.Index', path: '', component: () => import('pages/Admin/Order/Index') },
              { name: 'Admin.Order.Create', path: 'create', component: () => import('pages/Admin/Order/Create') },
              { name: 'Admin.Order.Show', path: ':id', component: () => import('pages/Admin/Order/Show') },
              { name: 'Admin.Order.Edit', path: ':id/edit', component: () => import('pages/Admin/Order/Edit') }
            ]
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

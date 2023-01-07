import { auth, isLandingPage } from './middleware/middleware'
import EntityCrudRoutes from './EntityCrudRoutes'

const routes = [
  {
    path: '/',
    layoutConfig: {
      layoutHeaderVisible: true,
      layoutHeaderType: 'main',
      layoutLeftDrawerVisible: false,
      layoutLeftSideBarType: 'main',
      layoutView: 'lHh Lpr fff',
      layoutHeader: true,
      layoutHeaderReveal: false,
      layoutHeaderElevated: false,
      layoutHeaderBordered: false,
      layoutLeftDrawer: true,
      layoutLeftDrawerOverlay: false,
      layoutLeftDrawerElevated: false,
      layoutLeftDrawerBordered: false,
      layoutLeftDrawerWidth: 325,
      layoutLeftDrawerBehavior: 'default',
      layoutPageContainer: true,
      layoutRightDrawer: false,
      layoutFooter: true,
      layoutFooterVisible: true,
      layoutHeaderCustomClass: '',
      layoutBreadcrumbsElements: [],
      layoutBreadcrumbs: {
        separator: 'home'
      },
      layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
      layoutPageContainerCustomClass: 'main-layout-container'
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'innerChild',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: '',
            name: 'home',
            breadcrumbs: {
              title: 'خانه',
              loading: false,
              icon: 'home',
              route: { name: 'dashboard' }
            },
            component: () => import('pages/Home.vue')
          }
        ]
      },

      {
        path: 'panel',
        name: 'UserPanel',
        meta: { middlewares: [auth] },
        component: () => import('layouts/bareLayout.vue'),
        children: [{
          path: 'orders',
          name: 'user.orders',
          component: () => import('pages/User/Orders/userOrders.vue')
        },
        {
          path: 'user-info',
          name: 'user-info',
          component: () => import('pages/User/UserInfoForm.vue')
        },
        {
          name: 'User.Dashboard.purchases',
          path: 'purchases/:id',
          component: () => import('pages/User/Dashboard/MyPurchases.vue')
        },
        {
          name: 'User.Dashboard.favorites',
          path: 'favorites/:id',
          component: () => import('pages/User/Dashboard/MyFavorites.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('pages/Profile/Profile.vue')
        }]
      },
      {
        path: 'admin',
        name: 'Admin',
        // meta: { middlewares: [auth] },
        component: () => import('layouts/AdminLayout.vue'),
        children: [
          {
            path: 'ticket',
            name: 'Admin.Ticket',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Admin.Ticket.Index',
                component: () => import('pages/Admin/Ticket/List.vue')
              },
              {
                path: 'create',
                name: 'Admin.Ticket.Create',
                component: () => import('pages/Admin/Ticket/Create.vue')
              },
              {
                path: ':id',
                name: 'Admin.Ticket.Show',
                component: () => import('pages/Admin/Ticket/Show.vue')
              }
            ]
          },
          {
            name: 'Admin.Settings',
            path: 'settings',
            component: () => import('pages/Admin/Settings.vue'),
            breadcrumbs: { title: 'تنظیمات' }
          },
          {
            name: 'Admin.StudyPlan',
            path: 'studyPlan',
            component: () => import('pages/Admin/StudyPlan/StudyPlan.vue')
          },
          ...EntityCrudRoutes
        ]
      },

      {
        path: 'map',
        name: 'MapPage',
        component: () => import('src/components/Widgets/Map/Map.vue')
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('pages/User/Shop.vue')
      },
      {
        path: 'checkout',
        name: 'User.Checkout',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: 'review',
            name: 'User.Checkout.Review',
            component: () => import('pages/User/CheckoutReview/Show.vue')
          }
        ]
      },
      {
        path: 'c',
        name: 'User.Content',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            name: 'User.Content.Show',
            path: ':id',
            component: () => import('pages/User/Content/Show.vue')
          },
          {
            name: 'User.Content.Search',
            path: '',
            component: () => import('pages/User/Content/Search.vue')
          }
        ]
      },
      {
        path: 'product',
        name: 'User.Product',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            name: 'User.Product.Show',
            path: ':id',
            component: () => import('pages/User/Product/Show.vue')
          }
        ]
      },
      {
        path: 'set',
        name: 'User.Set',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            name: 'User.Set.Show',
            path: ':id',
            component: () => import('pages/User/Set/Show.vue')
          }
        ]
      },
      {
        path: '/landing/:landing_name',
        name: 'Landing',
        component: () => import('pages/Landing.vue'),
        meta: {
          middlewares: [isLandingPage]
        }
      },
      {
        path: 'component',
        name: 'component',
        component: () => import('src/pages/component.vue'),
        breadcrumbs: { title: 'component' },
        meta: {
          middlewares: [auth]
        }
      },

      {
        path: '/debug',
        name: 'debug',
        component: () => import('pages/debug.vue'),
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: '/form-generator',
        name: 'formGenerator',
        component: () => import('pages/formGenerator.vue')
      }
    ]
    // meta: {
    //   middlewares: [auth]
    // }
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
    component: () => import('pages/debug.vue'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('pages/Cart/Cart.vue'),
    meta: {
      middlewares: [auth]
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component:
      () => import('pages/Error404.vue')
  }
]
export default routes

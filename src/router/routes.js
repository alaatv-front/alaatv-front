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
            breadcrumbs: { title: 'خانه', loading: false, icon: 'home', route: { name: 'dashboard' } },
            component: () => import('pages/Home.vue')
          }
        ]
      },
      {
        path: 'ticket',
        name: 'Admin.Ticket.Index',
        component: () => import('pages/Admin/Ticket/List.vue')
      },
      {
        path: 'ticket/:id',
        name: 'Admin.Ticket.Show',
        component: () => import('pages/Admin/Ticket/Show.vue')
      },
      {
        path: 'ticket/Create',
        name: 'Admin.Ticket.Create',
        component: () => import('pages/Admin/Ticket/Create.vue')
      },
      {
        path: 'map',
        name: 'MapPage',
        component: () => import('src/components/Widgets/Map/Map')
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('pages/User/Shop')
      },
      {
        path: 'user/orders',
        name: 'user.orders',
        component: () => import('pages/User/Orders/userOrders')
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
          { name: 'User.Content.Show', path: ':id', component: () => import('pages/User/Content/Show.vue') },
          { name: 'User.Content.Search', path: '', component: () => import('pages/User/Content/Search.vue') }
        ]
      },
      {
        path: 'product',
        name: 'User.Product',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          { name: 'User.Product.Show', path: ':id', component: () => import('pages/User/Product/Show.vue') }
        ]
      },
      {
        path: 'set',
        name: 'User.Set',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          { name: 'User.Set.Show', path: ':id', component: () => import('pages/User/Set/Show.vue') }
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
        component: () => import('src/pages/component'),
        breadcrumbs: { title: 'component' },
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: 'user-info',
        name: 'user-info',
        component: () => import('pages/User/UserInfoForm'),
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
          { name: 'Admin.StudyPlan', path: 'studyPlan', component: () => import('pages/Admin/StudyPlan/StudyPlan') },
          ...EntityCrudRoutes
        ]
      },
      {
        path: 'User',
        name: 'User.Dashboard',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            name: 'User.Dashboard.purchases',
            path: ':id/dashboard/MyPurchases',
            meta: {
              middlewares: [auth]
            },
            component: () => import('pages/User/Dashboard/MyPurchases')
          },
          {
            name: 'User.Dashboard.favorites',
            path: ':id/dashboard/MyFavorites',
            meta: {
              middlewares: [auth]
            },
            component: () => import('pages/User/Dashboard/MyFavorites')
          }
        ]
      },
      {
        path: '/debug',
        name: 'debug',
        component: () => import('pages/debug'),
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: '/form-generator',
        name: 'formGenerator',
        component: () => import('pages/formGenerator')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('pages/Profile/Profile.vue'),
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: '/asset/abrisham',
        name: 'User.Abrisham',
        meta: {
          // middlewares: [auth]
        },
        layoutConfig: {
          layoutHeaderType: 'abrisham',
          layoutLeftSideBarType: 'abrisham',
          layoutLeftDrawerOverlay: false,
          layoutLeftDrawerWidth: 100,
          layoutLeftDrawerVisible: true,
          layoutLeftDrawerBehavior: 'default',
          layoutFooter: false
        },
        component: () => import('layouts/AbrishamLayout.vue'),
        children: [
          {
            path: 'user-abrisham-progress',
            name: 'User.Abrisham.Progress',
            component: () => import('pages/User/DashboardAbrisham/progress.vue'),
            meta: {
              // middlewares: [auth]
            }
          },
          {
            path: 'schedule',
            name: 'User.Abrisham.Schedule',
            component: () => import('pages/User/DashboardAbrisham/Schedule.vue'),
            meta: {
              // middlewares: [auth]
            }
          },
          {
            path: 'consulting',
            name: 'User.Abrisham.userConsulting',
            component: () => import('pages/User/DashboardAbrisham/Consulting.vue')
          },
          {
            path: 'news',
            name: 'User.Abrisham.News',
            component: () => import('pages/User/DashboardAbrisham/News.vue')
          },
          {
            path: 'map',
            name: 'User.Abrisham.Map',
            component: () => import('pages/User/DashboardAbrisham/Map.vue')
          }
        ]
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
    component: () => import('pages/debug'),
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

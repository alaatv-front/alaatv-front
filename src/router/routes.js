import { Authenticated } from './middleware/middleware.js'
import EntityCrudRoutes from './EntityCrudRoutes.js'

const routes = [
  {
    path: '',
    layoutConfig: {
      layoutView: 'lHh Lpr fff',
      layoutHeader: true,
      layoutHeaderType: 'main',
      layoutHeaderVisible: true,
      layoutHeaderReveal: false,
      layoutHeaderElevated: false,
      layoutHeaderBordered: false,
      layoutLeftDrawer: true,
      layoutLeftSideBarType: 'main',
      layoutLeftDrawerVisible: false,
      layoutLeftDrawerOverlay: false,
      layoutLeftDrawerElevated: false,
      layoutLeftDrawerBordered: false,
      layoutLeftDrawerWidth: 325,
      layoutLeftDrawerBehavior: 'default',
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
        path: '/auth',
        name: 'Auth',
        layoutConfig: {
          layoutHeaderVisible: false,
          layoutHeader: false,
          layoutLeftDrawer: false,
          layoutFooter: false,
          layoutFooterVisible: false
        },
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: '/login',
            name: 'login',
            component: () => import('pages/Auth/Login.vue')
          }
        ]
      },
      {
        path: '',
        name: 'Public',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: '',
            name: 'Public.Home',
            component: () => import('src/pages/Public/Home.vue')
          },
          {
            path: 'shop',
            name: 'Public.Shop',
            component: () => import('pages/Public/Shop.vue')
          },
          {
            path: 'product',
            name: 'Public.Product',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Product.Show',
                path: ':id',
                component: () => import('pages/Public/Product/Show.vue')
              }
            ]
          },
          // {
          //   path: 'cart',
          //   name: 'Public.Cart',
          //   component: () => import('pages/Cart/Cart.vue'),
          //   meta: {
          //     middlewares: [auth]
          //   }
          // },
          {
            path: 'c',
            name: 'Public.Content',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Content.Show',
                path: ':id',
                component: () => import('pages/Public/Content/Show.vue')
              },
              {
                name: 'Public.Content.Search',
                path: '',
                component: () => import('pages/Public/Content/Search.vue')
              }
            ]
          },
          {
            path: 'set',
            name: 'Public.Set',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Set.Show',
                path: ':id',
                component: () => import('pages/Public/Set/Show.vue')
              }
            ]
          },
          {
            path: 'map',
            name: 'Public.Map',
            component: () => import('src/components/Widgets/Map/Map.vue')
          },
          {
            path: 'checkout',
            name: 'Public.Checkout',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: 'review',
                name: 'Public.Checkout.Review',
                component: () => import('pages/User/CheckoutReview/Show.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'panel',
        name: 'UserPanel',
        meta: { middlewares: [Authenticated] },
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            name: 'UserPanel.CompleteInfo',
            path: 'complete-info',
            component: () => import('pages/User/UserInfoForm.vue')
          },
          {
            name: 'UserPanel.Profile',
            path: 'profile',
            component: () => import('pages/User/Profile/Profile.vue')
          },
          {
            name: 'UserPanel.MyOrders',
            path: 'my-orders',
            component: () => import('pages/User/Orders/userOrders.vue')
          },
          {
            name: 'UserPanel.MyPurchases',
            path: 'my-purchases',
            component: () => import('pages/User/Dashboard/MyPurchases.vue')
          },
          {
            name: 'UserPanel.MyFavorites',
            path: 'my-favorites',
            component: () => import('pages/User/Dashboard/MyFavorites.vue')
          },
          {
            name: 'UserPanel.Ticket',
            path: 'ticket',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Ticket.Index',
                component: () => import('pages/User/Ticket/List.vue')
              },
              {
                path: 'create',
                name: 'UserPanel.Ticket.Create',
                component: () => import('pages/User/Ticket/Create.vue')
              },
              {
                path: ':id',
                name: 'UserPanel.Ticket.Show',
                component: () => import('pages/User/Ticket/Show.vue')
              }
            ]
          },
          {
            name: 'UserPanel.Asset',
            path: 'asset',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'UserPanel.Asset.Abrisham',
                path: 'abrisham',
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
                    name: 'UserPanel.Asset.Abrisham.Progress',
                    path: 'progress',
                    component: () => import('pages/User/DashboardAbrisham/progress.vue')
                  },
                  {
                    name: 'UserPanel.Asset.Abrisham.Schedule',
                    path: 'schedule',
                    component: () => import('pages/User/DashboardAbrisham/Schedule.vue')
                  },
                  {
                    name: 'UserPanel.Asset.Abrisham.Consulting',
                    path: 'consulting',
                    component: () => import('pages/User/DashboardAbrisham/Consulting.vue')
                  },
                  {
                    name: 'UserPanel.Asset.Abrisham.News',
                    path: 'news',
                    component: () => import('pages/User/DashboardAbrisham/News.vue')
                  },
                  {
                    name: 'UserPanel.Asset.Abrisham.Map',
                    path: 'map',
                    component: () => import('pages/User/DashboardAbrisham/Map.vue')
                  }
                ]
              },
              {
                name: 'UserPanel.Asset.GiftCard',
                path: 'gift-card',
                layoutConfig: {
                  layoutView: 'lHh LpR fFf',
                  layoutHeaderType: 'gift-card',
                  layoutLeftDrawer: true,
                  layoutLeftDrawerWidth: 126,
                  layoutLeftDrawerVisible: true,
                  layoutLeftSideBarType: 'gift-card',
                  layoutFooter: false
                },
                component: () => import('layouts/GiftCardLayout.vue'),
                children: [
                  {
                    name: 'UserPanel.Asset.GiftCard.Dashboard',
                    path: 'dashboard',
                    component: () => import('pages/User/GiftCardPanel/Dashboard.vue')
                  },
                  {
                    name: 'UserPanel.Asset.GiftCard.MyGiftCards',
                    path: 'my-gift-cards',
                    component: () => import('pages/User/GiftCardPanel/MyGiftCards.vue')
                  },
                  {
                    name: 'UserPanel.Asset.GiftCard.Transactions',
                    path: 'transactions',
                    component: () => import('pages/User/GiftCardPanel/Transactions.vue')
                  },
                  {
                    name: 'UserPanel.Asset.GiftCard.UserInfo',
                    path: 'user-info',
                    component: () => import('pages/User/GiftCardPanel/UserInfo.vue')
                  }
                ]
              }
            ]
          }]
      },
      {
        path: 'admin',
        name: 'Admin',
        layoutConfig: {
          layoutView: 'lHh LpR fFf',
          layoutHeaderType: 'admin',
          layoutLeftDrawer: true,
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'admin',
          layoutFooter: false
        },
        meta: { middlewares: [Authenticated] },
        component: () => import('layouts/AdminLayout.vue'),
        children: [
          {
            name: 'Admin.Dashboard',
            path: 'dashboard',
            component: () => import('src/pages/Admin/Dashboard.vue')
          },
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
            path: 'study-plan',
            component: () => import('pages/Admin/StudyPlan/StudyPlan.vue')
          },
          {
            name: 'Admin.UploadCenter',
            path: 'upload-center',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Admin.UploadCenter.Contents',
                path: 'contents',
                component: () => import('pages/Admin/UploadCenter/UploadCenter.vue')
              },
              {
                name: 'Admin.UploadCenter.Sets',
                path: 'sets',
                component: () => import('pages/Admin/UploadCenter/UploadCenter.vue')
              }
            ]
          },
          ...EntityCrudRoutes
        ]
      },
      {
        path: 'document',
        name: 'Document',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: 'component',
            name: 'component',
            component: () => import('pages/Document/component.vue'),
            breadcrumbs: { title: 'component' },
            meta: {
              middlewares: [Authenticated]
            }
          },
          {
            path: 'debug',
            name: 'Document.Debug',
            component: () => import('src/pages/Document/debug.vue')
          },
          {
            path: 'icon-sax',
            name: 'Document.IconSax',
            component: () => import('src/pages/Document/IconSax.vue')
          },
          {
            path: '/form-generator',
            name: 'formGenerator',
            component: () => import('pages/Document/formGenerator.vue')
          }
        ]
      }
    ]
  },
  // are u mr Esmaeili ? '' : dont touch this route

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

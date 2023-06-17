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
      showHamburgerBtn: true,
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
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/Home.vue')
          },
          {
            path: 'shop',
            name: 'Public.Shop',
            meta: {
              hasDynamicSetting: true
            },
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
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/Public/Product/Show.vue')
              }
            ]
          },
          {
            path: 'ch',
            name: 'Public.Channel',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Channel.Show',
                path: ':id',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/Public/Channel/Show.vue')
              }
            ]
          },
          {
            path: 'c',
            name: 'Public.Content',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Content.Show',
                path: ':id',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/Public/Content/Show.vue')
              },
              {
                name: 'Public.Content.Search',
                path: '',
                meta: {
                  hasDynamicSetting: true
                },
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
                meta: {
                  hasDynamicSetting: true
                },
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
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/Cart/Cart.vue')
              }
            ]
          },
          {
            path: 'landing',
            name: 'Public.Landing',
            layoutConfig: {
              layoutHeader: false,
              layoutFooter: false
            },
            children: [
              {
                path: ':landing_name',
                meta: {
                  hasDynamicSettingWithParams: true
                },
                name: 'Public.Landing.DynamicName',
                component: () => import('src/pages/Public/Landings/Landing.vue')
              }
              // {
              //   path: '36',
              //   name: 'Public.Landing.FireDay',
              //   meta: {
              //     hasDynamicSetting: true
              //   },
              //   component: () => import('src/pages/Public/Landings/FireDay.vue')
              // },
              // {
              //   path: '15',
              //   name: 'Public.Landing.Arash',
              //   meta: {
              //     hasDynamicSetting: true
              //   },
              //   component: () => import('src/pages/Public/Landings/Arash.vue')
              // },
              // {
              //   path: '9',
              //   name: 'Public.Landing.Taftan',
              //   meta: {
              //     hasDynamicSetting: true
              //   },
              //   component: () => import('src/pages/Public/Landings/Taftan.vue')
              // }
            ]
          },
          {
            path: 'h',
            name: 'Public.RegisterHekmatCoupon',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/RegisterHekmatCoupon.vue')
          }
        ]
      },
      {
        path: 'panel',
        name: 'UserPanel',
        layoutConfig: {
          showHamburgerBtn: false,
          layoutLeftSideBarType: 'user-panel'
        },
        meta: { middlewares: [Authenticated] },
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            // ToDo: check this to remove
            name: 'UserPanel.CompleteInfo',
            path: 'complete-info',
            component: () => import('pages/User/UserInfoForm.vue')
          },
          {
            name: 'UserPanel.Profile',
            path: 'profile',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('pages/User/Profile/Profile.vue')
          },
          {
            name: 'UserPanel.MyOrders',
            path: 'my-orders',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('pages/User/Orders/userOrders.vue')
          },
          {
            name: 'UserPanel.MyPurchases',
            path: 'my-purchases',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('pages/User/Dashboard/MyPurchases.vue')
          },
          {
            name: 'UserPanel.MyFavorites',
            path: 'my-favorites',
            meta: {
              hasDynamicSetting: true
            },
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
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/User/Ticket/List.vue')
              },
              {
                path: 'create',
                name: 'UserPanel.Ticket.Create',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/User/Ticket/Create.vue')
              },
              {
                path: ':id',
                name: 'UserPanel.Ticket.Show',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/User/Ticket/Show.vue')
              }
            ]
          },
          {
            name: 'UserPanel.Asset',
            path: '',
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
                name: 'UserPanel.Asset.AbrishamPro',
                path: 'abrisham-pro',
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
                    name: 'UserPanel.Asset.AbrishamPro.Progress',
                    path: 'progress',
                    component: () => import('src/pages/User/DashboardAbrishamPro/progress.vue')
                  },
                  {
                    name: 'UserPanel.Asset.AbrishamPro.Schedule',
                    path: 'schedule',
                    component: () => import('src/pages/User/DashboardAbrishamPro/Schedule.vue')
                  },
                  {
                    name: 'UserPanel.Asset.AbrishamPro.Consulting',
                    path: 'consulting',
                    component: () => import('src/pages/User/DashboardAbrishamPro/Consulting.vue')
                  },
                  {
                    name: 'UserPanel.Asset.AbrishamPro.News',
                    path: 'news',
                    component: () => import('src/pages/User/DashboardAbrishamPro/News.vue')
                  },
                  {
                    name: 'UserPanel.Asset.AbrishamPro.Map',
                    path: 'map',
                    component: () => import('src/pages/User/DashboardAbrishamPro/Map.vue')
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
                  // {
                  //   name: 'UserPanel.Asset.GiftCard.Dashboard',
                  //   path: 'dashboard',
                  //   component: () => import('pages/User/GiftCardPanel/Dashboard.vue')
                  // },
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
              },
              {
                name: 'UserPanel.Asset.TripleTitleSet',
                path: ':eventName',
                layoutConfig: {
                  layoutHeaderType: 'triple-title-set',
                  layoutLeftSideBarType: 'triple-title-set',
                  layoutLeftDrawerOverlay: false,
                  layoutLeftDrawerWidth: 100,
                  layoutLeftDrawerVisible: true,
                  layoutLeftDrawerBehavior: 'default',
                  layoutFooter: false
                },
                component: () => import('src/layouts/bareLayout.vue'),
                children: [
                  {
                    name: 'UserPanel.Asset.TripleTitleSet.Products',
                    path: '',
                    component: () => import('src/pages/User/Dashboard/TripleTitleSet/Products.vue')
                  },
                  {
                    name: 'UserPanel.Asset.TripleTitleSet.ProductLayout',
                    path: 'product',
                    component: () => import('src/layouts/TripleTitleSetLayout.vue'),
                    children: [
                      {
                        name: 'UserPanel.Asset.TripleTitleSet.ProductPage',
                        path: ':productId',
                        component: () => import('src/pages/User/Dashboard/TripleTitleSet/ProductPage.vue')
                      },
                      {
                        name: 'UserPanel.Asset.TripleTitleSet.Content',
                        path: ':productId/set/:setId/content/:contentId',
                        component: () => import('src/pages/User/Dashboard/TripleTitleSet/Content.vue')
                      },
                      {
                        name: 'UserPanel.Asset.TripleTitleSet.ProductDocuments',
                        path: ':productId/documents',
                        component: () => import('src/pages/User/Dashboard/TripleTitleSet/ProductDocuments.vue')
                      },
                      {
                        name: 'UserPanel.Asset.TripleTitleSet.ProductComments',
                        path: ':productId/comments',
                        component: () => import('src/pages/User/Dashboard/TripleTitleSet/ProductComments.vue')
                      },
                      {
                        name: 'UserPanel.Asset.TripleTitleSet.ProductSingleComment',
                        path: ':productId/comments/:commentId',
                        component: () => import('src/pages/User/Dashboard/TripleTitleSet/ProductCommentSingle.vue')
                      },
                      {
                        name: 'UserPanel.Asset.TripleTitleSet.ProductBookmarks',
                        props: true,
                        path: ':productId/bookmarks',
                        component: () => import('src/pages/User/Dashboard/TripleTitleSet/ProductBookmarks.vue')
                      }
                    ]
                  },
                  {
                    name: 'UserPanel.Asset.TripleTitleSet.Adviser.Content',
                    path: ':setId/adviser/content/:contentId',
                    props: true,
                    component: () => import('src/pages/User/Dashboard/TripleTitleSet/Content.vue')
                  }
                ]
              }
            ]
          },
          {
            path: 'order/:orderId/thankYou',
            name: 'UserPanel.ThankYouPage',
            component: () => import('src/pages/ThankYouPage/ThankYouPage.vue'),
            layoutConfig: {
              layoutHeader: true,
              layoutHeaderType: 'main',
              layoutHeaderVisible: true,
              layoutLeftDrawerVisible: false
            }
          }
        ]
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
          {
            name: 'Admin.Forrest',
            path: 'forrest',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Admin.Forrest.Index',
                path: '',
                component: () => import('src/pages/Admin/Forrest/Index.vue')
              },
              {
                name: 'Admin.Forrest.Create',
                path: 'create',
                component: () => import('src/pages/Admin/Forrest/Create.vue')
              },
              {
                name: 'Admin.Forrest.Show',
                path: ':id',
                component: () => import('src/pages/Admin/Forrest/Show.vue')
              },
              {
                name: 'Admin.Forrest.Edit',
                path: ':id/edit',
                component: () => import('src/pages/Admin/Forrest/Edit.vue')
              }
            ]
          },
          {
            name: 'Admin.Set',
            path: 'set',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Admin.Set.Index',
                path: '',
                component: () => import('src/pages/Admin/Set/Index.vue')
              },
              {
                name: 'Admin.Set.Create',
                path: 'create',
                component: () => import('src/pages/Admin/Set/Create.vue')
              },
              {
                name: 'Admin.Set.Show',
                path: ':id',
                component: () => import('src/pages/Admin/Set/Show.vue')
              },
              {
                name: 'Admin.Set.Edit',
                path: ':id/edit',
                component: () => import('src/pages/Admin/Set/Edit.vue')
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
            path: 'theme',
            name: 'Document.Theme',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'Theme' },
            children: [
              {
                path: 'controls',
                name: 'Document.Theme.Controls',
                component: () => import('src/pages/Document/Theme/Controls.vue'),
                breadcrumbs: { title: 'Controls' }
              }
            ]
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
    path: '/404/:catchAll(.*)*',
    name: 'NotFound',
    component:
      () => import('pages/Error404.vue')
  }
]
export default routes

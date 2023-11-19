function getEntityCrudRouteObject (path, baseRouteName, componentPath, breadcrumbs) {
  const AllNeededRoutes = [
    { mode: 'Index', path: '' },
    { mode: 'Create', path: 'create' },
    { mode: 'Show', path: ':id(\\d+)' },
    { mode: 'Edit', path: ':id(\\d+)/edit' }
  ]
  const children = []
  const removedFirstPart = componentPath.split('/')
  // console.log('removedFirstPart', removedFirstPart[0])
  AllNeededRoutes.forEach(item => {
    // Todo : find a way for 'pages/'
    children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import('../pages/' + componentPath.replace(removedFirstPart[0] + '/', '') + '.vue') })
    // Even this is not working
    // children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import(removedFirstPart[0] + '/' + componentPath.replace(removedFirstPart[0] + '/', '')) })
  })
  return {
    path,
    component: () => import('../pages/Admin/index.vue'),
    breadcrumbs,
    children
  }
}
const entityCrudRouteConfigs = [
  {
    path: 'users',
    baseRouteName: 'Admin.UserManagement',
    componentPath: 'pages/Admin/User/UserManagement',
    breadcrumbs: { title: 'مدیریت کاربران' }
  },
  {
    path: 'scheduleManagement',
    baseRouteName: 'Admin.ScheduleManagement',
    componentPath: 'pages/Admin/ScheduleManagement',
    breadcrumbs: { title: 'مدیریت ساعت کاری' }
  },
  {
    path: 'permission',
    baseRouteName: 'Admin.Permission',
    componentPath: 'pages/Admin/User/Permission',
    breadcrumbs: { title: 'مدیریت دسترسی ها' }
  },
  {
    path: 'rolesManagement',
    baseRouteName: 'Admin.Roles',
    componentPath: 'pages/Admin/User/Roles',
    breadcrumbs: { title: 'مدیریت نقش ها' }
  },
  // {
  //   path: 'product',
  //   baseRouteName: 'Admin.Product',
  //   componentPath: 'pages/Admin/User/Product',
  //   breadcrumbs: { title: 'محصولات' }
  // },
  {
    path: 'content',
    baseRouteName: 'Admin.Content',
    componentPath: 'pages/Admin/Content/Content',
    breadcrumbs: { title: 'محتوا' }
  },
  {
    path: 'sourceManagement',
    baseRouteName: 'Admin.SourceManagement',
    componentPath: 'pages/Admin/Content/SourceManagement',
    breadcrumbs: { title: 'مدیریت منابع' }
  },
  {
    path: 'section',
    baseRouteName: 'Admin.Section',
    componentPath: 'pages/Admin/Content/Section',
    breadcrumbs: { title: 'سکشن محتوا' }
  },
  {
    path: 'attributeManagement',
    baseRouteName: 'Admin.AttributeManagement',
    componentPath: 'pages/Admin/AttributeManagement',
    breadcrumbs: { title: 'مدیریت صفت ها' }
  },
  {
    path: 'attributeSetManagement',
    baseRouteName: 'Admin.AttributeSetManagement',
    componentPath: 'pages/Admin/AttributeSetManagement',
    breadcrumbs: { title: 'مدیریت دسته صفت ها' }
  },
  {
    path: 'attributeValue',
    baseRouteName: 'Admin.AttributeValue',
    componentPath: 'pages/Admin/AttributeValue',
    breadcrumbs: null
  },
  {
    path: 'order',
    baseRouteName: 'Admin.Orders',
    componentPath: 'pages/Admin/Orders/Order',
    breadcrumbs: { title: 'مدیریت سفارشات' }
  },
  {
    path: 'transactions',
    baseRouteName: 'Admin.Transaction',
    componentPath: 'pages/Admin/Orders/Transaction',
    breadcrumbs: { title: 'مدیریت تراکنش ها' }
  },
  {
    path: 'userBon',
    baseRouteName: 'Admin.UserBon',
    componentPath: 'pages/Admin/Orders/UserBon',
    breadcrumbs: { title: 'مدیریت بن کاربران' }
  },
  {
    path: 'smsAdmin',
    baseRouteName: 'Admin.SMSAdmin',
    componentPath: 'pages/Admin/SMS/SMSAdmin',
    breadcrumbs: { title: 'مدیریت پیامک ها' }
  },
  {
    path: 'blockManagement',
    baseRouteName: 'Admin.BlockManagement',
    componentPath: 'pages/Admin/BlockManagement',
    breadcrumbs: { title: 'مدیریت بلاک ها' }
  },
  {
    path: 'registrationManagement',
    baseRouteName: 'Admin.RegistrationManagement',
    componentPath: 'pages/Admin/RegistrationManagement',
    breadcrumbs: { title: 'پنل مدیریت لیست' }
  },
  {
    path: 'ticketDepartment',
    baseRouteName: 'Admin.TicketDepartment',
    componentPath: 'pages/Admin/TicketDepartment',
    breadcrumbs: { title: 'مدیریت گروه تیکت' }
  },
  {
    path: 'slideShowManagement',
    baseRouteName: 'Admin.SlideShowManagement',
    componentPath: 'pages/Admin/SlideShowManagement',
    breadcrumbs: { title: 'مدیریت اسلاید شو صفحه اصلی' }
  },
  {
    path: 'tags',
    baseRouteName: 'Admin.Tags',
    componentPath: 'pages/Admin/Tags',
    breadcrumbs: { title: 'مدیریت تگ ها' }
  },
  {
    path: 'activityLog',
    baseRouteName: 'Admin.ActivityLog',
    componentPath: 'pages/Admin/ActivityLog',
    breadcrumbs: { title: 'لاگ فعالیت ها' }
  },
  {
    path: 'gateway',
    baseRouteName: 'Admin.Gateway',
    componentPath: 'pages/Admin/Gateway',
    breadcrumbs: { title: 'درگاه پرداخت' }
  },
  {
    path: 'coupons',
    baseRouteName: 'Admin.Coupons',
    componentPath: 'pages/Admin/Coupons',
    breadcrumbs: { title: 'مدیریت کپن ها' }
  },
  {
    path: 'liveDescription',
    baseRouteName: 'Admin.LiveDescription',
    componentPath: 'pages/Admin/LiveDescription',
    breadcrumbs: { title: 'توضیحات لحظه ای' }
  },
  {
    path: 'Vouchers',
    baseRouteName: 'Admin.Vouchers',
    componentPath: 'pages/Admin/Vouchers',
    breadcrumbs: { title: 'مدیریت ووچر ها' }
  },
  {
    path: 'teleMarketing',
    baseRouteName: 'Admin.TeleMarketing',
    componentPath: 'pages/Admin/TeleMarketing',
    breadcrumbs: { title: 'تله مارکتینگ' }
  },
  {
    path: 'fixUnknownUsersCity',
    baseRouteName: 'Admin.FixUnknownUsersCity',
    componentPath: 'pages/Admin/FixUnknownUsersCity',
    breadcrumbs: { title: 'اصلاح شهر و استان کاربران' }
  },
  {
    path: 'coupon',
    baseRouteName: 'Admin.Coupon',
    componentPath: 'pages/Admin/Coupon',
    breadcrumbs: { title: 'کوپن ها' }
  }
]
const EntityCrudRoutes = [
  ...entityCrudRouteConfigs.map(item => getEntityCrudRouteObject(item.path, item.baseRouteName, item.componentPath, item.breadcrumbs))
]

export default EntityCrudRoutes

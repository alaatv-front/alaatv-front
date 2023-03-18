// process.client or process.browser
const apiV2Server = process.env.ALAA_API_V2
// const apiV1Server = process.env.ALAA_API_V1
// const webServer = process.env.ALAA_WEB

const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  socket: 'https://office.alaatv.com:501',
  server: {
    auth: apiV2Server
  },
  auth: {
    login: '/login'
  },
  studyPlan: {
    edit: '/plan'
  },
  user: {
    base: '/user',
    mobile: {
      resend: '/mobile/resend',
      verify: '/mobile/verify'
    },
    orders: {
      ordersById: (id) => '/user/' + id + '/orders',
      getOrders: '/orders',
      status: '/payment/status'
    },
    formData: '/megaroute/getUserFormData',
    show_user: '/getUserFor3a',
    eventresult: {
      base: '/event-result',
      create: '/event-result/create'
    }
  },
  content: {
    show: (id) => '/c/' + id,
    search: '/search'
  },
  coupon: {
    create: {
      base: '/v2/admin/coupon'
    },
    edit: {
      base: ''
    },
    index: {
      base: '/admin/coupon'
    },
    show: {
      base: '/v2/admin/coupon/10'
    }
  },
  order: {
    create: {
      base: '/reqres/api/users'
    },
    edit: {
      base: '/admin/order'
    },
    index: {
      base: '/admin/order'
    },
    show: {
      base: '/admin/order'
    }
  },
  product: {
    create: {
      base: '/reqres/api/users'
    },
    edit: {
      base: '/admin/product'
    },
    index: {
      base: '/admin/product'
    },
    show: {
      base: '/product'
    }
  },

  ticket: {
    create: {
      base: '/ticket'
    },
    index: {
      base: '/ticket'
    },
    user: {
      getInfo: '/user/getInfo'
    },
    show: {
      base: '/ticket',
      statusNotice: (ticketId) =>
        '/ticket/' + ticketId + '/sendTicketStatusNotice',
      batchExtend: '/orderproduct/batchExtend',
      ticketMessage: '/ticketMessage',
      reportMessage: (ticketId) =>
        '/ticketMessage/' + ticketId + '/report',
      editAssign: (ticketId) =>
        '/ticket/' + ticketId + '/assign'
    },
    ticketRate: (ticketId) => '/ticket/' + ticketId + '/rate'
  },
  attributeManagement: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  attributeValue: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  liveDescription: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  Vouchers: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  set: {
    admin: {
      base: '/set/'
    },
    show: (id) => '/set/' + id
  },
  sourceManagement: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  teleMarketing: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  fixUnknownUsersCity: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  section: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  attributeSetManagement: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  transaction: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  userBon: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  smsAdmin: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  coupons: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  gateway: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  activityLog: {
    index: {
      base: '/admin/user'
    }
  },
  tags: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  blockManagement: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  ticketDepartment: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  slideShowManagement: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  users: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  permission: {
    create: {
      base: '/admin/user'
    },
    edit: {
      base: '/admin/user/'
    },
    index: {
      base: '/admin/user'
    },
    show: {
      base: '/admin/user/'
    }
  },
  map: {
    items: '/mapDetail'
  },
  cart: {
    orderproduct: {
      add: '/orderproduct',
      delete (productId) { return '/orderproduct/' + productId }
    },
    discount: {
      submit: '/order/submitCoupon',
      remove: '/order/RemoveCoupon'
    },
    review: '/checkout/review',
    getPaymentRedirectEncryptedLink: '/getPaymentRedirectEncryptedLink?seller=1',
    orderWithTransaction (orderId) { return '/orderWithTransaction/' + orderId }
  }
}
export default API_ADDRESS

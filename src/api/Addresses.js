import process from 'process'
// process.client or process.browser
const apiV2Server = process.env.ALAA_API_V2
const apiV1Server = process.env.ALAA_API_V1
const webServer = process.env.ALAA_WEB

const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  socket: 'https://office.alaatv.com:501',
  pages: {
    home: apiV2Server + '/home',
    shop: apiV2Server + '/shop'
  },
  server: {
    auth: apiV2Server
  },
  auth: {
    login: apiV2Server + '/login'
  },
  studyPlan: {
    edit: apiV2Server + '/plan'
  },
  user: {
    base: apiV2Server + '/user',
    mobile: {
      resend: apiV2Server + '/mobile/resend',
      verify: apiV2Server + '/mobile/verify'
    },
    orders: (id) => apiV2Server + '/user/' + id + '/orders',
    formData: apiV2Server + '/megaroute/getUserFormData',
    show_user: apiV2Server + '/getUserFor3a'
  },
  content: {
    admin: {
      base: apiV2Server + '/c/'
    },
    show: (id) => apiV2Server + '/c/' + id,
    search: apiV2Server + '/search'
  },
  coupon: {
    create: {
      base: '/v2/admin/coupon'
    },
    edit: {
      base: ''
    },
    index: {
      base: apiV2Server + '/admin/coupon'
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
      base: apiV2Server + '/admin/order'
    },
    index: {
      base: apiV2Server + '/admin/order'
    },
    show: {
      base: apiV2Server + '/admin/order'
    }
  },
  product: {
    create: {
      base: '/reqres/api/users'
    },
    edit: {
      base: apiV2Server + '/admin/product'
    },
    index: {
      base: apiV2Server + '/admin/product'
    },
    show: {
      base: apiV2Server + '/product'
    }
  },

  ticket: {
    create: {
      base: apiV2Server + '/ticket'
    },
    edit: {
      base: apiV2Server + '/ticket'
    },
    index: {
      base: apiV2Server + '/ticket'
    },
    show: {
      base: apiV2Server + '/ticket'
    }
  },
  attributeManagement: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  attributeValue: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  liveDescription: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  Vouchers: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  set: {
    admin: {
      base: apiV2Server + '/set/'
    },
    show: (id) => apiV2Server + '/set/' + id
  },
  sourceManagement: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  teleMarketing: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  fixUnknownUsersCity: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  section: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  attributeSetManagement: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  transaction: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  userBon: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  smsAdmin: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  coupons: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  gateway: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  activityLog: {
    index: {
      base: apiV2Server + '/admin/user'
    }
  },
  tags: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  blockManagement: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  ticketDepartment: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  slideShowManagement: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  users: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  permission: {
    create: {
      base: apiV2Server + '/admin/user'
    },
    edit: {
      base: apiV2Server + '/admin/user/'
    },
    index: {
      base: apiV2Server + '/admin/user'
    },
    show: {
      base: apiV2Server + '/admin/user/'
    }
  },
  map: {
    items: apiV2Server + '/mapDetail'
  },
  cart: {
    orderproduct: apiV2Server + '/orderproduct',
    review: apiV2Server + '/checkout/review'
  }
}
export default API_ADDRESS

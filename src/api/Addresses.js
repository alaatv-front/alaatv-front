import process from 'process'
const alaaServer = process.env.ALAA_API
const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  socket: 'https://office.alaatv.com:501',
  server: {
    auth: alaaServer
  },
  auth: {
    login: alaaServer + '/login'
  },
  user: {
    base: alaaServer + '/user',
    mobile: {
      resend: alaaServer + '/mobile/resend',
      verify: alaaServer + '/mobile/verify'
    },
    formData: alaaServer + '/megaroute/getUserFormData',
    show_user: alaaServer + '/getUserFor3a'
  },
  content: {
    create: {
      base: '/reqres/api/c'
    },
    edit: {
      base: '/alaa/api/v2/c'
    },
    index: {
      base: '/alaa/api/v2/admin/c'
    },
    show: {
      base: '/alaa/api/v2/c'
    }
  },
  coupon: {
    create: {
      base: '/v2/admin/coupon'
    },
    edit: {
      base: ''
    },
    index: {
      base: '/alaa/api/v2/admin/coupon'
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
      base: '/alaa/api/v2/admin/order'
    },
    index: {
      base: '/alaa/api/v2/admin/order'
    },
    show: {
      base: '/alaa/api/v2/admin/order'
    }
  },
  product: {
    create: {
      base: '/reqres/api/users'
    },
    edit: {
      base: '/alaa/api/v2/admin/product'
    },
    index: {
      base: '/alaa/api/v2/admin/product'
    },
    show: {
      base: '/alaa/api/v2/product'
    }
  },
  set: {
    create: {
      base: '/reqres/api/users'
    },
    edit: {
      base: '/alaa/api/v2/admin/product'
    },
    index: {
      base: '/alaa/api/v2/admin/set'
    },
    show: {
      base: '/alaa/api/v2/admin/set'
    }
  },
  transaction: {
    create: {
      base: '/reqres/api/users'
    },
    edit: {
      base: '/alaa/api/v2/admin/product'
    },
    index: {
      base: '/alaa/api/v2/admin/transaction'
    },
    show: {
      base: '/alaa/api/v2/admin/product'
    }
  },
  users: {
    create: {
      base: '/alaa/api/v2/admin/user'
    },
    edit: {
      base: '/alaa/api/v2/admin/user/'
    },
    index: {
      base: '/alaa/api/v2/admin/user'
    },
    show: {
      base: '/alaa/api/v2/admin/user/'
    }
  }
}
export default API_ADDRESS

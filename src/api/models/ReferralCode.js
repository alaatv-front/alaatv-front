import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ReferralCodeList } from 'src/models/ReferralCode'
import { TransactionList } from 'src/models/Transction'
import { WithdrawHistoryList } from 'src/models/WithdrawHistory'

export default class ReferralCodeAPI extends APIRepository {
  constructor() {
    super('gift-card', apiV2)
    this.APIAdresses = {
      base: '/referral-code',
      show: (id) => `/referral-code/${id}`,
      orderProducts: '/referral-code/orderproducts',
      noneProfitableOrderproducts: '/referral-code/noneProfitableOrderproducts',
      batchStore: '/referral-code/batch-store',
      orderReferralCode: '/order-referral-code',
      sales_man: '/sales-man',
      contract: '/sales-man/contract',
      walletWithdraw: '/wallet/withdraw',
      walletWithdrawRequests: '/wallet/withdraw-requests',
      assign: (referralCode) => '/referral-code/' + referralCode + '/assign'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      show: (id) => this.name + this.APIAdresses.show(id),
      sales_man: this.name + this.APIAdresses.sales_man,
      walletWithdrawRequests: this.name + this.APIAdresses.walletWithdrawRequests,
      orderProducts: this.name + this.APIAdresses.orderProducts
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
  }

  // rest
  // has get

  index(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache !== undefined && { cache }),
      data: this.getNormalizedSendData({
        isAssigned: null, // Number
        is_assigned_unused: null, // Number
        is_used_and_paid: null, // Number
        is_used_and_unpaid: null, // Number
        is_unassigned: null, // Number
        isUsed: null, // Number
        page: 1 // Number
      }, data.data),
      resolveCallback: (response) => {
        return {
          referralCodeList: new ReferralCodeList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOrderProducts(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderProducts,
      cacheKey: this.CacheList.orderProducts,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          transactionsTableRow: new TransactionList(response.data.data), // Transactions Table Row: Array of Objects
          paginate: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      },
      ...(data && { data })
    })
  }

  noneProfitableOrderproducts(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.noneProfitableOrderproducts,
      cacheKey: this.CacheList.noneProfitableOrderproducts,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          zeroCardTableRow: new TransactionList(response.data.data), // Transactions Table Row: Array of Objects
          paginate: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      },
      ...(data && { data })
    })
  }

  batchStore(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.batchStore,
      data: this.getNormalizedSendData({
        discounttype_id: 2, // Number -- optional
        number_of_codes: 0, // Number
        commission: 0, // Number
        mobile: '', // String
        nationalCode: '', // String
        firstName: '', // String
        lastName: '' // String
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  submitReferralCodeOnOrder(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.orderReferralCode,
      data: this.getNormalizedSendData({
        referral_code: null // String
        // order_id: 0 // Number
      }, data.data),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  DeleteReferralCodeFromOrder(data) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.orderReferralCode,
      data: this.getNormalizedSendData({
        order_id: null // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  setShared(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.assign(data.referralCode),
      data: this.getNormalizedSendData({
        via_sms: false, // Boolean -- optional
        assign: true // Boolean -- optional
      }, data),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getSalesManData(cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.sales_man,
      cacheKey: this.CacheList.sales_man,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return {
          wallet_type: response.data.wallet_type ? String(response.data.wallet_type) : null, // type: String,  Example: main_account
          wallet_balance: response.data.wallet_balance ? Number(response.data.wallet_balance) : 0, // type: Number,  Example: 10000
          total_commission: response.data.total_commission ? Number(response.data.total_commission) : 0, // type: Number,  Example: 10000
          has_signed_contract: response.data.has_signed_contract ? response.data.has_signed_contract : null, // type: Boolean(true/false)
          minAmount_until_settlement: response.data.minAmount_until_settlement ? Number(response.data.minAmount_until_settlement) : 0, // type: Number,  Example: 10000
          count_of_total_gift_cards: response.data.count_of_total_gift_cards ? Number(response.data.count_of_total_gift_cards) : 0, // type: Number,  Example: 11
          count_of_used_gift_cards: response.data.count_of_used_gift_cards ? Number(response.data.count_of_used_gift_cards) : 0, // type: Number,  Example: 3
          count_of_used_without_pay_gift_cards: response.data.count_of_used_without_pay_gift_cards ? Number(response.data.count_of_used_without_pay_gift_cards) : 0, // type: Number,  Example: 3
          count_of_remain_gift_cards: response.data.count_of_remain_gift_cards ? Number(response.data.count_of_remain_gift_cards) : 0, // type: Number,  Example: 8
          count_of_unused_with_assignee_gift_cards: response.data.count_of_unused_with_assignee_gift_cards ? Number(response.data.count_of_unused_with_assignee_gift_cards) : 0, // type: Number,  Example: 8
          income_being_settle: response.data.income_being_settle ? Number(response.data.income_being_settle) : 0 // type: Number,  Example: 90000
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getWithdrawWallet() {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.walletWithdraw,
      cacheKey: this.CacheList.walletWithdraw,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getWithdrawHistory(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.walletWithdrawRequests,
      cacheKey: this.CacheList.walletWithdrawRequests,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return {
          clearingHistoryTableRow: new WithdrawHistoryList(response.data.data),
          paginate: response.data.pagination
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getReferralCode(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(data['referral-code']),
      cacheKey: this.CacheList.show(data['referral-code']),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        console.log(response.data.code)
        return response.data.code // String Code
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  submitContract() {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.contract,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

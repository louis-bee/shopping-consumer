import { post } from '@/utils/request'

const pay = {
  getBalance (params) {
    return post('/pay/getBalance', params)
  },
  payBill (params) {
    return post('/pay/payBill', params)
  },
  sendCode (params) {
    return post('/pay/sendCode', params)
  },
  recharge (params) {
    return post('/pay/recharge', params)
  }
}

export default pay

import { post } from '@/utils/request'

const pay = {
  getBalance (params) {
    return post('/pay/getBalance', params)
  },
  payBill (params) {
    return post('/pay/payBill', params)
  }
}

export default pay

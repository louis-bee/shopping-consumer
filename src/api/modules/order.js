import { post } from '@/utils/request'

const order = {
  getOrderList (params) {
    return post('/order/getOrderList', params)
  }
}

export default order

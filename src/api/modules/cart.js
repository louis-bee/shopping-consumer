import { post } from '@/utils/request'

const cart = {
  getCartList (params) {
    return post('/cart/getCartList', params)
  },
  addToCart (params) {
    return post('/cart/addToCart', params)
  },
  updateCart (params) {
    return post('/cart/updateCart', params)
  },
  deleteCart (params) {
    return post('/cart/deleteCart', params)
  },
  getCartNum (params) {
    return post('/cart/getCartNum', params)
  }
}

export default cart

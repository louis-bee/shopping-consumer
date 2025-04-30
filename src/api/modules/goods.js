import { post } from '@/utils/request'

const goods = {
  getGoodsById (params) {
    return post('/getGoods/getGoodsById', params)
  },
  getGoodsList (params) {
    return post('/getGoods/getGoodsList', params)
  }
}

export default goods

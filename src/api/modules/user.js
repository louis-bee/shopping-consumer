import { post } from '@/utils/request'

const user = {
  login (params) {
    return post('/api/login', params)
  },
  register (params) {
    return post('/api/register', params)
  },
  logout (params) {
    return post('/api/logout', params)
  },
  async refreshToken (params) {
    return post('/api/refreshToken', params)
  }
}

export default user

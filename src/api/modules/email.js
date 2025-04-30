import { post } from '@/utils/request'

const email = {
  sendCode (params) {
    return post('/email/sendCode', params)
  }
}

export default email

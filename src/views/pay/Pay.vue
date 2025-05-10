<template>
  <div>
    <Header :fix=true @tab-change="handleTabChange" :link="'cart'"></Header>
    <div class="main">
      <div class="container">
        <div class="cart">
          <div class="list">
            <li v-for="item in list" :key="item.id">
              <div class="img">
                <img :src="item.image" alt="">
                <div class="point">{{ item.number }}</div>
              </div>
              <div class="name" @click="toDetail(item.goodsId, item.type)">{{ item.goodsName }}</div>
              <div class="price">￥{{ (item.price*item.number).toFixed(2) }}</div>
            </li>
          </div>
          <div class="total-box">
            <h3>总计</h3><div class="total">￥{{ totalPrice }}</div>
          </div>
        </div>
        <div class="right-box">
          <div class="form">
            <h4>收货地址</h4>
            <input v-model="form.address" type="text" placeholder="请填写收货地址">
            <h4>电子邮箱</h4>
            <input v-model="form.email" type="text" placeholder="请填写电子邮箱">
            <h4>验证码</h4>
            <div class="code-box">
              <input class="code" v-model="form.code" type="text" placeholder="请填写验证码">
              <div class="send" v-if="sendStatus===1" @click="sendCode">发送验证码</div>
              <div class="send pending" v-else-if="sendStatus===2">({{ timeCounter }})秒后重新发送</div>
              <div class="send" v-else @click="sendCode">重新发送</div>
            </div>
            <div class="submit" @click="submit">确认支付</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'Pay',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      list: [],
      form: {
        address: '',
        email: '13724648288@163.com',
        code: ''
      },
      sendStatus: 1,
      timeCounter: 59
    }
  },
  computed: {
    totalPrice () {
      const res = this.list.reduce((sum, item) => {
        return sum + (item.price * item.number)
      }, 0)
      return res.toFixed(2)
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    handleTabChange (typeId) {
      this.$router.push({ path: '/', query: { typeId: typeId } })
    },
    async getCartList () {
      this.$apis.cart.getCartList({ userId: JSON.parse(localStorage.getItem('userInfo')).id }).then(res => {
        if (res.status === 200) {
          this.list = res.data.list.map(item => {
            return {
              ...item,
              image: `${process.env.VUE_APP_API_URL}/uploads/` + item.images[0]
            }
          })
          console.log(res.desc)
        }
      })
    },
    sendCode () {
      const store = this.sendStatus
      this.sendStatus = 2
      this.timeCounter = 59
      const params = {
        email: this.form.email,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }
      this.$apis.pay.sendCode(params).then(res => {
        if (res.status === 200) {
          this.sendStatus = 2
          this.timeCounter = 59
          const timer = setInterval(() => {
            this.timeCounter--
            if (this.timeCounter === 0) {
              this.sendStatus = 3
              clearTimeout(timer)
            }
          }, 1000)
          console.log(res.desc)
        } else {
          this.sendStatus = store
          alert(res.desc)
          // console.log(res.desc)
        }
      })
    },
    async submit () {
      if (!this.form.address) return alert('地址不能为空')
      if (!this.form.email) return alert('请填写邮箱地址')
      if (!this.form.code) return alert('请输入验证码')
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const res = await this.$apis.pay.getBalance({ userId: userInfo.id })
      const newBalance = parseFloat(res.data.balance)
      userInfo.balance = newBalance
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      if (newBalance > this.totalPrice) {
        if (confirm('账户余额不足，请先充值')) {
          return this.$router.push('/recharge')
        } else {
          return
        }
      }
      const params = {
        ...this.form,
        userId: userInfo.id,
        newBalance: newBalance - this.totalPrice,
        orderIdList: this.list.map(item => (item.id))
      }
      this.$apis.pay.payBill(params).then(res => {
        if (res.status === 200) {
          userInfo.balance = res.data.balance
          this.$store.commit('setCartNum', 0)
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          alert('支付成功')
          this.$router.push('/myOrder')
        } else {
          alert(res.desc)
        }
      })
    },
    toDetail (id, type) {
      this.$router.push({ path: `/goodsDetail/${id}`, query: { typeId: type } })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 190px;
  min-height: 500px;
  background-color: rgb(216, 216, 212);
  .container {
    display: flex;
    margin: 0 auto;
    padding-top: 30px;
    width: 1000px;
    // background-color: #fff;
    .cart {
      padding-top: 20px;
      width: 450px;
      .list {
        margin-bottom: 15px;
        li {
          display: flex;
          margin-top: 15px;
          height: 65px;
          // background-color: pink;
          .img {
            width: 65px;
            height: 65px;
            position: relative;
            img {
              border-radius: 6px;
              background-size: contain;
              background-position: center; /* 图片居中显示 */
              background-repeat: no-repeat;
            }
            .point {
              position: absolute;
              top: 0;
              right: 0;
              width: 20px;
              height: 20px;
              transform: translate(40%,-40%);
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
              font-size: 12px;
              color: #fff;
              background-color: rgb(90, 90, 90);
            }
          }
          .name {
            flex:1;
            line-height: 65px;
            padding-left: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            line-height: 65px;
          }
        }
      }
      .total-box {
        display: flex;
        height: 25px;
        padding-top: 25px;
        border-top: 1px solid black;
        h3 {
          flex: 1;
          line-height: 25px;
          font-size: 22px;
        }
        .total {
          line-height: 25px;
          font-size: 22px;
          color: black;
        }
      }

    }
    .right-box {
      flex:1;
      margin-left: 150px;
      .form {
        h4 {
          margin-top: 20px;
          font-weight: normal;
        }
        input {
          margin-top: 6px;
          padding: 10px 20px;
          padding-top: 13px;
          width: 100%;
          height: 45px;
          border: 1px solid rgb(2, 2, 2);
          background-color: inherit;
          font-size: 16px;
          &::placeholder {
            font-size: 14px;
          }
        }
        .code-box {
          display: flex;
          .code {
            width: 75%;
          }
          .send {
            flex: 1;
            cursor: pointer;
            text-align: center;
            margin-top: 6px;
            line-height: 45px;
            font-size: 12px;
            &:hover {
              color: rgba(0, 0, 0, 0.295);
            }
            &:active {
              color: rgba(0, 0, 0, 0.115);
            }
          }
          .pending {
            color: rgba(0, 0, 0, 0.295);
            &:active {
              color: rgba(0, 0, 0, 0.295);
            }
          }
        }
        .submit {
          margin-top: 24px;
          width: 100%;
          height: 45px;
          background-color: rgb(2, 2, 2);
          color: rgb(237, 237, 237);
          text-align: center;
          line-height: 45px;
          font-size: 14px;
          &:hover {
            background-color: rgb(235, 79, 71);
          }
        }
      }
    }
  }
}
</style>

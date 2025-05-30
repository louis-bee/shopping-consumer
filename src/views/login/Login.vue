<template>
  <div class="login">
    <Header :fix=true :showNavBox=false :showLinkBox=false ></Header>
    <div class="main">
      <div class="title">
        <h1>登 录</h1>
        <span @click="$router.push('/')">回到商店</span>
      </div>
      <div class="form">
        <h4>账 号</h4>
        <input v-model="form.account" type="text" placeholder="请输入账号" @keydown.enter="$refs.password.focus()" ref="account">
        <h4>密 码</h4>
        <input v-model="form.pwd" type="password" placeholder="请输入密码" @keydown.enter="submit" ref="password">
        <div class="submit" @click="submit">登 录</div>
        <div class="choice-box">
          <span @click="$router.push('/register')">注册</span>
          <span @click="forgetPwd">忘记密码?</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <Alert ref="alertDialog" placement="center" @on-confirm="jump">
      <div class="alert">
        <div class="head">登录提示</div>
        <div class="body">
          当前为用户端，请前往
          <a v-if="loginRole===2" href="http://seller.brotherlouis.site" target="_blank">销售后台</a>
          <a v-if="loginRole===3" href="http://admin.brotherlouis.site" target="_blank">后台管理端</a>
          登录。
        </div>
      </div>
    </Alert>
  </div>
</template>

<script>
// 引入子组件
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'
export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    Alert
  },
  data () {
    return {
      // 表单数据绑定
      form: {
        account: 'admin2',
        pwd: '123123',
        role: 1
      },
      loginRole: null
    }
  },
  mounted () {
    this.$refs.account.focus()
  },
  methods: {
    // 忘记密码处理函数
    forgetPwd () {
      alert('请联系客服\n电话：13724648288\n邮箱：2720447678@qq.com')
      // 滚动到页面顶部
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    },
    // 登录处理函数
    submit () {
      if (!this.form.account || !this.form.pwd) {
        return alert('请输入账号密码')
      }
      // 发起登录请求
      this.$apis.user.login(this.form).then(res => {
        if (res.status === 200) {
          // 存储用户信息
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          // 获取购物车数量
          this.getCartNum(res.data.id)
          // 跳转到首页
          this.$router.push('/')
        } else if (res.status === 304) {
          this.loginRole = res.role
          this.$refs.alertDialog.show()
        } else {
          alert(res.desc)
        }
      })
    },
    // 获取购物车数量
    getCartNum (id) {
      this.$apis.cart.getCartNum({ userId: id }).then(res => {
        if (res.status === 200) {
          // 更新购物车数量
          this.$store.commit('setCartNum', res.data.cartNum)
        }
      })
    },
    jump () {
      if (this.loginRole === 2) window.open('http://seller.brotherlouis.site', '_blank')
      if (this.loginRole === 3) window.open('http://admin.brotherlouis.site', '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
// 登录页面样式
.main {
  display: flex;
  margin: 0 auto;
  margin-top: 200px;
  padding-top: 70px;
  height: 600px;
  width: 1140px;
  .title {
    padding-left: 90px;
    width: 600px;
    h1 {
      margin-bottom: 25px;
      font-size: 40px;
      font-weight: normal;
    }
    span {
      cursor: pointer;
      &:hover {
        color: aliceblue;
      }
    }
  }
  .form {
    flex: 1;
    padding-right: 70px;
    h4 {
      margin-top: 20px;
      font-weight: normal;
    }
    input {
      margin-top: 10px;
      padding: 10px 20px;
      padding-top: 13px;
      width: 100%;
      height: 47px;
      border: 1px solid rgb(2, 2, 2);
      background-color: rgb(210, 210, 207);
      font-size: 16px;
      &::placeholder {
        font-size: 14px;
      }
    }
    .submit {
      margin-top: 24px;
      width: 100%;
      height: 47px;
      background-color: rgb(2, 2, 2);
      color: rgb(209, 209, 207);
      text-align: center;
      line-height: 47px;
      font-size: 14px;
      &:hover {
        background-color: rgb(235, 79, 71);
      }
    }
    .choice-box {
      margin-top: 24px;
      span {
        cursor: pointer;
        font-size: 14px;
        margin-right: 10px;
        &:hover {
          color: rgb(237, 237, 237);
        }
      }
    }
  }
}
.alert {
  .head {
    padding-top: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .body {
    padding-top: 20px;
    padding-left: 10px;
    a {
      color: black;
      // text-decoration: none;
      &:hover {
        color: rgb(129, 129, 124);
      }
      &:active {
        color: rgb(173, 173, 170);
      }
    }
  }
}
</style>

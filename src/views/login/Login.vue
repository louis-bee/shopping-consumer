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
        <input v-model="form.account" type="text" placeholder="请输入账号">
        <h4>密 码</h4>
        <input v-model="form.pwd" type="password" placeholder="请输入密码">
        <div class="submit" @click="submit">登 录</div>
        <div class="choice-box">
          <span @click="$router.push('/register')">注册</span>
          <span @click="forgetPwd">忘记密码?</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Login',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      form: {
        account: null,
        pwd: null,
        role: 1
      }
    }
  },
  created () {
  },
  methods: {
    forgetPwd () {
      alert('请联系客服\n电话：13724648288\n邮箱：2720447678@qq.com')
      window.scrollTo({
        top: document.body.scrollHeight, // 滚动到页面顶部
        behavior: 'smooth' // 平滑滚动效果
      })
    },
    submit () {
      if (!this.form.account || !this.form.pwd) {
        return alert('请输入账号密码')
      }
      this.$apis.user.login(this.form).then(res => {
        if (res.status === 200) {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          this.getCartNum(res.data.id)
          this.$router.push('/')
        } else {
          alert(res.desc)
        }
      })
    },
    getCartNum (id) {
      this.$apis.cart.getCartNum({ userId: id }).then(res => {
        if (res.status === 200) {
          this.$store.commit('setCartNum', res.data.cartNum)
          // localStorage.setItem('cartNum', res.data.cartNum)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  margin: 0 auto;
  margin-top: 200px;
  padding-top: 70px;
  height: 600px;
  width: 1140px;
  // background-color: pink;
  .title {
    padding-left: 90px;
    // background-color: #fff;
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
</style>

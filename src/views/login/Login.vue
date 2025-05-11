<template>
  <!-- 登录页面容器 -->
  <div class="login">
    <!-- 引入头部组件，设置为不固定，不显示导航和链接 -->
    <Header :fix=true :showNavBox=false :showLinkBox=false ></Header>
    <!-- 主体内容 -->
    <div class="main">
      <!-- 登录标题 -->
      <div class="title">
        <h1>登 录</h1>
        <!-- 返回商店链接 -->
        <span @click="$router.push('/')">回到商店</span>
      </div>
      <!-- 登录表单 -->
      <div class="form">
        <!-- 账号输入提示 -->
        <h4>账 号</h4>
        <!-- 账号输入框 -->
        <input v-model="form.account" type="text" placeholder="请输入账号">
        <!-- 密码输入提示 -->
        <h4>密 码</h4>
        <!-- 密码输入框 -->
        <input v-model="form.pwd" type="password" placeholder="请输入密码">
        <!-- 登录按钮 -->
        <div class="submit" @click="submit">登 录</div>
        <!-- 其他选项 -->
        <div class="choice-box">
          <!-- 注册链接 -->
          <span @click="$router.push('/register')">注册</span>
          <!-- 忘记密码链接 -->
          <span @click="forgetPwd">忘记密码?</span>
        </div>
      </div>
    </div>
    <!-- 引入页脚组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入子组件
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
      // 表单数据绑定
      form: {
        account: null,
        pwd: null,
        role: 1
      }
    }
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
</style>

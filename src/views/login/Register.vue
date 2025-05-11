<template>
  <div class="register">
    <Header :fix=true :showNavBox=false :showLinkBox=false ></Header>
    <div class="main">
      <div class="title">
        <h1>注 册</h1>
        <span @click="$router.push('/')">回到商店</span>
      </div>
      <div class="form">
        <h4>用户名</h4>
        <input v-model="form.userName" type="text" placeholder="请输入用户名">
        <h4>账 号</h4>
        <input v-model="form.account" type="text" placeholder="请输入账号">
        <h4>密 码</h4>
        <input v-model="form.pwd" type="password" placeholder="请输入密码">
        <h4>确认密码</h4>
        <input v-model="pwd2" type="password" placeholder="请再次输入密码">
        <div class="submit" @click="submit">注 册</div>
        <div class="choice-box">
          <span @click="$router.push('/login')">登录</span>
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
        userName: null,
        account: null,
        pwd: null,
        role: 1
      },
      pwd2: null
    }
  },
  methods: {
    submit () {
      if (!this.form.userName || !this.form.pwd || !this.form.account || !this.form.pwd || !this.pwd2) {
        return alert('字段不能为空')
      }
      if (this.form.pwd !== this.pwd2) {
        return alert('两次输入的密码不一致')
      }
      const params = {
        userInfo: this.form
      }
      this.$apis.user.register(params).then(res => {
        console.log(res)
        if (res.status === 200) {
          alert('注册成功！')
          this.$router.push('/login')
        } else {
          return alert(res.desc)
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
    margin-top: -80px;
    flex: 1;
    padding-right: 70px;
    h4 {
      margin-top: 15px;
      font-weight: normal;
    }
    input {
      margin-top: 8px;
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
      margin-top: 20px;
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
      margin-top: 20px;
      span {
        cursor: pointer;
        font-size: 14px;
        margin-right: 10px;
        &:hover {
          color: aliceblue;
        }
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="header" :class="fixed&&'fix'">
      <div class="logo-box">
        <a href="https://space.bilibili.com/501779432" target="_blank"><img src="@/assets/img/brotherlouis.webp" alt=""></a>
        <div class="line"></div>
        <a @click="$router.push('/')" href=""><img src="@/assets/img/louislogo.webp" alt=""></a>
      </div>
      <div v-if="showNavBox" class="tab-box">
        <li v-for="item in tablist" :key="item.id" @click="tabChange(item.id)" :class="item.id===activeTab&&'active-li'">
          {{ item.name }}
        </li>
      </div>
      <div v-if="showLinkBox" class="link-box">
        <li v-if="!isLogin" @click="$router.push('/login')">登录</li>
        <li v-else @click="logout">退出登录</li>
        <li @click="toMyOrder" :class="link==='order'&&'active-li'">我的订单</li>
        <li @click="showCart" class="cart" :class="link==='cart'&&'active-li'"><span class="iconfont icon-24gl-bag"></span>{{$store.getters.cartNum}}</li>
      </div>
    </div>
    <div v-if="fixed&&!fix" class="phantom"></div>
  </div>
</template>

<script>
import clearStorage from '@/utils/clearStorage'
export default {
  name: 'Header',
  props: {
    tab: {
      type: Number
    },
    link: {
      type: String,
      default: null
    },
    showNavBox: {
      type: Boolean,
      default: true
    },
    showLinkBox: {
      type: Boolean,
      default: true
    },
    fix: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeTab: null,
      tablist: [
        { id: 0, name: '全部' },
        { id: 1, name: '唱片' },
        { id: 2, name: '衣饰' },
        { id: 3, name: '日用品' },
        { id: 4, name: '其它' },
        { id: 5, name: '特价' }
      ],
      isLogin: false,
      fixed: false,
      cartNum: 0
    }
  },
  created () {
    this.fixed = this.fix
    this.activeTab = this.tab
    this.isLogin = !!localStorage.getItem('refreshToken')
    // this.cartNum = this.$store.state.cartNum
    // this.isLogin && this.$apis.cart.getCartNum({ userId: JSON.parse(localStorage.getItem('userInfo')).id }).then(res => { this.cart = res.data.cartNum })
  },
  mounted () {
    if (this.fix === false) window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    if (this.fix === false) window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    tabChange (typeId) {
      this.activeTab = typeId
      // this.$router.push({ path: '/', query: { typeId: typeId } })
      this.$emit('tab-change', typeId)
    },
    logout () {
      clearStorage()
      this.isLogin = false
      if (this.$route.path !== '/') {
        this.$router.push('/')
      } else {
        location.reload()
      }
      // this.$router.replace('/')
    },
    toMyOrder () {
      if (this.$route.path !== '/myOrder') {
        this.$router.push('/myOrder')
      }
    },
    showCart () {
      if (this.$route.path !== '/cart') {
        this.$router.push('/cart')
      }
    },
    handleScroll () {
      const scrollTop = window.scrollY
      if (scrollTop >= 190) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  z-index: 99;
  position: relative;
  padding-top: 30px;
  width: 100%;
  height: 190px;
  background-color: rgb(210,210,207);;
  .logo-box {
    display: flex;
    justify-content: center;
    .line {
      width: 2px;
      background-color: rgb(96, 115, 126);
    }
    img {
      width: 200px;
      height: 100px;
      object-fit: contain;
    }
  }
  .tab-box {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    gap: 50px;
    li {
      cursor: pointer;
      padding-bottom: 5px;
      &:hover {
        border-bottom: 1px solid ;
      }
    }
    .active-li {
      border-bottom: 1px solid ;
    }
  }
  .link-box {
    position: absolute;
    top: 110px;
    right: 100px;
    display: flex;
    gap: 15px;
    li {
      cursor: pointer;
      padding-bottom: 5px;
      &:hover {
        border-bottom: 1px solid;
      }
    }
    .active-li {
      border-bottom: 1px solid ;
    }
    .cart {
      .iconfont {
        margin-right: 3px;
        font-size: 20px;
      }
    }
  }
}
.fix {
  position: fixed;
  top: 0;
}
.phantom {
  height: 190px;
}
</style>

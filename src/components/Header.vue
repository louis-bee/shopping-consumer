<template>
  <!-- 头部容器 -->
  <div>
    <!-- 头部区域，根据fixed属性添加fix类以实现固定定位效果 -->
    <div class="header" :class="fixed&&'fix'">
      <!-- 包含logo和分隔线的logo-box区域 -->
      <div class="logo-box">
        <!-- 点击可跳转到指定url的链接 -->
        <a href="<url>" target="_blank"><img src="@/assets/img/brotherlouis.webp" alt=""></a>
        <!-- 分隔线 -->
        <div class="line"></div>
        <!-- 点击可跳转到首页的链接 -->
        <a @click="$router.push('/')" href=""><img src="@/assets/img/louislogo.webp" alt=""></a>
      </div>
      <!-- 导航选项卡列表 -->
      <div v-if="showNavBox" class="tab-box">
        <!-- 循环渲染tablist中的每个导航项 -->
        <li v-for="item in tablist" :key="item.id" @click="tabChange(item.id)" :class="item.id===activeTab&&'active-li'">
          {{ item.name }}
        </li>
      </div>
      <!-- 登录/退出及我的订单等链接 -->
      <div v-if="showLinkBox" class="link-box">
        <!-- 未登录时显示登录链接，已登录时显示退出登录链接 -->
        <li v-if="!isLogin" @click="$router.push('/login')">登录</li>
        <li v-else @click="logout">退出登录</li>
        <!-- 我的订单链接 -->
        <li @click="toMyOrder" :class="link==='order'&&'active-li'">我的订单</li>
        <!-- 购物车链接，显示购物车中的商品数量 -->
        <li @click="showCart" class="cart" :class="link==='cart'&&'active-li'"><span class="iconfont icon-24gl-bag"></span>{{$store.getters.cartNum}}</li>
      </div>
    </div>
    <!-- 用于在fixed为true且未添加fix类时占位的phantom元素 -->
    <div v-if="fixed&&!fix" class="phantom"></div>
  </div>
</template>

<script>
import clearStorage from '@/utils/clearStorage'
export default {
  name: 'Header',
  props: {
    // 接收的props定义
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
      // 定义组件的内部状态
      activeTab: null,
      tablist: [
        // 定义导航选项卡列表
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
    // 在组件创建时执行的逻辑
    this.fixed = this.fix
    this.activeTab = this.tab
    this.isLogin = !!localStorage.getItem('refreshToken')
  },
  mounted () {
    // 组件挂载完成后执行的逻辑
    if (this.fix === false) window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // 组件销毁前执行的逻辑
    if (this.fix === false) window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 定义组件的方法
    tabChange (typeId) {
      this.activeTab = typeId
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
// 定义组件的样式
.header {
  z-index: 99;
  position: relative;
  padding-top: 30px;
  width: 100%;
  height: 190px;
  background-color: rgb(210,210,207);
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
        border-bottom: 1px solid;
      }
    }
    .active-li {
      border-bottom: 1px solid;
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
      border-bottom: 1px solid;
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

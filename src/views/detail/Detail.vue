<template>
  <!-- 商品详情页布局容器 -->
  <div class="layout">
    <!-- 引入头部组件，监听tab-change事件，传递当前选中的tab -->
    <Header @tab-change="handleTabChange" :tab="parseInt($route.query.typeId)"></Header>
    <!-- 主体内容区域 -->
    <div class="main">
      <!-- 商品图片区域 -->
      <div class="image">
        <!-- 如果有多张图片且第一张图片存在，则使用轮播图组件 -->
        <Carousel v-if="detail.imageList.length>1 && detail.imageList[0]" :imageList="detail.imageList" :showBut="false" :width="480" :height="480"></Carousel>
        <!-- 否则只显示一张图片 -->
        <img v-else :src="detail.imageList[0]" alt="">
      </div>
      <!-- 商品信息区域 -->
      <div class="message">
        <!-- 商品名称 -->
        <h1>{{ detail.goodsName }}</h1>
        <!-- 商品价格 -->
        <div class="price">￥{{ detail.price }}</div>
        <!-- 商品数量选择区域 -->
        <div class="num">
          <div class="label">数量</div>
          <!-- 引入计数器组件 -->
          <Counter @count-change="handleCountChange"></Counter>
        </div>
        <!-- 添加到购物车按钮 -->
        <div class="button" :class="detail.status===2 && 'available'" @click="handleAddtoCart">添加到购物车</div>
        <!-- 商品描述 -->
        <div class="desc" v-html="detail.desc"></div>
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
import Carousel from '@/components/Carousel.vue'
import Counter from '@/components/Counter.vue'
export default {
  name: 'GoodsDetail',
  components: {
    Header,
    Footer,
    Carousel,
    Counter
  },
  data () {
    return {
      // 商品ID
      goodsId: null,
      // 商品详情数据
      detail: {
        imageList: []
      },
      // 默认数量
      count: 1
    }
  },
  created () {
    // 从路由参数中获取商品ID
    this.goodsId = parseInt(this.$route.params.id)
    // 获取商品详情
    this.getGoodsDetail()
  },
  methods: {
    // 处理头部组件的tab改变事件
    handleTabChange (typeId) {
      this.$router.push({ path: '/', query: { typeId: typeId } })
    },
    // 获取商品详情
    getGoodsDetail () {
      this.$apis.goods.getGoodsById({ id: this.goodsId, view: true }).then(res => {
        if (res.status === 200) {
          // 处理图片路径
          this.detail = {
            ...res.data,
            imageList: res.data.images.map(item => {
              return `${process.env.VUE_APP_API_URL}/uploads/` + item
            })
          }
          console.log(this.detail)
        } else {
          alert(res.desc)
        }
      })
    },
    // 处理数量改变事件
    handleCountChange (val) {
      this.count = val
    },
    // 处理添加到购物车事件
    handleAddtoCart () {
      if (this.detail.status !== 2) {
        alert('该商品已下架')
        return
      }
      if (!localStorage.getItem('token')) {
        alert('请先登录')
        return this.$router.push('/login')
      }
      const params = {
        userId: JSON.parse(localStorage.getItem('userInfo')).id,
        goodsId: this.goodsId,
        number: this.count
      }
      this.$apis.cart.addToCart(params).then(res => {
        if (res.status === 200) {
          if (res.data.cartNumAdd) {
            this.$store.commit('setCartNum', this.$store.state.cartNum + 1)
          }
          this.$router.push('/cart')
        } else {
          console.log(res.desc)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 商品详情页样式
.main {
  width: 1230px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  .image {
    padding-left: 90px;
    img {
      width: 480px;
      height: 480px;
    }
  }
  .message {
    margin-left: 100px;
    margin-right: 90px;
    flex:1;
    h1 {
      width: 100%;
      margin-top: 10px;
      word-break: break-all;
    }
    .price {
      margin-top: 15px;
      font-size: 18px;
    }
    .num {
      display: flex;
      align-items: center;
      margin-top: 20px;
      height: 43px;
      width: 305px;
      .label {
        flex: 1;
        padding-left: 5px;
      }
    }
    .button {
      cursor: not-allowed;
      margin-top: 20px;
      height: 45px;
      width: 305px;
      text-align: center;
      line-height: 45px;
      font-size: 16px;
      color: rgb(216, 216, 212);
      background-color: grey;
    }
    .available {
      cursor: pointer;
      background-color: black;
      &:hover {
        background-color: rgb(235, 79, 71);
      }
    }
    .desc {
      margin-top: 30px;
    }
  }
}
</style>

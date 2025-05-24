<template>
  <!-- 购物车页面容器 -->
  <div>
    <!-- 引入头部组件，设置固定定位，不显示导航和链接，显示购物车链接 -->
    <Header :fix=true @tab-change="handleTabChange" :link="'cart'"></Header>
    <!-- 主体内容 -->
    <div class="main">
      <!-- 购物车为空时显示的提示信息 -->
      <div v-if="list.length===0" class="empty">
        <h2>购物车空空如也~</h2>
        <span @click="$router.push('/')">去购物></span>
      </div>
      <!-- 购物车非空时显示的商品列表 -->
      <div v-else class="cart">
        <!-- 购物车标题 -->
        <div class="title">
          <h2>购物车</h2>
          <!-- 商品数量列标题 -->
          <p class="flex-1">数量</p>
          <!-- 商品价格列标题 -->
          <p>价格</p>
        </div>
        <!-- 商品列表 -->
        <div class="list">
          <!-- 循环渲染购物车中的商品 -->
          <li v-for="item,index in list" :key="item.id">
            <!-- 商品图片 -->
            <img v-lazy="item.image" alt="">
            <!-- 商品详情 -->
            <div class="detail" @click="toDetail(item.goodsId, item.type)">
              <!-- 商品名称 -->
              <div class="name">{{ item.goodsName || '示例商品名称' }}</div>
              <!-- 删除按钮 -->
              <div class="del" @click="handleDelete(item.id)">删除</div>
            </div>
            <!-- 商品数量计数器 -->
            <div class="count-box">
              <CounterMini :num="item.number || 1" @count-change="handleCountChange($event, item.id, index)"></CounterMini>
            </div>
            <!-- 商品价格 -->
            <div class="price">￥{{ item.price || '999.99' }}</div>
          </li>
        </div>
        <!-- 结算区域 -->
        <div class="checkout">
          <div class="box">
            <!-- 结算信息 -->
            <div class="head">
              <span>合计</span>
              <span>￥{{ totalPrice }}</span>
            </div>
            <!-- 结算按钮 -->
            <div class="but" @click="toPay">结 算</div>
          </div>
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
import CounterMini from '@/components/CounterMini.vue'
export default {
  name: 'Cart',
  components: {
    Header,
    Footer,
    CounterMini
  },
  data () {
    return {
      // 购物车商品列表
      list: []
    }
  },
  computed: {
    // 计算购物车总价
    totalPrice () {
      const res = this.list.reduce((sum, item) => {
        return sum + (item.price * item.number)
      }, 0)
      return res.toFixed(2)
    }
  },
  mounted () {
    // 组件挂载时获取购物车列表
    this.getCartList()
  },
  methods: {
    // 处理头部组件的tab改变事件
    handleTabChange (typeId) {
      this.$router.push({ path: '/', query: { typeId: typeId } })
    },
    // 获取购物车列表
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
    // 处理数量改变事件
    handleCountChange (count, id, index) {
      if (count === this.list[index].number) return
      const params = {
        orderId: id,
        number: count,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }
      this.$apis.cart.updateCart(params).then(res => {
        if (res.status === 200) {
          this.list[index].number = count
        }
      })
    },
    // 处理删除商品事件
    handleDelete (id) {
      // 待优化：弹窗确认
      const params = {
        orderId: id,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }
      this.$apis.cart.deleteCart(params).then(res => {
        if (res.status === 200) {
          this.list = this.list.filter(item => item.id !== id)
          this.$store.commit('setCartNum', this.list.length)
        } else {
          console.log(res.desc)
        }
      })
    },
    // 跳转到支付页面
    async toPay () {
      await this.getCartList()
      if (this.list.length !== 0) {
        this.$router.push('/pay')
      } else {
        alert('购物车的商品下架了')
      }
    },
    // 跳转到商品详情页
    toDetail (id, type) {
      this.$router.push({ path: `/goodsDetail/${id}`, query: { typeId: type } })
    }
  }
}
</script>

<style scoped lang="scss">
// 购物车页面样式
.flex-1 {
  flex:1
}
.main {
  margin-top: 190px;
  min-height: 350px;
  background-color: rgb(216, 216, 212);
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    h2 {
      display: block;
    }
    span {
      cursor: pointer;
      display: block;
      margin-top: 10px;
      font-size: 14px;
      &:hover {
        opacity: 0.2;
      }
    }
  }
  .cart {
    margin: 0 auto;
    padding-top: 20px;
    width: 950px;
    .title {
      padding-top: 6px;
      height: 65px;
      display: flex;
      border-bottom: 2px solid black;
      h2 {
        width: 600px;
        color: black;
      }
    }
    .list {
      padding-bottom: 30px;
      border-bottom: 1px solid black;
      li {
        display: flex;
        margin-top: 20px;
        height: 100px;
        img {
          width: 100px;
          height: 100px;
        }
        .detail {
          padding-left: 40px;
          width: 500px;
          height: 100%;
          .name {
            padding-top: 5px;
            padding-right: 5px;
            font-size: 20px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            text-wrap: none;
            white-space: nowrap;
          }
          .del {
            display: inline-block;
            cursor: pointer;
            margin-top: 45px;
            font-size: 13px;
            &:hover {
              opacity: 0.2;
            }
          }
        }
        .count-box {
          flex:1;
          padding-top: 5px;
        }
        .price {
          padding-top: 7px;
          font-size: 16px;
          color: black;
        }
      }
    }
    .checkout {
      padding-bottom: 40px;
      display: flex;
      justify-content: right;
      width: 100%;
      .box {
        margin-top: 40px;
        width: 300px;
        .head {
          display: flex;
          justify-content: space-between;
          span {
            font-size: 16px;
            color: black;
          }
        }
        .but {
          margin-top: 20px;
          height: 47px;
          text-align: center;
          line-height: 47px;
          background-color: black;
          font-size: 16px;
          color: rgb(237, 237, 237);
          &:hover {
            background-color: rgb(235, 79, 71);
          }
        }
      }
    }
  }
}
</style>

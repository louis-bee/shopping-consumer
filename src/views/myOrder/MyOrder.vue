<template>
  <div class="login">
    <Header :fix=true @tab-change="handleTabChange" :link="'order'"></Header>
    <div class="main">
      <div v-if="list.length===0" class="empty">
        <h2>还没有订单~</h2>
        <span @click="$router.push('/')">去购物></span>
      </div>
      <div v-else class="cart">
        <div class="title">
          <h2>我的订单</h2>
          <p class="flex-1">价格</p>
          <p>数量</p>
        </div>
        <div class="list">
          <li v-for="item in list" :key="item.id">
            <img :src="item.image" alt="">
            <div class="detail" @click="toDetail(item.goodsId, item.type)">
              <div class="name">{{ item.goodsName || '示例商品名称' }}</div>
              <div class="status" v-if="item.status===2">待发货</div>
              <div class="status" v-else>已发货</div>
              <div class="status time" >{{item.time}}</div>
            </div>
            <div class="count-box">
              ￥{{ item.price }}
            </div>
            <div class="price">x{{ item.number || '999' }}</div>
          </li>
        </div>
        <div class="pager-area">
          <Pager :total="page.total" :pageSize="page.pageSize" @on-change="handlePageChange"></Pager>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Pager from '@/components/Pager.vue'
export default {
  name: 'MyOrder',
  components: {
    Header,
    Footer,
    Pager
  },
  data () {
    return {
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 30
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    handlePageChange (newPage) {
      window.scrollTo({
        top: 0, // 滚动到页面顶部
        behavior: 'smooth' // 平滑滚动效果
      })
      this.page.pageNum = newPage
      this.getOrderList()
    },
    handleTabChange (typeId) {
      this.$router.push({ path: '/', query: { typeId: typeId } })
    },
    getOrderList () {
      const params = {
        userId: JSON.parse(localStorage.getItem('userInfo')).id,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        role: 1
      }
      this.$apis.order.getOrderList(params).then(res => {
        if (res.status === 200) {
          this.list = res.data.list.map(item => {
            return {
              ...item,
              image: `${process.env.VUE_APP_API_URL}/uploads/` + item.images[0]
            }
          })
          this.page.total = res.data.total
        } else {
          console.log(res.desc)
        }
      })
    },
    toDetail (id, type) {
      this.$router.push({ path: `/goodsDetail/${id}`, query: { typeId: type } })
    }
  }
}
</script>

<style scoped lang="scss">
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
          .status {
            display: inline-block;
            margin-top: 42px;
            font-size: 13px;
          }
          .time {
            margin-left: 40px;
          }
        }
        .count-box {
          flex:1;
          padding-top: 5px;
        }
        .price {
          padding-top: 5px;
          font-size: 16px;
          color: black;
        }
      }
    }
    .pager-area {
      margin-top: 20px;
      padding-bottom: 40px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>

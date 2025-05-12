<template>
  <!-- 布局容器 -->
  <div class="layout">
    <!-- 引入头部组件，并监听tab-change事件，传递当前选中的tab -->
    <Header @tab-change="handleTabChange" :tab="typeId"></Header>
    <!-- 主体内容区域 -->
    <div class="main">
      <!-- 列表存在时显示商品列表和分页器 -->
      <template v-if="list.length>0">
        <div class="list">
          <!-- 循环渲染商品列表 -->
          <li v-for="item in list" :key="item.id" @click="toDetail(item.id, item.type)">
            <!-- 商品图片 -->
            <img :src="item.image" alt="">
            <!-- 商品名称 -->
            <div class="name">{{ item.goodsName }}</div>
            <!-- 商品价格 -->
            <div class="price">¥<span>{{item.price}}</span></div>
          </li>
        </div>
        <!-- 分页器区域 -->
        <div class="pager-area">
          <!-- 引入分页器组件，并监听on-change事件 -->
          <Pager :total="page.total" :pageSize="page.pageSize" @on-change="handlePageChange"></Pager>
        </div>
      </template>
      <!-- 列表为空时显示暂无商品 -->
      <div v-else class="none">
        暂无商品
      </div>
    </div>
    <!-- 引入页脚组件，并传递first属性控制ICP信息显示 -->
    <Footer :first="showICP"></Footer>
  </div>
</template>

<script>
// 引入子组件
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Pager from '@/components/Pager.vue'
export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
    Pager
  },
  data () {
    return {
      // 定义组件的响应式数据
      typeId: null,
      page: {
        pageSize: 12,
        pageNum: 1,
        total: 1
      },
      list: [],
      showICP: false
    }
  },
  created () {
    // 组件创建时获取路由参数，调用获取商品列表的方法，并根据登录状态设置ICP显示
    this.typeId = parseInt(this.$route.query.typeId)
    this.getGoodsList()
    this.showICP = !localStorage.getItem('token')
  },
  methods: {
    // 获取商品列表的方法
    getGoodsList () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const params = {
        role: 1,
        userId: userInfo ? userInfo.id : null,
        type: this.typeId,
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum
      }
      this.$apis.goods.getGoodsList(params).then(res => {
        if (res.status === 200) {
          this.page.total = res.data.total
          // 成功获取商品列表，处理图片路径
          this.list = res.data.list.map(item => {
            return {
              ...item,
              image: `${process.env.VUE_APP_API_URL}/uploads/` + item.images[0]
            }
          })
        } else {
          // 请求失败，弹出提示信息
          alert(res.desc)
        }
      })
    },
    // 处理tab改变事件的方法
    handleTabChange (typeId) {
      this.typeId = typeId
      this.page.pageNum = 1
      this.page.total = 1
      this.getGoodsList()
    },
    // 跳转到商品详情的方法
    toDetail (id, type) {
      this.$router.push({ path: `/goodsDetail/${id}`, query: { typeId: type } })
    },
    // 处理分页改变事件的方法
    handlePageChange (newPage) {
      window.scrollTo({
        top: 0, // 滚动到页面顶部
        behavior: 'smooth' // 平滑滚动效果
      })
      this.page.pageNum = newPage
      this.getGoodsList()
    }
  }
}
</script>

<style scoped lang="scss">
// 定义布局的样式
.main {
  margin: 0 auto;
  margin-top: 10px;
  width: 1230px;
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      margin-bottom: 12px;
      width: 300px;
      height: 370px;
      transition: all 0.2s;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgb(0 0 0 / 15%);
      }
      img {
        width: 300px;
        height: 300px;
      }
      .name {
        padding: 0 5px;
        width: 100%;
        font-size: 16px;
        height: 44px;
        line-height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        padding: 0 5px;
      }
    }
  }
  .pager-area {
    margin-top: 20px;
    padding-bottom: 40px;
    display: flex;
    justify-content: center;
  }
  .none {
    padding-top: 50px;
    text-align: center;
  }
}
</style>

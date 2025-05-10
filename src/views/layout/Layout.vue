<template>
  <div class="layout">
    <Header @tab-change="handleTabChange" :tab="typeId"></Header>
    <div class="main">
      <template v-if="list.length>0">
        <div class="list">
          <li v-for="item in list" :key="item.id" @click="toDetail(item.id, item.type)">
            <img :src="item.image" alt="">
            <div class="name">{{ item.goodsName }}</div>
            <div class="price">¥<span>{{item.price}}</span></div>
          </li>
        </div>
        <div class="pager-area">
          <Pager :total="page.total" :pageSize="page.pageSize" @on-change="handlePageChange"></Pager>
        </div>
      </template>
      <div v-else class="none">
        暂无商品
      </div>
    </div>
    <Footer :first="showICP"></Footer>
  </div>

</template>

<script>
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
      typeId: null,
      page: {
        pageSize: 12,
        pageNum: 1
      },
      list: [],
      showICP: false
    }
  },
  created () {
    this.typeId = parseInt(this.$route.query.typeId)
    this.getGoodsList()
    this.showICP = !localStorage.getItem('token')
  },
  methods: {
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
          this.list = res.data.list.map(item => {
            return {
              ...item,
              image: `${process.env.VUE_APP_API_URL}/uploads/` + item.images[0]
            }
          })
        } else {
          alert(res.desc)
        }
      })
    },
    handleTabChange (typeId) {
      this.typeId = typeId
      this.getGoodsList()
    },
    toDetail (id, type) {
      this.$router.push({ path: `/goodsDetail/${id}`, query: { typeId: type } })
    },
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
        // transition: all 0.2s ease;
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgb(0 0 0 / 15%);
      }
      img {
        width: 300px;
        height: 300px;
      }
      .name {
        // margin-top: 14px;
        // margin-bottom: 14px;
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

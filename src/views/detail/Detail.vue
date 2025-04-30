<template>
  <div class="layout">
    <Header @tab-change="handleTabChange" :tab="parseInt($route.query.typeId)"></Header>
    <div class="main">
      <div class="image">
        <Carousel v-if="detail.imageList.length>1 && detail.imageList[0]" :imageList="detail.imageList" :showBut="false" :width="480" :height="480"></Carousel>
        <img v-else :src="detail.imageList[0]" alt="">
      </div>
      <div class="message">
        <h1>{{ detail.goodsName }}</h1>
        <div class="price">￥{{ detail.price }}</div>
        <div class="num">
          <div class="label">数量</div>
          <Counter @count-change="handleCountChange"></Counter>
        </div>
        <div class="button" @click="handleAddtoCart">添加到购物车</div>
        <div class="desc" v-html="detail.desc"></div>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
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
      goodsId: null,
      detail: {
        imageList: []
      },
      count: 1
    }
  },
  created () {
    this.goodsId = parseInt(this.$route.params.id)
    this.getGoodsDetail()
  },
  methods: {
    handleTabChange (typeId) {
      this.$router.push({ path: '/', query: { typeId: typeId } })
    },
    getGoodsDetail () {
      this.$apis.goods.getGoodsById({ id: this.goodsId, view: true }).then(res => {
        if (res.status === 200) {
          this.detail = {
            ...res.data,
            imageList: res.data.images.map(item => {
              return 'http://127.0.0.1:3009/uploads/' + item
            })
          }
          console.log(this.detail)
        } else {
          alert(res.desc)
        }
      })
    },
    handleCountChange (val) {
      this.count = val
    },
    handleAddtoCart () {
      const params = {
        userId: JSON.parse(localStorage.getItem('userInfo')).id,
        goodsId: this.goodsId,
        number: this.count
      }
      this.$apis.cart.addToCart(params).then(res => {
        if (res.status === 200) {
          if (res.data.cartNumAdd) {
            this.$store.commit('setCartNum', this.$store.state.cartNum + 1)
            // localStorage.setItem('cartNum', localStorage.getItem('cartNum') + 1)
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
      margin-top: 20px;
      height: 45px;
      width: 305px;
      text-align: center;
      line-height: 45px;
      font-size: 16px;
      color: rgb(216, 216, 212);
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

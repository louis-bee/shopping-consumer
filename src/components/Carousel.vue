<template>
  <div class="container" :style="{ width: pxTovwWidth+'px', height: pxTovwHeight+'px' }">
    <div class="list" ref="list">
      <li class="first"><img :src="imageList[imageList.length-1]" alt="" :style="{width: pxTovwWidth+'px',height: pxTovwHeight+'px' }"></li>
      <li v-for="item,index in imageList" :key="index">
        <img :src="item || require('@/assets/img/examplegoods.webp')" alt="" :style="{width: pxTovwWidth+'px'}">
      </li>
      <li class="last"><img :src="imageList[0]" alt="" :style="{width: pxTovwWidth+'px'}"></li>
    </div>
  <!-- <div class="container" :style="{ width: '480px', height: '480px' }">
    <div class="list" ref="list">
      <li class="first"><img :src="imageList[imageList.length-1]" alt="" :style="{width: '480px',height: '480px' }"></li>
      <li v-for="item,index in imageList" :key="index">
        <img :src="item || require('@/assets/img/examplegoods.webp')" alt="" :style="{width: '480px'}">
      </li>
      <li class="last"><img :src="imageList[0]" alt="" :style="{width: '480px'}"></li>
    </div> -->
    <div v-if="showBut" class="left" @click="handleLeftClick"></div>
    <div v-if="showBut" class="right" @click="handleRightClick"></div>
    <div class="indicater">
      <li v-for="item, index in imageList.length" :key="index">
        <span :class="count===index && 'active'" @click="handleClick(index)"></span>
      </li>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Carousel',
  props: {
    width: {
      type: Number,
      default: 480
    },
    height: {
      type: Number,
      default: 480
    },
    imageList: {
      type: Array,
      default: () => ['@/assets/img/examplegoods.webp', '@/assets/img/examplegoods.webp', '@/assets/img/examplegoods.webp']
    },
    showBut: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      count: 0,
      timer: null,
      clientWidth: 1536
    }
  },
  computed: {
    pxTovwHeight () {
      return this.pxTovw(this.height)
    },
    pxTovwWidth () {
      return this.pxTovw(this.width)
    }
  },
  mounted () {
    this.auto()
    this.clientWidth = document.documentElement.clientWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    clearInterval(this.timer)
  },
  methods: {
    handleResize () {
      this.clientWidth = document.documentElement.clientWidth
    },
    pxTovw (px) {
      return px / 1536 * this.clientWidth
    },
    moveTo (index) {
      this.count = index
      const distance = this.pxTovw(index * this.width)
      this.$refs.list.style.transform = `translateX(-${distance}px)`
      this.$refs.list.style.transition = '0.5s'
    },
    handleClick (index) {
      this.moveTo(index)
      clearInterval(this.timer) // 清除原有的定时器
      this.auto() // 重新设置定时器
    },
    toLeft () {
      if (this.count === 0) {
        const distance = this.pxTovw(this.imageList.length * this.width)
        this.$refs.list.style.transform = `translateX(-${distance}px)`
        this.$refs.list.style.transition = 'none'
        console.log(this.$refs.list.clientHeight)
        this.moveTo(this.imageList.length - 1)
      } else this.moveTo(this.count - 1)
    },
    toRight () {
      if (this.count === this.imageList.length - 1) {
        this.$refs.list.style.transform = 'translateX(100%)'
        this.$refs.list.style.transition = 'none'
        console.log(this.$refs.list.clientHeight)
        this.moveTo(0)
      } else this.moveTo(this.count + 1)
    },
    handleLeftClick () {
      this.toLeft()
      clearInterval(this.timer) // 清除原有的定时器
      this.auto() // 重新设置定时器
    },
    handleRightClick () {
      this.toRight()
      clearInterval(this.timer) // 清除原有的定时器
      this.auto() // 重新设置定时器
    },
    auto () {
      this.timer = setInterval(() => {
        this.toRight()
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  // margin-left: 400px;
  overflow: hidden;
  position: relative;
  .list {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
    img {
      height: 100%;
    }
    .first {
      position: absolute;
      transform: translateX(-100%);
    }
  }
  .left {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: gainsboro;
  }
  .right {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: gainsboro;
  }
  .indicater {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    // height: 20px;
    li {
      display: flex;
      width: 20px;
      height: 15px;
      justify-content: center;
      align-items: center;
      span {
        position: absolute;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: rgba(100, 99, 99, 0.721);
      }
      .active {
        height: 14px;
        width: 14px;
        background-color: rgb(240, 240, 240);
        opacity: 0.8;
      }
    }
  }
}
</style>

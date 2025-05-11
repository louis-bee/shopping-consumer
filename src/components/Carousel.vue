<template>
  <!-- 轮播图容器，设置宽度和高度为响应式 -->
  <div class="container" :style="{ width: pxTovwWidth+'px', height: pxTovwHeight+'px' }">
    <!-- 图片列表容器，用于通过滑动展示图片 -->
    <div class="list" ref="list" @wheel.prevent="handleWheel">
      <!-- 第一张图，使用绝对定位放置在容器的左侧 -->
      <li class="first">
        <img :src="imageList[imageList.length-1]" alt="" :style="{width: pxTovwWidth+'px',height: pxTovwHeight+'px' }">
      </li>
      <!-- 循环渲染图片列表 -->
      <li v-for="item,index in imageList" :key="index">
        <img :src="item" alt="" :style="{width: pxTovwWidth+'px'}">
      </li>
      <!-- 最后一张图，使用绝对定位放置在容器的右侧 -->
      <li class="last">
        <img :src="imageList[0]" alt="" :style="{width: pxTovwWidth+'px'}">
      </li>
    </div>
    <!-- 左侧切换按钮 -->
    <div v-if="showBut" class="left" @click="handleLeftClick"></div>
    <!-- 右侧切换按钮 -->
    <div v-if="showBut" class="right" @click="handleRightClick"></div>
    <!-- 指示器 -->
    <div class="indicater">
      <!-- 循环渲染指示器 -->
      <li v-for="item, index in imageList.length" :key="index">
        <!-- 指示器项，点击切换到对应图片 -->
        <span :class="count===index && 'active'" @click="handleClick(index)"></span>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    // 轮播图宽度，默认480px
    width: {
      type: Number,
      default: 480
    },
    // 轮播图高度，默认480px
    height: {
      type: Number,
      default: 480
    },
    // 图片列表
    imageList: {
      type: Array,
      default: () => []
    },
    // 是否显示左右切换按钮，默认为true
    showBut: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 当前显示的图片索引
      count: 0,
      // 自动轮播定时器
      timer: null,
      // 视口宽度，用于响应式计算
      clientWidth: 1536
    }
  },
  computed: {
    // 将px单位的高度转换为vw单位
    pxTovwHeight () {
      return this.pxTovw(this.height)
    },
    // 将px单位的宽度转换为vw单位
    pxTovwWidth () {
      return this.pxTovw(this.width)
    }
  },
  mounted () {
    // 组件挂载后启动自动轮播
    this.auto()
    // 初始化视口宽度
    this.clientWidth = document.documentElement.clientWidth
    // 监听窗口大小变化，更新视口宽度
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    // 组件销毁前清除定时器和移除事件监听器
    window.removeEventListener('resize', this.handleResize)
    clearInterval(this.timer)
  },
  methods: {
    // 处理窗口大小变化，更新视口宽度
    handleResize () {
      this.clientWidth = document.documentElement.clientWidth
    },
    // 将px单位转换为vw单位
    pxTovw (px) {
      return px / 1536 * this.clientWidth
    },
    // 移动到指定索引的图片
    moveTo (index) {
      this.count = index
      const distance = this.pxTovw(index * this.width)
      this.$refs.list.style.transform = `translateX(-${distance}px)`
      this.$refs.list.style.transition = '0.5s'
    },
    // 处理指示器点击事件，移动到指定索引的图片
    handleClick (index) {
      this.moveTo(index)
      clearInterval(this.timer) // 清除原有的定时器
      this.auto() // 重新设置定时器
    },
    // 向左移动到上一张图片
    toLeft () {
      if (this.count === 0) {
        const distance = this.pxTovw(this.imageList.length * this.width)
        this.$refs.list.style.transform = `translateX(-${distance}px)`
        this.$refs.list.style.transition = 'none'
        this.moveTo(this.imageList.length - 1)
      } else this.moveTo(this.count - 1)
    },
    // 向右移动到下一张图片
    toRight () {
      if (this.count === this.imageList.length - 1) {
        this.$refs.list.style.transform = 'translateX(100%)'
        this.$refs.list.style.transition = 'none'
        this.moveTo(0)
      } else this.moveTo(this.count + 1)
    },
    // 处理左侧切换按钮点击事件
    handleLeftClick () {
      this.toLeft()
      clearInterval(this.timer) // 清除原有的定时器
      this.auto() // 重新设置定时器
    },
    // 处理右侧切换按钮点击事件
    handleRightClick () {
      this.toRight()
      clearInterval(this.timer) // 清除原有的定时器
      this.auto() // 重新设置定时器
    },
    // 设置自动轮播的定时器
    auto () {
      this.timer = setInterval(() => {
        this.toRight()
      }, 2000)
    },
    // 处理鼠标滚轮事件，实现轮播图的左右切换
    handleWheel (e) {
      if (e.deltaY > 50) this.handleRightClick()
      if (e.deltaY < -50) this.handleLeftClick()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
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

<template>
  <!-- 计数器容器 -->
  <div class="counter">
    <!-- 减少按钮 -->
    <div class="left but" @click="handleLeft">-</div>
    <!-- 输入框，用于显示和修改计数器的值 -->
    <div class="inp">
      <input v-model="count" type="text" @change="handleChange">
    </div>
    <!-- 增加按钮 -->
    <div class="right but" @click="handleRight">+</div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data () {
    return {
      count: 1 // 初始化计数器值为1
    }
  },
  methods: {
    handleLeft () {
      if (this.count > 1) this.count-- // 如果计数值大于1，则减少
      this.change() // 触发变化事件
    },
    handleRight () {
      if (this.count < 99) this.count++ // 如果计数值小于99，则增加
      this.change() // 触发变化事件
    },
    handleChange (e) {
      const num = e.target.value // 获取输入框的值
      if (isNaN(num) || num < 1 || num > 99) {
        this.count = 1 // 如果值不是数字或超出范围，则重置为1
      } else {
        this.count = num // 否则更新计数值
      }
      this.change() // 触发变化事件
    },
    change () {
      this.$emit('count-change', this.count) // 触发自定义事件，传递当前计数值
    }
  }
}
</script>

<style scoped lang="scss">
.counter {
  display: flex; // 使用flex布局
  height: 43px;
  width: 220px;
  border: 1px solid black; // 边框样式
  .but {
    cursor: pointer; // 鼠标样式
    margin-top: -2px;
    height: 100%;
    width: 43px;
    font-size: 22px;
    text-align: center;
    line-height: 43px;
    user-select: none; // 禁止文本选择
  }
  input {
    display: block;
    height: 100%;
    width: 134px;
    background-color: inherit; // 继承背景颜色
    text-align: center;
    font-size: 16px;
  }
}
</style>

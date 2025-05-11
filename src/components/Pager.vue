<template>
  <!-- 分页器容器 -->
  <div class="pager">
    <!-- 向左的箭头，当pageNum大于1时显示 -->
    <div :class="pageNum>1&&'show'" class="left arrow" @click="handleLeftClick">&lt;</div>
    <!-- 分页项盒子 -->
    <div class="pager-box">
      <!-- 循环生成分页项 -->
      <li v-for="item in liNum" :key="item" :class="item===pageNum && 'active'" @click="handlepageClick(item)">{{ item }}</li>
    </div>
    <!-- 向右的箭头，当pageNum小于总页数时显示 -->
    <div :class="pageNum<liNum&&'show'" class="right arrow" @click="handleRightClick">&gt;</div>
  </div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    // 每页显示的条目数，默认为10
    pageSize: {
      type: Number,
      default: 10
    },
    // 总条目数，默认为1
    total: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      // 当前页码，默认为1
      pageNum: 1
    }
  },
  computed: {
    // 计算总页数
    liNum () {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    // 处理分页项点击事件
    handlepageClick (item) {
      this.pageNum = item
      this.$emit('on-change', this.pageNum) // 触发on-change事件，传递当前页码
    },
    // 处理向左箭头点击事件
    handleLeftClick () {
      if (this.pageNum > 1) {
        this.pageNum-- // 当前页码减1
        this.$emit('on-change', this.pageNum) // 触发on-change事件，传递当前页码
      }
    },
    // 处理向右箭头点击事件
    handleRightClick () {
      if (this.pageNum < this.liNum) {
        this.pageNum++ // 当前页码加1
        this.$emit('on-change', this.pageNum) // 触发on-change事件，传递当前页码
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pager {
  overflow: hidden;
  display: flex;
  height: 45px;
  .arrow {
    opacity: 0; // 默认不显示箭头
    cursor: pointer;
    width: 13px;
    margin: 10px;
    text-align: center;
    &:hover {
      border-bottom: 1px solid black;
    }
  }
  .show { // 当箭头需要显示时添加的类
    opacity: 1;
  }
  .left {
    margin-right: 7px;
  }
  .right {
    margin-left: 7px;
  }
  .pager-box {
    display: flex;
    li {
      cursor: pointer;
      text-align: center;
      line-height: 25px;
      font-size: 14px;
      margin: 10px 8px;
      width: 9px;
      &:hover {
        border-bottom: 1px solid black;
      }
    }
    .active { // 当前激活的分页项添加的类
      border-bottom: 1px solid black;
    }
  }
}
</style>

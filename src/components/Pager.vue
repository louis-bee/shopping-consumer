<template>
  <div class="pager">
    <div :class="pageNum>1&&'show'" class="left arrow" @click="handleLeftClick">&lt;</div>
    <div class="pager-box">
      <li v-for="item in liNum" :key="item" :class="item===pageNum && 'active'" @click="handlepageClick(item)">{{ item }}</li>
    </div>
    <div :class="pageNum<liNum&&'show'" class="right arrow" @click="handleRightClick">&gt;</div>
  </div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pageNum: 1
    }
  },
  computed: {
    liNum () {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    handlepageClick (item) {
      this.pageNum = item
      this.$emit('on-change', this.pageNum)
    },
    handleLeftClick () {
      if (this.pageNum > 1) {
        this.pageNum--
        this.$emit('on-change', this.pageNum)
      }
    },
    handleRightClick () {
      if (this.pageNum < this.liNum) {
        this.pageNum++
        this.$emit('on-change', this.pageNum)
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
    opacity: 0;
    cursor: pointer;
    width: 13px;
    margin: 10px;
    text-align: center;
    // background-color: pink;
    &:hover {
      border-bottom: 1px solid black;
    }
  }
  .show {
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
      // padding: 0 10px;
      width: 9px;
      // background-color: pink;
      &:hover {
        border-bottom: 1px solid black;
      }
    }
    .active {
      border-bottom: 1px solid black;
    }
  }
}
</style>

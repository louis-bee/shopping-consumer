<template>
  <div class="counter">
    <div class="left but" @click="handleLeft">-</div>
    <div class="inp"><input :value="num" disabled type="text"></div>
    <div class="right but" @click="handleRight">+</div>
  </div>
</template>

<script>
export default {
  name: 'CounterMini',
  props: {
    num: {
      type: Number
    }
  },
  methods: {
    handleLeft () {
      if (this.num > 1) {
        this.$emit('count-change', this.num - 1)
      }
    },
    handleRight () {
      if (this.num < 99) {
        this.$emit('count-change', this.num + 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.counter {
  display: flex;
  height: 35px;
  width: 105px;
  .but {
    cursor: pointer;
    margin-top: -2px;
    height: 100%;
    width: 35px;
    font-size: 20px;
    text-align: center;
    line-height: 35px;
    user-select: none;
  }
  input {
    display: block;
    height: 100%;
    width: 35px;
    background-color: inherit;
    // background-color: #fff;
    text-align: center;
    font-size: 16px;
  }
}
</style>

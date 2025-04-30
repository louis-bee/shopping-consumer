<template>
  <div class="counter">
    <div class="left but" @click="handleLeft">-</div>
    <div class="inp"><input v-model="count" type="text" @change="handleChange"></div>
    <div class="right but" @click="handleRight">+</div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data () {
    return {
      count: 1
    }
  },
  methods: {
    handleLeft () {
      if (this.count > 1) this.count--
      this.change()
    },
    handleRight () {
      if (this.count < 99) this.count++
      this.change()
    },
    handleChange (e) {
      const num = e.target.value
      if (isNaN(num) || num < 1 || num > 99) {
        this.count = 1
      } else {
        this.count = num
      }
      this.change()
    },
    change () {
      this.$emit('count-change', this.count)
    }
  }
}
</script>

<style scoped lang="scss">
.counter {
  display: flex;
  height: 43px;
  width: 220px;
  border: 1px solid black;
  .but {
    cursor: pointer;
    margin-top: -2px;
    height: 100%;
    width: 43px;
    font-size: 22px;
    text-align: center;
    line-height: 43px;
    user-select: none;
  }
  input {
    display: block;
    height: 100%;
    width: 134px;
    background-color: inherit;
    // background-color: #fff;
    text-align: center;
    font-size: 16px;
  }
}
</style>

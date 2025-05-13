<template>
  <div class="footer">
    <div class="wechat">
        <img src="@/assets/img/wechat.webp" alt="">
        <h4>联系客服</h4>
    </div>
    <div class="icp" v-if="first"><a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2025414122号-1</a></div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    first: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 400px;
  overflow: hidden;
  .wechat {
    margin-left: 1100px;
    margin-top: 155px;
    width: 150px;
    img{
      width: 150px;
      height: 150px;
    }
    h4 {
      margin-top: 10px;
      text-align: center;
    }
  }
  .icp {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #333;
      text-decoration: none;
      font-size: 12px;
      &:hover {
        opacity: 0.5;
      }
      &:active {
        opacity: 0.2;
      }
    }
  }
}
</style>

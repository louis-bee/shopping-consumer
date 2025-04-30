<template>
  <div class="footer">
    <div class="wechat">
        <img src="@/assets/img/wechat.jpg" alt="">
        <h4>联系客服</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
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
}
</style>

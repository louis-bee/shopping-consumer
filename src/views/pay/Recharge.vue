<template>
  <div class="pay">
    <img src="@/assets/img/wechatpay.webp" alt="">
    <input @click="pay" class="paid" type="button" value="我已完成支付">
    <a @click="$router.push('/pay')" href="#"><input class="cancel" type="button" value="取消"></a>
  </div>
</template>

<script>
export default {
  name: 'Recharge',
  methods: {
    async pay () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const params = {
        userId: userInfo.id,
        money: 1000
      }
      const res = await this.$apis.pay.recharge(params)
      if (res.status === 200) {
        userInfo.balance = res.data.balance
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        alert('充值成功！')
        this.$router.push('/pay')
      } else {
        alert('充值失败，请重试')
      }
    }
  }
}
</script>

<style>
.pay {
    margin: 120px auto;
    height: 250px;
    width: 250px;
  }
  .pay input {
    margin-top: 15px;
    text-align: center;
    padding: 10px;
    height: 40px;
    width: 250px;
    color: black;
  }
  .pay .paid:hover {
    background-color: rgb(50,200,100);
  }
  .pay .cancel:hover {
    background-color: rgb(216,216,212);
  }
</style>

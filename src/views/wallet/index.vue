<template>
    <div class="content-container">
        <Header>零钱</Header>
        <div class="wallet-container">
            <svg class="icon wallet-icon" aria-hidden="true">
              <use xlink:href="#icon-icon-" />
            </svg>
            <div class="wallet-info">
                <p class="wallet-info-p">我的零钱</p>
                <span class="wallet-info-span">￥12.25</span>
            </div>
            <div class="btn-container">
                <button type="button" class="mui-btn mui-btn-outlined l-btn" @click="toRouter(1)">充值</button>
                <button type="button" class="mui-btn mui-btn-outlined l-btn" @click="toRouter(2)">提现</button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  },
  methods: {
    toRouter (index) {
      switch (index) {
        case 1:
          this.$router.push('/recharge')
          break
        case 2:
          this.$router.push('/deposit')
          break
      }

    }
  }
}
</script>

<style scoped>
.wallet-container{
    /* margin-top: 40px; */
    display: flex;
    align-items: center;
    flex-direction: column;
}
.wallet-icon{
    font-size: 52px;
    margin-top: 80px;
}
.wallet-info{
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.wallet-info-p{
    color:black;
    margin-bottom: 15px;
}
.wallet-info-span{
    font-weight: bold;
    font-size: 26px;
}
.btn-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
}
.btn-container>button{
    margin-bottom: 20px;
    width: 120px;
}
.btn-container>button:nth-child(1){
    background-color: #6e8b3d;
    color: white;
}
</style>
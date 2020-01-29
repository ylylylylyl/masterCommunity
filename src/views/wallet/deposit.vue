<template>
    <div class="content-container">
        <Header>提现</Header>
        <div class="deposit-container">
            <div class="deposit-content">
                <div class="depodit-title">
                    <span>到账银行卡</span>
                    <div>
                         <div class="recharge-bank" @click="chooseBank()">
                            <svg class="icon wallet-icon" aria-hidden="true">
                                <use xlink:href="#icon-zhongguoyinhang" />
                            </svg>
                            <span class="bank-name">中国银行(4858)</span>
                            <p class="bank-tip">两小时内到账</p>    
                        </div>
                    </div>
                </div>
                <div class="deposit-main">
                    <span>提现金额</span>
                    <div class="pay-container">
                        <span class="icon-pay">￥</span>
                        <input type="text" class="mui-input-clear" placeholder="请输入金额">
                    </div>
                    <div class="btn-container">
                        <p>当前零钱余额12.02元，<a>全部提现</a></p>
                        <button id='promptBtn' type="button" class="mui-btn mui-btn-outlined l-btn">提现</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-container{
    background-color: #EDEDED;
}
.deposit-container{
    padding: 15px;
    padding-top: 40px;  
}
.deposit-content{
    background: white;
    width: 100%;
    height: 300px;
    border-radius: 5px;
    margin-top: 35px;
}
.depodit-title{
    display: flex;
    background-color: whitesmoke;
    padding: 25px;
}
.icon{
    margin-left: 10px;
}
.bank-name{
    margin-right: 15px;
}
.bank-tip{
    margin-left: 15px;
}
.deposit-main{
    padding: 25px;
}
.icon-pay{
    font-weight: bold;
    font-size: 32px;
}
.pay-container{
    display: flex;
    align-items: center;
    margin-top: 15px;
    border-bottom: 1px lightgrey solid;
}
.btn-container{
    margin-top: 15px;
}
.mui-btn{
    width: 100%;
    margin-top: 15px;
    background-color: #6e8b3d;
    color: white
}
input{
    border: none
}
</style>

<script>
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  },
  mounted () {
    document.getElementById('promptBtn').addEventListener('tap', function (e) {
      e.detail.gesture.preventDefault() // 修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
      var btnArray = ['取消', '确定']
      mui.prompt('请输入支付密码：', '', '提现到银行卡', btnArray, function (e) {
        if (e.index == 1) {
        //   info.innerText = '谢谢你的评语：' + e.value
        } else {
        //   info.innerText = '你点了取消按钮'
        }
      })
      document.querySelector('.mui-popup-input input').type='password'
    })
  },
  methods: {
    chooseBank () {
      var picker = new mui.PopPicker()
      picker.setData(this.bankdata)
      picker.show(function (items) {
        // 返回 false 可以阻止选择框的关闭
        // return false;
      })
    }
  }
}
</script>
<template>
    <div class="content-container">
        <Header>充值</Header>
        <div class="recharge-container">
            <div class="recharge-title">
                <span>充值方式</span>
                <div class="recharge-bank" @click="chooseBank()">
                    <svg class="icon wallet-icon" aria-hidden="true">
                        <use xlink:href="#icon-zhongguoyinhang" />
                    </svg>
                    <span>中国银行(4858)</span>
                </div>
            </div>
            <div class="recharge-content">
                <span>充值金额</span>
                <div class="input-container">
                    <strong class="pay-icon">￥</strong>
                    <input type="text" class="mui-input-clear" placeholder="请输入金额">
                </div>
            </div>
            <button id='promptBtn' type="button" class="mui-btn mui-btn-outlined l-btn">充值</button>
        </div>
    </div>
</template>

<style scoped>
.recharge-container{
    padding-top: 40px;
}
.recharge-title{
    padding-top: 20px;
    padding-left: 15px;
    background-color: whitesmoke;
    padding-bottom: 60px;
    display: flex;
}
.recharge-bank{
    margin-left: 15px;
}
.recharge-content{
    width: 100%;
    border-radius: 15px;
    padding: 25px;
}
.pay-icon{
    font-size: 26px;
}
.input-container{
    display: flex;
    align-items:center;
}
.mui-input-clear{
    bottom: 0;
    border: none
}
.mui-btn{
    display: block;
    background-color: #6e8b3d;
    color: white;
    margin: 0 auto;
    width: 80%;
    margin-top: 20px;
}
</style>

<script>
import Header from '../../components/LeftHeader'
import InputPassword from '../../components/InputPassword'
export default {
  components: {
    Header,
    InputPassword
  },
  data () {
    return {
      bankdata: [
        {value: '4858', text: '中国银行'},
        {value: '4851', text: '中国工商银行'},
        {value: '4852', text: '中国建设银行'},
        {value: '4853', text: '中国农业银行'},
      ]
    }
  },
  mounted () {
    var info = document.getElementById('info')
    document.getElementById('promptBtn').addEventListener('tap', function (e) {
      e.detail.gesture.preventDefault() // 修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
      var btnArray = ['取消', '确定']
      mui.prompt('请输入支付密码：', '', '充值到零钱', btnArray, function (e) {
        if (e.index == 1) {
        //   info.innerText = '谢谢你的评语：' + e.value
        } else {
        //   info.innerText = '你点了取消按钮'
        }
      })
      document.querySelector('.mui-popup-input input').type='password'
    })
  },
  methods:{
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
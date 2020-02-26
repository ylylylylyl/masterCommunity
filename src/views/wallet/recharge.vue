<template>
    <div class="content-container">
        <Header>充值</Header>
        <div class="recharge-container">
            <div class="recharge-title">
                <span>充值方式</span>
                <div class="recharge-bank" @click="chooseBank()">
                    <svg class="icon wallet-icon" aria-hidden="true">
                        <use :xlink:href="this.bankIcon" />
                    </svg>
                    <span>{{this.defaultBankCard}}</span>
                </div>
            </div>
            <div class="recharge-content">
                <span>充值金额</span>
                <div class="input-container">
                    <strong class="pay-icon">￥</strong>
                    <input v-model="money" type="text" class="mui-input-clear" placeholder="请输入金额">
                </div>
            </div>
            <button
            :disabled='!money'
            id='promptBtn'
            type="button"
            class="mui-btn mui-btn-outlined l-btn">
            充值
            </button>
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
import {POSITIVE_NUMBER} from '../../utils/rej'
import {insertDetail} from '../../utils/util'
import {mapGetters} from 'vuex'
export default {
  components: {
    Header,
    InputPassword
  },
  data () {
    return {
      bankCardData: [],
      root: process.env.API_HOST,
      defaultBankCard: '',
      binkid: '',
      money: '',
      bankIcon: ''
    }
  },
  computed: {
    ...mapGetters(['curUserInfo'])
  },
  mounted () {
    this.init()
    this.initBankCard()
  },
  methods: {
    init () {
      var info = document.getElementById('info')
      document.getElementById('promptBtn').addEventListener('tap', (e) => {
        if (!POSITIVE_NUMBER.test(this.money)) {
          mui.toast('请输入正确的金额！')
          return
        }
        e.detail.gesture.preventDefault() // 修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
        var btnArray = ['取消', '确定']
        mui.prompt('请输入支付密码：', '', '充值到零钱', btnArray, (e) => {
          if (e.index == 1) {
            const {userid} = this.$cookies.get('CUR_USERINFO')
            this.$ajax.post({
              url: this.root + 'user/selectPayPwd',
              data: {userid}
            })
              .then(res => {
                if (res.result === e.value) {
                  this.recharge()
                } else {
                  mui.toast('密码错误')
                }
              })
          } else {
          //   info.innerText = '你点了取消按钮'
          }
        })
        document.querySelector('.mui-popup-input input').type='password'
      })
    },
    chooseBank () {
      var picker = new mui.PopPicker()
      picker.setData(this.bankCardData)
      picker.show( (items) => {
        this.defaultBankCard = items[0].text
        this.bankid = items[0].bankid
        this.bankIcon = this.initIcon(items[0].bankcompany)
        // 返回 false 可以阻止选择框的关闭
        // return false;
      })
    },
    initBankCard () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'bankcard/selectbankcard',
        data: {userid}
      })
        .then(res => {
          if (res.status) {
            this.bankCardData = res.result
            this.bankCardData.map(item => {
              item.value = item.bankcardnum.slice(item.bankcardnum.length - 5, item.bankcardnum.length - 1)
              item.text = item.bankcompany + '(' + item.value + ')'
              return item
            })
            this.defaultBankCard = this.bankCardData[0].text
            this.bankid = this.bankCardData[0].bankid
            this.bankIcon = this.initIcon(this.bankCardData[0].bankcompany)
          }
        })
    },
    // 充值接口
    recharge () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      const bankid = this.bankid
      const money = Number(this.money)
      const params = {
        userid,
        bankid,
        money
      }
      this.$ajax.post({
        url: this.root + 'bankcard/recharge',
        data: params
      })
        .then(res => {
          if (res.status) {
            this.$router.push('/wallet')
            this.insert(money) // 添加明细
          } else {
            mui.toast(res.result)
          }
        })
        
    },
    // 渲染银行图标
    initIcon (company) {
      switch (company) {
        case '中国银行':
          return '#icon-zhongguoyinhang'
        case '招商银行':
          return '#icon-yinhanglogo-'
        case '农业银行':
          return '#icon-nongyeyinhang'
        case '建设银行':
          return '#icon-jiansheyinhang'
        case '中国工商银行':
          return '#icon-ICBC'
        case '交通银行':
          return '#icon-jiaotongyinhang'
        default:
          return '未知'
      }
    },
    insert (money) {
      const type = 2
      const changemoney = money
      const changedetail = '充值到账'
      const userid = this.$cookies.get('CUR_USERINFO').userid
      const params = {type, changemoney, changedetail, userid}
      insertDetail(params)
    }
  }
}
</script>
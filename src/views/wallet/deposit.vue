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
                                <use :xlink:href="this.bankIcon" />
                            </svg>
                            <span class="bank-name">{{this.defaultBankCard}}</span>
                            <p class="bank-tip">两小时内到账</p>    
                        </div>
                    </div>
                </div>
                <div class="deposit-main">
                    <span>提现金额</span>
                    <div class="pay-container">
                        <span class="icon-pay">￥</span>
                        <input v-model="money" type="text" class="mui-input-clear" placeholder="请输入金额">
                    </div>
                    <div class="btn-container">
                        <p>当前零钱余额{{walletbalance}}元，<a @click="e=>depositAl(e)">全部提现</a></p>
                        <button
                          :disabled='!money||loading'
                          id='promptBtn'
                          type="button"
                          class="mui-btn mui-btn-outlined l-btn">
                          {{loading?'提现中...':'提现'}}
                        </button>
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
import {mapGetters} from 'vuex'
import {POSITIVE_NUMBER} from '../../utils/rej'
import {insertDetail} from '../../utils/util'
export default {
  components: {
    Header
  },
  mounted () {
    this.init()
    this.initBankCard()
  },
  data () {
    return {
      money: '',
      defaultBankCard: '',
      bankIcon: '',
      bankid: '',
      root: process.env.API_HOST,
      bankCardData: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['curUserInfo']),
    walletbalance () {
      return this.$route.query.walletbalance
    }
  },
  methods: {
    chooseBank () {
      var picker = new mui.PopPicker()
      picker.setData(this.bankCardData)
      picker.show((items) => {
        this.defaultBankCard = items[0].text
        this.bankid = items[0].bankid
        this.bankIcon = this.initIcon(items[0].bankcompany)
        // 返回 false 可以阻止选择框的关闭
        // return false;
      })
    },
    init () {
      document.getElementById('promptBtn').addEventListener('tap', (e) => {
        e.detail.gesture.preventDefault() // 修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
        if (!POSITIVE_NUMBER.test(this.money)) {
          mui.toast('请输入正确的金额！')
          return
        }
        var btnArray = ['取消', '确定']
        mui.prompt('请输入支付密码：', '', '提现到银行卡', btnArray, (e) => {
          if (e.index == 1) {
            const {userid} = this.$cookies.get('CUR_USERINFO')
            this.$ajax.post({
              url: this.root + 'user/selectPayPwd',
              data: {userid}
            })
              .then(res => {
                if (res.result === e.value) {
                  this.deposit()
                } else {
                  mui.toast('密码错误')
                }
              })
          //   info.innerText = '谢谢你的评语：' + e.value
          } else {
          //   info.innerText = '你点了取消按钮'
          }
        })
        document.querySelector('.mui-popup-input input').type='password'
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
    // 点击全部提现
    depositAl (e) {
      e.preventDefault()
      this.money = this.walletbalance
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
    // 提现
    deposit () {
      this.loading = true
      const {userid} = this.$cookies.get('CUR_USERINFO')
      const bankid = this.bankid
      const money = this.money
      const params = {
        userid, bankid, money
      }
      this.$ajax.post({
        url: this.root + 'bankcard/deposit',
        data: params
      })
        .then(res => {
          this.loading = false
          if (res.status) {
            this.$router.push('/wallet')
            this.insert(money) // 添加明细
          } else {
            mui.toast(res.result)
          }
        }, err => {
          this.loading = false
        })
    },
    insert (money) {
      const type = 1
      const changemoney = money
      const changedetail = '零钱提现'
      const userid = this.$cookies.get('CUR_USERINFO').userid
      const params = {type, changemoney, changedetail, userid}
      insertDetail(params)
    }
  }
}
</script>
<template>
    <div class="content-container">
        <Header>生活缴费</Header>
        <div class="livingpay-container">
            <div class="living-title">
                <svg class="icon living-icon" aria-hidden="true">
                    <use :xlink:href="$route.query.type|initIcon" />
                </svg>
                <span class="living-span" ref="myP"> {{$route.query.type|initPayType}}</span>
            </div>
            <!-- <div class="living-title">
                <svg class="icon living-icon" aria-hidden="true">
                    <use :xlink:href="type" />
                </svg>
                <span class="living-span" ref="myP"> {{type}}</span>
            </div> -->
            <div class="living-content-container">
                <div class="content-item">
                    <span>缴费单位</span>
                    <p>国网供电公司</p>
                </div>
                <div class="content-item">
                    <span>缴费户号</span>
                    <p>{{bindInfo.livingnumid}}</p>
                </div>
                <div class="content-item">
                    <span>户名</span>
                    <p>{{bindInfo.houseowner}}</p>
                </div>
                <div class="content-item">
                    <span>住址信息</span>
                    <p>{{bindInfo.chooseaddr}}</p>
                </div>
            </div>
            <div class="pay-container">
                <span class="pay-container-span">选择充值金额</span>
                <div class="btn-container">
                    <button type="button" @click="initClick(1)">10元</button>
                    <button type="button" @click="initClick(2)">50元</button>
                    <button type="button" @click="initClick(3)">100元</button>
                    <button type="button" @click="initClick(4)">200元</button>
                </div>
                <input v-model="money" type="text" class="mui-input-clear" placeholder="输入其他金额"/>
                <button
                id='promptBtn'
                type="button"
                class="mui-btn mui-btn-outlined l-btn"
                :disabled="!money"
                >
                {{!loading?'立即缴费':'缴费中...'}}
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>

.livingpay-container{
    padding-top: 40px;

}
.living-title{
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px lightgray solid;
    background-color: white;

}
.living-icon{
    font-size: 32px;
}
.living-span{
    color: grey;
    font-size: 16px;
    margin-left: 15px;
}
.content-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: white;

}
.pay-container{
    margin-top: 20px;
    background-color: white;
    padding: 10px;
}
.living-content-container{
    border-bottom: 20px rgba(245, 245, 245, 0.938) solid;
}
.pay-container-span{
    font-size: 16px;
    font-weight: bold;
}
.btn-container{
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
}
.btn-container>button{
    width: 80px;
    height: 40px;
}
.mui-input-clear{
    margin-top: 20px;
}
.mui-btn-outlined{
    background-color: #6e8b3d;
    color: white;
    margin-top: 30px;
    width: 100%;
    height: 45px;
}
</style>
<script>
import Header from '../../components/LeftHeader'
import {mapGetters} from 'vuex'
import {MONEY} from '../../utils/rej'
import {insertDetail} from '../../utils/util'
export default {
  components: {
    Header
  },
  data () {
    return {
      money: '',
      root: process.env.API_HOST,
      bindInfo: { },
      loading: false
    }
  },
  computed: {
    ...mapGetters(['curUserInfo']),
    type () {
      console.log(this.$route.query.type)
      return this.$route.query.type
    },
    livingnumid () {
      return this.$route.query.livingnumid
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
      this.initData()
    })
  },
  methods: {
    init () {
      document.getElementById('promptBtn').addEventListener('tap', (e) => {
        e.detail.gesture.preventDefault() // 修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
        if (!MONEY.test(this.money)) {
          mui.toast('请输入正确的金额')
          return
        }
        var btnArray = ['取消', '确定']
        mui.prompt('请输入支付密码：', '', '缴费', btnArray, (e) => {
          if (e.index == 1) {
            const {userid} = this.$cookies.get('CUR_USERINFO')
            this.$ajax.post({
              url: this.root + 'user/selectPayPwd',
              data: {userid}
            })
              .then(res => {
                if (res.result === e.value) {
                  this.toPay()
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
    initClick (index) {
      switch (index) {
        case 1:
          this.money = 10
          break
        case 2:
          this.money = 50
          break
        case 3:
          this.money = 100
          break
        case 4:
          this.money = 200
          break
      }
    },
    initData () {
      this.$ajax.post({
        url: this.root + 'bindhouse/selectbylivingid',
        data: {
          livingnumid: Number(this.livingnumid)
        }
      })
        .then(res => {
          if (res.status) {
            this.bindInfo = res.object
          }
        })
    },
    toPay () {
      this.loading = true
      const money = this.money
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'user/updateWallet',
        data: {userid, money}
      })
        .then(res => {
          this.loading = false
          if (res.status) {
            this.getRecord()
            this.addDetail()
          } else {
            mui.toast(res.result)
          }
        }, err => {
          this.loading = false
      })
    },
    // 生成缴费记录
    getRecord () {
      const {livingnumid, houseowner, chooseaddr} = this.bindInfo
      const type = String(this.type)
      const money = this.money
      const userid = this.curUserInfo.userid
      const params = {
        livingnumid, houseowner, chooseaddr, money, userid, type
      }
      this.$ajax.post({
        url: this.root + 'livingorder/insertOrder',
        data: params
      })
        .then(res => {
          if (res.status) {
            mui.toast('缴费成功')
            this.$router.push('/livingpayment')
          }
        })
    },
    // 添加零钱明细
    addDetail () {
      const type = 1
      const changemoney = this.money
      const changedetail = '日常缴费'
      const userid = this.$cookies.get('CUR_USERINFO').userid
      const params = {type, changemoney, changedetail, userid}
      insertDetail(params)
    }
  },
  filters: {
    initIcon (type) {
      if (!type) return
      switch (type) {
        case 1:
          return '#icon-ranqifei'
        case 2:
          return '#icon-dianfei'
        case 3:
          return '#icon-shuifei'
      }
    },
    initPayType (type) {
      if (!type) return
      switch (type) {
        case 1:
          return '燃气费'
        case 2:
          return '电费'
        case 3:
          return '水费'
      }
    }
  }
}
</script>
<template>
    <div class="content-container">
        <Header>银行卡</Header>
        <div class="bank-card-container"  id="OA_task_1" >
            <div class="bank-card-item mui-table-view-cell" v-for="item in this.bankCardData" :key="item.bankid">
                <div class="mui-slider-right mui-disabled" @click="(e)=>deletebank(e,item.bankid)">
                    <a class="mui-btn mui-btn-red">注销银行卡</a>
                </div>
              <div class="bank-card-item mui-slider-handle">
                  <div class="bank-icon-container">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.bankcompany| initIcon"/>
                    </svg>
                </div>
                <div class="bank-card-info">
                    <div class="card-info-title">
                        <span class="bank-name-span">{{item.bankcompany}}</span>
                        <p class="bank-type-p">储蓄卡</p>
                    </div>
                    <p class="bank-num-p">.... .... .... {{item.bankcardnum.slice(12,16)}}</p>
                </div>
              </div>

            </div>
        </div>
        <div class="bank-add-container" @click="$router.push('/addcard')">
            <span class="mui-icon mui-icon-plusempty"></span>
            <span>添加银行卡</span>
        </div>
    </div>
</template>

<style scoped>
    .content-container{
        background-color: #EDEDED;
    }
    .bank-card-container{
        
        padding: 55px 15px 15px 15px;
    }
    .bank-card-item{
        /* height: 100px; */
        background-color: #C75056 !important;
        display: flex;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;
    }
    .bank-icon-container{
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-color: #EBCCCB;
        display: flex;
        justify-content: center;
        align-items: center;
       
    }
    .bank-icon-container>svg{
        font-size: 26px;
    }
    .bank-card-info{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .bank-name-span{
        font-weight: bold;
        color: white;
        margin-bottom: 5px;
    }
    .bank-type-p{
        color: lightgray;
    }
    .bank-num-p{
        color: white;
        font-weight: bold;
        font-size: 32px;
    }
    .bank-add-container{
        height: 60px;
        background-color: white;
        border-radius: 5px;
        margin: 5px 15px;
        padding: 15px;
        display: flex;
        align-items: center;
    }
    .bank-add-container>span{
        margin-right: 15px
    }
</style>

<script>
import {mapGetters} from 'vuex'
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  },
  data () {
    return {
      root: process.env.API_HOST,
      bankCardData: []
    }
  },
  computed: {
    ...mapGetters(['curUserInfo'])
  },
  mounted () {
    this.initBankCard()
    // this.initMui()
  },
  filters: {
    initIcon (item) {
      switch (item) {
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
    }
  },
  methods: {
    initBankCard () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'bankcard/selectbankcard',
        data: {userid}
      })
        .then(res => {
          if (res.status) {
            this.bankCardData = res.result
          }
        })
    },
    deletebank (e, bankid) {
      let btnArray = ['确认', '取消']
      let li = e.target.parentNode.parentNode
      let that = this
      mui.confirm('确认解除绑定该银行卡？', '解除绑定', btnArray, (e) => {
        if (e.index == 0) {
          that.remove(bankid,li)
        } else {
          mui.swipeoutClose(li)
        }
      })
    },
    remove (bankid,li) {
      this.$ajax.post({
        url: this.root + 'bankcard/remove',
        data: {bankid}
      })
        .then(res => {
          if (res.status) {
            mui.swipeoutClose(li)
            this.initBankCard()
          }
        })
    }
  }
}
</script>
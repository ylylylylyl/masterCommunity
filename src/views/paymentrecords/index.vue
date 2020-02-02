<template>
    <div class="com-container">
        <BackHeader>缴费记录</BackHeader>
        <div class="records-content">
            <div class="records-content-item" v-for="(item1,key) in listData" :key="key">
                <div class="item-title">
                    <span class="records-month">{{key}}</span>
                    <span class="records-pay">支出￥{{sum(item1)}}</span>
                </div>
                <div class="item-main">
                    <div class="item-records" v-for="(item,key) in item1" :key="key">
                        <div class="item-records-left">
                             <svg class="icon" aria-hidden="true">
                                <use :xlink:href='item.livingtype|initIcon'></use>
                            </svg>
                            <div class="item-records-time">
                                <span>{{item.livingtype|initTitle}}-我家</span>
                                <p>日常缴费</p>
                                <p>{{item.paytime|format}}</p>
                            </div>
                        </div>
                        <span class="item-records-right">-￥{{item.pay}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-container">
            <span>仅展示近6个月的记录</span>
        </div>
    </div>

</template>
<style scoped>
    p{
        margin-bottom: 0px;
    }
    .header{
        background-color: white;
        display: flex;
        align-items: center;
    }
    /* 账单 */
    .records-month{
        display: flex;
        border: 1px lightgray solid;
        background: white;
        font-size:12px;
        border-radius: 10px;
        width: 70px;
        height:25px;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    .item-title{
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }
    .records-pay{
        color: gray;
    }

    .item-records{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        background: white;
        padding-right: 10px;
        border-bottom: 1px solid lightgray;
    }
    .item-records-left{
        display: flex;
        align-items: center;
    }
    .item-records-time{
        display: flex;
        flex-direction: column;
        justify-content:center;
    }
    .item-records-right{
        font-weight: bold;
        font-size: 16px;
        color: darkred;
    }
    .icon{
        font-size: 35px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .footer-container{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        color: gray;
        margin-bottom: 20px;
    }
</style>

<script>
import BackHeader from '../../components/LeftHeader'
var _=require('lodash')
export default {
  components: {
    BackHeader
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      root: process.env.API_HOST,
      listData:[]
    }
  },
  computed: {
    livingnumid () {
      return this.$route.query.livingnumid
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    init () {
      this.$ajax.post({
        url: this.root + 'livingorder/selectMonthOrder',
        data: {
          livingnumid: this.livingnumid
        }
      })
        .then(res => {
          if (res.status) {
            let list = res.result.sort((a, b) => {
              return b.paytime - a.paytime
            })
            // var re = _.groupBy(list, function (item) {
            //   return ((new Date(item.paytime).getYear() + 1900) + '-' + (new Date(item.paytime).getMonth() + 1) )
            // })
            let re = _.groupBy(list, function (item) {
              return ((new Date(item.paytime).getYear() + 1900) + '-' + (new Date(item.paytime).getMonth() + 1) )
            })
            console.log(re)
            this.listData = re
          }
        })
    },
    sum (arr) {
      return arr.reduce((sum, todo) => {
        return sum + todo.pay
      }, 0)
    }
  },
  filters: {
    initIcon (item) {
      switch (item) {
        case '1':
          return '#icon-ranqifei'
        case '2':
          return '#icon-dianfei'
        case '3':
          return '#icon-shuifei'
      }
    },
    initTitle (item) {
      switch (item) {
        case '1':
          return '燃气费'
        case '2':
          return '电费'
        case '3':
          return '水费'
      }
    }
  }
}
</script>

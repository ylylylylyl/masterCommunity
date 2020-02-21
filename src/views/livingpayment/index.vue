<template>
    <div class="living-content">
        <div class="l-header">
            <div class="header-left">
                <span class="mui-icon mui-icon-arrowleft" @click="goback()"></span>
                <span class="living-title">生活缴费·智慧小区</span>
            </div>
            <div class="header-right">
                <span class="living-title" @click="torecords()"> 缴费记录</span>

            </div>

        </div>
        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">
                <span>我家</span>
                <span class="mui-icon mui-icon-more"></span>
            </div>
            <!--内容区-->
            <div class="mui-card-content">
                <div class="pay-item" @click="toAddPay(1)">
                    <div class="pay-item-top">
                        <svg class="icon icon-svg" aria-hidden="true">
                            <use xlink:href="#icon-ranqifei"></use>
                        </svg>
                        <div>
                            <span class="pay-title">燃气费</span>
                            <p>{{livingnumid||'点击添加户号'}}</p>
                        </div>
                    </div>
                    <div>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </div>
                <div class="pay-item" @click="toAddPay(2)">
                  <div class="pay-item-top">
                      <svg class="icon icon-svg" aria-hidden="true">
                          <use xlink:href="#icon-dianfei"></use>
                      </svg>
                      <div>
                          <span class="pay-title">电费</span>
                          <p>{{livingnumid||'点击添加户号'}}</p>
                      </div>
                    </div>
                    <div>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </div>
                 <div class="pay-item" @click="toAddPay(3)">
                    <div class="pay-item-top">
                        <svg class="icon icon-svg" aria-hidden="true">
                            <use xlink:href="#icon-shuifei"></use>
                        </svg>
                        <div>
                            <span class="pay-title">水费</span>
                            <p>{{livingnumid||'点击添加户号'}}</p>
                        </div>
                    </div>
                    <div>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </div>
            </div>
        </div>
        <div id="echart" class="echart">

        </div>
        <Loading v-if="loading"/>
    </div>
</template>
<style scoped>
    .living-content{
        height: 100vh;
    }
    /* header */
    .l-header{
        display: flex;
        height: 150px;
        background-color: #6E8B3D;
        justify-content: space-between;

        padding-top: 10px;

    }
    .header-right{
        margin-right: 10px;
    }
    .living-title,.mui-icon-arrowleft{
        color: white;
        font-size: 14px;
        margin-left: 5px;
    }
    .mui-icon-arrowleft{
        font-size: 24px;
    }
    /* content */
    .mui-card{
        position: absolute;
        top: 60px;
        width: 95%;

    }
    .mui-icon-more{
      font-weight: bolder;
    }
    .mui-card-header:after, .mui-card-footer:before{
        height: 0;/**去掉card中间横线 */

    }
    .pay-item-top{
        display: flex;
    }
    .icon-svg{
        font-size: 30px;
        margin-left: 10px;
        margin-right: 20px;
    }
    .pay-title{
        font-weight: bold;
    }
    .pay-item{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        border-bottom: 1px rgb(228, 225, 225) solid;
        padding-bottom: 10px;
    }
    /* 图表 */
    .echart{
        top: 200px;
        height: 200px;
    }
</style>
<script>
import Loading from '../../components/Loading'
var _=require('lodash')
export default {
  async mounted () {
    this.paymentinit()
    console.log(this.createDateDate())
  },
  components: {
    Loading
  },
  data () {
    return {
      root: process.env.API_HOST,
      livingnumid: '', // 户号
      object: {},
      loading: false
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    async echartsinit (livingnumid) {
      await this.$ajax.post({
        url: this.root + 'livingorder/selectMonthOrderByTpe',
        data: {livingnumid}
      })
        .then(res => {
          if (res.status) {
            this.loading = false
            this.object = res.object
            _.groupBy(res.result, function (item) {
              return item.livingtype
            })
          }
        })
      var echarts = require('echarts')
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart'))
      myChart.setOption({
        title: {
          text: '统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['水费', '电费', '气费']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.createDateDate()
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '水费',
            type: 'line',
            stack: '总量',
            data: this.object.waterData
          },
          {
            name: '电费',
            type: 'line',
            stack: '总量',
            data: this.object.electricity
          },
          {
            name: '气费',
            type: 'line',
            stack: '总量',
            data: this.object.gas
          }

        ]
      })
    },
    paymentinit () {
      const {bindid} = this.$cookies.get('CUR_BINDINFO')
      this.loading = true
      this.$ajax.post({
        url: this.root + 'bindhouse/selectdetail',
        data: {bindid: Number(bindid)}
      })
        .then(res => {
          if (res.status) {
            this.livingnumid = res.object.livingnumid
          }
        })
        .then(() => {
          this.echartsinit(this.livingnumid)
        }

        )
    },
    torecords () {
      this.$router.push({
        path: '/paymentrecords',
        query: {
          livingnumid: this.livingnumid
        }
      })
    },
    toAddPay (index) {
      if (!this.livingnumid) {
        this.$router.push('/addpayuser')
      } else {
        this.$router.push({
          path: '/livingpay',
          query: {
            type: index,
            livingnumid: this.livingnumid
          }
        })
      }
    },
    toRouter () {
      this.$router.push('/livingpay')
    },
    createDateDate () {
      var dataArr = []
      var data = new Date()
      var year = data.getFullYear()
      data.setMonth(data.getMonth() + 1, 1) // 获取到当前月份,设置月份
      for (var i = 0; i < 6; i++) {
        data.setMonth(data.getMonth() - 1) // 每次循环一次 月份值减1
        var m = data.getMonth() + 1
        m = m < 10 ? '0' + m : m
        dataArr.push(data.getFullYear() + '-' + m)
      }
     return dataArr.reverse();
    }
  }
}
</script>

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
                <div class="pay-item" @click="toAddPay()">
                    <div class="pay-item-top">
                        <svg class="icon icon-svg" aria-hidden="true">
                            <use xlink:href="#icon-ranqifei"></use>
                        </svg>
                        <div>
                            <span class="pay-title">燃气费</span>
                            <p>{{livingnumid}}</p>
                        </div>
                    </div>
                    <div>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </div>
                <div class="pay-item">
                  <div class="pay-item-top">
                      <svg class="icon icon-svg" aria-hidden="true">
                          <use xlink:href="#icon-dianfei"></use>
                      </svg>
                      <div>
                          <span class="pay-title">电费</span>
                          <p>{{livingnumid}}</p>
                      </div>
                    </div>
                    <div>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </div>
                 <div class="pay-item">
                    <div class="pay-item-top">
                        <svg class="icon icon-svg" aria-hidden="true">
                            <use xlink:href="#icon-shuifei"></use>
                        </svg>
                        <div>
                            <span class="pay-title">水费</span>
                            <p>{{livingnumid}}</p>
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
    }
    /* 图表 */
    .echart{
        top: 200px;
        height: 200px;
    }
</style>
<script>
export default {
  mounted () {
    this.echartsinit()
    this.paymentinit()
  },
  data () {
    return {
      root: process.env.API_HOST,
      livingnumid: '' // 户号
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    echartsinit () {
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
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '水费',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '电费',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '气费',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }

        ]
      })
    },
    paymentinit () {
      const bindid = localStorage.getItem('bindid')
      this.$ajax.post({
        url: this.root + 'bindhouse/selectdetail',
        data: {bindid: Number(bindid)}
      })
        .then(res => {
          if (res.status) {
            this.livingnumid = res.object.livingnumid
          }
        })
    },
    torecords () {
      this.$router.push('/paymentrecords')
    },
    toAddPay () {
      if (!this.livingnumid) this.$router.push('/addpayuser')
    }

  }
}
</script>

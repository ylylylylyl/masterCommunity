<template>
    <div style="height:100%" >
        <Header>一键开门</Header>
        <div class='container'>
            <div class="qrcode-container">
                <canvas id="QRCode"></canvas>
            </div>
            <span>请将二维码对准扫描器</span>
            <!-- <span class="date-span">该二维码有效期至{{getFiveMinDate()}}</span> -->
        </div>

    </div>

</template>
<style scoped>
    .container{
        padding-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #e9e9e9;
        height: 100%;
        flex-direction: column;
    }
    .qrcode-container{
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        width: 100%;
    }
    #QRCode{
        height: 300px !important;
        width: 300px !important;
    }
    .date-span{
        margin-top: 10px;
    }
</style>
<script>
import QRCode from 'qrcode' // 引入生成二维码插件
import Header from '../../components/LeftHeader'
export default {
  data () {
    return {
      QRCodeMsg: '' // 生成二维码信息
    }
  },
  components: {
    Header
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.QRCodeMsg = window.location.href// 生成的二维码为URL地址
    },
    // 获取十分钟后的时间
    getFiveMinDate () {
      var date = new Date() // 1. js获取当前时间
      var min = date.getMinutes()  // 2. 获取当前分钟
      date.setMinutes(min + 10)  // 3. 设置当前时间+10分钟：把当前分钟数+10后的值重新设置为date对象的分钟数
      var y = date.getFullYear()
      var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
      var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getseconds()) : date.getSeconds()
      var formatdate = y+'-'+m+'-'+d + " " + h + ":" + f + ":" + s;
      return formatdate // 获取10分钟后的时间，格式为yyyy-mm-dd h:f:s
    }
  },
  watch: {
    // 通过监听获取数据
    QRCodeMsg (val) {
      // 获取页面的canvas
      var msg = document.getElementById('QRCode')
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, val, function (error) {
        console.log(error)
      })
    }
  }
}
</script>

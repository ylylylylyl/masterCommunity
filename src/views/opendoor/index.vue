<template>
    <div style="height:100%" >
        <Header>一键开门</Header>
        <div class='container'>
            <div class="qrcode-container">
                <canvas id="QRCode"></canvas>
            </div>
            <span class="date-span">该二维码有效期至2019-11-30</span>

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

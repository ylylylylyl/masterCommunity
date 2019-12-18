<template>
  <div>
    <Header>房屋详情</Header>
    <div class="container">
      <div class="item">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fangwu" />
          </svg>
          <span>房屋基本信息</span>
        </div>
      </div>
      <div class="item">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yonghu" />
          </svg>
          <span>业主</span>
        </div>
        <span>张三</span>
      </div>
      <div class="item">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianhua1" />
          </svg>
          <span>电话</span>
        </div>
        <span>18780522456</span>
      </div>
      <div class="item">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fangwu" />
          </svg>
          <span>房号</span>
        </div>
        <span>1-230</span>
      </div>
      <div class="item">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dizhi" />
          </svg>
          <span>地址</span>
        </div>
        <span>海棠湾二单元</span>
      </div>
      <div class="item">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ic_tubiao_mianji" />
          </svg>
          <span>面积</span>
        </div>
        <span>140平</span>
      </div>
      <div class="item">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wuyejiaofei" />
          </svg>
          <span>物业费</span>
        </div>

        <span>￥300/月</span>
      </div>
    </div>
    <div class="btn-container">
        <button type="button" class="mui-btn mui-btn-outlined pay-btn">缴费</button>
    </div>

  </div>
</template>
<script>
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  }
}
</script>
<style scoped>
.item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px lightgray solid;
  height: 55px;
}
.container {
  margin-top: 40px;
}
.icon {
  font-size: 18px;
  margin-right: 5px;
}
.btn-container{
    display: flex;
    justify-content: center;
    margin-top: 35px;
}
.pay-btn{
    color: #6e8b3d;
    width: 150px;
    height: 40px;
    border-radius: 10px;
}
</style>

<template>
    <div>
      <div class="self-header">
          <div class="settings-container">
              <span></span>
              <span class="mui-icon mui-icon-gear"></span>
          </div>
          <div class="avatar-container">
              <div class="avatar">
                   <svg class="icon avatar-icon" aria-hidden="true">
                        <use xlink:href="#icon-user__easyico"></use>
                    </svg>
              </div>
              <div class="login-container">
                  <span class="login-text" @click="login()">登录/注册</span>
                  <span class="mui-icon mui-icon-arrowright"></span>
              </div>
          </div>
          <div class="wallet-container">
              <div class="detail-item">
                <span>0.00</span>
                <span>零钱</span>
              </div>
               <div class="detail-item">
                <span>0.00</span>
                <span>卡券</span>
              </div>
               <div class="detail-item">
                <span>0.00</span>
                <span>现金</span>
              </div>
               <div class="detail-item">
                <span>0.00</span>
                <span>银行卡</span>
              </div>
          </div>
      </div>
      <div class="self-tab">
          <div class="self-tab-item">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                    <use xlink:href="#icon-gerenziliao"></use>
                </svg>
                <div class="self-info">
                    <span>我的资料</span>
                    <p>查看我的资料</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
          </div>
          <div class="self-tab-item">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                    <use xlink:href="#icon-gerenjiaofeimingxi"></use>
                </svg>
                <div class="self-info">
                    <span>我的缴费</span>
                    <p>全部缴费一目了然</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
          </div>
          <div class="self-tab-item">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                    <use xlink:href="#icon-luntanzixun"></use>
                </svg>
                <div class="self-info">
                    <span>我的论坛</span>
                    <p>参与论坛讨论</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
          </div>
          <div class="self-tab-item">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                    <use xlink:href="#icon-repair"></use>
                </svg>
                <div class="self-info">
                    <span>我的报修</span>
                    <p>报修订单轻松查阅</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
          </div>
      </div>
      <div class="self-bottom">
          <div class="self-bottom-item">
              <div>
                <span class="mui-icon mui-icon-help"></span>
                <span>帮助与反馈</span>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
          </div>
          <div class="self-bottom-item">
              <div>
                <span class="mui-icon mui-icon-pengyouquan"></span>
                <span>分享</span>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
          </div>
      </div>
    </div>
 

</template>

<script>
    export default {
        methods: {
            login(){
                this.$router.push('/login')
            }
        },
    }
</script>
<style scoped>
    /* 头部 */
    .self-header{
        height: 160px;
        background:url('../../assets/image/self-bg.jpg'); 
    }
    .settings-container{
        display: flex;
        justify-content: space-between;
        padding: 8px
    }
    .mui-icon-gear{
        color: white;
    }
    .avatar{
        margin-left: 20px;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background: white
    }
    .avatar-icon{
        height: 60px;
        width: 60px;
    }
    .avatar-container{
        display: flex;
        justify-content: space-between;
    }
    .login-text{
        font-size: 12px;
    }
    .login-container{
        color: white;
        font-size: 12px;
        font-weight: 200;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mui-icon-arrowright{
       font-size: 12px;
       margin-left: 20px;
    }
    .wallet-container{
        display: flex;
        /* margin-left: 20px; */
        margin-top: 10px
        
    }
    .detail-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        border-right: 2px white solid;
        color: white;
    }
    .wallet-container div:nth-child(4){
        border: none
    }
    /* 选项卡 */
    .self-tab-item{
        height: 65px;
        border-bottom: 1px lightgray solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
         padding: 10px;
         background: white;
    }
    .tab-icon{
        font-size: 25px;
        margin-right: 20px;
    }
    .tab-left{
        display: flex;
        align-items: center

    }
    .self-info>p{
        margin-bottom: 0;
    }
    /* 底部 */
    .self-bottom-item{
        background: white;
        height: 50px;
        border-bottom: 1px whitesmoke solid;
    }
    .self-bottom-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px lightgray solid;
    }
    .self-bottom{
        margin-top: 10px;
    }
    .self-bottom-item span{
        margin-left: 5px;
    }
    
</style>
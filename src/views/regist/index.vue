<template>
    <div class="l-bg">
        <div class="l-header">
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span class="l-text">注册</span>
        </div>
        <div class="mui-input-group">
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-phone"></span>
                </label>
                <input v-model="phone" type="text" class="mui-input-clear" placeholder="请输入手机号">
            </div>
             <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-person"></span>
                </label>
                <input v-model="username" type="text" class="mui-input-clear" placeholder="请输入用户名">
            </div>
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-compose"></span>
                </label>
                <input v-model="pwd" type="password" class="mui-input-password" placeholder="请输入密码">
            </div>
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-compose"></span>
                </label>
                <input v-model="pwdAgain" type="password" class="mui-input-password" placeholder="请确认密码">
            </div>
        </div>
        <div class="bottom">
            <span class="tip">{{tip}}</span>
            <p class="regist-btn" @click="regist()">
                <span class="mui-icon mui-icon-help"></span>
            已有账号点击登录
            </p>
        </div>
    <button
      type="button"
      data-loading-icon-position="right"
      class="mui-btn mui-btn-outlined"
      @click="userRegist()"
      :disabled='loading'>
      {{!loading?'注册':'注册中...'}}
    </button>
    <button
    type="button"
    class="mui-btn mui-btn-outlined back-btn"
    @click="backtohome">返回主页</button>
    </div>
</template>
<style scoped>
    .l-bg{
        background: rgb(239,239,239);
        height: 100vh;
    }
    .l-header{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        justify-content: left;
        background: white;
        text-align: center;
    }
    .l-text{
        display: block;
        width: 100%;
        font-size: 18px;
    }
    .mui-input-group{

        margin-top: 20px;
    }
    .mui-input-row{
        height: 50px;
    }
    .mui-btn{
        width: 90%;
        margin-top: 40px;
        margin-left: 5%;
        height: 40px;
        background-color: #6E8B3D;
        color: white;
    }
    .regist-btn{
       display: flex;
       justify-content:flex-end;
       margin-right: 10px;
       margin-top: 10px;
    }
    .mui-input-clear,.mui-input-password{
        width: 85%;
    }
    .mui-input-row{
        /* color: lightgray; */
    }
    .mui-icon-help{
        font-size: 16px;
        margin-right: 5px;
    }
    .regist-btn{
        color: #6E8B3D;
    }
    .back-btn{
        background: lightgrey;
    }
    label{
        width: 15% !important;
    }
    .tip{
        color: red;
        font-weight: bold;
        margin-left: 5px;
    }
    .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
/*自定义一个透明度从0到1的动画，它的名称是fade-in*/
@keyframes fade-in{  
    0%{ opacity: 0;}
    100%{opacity:1;}
}
@-webkit-keyframes fade-in{
    0%{ opacity: 0;}
    100%{opacity:1;}
}
@-ms-keyframes fade-in{
    0%{ opacity: 0;}
    100%{opacity:1;}
}
@-o-keyframes fade-in{
    0%{ opacity: 0;}
    100%{opacity:1;}
}
@-moz-keyframes fade-in{
    0%{ opacity: 0;}
    100%{opacity:1;}
}
.tip{ 
    opacity: 0;      /*实先规定文字的状态是不显示的*/
    animation:  fade-in 6s ease 0.1s 1;    /*调用名称为fade-in的动画，全程动画显示时间4S，进入方式为ease，延时0S进入，播放次数1次*/
    -webkit-animation: fade-in 6s ease 0.1s 1;
    -moz-animation:  fade-in 6s ease 0.1s 1;
    -o-animation:  fade-in 6s ease 0.1s 1;
    -ms-animation:  fade-in 6s ease 0.1s 1;
    
    /*规定动画的最后状态为结束状态*/
    animation-fill-mode:forwards;
    -webkit-animation-fill-mode: forwards;  
      -o-animation-fill-mode: forwards; 
      -ms-animation-fill-mode: forwards;   
      -moz-animation-fill-mode: forwards; 
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  mounted () {
    // 解决mui-input框不刷新无icon问题
    mui('.mui-input-row input').input()
  },
  data () {
    return {
      phone: '',
      pwd: '',
      pwdAgain: '',
      tip: '' ,// 提示内容
      loading: false, // 是否正在请求服务器
      root: process.env.API_HOST,
      username: ''
    }
  },
  watch: {
    phone (val) {
      var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/

      if (!reg.test(val)) {
        this.tip = '请输入正确的手机号码'
      } else {
        this.tip = ''
      }
    }
  },
  methods: {
    ...mapActions(['onLogin', 'setRegisterFlag', 'onRegister']),
    goback () {
      this.$router.go(-1)
    },
    regist () {
      this.$router.push('/login')
    },
    backtohome () {
      this.$router.push('/home')
    },
    userRegist () {
      if (!this.judge()) return
      this.loading = true
      const root = process.env.API_HOST
      const user = {
        phone: this.phone,
        pwd: this.pwd,
        username: this.username,
        status: '0'
      }
      this.$ajax.post({
        url: root + 'user/regist',
        data: user

      }).then(result => {
        this.loading = false
        if (result.status) {
          this.regist()
          this.registIM()
        } else {
          this.tip = result.result
        }
      }, err => {
        this.loading = false
      })
    },
    judge () {
      if (!this.phone) {
        this.tip = '手机号码不能为空'
        return false
      }
      if (!this.username) {
        this.tip = '用户名不能为空'
        return false
      }
      if (!this.pwd) {
        this.tip = '密码不能为空'
        return false
      }
      if (!this.pwdAgain) {
        this.tip = '请再次输入密码'
        return false
      }
      if (this.pwdAgain !== this.pwd) {
        this.tip = '两次输入密码不一致'
        return false
      }
      return true
    },
    // 注册
    registIM () {
      this.onRegister({
        username: this.phone.toLowerCase(),
        password: this.pwd,
        nickname: this.username
      })
    }
  }
}
</script>

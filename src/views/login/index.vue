<template>
    <div class="l-bg">
        <div class="l-header">
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span class="l-text">登录</span>
        </div>
        <div class="mui-input-group">
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-person"></span>
                </label>
                <input v-model="userphone" type="text" class="mui-input-clear" placeholder="请输入手机号">
            </div>
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-compose"></span>
                </label>
                <input v-model="userpassword" type="password" class="mui-input-password" placeholder="请输入密码">
            </div>

        </div>
        <div class="bottom">
            <span class="tip">{{tip}}</span>
            <p class="regist-btn" @click="regist()">
                <span class="mui-icon mui-icon-help"></span>
            没有账号点击注册
            </p>
        </div>
    <button type="button" class="mui-btn mui-btn-outlined l-btn" @click="login()">登录</button>
    <button type="button" class="mui-btn mui-btn-outlined back-btn" @click="backtohome">返回主页</button>

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
        color: lightgray;
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

    .mui-input-row label{
        width: 15%;
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
</style>

<script>
import {PHONE_REG} from '../../utils/rej'
export default {
  mounted () {
    // 解决mui-input框不刷新无icon问题
    mui('.mui-input-row input').input()
  },
  data () {
    return {
      userphone: '',
      userpassword: '',
      tip: ''
    }
  },
  watch: {
    userphone (val) {
      if (PHONE_REG.test(val)) {
        this.tip = ''
      } else {
        this.tip = '请输入正确的手机号码'
      }
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    regist () {
      this.$router.push('/regist')
    },
    backtohome () {
      this.$router.push('/home')
    },
    login () {
      if (this.userphone === '' || this.userphone == null) {
        this.tip = '请输入手机号码'
        return
      }
      if (this.userpassword === '' || this.userpassword == null) {
        this.tip = '请输入密码'
        return
      }
      const root = process.env.API_HOST
      const user = {
        userphone: this.userphone,
        userpassword: this.userpassword
      }
      this.$ajax.post({
        // http://localhost:8081/regist
        url: root + 'user/login',
        data: user

      }).then(result => {
        if (result.status) {
          this.$router.push('/home')
        } else {
          this.tip = result.msg
        }
      })
    }
  }
}
</script>

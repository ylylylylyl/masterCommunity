<template>
    <div class="l-bg">
        <div class="l-header">
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span class="l-text">注册</span>
        </div>
        <div class="mui-input-group">
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-person"></span>
                </label>
                <input v-model="phone" type="text" class="mui-input-clear" placeholder="请输入手机号">
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
    <button type="button" class="mui-btn mui-btn-outlined" @click="userRegist()">注册</button>
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
    label{
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
      tip: '' // 提示内容
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
      if (this.phone == '' || this.phone == null) {
        this.tip = '手机号码不能为空'
        return
      }
      if (this.pwd == '' || this.pwd == null) {
        this.tip = '密码不能为空'
        return
      }
      if (this.pwdAgain == '' || this.pwdAgain == null) {
        this.tip = '请再次输入密码'
        return
      }
      if (this.pwdAgain !== this.pwd) {
        this.tip = '两次输入密码不一致'
        return
      }
      const root = process.env.API_HOST
      const user = {
        phone: this.phone,
        pwd: this.pwd
      }
      this.$ajax.post({
        // http://localhost:8081/regist
        url: 'http://localhost:8080/' + 'user/regist',
        data: user

      }).then(result => {
        if (result.status) {
          this.regist()
        } else {
          this.tip = result.result
        }
      })
    }
  }
}
</script>

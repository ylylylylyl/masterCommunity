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
        <input v-model="userphone" type="text" class="mui-input-clear" placeholder="请输入手机号" />
      </div>
      <div class="mui-input-row">
        <label>
          <span class="mui-icon mui-icon-compose"></span>
        </label>
        <input
          v-model="userpassword"
          type="password"
          class="mui-input-password"
          placeholder="请输入密码"
        />
      </div>
    </div>
    <div class="bottom">
      <span class="tip">{{tip}}</span>
      <p class="regist-btn" @click="regist()">
        <span class="mui-icon mui-icon-help"></span>
        没有账号点击注册
      </p>
    </div>
    <button type="button" :disabled="loading" class="mui-btn mui-btn-outlined l-btn" @click="login()">
      {{!loading?'登录':'登陆中'}}
    </button>
    <button type="button" class="mui-btn mui-btn-outlined back-btn" @click="backtohome">返回主页</button>
    <div class="change-container">
      <span class="mui-icon mui-icon-loop"></span>
      <a @click="$router.push('/adminlogin')">切换管理员版本</a>
    </div>
    <!-- <Loading/> -->
  </div>
</template>
<style scoped>
.l-bg {
  background: rgb(239, 239, 239);
  height: 100vh;
}
.l-header {
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  background: white;
  text-align: center;
}
.l-text {
  display: block;
  width: 100%;
  font-size: 18px;
}
.mui-input-group {
  margin-top: 20px;
}
.mui-input-row {
  height: 50px;
}
.mui-btn {
  width: 90%;
  margin-top: 40px;
  margin-left: 5%;
  height: 40px;
  background-color: #6e8b3d;
  color: white;
}
.regist-btn {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-top: 10px;
}
.mui-input-clear,
.mui-input-password {
  width: 85%;
}
.mui-input-row {
  /* color: lightgray; */
}
.mui-icon-help {
  font-size: 16px;
  margin-right: 5px;
}
.regist-btn {
  color: #6e8b3d;
}
.back-btn {
  background: lightgrey;
}

.mui-input-row label {
  width: 15%;
}
.tip {
  color: red;
  font-weight: bold;
  margin-left: 5px;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 150px;
  margin-top: 40px;
}
.change-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.ghost {
  animation: float 3s ease-out infinite;
}

@keyframes float {
  50% {
    transform: translate(0, 20px);
  }
}
.shadowFrame {
  width: 130px;
  margin-top: 15px;
}
.shadow {
  animation: shrink 3s ease-out infinite;
  transform-origin: center center;
  ellipse {
    transform-origin: center center;
  }
}

@keyframes shrink {
  0% {
    width: 90%;
    margin: 0 5%;
  }
  50% {
    width: 60%;
    margin: 0 18%;
  }
  100% {
    width: 90%;
    margin: 0 5%;
  }
}
</style>

<script>
import { PHONE_REG } from '../../utils/rej'
import { mapState, mapActions } from 'vuex'
import Loading from '../../components/Loading'
export default {
  components: {
    Loading
  },
  mounted () {
    // 解决mui-input框不刷新无icon问题
    mui('.mui-input-row input').input()
  },
  data () {
    return {
      userphone: '',
      userpassword: '',
      tip: '',
      root: process.env.API_HOST,
      loading: false // 是否正在请求服务器
    };
  },
  computed: {
    ...mapState(['chooseVillage'])
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
    ...mapActions(['onLogin', 'setRegisterFlag', 'onRegister']),
    goback () {
      this.$router.go(-1)
    },
    regist () {
      this.$router.push('/regist')
    },
    backtohome () {
      this.$router.push('/home')
    },
    async login () {
      if (!this.userphone) {
        this.tip = '请输入手机号码'
        return
      }
      if (!this.userpassword) {
        this.tip = '请输入密码'
        return
      }
      const root = process.env.API_HOST
      const user = {
        userphone: this.userphone,
        userpassword: this.userpassword
      };
      this.loading = true
      this.$ajax
        .post({
          // http://localhost:8081/regist
          url: root + 'user/login',
          data: user
        })
        .then(result => {
          this.loading = false
          if (result.status) {
            this.$store.commit('CUR_USERINFO', result.object)
            localStorage.setItem('avatar', result.object.avatar)
            result.object.avatar = null
            this.$cookies.set('CUR_USERINFO',result.object)
            this.LoginIM()
            return result.object.userid
          } else {
            this.tip = result.msg
            return null
          }
        })
        .then(userid => {
          if (userid) this.chooseBindHouse(userid)
        })
    },
    chooseBindHouse (userid) {
      const postData = {
        userid: userid
      }
      this.$ajax
        .post({
          url: this.root + 'bindhouse/selectdefault',
          data: postData
        })
        .then(res => {
          if (res.status) {
            this.$store.commit('CHOOSE_VILLAGE', res.result)
            this.$cookies.set('CUR_BINDINFO', res.object)
            this.$router.push('/home')
          } else {
            this.$router.push('/bindhouse')
          }
        })
    },
    LoginIM () {
      this.onLogin({
        username: this.userphone.toLowerCase(),
        password: this.userpassword
      })
    }
  }
};
</script>

<template>
    <div >
      <Header>修改支付密码</Header>
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>
            <span class="mui-icon mui-icon-locked"></span>
          </label>
          <input
          v-model="originpwd"
          type="password"
          class="mui-input-password"
          placeholder="请输入原密码" />
        </div>
        <div class="mui-input-row">
          <label>
            <span class="mui-icon mui-icon-compose"></span>
          </label>
          <input
            v-model="newpwd"
            type="password"
            class="mui-input-password"
            placeholder="请输入新密码"
          />
        </div>
      </div>
      <button
        type="button"
        :disabled="loading"
        class="mui-btn mui-btn-outlined l-btn"
        @click="commit()">
        提交
      </button>
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
export default {
  components: {Header},
  data () {
    return {
      originpwd: '',
      newpwd:'',
      loading: false,
      root: process.env.API_HOST
    }
  },
  methods: {
    commit () {
      if (this.originpwd === this.newpwd) {
        mui.toast('新密码和旧密码不能一致！')
        return
      }
      this.loading = true
      const {userid} = this.$cookie.get('CUR_USERINFO')
      this.$ajax
        .post({
          url: this.root + 'user/changePwd',
          data: {
            userid,
            originpwd: this.originpwd,
            newpwd: this.newpwd
          }
        })
        .then(result => {
          this.loading = false
          if (result.status) {
            this.$router.go(-1)
          }
          mui.toast(result.msg)
        })
    }
  }
}
</script>
<style scoped>
.mui-input-group{
  margin-top: 40px;
}
.mui-input-clear,
.mui-input-password {
  width: 85%;
}
.mui-input-row {
  height: 50px;
}
.mui-input-row label {
  width: 15%;
}
.mui-btn {
  width: 90%;
  margin-top: 40px;
  margin-left: 5%;
  height: 40px;
  background-color: #6e8b3d;
  color: white;
}
</style>
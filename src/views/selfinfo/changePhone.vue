<template>
    <div class="content-container">
        <Header>修改电话号码</Header>
        <div class="change-container">
          <div class="input-container">
            <span class="input-left">原电话号码</span>
            <span>{{originPhone}}</span>
          </div>
          <div class="input-container">
            <span class="input-left">新电话号码</span>
            <input type="text" v-model="phone" class="mui-input-clear inout-right" placeholder="请输入新电话号码" />
          </div>
          <div class="botton-container">
                <button :disabled="!phone||loading"  type="button" @click="commitChange()" class="mui-btn mui-btn-primary">
                {{loading?'提交中...':'提交'}}
                </button>
          </div>
        </div>
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  },
  data () {
    return {
      phone: '',
      loading: false,
      root: process.env.API_HOST
    }
  },
  computed: {
    originPhone () {
      return this.$cookies.get('CUR_USERINFO').userphone
    }
  },
  methods:{
    commitChange () {
      if (this.originPhone === this.phone) {
        mui.toast('新手机号不能和旧手机号一致！')
        return false
      } else {
        var btnArray = ['否', '是']
        mui.confirm('确认修改并使用新手机号码登录？', '修改手机号码', btnArray, (e) =>{
          if (e.index == 1) {
            this.postCommit()
          }
        })
      }
    },
    postCommit () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      const phone = this.phone
      this.loading = true
      this.$ajax.post({
        url: this.root + 'user/updatePhone',
        data: {userid,phone}
      }).then(result => {
        this.loading = false
        if (result.status) {
          this.$cookies.set('CUR_USERINFO',result.object)
          this.$router.push('/selfinfo')
        } else {
          mui.toast(result.msg)
        }
      },err=>{
          this.loading = false
      })
    }
  }
}
</script>

<style scoped>
    .change-container{
        padding: 0 20px;
        padding-top: 40px;
    }
    .input-left{
        flex: 1;
    }
    .inout-right{
        flex: 3
    }
</style>
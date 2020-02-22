<template>
    <div class="content-container">
        <Header>修改昵称</Header>
         <div class="change-container">
          <div class="input-container">
            <span class="input-left">原昵称</span>
            <span>{{originUsername}}</span>
          </div>
          <div class="input-container">
            <span class="input-left">新昵称</span>
            <input type="text" v-model="username" class="mui-input-clear inout-right" placeholder="请输入新昵称" />
          </div>
          <div class="botton-container">
                <button :disabled="!username||loading"  type="button" @click="commitChange()" class="mui-btn mui-btn-primary">
                {{loading?'提交中...':'提交'}}
                </button>
          </div>
        </div>
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
export default {
  components: {Header},
  data () {
    return {
      loading: false,
      root: process.env.API_HOST,
      username: ''
    }
  },
  computed: {
    originUsername () {
      return this.$route.query.username
    }
  },
  methods: {
    commitChange () {
      if (this.originUsername === this.username) {
        mui.toast('新昵称不能和旧昵称相同！')
        return false
      } else {
        var btnArray = ['否', '是']
        mui.confirm('确认修改昵称？', '修改昵称', btnArray, (e) =>{
          if (e.index == 1) {
            this.postCommit()
          }
        })
      }
    },
    postCommit () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      const username = this.username
      this.$ajax.post({
        url: this.root + 'user/updateUsername',
        data: {userid, username}
      }).then(result => {
        if (result.status) {
          this.$cookies.set('CUR_USERINFO',result.object)
          this.$router.push('/selfinfo')
        } else {
          mui.toast(result.msg)
        }
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
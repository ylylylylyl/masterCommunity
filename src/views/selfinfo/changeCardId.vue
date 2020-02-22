<template>
    <div class="content-container">
        <Header>填写身份证号</Header>
         <div class="change-container">
          <div class="input-container">
            <span class="input-left">填写身份证号</span>
            <input :disabled="this.isdisable" type="text" v-model="cardid" class="mui-input-clear inout-right" placeholder="请输入身份证号" />
          </div>
          <span class="tip">{{tip}}</span>
          <div class="botton-container">
                <button v-if="!this.isdisable" :disabled="!cardid||loading"  type="button" @click="commitChange()" class="mui-btn mui-btn-primary">
                {{loading?'提交中...':'提交'}}
                </button>
          </div>
        </div>
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
import {CARD_ID} from '../../utils/rej'
export default {
  components: {Header},
  data () {
    return {
      loading: false,
      root: process.env.API_HOST,
      cardid: '',
      tip: '',
      isdisable: false
    }
  },
  mounted () {
    if (Number(this.$route.query.cardid)) {
      this.cardid = this.$route.query.cardid
      this.isdisable = true
    }
  },
  watch: {
    cardid (val) {
      if (!CARD_ID.test(val)) {
        this.tip = '请输入正确的身份证号'
      } else {
        this.tip = ''
      }
    }
  },
  methods: {
    commitChange () {
      var btnArray = ['否', '是']
      mui.confirm('确认提交？', '填写身份证号', btnArray, (e) => {
        if (e.index == 1) {
          this.postCommit()
        }
      })
    },
    postCommit () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      const cardid = this.cardid
      this.$ajax.post({
        url: this.root + 'user/updateCardId',
        data: {userid, cardid}
      }).then(result => {
        if (result.status) {
          this.$cookies.set('CUR_USERINFO', result.object)
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
    flex: 2;
}
.inout-right{
    flex: 3
}
</style>
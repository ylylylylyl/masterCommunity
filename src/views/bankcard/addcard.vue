<template>
    <div class="content-container">
        <Header>添加银行卡</Header>
        <div class="add-container">
            <span class="add-title">请绑定持卡人本人的银行卡</span>
            <div class="add-form">
                <div class="input-container">
                    <span class="input-left">用户名</span>
                    <input type="text" v-model="postData.bindbankname"  class="mui-input-clear inout-right" placeholder="请输入持卡人姓名" />
                </div>
                <div class="input-container">
                    <span class="input-left">卡号</span>
                    <input type="text" v-model="postData.bankcardnum" class="mui-input-clear inout-right" placeholder="请输入银行卡号" />
                </div>
                 <button id="building-btn" class="btn mui-btn mui-btn-block" @click="initBuilding()">
                    <div>
                        <span>银行</span>
                    </div>
                    <div>
                        <span id="building-result" >{{postData.bankcompany}}</span>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </button>
                 <div class="input-container">
                    <span class="input-left">预留号码</span>
                    <input type="text" v-model="postData.binduserphone"  class="mui-input-clear inout-right" placeholder="请输入预留号码" />
                </div>
                <span class="tip">{{tip}}</span>
            </div>
            <button
            type="button"
            class="mui-btn mui-btn-outlined l-btn"
            @click="addBankCard()">
            {{!loading?'确认添加':'正在添加...'}}
            </button>
        </div>
    </div>
</template>
<style scoped>
   .content-container{
        background-color: #EDEDED;
        padding-top: 40px;
    }
    .add-title{
        display: block;
        margin: 15px;
        color: gray;
    }
    .input-left{
        margin-left: 5px
    }
    .mui-btn-outlined{
        width: 90%;
        margin-top: 40px;
        margin-left: 5%;
        height: 40px;
        background-color: #6E8B3D;
        color: white;
    }
    .mui-btn-block {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        border: none;
        border-bottom: 1px whitesmoke solid;
        margin-bottom: 0;
    }
</style>

<script>
import {mapGetters} from 'vuex'
import Header from '../../components/LeftHeader'
import {BANK_ID, PHONE_REG} from '../../utils/rej'
export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters(['curUserInfo'])
  },
  data () {
    return {
      bankdata: [
        { value: 1, text: '中国银行' },
        { value: 2, text: '招商银行' },
        { value: 3, text: '农业银行' },
        { value: 4, text: '建设银行' },
        { value: 5, text: '中国工商银行' },
        { value: 6, text: '交通银行' }
      ],
      postData: {
        bindbankname: '',
        bankcardnum: '',
        bankcompany: '点击选择',
        binduserphone: ''
      },
      root: process.env.API_HOST,
      tip: '',
      loading: false,
      isCommit: false
    }
  },
  watch: {
    'postData.bankcardnum': {
      handler: function (val) {
        if (BANK_ID.test(val)) {
          this.tip = ''
        } else {
          this.tip = '请输入正确的银行卡号'
        }
      },
      deep: true
    },
    'postData.binduserphone': {
      handler: function (val) {
        if (PHONE_REG.test(val)) {
          this.tip = ''
        } else {
          this.tip = '请输入正确的电话号码'
        }
      },
      deep: true
    }
  },
  methods: {
    initBuilding () {
      var picker = new mui.PopPicker()
      picker.setData(this.bankdata)
      var showUserPickerButton = document.getElementById('building-btn')
      picker.show((items) => {
        this.postData.bankcompany = items[0].text
        // this.postData.building = items[0].text
        // 返回 false 可以阻止选择框的关闭
        // return false;
      })
    },
    addBankCard () {
      if (!this.judge()) return
      const {userid} = this.$cookies.get('CUR_USERINFO')
      const params = {
        userid: userid,
        ...this.postData
      }
      this.loading = true
      this.$ajax.post({
        url: this.root + 'bankcard/bindbankcard',
        data: params
      })
        .then(res => {
          this.loading = false
          if (res.status) {
            this.$router.push('/bankcard')
          }
        }, err => {
          this.loading = false
        })
    },
    judge () {
      if (!this.postData.bindbankname) {
        this.tip = '请填写用户名'
        return false
      }
      if (!this.postData.bankcardnum) {
        this.tip = '请填写银行卡号'
        return false
      }
      if (this.postData.bankcompany === '点击选择') {
        this.tip = '请选择银行'
        return false
      }
      if (!this.postData.binduserphone) {
        this.tip = '请填写预留号码'
        return false
      }
      if (!BANK_ID.test(this.postData.bankcardnum)) {
        this.tip = '请填写正确的银行卡号'
        return false
      }
      if (!PHONE_REG.test(this.postData.binduserphone)) {
        this.tip = '请填写正确的电话号码'
        return false
      }
      return true
    }
  }
}
</script>
<template>
    <div>
        <div class="header">
            <div>
                <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
                <span class="comm-name">新增缴费账户</span>
            </div>
            <span class="city-span" @click="toChoose()" >{{chooseCity}}</span>
        </div>
        <div class="addpay-content">
            <div class="addpay-item-title">
                 <svg class="icon icon-svg" aria-hidden="true">
                    <use xlink:href="#icon-ranqifei"></use>
                </svg>
                <span>燃气费</span>
            </div>
            <div class="addpay-item-container">
                <div class="addpay-item">
                    <span class="addpay-title">缴费单位</span>
                    <div>
                        <span class="company-span">大丰燃气有限公司</span>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </div>
                 <div class="addpay-item">
                    <span class="addpay-title">用户编号</span>
                    <input type="text" class="mui-input-clear" v-model="houseNumber" placeholder="请输入用户编号">
                </div>

            </div>
            <div class="btn-container">
                <div class="mui-input-row mui-checkbox mui-left">
                    <label>我已阅读并同意《智能社区协议》</label>
                    <input v-model="isAgree" name="checkbox1" value="Item 1" type="checkbox" >
                </div>
                <button :disabled='!houseNumber' type="button" class="mui-btn mui-btn-primary" @click="submit()">确认新建</button>
            </div>

        </div>

    </div>
</template>
<script>
import {goback} from '../../utils/util'
import {SIX_NUMBER} from '../../utils/rej'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      houseNumber: '',
      root: process.env.API_HOST,
      isAgree:''
    }
  },
  computed: {
    ...mapGetters(['chooseCity', 'curUserInfo'])
    // getCity(){
    //     return this.$store.state.chooseCity
    // }
  },
  methods: {
    goback () {
      goback.bind(this)()
    },
    toChoose () {
      this.$router.push('/citychoose')
    },
    submit () {
      if (!this.judge()) return
      const {bindid} = this.$cookies.get('CUR_BINDINFO')
      const params = {
        bindid: Number(bindid),
        houseNumber: Number(this.houseNumber)
      }
      this.$ajax.post({
        url: this.root + 'bindhouse/bindhousenum',
        data: params
      }).then(res => {
        if (res.status) {
          this.$router.push('/livingpayment')
        }
      })
    },
    judge () {
      if (!this.isAgree) {
        mui.toast('请先勾选同意协议！')
        return false
      } 
      if (!SIX_NUMBER.test(this.houseNumber)) {
        mui.toast('请输入正确的六位户号')
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
    .header{
        background: white ;
        justify-content: space-between;
        padding-right: 10px;
    }
    .mui-icon-arrowleft{
        margin-right: 5px;
    }
    .city-span{
        color: #6E8B3D;
    }
    /* 主体部分 */

    .addpay-item-title{
       height: 50px;
       background: white;
       border-top: 1px lightgrey solid;
       display: flex;
       align-items: center;
    }
    .icon-svg{
        font-size: 40px;
        margin: 5px 10px 5px 5px;
    }
    .addpay-item-container{
        margin-top: 10px;
        background: white;
    }
    .addpay-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        padding-left: 10px;
    }
    .company-span{
        color: gray;
    }
    .addpay-title{
        width: 20%;
    }
    .mui-input-clear{
        border: none;
        margin-bottom: 0;
    }
    .mui-input-row{
        margin-bottom: 20px;
    }
    .mui-radio input[type='radio']:checked:before, .mui-checkbox input[type='checkbox']:checked:before{
        color: #6E8B3D;
    }
    .mui-radio.mui-left input[type='radio'], .mui-checkbox.mui-left input[type='checkbox']{
        left: 0px;

    }
    label{
        color: gray;
    }
    .btn-container{
        padding: 20px;
    }
    .mui-btn{
        width:100%;
        /* margin-left: 20px;
        right: 20px; */
        height: 40px;
        background: #6E8B3D;
        border: none;
    }
</style>

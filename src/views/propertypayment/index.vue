<template>
  <div>
    <div class="fixed-container">
      <BackHeader>物业缴费</BackHeader>
      <div class="com-container address-container">
        <span class="address-span">{{addr}}室</span>
      </div>
      <div class="select-container">
        <span class="mui-icon mui-icon-arrowdown" v-show="!isopen"></span>
        <span class="mui-icon mui-icon-arrowup" v-show="isopen"></span>
        <select
          v-model="selectyear"
          @click="handleChange"
          class="mui-h5"
          style="margin:auto; color:#000;"
        >
          <option v-for="(year,key) in years" :value="year" :key="key">{{year}}</option>
        </select>
      </div>
    </div>

    <div class="payment-container">
      <div class="payment-item" v-for="(item,key) in properties" :key="key">
        <div class="payment-item-date">
          <span>{{item.paymonth|format}}</span>
        </div>
        <div class="payment-item-des">
          <div>
            <span>物业管理费</span>
          </div>
          <div class="item-des-pay">
            <span>{{item.pay}}</span>
            <span :class="item.paystatus|payclass">{{item.paystatus|paystatus}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="payment-footer">
      <div>
        <span>合计：</span>
        <span class="total-pay">{{paytotal}}</span>
      </div>
      <button :disabled='paytotal===0' @click="handleClick()" type="button" class="mui-btn submit">提交订单</button>
    </div>
  </div>
</template>
<script>
import BackHeader from '../../components/LeftHeader'
import {updateWallet} from '../../utils/util'
export default {
  components: {
    BackHeader
  },
  data () {
    return {
      root: process.env.API_HOST,
      isopen: false,
      years: [],
      properties: [],
      selectyear: new Date().getFullYear()
    }
  },
  computed: {
    addr () {
      const { chooseaddr, building, house } = this.$cookies.get('CUR_BINDINFO')
      return chooseaddr + building + house
    },
    paytotal () {
      return this.properties.reduce((totalPrice, item) => {
        if (item.paystatus == 0) {
          return totalPrice + item.pay
        } else {
          return totalPrice
        }
      }, 0)
    }
    // selectyear () {
    //   return new Date().getFullYear()
    // }
  },
  mounted () {
    this.init()
    this.getThreeYear()
  },
  methods: {
    init () {
      const { bindid } = this.$cookies.get('CUR_BINDINFO')
      this.$ajax
        .post({
          url: this.root + 'property/selectproperty',
          data: {
            bindid: Number(bindid),
            year: Number(this.selectyear)
          }
        })
        .then(res => {
          if (res.status) {
            this.properties = res.result
          }
        })
    },
    goback () {
      this.$router.go(-1)
    },
    handleChange () {
      this.isopen = !this.isopen
      this.init();
    },
    getThreeYear () {
      for (let i = 0; i < 3; i++) {
        this.years.push(new Date().getFullYear() - i)
      }
      this.selectyear = this.years[0]
    },
    handleClick () {
      var btnArray = ['取消', '确定']
      mui.prompt('请输入支付密码：', '', '支付', btnArray, e => {
        if (e.index == 1) {
          const { userid } = this.$cookies.get('CUR_USERINFO');
          this.$ajax
            .post({
              url: this.root + 'user/selectPayPwd',
              data: { userid }
            })
            .then(res => {
              if (res.result === e.value) {
                this.toPay()
              } else {
                mui.toast('密码错误')
              }
            });
        } else {
          //   info.innerText = '你点了取消按钮'
        }
      });
      document.querySelector('.mui-popup-input input').type = 'password';
    },
    async toPay () {
      const { bindid } = this.$cookies.get('CUR_BINDINFO')
      const year = this.selectyear
      const { userid } = this.$cookies.get('CUR_USERINFO')
      const paytotal = this.paytotal
      updateWallet(userid, paytotal).then(res => {
        if (res.status) {
          this.$ajax
            .post({
              url: this.root + 'property/payproperty',
              data: { bindid, year }
            })
            .then(res => {
              if (res.status === true) {
                this.init()
              } else {
                
              }
            })
        } else {
          mui.toast(res.result)
        }
      })
    }
  },
  filters: {
    paystatus (status) {
      switch (status) {
        case 0:
          return '未支付'
        case 1:
          return '已支付'
      }
    },
    payclass (status) {
      switch (status) {
        case 0:
          return 'pay-span-no'
        case 1:
          return 'pay-span-yes'
      }
    }
  }
};
</script>
<style scoped>
.header {
  background-color: white;
  display: flex;
  align-items: center;
}
.address-container {
  height: 80px;
  background: #6e8b3d;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mui-h5 {
  text-align: center;
  text-align-last: center;
  border-bottom: 1px gray solid !important;
}
.select-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.mui-icon-arrowdown,
.mui-icon-arrowup {
  display: block;
  position: absolute;
  margin-left: 35px;
  font-size: 18px;
}
.payment-item {
  background: white;
  padding: 10px;
  margin-bottom: 10px;
}
.payment-item-date {
  height: 40px;
  display: flex;
  align-items: center;
  color: gray;
}
.payment-item-des {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-des-pay {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-des-pay span:nth-child(1) {
  font-size: 16px;
  font-weight: bold;
}
.item-des-pay span:nth-child(2) {
  font-size: 12px;
  /* color: #eb822c */
}
.payment-container {
  padding-bottom: 50px;
  padding-top: 142px;
}
.submit {
  background-color: #6e8b3d;
  color: white;
}
.payment-footer {
  position: fixed;
  height: 70px;
  width: 100%;
  background: white;
  border-top: 1px gray solid;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
.total-pay {
  color: #eb822c;
  font-weight: 700;
  font-size: 16px;
}
.fixed-container {
  position: fixed;
  width: 100%;
}
.pay-span-yes {
  color: #6e8b3d;
}
.pay-span-no {
  color: darkred;
  font-weight: bold;
}
</style>

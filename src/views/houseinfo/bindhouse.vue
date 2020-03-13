<template>
  <div>
    <Header>绑定房屋</Header>
    <div class="bindhouse-container">
      <div class="house-info">
        <div class="info-title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fangwu" />
          </svg>
          <span>房屋信息</span>
        </div>
        <div class="info-content">
          <button id="comm-btn" class="btn mui-btn mui-btn-block" @click="initRepair()">
            <div>
              <span>小区</span>
            </div>
            <div>
              <span id="comm-result" v-if="!$route.query.villagename">点击选择</span>
              <span id="comm-result" v-if="$route.query.villagename">{{villagename}}</span>
              <span class="mui-icon mui-icon-arrowright"></span>
            </div>
          </button>
          <button id="building-btn" class="btn mui-btn mui-btn-block" @click="initBuilding()">
            <div>
              <span>楼栋</span>
            </div>
            <div>
              <span id="building-result" >{{postData.building}}</span>
              <span class="mui-icon mui-icon-arrowright"></span>
            </div>
          </button>
          <div class="input-container">
            <span class="input-left">房屋号</span>
            <input type="text" class="mui-input-clear inout-right" placeholder="请输入房屋号" v-model="postData.houseRoom" />
          </div>
          <div class="input-container">
            <span class="input-left">房屋面积</span>
            <input type="text" class="mui-input-clear inout-right" placeholder="请输入房屋面积" v-model="postData.houseArea" />
          </div>
        </div>
      </div>
      <div class="user-info">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yonghu" />
        </svg>
        <span>用户信息</span>
        <div class="info-content">
          <div class="input-container">
            <span class="input-left">用户名</span>
            <input type="text" v-model="postData.houseOwner" class="mui-input-clear inout-right" placeholder="请输入房屋所有人" />
          </div>
          <div class="input-container">
            <span class="input-left">身份证号</span>
            <input type="text" v-model="postData.cardId" class="mui-input-clear inout-right" placeholder="请输入房屋所有人身份证号" />
          </div>
           <div class="input-container">
            <span class="input-left">联系电话</span>
            <input type="text" v-model="postData.phoneNumber" class="mui-input-clear inout-right" placeholder="请输入房屋所有人联系电话" />
          </div>
          <div class="input-container">
            <span class="input-left">设为默认地址</span>
            <div id="mySwitch" class="mui-switch mui-switch-mini mui-active">
              <div class="mui-switch-handle"></div>
            </div>
          </div>
          <span class="tip">{{tip}}</span>
        </div>
      </div>
      <div class="btn-container">
        <button :disabled="!judge()&&tip" type="button" @click="commitBind()" class="mui-btn mui-btn-primary">
          {{loading?'提交中...':'提交'}}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bindhouse-container {
  padding-top: 40px;
  padding-left: 5px;
}
.info-content {
  margin-top: 10px;
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
.input-container {
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
}
.input-left {
  flex: 1;
}
.inout-right {
  flex: 4;
  border: none;
  margin-bottom: 0px;
}
.house-info,
.user-info {
  margin: 10px;
}
.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.btn-container .mui-btn {
  width: 80%;
  height: 40px;
  background: #6e8b3d;
  border: none;
}
.tip{
  color: red;
  font-weight: bold;
  margin-left: 5px;
}

</style>
<script>
import {mapGetters} from 'vuex'
import Header from '../../components/LeftHeader'
import {CARD_ID} from '../../utils/rej'
export default {
  components: {
    Header
  },
  data () {
    return {
      buildingdata: [
        { value: 1, text: '一单元' },
        { value: 2, text: '二单元' },
        { value: 3, text: '三单元' },
        { value: 4, text: '四单元' },
        { value: 5, text: '五单元' },
        { value: 6, text: '六单元' },
        { value: 1, text: '七单元' },
        { value: 2, text: '八单元' },
        { value: 3, text: '九单元' },
        { value: 4, text: '十单元' },
        { value: 5, text: '十一元' },
        { value: 6, text: '十二单元' }
      ],
      postData: {
        village: this.villageId,
        building: '', // 楼栋
        houseRoom: '', // 房屋号
        cardId: '', // 身份证号
        houseArea: '', // 房屋面积
        houseOwner: '', // 房屋所有人
        status: 1, // 是否设为默认
        phoneNumber: '', // 联系电话
        chooseAddr: '' // 选择的具体地址
      },
      tip: '', // 提示文字
      loading: false
    }
  },
  computed: {
    ...mapGetters(['curUserInfo']),
    villagename () {
      return this.$route.query.villagename
    },
    villageId () {
      return this.$route.query.villageid
    },
    bindid () {
      if (!this.$cookies.get('CUR_BINDINFO')) {
        return false
      }
      return true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initData()
    })
  },
  watch: {
    villageId (val) {
      this.postData.village = val
    },
    'postData.cardId': {
      handler: function (val) {
        if (CARD_ID.test(val)) {
          this.tip = ''
        } else {
          this.tip = '请输入正确的身份证号码'
        }
      },
      deep: true
    }
  },
  methods: {
    initData () {
      mui('.mui-switch')['switch']()
      if (document.getElementById('mySwitch')) {
        document.getElementById('mySwitch').addEventListener('toggle', event => {
          if (event.detail.isActive) {
            this.postData.status = 1
          } else {
            this.postData.status = 0
          }
          console.log(this.postData.status)
        })
      }
    },
    initRepair () {
      this.$router.push('/village')
    },
    initBuilding () {
      var picker = new mui.PopPicker()
      picker.setData(this.buildingdata)
      var showUserPickerButton = document.getElementById('building-btn')
      var userResult = document.getElementById('building-result')
      picker.show((items) => {
        userResult.innerText = items[0].text
        this.postData.building = items[0].text
        // 返回 false 可以阻止选择框的关闭
        // return false;
      })
    },
    commitBind () {
      if (!this.judge()) return
      this.tip = null
      this.postData.userid = this.curUserInfo.userid
      this.postData.village = Number(this.postData.village)
      this.postData.cardId = Number(this.postData.cardId)
      this.postData.houseArea = Number(this.postData.houseArea)
      this.postData.chooseAddr = this.$cookies.get('chooseProvince') + this.$cookies.get('chooseCity') + this.$cookies.get('chooseArea') + this.villagename
      this.postData.phoneNumber = Number(this.postData.phoneNumber)
      this.postData.villageid = Number(this.villageId)
      const root = process.env.API_HOST
      this.loading = true
      this.$ajax.post({
        url: root + 'bindhouse/bindhousebyuser',
        data: this.postData
      })
        .then(res => {
          this.loading = false
          if (res.status) {
            console.log(!this.$cookies.get('CUR_BINDINFO'))
            if(this.$cookies.get('CUR_BINDINFO')) {
              this.$router.push('/home')
            } else {
              console.log(1111111111)
              this.$cookies.set('CUR_BINDINFO', res.object)
              this.$router.push('/home')
            }
            
          } else {
            mui.toast(res.msg)
          }
        }, err => {
          this.loading = false
        })
    },
    judge () {
      if (!this.villageId) {
        this.tip = '请选择小区'
        return false
      }
      if (!this.postData.building) {
        this.tip = '请选择楼栋'
        return false
      }
      if (!this.postData.houseRoom) {
        this.tip = '请输入房屋号'
        return false
      }
      if (!this.postData.houseArea) {
        this.tip = '请输入房屋面积'
        return false
      }
      if (!this.postData.houseOwner) {
        this.tip = '请输入房屋所有人'
        return false
      }
      if (!this.postData.cardId) {
        this.tip = '请输入身份证号码'
        return false
      }
      if (!this.postData.phoneNumber) {
        this.tip = '请输入手机号码'
        return false
      }
      return true
    }
  }
}
</script>

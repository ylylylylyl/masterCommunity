<template>
  <div class="content-container">
    <div class="back-header">
      <div>
        <span @click="$router.push('/home')" class="mui-icon mui-icon-arrowleft"></span>
        <span>我要报修</span>
      </div>
      <span class="records-span" @click="toRecords()">报修记录</span>
    </div>
    <div class="life-container repair-container">
      <button id="type-btn" class="btn mui-btn mui-btn-block" @click="initRepair()">
        <div>
          <span class="iconfont icon-leixing"></span>
          <span class="title-span">维修类型</span>
        </div>
        <div>
          <span id="type-result">点击选择</span>
          <span class="mui-icon mui-icon-arrowright"></span>
        </div>
      </button>
      <button id="type-btn" class="btn mui-btn mui-btn-block" @click="initDate()">
        <div>
          <span class="iconfont icon-shijian"></span>
          <span  class="title-span">预约时间</span>
        </div>

        <div>
          <span id="date-result">点击选择</span>
          <span class="mui-icon mui-icon-arrowright"></span>
        </div>
      </button>
      <div class="repair-user-container">
        <div class="repair-user">
          <span class="iconfont icon-lianxiren"></span>
          <span class="title-span repair-user-title">联系人</span>
          <input v-model="postData.contactname" type="text" class="mui-input-clear" placeholder="请输入联系人" />
        </div>
        <div class="repair-user">
          <span class="iconfont icon-lianxidianhua"></span>
          <span class="title-span repair-user-title">联系电话</span>
          <input v-model="postData.concatphone" type="text" class="mui-input-clear" placeholder="请输入联系电话" />
        </div>
        <div class="repair-user">
         <span class="iconfont icon-fangjian"></span>
          <span class="title-span repair-user-title">具体地址</span>
          <input v-model="postData.address" type="text" class="mui-input-clear" placeholder="请输入详细地址" />
        </div>
        <p>注：只能报修当前登录房屋</p>
      </div>
      <div class="problem-container">
        <div class="problem-container-title">
          <span class="iconfont icon-asterisks-1-copy"></span>
          <span class="title-span">请描述您遇到的问题</span>
        </div>
        <textarea v-model="postData.description" type="textarea" rows="5" class="mui-input-speech" placeholder="请输入内容" />
      </div>
      <div class="problem-container">
        <div class="problem-container-title">
          <span class="iconfont icon-asterisks-1-copy"></span>
          <span class="title-span">上传照片</span>
        </div>
        <div class="upload-container">
          <button class="upload-btn" v-on:click="upload">
            <span class="mui-icon mui-icon-plusempty" v-show='!uploadimg'></span>
			      <img :src="uploadimg" class="upload-img" v-show='uploadimg' />
          </button>
          <input
            @change="changeImage($event)"
            ref="fileBtn"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            style="display:none;position: absolute;"
            id="btn-upload"
          />
        </div>
      </div>
      <div class="submit-container">
        <button @click="handleRepair()" type="button" class="mui-btn submit-btn">确认提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import {toTimestamp} from '../../utils/util'
import {PHONE_REG} from '../../utils/rej'
export default {
  data () {
    return {
      typedata: [
        { value: 1, text: '消防' },
        { value: 2, text: '照明' },
        { value: 3, text: '暖气' },
        { value: 4, text: '马桶' },
        { value: 5, text: '桌椅' },
        { value: 6, text: '其他' }
      ],
      uploadimg: '',
      date: '',
      postData: {
      },
      root: process.env.API_HOST
    }
  },
  mounted () {
    this.postData.villageid = this.$cookies.get('CUR_BINDINFO').villageid
    this.postData.bindid = this.$cookies.get('CUR_BINDINFO').bindid
    //    this.initRepair()
  },
  methods: {
    initRepair () {
      var picker = new mui.PopPicker()
      picker.setData(this.typedata)
      var showUserPickerButton = document.getElementById('type-btn')
      var userResult = document.getElementById('type-result')
      // showUserPickerButton.addEventListener('tap', function(event) {
      picker.show((items) => {
        userResult.innerText = items[0].text
        this.postData.repairtype = items[0].value
        // 返回 false 可以阻止选择框的关闭
        // return false;
      })
      // }, false);
    },
    initDate () {
      var d = new Date()
      d.setMonth(d.getMonth() + 1)
      var dtPicker = new mui.DtPicker({
        beginDate: new Date(), // 设置开始日期
        endDate: new Date(d) // 设置结束日期
      })
      dtPicker.show((selectItems) => {
        // console.log(selectItems.y);//结果为：{text: "2016",value: 2016}
        // console.log(selectItems.m);//结果为：{text: "05",value: "05"}
        // console.log(selectItems.d.text);//11
        // console.log(selectItems.h.text);//09
        // console.log(selectItems.i.text);//09
        // console.log(selectItems.text);//结果为：2016-10-11 09:09
        document.getElementById('date-result').innerText = selectItems.text
        this.postData.appointmenttime = selectItems.text
        dtPicker.dispose() // 关闭日期控件，释放资源。
      })
    },
    upload () {
      this.$refs.fileBtn.click()
    },
    goback () {
      this.$router.go(-1)
    },
    changeImage (e) {
      var file = e.target.files[0]
      if (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          this.uploadimg = reader.result
          this.postData.uploadimg = reader.result
        }
      }
    },
    toRecords () {
      this.$router.push('/repairreport')
    },
    handleRepair () {
      if (!this.judge()) return
      this.$ajax.post({
        url: this.root + 'repairorder/insertOrder',
        data: this.postData

      }).then(result => {
        if (result.status) {
          this.toRecords()
        } else {
          mui.toast('提交失败')
        }
      })
    },
    judge () {
      if (!this.postData.repairtype) {
        mui.toast('请选择维修类型！')
        return false
      }
      if (!this.postData.appointmenttime) {
        mui.toast('请选择预约时间！')
        return false
      }
      if (!this.postData.contactname) {
        mui.toast('请填写联系人！')
        return false
      }
      if (!this.postData.concatphone) {
        mui.toast('请填写联系电话！')
        return false
      }
      if (!this.postData.address) {
        mui.toast('请填写具体地址！')
        return false
      }
      if (!this.postData.description) {
        mui.toast('请填写具体描述！')
        return false
      }
      if (!PHONE_REG.test(this.postData.concatphone)) {
        mui.toast('请填写有效的手机号码！')
        return false
      }
      return true
    }
  }
}
</script>
<style  scoped>
.life-container{
  padding-top: 40px
}
.back-header {
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
}
.records-span {
  color: #6e8b3d;
  font-size: 14px;
  font-weight: 700;
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
.mui-icon-arrowright {
  font-size: 16px;
}
.room-span {
  display: block;
  padding-right: 10px;
}
.repair-user {
  height: 40px;
  background: white;
  display: flex;
  align-items: center;
  padding: 5px;
}
.repair-user-container {
  margin-top: 10px;
}
.mui-input-clear {
  height: 40px;
  margin-bottom: 0;
  width: auto;
  border: none;
  font-size: 14px;
}
.repair-user-title {
  display: block;
  width: 60px;
}
.problem-container {
  margin-top: 10px;

  width: 100%;
}
.problem-container-title {
  display: flex;
  align-items: center;
  padding: 5px;
  height: 40px;
  background: white;
  width: 100%;
}
.iconfont {
  color: #6e8b3d;
  font-weight: bold;
  margin-right: 5px;
}
.icon-asterisks-1-copy {
  font-size: 12px;
  color: red;
  margin-right: 5px;
}
.mui-input-speech {
  width: 100%;
  border: none;
}
.submit-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.submit-btn {
  background: #6e8b3d;
  color: white;
  width: 250px;
  border-radius: 20px;
  height: 40px;
  margin-bottom: 20px;
  margin-top: 20px;
}
textarea {
  margin-bottom: 0px;
}
.upload-container {
  background: white;
  display: flex;
  justify-content: center;
}
.upload-btn {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
.upload-img {
	width: 100%;
	height: 100%;
}
.title-span {
  font-weight: bold;
}
.mui-input-clear{
  padding-left: 10px;
}
</style>

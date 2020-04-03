<template>
  <div class="content-container">
    <div class="back-header">
      <div>
        <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
        <span>失物招领</span>
      </div>
      <span class="records-span" @click="toLostList()">招领记录</span>
    </div>
    <div class="com-container repair-container">
        <div class="repair-user">
          <span class="mui-icon mui-icon-paperclip"></span>
          <span class="repair-user-title">遗失物品:</span>
          <input
            v-model="postData.lostname"
            type="text"
            class="mui-input-clear"
            placeholder="请输入具体物品"
          />
        </div>
        <div class="repair-user-container">
        <div class="repair-user">
          <span class="iconfont icon-shijian1"></span>
          <span class="repair-user-title">遗失时间:</span>
          <input
            v-model="postData.losttime"
            type="text"
            class="mui-input-clear"
            placeholder="请输入遗失时间"
          />
        </div>
        <div class="problem-container">
            <div class="problem-container-title">
             <span class="mui-icon mui-icon-info"></span>
            <span>遗失详情</span>
            </div>
            <textarea v-model="postData.lostdes" type="textarea" rows="5" class="mui-input-speech" placeholder="请输入内容" />
        </div>
      </div>
      <div class="submit-container">
        <button @click="handleLost()" type="button" class="mui-btn submit-btn">确认提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import {toTimestamp} from '../../../utils/util'
import Header from '../../../components/LeftHeader'
export default {
  components: { Header },
  data () {
    return {
      postData: {
      },
      root: process.env.API_HOST
    }
  },
  mounted () {
    this.postData.villageid = this.$cookies.get('CUR_USERINFO').villageid
    this.postData.publisher = this.$cookies.get('CUR_USERINFO').adminname
    //    this.initRepair()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    toLostList () {
      this.$router.push('/lostlist')
    },
    handleLost () {
      if (!this.judge()) return
      this.$ajax.post({
        url: this.root + 'lost/insertlost',
        data: this.postData
      }).then(result => {
        if (result.status) {
          this.toLostList()
        } else {
          mui.toast('提交失败')
        }
      })
    },
    judge () {
      if (!this.postData.lostname) {
        mui.toast('请输入具体物品')
        return false
      }
      if (!this.postData.losttime) {
        mui.toast('请输入遗失时间')
        return false
      }
      if (!this.postData.lostdes) {
        mui.toast('请输入遗失详情')
        return false
      }
      return true
    }
  }
}
</script>
<style  scoped>
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
  margin-top: 100px;
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
.upload-img{
	width: 100%;
	height: 100%;
}
.iconfont{
    font-size: 24px;
    color: black;
}
.mui-input-clear{
  margin-left: 10px;
}
</style>

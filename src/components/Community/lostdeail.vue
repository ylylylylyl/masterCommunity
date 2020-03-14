<template>
    <div class="content-container">
        <Header>招领详情</Header>
        <div class="div-container repair-info">
                 <div class="info-title">失物信息</div>
                 <div class="repair-status">
                    <span>遗失地点：</span>
                    <span class="status-content">{{lost.lostname}}</span>
                </div>
                <div class="repair-status">
                    <span>遗失时间：</span>
                    <span class="status-content">{{lost.losttime}}</span>
                </div>
                 <div class="repair-status">
                    <span>遗失详情：</span>
                    <span class="status-content">{{lost.lostdes}}</span>
                </div>
                 <div class="repair-status">
                    <span>领取地址：</span>
                    <span class="status-content">物业处三楼</span>
                </div>
                <div class="repair-status">
                    <span>遗失状态：</span>
                    <span class="status-content">{{lost.losttype|losttype}}</span>
                </div>
                 <div class="repair-status">
                    <span>发布时间：</span>
                    <span class="status-content">{{lost.publishtime|format}}</span>
                </div>
            </div>
            <div v-if="lost.losttype!=0" class="div-container repair-info">
                 <div class="info-title">领回人信息</div>
                 <div class="repair-status">
                    <span>领回人：</span>
                    <span class="status-content">{{lost.username}}</span>
                </div>
                <div class="repair-status">
                    <span>领回人电话：</span>
                    <span class="status-content">{{lost.lostphone}}</span>
                </div>
                <div class="repair-status">
                    <span>领回时间：</span>
                    <span class="status-content">{{lost.backtime}}</span>
                </div>
            </div>
            <div v-if="lost.losttype==0&&isAdmin" class="div-container repair-info">
                 <div class="info-title">领回人信息</div>
                 <div class="lost-item">
                    <span>领回人：</span>
                    <input
                        v-model="postData.username"
                        type="text"
                        class="mui-input-clear"
                        placeholder="请输入领回人"
                    />
                </div>
                <div class="lost-item">
                    <span>领回人电话：</span>
                   <input
                        v-model="postData.lostphone"
                        type="text"
                        class="mui-input-clear"
                        placeholder="请输入领回人电话"
                    />
                </div>
            </div>
             <div v-if="lost.losttype==0&&isAdmin"  class="submit-container">
                <button @click="handleLostBack(lost.lostid)" type="button" class="mui-btn submit-btn">提交</button>
            </div>
        </div>
</template>
<script>
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  },
  computed: {
    lostid () {
      return this.$route.query.lostid
    },
    isAdmin () {
      if (this.$cookies.get('CUR_USERINFO').adminid) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      root: process.env.API_HOST,
      lost: {},
      postData:{}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$ajax.post({
        url: this.root + 'lost/lostdetail',
        data: {lostid: this.lostid}
      }).then(result => {
        if (result.status) {
          this.lost = result.object
        } else {

        }
      })
    },
    handleLostBack (lostid) {
      if (!this.judge()) return
      this.postData.lostid = lostid
      this.$ajax.post({
        url: this.root + 'lost/lostback',
        data: this.postData
      }).then(result => {
        if (result.status) {
          this.init()
        } else {

        }
      })
    },
    judge () {
      if (!this.postData.username) {
        mui.toast('请输入领回人')
        return false
      }
      if (!this.postData.lostphone) {
        mui.toast('请输入领回人电话')
        return false
      }
      return true
    }
  }

}
</script>
<style scoped>
.div-container{
    background: white;
    padding:0 10px 0 10px;
    margin-top: 8px;
    padding-top: 40px;
}
 .repair-status{
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .status-content{
        color: #6E8B3D;
    }
    .info-title{
        height: 40px;
        border-bottom: 1px lightgray solid;
        display: flex;
        align-items: center;
        color: #6E8B3D;
        font-weight: bold;
    }
    .info-content{
        /* height: 150px; */
        background: white;
    }
    .mui-btn-outlined{
        margin-top: 10px;
    }
    .info-des{
        margin-top: 10px;
    }
    .info-img>img{
        width: 100%;
    }
    .info-img{
        display: flex;
        justify-content: center;
    }
    .com-container{
        margin-bottom: 80px;
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
      border-radius: 10px;
      height: 40px;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    .lost-item{
        display: flex;
        align-items: center;
        margin-top: 5px;
    }
    .lost-item>span{
        flex: 1
    }
    .lost-item>input{
        flex: 3
    }
    input{
        border: none
    }
</style>
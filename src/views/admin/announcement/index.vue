<template>
    <div class="detail-container">
        <div class="back-header">
        <div>
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span>发布公告</span>
        </div>
        <span class="records-span" @click="toList()">公告列表</span>
        </div>
        <div class="detail-content">
             <div class="publisher-info">
                <div class="info-item">
                     <svg class="icon notice-icon" aria-hidden="true">
                        <use xlink:href="#icon-tongzhigonggao" />
                    </svg>
                    <input type="text" v-model="postData.noticetitle" class="mui-input-clear" placeholder="请输入标题">
                </div>
                <div class="info-item">
                    <span class="iconfont icon-yonghu1"></span>
                    <span class="item-span">{{postData.adminname}}</span>
                </div>
                <div class="info-item">
                    <span class="iconfont  icon-dizhi1"></span>
                    <span class="item-span">{{postData.addr}}</span>
                </div>
            </div>
            <div class="publish-content">
                <span class="iconfont icon-neirongguanli"></span>
                <textarea v-model="postData.noticecontent" class="announce-content" placeholder="请输入内容"></textarea>
            </div>
            <div class="btn-container" >
                <button class="mui-btn" @click="publish()">
                  {{loading?'发布中':'发布公告'}}
                </button>
            </div>
        </div>

    </div>
</template>
<script>
import Header from '../../../components/LeftHeader'
export default {
  components: {
    Header
  },
  data () {
    return {
      postData: {
        adminname: this.$cookies.get('CUR_USERINFO').username,
        addr: this.$cookies.get('CUR_USERINFO').addr,
        villageid:this.$cookies.get('CUR_USERINFO').villageid
      },
      root: process.env.API_HOST,
      loading: false
    }
  },
  methods: {
    publish () {
      if (!this.judge()) return
      this.loading = true
      this.$ajax.post({
        url: this.root + 'notice/insertnotice',
        data: this.postData
      })
        .then(res => {
          this.loading = false
          if (res.status) {
            this.$router.push('/adminannounce')
          }
        }, err => {
          this.loading = true
        })
    },
    toList () {
      this.$router.push('/adminannounce')
    },
    goback () {
      this.$router.go(-1)
    },
    judge () {
      if (!this.postData.noticetitle) {
        mui.toast('请输入标题！')
        return false
      }
      if (!this.postData.noticecontent) {
        mui.toast('请输入内容！')
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
input{
    border: none;
    margin-left: 5px;
}
.back-header {
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
}
.detail-container{
    background: whitesmoke;
    height: 100%;
}
.detail-content{
    padding-top: 40px;

}
.publisher-info{

    padding-top: 10px;
    background: white;
}
.info-item{
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;
    padding-left: 5px;
    border-bottom: 1px rgb(240, 240, 240) solid;
}
.item-span{
    margin-left: 10px;
}
.publish-content{
    margin-top: 10px;
}
.publish-content{
    background: white;
    height: 100%;
    padding: 15px;
    padding-left: 5px;
    display: flex;
}
.publish-content-p{
    margin-left: 10px;
    font-size: 12px;
    font-weight: 500;
}
.announce-content{
    margin-left: 15px;
    height: 200px;
}
.btn-container{
    padding: 10px;
}
.mui-btn{
    background: #6e8b3d;
    color: white;
    width: 100%;
}
.icon{
  font-size: 16px;
}
</style>

<template>
<div class="content-contaier">
   <Header>更换头像</Header>
   <div class="avatar-container">
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
    <div class="btn-container">
        <button type="button" @click="commitAvatar()" class="mui-btn mui-btn-primary">提交</button>
        <button type="button" @click="commitBind()" class="mui-btn mui-btn-primary">返回</button>
      </div>
   </div>
   
</div>
</template>

<script>
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  },
  data () {
    return {
      uploadimg: '',
      root: process.env.API_HOST
    }
  },
  methods: {
    upload () {
      this.$refs.fileBtn.click()
    },
    changeImage (e) {
      var file = e.target.files[0]
      if (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          this.uploadimg = reader.result
        }
      }
    },
    commitAvatar () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      const avatar = this.uploadimg
      this.$ajax.post({
        url: this.root + 'user/updateAvatar',
        data: {avatar, userid}

      }).then(result => {
        if (result.status) {
          this.$router.push('/selfinfo')
        } else {
          mui.toast('提交失败')
        }
      })
    }
  }
}
</script>
<style scoped>
.content-contaier{
  background-color: white
}
.upload-container{
  padding-top: 80px;
}
.upload-btn{
  height: 150px;
  width: 150px;
}
.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.btn-container .mui-btn{
  width: 80%;
  height: 40px;
  border: none;
  margin-bottom: 20px;
}
.btn-container .mui-btn:nth-child(1) {
  background: #6e8b3d;
}
.btn-container .mui-btn:nth-child(2) {
  background: lightgray;
  color: black
}
</style>
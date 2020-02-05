<template>
  <div class="container">
    <div class="header">
      <button type="button" class="mui-btn" @click="$router.push('/forum')">取消</button>
      <div class="header-title-container">
        <span class="title">发布帖子</span>
        <p>admin</p>
      </div>
      <button @click="publish()" type="button" class="mui-btn publish-btn">发布</button>
    </div>
      <div>
        <input  v-model="postData.forumtitle" type="text" class="mui-input-clear" placeholder="请输入标题">
        <textarea v-model="postData.forumcontent" class="content-txt" placeholder="分享新鲜事"></textarea>
        <div class="upload-container">
            <div class="picture-container" v-show="postData.uploadimg&&postData.uploadimg.length!=0">
                <div class="img-container" v-for="(item,key) in postData.uploadimg" :key="key">
                    <img :src="item" class="upload-img" />
                </div>
                <div class="upload-item" @click="uploadImg" v-if="addPic">
                    <span class="mui-icon mui-icon-plusempty"></span>
                </div>
            </div>
          <input
            @change="changeImage($event)"
            ref="fileBtn"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            style="display:none;position: absolute;"
            id="btn-upload"
            capture="camera"
          />
        </div>
        <div class="radio-group">
          <div class="mui-input-row mui-radio">
            <label>分享贴</label>
            <input name="radio1" type="radio" value="0" v-model="postData.forumtype">
          </div>
          <div class="mui-input-row mui-radio">
            <label>提问帖</label>
            <input name="radio1" type="radio" value="1" v-model="postData.forumtype">
          </div>
        </div>
      </div>
    <div class="footer">
      <button class="mui-btn photo" @click="uploadImg">
        <span class="mui-icon mui-icon-image"></span>
      </button>

      <button class="emoji" @click="toogleDialogEmoji">😃</button>
    </div>
    <VEmojiPicker
      v-show="showDialog"
      :pack="emojisNative"
      labelSearch="Search"
      @select="onSelectEmoji"
    />
  </div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker'

import packEmoji from 'v-emoji-picker/data/emojis.js'
export default {
  components: {
    VEmojiPicker
  },
  data: () => ({
    valueInput: '',
    showDialog: false,
    uploadimg: [],
    addPic: true,
    postData: {
      uploadimg: [],
      forumcontent:''
    }
  }),
  methods: {
    selectEmoji (emoji) {
      console.log(emoji)
    },
    toogleDialogEmoji () {
      this.showDialog = !this.showDialog
    },
    onSelectEmoji (dataEmoji) {
      this.postData.forumcontent += dataEmoji.emoji
      // Optional
      // this.toogleDialogEmoji();
    },
    changeImage (e) {
      var file = e.target.files[0]
      if (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          if (this.postData.uploadimg.length < 6) {
            this.postData.uploadimg.push(reader.result)
          } else {
            this.addPic = false
            mui.toast('最多上传六张图片')
          }
        }
      }
    },
    uploadImg () {
      this.$refs.fileBtn.click()
    },
    publish () {
      console.log(this.postData)
    }
  },
  computed: {
    emojisNative () {
      return packEmoji
    }
  }
  //   events:{
  //     select: 'Emit event on Selected Emoji',
  //     changeCategory: 'Emit event on Change Category'
  //   }
}
</script>

<style scoped>
.container{
    background: white;
    height: 100vh;
}
.header {
  height: 50px;
  display: flex;
  background: whitesmoke;
  justify-content: space-between;
  padding: 5px;
}
.header-title-container {
  margin-top: 4px;
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-weight: bold;
  font-size: 16px;
}
.publish-btn {
  border-radius: 60px;
  background-color: #6e8b3d;
  color: white;
}
.content-txt {
  min-height: 150px;
  margin-top: 10px;
}
.footer {
    position: fixed;
    width: 100%;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
}
textarea {
  margin-bottom: 0px;
  border: none;
}
.mui-input-clear{
  padding-left: 15px;
  border: none;
  border-bottom: 1px #6e8b3d solid ;
  font-weight: bold;
}
.emoji {
  width: 50%;
}
.photo {
  width: 50%;
}
#EmojiPicker {
  width: 100%;
}
.upload-img{
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
}
.content-container{
    background: white;

}
.picture-container{
    display: flex;
    flex-wrap: wrap;
}
.img-container{
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    flex-wrap: wrap;
}
.img-container ::after{
    content: "";
    flex: auto;
}
.upload-item{
    height: 100px;
    width: 100px;
    background: white;
    border: 1px lightgray solid;
    text-align: center;
    line-height: 100px;
     margin-left: 5px;
}
.radio-group{
  display: flex;
}
</style>

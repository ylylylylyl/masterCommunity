<template>
  <div class="container">
    <div class="header">
      <button type="button" class="mui-btn" @click="$router.push('/forum')">取消</button>
      <div class="header-title-container">
        <span class="title">发布帖子</span>
        <p>admin</p>
      </div>
      <button type="button" class="mui-btn publish-btn">发布</button>
    </div>
      <div>
        <textarea v-model="valueInput" class="content-txt" placeholder="分享新鲜事"></textarea>
        <div class="upload-container">  
            <div class="picture-container" v-show="uploadimg.length!=0">
                <div class="img-container" v-for="(item,key) in uploadimg" :key="key">
                    <img :src="item" class="upload-img" />
                </div>
                <div class="upload-item" @click="uploadImg" >
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
import VEmojiPicker from "v-emoji-picker";

import packEmoji from "v-emoji-picker/data/emojis.js";
export default {
  components: {
    VEmojiPicker
  },
  data: () => ({
    valueInput: "",
    showDialog: false,
    uploadimg: []
  }),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji);
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    onSelectEmoji(dataEmoji) {
      this.valueInput += dataEmoji.emoji;
      // Optional
      // this.toogleDialogEmoji();
    },
    changeImage(e) {
      var file = e.target.files[0];
      if(file){
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
      this.uploadimg .push (reader.result);
        };
     }
    },
    uploadImg(){
        this.$refs.fileBtn.click();
    }
  },
  computed: {
    emojisNative() {
      return packEmoji;
    }
  }
  //   events:{
  //     select: 'Emit event on Selected Emoji',
  //     changeCategory: 'Emit event on Change Category'
  //   }
};
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
</style>
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
        <div class="content-container">
            <textarea v-model="valueInput" class="content-txt" placeholder="分享趣事。。。。。"></textarea>
        </div>
        <div class="footer">
            <button type="button" class="mui-btn photo">
                <span class="mui-icon mui-icon-image "></span>
            </button>
            
            <button class="emoji" @click="toogleDialogEmoji">😃</button>
           
        </div>
 <VEmojiPicker 
             v-show="showDialog"
            :pack="emojisNative"
            labelSearch="Search"
            @select="onSelectEmoji" />
    </div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker';

import packEmoji from "v-emoji-picker/data/emojis.js";
export default {
    props:{
        // pack: { type: Array, required: true },
        // labelSearch: { type: String, default: 'Pesquisar...' },
        // showCategory: { type: Boolean, default: true },
        // emojisByRow: { type: Number, default: 5}
    },
    components: {
        VEmojiPicker
    },
    data: () => ({
        valueInput: "Someting text ",
        showDialog: false
    }),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
     onSelectEmoji(dataEmoji) {
      this.valueInput += dataEmoji.emoji;
      // Optional
      // this.toogleDialogEmoji();
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
}
</script>

<style scoped>
   .header{
       height:50px;
       display: flex;
       background: whitesmoke;
       justify-content: space-between;
       padding: 5px;
   }
   .header-title-container{
       margin-top: 4px;
       margin-bottom: 2px;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }
   .title{
       font-weight: bold;
       font-size: 16px;
   }
   .publish-btn{
       border-radius: 60px;
       background-color: #6e8b3d;
       color: white;
   }
   .content-txt{
      min-height:300px;
   }
   .footer{
       display: flex;
       justify-content: space-between;
   }
   textarea{
       margin-bottom: 0px;
   }
   .emoji{
       width: 50%;
   }
   .photo{
       width: 50%;
   }
   #EmojiPicker{
       width: 100%;
   }
</style>
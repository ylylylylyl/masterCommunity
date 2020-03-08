<template>
    <div class="chat-container">
        <div class="chat-item"  v-for="(item,i) in msgList">
          <div class="chat-item-left" v-if="!item.bySelf">
            <div class="avatar">
              <span class="avatar-span">{{item.from|avatar}}</span>
            </div>
            <div class="bubble-container">
                <!-- <div class="triangle"></div> -->
                <div class="message-container">
                  <span class="message-span">{{item.msg}}</span>
                </div>
            </div>
          </div>
          <div class="chat-item-right" v-if="item.bySelf">
            <div class="bubble-container-right">
                <!-- <div class="triangle"></div> -->
                <div class="message-container-right">
                  <span class="message-span">{{item.msg}}</span>
                </div>
            </div>
            <div class="avatar">
              <span class="avatar-span">{{username|avatar}}</span>
            </div>
          </div>
        </div>
        <div class="send-container">
          <input v-model="data" type="text" class="mui-input-clear" placeholder="请输入">
          <button type="button" class="mui-btn" @click="onSendTextMsg()">发送</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: '',
      type: 'contact',
      activedKey: {
        contact: '',
        group: '',
        chatroom: ''
      },
    }
  },
  mounted () {
    this.onGetContactUserList()
    this.getCurrentMsg()
    console.log(this.msgist)
  },
  computed: {
    chatId () {
      return this.$route.params.id
    },
    ...mapGetters({
      msgList: 'onGetCurrentChatObjMsg',
      contact: "onGetContactUserList",
    }),
    username () {
      return this.$route.params.username
    }
  },
  methods: {
    ...mapActions(['onSendText', 'onGetCurrentChatObjMsg','onGetContactUserList']),
    onSendTextMsg () {
      console.log( this.activedKey[this.type])
      // if (this.$data.message == "" || this.$data.message == "\n") {
      //   this.$data.message = ""
      //   return
      // }
      this.onSendText({
        chatType: this.type,
        chatId: this.chatId,
        message: this.data
      });
      this.data= ""
    },
    select2 (key, index) {
      this.$data.selectedKeys = [index];
      this.select(key);
      this.$data.activedKey[this.type] = key;
    },
    getCurrentMsg (props) {
      this.onGetCurrentChatObjMsg({
        type: 'contact',
        id: this.chatId
      });
    },
  },
  filters: {
    avatar (name) {
      return name.slice(name.length - 4)
    }
  }
}
</script>
<style scoped>
input{
  border-left: none;
  border-right: none;
}
.chat-container{
  padding-top: 40px;
}
.send-container{
    position: fixed;
    display: flex;
    bottom: 0px;
    justify-content: space-between;
    width: 100%;
}
.mui-btn{
  background-color: #6e8b3d;
  color: white;
}
.avatar{
  width: 50px;
  height: 50px;
  background-color: #3396FB;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-span{
  color: white;
  font-weight: bold;
}
.chat-item{
  margin: 0 10px;
}
.chat-item-left{
  display: flex;
  margin-top: 10px;
  align-items: baseline;
}
.chat-item-right{
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  align-items: baseline;
}
.message-container{
  min-height: 50px;
  border: none;
  border-radius: 0 10px 10px 10px;
  min-width:100px ;
  margin-left: 10px;
  background-color: #BBE4FF;
  display: flex;
  align-items: center;
}
.message-container-right{
  min-height: 40px;
  border: none;
  border-radius: 10px 0px 10px 10px;
  min-width:100px ;
  margin-left: 10px;
  background-color: #FFFFFF;
    display: flex;
  align-items: center;
}
.bubble-container{
  position: relative;
  margin-left: 10px;
}
.bubble-container-right{
  position: relative;
  margin-right: 10px;
}
.triangle{
  position: absolute;
  height: 0;
  width: 0;
  border: 8px solid #6e8b3d;
  border-left: none;
  border-top-color:transparent ;
  border-bottom-color: transparent;
  margin-top: 6px;
}
.message-span{
  font-size: 16px;
  margin-left: 5px;
}

</style>
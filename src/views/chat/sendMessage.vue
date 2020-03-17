<template>
    <div class="chat-container">
      <span class="name">{{toname}}</span>
        <div class="chat-item"  v-for="(item,i) in msgList">
          <div class="chat-item-left" v-if="!item.bySelf">
            <div class="avatar-box">
              <!-- <div class="avatar">
                <span class="avatar-span">{{item.from|avatar}}</span>
              </div> -->
            </div>
           
            <div class="bubble-box">
                <div class="message-container bubble-container">
                  <span class="message-span">{{item.msg}}</span>
                </div>
                <!-- 聊天时间 -->
                <div
                  v-if="item.status !== 'recall'"
                  class="time-style"
                  :style="{'text-align':item.bySelf ? 'right':'left'}"
                >{{renderTime(item.time)}} {{item.bySelf?status[item.status]:''}}
              </div>
            </div>

          </div>
          <div class="chat-item-right" v-if="item.bySelf">
            <div class="bubble-box">
              <div class="message-container-right bubble-container-right">
                <span class="message-span">{{item.msg}}</span>
              </div>
            </div>
            <!-- <div class="avatar-box">
              <div class="avatar">
                <span class="avatar-span">{{username|avatar}}</span>
              </div>
            </div> -->
          </div>
        </div>
        <div class="send-container">
          <input v-model="data" type="text" class="mui-input-clear" placeholder="请输入">
          <button type="button" class="mui-btn" @click="onSendTextMsg()">发送</button>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
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
      status: {
        sending: '发送中',
        sent: '已发送',
        read: '已读'
      }
    }
  },
  mounted () {
    this.onGetContactUserList()
    this.getCurrentMsg()
  },
  computed: {
    chatId () {
      return this.$route.params.id
    },
    ...mapGetters({
      msgList: 'onGetCurrentChatObjMsg',
      contact: 'onGetContactUserList',
    }),
    username () {
      return this.$route.params.username
    },
    toname () {
      return this.$route.params.toname
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
      })
      Vue.$store.commit('updateMessageStatus', {
        action: 'oneUserReadMsgs',
        readUser: this.chatId
      })
    },
    renderTime (time) {
      const nowStr = new Date();
      const localStr = time ? new Date(time) : nowStr;
      const localMoment = moment(localStr);
      const localFormat = localMoment.format("MM-DD hh:mm A");
      return localFormat
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
.name{
  display: block;
  text-align: center;

}
.chat-container{
  padding-top: 40px;
  padding-bottom:40px;
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
  flex: 1;
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
  min-height: 40px;
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
.bubble-box{
  /* flex: 5; */
}
.avatar-box{
  /* flex: 1; */
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
  padding:10px;
  word-break:break-all;
}
.time-style {
  color: gray;
  margin-left: 20px;
  margin-top: 5px;
}
</style>
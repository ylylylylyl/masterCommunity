<template>
    <div class="group-container">
      <Nothing v-if="!groupList['group'].length"></Nothing>
        <div
          class="item"
            v-for="(item,key) in groupList['group']"
            @click="select2(item)"
            :key = key>
            <div class="avatar">
            <span class="avatar-span">{{item.groupname|avatar}}</span>
            </div>
            <div class="message-container">
            <div class="message-info">
                <div>
                <span class="message-name">{{item.groupname}}</span>
                <div class="icon-style" v-if="getUnreadNum(item) != 0">
                    <span class="unreadNum">{{getUnreadNum(item)}}</span>
                </div>
                </div>
                <span class="time-style">{{getLastMsg(item).msgTime}}</span>
            </div>
            <div class="message-detail">{{getLastMsg(item).lastMsg}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Nothing from '../../components/nothing'
export default {
  components: { Nothing },
  beforeMount () {
    this.onGetGroupUserList()
    console.log(this.groupList['group'])
  },
  computed: {
    ...mapGetters({
      group: 'onGetGroupUserList'
    }),
    groupList () {
      return {
        group: this.group.filter(item => {
          if (item) {
            return item
          }
        }),
        contact: this.contact,
        chatroom: this.chatroom
      }
    },
    chatList () {
      return this.$store.state.chat.msgList
    },
    username () {
      return this.$route.query.username
    }
  }, 
  methods: {
    ...mapActions(['onGetGroupUserList']),
    select2 (item) {
      this.$router.push(`/chat/group/${item.groupid}/${this.username}`)
    },
    getUnreadNum (item) {
      const chatList = this.chatList['group']
      let userId = item.groupid
      const currentMsgs = chatList[userId] || []
      let unReadNum = 0
      currentMsgs.forEach(msg => {
        if (msg.status !== "read" && msg.status !== "recall" && !msg.bySelf) {
          unReadNum++;
        }
      });
      return unReadNum
    },
    renderTime (time) {
      const nowStr = new Date();
      const localStr = time ? new Date(time) : nowStr
      const localMoment = moment(localStr)
      const localFormat = localMoment.format("MM-DD hh:mm A")
      return localFormat
    },
    getLastMsg (item) {
      // let { name, params } = this.$route;
      let  name = 'group'
      console.log(this.chatList)
      const chatList = this.chatList[name]
      console.log(chatList)
      let userId = ""
      if (name == 'contact') {
        userId = item.name
      } else if (name == 'group') {
        userId = item.groupid
      } else {
        userId = item.id
      }
      const currentMsgs = chatList[userId] || []
      let lastMsg = ''
      let lastType =
        currentMsgs.length && currentMsgs[currentMsgs.length - 1].type
      if (currentMsgs.length) {
        if (lastType === 'img') {
          lastMsg = '[image]'
        } else if (lastType === 'file') {
          lastMsg = currentMsgs[currentMsgs.length - 1].filename
        } else if (lastType === 'audio') {
          lastMsg = '[audio]'
        } else if (lastType === 'vidio') {
          lastMsg = '[vidio]'
        } else {
          lastMsg = currentMsgs[currentMsgs.length - 1].msg
        }
      }
      const msgTime = currentMsgs.length
        ? this.renderTime(currentMsgs[currentMsgs.length - 1].time)
        : ""
      return {
        lastMsg,
        msgTime
      }
    },
  },
  filters:{
    avatar (name) {
      return name.slice(0,2)
    }
  }
}
</script>
<style scoped>
.group-container{
  height: 100%;
}
.group-container{
    padding-top: 40px;
}
.item {
  height: 70px;
  border-bottom: 1px lightgray solid;
  display: flex;
  align-items: center;
  background: white;
}
.avatar{
  width: 50px;
  height: 50px;
  background-color: #3396FB;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.avatar-span{
  color: white;
  font-weight: bold;
}
.message-info{
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
}
.message-container{
  width: 80%;
  height: 40px;
  overflow: hidden;
}
.message-detail{
  margin-left: 10px;
  mask-type: 10px;
  opacity: 0.6;
}
.message-name{
  font-size: 16px;
}
.icon-style {
  display: inline-block;
  background-color: #f04134;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  line-height: 1.5;
  text-align: center;
}
</style>
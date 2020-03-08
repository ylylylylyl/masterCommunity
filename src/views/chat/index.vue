<template>
    <div class="content-container">
        <Header>聊天</Header>
            <div class="mui-content">
                    <div id="segmentedControl" class="mui-segmented-control">
                      <div class="icon-container mui-control-item  mui-active">
                        <span class="iconfont icon-wode"></span>
                        <a @click="toFriendList()" >好友 </a>
                      </div>
                      <div class="icon-container  mui-control-item">
                        <span class="iconfont icon-yonghu1"></span>
                        <a @click="toGroupList()">聊天室</a>
                      </div>
                    </div>
                <router-view class="router">
                    <router-link></router-link>
                </router-view>
                <!-- <div>
                    <div id="item2" class="mui-control-content">
                         <MessageBox :type=type v-if="type==='contact'" ref="messageBox"></MessageBox>
                    </div>
                    <div id="item3" class="mui-control-content">
                        <ul v-if="type==='group'" class="mui-table-view">
                            <li class="mui-table-view-cell">
                                第三个选项卡子项-1
                            </li>
                            <li class="mui-table-view-cell">
                                第三个选项卡子项-2
                            </li>
                            <li class="mui-table-view-cell">
                                第三个选项卡子项-3
                            </li>
                        </ul>
                    </div>
                </div> -->
            </div>
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
import MessageBox from './messagebox'
import { mapState, mapActions } from 'vuex'
export default {
  components: {Header, MessageBox},
  computed: {
    chatList () {
      console.log(this.$store.state.chat.msgList)
      return this.$store.state.chat.msgList
    }
  },
  data () {
    return {
      type: 'contact'
    }
  },
  methods: {
    ...mapActions(['onLogout', 'onGetFirendBlack', 'onGetContactUserList']),
    toFriendList () {
    //   this.$refs.messageBox.onGetContactUserList()
      this.type = 'contact'
    },
    toGroupList () {
      this.type = 'group'
    },
    getUnreadNum (item) {
      const { name, params } = this.$route;
      console.log(this.chatList)
      const chatList = this.chatList[name]
      let userId = "";
      if (name == "contact") {
        userId = item.name;
      } else if (name == "group") {
        userId = item.groupid;
      } else {
        userId = item.id;
        return 0;
      }
      const currentMsgs = chatList[userId] || [];
      let unReadNum = 0;
      currentMsgs.forEach(msg => {
        if (msg.status !== "read" && msg.status !== "recall" && !msg.bySelf) {
          unReadNum++;
        }
      });
      return unReadNum;
    },
  }
}
</script>
<style scoped>
.body{
  height: auto;
}
.content-container{
    background-color: none;
    background: none;
}
.mui-content {
    margin-top: 40px;
}

.icon-container{
  display: flex;
  align-items: center;
  justify-content: center;
}
.iconfont{
  margin-right: 10px;
}
.mui-segmented-control{
  display: flex;
  border: none;
  border-bottom: 2px white solid;
  position: fixed;
  z-index: 998;
  top: 40px;
  border-top: 1px whitesmoke solid;
  background: #EFEFF4;
  height: 40px;
}
.mui-segmented-control .mui-control-item.mui-active{
    background: none !important;
    color: #6e8b3d;
    border: none;
    font-weight: bold;
    border-bottom: 2px #6e8b3d solid;
}
.mui-segmented-control .mui-control-item.mui-active>a{
  color: #6e8b3d;
}
.mui-control-item{
  border: none;
}
</style>

.mui-segmented-control{
    /* border: 1px #6e8b3d solid; */
    border: none;
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.mui-segmented-control .mui-control-item{
    border: #6e8b3d;
    color: black;
}
.mui-segmented-control a{
    display: block;
    flex: 1;
}
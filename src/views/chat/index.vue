<template>
    <div class="content-container">
        <!-- <Header>聊天</Header> -->
        <div class="back-header">
          <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
          <span>
              聊天
          </span>
          <span class="mui-icon mui-icon-plus" @click="dialog()"></span>
        </div>
        <!-- <span class="mui-icon mui-icon-plus" @click="dialog()"></span> -->
        <div v-if="ishow" class="dialog-container">
          <div class="triangle-container">
            <div class="triangle"></div>
          </div>
          <div  class="top-dialog fadeInDown">
            <ul class="dialog-li">
              <li @click="addFriends()">
                <span class="mui-icon mui-icon-personadd"></span>
                添加好友
              </li>
              <li  @click="addGroup()">
                <span class="mui-icon mui-icon-chatboxes"></span>
                创建群组
              </li>
            </ul>
          </div>
        </div>
        <div class="mui-content">
                <div id="segmentedControl" class="mui-segmented-control">
                  <div @click="toFriendList()" class="icon-container mui-control-item  mui-active">
                    <span class="iconfont icon-wode"></span>
                    <a  >好友 </a>
                  </div>
                  <div @click="toGroupList()" class="icon-container  mui-control-item">
                    <span class="iconfont icon-yonghu1"></span>
                    <a >聊天室</a>
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
        <div  v-show="this.isShowFriendRequest" class="mui-popup mui-popup-in" style="display: block;">
          <div class="mui-popup-inner">
            <div class="mui-popup-title">好友请求</div>
            <div class="mui-popup-text">{{this.$store.state.friendModule.friendRequest.status}}</div>
          </div>
          <div class="mui-popup-buttons">
            <span @click="acceptSubmit" class="mui-popup-button" type="primary">同意</span>
            <span @click="refusedClick" class="mui-popup-button mui-popup-button-bold">拒绝</span>
          </div>
        </div>
        <!-- <div class="mui-popup mui-popup-in" style="display: block;">
          <div class="mui-popup-inner">
            <div class="mui-popup-title">创建群组</div>
            <div class="mui-popup-text">请输入对方手机号码：</div>
            <div class="mui-popup-input">
              <input type="text" autofocus="" placeholder="">
            </div>
          </div>
          <div class="mui-popup-buttons">
            <span class="mui-popup-button">取消</span>
            <span class="mui-popup-button mui-popup-button-bold">确定</span>
          </div>
        </div> -->
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
import MessageBox from './messagebox'
import { mapState, mapActions } from 'vuex'
export default {
  components: {Header, MessageBox},
  mounted () {
    localStorage.setItem('chatname',this.username)
  },
  computed: {
    chatList () {
      console.log(this.$store.state.chat.msgList)
      return this.$store.state.chat.msgList
    },
    isShowFriendRequest () {
      return this.$store.state.friendModule.friendRequest.isShow
    },
    username () {
      return this.$route.query.username
    }
  },
  data () {
    return {
      type: 'contact',
      userphone: '',
      ishow: false,
      isaddGroup: false,
      form: {
        groName: '',
        desc: '',
        radio: '2',
        radiopom: '2',
        membersList: []
      }
    }
  },
  methods: {
    ...mapActions([
      'onLogout',
      'onGetFirendBlack',
      'onGetContactUserList',
      'addfirend',
      'acceptSubscribe',
      'declineSubscribe',
      'acceptSubscribe',
      'declineSubscribe',
      'onCreateGroup'
    ]),
    toFriendList () {
    //   this.$refs.messageBox.onGetContactUserList()
      this.type = 'contact'
      this.$router.push(`/chat/contact?username=${localStorage.getItem('chatname')}`)
    },
    toGroupList () {
      this.type = 'group'
      this.$router.push(`/chat/group?username=${localStorage.getItem('chatname')}`)
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
    changeModal () {
      this.$store.state.friendModule.friendRequest.isShow = !this.$store.state
        .friendModule.friendRequest.isShow
    },
    addFriends () {
      this.ishow = false
      var btnArray = ['取消', '确定']
      mui.prompt('请输入对方手机号码：', '', '添加好友', btnArray, (e) => {
        if (e.index == 1) {
          const option = {
            id: e.value,
            params: this.$route.query.username
          };
          this.addfirend(option)
          mui.toast('已发送请求')
        } else {
        //   info.innerText = '你点了取消按钮'
        }
      })
    },
    refusedClick () {
      const options = {
        id: this.$store.state.friendModule.friendRequest.from,
        params: this.$route.query.username
      }
      this.declineSubscribe(options)
      this.changeModal()
    },
    acceptSubmit () {
      const id = this.$store.state.friendModule.friendRequest.from
      this.acceptSubscribe(id)
      this.changeModal()
    },
    dialog () {
      this.ishow = !this.ishow
    },
    addGroup () {
      this.ishow = false
      var btnArray = ['取消', '确定']
      mui.prompt('请输入群名：', '', '创建群组', btnArray, (e) => {
        if (e.index == 1) {
          this.form.groName = e.value 
          this.postCreateGroup()
          mui.toast('正在创建')
        }
      })
    },
    postCreateGroup () {
      this.onCreateGroup({
        groupname: this.form.groName,
        desc: this.form.desc,
        members: this.form.membersList,
        approval: this.form.radiopom == 2,
        pub: this.form.radio == 2
      })
    },
    goback () {
      this.$router.push('/home')
    }
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
    height: 100%;
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
.mui-icon-plus{
  position: fixed;
  top: 10px;
  color: black;
  right: 5px;
  z-index: 999;
  font-size: 18px;
  font-weight: bold;
}
.top-dialog{
  width: 150px;
  height: 80px;
  background-color: whitesmoke;
  border-radius: 10px;
}
.dialog-li>li{
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.dialog-li>li:nth-child(1){
  border-bottom: 1px lightgray solid;
}
.triangle{
  width: 0;
  height: 0;
  border: 6px whitesmoke solid;
  border-top: none;
  border-left-color: transparent;
  border-right-color: transparent;
  margin-right: 5px;
}
.triangle-container{
  display: flex;
  justify-content: flex-end;

}
.dialog-container{
  top: 30px;
  right: 5px;
  position: fixed;
  z-index: 1000;
}
.mui-input-group{
  position: absolute;
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
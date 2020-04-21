<template>
  <div id="offCanvasWrapper" class="chat-container mui-off-canvas-wrap mui-draggable">
    <!--侧滑菜单容器-->
    <Aside></Aside>
    <!--菜单部分-->
    <div class="mui-inner-wrap">
      <div class="chat-container-top">
        <span class="mui-icon mui-icon-back"></span>
        <span>{{groupinfoList.name}}{{groupinfoList.gid}}</span>
        <span id="offCanvasShow" class="mui-icon mui-icon-more"></span>
      </div>
      <div class="chat-item" v-for="(item,i) in group">
        <div class="chat-item-left" v-if="!item.bySelf">
          <div class="avatar-box">
            <div class="avatar">
              <span class="avatar-span">{{item.from|avatar}}</span>
            </div>
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
            >{{renderTime(item.time)}} {{item.bySelf?status[item.status]:''}}</div>
          </div>
        </div>
        <div class="chat-item-right" v-else>
          <div class="bubble-box">
            <div class="message-container-right bubble-container-right">
              <span class="message-span">{{item.msg}}</span>
            </div>
          </div>
          <div class="avatar-box">
            <div class="avatar">
              <span class="avatar-span">{{username|avatar}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="send-container">
        <input v-model="data" type="text" class="mui-input-clear" placeholder="请输入" />
        <button type="button" class="mui-btn" @click="onSendTextMsg()">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
import Aside from './groupMessDetail'
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {Aside},
  data () {
    return {
      data: "",
      type: "group",
      activedKey: {
        contact: "",
        group: "",
        chatroom: ""
      },
      status: {
        sending: "发送中",
        sent: "已发送",
        read: "已读"
      }
    };
  },
  mounted () {
    this.onGetGroupUserList()
    this.getCurrentMsg()
    this.init()
    this.onGetGroupinfo({select_id: this.groupid})
    console.log(this.group)
  },
  computed: {
    groupid() {
      return this.$route.params.id;
    },
    ...mapGetters({
      // group: "onGetGroupUserList"
      group: 'onGetCurrentChatObjMsg'
    }),
    username() {
      return this.$route.params.username;
    },
    groupinfoList () {
      return this.$store.state.group.groupInfo
    }
  },
  methods: {
    ...mapActions([
      "onSendText",
      "onGetGroupUserList",
      "onGetContactUserList",
      "onGetGroupinfo",
      "updateMessageStatus",
      "onGetCurrentChatObjMsg"
    ]),
    onSendTextMsg() {
      console.log(this.activedKey[this.type]);
      // if (this.$data.message == "" || this.$data.message == "\n") {
      //   this.$data.message = ""
      //   return
      // }
      this.onSendText({
        chatType: this.type,
        chatId: this.groupid,
        message: this.data
      });
      this.data = "";
    },
    select2(key, index) {
      this.$data.selectedKeys = [index];
      this.select(key);
      this.$data.activedKey[this.type] = key;
    },
    getCurrentMsg(props) {
      this.onGetCurrentChatObjMsg({
        type: "group",
        id: this.groupid
      });
      Vue.$store.commit("updateMessageStatus", {
        action: "oneUserReadMsgs",
        readUser: this.groupid
      });
    },
    renderTime(time) {
      const nowStr = new Date();
      const localStr = time ? new Date(time) : nowStr;
      const localMoment = moment(localStr);
      const localFormat = localMoment.format("MM-DD hh:mm A");
      return localFormat;
    },
    getGroupInfo() {
      this.onGetGroupinfo({
        select_id: this.groupid
      });
    },
    init() {
      mui.init({
        swipeBack: false
      });
      // 侧滑容器父节点
      var offCanvasWrapper = mui("#offCanvasWrapper");

      // 主界面容器
      // 菜单容器
      var offCanvasSide = document.getElementById("offCanvasSide");
      // 移动效果是否为整体移动
      var moveTogether = false;
      // 侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
      var classList = offCanvasWrapper[0].classList;
      // 变换侧滑动画移动效果；
      offCanvasSide.classList.remove("mui-transitioning");
      offCanvasSide.setAttribute("style", "");
      classList.remove("mui-slide-in");
      classList.remove("mui-scalable");
      classList.add("mui-slide-in");
      console.log(offCanvasWrapper);
      // offCanvasWrapper.offCanvas().refresh()

      document
        .getElementById("offCanvasShow")
        .addEventListener("tap", function() {
          // offCanvasWrapper.offCanvas('show')
          mui(".mui-off-canvas-wrap").offCanvas("show");
        });
      document
        .getElementById("offCanvasHide")
        .addEventListener("tap", function() {
          offCanvasWrapper.offCanvas("close");
        });
      // 主界面和侧滑菜单界面均支持区域滚动；
      mui("#offCanvasSideScroll").scroll();
      mui("#offCanvasContentScroll").scroll();
    }
  },
  filters: {
    avatar(name) {
      return name.slice(name.length - 4);
    }
  }
};
</script>
<style scoped>
input {
  border-left: none;
  border-right: none;
}
.chat-container {
  padding-top: 40px;
  padding-bottom: 40px;
}
.send-container {
  position: fixed;
  display: flex;
  bottom: 0px;
  justify-content: space-between;
  width: 100%;
}
.mui-btn {
  background-color: #6e8b3d;
  color: white;
}
.avatar {
  width: 50px;
  height: 50px;
  background-color: #3396fb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.avatar-span {
  color: white;
  font-weight: bold;
}
.chat-item {
  margin: 0 10px;
}
.chat-item-left {
  display: flex;
  margin-top: 10px;
  align-items: baseline;
}
.chat-item-right {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  align-items: baseline;
}
.message-container {
  min-height: 40px;
  border: none;
  border-radius: 0 10px 10px 10px;
  min-width: 100px;
  margin-left: 10px;
  background-color: #bbe4ff;
  display: flex;
  align-items: center;
}
.message-container-right {
  min-height: 40px;
  border: none;
  border-radius: 10px 0px 10px 10px;
  min-width: 100px;
  margin-left: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
}
.bubble-box {
  /* flex: 5; */
}
.avatar-box {
  /* flex: 1; */
}
.bubble-container {
  position: relative;
  margin-left: 10px;
}
.bubble-container-right {
  position: relative;
  margin-right: 10px;
}
.triangle {
  position: absolute;
  height: 0;
  width: 0;
  border: 8px solid #6e8b3d;
  border-left: none;
  border-top-color: transparent;
  border-bottom-color: transparent;
  margin-top: 6px;
}
.message-span {
  font-size: 16px;
  margin-left: 5px;
  padding: 10px;
  word-break: break-all;
}
.time-style {
  color: gray;
  margin-left: 20px;
  margin-top: 5px;
}
.chat-container-top {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  border-bottom:1px#d8d3d3 solid;
}
span.mui-icon {
  font-size: 14px;
  color: #007aff;
  margin-left: -15px;
  padding-right: 10px;
}
.mui-off-canvas-right {
  color: #fff;
}

input {
  color: #000;
}
</style>
<template>
  <div>
    <Header>帖子详情</Header>
    <div class="mui-card detail">
      <div class="mui-card-header detail-header">
        <img class="user-avatar" :src="forum.userinfo.avatar"/>
        <div>
          <span class="author-span">{{forum.userinfo.username}}</span>
          <p>{{forum.forum.forumtime|format}}</p>
        </div>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <span class="detail-title">[{{forum.forum.forumtitle}}]</span>
        <p>{{forum.forum.forumcontent}}</p>
        <div class="img-container">
          <img v-for="(img,key) in forum.forumpictureList " class="des-img" :src="img.picture" :key="img.key" />
        </div>
        
      </div>
      <!--页脚，放置补充信息或支持的操作-->
      <div class="mui-card-footer">
        <span>分享</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pengyouquan" />
        </svg>
      </div>
    </div>
    <div class="mui-card reply">
      <!--页眉，放置标题-->
      <div class="mui-card-header">
        <span class="reply-title">评论&nbsp&nbsp{{reply.length}}</span>
        <span class="zan-title">赞&nbsp&nbsp 4</span>
      </div>
      <!--内容区-->
      <div class="mui-card-content reply-container">
        <div class="item-container" v-for="(item,key) in replyData" :key="key">
          <img
            class="user-avatar"
            src="../../assets/image/self-bg.jpg"
          />
          <div style="width:100%" >
            <span>{{item.username}}</span>
            <div style="display:flex">
              <p>{{item.content}}</p>
              <span style="margin-left:5px" class="mui-icon mui-icon-chatboxes" @click="publishCom(item.replyid,item.username)"></span>
            </div>

             <div class="reply-child" >
                <Detail class="" :replyData='item.child' @showDialog="publishCom"/>
            </div>
            <p>{{item.replytime|format}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item" @click="publishCom('',forum.userinfo.username)">
        <span class="mui-icon mui-icon-chatboxes"></span>
        <span>评论</span>
      </div>
      <div class="footer-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zan1" />
        </svg>
        <span>点赞</span>
      </div>
    </div>
    <CommentDetail
      v-if="this.commentShow"
      @changeCommentShow="changeCommentShow"
      :replytarget= "targtreplyid"
      :replyname = "replyname"
      :forumid = "forum.forumid"
      ></CommentDetail>
  </div>
</template>
<script>
import Header from '../../components/LeftHeader'
import Detail from './detail'
import CommentDetail from './commentDetail'
export default {
  components: {
    Header,
    Detail,
    CommentDetail
  },
  mounted () {
    this.init()
    this.initReply()
  },
  data () {
    return {
      commentShow: false,
      forumuserid: '',
      targtreplyid: '',
      reply: [
      ],
      replyData: '',
      root: process.env.API_HOST,
      forum: {
        forum:{},
        userinfo:{}
      },
      replyname: '123'
    }
  },
  computed: {
    forumid () {
      return this.$route.query.forumid
    }
  },
  methods: {
    changeCommentShow () {
      this.commentShow = false
    },
    publishCom (replyid, replyname) {
      if (replyid) {
        this.targtreplyid = replyid
      }
      this.replyname = replyname
      this.commentShow = true
    },
    init () {
      this.$ajax
        .post({
          // http://localhost:8081/regist
          url: this.root + 'forum/selectdetail',
          data: {forumid: Number(this.forumid)}
        })
        .then(result => {
          if (result.status) {
            this.forum = result.object
          }
        })
    },
    treeObj (obj) {
      obj.map(item => {
        if (item.beforereplyid != null) {
          obj.map(o => {
            if (item.beforereplyid === o.replyid) {
              if (!o.child) {
                o.child = []
              }
              o.child.push(item)
              o.child = o.child
            }
          })
        }
      })
      this.replyData = obj.filter(item => item.beforereplyid == null)
      console.log(this.replyData)
    },
    initReply () {
      this.$ajax
        .post({
          url: this.root + 'reply/getReply',
          data: {forumid: Number(this.forumid)}
        })
        .then(result => {
          if (result.status) {
            this.reply = result.result
            this.treeObj(this.reply)
          }
        })
    }
  }
}
</script>
<style scoped>
.detail {
  margin-top: 50px;
}
.user-avatar {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 15px;
}
.detail-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.author-span {
  color: #458b00;
}
.mui-card-content {
  padding: 10px;
}
.detail-title {
  margin-top: 10px;
  margin-bottom: 5px;
  display: block;
  font-weight: bolder;
  font-size: 16px;
}
.mui-card-footer {
  display: flex;
  justify-content: flex-start;
}
.icon {
  margin-left: 15px;
  font-size: 25px;
}
.des-img {
  width: 100px;
  margin-top: 15px;
}
.reply {
  margin-top: 10px;
  margin-bottom: 80px;
}
.reply-title {
  display: inline-block;
  border-bottom: 2px #458b00 solid;
  font-size: 12px;
}
.zan-title {
  color: gray;
}
.reply-container {
  display: flex;
  flex-direction: column;
}
.item-container {
  display: flex;
}
.reply-child {
  background-color: whitesmoke;
}
.reply-child-item {
  width: 300px;
  padding: 10px;
  border-bottom: 1px solid red;
}
.footer{
  height: 40px;
  border-top: 1px lightgray solid;
  position: fixed;
  bottom: 0px;
  background:white ;
  width: 100%;
  z-index: 998;
  display: flex;
  justify-content: space-around;

}
.footer-item{
  display: flex;
  align-items: center;
  font-size: 12px;
}
.img-container{
  display: flex;
}
.img-container>img{
  margin-right: 10px;
}
</style>

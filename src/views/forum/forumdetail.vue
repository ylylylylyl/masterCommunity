<template>
  <div>
    <Header>帖子详情</Header>
    <Loading v-if="loading"></Loading>
    <div v-if="!loading" class="mui-card detail">
      <div class="mui-card-header detail-header" >
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
        <div class="img-container" >
          <img 
          v-for="(img,key) in forum.forumpictureList"
          v-show="img.picture"
          class="des-img" 
          :src="img.picture" 
          :key="img.key" />
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
        <span class="zan-title">赞&nbsp&nbsp {{zanobj.count}}</span>
      </div>
      <!--内容区-->
      <div class="mui-card-content reply-container">
        <div class="item-container" v-for="(item,key) in replyData" :key="key">
          <img
            class="user-avatar"
            :src="item.avatar"
          />
          <div style="width:100%" >
            <span>{{item.username}}</span>
            <div style="display:flex">
              <p>{{item.content}}</p>
              <span style="margin-left:5px" class="mui-icon mui-icon-chatboxes" @click="publishCom(item.replyid,item.username)"></span>
              <span v-if="item.userid == forumuserid"
                class="mui-icon mui-icon-trash"
                @click="deleteCom(item.replyid)">
              </span>
            </div>

             <div class="reply-child" >
                <Detail class="" :replyData='item.child' @showDialog="publishCom"/>
            </div>
            <p>{{item.replytime|format}}</p>
          </div>
        </div>
        <Nothing v-if="!this.replyData.length"></Nothing>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item" @click="publishCom('',forum.userinfo.username)">
        <span class="mui-icon mui-icon-chatboxes"></span>
        <span>评论</span>
      </div>
      <div v-if="!zanobj.isZan" class="footer-item" @click="toZan(forum.forumid)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zan1" />
        </svg>
        <span>点赞</span>
      </div>
       <div v-if="zanobj.isZan" class="footer-item" @click="toDeleteZan(forum.forumid)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zan" />
        </svg>
        <span>取消赞</span>
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
import Loading from '../../components/Loading'
import Detail from './detail'
import CommentDetail from './commentDetail'
import Nothing from '../../components/nothing'
export default {
  components: {
    Header,
    Detail,
    CommentDetail,
    Loading,
    Nothing
  },
  mounted () {
    this.init()
    this.initReply()
    this.initPraise()
  },
  data () {
    return {
      commentShow: false,
      targtreplyid: '',
      reply: [
      ],
      replyData: '',
      root: process.env.API_HOST,
      forum: {
        forum:{},
        userinfo:{}
      },
      replyname: '123',
      zanobj: {},
      loading: false
    }
  },
  computed: {
    forumid () {
      return this.$route.query.forumid
    },
    forumuserid () {
      return this.$cookies.get('CUR_USERINFO').userid
    }
  },
  methods: {
    changeCommentShow () {
      this.commentShow = false
    },
    publishCom (replyid, replyname) {
      console.log(replyid)
      if (replyid) {
        this.targtreplyid = replyid
      } else {
        this.targtreplyid = null
      }
      this.replyname = replyname
      this.commentShow = true
    },
    init () {
      this.loading = true
      this.$ajax
        .post({
          // http://localhost:8081/regist
          url: this.root + 'forum/selectdetail',
          data: {forumid: Number(this.forumid)}
        })
        .then(result => {
          this.loading = false
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
    },
    initReply () {
      this.loading = true
      this.$ajax
        .post({
          url: this.root + 'reply/getReply',
          data: {forumid: Number(this.forumid)}
        })
        .then(result => {
          this.loading = false
          if (result.status) {
            this.reply = result.result
            this.treeObj(this.reply)
          }
        })
    },
    initPraise () {
      this.loading = true
      this.$ajax
        .post({
          url: this.root + 'praise/getCount',
          data: {
            forumid: Number(this.forumid),
            userid: this.forumuserid
          }
        })
        .then(result => {
          this.loading = false
          if (result.status) {
            this.zanobj = result.object
          }
        })
    },
    deleteCom (replyid) {
      var btnArray = ['否', '是']
      mui.confirm('确认删除该评论？', '删除', btnArray, (e) =>{
        if (e.index === 1) {
          this.$ajax
            .post({
              url: this.root + 'reply/deleteReply',
              data: {replyid}
            })
            .then(result => {
              if (result.status) {
                this.initReply()
              }
            })
        }
      })
    },
    toZan (forumid) {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax
        .post({
          url: this.root + 'praise/insertpraise',
          data: {userid, forumid}
        })
        .then(result => {
          if (result.status) {
            this.initPraise()
          }
        })
    },
    toDeleteZan (forumid) {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax
        .post({
          url: this.root + 'praise/cancelZan',
          data: {userid, forumid}
        })
        .then(result => {
          if (result.status) {
            this.initPraise()
          }
        })
    },
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
  font-size: 18px;
  margin-right: 10px;
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
.mui-icon{
  font-size: 18px;
  margin-right: 10px;
}
.mui-icon-chatboxes{
  margin-left: 10px;
  color: gray;
}
.mui-icon-trash{
  color: darkred;
  font-weight: bold;
}
</style>

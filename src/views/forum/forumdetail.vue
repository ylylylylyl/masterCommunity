<template>
  <div>
    <Header>帖子详情</Header>
    <div class="mui-card detail">
      <div class="mui-card-header detail-header">
        <img class="user-avatar" src="../../assets/image/self-bg.jpg" />
        <div>
          <span class="author-span">人民日报</span>
          <p>11-17 16:40</p>
        </div>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <span class="detail-title">[好消息！]</span>
        <p>11月13日下午，智能科技学院学工办在实验楼101组织师生代表集中观看了主题为“以习近平新时代中国特色社会主义思想为指引，大力弘扬科学家精神，加强作风和学风建设”的2019年全国科学道德和学风建设宣讲教育报告会。学院全体辅导员及学生党员代表、各组织优秀学生代表到场观看。</p>
        <img class="des-img" src="../../assets/image/1.jpg" />
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
        <span class="reply-title">评论&nbsp&nbsp5</span>
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
              <span style="margin-left:5px" class="mui-icon mui-icon-chatboxes" @click="publishCom(item.userid)"></span>
            </div>
            
             <div class="reply-child" >
                <Detail class="" :replyData='item.child' @showDialog="publishCom"/>
            </div> 
            <p>11-17 16:40</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item" @click="publishCom(forumuserid)">
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
    <CommentDetail v-if="this.commentShow" @changeCommentShow="changeCommentShow" :replytarget=targtuserid></CommentDetail>
  </div>
</template>
<script>
import Header from "../../components/LeftHeader";
import Detail from './detail'
import CommentDetail from './commentDetail'
export default {
  components: {
    Header,
    Detail,
    CommentDetail
  },
  mounted() {
      this.init()
        this.treeObj(this.reply)
  },
  methods: {
    changeCommentShow(){
      this.commentShow = false
    },
    publishCom(userid){
      this.commentShow = true
      if(userid){
        this.targtuserid = userid
      }
    },
      init(){
          const { forumid, userid } = this.$route.query;
            this.forumuserid = userid;
      },
    treeObj(obj) {
      console.log(obj)
      obj.map(item => {
        if (item.beforereplyid != null) {
          obj.map(o => {
            if (item.beforereplyid === o.replyid) {
              
              if (!o.child) {
                o.child = [];
              }
              o.child.push(item);
              o.child = o.child;
            }
          });
        }
      });
      this.replyData = obj.filter(item => item.beforereplyid == null) ;
      console.log(this.replyData)
    }
  },
  
  data() {
    return {
      commentShow:false,
      forumuserid: "",
      targtuserid:"",
      reply: [
        {
          replyid:'00000001',
          forumid: 1,
          userid: "002",
          username: "用户2",
          content: "我是用户2",
          time: "2019-4-12",
          beforereplyid: null
        },
        {
          replyid:'00000002',
          forumid: 1,
          userid: "003",
          username: "用户3",
          content: "我是用户3",
          time: "2019-4-12",
          beforereplyid: null
        },
        {
           replyid:'00000003',
          forumid: 1,
          userid: "004",
          username: "用户4",
          content: "我是用户4",
          time: "2019-4-12",
          beforereplyid: "00000001"
        },
        {
           replyid:'00000004',
          forumid: 1,
          userid: "005",
          username: "用户5",
          content: "我是用户5",
          time: "2019-4-12",
          beforereplyid: "00000003"
        },
         {
          replyid:'00000005',
          forumid: 1,
          userid: "005",
          username: "用户5",
          content: "我是用户5",
          time: "2019-4-12",
          beforereplyid: "00000002"
        }
      ],
      replyData:''
    };
  }
};
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
  width: 100%;
  margin-top: 15px;
}
.reply {
  margin-top: 10px;
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

</style>
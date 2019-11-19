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
            v-if="item.beforeuserid==forumuserid"
            class="user-avatar"
            src="../../assets/image/self-bg.jpg"
          />
          <div style="width:100%" v-if="item.beforeuserid==forumuserid">
            <span>{{item.username}}</span>
            <p>{{item.content}}</p>
             <div class="reply-child" >
                 
               <!-- <div v-if="item2.beforeuserid==item.userid" class="reply-child-item"> -->
                <!-- <span>用户2&nbsp&nbsp回复&nbsp&nbsp用户1</span>
                <p>这是一条评论</p> -->
                <Detail class="" :replyData='item.child'/>
              <!-- </div>  -->
            </div> 
            <p>11-17 16:40</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>
        <span class="mui-icon mui-icon-chatboxes"></span>
        <span>评论</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zan1" />
        </svg>
        <span>点赞</span>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/LeftHeader";
import Detail from './detail'
export default {
  components: {
    Header,
    Detail
  },
  mounted() {
      this.init()
        this.treeObj(this.reply)
  },
  methods: {
      init(){
          const { forumid, userid } = this.$route.query;
            this.forumuserid = userid;
      },
    treeObj(obj) {
      obj.map(item => {
        // if (item.parent !== null) {
          obj.map(o => {
            if (item.beforeuserid === o.userid) {
              
              if (!o.child) {
                o.child = [];
              }
              o.child.push(item);
              o.child = o.child;
              console.log(o.child)
            }
          });
        // }
      });
      this.replyData = obj.filter(item => item.beforeuserid === this.forumuserid) ;
      console.log(this.replyData)
    }
  },
  data() {
    return {
      forumuserid: "",
      reply: [
        {
          forumid: 1,
          userid: "002",
          username: "用户2",
          content: "挺好的",
          time: "2019-4-12",
          beforeuserid: "001"
        },
        {
          forumid: 1,
          userid: "003",
          username: "用户3",
          content: "不好的",
          time: "2019-4-12",
          beforeuserid: "002"
        },
        {
          forumid: 1,
          userid: "004",
          username: "用户4",
          content: "挺好的",
          time: "2019-4-12",
          beforeuserid: "003"
        },
        {
          forumid: 1,
          userid: "005",
          username: "用户5",
          content: "挺好的",
          time: "2019-4-12",
          beforeuserid: "001"
        },
         {
          forumid: 1,
          userid: "005",
          username: "用户5",
          content: "挺好的",
          time: "2019-4-12",
          beforeuserid: "002"
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
</style>
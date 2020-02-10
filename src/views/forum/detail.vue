<template  >
  <!-- <div :key="i" class="reply-child-item"> -->
    <div   >
     <div v-for="(value,i) in this.listData" :key="i"  class="reply-child-item">
        <span class="detail-title">{{value.username}}&nbsp&nbsp回复&nbsp&nbsp{{value.replyname}}</span>
        <div class="reply-container"  >
        <p>{{value.content}}</p>
        <span class="mui-icon mui-icon-chatboxes" @click="publishCom(value.replyid,value.username)"></span>
        <span v-if="value.userid == userid"
         class="mui-icon mui-icon-trash"
         @click="deleteCom(value.replyid)">
         </span>
        
        </div>
    </div>
       <CommentDetail v-if="commentShow"  @changeCommentShow="changeCommentShow"  :replytarget=replytarget />
  </div>
  <!-- </div> -->
</template>
<script>
import CommentDetail from './commentDetail'
export default {
  components: {
    CommentDetail
  },
  props: {replyData: Array},
  name: 'Detail',
  watch: {
    replyData: function (value) {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    userid () {
      return localStorage.getItem('CUR_USERINFO').userid
    }
  },
  data () {
    return {
      commentShow: false,
      temp: '',
      replytarget: '',
      listData: [],
      root: process.env.API_HOST
    }
  },

  methods: {
    init () {
      var list = []
      this.listData = this.setGridDataFromTree(list, this.replyData, '')
    },
    setGridDataFromTree (list, dataSource) {
      if (!(Array.isArray(dataSource) && dataSource.length > 0)) return
      dataSource.forEach((father) => {
        // debugger;
        list.push(father)
        if (typeof (father.child) === 'undefined') {
        } else {
          this.setGridDataFromTree(list, father.child)
        }
      })
      return list
    },
    func (value) {
      this.temp = value
      return value.userid
    },
    publishCom (userid, username) {
      this.$emit('showDialog', userid, username)
      // console.log(111)
      // this.replytarget = userid
      // this.commentShow = true
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
                this.$parent.initReply()
              }
            })
        }
      })
    },
    changeCommentShow () {
      this.commentShow = false
    }
  }
}
</script>
<style scoped>

.detail-title{
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.reply-container{
  display: flex
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

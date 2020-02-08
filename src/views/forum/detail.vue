<template  >
  <!-- <div :key="i" class="reply-child-item"> -->
    <div   >
     <div v-for="(value,i) in this.listData" :key="i"  class="reply-child-item">
        <span class="detail-title">{{value.username}}&nbsp&nbsp回复&nbsp&nbsp{{value.replyname}}</span>
        <div class="reply-container"  >
        <p>{{value.content}}</p>
        <span class="mui-icon mui-icon-chatboxes" @click="publishCom(value.replyid,value.username)"></span>
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
  mounted () {
    var list = []
    console.log(this.replyData)
    this.listData = this.setGridDataFromTree(list, this.replyData, '')
    console.log(this.listData)
  },
  data () {
    return {
      commentShow: false,
      temp: '',
      replytarget: '',
      listData: []
    }
  },

  methods: {
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
    publishCom (userid,username) {
      this.$emit('showDialog', userid,username)
      // console.log(111)
      // this.replytarget = userid
      // this.commentShow = true
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
.mui-icon-chatboxes{
  margin-left: 10px;
  color: gray;
  font-size: 14x;
}
</style>

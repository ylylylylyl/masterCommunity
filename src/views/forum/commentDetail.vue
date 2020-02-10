<template>
     <div class="comment-container" >
        <textarea v-model="content" class="comment-txt" :placeholder = "`回复${replyname}`"></textarea>
        <div class="action-container">
            <button type="button" class="mui-btn" @click="close">取消</button>
            <span class="send" @click="handleSend()">发送</span>
        </div>
    </div>
</template>
<script>
export default {
  mounted () {
    console.log(this.replyname)
    console.log(this.forumid)
  },
  props: {
    replytarget: Number,
    forumid: Number,
    replyname: String

  },
  data () {
    return {
      content: '',
      root: process.env.API_HOST
    }
  },
  methods: {
    close () {
      this.$emit('changeCommentShow')
    },
    handleSend () {
      const {userid, username} = localStorage.getItem('CUR_USERINFO')
      const param = {
        forumid: this.forumid,
        userid,
        username,
        content: this.content,
        beforereplyid: Number(this.replytarget),
        replyname: this.replyname,
        avatar: localStorage.getItem('avatar')
      }
      this.$ajax
        .post({
          url: this.root + 'reply/addreply',
          data: param
        })
        .then(result => {
          if (result.status) {
            this.close()
            this.$parent.initReply()
          }
        })
    }
  }
}
</script>
<style scoped>
    .comment-container{
  position: fixed;
  bottom: 0px;
  height: 120px;
  width: 100%;
  background: whitesmoke;
  z-index: 1000;
   display: flex;
}
.comment-txt{
  border: 1px gray solid;
  margin-left: 15px;
  margin-top: 15px;
  flex: 4;
  height: 100px;

}
.action-container{
     flex: 1;
     display: flex;
     justify-content: space-between;
     align-items: center;
     flex-direction: column;
     padding: 10px;
}
.send{
  font-size: 16px;
  color: #458b00;
  font-weight: bold;
}
</style>

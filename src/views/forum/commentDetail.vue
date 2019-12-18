<template>
     <div class="comment-container" >
        <textarea class="comment-txt" :placeholder = "`回复${replytarget}`"></textarea>
        <div class="action-container">
            <button type="button" class="mui-btn" @click="close">取消</button>
            <span class="send">发送</span>
        </div>
    </div>
</template>
<script>
export default {
  mounted () {
    console.log(this.replytarget)
  },
  props: {
    replytarget: String
  },
  methods: {
    close () {
      this.$emit('changeCommentShow')
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

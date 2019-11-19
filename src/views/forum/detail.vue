<template  >
  <!-- <div :key="i" class="reply-child-item"> -->
  <div>
    <div  v-for="(value,i) in this.replyData" :key="i" class="reply-child-item">
      <span class="detail-title">{{value.userid}}&nbsp&nbsp回复&nbsp&nbsp{{value.beforeuserid}}</span>
      <p>{{value.content}}</p>
        <!-- <input v-show="false" :value='func(value)'/> -->
      <Detail :replyData="value.child" />
    </div>
      <!-- <Detail :replyData="temp" /> -->
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  props: ["replyData"],
  name:'Detail',
  data(){
      return{
          temp:''
      }
  },
  mounted(){
      console.log(this.temp)
  },
  methods:{
      func(value){
          this.temp = value
          return value.userid
      }
  }
};
</script>
<style scoped>

.detail-title{
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
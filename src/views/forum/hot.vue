<template>
    <div>
         <div class="forum-item " @click="toDetail(item)" v-for="item in forum" :key="item.forumid">
            <div class="left">
                <b class="num">1</b>
                <div>
                    <span class="item-title">今天遇到一件有趣的事</span>
                    <div class="user-info">
                        <img src="../../assets/image/self-bg.jpg" class="user-avatar"/>
                        <span>用户1</span>
                    </div>
                    <p class="item-des">今天遇到一件有趣的事今天遇到一件有趣的事今天遇到一件有趣的事今天遇到一件有趣的事</p>
                    <span class="datetime">2019-11-16 14:00 </span>
                    <span> 14</span>
                     <svg class="icon icon-zan" aria-hidden="true">
                        <use xlink:href="#icon-zan" />
                    </svg>
                </div>
            </div>
            <div class="right">
                <img class="des-img" src="../../assets/image/self-bg.jpg"/>
            </div>
        </div>

    </div>
</template>
<script>

export default {
  methods: {
    toDetail (item) {
      this.$router.push({
        path: '/forumdetail',
        query: {
          forumid: item.forumid,
          userid: item.userid
        }
      })
      // this.$router.push('/forumdetail'+forumid)
    }
  },
  data () {
    return {
      forum: [
        {userid: '001', forumid: '1'},
        {userid: '002', forumid: '2'},
        {userid: '003', forumid: '3'}
      ]
    }
  }
}
</script>
<style scoped>

  .forum-item{
      display: flex;
      justify-content: space-between;
      background: white;
      padding-top: 15px;
      border-bottom: 1px gray solid;
  }
  .item-title{
      display: flex;
      flex-direction: column;
      font-weight: bolder;
      font-size: 18px;

  }
  .left{
      display: flex;
  }
  .right{
      display: flex;
      align-items: center;
      padding-right: 10px;
      margin-right: 10px;
  }
  .num{
      color: rgb(175, 4, 4);
      font-size: 16px;
      margin-left: 10px;
      margin-right: 10px;
  }
  .user-avatar{
      width: 20px !important;
      height: 20px;
      border-radius: 50%;
      margin-right: 10px;
  }
  .user-info{
      margin-top: 10px;
      display: flex;
      align-items: center;
  }
  .item-des{
      margin-top: 10px;
      height: 40px;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-right: 10px;
  }
  .des-img{
      height:80px;
      width: 120px !important;
  }
  .icon-zan{
      font-size: 10px
  }
  .datetime{
      color: gray;
      font-size: 10px;
      margin-right: 10px;
  }
  .zan-span{
      color: darkred;
  }

</style>

<template>
    <div>
         <div class="forum-item " v-for="(item,key) in forum" :key="item.forumid">
            <div class="left">
                <b class="num">{{key+1}}</b>
               <div>
                 <div @click="toDetail(item)">
                   <span class="item-title">{{item.forum.forumtitle}}</span>
                    <div class="user-info">
                      <img :src="item.userinfo.avatar" class="user-avatar" />
                      <span>{{item.userinfo.username}}</span>
                    </div>
                    <p class="item-des">{{item.forum.forumcontent}}</p>
                 </div>
                <span class="datetime">{{item.forum.forumtime|format}}</span>
                <span>{{item.forum.count}}</span>
                <svg class="icon icon-zan" aria-hidden="true" @click="toZan(item.forum.forumid)">
                  <use xlink:href="#icon-zan1" />
                </svg>
            </div>
            </div>
            <div class="right" v-if="item.forum.picture">
                <img class="des-img" :src="item.forum.picture" />
            </div>
        </div>
        <Loading v-if="loading"></Loading>
        <Nothing v-if="!this.forum.length"></Nothing>
    </div>
</template>
<script>
import Nothing from '../../components/nothing'
import Loading from '../../components/Loading'
export default {
  components:{Loading,Nothing},
  mounted () {
    this.init()
  },
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
    },
    toZan (forumid) {
      this.isclick = !this.isclick
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax
        .post({
          url: this.root + 'praise/insertpraise',
          data: {userid, forumid}
        })
        .then(result => {
          if (result.status) {
            
          }
        })
    },
    init () {
      this.loading = true
      const {villageid} = this.$cookies.get('CUR_BINDINFO')
      this.$ajax
        .post({
          url: this.root + 'forum/selectAll',
          data: {villageid}
        })
        .then(result => {
          if (result.status) {
            this.loading = false
            this.forum = result.result
          }
        })
    }
  },
  data () {
    return {
      forum: [],
      root: process.env.API_HOST,
      isclick: false,
      loading: false
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
      width: 60%;
      overflow:hidden;
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
  .icon-zan{
    font-size: 16px
  }

</style>

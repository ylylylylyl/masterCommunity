<template>
  <div class="content-container">
    <Header>我的发帖</Header>
    <div class="forum-container" v-if="this.forum.length">
      <div class="forum-item" @click="toDetail(item.forum)" v-for="(item,key) in forum" :key="item.forumid">
        <div class="left">
          <b class="num">{{key+1}}</b>
          <div>
            <span class="item-title">{{item.forum.forumtitle}}</span>
            <div class="user-info">
              <img :src="item.userinfo.avatar" class="user-avatar" />
              <span>{{item.userinfo.username}}</span>
            </div>
            <p class="item-des">{{item.forum.forumcontent}}</p>
            <span class="datetime">{{item.forum.forumtime|format}}</span>
            <span>{{item.forum.count}}</span>
            <svg class="icon icon-zan" aria-hidden="true">
              <use xlink:href="#icon-zan" />
            </svg>
          </div>
        </div>
        <div class="right" v-if="item.forum.picture">
          <img class="des-img" :src="item.forum.picture" />
        </div>
      </div>
    </div>
    <div v-if="!this.forum.length" class="nothing">
      <svg class="icon icon-none" aria-hidden="true">
        <use xlink:href="#icon-apptubiao-" />
      </svg>
      <span>这里空空如也~~~快去发帖吧</span>
    </div>
    <Loading v-if="loading"></Loading>
  </div>
</template>
<script>
import Header from '../../components/LeftHeader'
import Loading from '../../components/Loading'
export default {
  components: {
    Header,Loading
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      root: process.env.API_HOST,
      forum: [],
      loading: false
    }
  },
  methods: {
    init () {
      this.loading = true
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax
        .post({
          // http://localhost:8081/regist
          url: this.root + 'forum/selectselfforum',
          data: {userid}
        })
        .then(result => {
          if (result.status) {
            this.loading = false
            this.forum = result.result
          }
        })
    },
    toDetail (item) {
      this.$router.push({
        path: '/forumdetail',
        query: {
          forumid: item.forumid
        }
      })
      // this.$router.push('/forumdetail'+forumid)
    }
  }
}
</script>
<style scoped>
  .forum-container{
      padding-top: 40px;
  }
  .forum-item{
      display: flex;
      justify-content: space-between;
      background: white;
      padding-top: 15px;
      border-bottom: 1px gray solid;
      border-top: 1px lightgray solid;
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
  .nothing{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .icon-none{
    font-size: 60px;
    color: #6e8b3d;
    margin-bottom: 20px
  }

</style>

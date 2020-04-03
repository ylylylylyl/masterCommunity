<template>
  <div id="content2" class="mui-control-content mui-active">
    <Nothing v-show="!noticeList.length"></Nothing>
    <div class="mui-card" @click="toDetail(item.noticeid)" v-for="(item,key) in noticeList" :key="key">
      <!--页眉，放置标题-->
      <div class="mui-card-header">
        <div>
          <svg class="icon notice-icon" aria-hidden="true">
            <use xlink:href="#icon-tongzhigonggao" />
          </svg>
          <span>{{item.noticetitle}}</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="notice-footer">
          <p>{{item.noticepusher}}</p>
          <p>{{item.noticetime|format}}</p>
        </div>
        <span @click="e=>deleteNotice(e,item.noticeid)" class="delete" v-if="$route.path=='/adminannounce'">删除</span>
      </div>
    </div>
  </div>
</template>
<script>
import Nothing from '../nothing'
export default {
  components: {Nothing},
  mounted () {
    this.init()
    console.log(this.$route)
  },
  data () {
    return {
      root: process.env.API_HOST,
      noticeList: [],
      loading: false
    }
  },
  methods: {
    init () {
      this.loading = true
      let villageid
      if (this.$cookies.get('CUR_USERINFO').villageid) {
        villageid = this.$cookies.get('CUR_USERINFO').villageid
      } else {
        villageid = this.$cookies.get('CUR_BINDINFO').villageid
      }
      this.$ajax.post({
        url: this.root + 'notice/selectnoticelist',
        data: {villageid}
      })
        .then(res => {
          this.loading = false
          if (res.status) {
            this.noticeList = res.result
            console.log(JSON.stringify(this.noticeList))
          }
        },err => {
          this.loading = true
        })
    },
    toDetail (noticeid) {
      this.$router.push({
        path: '/announcedetail',
        query: {
          noticeid
        }
      })
    },
    deleteNotice (e, noticeid) {
      e.stopPropagation()
      let btnArray = ['确认', '取消']
      mui.confirm('确认删除该条公告？', '删除公告', btnArray, (e) => {
        if (e.index == 0) {
          this.$ajax.post({
            url: this.root + 'notice/deletenotice',
            data: {noticeid}
          })
            .then(res => {
              if (res.status) {
                mui.toast('删除成功')
                this.init()
              } else {
                mui.toast('删除失败')
              }
            }, err => {
              mui.toast('删除失败')
            })
          
        }
      })
      console.log(noticeid)
    }
  }
}
</script>
<style scoped>

.card-item {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.mui-card-content {
  display: flex;
  padding: 15px;
}
/* 公告 */
.notice-footer {
  display: flex;
}
.notice-footer > p {
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.notice {
  margin: 5px;
  border-bottom: 5px whitesmoke solid;
  height: 110px;
}
.notice-icon {
  font-size: 25px;
}
.mui-card-content{
  display: flex;
  align-items: center;
  justify-content: space-between;

}
.delete{
  color: darkred;
  font-weight: bolder;
}
</style>

<template>
  <div id="content2" class="mui-control-content">
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
</style>

<template>
  <div id="content3" class="mui-control-content">
    <Nothing v-if="!losts.length"></Nothing>
    <div class="mui-card">
      <!--内容区-->
      <div @click="toDetail(lost.lostid)" class="mui-card-content content3-card" v-for="(lost,key) in losts" :key="key">
        <div class="lost-item">
          <span>遗失地点：</span>
          <p>{{lost.lostname}}</p>
        </div>
        <div class="lost-item">
          <span>遗失时间：</span>
          <p>{{lost.losttime}}</p>
        </div>
        <div class="lost-item">
          <span>遗失详情：</span>
          <p>{{lost.lostdes}}</p>
        </div>
        <div class="lost-item">
          <span>领取地址：</span>
          <p>物业处三楼</p>
        </div>
        <div class="lost-item">
          <span>遗失状态：</span>
          <p>{{lost.losttype|losttype}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nothing from '../../components/nothing'
export default {
  components:{Nothing},
  mounted () {
    console.log(11)
    this.init()
  },
  data () {
    return {
      root: process.env.API_HOST,
      losts: []
    }
  },
  methods: {
    init () {
      const {villageid} = this.$cookies.get('CUR_BINDINFO')
      this.$ajax.post({
        url: this.root + 'lost/lostlist',
        data: {villageid}
      }).then(result => {
        if (result.status) {
          this.losts = result.result
        } else {
        }
      })
    },
    toDetail (lostid) {
      this.$router.push({
        path: '/lostdetail',
        query: {
          lostid: lostid
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
/* 失物招领 */
.lost-item {
  display: flex;
}
.content3-card {
  display: flex;
  flex-direction: column;
}
.lost-icon {
  color: #6e8b3d;
  font-weight: bold;
  font-size: 25px;
  margin-right: 5px;
}
</style>

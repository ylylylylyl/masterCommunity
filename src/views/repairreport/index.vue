<template>
    <div >
        <Header>报修记录</Header>
        <div class="com-container">
            <div class="repair-item" @click="toRecords(item.repairid)" v-for="(item,key) in initDataList" :key="key">
                <div class="repair-item-title">
                    <span>{{item.description}}</span>
                    <span class="mui-icon mui-icon-arrowright"></span>
                </div>
                <div class="repair-item-time">
                    <span :class="item.repairstatus|styleStatus">{{item.repairstatus|status}}</span>
                    <span class="item-date">{{item.publishtime|format}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/LeftHeader'
import ReportRecords from './reportrecords'
export default {
  components: {
    Header,
    ReportRecords
  },
  data () {
    return {
      root: process.env.API_HOST,
      initDataList:[]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      const bindid = JSON.parse(localStorage.getItem('bindinfo')).bindid
      this.$ajax.post({
        url: this.root + 'repairorder/selectsumbybindid',
        data: {
          bindid
        }
      }).then(result => {
        if (result.status) {
          this.initDataList = result.result
        } else {
          
        }
      })
    },
    goback () {
      this.$router.go(-1)
    },
    toRecords (repairid) {
      this.$router.push({
        path: '/reportrecords',
        query: {
          repairid
        }
      })

    }
  },
  filters: {
    styleStatus (item) {
      switch (item) {
        case '0':
          return 'mui-badge mui-badge-primary'
        case '1':
          return 'mui-badge mui-badge-danger'
      }
    }
  }
}
</script>
<style scoped>
    .repair-item{
        background: white;
        border-top: 1px lightgray solid;
        padding-left: 10px;
    }
    .repair-item-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
    }
    .mui-icon-arrowright{
        color: gray;
    }
    .repair-item-time{
        border-top: 1px whitesmoke solid;
        height: 35px;
        display: flex;
        align-items: center;
    }
    .item-date{
        color: gray;
        margin-left: 10px;
    }
</style>

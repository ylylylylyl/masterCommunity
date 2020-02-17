<template>
    <div >
        <Header>报修列表</Header>
        <div class="com-container">
           <div class="select-container">
                <span class="mui-icon mui-icon-arrowdown" v-show="!isopen"></span>
                <span class="mui-icon mui-icon-arrowup" v-show="isopen"></span>
                <select v-model="showType" @change="handleChangeData()" @click="(e)=>handleChange(e)" class="mui-h5" style="margin:auto; color:#000;">
                    <option v-for="(type,key) in types" :value="type.value" :key="key">{{type.label}}</option>
                </select>
            </div>
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
import Header from '../../../components/LeftHeader'
import ReportRecords from './reportrecords'
export default {
  components: {
    Header,
    ReportRecords
  },
  data () {
    return {
      root: process.env.API_HOST,
      initDataList:[],
      types: [
        {label: '全部', value: 0},
        {label: '我的接单', value: 1}
      ],
      isopen: false,
      showType: 0
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      const {villageid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'repairorder/selectsumbyvill',
        data: {
          villageid
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
        path: '/adminrecords',
        query: {
          repairid
        }
      })
    },
    selectSelf () {
      const {adminid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'repairorder/selectself',
        data: {
          adminid
        }
      }).then(result => {
        if (result.status) {
          this.initDataList = result.result
        } else {
        }
      })
    },
    handleChange () {
      this.isopen = !this.isopen
    },
    handleChangeData () {
      if (this.showType == 0) {
        this.initData()
      } else {
        this.selectSelf()
      }
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
    .select-container{
      position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        
    }
    .select-container>select{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: whitesmoke;
    }
      .mui-icon-arrowdown,.mui-icon-arrowup{
        display: block;
        position: absolute;
        margin-left: 35px;
        font-size: 18px;

      }
      .mui-h5{
        text-align-last:center
      }
</style>

<template>
    <div >
        <!-- <Header>报修列表</Header> -->
        <div class="back-header">
          <span @click="$router.push('/admin/home')" class="mui-icon mui-icon-arrowleft"></span>
          <span>
              报修列表
          </span>
        </div>
        <div class="com-container">
           <div class="select-container">
                <span class="mui-icon mui-icon-arrowdown" v-show="!isopen"></span>
                <span class="mui-icon mui-icon-arrowup" v-show="isopen"></span>
                <select v-model="showType" @change="handleChangeData()" @click="(e)=>handleChange(e)" class="mui-h5" style="margin:auto; color:#000;">
                    <option v-for="(type,key) in types" :value="type.value" :key="key">{{type.label}}</option>
                </select>
            </div>
            <!-- <div class="repair-item" @click="toRecords(item.repairid)" v-for="(item,key) in initDataList" :key="key">
                <div class="repair-item-title">
                    <span>{{item.description}}</span>
                    <span class="mui-icon mui-icon-arrowright"></span>
                </div>
                <div class="repair-item-time">
                    <span :class="item.repairstatus|styleStatus">{{item.repairstatus|status}}</span>
                    <span class="item-date">{{item.publishtime|format}}</span>
                </div>
            </div> -->
                        <div class="mui-card"  @click="toRecords(item.repairid)" v-for="(item,key) in initDataList" :key="key">
              <div class="mui-card-header">
                <div v-if="item.repairstatus==0" class="font-topright">{{item.repairstatus|status}}</div>
                <div v-if="item.repairstatus==0" class="triangle-topright mui-badge-orange"></div>
                <span class="muicard-header-title">流水号: {{item.repairid}}</span>
              </div>
              <div class="mui-card-content">
                <div class="repair-item-title">
                    <span>{{item.description}}</span>
                    <span class="mui-icon mui-icon-arrowright"></span>
                </div>
              </div>
              <div class="mui-card-footer">
               <div class="repair-item-time">
                    <span :class="item.repairstatus|styleStatus">{{item.repairstatus|status}}</span>
                    <span class="item-date">{{item.publishtime|format}}</span>
                </div>
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
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'repairorder/selectself',
        data: {
          adminid: userid
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
      .content-container{
  background: whitesmoke;
}
    .report-container{
      padding-top: 40px;
    }
    .repair-item{
        background: white;
        border-top: 1px lightgray solid;
        padding-left: 10px;
    }
    .repair-item-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* height: 35px; */
        width: 100%;
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

    .font-seal {
    font-size: 12px;z-index: 2;position: absolute;right:14px;top: 35px;    border: 1px solid #F73A3C;
    transform: rotate(45deg);width: 53px;line-height: 20px;text-align: center;color: #F73A3C;font-weight: bold;
}

/**
 * 三角形气泡
 */
.triangle-topright {
   position: absolute;
   right: 0;
    width: 0;
    height: 0;
    border-top: 46px solid #6e8b3d;
    border-left: 3rem solid transparent;
}
.font-topright {
    font-size: 12px;
    z-index: 2;
    position: absolute;
    right: -4px;top: -2px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    width: 43px;line-height: 43px;
    text-align: center;
    color: #FFFFFF;
}
.mui-badge.mui-badge-orange{background-color:#FC9C2D;color:#FFFFFF;}
.mui-card-header{
  border-bottom: 1px lightgray dashed;
  position: relative;
}
.mui-card{
  padding:5px;
}
.muicard-header-title{
  line-height: 30px;
  font-size: 16px;
  color: gray;
}
.mui-card-content{
  min-height: 60px;
  padding-left: 15px;
  display: flex;
  align-content: center;
}
</style>

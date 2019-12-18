<template>
    <div >
        <Header>报修记录</Header>
        <div class="com-container">
            <div class="repair-item" @click="toRecords()">
                <div class="repair-item-title">
                    <span>水龙头坏了</span>
                    <span class="mui-icon mui-icon-arrowright"></span>
                </div>
                <div class="repair-item-time">
                    <span class="mui-badge mui-badge-primary">已处理</span>
                    <span class="item-date">2019-10-24 14:01:22</span>
                </div>
            </div>
            <div class="repair-item">
                <div class="repair-item-title">
                    <span>水龙头坏了</span>
                    <span class="mui-icon mui-icon-arrowright"></span>
                </div>
                <div class="repair-item-time">
                    <span class="mui-badge mui-badge-danger">未处理</span>
                    <span class="item-date">2019-10-24 14:01:22</span>
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
  methods: {
    goback () {
      this.$router.go(-1)
    },
    toRecords () {
      this.$router.push('/reportrecords')
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
        height: 55px;
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

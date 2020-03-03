<template>
    <div class="com-container">
        <Header>报修记录</Header>
        <div class="records-main">
            <div class="div-container ">
                <div class="repair-status">
                    <span>流水号</span>
                    <span class="status-content">{{resultObject.repairid}}</span>
                </div>
                <div class="repair-status">
                    <span>报修状态</span>
                    <span class="status-content">{{resultObject.repairstatus|status}}</span>
                </div>
               <div class="repair-status">
                    <span>预约时间</span>
                    <span class="status-content">{{resultObject.appointmenttime}} </span>
                </div>
            </div>

            <div class="div-container repair-info">
                <div class="info-title">报修信息</div>
                <div class="info-content">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">{{resultObject.repairtype|repairtype}}</button>
                    <p class="info-des">{{resultObject.description}}</p>
                    <div class="info-img">
                        <img :src="resultObject.photo"/>
                    </div>

                </div>
            </div>
            <div class="div-container repair-info">
                 <div class="info-title">接单人信息</div>
                 <div class="repair-status">
                    <span>联系人</span>
                    <span class="status-content">{{resultObject.reciever}}</span>
                </div>
                <div class="repair-status">
                    <span>联系电话</span>
                    <span class="status-content">{{resultObject.recieverphone}}</span>
                </div>
            </div>
            <div class="div-container repair-info">
                 <div class="info-title">发单人信息</div>
                 <div class="repair-status">
                    <span>联系人</span>
                    <span class="status-content">{{resultObject.contactname}}</span>
                </div>
                <div class="repair-status">
                    <span>联系电话</span>
                    <span class="status-content">{{resultObject.concatphone}}</span>
                </div>
            </div>
        </div>
        <Loading v-if="loading"></Loading>
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
import Loading from '../../components/Loading'
export default {
  components: {
    Header,
    Loading
  },
  data () {
    return {
      root: process.env.API_HOST,
      resultObject: {},
      loading: false
    }
  },
  computed: {
    repairid () {
      return this.$route.query.repairid
    }
  },
  mounted () {
    this.initDetail()
  },
  methods: {
    initDetail () {
      this.loading = true
      this.$ajax.post({
        url: this.root + 'repairorder/selectdetail',
        data: {
          repairid: Number(this.repairid)
        }
      }).then(result => {
        this.loading = false
        if (result.status) {
          this.resultObject = result.object
        } else {
          
        }
      },err => this.loading = false)
    }
  },
  filters: {
    repairtype (item) {
      switch (item) {
        case 1:
          return '消防'
        case 2:
          return '照明'
        case 3:
          return '暖气'
        case 4:
          return '马桶'
        case 5:
          return '桌椅'
        case 6:
          return '其他'
      }
    }
  }
}
</script>

<style scoped>
    .div-container{
        background: white;
        padding:0 10px 0 10px;
        margin-top: 8px;
    }
    .repair-status{
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .status-content{
        color: #6E8B3D;
    }
    .info-title{
        height: 40px;
        border-bottom: 1px lightgray solid;
        display: flex;
        align-items: center;
        color: #6E8B3D;
        font-weight: bold;
    }
    .info-content{
        /* height: 150px; */
        background: white;
    }
    .mui-btn-outlined{
        margin-top: 10px;
    }
    .info-des{
        margin-top: 10px;
    }
    .info-img>img{
        width: 100%;
    }
    .info-img{
        display: flex;
        justify-content: center;
    }
    .com-container{
        margin-bottom: 80px;
    }
</style>

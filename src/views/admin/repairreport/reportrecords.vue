<template>
    <div class="com-container">
        <Header>报修记录</Header>
         <!-- <div class="back-header">
          <span @click="$router.push('/adminrepair')" class="mui-icon mui-icon-arrowleft"></span>
          <span>
              报修记录
          </span>
        </div> -->
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
            <div v-if="resultObject.repairstatus!=0" class="div-container repair-info">
                 <div class="info-title">接单人信息</div>
                 <div class="repair-status">
                    <span>联系人</span>
                    <span class="status-content">{{resultObject.reciever}}</span>
                </div>
                <div class="repair-status">
                    <span>联系电话</span>
                    <span class="status-content">{{resultObject.recieverphone}}</span>
                </div>
                 <div class="repair-status">
                    <span>接单时间</span>
                    <span class="status-content">{{resultObject.recievetime|format}}</span>
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
                 <div class="repair-status">
                    <span>详细地址</span>
                    <span class="status-content">{{resultObject.address}}</span>
                </div>
            </div>
        </div>
         <div class="submit-container">
          <button v-if="resultObject.repairstatus == 0" @click="handleOrder(resultObject.repairid)" type="button" class="mui-btn submit-btn">点击接单</button>
        </div>
    </div>
</template>
<script>
import Header from '../../../components/LeftHeader'
export default {
  components: {
    Header
  },
  data () {
    return {
      root: process.env.API_HOST,
      resultObject: {}
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
      this.$ajax.post({
        url: this.root + 'repairorder/selectdetail',
        data: {
          repairid: this.repairid
        }
      }).then(result => {
        if (result.status) {
          this.resultObject = result.object
        } else {
          
        }
      })
    },
    handleOrder (repairid) {
      var btnArray = ['否', '是']
      mui.confirm('确认接单？', '接单', btnArray, (e) =>{
        if (e.index == 1) {
          const {userid , userphone ,username} = this.$cookies.get('CUR_USERINFO')
          const postData = {
            repairid: repairid,
            receivername: username,
            userid: userid,
            phone: userphone
          }
          this.$ajax.post({
            url: this.root + 'repairorder/order',
            data: postData
          }).then(result => {
            if (result.status) {
              this.$router.push('/adminrepair') 
            } else {
              mui.toast('接单失败')
            }
          })
        }
      })
      
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
        max-height: 335px;
    }
    .info-img{
        display: flex;
        justify-content: center;
    }
    .com-container{
        margin-bottom: 80px;
    }
    .submit-container {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
    .submit-btn {
      background: #6e8b3d;
      color: white;
      width: 250px;
      border-radius: 10px;
      height: 40px;
      margin-bottom: 20px;
      margin-top: 20px;
    }
</style>

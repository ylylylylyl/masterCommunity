<template>
    <div>
       <header class="header">
           <span class="mui-icon mui-icon-arrowleft" @click="$router.go(-1)"></span>
           <span class="header-title">我的房屋</span>
           <p @click="$router.push('/bindhouse')">绑定房屋</p>
       </header>
       <div class="item-container" >
           <div class="item" @click="changeHouse(item)" v-for="item in bindHouseList" :key="item.binid">
               <div class="item-self">
                   <span>业主：{{item.houseowner}}</span>
                   <span>{{item.phonenumber}}</span>
               </div>
               <div>
                   <span>房号：{{item.house}}</span>
               </div>
               <div class="item-addr">
                   <span>住址：{{item.chooseaddr}}</span>
                   <span class="detail-span" @click="e=>toDetail(e,item.bindid)">查看详情</span>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  mounted () {
    this.init()
  },
  data () {
    return {
      bindHouseList: []
    }
  },
  computed: {
    ...mapGetters(['curUserInfo'])
  },
  methods: {
    //   获取绑定的房屋信息
    init () {
      const root = process.env.API_HOST
      const {userid} = this.$cookies.get('CUR_BINDINFO')
      this.$ajax.post({
        url: root + 'bindhouse/selectbindhouse',
        data: {
          userid
        }
      })
        .then(res => {
          this.bindHouseList = res.result
        })
    },
    changeHouse (item) {
      if (item.bindid === this.$cookies.get('CUR_BINDINFO').bindid) {
        mui.toast('切换的房屋不能和当前登录房屋相同！请重新选择')
        return
      }
      var btnArray = ['否', '是']
      mui.confirm(`确认切换${item.chooseaddr}？`, '切换登录房屋', btnArray, (e) =>{
        if (e.index == 1) {
          this.$cookies.set('CUR_BINDINFO', item)
          this.$router.push('/home')
        }
      })
    },
    toDetail (e,bindid) {
      e.stopPropagation()
      this.$router.push(`/houseinfodet/${bindid}`)
    }
  }
}
</script>
<style scoped>
    .header{
        display: flex;
        width: 100%;
        justify-content: space-between;
        background: white;
        padding-right: 5px;
    }
    .header-title{
        font-size: 16px;
        font-weight: bold;
    }
    .item-container{
        border-top: 1px lightgray solid;
        background: white;
    }
    .item{
        background: white;
        padding: 10px 5px 0px 5px;
        border-bottom: 5px whitesmoke solid;
    }
    .item-self,.item-addr{
        display: flex;
        justify-content: space-between;
        padding-right: 5px;
        margin-bottom: 10px;
    }
    .item-addr{
        margin-top: 10px;
    }
    .content-container{
        background: white;
    }
    .detail-span{
        color:#6e8b3d;
    }
</style>

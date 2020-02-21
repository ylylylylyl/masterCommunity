<template>
    <div>
       <header class="header">
           <span class="mui-icon mui-icon-arrowleft" @click="$router.go(-1)"></span>
           <span class="header-title">用户管理</span>
       </header>
       <div class="item-container" id="OA_task_1">
           <div  class="item mui-table-view-cell"  v-for="item in bindHouseList" :key="item.binid">
               <div class="mui-slider-right mui-disabled" @click="(e)=>deleteuser(e,item.bindid)">
                    <a class="mui-btn mui-btn-red">注销用户</a>
                </div>
               <div class="mui-slider-handle">
                   
                   <div class="item-self">
                        <span>业主：{{item.houseowner}}</span>
                        <span>{{item.phonenumber}}</span>
                    </div>
                    <div>
                        <span>房号：{{item.house}}</span>
                    </div>
                    <div class="item-addr">
                        <span>住址：{{item.chooseaddr}}</span>
                        <span class="detail-span" @click="$router.push(`/houseinfodet/${item.bindid}`)">查看详情</span>
                    </div>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  mounted () {
    var mui = this.mui;
    //mui初始化
    mui.init({
      gestureConfig: {
        tap: true, //默认为true-----单击事件
        doubletap: true, //默认为false-----双击事件
        longtap: true, //默认为false-------长按事件
        swipe: true, //默认为true------滑动事件
        drag: true, //默认为true------拖动事件
        hold: false, //默认为false，不监听-------按住屏幕事件
        release: true //默认为false，不监听-------------离开屏幕事件
      }
    });
    this.init()
  },
  data () {
    return {
      bindHouseList: [],
      root: process.env.API_HOST
    }
  },
  computed: {
    ...mapGetters(['curUserInfo'])
  },
  methods: {
    //   获取绑定的房屋信息
    init () {
      const {villageid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'bindhouse/selectuser',
        data: {
          villageid
        }
      })
        .then(res => {
          this.bindHouseList = res.result
        })
    },
    deleteuser (e,bindid) {
      const elem = e.target.parentNode
      var btnArray = ['否', '是']
      mui.confirm('确认注销当前用户，注销后不可撤回？', '注销用户', btnArray, (e) =>{
        if (e.index == 1) {
          this.$ajax.post({
            url: this.root + 'bindhouse/deleteuser',
            data: {
              bindid
            }
          })
            .then(res => {
              if (res.status) {
                this.init()
                mui.swipeoutClose(elem);
              }
             
            })
        } else {
          mui.swipeoutClose(elem)
        }
      })
      
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

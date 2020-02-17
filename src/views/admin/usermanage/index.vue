<template>
    <div>
       <header class="header">
           <span class="mui-icon mui-icon-arrowleft" @click="$router.go(-1)"></span>
           <span class="header-title">用户管理</span>
       </header>
       <div class="item-container" id="OA_task_1">
           <!-- <ul id="OA_task_1" >
				<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-red">删除</a>
					</div>
					<div class="mui-slider-handle">
						左滑显示删除按钮
					</div>
				</li>
			</ul> -->
           <div  class="item mui-table-view-cell"  v-for="item in bindHouseList" :key="item.binid">
               <div class="mui-slider-right mui-disabled" @click="deleteuser()">
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
    this.init()
    this.muiinit()
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
      const {villageid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: root + 'bindhouse/selectuser',
        data: {
          villageid
        }
      })
        .then(res => {
          this.bindHouseList = res.result
        })
    },
    deleteuser () {
      
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

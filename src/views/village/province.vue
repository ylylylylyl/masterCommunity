<template>
  <div>
    <div class="city-title">
        <div>
            <span>{{province}}</span>
            <span v-if="city">></span>
            <span>{{city}}</span>
            <span v-if="area">></span>
            <span>{{area}}</span>
        </div>
      <span class="iconfont icon-dingwei"></span>
    </div>
    <div class="mui-content mui-row">
      <div class="mui-col-xs-3">
        <div
          id="segmentedControls"
          class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"
        >
          <a
            id="a"
            @click="search(item.name)"
            v-for="(item,key) in village"
            :key="key"
            class="mui-control-item"
            data-index="0"
            :class="{'mui-active':item.name==curProvince}"
          >{{item.name}}</a>
        </div>
      </div>
      <div
        id="segmentedControlContents"
        class="mui-col-xs-9"
        style="border-left: 1px solid #c8c7cc;"
      >
        <div class="mui-loading" v-if="loading">
          <div class="mui-spinner">
            <span class="mui-icon mui-icon-spinner-cycle mui-spin"></span>
          </div>玩命加载中...
        </div>
        <div class="mui-control-content" v-if="!loading">
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              v-for="item in cityData"
              :key="item.adcode"
              @click="searchArea(item.name)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import Province from './province'
export default {
  components:{
    Province
  },
    computed:{
        ...mapGetters(['village','curProvince'])
    },
  mounted() {
    this.search(this.curProvince)
  },
  data(){
    return{
      province:this.curProvince,
      city:'',
      area:'',
      cityData:[],
      loading:false
    }
  },
  methods:{
     search(province){
        this.province = province
       this.loading = true
      //  https://restapi.amap.com/v3/config/district?key=8224cb94492d645e544a7b13df3ea7db&&keywords=%E5%9B%9B%E5%B7%9D%E7%9C%81
       this.$ajax.get({
         url:'https://restapi.amap.com/v3/config/district',
         params:{
           key:'8224cb94492d645e544a7b13df3ea7db',
           keywords:province
         }
       }).then(res=>{
         this.loading = false
         if(res.status){
           this.cityData = res.districts[0].districts
          
         }
         console.log(res)
       })

     },
     searchArea(city){
         this.city = city
         this.$store.commit('VILLAGE',this.cityData)
        //  this.VILLAGE(this.cityData)
             this.loading = true
      //  https://restapi.amap.com/v3/config/district?key=8224cb94492d645e544a7b13df3ea7db&&keywords=%E5%9B%9B%E5%B7%9D%E7%9C%81
       this.$ajax.get({
         url:'https://restapi.amap.com/v3/config/district',
         params:{
           key:'8224cb94492d645e544a7b13df3ea7db',
           keywords:city
         }
       }).then(res=>{
         this.loading = false
         if(res.status){
           this.cityData = res.districts[0].districts
          
         }
         console.log(res)
       })
     }
  }
};
</script>
<style scoped>
.header {
  background: white;
}
.title {
  margin: 0 auto;
}
/* 搜索框 */
input[type="search"] {
  background: rgb(226, 225, 225);
  margin-bottom: 0px;
}
.city-title {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  color: #6e8b3d;
  font-weight: bold;
  background: white;
  border-bottom: 1px lightgray solid;
  height: 40px;
  line-height: 40px;
}
.city-title > span {
  font-size: 16px;
}

.mui-col-xs-3 {
  background: whitesmoke;
  height: calc(100vh - 80px);
}
.mui-col-xs-9 {
  background-color: white;
  border-left: none !important;
    height: calc(100vh - 80px);
}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical
  .mui-control-item.mui-active {
  color: #6e8b3d;
  font-weight: bold;
  border-bottom: none;
  border-left:5px #6e8b3d solid;
}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical
  .mui-control-item {
  border-bottom: none;
}
.mui-control-content{
  display: block
}
.mui-table-view-cell{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px lightgray solid;
  padding-bottom:0px;
}
.mui-loading{
  text-align: center;
  margin-top: 100px;
}
.mui-spinner {
  margin-bottom: 15px;
}
</style>
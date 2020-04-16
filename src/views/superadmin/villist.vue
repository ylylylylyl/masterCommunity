<template>
    <div class="add-container">
             <div class="back-header">
              <div>
                <span @click="$router.push('/super/home')" class="mui-icon mui-icon-arrowleft"></span>
                <span>社区列表</span>
              </div>
              <span class="records-span" @click="$router.push('/super/add')">添加社区</span>
            </div>
        <div >
            <span class="city-span">选择城市</span>
            <Distpicker  @selected="onSelected">
            </Distpicker>
            <span class="city-span">所有社区</span>
            <ul class="mui-table-view"> 
                <li class="mui-table-view-cell" v-for="(item,key) in listData" :key = key>
                    <span>{{item.villagename}}</span>
                    <span class="span-delete" @click="deleteList(item.villageid)">删除</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script ></script>
<script>
import Header from '../../components/LeftHeader'
import Distpicker from 'v-distpicker'
export default {
  components: {Header,Distpicker},
  data () {
    return {
        cityid: '',
        cityname:'',
        villagename:'',
        root:process.env.API_HOST,
        listData:[]
    }
  },
  mounted () {
  },
  methods: {
    onSelected(data) {
      this.cityid = data.area.code
      this.cityname = data.area.value
      this.initVillage()
      console.log(111)
    },
    initVillage(){
      this.$ajax
        .post({
          url: this.root + '/village/getVillage',
          data: {
            cityname:this.cityname
          }
        })
        .then(res => {
          this.loading = false
          if (res.status) {
            this.listData = res.result
          } else {
            this.listData = null
          }
        })
    },
    deleteList(villageid){
        var btnArray = ['否', '是']
      mui.confirm('确认删除该社区，删除后不可撤销？', '删除', btnArray, (e) =>{
        if (e.index === 1) {
            this.$ajax
        .post({
          url: this.root + '/village/deleteVillage',
          data: {
            villageid
          }
        })
        .then(res => {
          if (res.status) {
            this.initVillage()
             mui.toast('删除成功')
          } else {
            mui.toast('删除失败')
          }
        })
        }
      })
        
    },
    clear () {
        this.cityid = ''
        this.cityname = ''
        this.villagename = ''
    }
  }
}
</script>
<style scoped>
.back-header {
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
}
.records-span {
  color: #6e8b3d;
  font-size: 14px;
  font-weight: 700;
}
.add-container{
    padding-top: 40px;
}
.city-span{
    display: block;
    font-weight:bold;
    margin: 10px;
}
input{
    border:none;
    padding-left: 5px;
}
.mui-btn {
  width: 90%;
  margin-top: 40px;
  margin-left: 5%;
  height: 40px;
  background-color: #6e8b3d;
  color: white;
}
.mui-table-view-cell{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.span-delete{
    color: darkred;
}
</style>
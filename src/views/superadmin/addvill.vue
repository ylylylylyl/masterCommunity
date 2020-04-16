<template>
    <div class="add-container">
             <div class="back-header">
              <div>
                <span @click="$router.go(-1)" class="mui-icon mui-icon-arrowleft"></span>
                <span>添加社区</span>
              </div>
            </div>
        <div >
            <span class="city-span">选择城市</span>
            <Distpicker  @selected="onSelected">
            </Distpicker>
            <span class="city-span">社区名</span>
            <input v-model="villagename" type="text" class="mui-input-clear" placeholder="请输入社区名" />
        </div>
        <button 
        type="button" 
        :disabled="loading" 
        class="mui-btn mui-btn-outlined l-btn" 
        @click="add()">
            添加
        </button>
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
        loading: false
    }
  },
  mounted () {
  },
  methods: {
    onSelected(data) {
      this.cityid = data.area.code
      this.cityname = data.area.value
    },
    add () {
      const root = process.env.API_HOST
      this.loading = true
      this.$ajax
        .post({
          url: root + 'village/addVillage',
          data: {
              cityid: Number(this.cityid),
              cityname:this.cityname,
              villagename:this.villagename,
          }
        })
        .then(result => {
          this.loading = false
          this.clear()
          mui.toast('添加成功')
        },err=>this.loading = false)
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
</style>
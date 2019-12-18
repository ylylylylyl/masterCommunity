<template>
  <div class="city-container">
    <Header>城市选择</Header>
    <div class="mui-content">
      <div class="mui-row">
        <div class="mui-col-xs-11">
            <div class="top"  id="current">
                <div class="choose-city-container ">
                    <span class="city-title">你所在的地区</span>
                    <span class="city-name" @click="chooseCityFunc(currentCity)">{{currentCity}}</span>
                </div>
                <div class="choose-city-container" v-if="hotcity.length">
                    <span class="city-title" >{{hotcity[0].nameIndex}}</span>
                    <span class="city-name"  @click="chooseCityFunc( item.cityName.replace(/\([^\)]*\)/g, ''))" v-for="item in hotcity[0].singers" :key="item.id">
                      {{item.cityName|city}}
                    </span>
                </div>
            </div>
            <div class="bottom">
               <div class="choose-city-container current-city" :id="item.nameIndex" v-for="item in cityData" :key="item.nameIndex">
                    <span class="city-title">{{item.nameIndex}}</span>
                    <span class="city-name-bottom" v-for="city in item.singers" :key="city.id" @click="chooseCityFunc(city.cityName)">{{city.cityName}}</span>
                </div>
            </div>
        </div>
        <div class="mui-col-xs-1">
          <div
            id="segmentedControls"
            class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"
          >
            <a class="mui-control-item mui-active" href="#0" data-index="0"  @click="goAnchor('#current')">当前城市</a>
            <a class="mui-control-item" :href="'#'+item.nameIndex" :data-index="i+1" @click="goAnchor('#'+item.nameIndex)" v-for="(item,i) in cityData" :key="item.nameIndex">{{item.nameIndex}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .body{
        height: 100%;
    }
    .city-container{
        height: 100%;
    }
    .mui-content{
        height: 100%;
        padding-top: 40px;
    }
    .mui-row{
        height: 100%;
    }
    .mui-col-xs-1{
        background: whitesmoke;
        position: fixed;
        right: 0;
        overflow-y: auto;
        overflow: hidden;
    }
    .mui-col-xs-11{
        background: white;

    }
    .mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical .mui-control-item{
        border-bottom: none;
        line-height: 26px;
    }
    .top{
        padding-left: 5px;
        background: whitesmoke;
        padding-top: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .bottom{
      height: auto;
    }
    .city-title{
        display: block;
    }
    .city-name{
        display: inline-block;
        background: white;
        border: 1px lightgray solid;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 5px;
        margin-right: 20px;
    }
    .city-title{
      color: brown;
    }
    .city-name-bottom{
      display: block;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px whitesmoke solid;
    }
    .choose-city-container{
      margin-top: 10px;
      padding-left: 10px;

    }
</style>
<script>
import Header from '../../components/LeftHeader'
import BMap from 'BMap'
export default {
  components: {
    Header
  },
  data () {
    return {
      loading: false,
      hotcity: [],
      cityData: [],
      chooseCityData: ''
    }
  },
  computed: {
    currentCity () {
      return this.$store.state.chooseCity
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initData()
    })
  },
  methods: {
    initData () {
      let loading = document.querySelector('#ajaxLoading')
      loading.style.display = 'block'
      //  const root = process.env.OPEN_HOST;
      // http://www.68party.com/app/cityList
      this.$http
        .get(
          'http://www.68party.com/app/cityList'
        )
        .then(
          result => {
            if (result.body.data) {
              const {data} = result.body
              this.cityData = data.filter(item => item.nameIndex != '热门')
              this.hotcity = data.filter(item => item.nameIndex == '热门')
              loading.style.display = 'none'
              this.loading = false
            }
          },
          error => {
            console.log(error)
          }
        )
        .catch(err => {
          console.log(err)
        })
    },
    goAnchor (selector) {
      var anchor = this.$el.querySelector(selector)
      document.documentElement.scrollTop = anchor.offsetTop
    },
    chooseCityFunc (cityName) {
      this.$store.commit('CHOOSE_CITY', cityName)
      this.$router.push('/addpayuser')
    }

  }
}
</script>

<template>
  <div class="content-container">
    <Header>天气预报</Header>
    <div v-if="weather.city" class="weather-container">
      <div class="top-container">
        <span class="area-span">{{weather.city}}</span>
        <span class="area-span mui-icon mui-icon-location"></span>
      </div>
      <div class="temprature-container">
        <span class="temp-span">{{weather.temperature||''}}℃</span>
      </div>
      <div class="last-time-container">
        <span class="last-time">上次更新时间：{{weather.reporttime}}</span>
      </div>
      <div class="main-container">
        <div class="item" v-for="(item,key) in feathure.casts" :key="key">
          <span>{{item.date}}&nbsp;{{item.week|week}}</span>
          <span>{{item.dayweather}}</span>
          <span>{{item.daytemp}}℃/{{item.nighttemp}}℃</span>
        </div>
      </div>
      <div class="comfort-container">
        <span>舒适度</span>
        <Pie :humidity="weather.humidity"></Pie>
      </div>
       <div class="comfort-container">
        <span>风向风力</span>
        <div class="svg-container">
           <svg class="icon icon-fengche" aria-hidden="true">
            <use xlink:href="#icon-fengche1" />
          </svg>
        </div>
        <div class="span-container">
          <span>{{weather.winddirection}}方向</span>
        </div>
      </div>
    </div>
    <Loading v-if="loading"></Loading>
  </div>
</template>
<script>
import Header from '../../components/LeftHeader'
import Loading from '../../components/Loading'
import Pie from './pie'
export default {
  components: {Header, Pie, Loading},
  // 天气预报接口
  // https://restapi.amap.com/v3/weather/weatherInfo?key=8224cb94492d645e544a7b13df3ea7db&&city=510104&&extensions=all
  mounted () {
    this.init()
  },
  data () {
    return {
      root: process.env.API_HOST,
      feathure: {},
      weather: {},
      num: '',
      loading: false
    }
  },
  methods: {
    init () {
      // const villageid = Number(this.$cookies.get('CUR_BINDINFO').villageid) || Number(this.$cookies.get('CUR_USERINFO').villageid)
      const villageid = this.$cookies.get('CUR_BINDINFO')?
        Number(this.$cookies.get('CUR_BINDINFO').villageid):Number(this.$cookies.get('CUR_USERINFO').villageid)
      this.loading = true
      this.$ajax.post({
        url: this.root + 'village/getDetail',
        data: {
          villageid
        }
      })
        .then(res => {
          this.loading = false
          this.getWeather(res.object.cityid)
          this.getFeathure(res.object.cityid)
        })
    },
    getWeather (cityid) {
      this.$ajax.get({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo',
        params: {
          key: '8224cb94492d645e544a7b13df3ea7db',
          city: cityid,
          extensions: 'base'
        }
      })
        .then(res => {
          this.weather = res.lives[0]
        })
    },
    getFeathure (cityid) {
      this.$ajax.get({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo',
        params: {
          key: '8224cb94492d645e544a7b13df3ea7db',
          city: cityid,
          extensions: 'all'
        }
      })
        .then(res => {
          this.feathure = res.forecasts[0]
        })
    }
  },
  filters: {
    week (week) {
      switch (week) {
        case '1':
          return '星期一'
        case '2':
          return '星期二'
        case '3':
          return '星期三'
        case '4':
          return '星期四'
        case '5':
          return '星期五'
        case '6':
          return '星期六'
        case '7':
          return '星期日'
      }
    }
  }
}
</script>
<style scoped>
.content-container{
  background: -webkit-gradient(linear,0% 0,0% 100%,from(#88a9ca),to(#bcd3e3)); 
  background: linear,0% 0,0% 100%,from(#88a9ca),to(#bcd3e3);
  height: auto;

}
.weather-container{
  height: 100%;
  padding-top: 40px;
}
.area-span {
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
}
.top-container{
  display: flex;
  justify-content: center;
}
.temprature-container{
  display: flex;
  justify-content: center;
}
.temp-span{
  display: block;
  color: white;
  font-weight: 100;
  font-size: 58px;
  margin-top: 40px;
}
.item {
  display: flex;
  /* justify-content: space-between; */
  padding: 10px;
}
.main-container{
  margin-top: 35px;
  padding-top: 10px;
}
.item>span {
  flex: 1;
  text-align: center;
  color: white;
  font-size: 15px;
  flex-wrap: nowrap;
  border-bottom: 1px lightgray solid;
  opacity: 0.8;
}
.item:nth-child(1){
  border-top: 1px lightgray solid;
}
.pie {
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  margin-top: 40px;
  border-radius: 50%;
  background: #ccc;
  background-image: linear-gradient(to right, transparent 50%, #4479FD 0);
  color: transparent;
  text-align: center;
    animation-play-state: paused;
  animation-delay: -60s;
}
.pie::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  width: 50%; height: 100%;
  border-radius: 0 100% 100% 0 / 50%;
  background-color: inherit;
  transform-origin: left;
  animation: spin 5s linear infinite, bg 10s step-end infinite;

}
@keyframes spin {
  to { transform: rotate(.5turn); }
}
@keyframes bg {
  50% { background: #4479FD; }
}   
.comfort-container{
  color: white;
  /* opacity: 0.8; */
  padding: 10px;
  font-weight: bold;
}
.svg-container{
  display: flex;
  justify-content: center;
  align-items: center
}
.svg-container>svg {
  font-size: 160px;
}
.span-container{
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  margin-top: 10px;
}
.last-time{
  text-align: center;
}
.last-time-container{
  display: flex;
  justify-content: center;
  margin-top: 40px;
  color: white;
}
.icon-fengche{
  color: rgb(253, 253, 252);
  opacity: 0.8;
}
</style>


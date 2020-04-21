<template>
<div id = 'iframe' class="ifram-container" >
    <!-- <span @click="$router.push('/map')" class="back">返回</span>  -->
    <iframe :src="url" frameborder="0" width="100%" height="100%">
    </iframe>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {MP} from '../../utils/util'
export default {
  async mounted () {
    const center = this.center.join(',')
    // this.url = window.urlsPath.statisticsUrl
    this.url = `https://m.amap.com/around/?locations=${center}&keywords=%E7%BE%8E%E9%A3%9F,KTV,%E5%9C%B0%E9%93%81%E7%AB%99,%E5%85%AC%E4%BA%A4%E7%AB%99&defaultIndex=3&defaultView=&searchRadius=5000&key=9342d0c3e0b2ebe14922871bb6f3189f`
  },
  data () {
    return {
      url: ''
    }
  },
  computed: {
    ...mapGetters(['center'])
  },
  methods: {
    ...mapActions(['setCurCity', 'setVillage']),
    initCenter () {
      MP('B96xQKulGmzWLRsLRQVHqD4G7EPaF1tD').then(BMap => {
        // 百度地图API功能
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (position) {
          let center = []
          center.push(position.point.lng,position.point.lat)
          this.center = center
        }, e => {
          mui.toast('定位失败')
        }, {
          provider: 'baidu'
        })
      })
    }
  }
}
</script>
<style scoped>
.back{
    position: absolute;
    color: white;
    top: 10px;
    left: 10px;
}
.ifram-container {
    height: 100vh;
    width: 100%;
}
</style>
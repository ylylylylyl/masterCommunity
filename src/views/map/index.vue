<template>
  <div class="content-container">
    <Header>小区周边</Header>
    <div class="back-header">
      <div>
        <span @click="$router.push('/home')" class="mui-icon mui-icon-arrowleft"></span>
        <span>小区周边</span>
      </div>
      <a @click="$router.push('/ambitus')" class="records-span"  >周边</a>
    </div>
    <!-- <div id="container" style="width:100%; height:100%;resize:both;"></div> -->
    <div id="container"></div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      href:
        'https://m.amap.com/around/?locations=116.470098,39.992838&keywords=%E7%BE%8E%E9%A3%9F,KTV,%E5%9C%B0%E9%93%81%E7%AB%99,%E5%85%AC%E4%BA%A4%E7%AB%99&defaultIndex=3&defaultView=&searchRadius=5000&key=9342d0c3e0b2ebe14922871bb6f3189f'
    }
  },
  computed: {
    ...mapGetters(['center'])
  },
  methods: {
    //   onApiLoaded(){
    //     var map = new AMap.Map('container', {
    //         center: [117.000923, 36.675807],
    //         zoom: 6
    //     });
    //     map.plugin(["AMap.ToolBar"], function() {
    //         map.addControl(new AMap.ToolBar());
    //     });
    // }
    initBMap () {
      var map;
      map = new AMap.Map('container', {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 17,
        pitch: 80,
        rotation: -15,
        viewMode: '3D', // 开启3D视图,默认为关闭
        buildingAnimation: false, // 楼块出现是否带动画

        expandZoomRange: true,
        zooms: [3, 20],
        center: this.center
      })
      map.addControl(
        new AMap.ControlBar({
          showZoomBar: false,
          showControlButton: true,
          position: {
            right: '10px',
            top: '10px'
          }
        })
      )
    //   });
    },
    init () {
      console.log(this.center)
    }
  },
  mounted () {
    this.initBMap()
    this.init()
  }
};
</script>
<style scoped>
.map-container {
  padding-top: 40px;
}
.container {
  height: 100%;
}
.container {
  height: 100%;
}
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
</style>
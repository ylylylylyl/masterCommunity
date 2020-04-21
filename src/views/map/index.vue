<template>
  <div class="content-container">
    <Header>小区周边</Header>
    <div class="back-header">
      <div>
        <span @click="$router.push('admin/home')" class="mui-icon mui-icon-arrowleft"></span>
        <span>小区周边</span>
      </div>
      <a @click="$router.push('/ambitus')" class="records-span">周边</a>
    </div>
    <!-- <div id="container" style="width:100%; height:100%;resize:both;"></div> -->
    <div id="container"></div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['center'])
  },
  methods: {
    initBMap () {
      this.setCurCity()
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
        // center: [106.53063501, 29.54460611]
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
    ...mapActions(['setCurCity'])
  },
  mounted () {
    this.initBMap()
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
<template>
  <div>
    <div class="header">
      <span class="mui-icon iconfont icon-shouye" @click="toRouter(2)"></span>
      <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-luntanzixun" />
      </svg> -->
      <div class="mui-input-row mui-search">
        <input type="search" class="search mui-input-clear" placeholder="请输入关键字" />
      </div>
      <a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" href="#topPopover"></a>
      <!-- <span class="mui-icon mui-icon-plus"></span> -->
    </div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentControl"
        class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <a class="mui-control-item mui-active" href="#item1mobile">热门</a>
        <a class="mui-control-item" href="#item2mobile">提问帖</a>
        <a class="mui-control-item" href="#item3mobile">分享帖</a>
      </div>

      <div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-4"></div>

      <div class="mui-slider-group">
        <div
          id="item1mobile"
          class="md-f1 mui-slider-item mui-control-content detailInfos md-box md-ver mui-active"
        >
          <Hot></Hot>
        </div>
        <div
          id="item2mobile"
          class="bg md-f1 mui-slider-item mui-control-content detailInfos1 md-box md-ver"
        >

          <Question></Question>
        </div>
        <div
          id="item3mobile"
          class="bg md-f1 mui-slider-item mui-control-content detailInfos2 md-box md-ver"
        >

          <Share></Share>
        </div>
      </div>
    </div>
  <div id="topPopover" class="mui-popover">
    <div class="mui-popover-arrow"></div>
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" @click="toRouter(1)">
              <span class="mui-icon mui-icon-compose"></span>
              我要发帖
          </li>
          <li class="mui-table-view-cell" @click="toRouter(3)">
            <span class="mui-icon mui-icon-chatboxes"></span>
            我的发帖
          </li>
        </ul>
      </div>
    </div>

  </div>
    <!-- <div class="footer">
      <button type="button" class="mui-btn mui-btn-outlined backhome">
        <span class="mui-icon mui-icon-home"></span>
        返回主页
        </button>
      <button type="button" class="mui-btn mui-btn-outlined my-forum">
        <span class="mui-icon mui-icon-bars"></span>
        我的发布
      </button>
    </div> -->
  </div>
</template>
<script>
import Hot from './hot'
import Question from './question'
import Share from './share'
export default {
  components: {
    Hot,
    Question,
    Share
  },
  mounted () {
    mui('.mui-input-row input').input()
    mui('.mui-slider').slider()
  },
  beforeDestroy () {
    if (document.getElementsByClassName('mui-backdrop')[0]) {
      document.getElementsByClassName('mui-backdrop')[0].style.display = 'none'
    }
  },
  methods: {
    toRouter (index) {
      switch (index) {
        case 1:
          this.$router.push('/publishforum')
          break
        case 2:
          this.$router.push('/home')
          break
        case 3:
          this.$router.push('/myforum')
          break
      }
    }
  }
}
</script>
<style scoped>
.header {
  height: 60px;
  background: #6e8b3d;
  display: flex;
  justify-content: space-around;
  align-items: center;
   position: fixed;
  top: 0px;
  z-index: 998;
  width: 100%;
}
.search {
  background: white;
  margin-bottom: 0px;
}
.mui-search {
  height: 34px;
  line-height: 34px;
}
.icon-shouye {
  font-size: 28px;
  color:white;
}
.mui-icon-plus {
  color: white;
  font-size: 20px;
}
.forum-item {
  display: flex;
  justify-content: space-between;
  background: white;
  padding-top: 15px;
  border-bottom: 1px gray solid;
}
.item-title {
  display: flex;
  flex-direction: column;
  font-weight: bolder;
  font-size: 18px;
}
.left {
  display: flex;
}
.right {
  display: flex;
  align-items: center;
  padding-right: 10px;
  margin-right: 10px;
}
.num {
  color: rgb(175, 4, 4);
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
}
.user-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-info {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.item-des {
  margin-top: 10px;
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 10px;
}
.des-img {
  height: 80px;
  width: 120px ;
}
.icon-zan {
  font-size: 10px;
}
.datetime {
  color: gray;
  font-size: 10px;
  margin-right: 10px;
}
.mui-segmented-control.mui-segmented-control-inverted
  ~ .mui-slider-progress-bar {
  background-color: #6e8b3d;
}
.mui-active {
  color: #6e8b3d !important;
}

.mui-slider-indicator{
    background-color: white;
}
#sliderSegmentControl{
  position: fixed;
  top: 60px;
  z-index: 998;
}
.mui-slider-group{
  margin-bottom: 60px;
  margin-top: 110px;
}
.mui-slider-progress-bar{
  top: 110px;
  position: fixed;
}
#topPopover {
  position: fixed;
  top: 16px;
  right: 6px;
}
#topPopover .mui-popover-arrow {
  left: auto;
  right: 6px;
}
.mui-popover {
  height: 100px;
}
.mui-action-menu{
  color:white
}
.mui-content {
  padding: 10px;
}

/* .mui-slider .mui-slider-group {
  white-space: normal;
} */
/*.mui-control-content {
  background-color: white;
  min-height: 215px;
}
.mui-control-content .mui-loading {
  margin-top: 50px;
} */
</style>

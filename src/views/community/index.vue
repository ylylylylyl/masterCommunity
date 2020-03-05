
<template>
  <div class="comm-container">
    <Header>
      <span class="comm-name">服务</span>
    </Header>
    <div class="main-content">
      <div class="mui-content mui-row mui-fullscreen">
        <div class="mui-col-xs-3">
          <div
            id="segmentedControls"
            class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"
          >
            <a class="mui-control-item mui-active" href="#content1" data-index="0">物业缴费</a>
            <a class="mui-control-item" href="#content2" data-index="1">社区公告</a>
            <a class="mui-control-item" href="#content3" data-index="2">失物招领</a>
            <!-- <a class="mui-control-item" href="#content4" data-index="3">便民服务</a> -->
          </div>
        </div>
        <div
          id="segmentedControlContents"
          class="mui-col-xs-9"
          style="border-left: 1px solid #c8c7cc;"
        >
          <Property></Property>
          <Announce></Announce>
          <LostThing></LostThing>
          <div id="content4" class="mui-control-content">
            <ul class="mui-table-view">
              <li class="mui-table-view-cell">第3个选项卡子项-0</li>
              <li class="mui-table-view-cell">第3个选项卡子项-1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comm-container {
  background-color: white;
}
.main-content {
  padding-top: 40px;
  padding-bottom: 50px;
  height: 100vh;
}
.mui-content {
  padding-bottom: 50px;
}
.mui-content {
  padding-top: 40px;
}
.mui-col-xs-3 {
  background: whitesmoke;
}
.mui-col-xs-9 {
  background-color: white;
  border-left: none !important;
}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical
  .mui-control-item.mui-active {
  color: #6e8b3d;
  font-weight: bold;
  border-bottom: none;
}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical
  .mui-control-item {
  border-bottom: none;
}
.icon {
  font-size: 40px;
}
.card-item {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.mui-card-content {
  display: flex;
  padding: 15px;
}

</style>
<script>
import Header from '../../components/Header'
import Property from '../../components/Community/property'
import Announce from '../../components/Community/announce'
import LostThing from '../../components/Community/lostthing'
export default {
  components: {
    Header,
    Property,
    Announce,
    LostThing
  }
}
</script>

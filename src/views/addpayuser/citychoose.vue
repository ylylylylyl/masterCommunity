<template>
  <div class="city-container">
    <Header>城市选择</Header>
    <div class="mui-content">
      <div class="mui-row">
        <div class="mui-col-xs-11">
            <div class="top">
                <div class="current-city">
                    <span class="city-title">你所在的地区</span>
                    <span class="city-name">成都</span>
                </div>
            </div>
            <div>

            </div>
        </div>
        <div class="mui-col-xs-1">
          <div
            id="segmentedControls"
            class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"
          >
            <a class="mui-control-item mui-active" href="#content1" data-index="0">当前热门</a>
            <a class="mui-control-item" href="#A" data-index="0">A</a>
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
        height: 100%;
    }
    .mui-col-xs-11{
        height: 100%;
        background: white;
        
    }
    .mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical .mui-control-item{
        border-bottom: none;
        line-height: 30px;
    }
    .top{
        padding-left: 5px;
        background: whitesmoke;
        padding-top: 10px;
    }
    .city-title{
        display: block;
    }
    .city-name{
        display: inline-block;
        background: white;
        border: 1px lightgray solid;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>
<script>
import Header from "../../components/LeftHeader";
export default {
  components: {
    Header
  }
};
</script>
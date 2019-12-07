<template>
  <div>
    <Header>绑定房屋</Header>
    <div class="bindhouse-container">
      <div class="house-info">
        <div class="info-title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fangwu" />
          </svg>
          <span>房屋信息</span>
        </div>
        <div class="info-content">
          <button id="comm-btn" class="btn mui-btn mui-btn-block" @click="initRepair()">
            <div>
              <span>小区</span>
            </div>
            <div>
              <span id="comm-result">点击选择</span>
              <span class="mui-icon mui-icon-arrowright"></span>
            </div>
          </button>
          <button id="building-btn" class="btn mui-btn mui-btn-block" @click="initBuilding()">
            <div>
              <span>楼栋</span>
            </div>
            <div>
              <span id="building-result">点击选择</span>
              <span class="mui-icon mui-icon-arrowright"></span>
            </div>
          </button>
          <div class="input-container">
            <span class="input-left">房屋号</span>
            <input type="text" class="mui-input-clear inout-right" placeholder="请输入房屋号" />
          </div>
           <div class="input-container">
            <span class="input-left">房屋面积</span>
            <input type="text" class="mui-input-clear inout-right" placeholder="请输入房屋面积" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bindhouse-container {
  padding-top: 40px;
  padding-left: 5px;
}
.info-content {
  margin-top: 10px;
}
.mui-btn-block {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: none;
  border-bottom: 1px whitesmoke solid;
  margin-bottom: 0;
}
.input-container{
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
}
.input-left{
    flex: 1
}
.inout-right{
    flex: 4;
    border: none;
    margin-bottom: 0px;
}
</style>
<script>
import Header from "../../components/LeftHeader";
export default {
  components: {
    Header
  },
  data() {
    return {
      typedata: [
        { value: 1, text: "东和春天" },
        { value: 2, text: "白河左岸" },
        { value: 3, text: "海棠湾" },
        { value: 4, text: "祥和里" },
        { value: 5, text: "海棠公馆" },
        { value: 6, text: "其他" }
      ],
      buildingdata:[
           { value: 1, text: "一单元" },
            { value: 2, text: "二单元" },
            { value: 3, text: "三单元" },
            { value: 4, text: "四单元" },
            { value: 5, text: "五单元" },
            { value: 6, text: "六单元" }
      ]
    };
  },
  methods: {
    initRepair() {
      var picker = new mui.PopPicker();
      picker.setData(this.typedata);
      var showUserPickerButton = document.getElementById("comm-btn");
      var userResult = document.getElementById("comm-result");
      picker.show(function(items) {
        userResult.innerText = items[0].text;
        //返回 false 可以阻止选择框的关闭
        //return false;
      });
    },
    initBuilding() {
      var picker = new mui.PopPicker();
      picker.setData(this.buildingdata);
      var showUserPickerButton = document.getElementById("building-btn");
      var userResult = document.getElementById("building-result");
      picker.show(function(items) {
        userResult.innerText = items[0].text;
        //返回 false 可以阻止选择框的关闭
        //return false;
      });
    }
  }
};
</script>
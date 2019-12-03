<template>
  <div id="content2" class="mui-control-content">
    <div class="mui-card" @click="toDetail()">
      <!--页眉，放置标题-->
      <div class="mui-card-header">
        <div>
          <svg class="icon notice-icon" aria-hidden="true">
            <use xlink:href="#icon-tongzhigonggao" />
          </svg>
          <span>关于停电的通知</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="notice-footer">
          <p>物业通知</p>
          <p>2019.08.08 16:04:30</p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">
        <div>
          <svg class="icon notice-icon" aria-hidden="true">
            <use xlink:href="#icon-tongzhigonggao" />
          </svg>
          <span>关于停电的通知</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="notice-footer">
          <p>物业通知</p>
          <p>2019.08.08 16:04:30</p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">
        <div>
          <svg class="icon notice-icon" aria-hidden="true">
            <use xlink:href="#icon-tongzhigonggao" />
          </svg>
          <span>关于停电的通知</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="notice-footer">
          <p>物业通知</p>
          <p>2019.08.08 16:04:30</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    toDetail(){
      this.$router.push('/announcedetail')
    }
  }
}
</script>
<style scoped>

.card-item {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.mui-card-content {
  display: flex;
  padding: 15px;
}
/* 公告 */
.notice-footer {
  display: flex;
}
.notice-footer > p {
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.notice {
  margin: 5px;
  border-bottom: 5px whitesmoke solid;
  height: 110px;
}
.notice-icon {
  font-size: 25px;
}
</style>
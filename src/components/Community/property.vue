<template>
  <div id="content1" class="mui-control-content mui-active">
    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">物业缴费</div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="card-item" @click="toRouter(1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-home" />
          </svg>
          <span>房屋信息</span>
        </div>
        <div class="card-item" @click="toRouter(2)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-techreport-" />
          </svg>
          <span>缴费记录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toRouter (route) {
      switch (route) {
        case 1:
          this.$router.push('/houseinfo')
          break
        case 2:
          this.$router.push('/propertypayment')
          break
      }
    }
  }
}
</script>
<style scoped>

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

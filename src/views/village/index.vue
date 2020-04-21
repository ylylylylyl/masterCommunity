<template>
  <div>
    <header class="header">
      <span class="mui-icon mui-icon-arrowleft" @click="$router.push('/home')"></span>
      <span class="title">小区选择</span>
    </header>
    <!-- <div class="mui-input-row mui-search">
        <input type="search" class="mui-input-clear" placeholder="">
    </div> -->
    <router-view></router-view>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Province from './province'
export default {
  components: {
    Province
  },
  computed: {
    ...mapGetters(['village', 'curProvince'])
  },
  mounted () {
    mui('.mui-input-row input').input()
  }
}
</script>
<style scoped>
.header {
  background: white;
}
.title {
  margin: 0 auto;
}
/* 搜索框 */
input[type="search"] {
  background: rgb(226, 225, 225);
  margin-bottom: 0px;
}

</style>

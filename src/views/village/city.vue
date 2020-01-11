<template>
  <div>
    <div class="city-title">
      <div>
        <span @click="$router.push('/village')">{{province}}</span>
        <span v-if="city">></span>
        <span>{{city}}</span>
      </div>
      <span class="iconfont icon-dingwei"></span>
    </div>
    <div class="mui-content mui-row">
      <div class="mui-col-xs-3">
        <div
          id="segmentedControls"
          class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"
        >
          <a
            id="a"
            @click="search(item.name)"
            v-for="(item,key) in leftData"
            :key="key"
            class="mui-control-item"
            data-index="0"
            :class="{'mui-active':item.name==city}"
          >{{item.name}}</a>
        </div>
      </div>
      <div
        id="segmentedControlContents"
        class="mui-col-xs-9"
        style="border-left: 1px solid #c8c7cc;"
      >
        <div class="mui-loading" v-if="loading">
          <div class="mui-spinner">
            <span class="mui-icon mui-icon-spinner-cycle mui-spin"></span>
          </div>玩命加载中...
        </div>
        <div class="mui-control-content" v-if="!loading">
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              v-for="item in rightData"
              :key="item.adcode"
              @click="searchArea(item.name)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { searchFromCity } from '../../utils/util'
export default {
  data () {
    return {
      loading: false,
      rightData: [],
      area: '',
      province: this.$route.query.province,
      city: this.$route.query.city,
      leftData: this.$route.query.left
    }
  },
  mounted () {
    this.search(this.city)
  },
  methods: {
    search (value) {
      this.city = value
      localStorage.setItem('chooseCity', value)
      this.loading = true
      searchFromCity(value)
        .then(res => {
          this.loading = false
          if (res.status) {
            this.rightData = res.districts[0].districts
          }
        })
    },
    searchArea (area) {
      this.area = area
      this.$router.push({
        path: '/village/area',
        query: {
          province: this.province,
          city: this.city,
          area: this.area,
          left: this.rightData
        }
      })
    }
  }
}
</script>
<style scoped>
.city-title {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  color: #6e8b3d;
  font-weight: bold;
  background: white;
  border-bottom: 1px lightgray solid;
  height: 40px;
  line-height: 40px;
}
.city-title > span {
  font-size: 16px;
}

.mui-col-xs-3 {
  background: whitesmoke;
  height: calc(100vh - 80px);
}
.mui-col-xs-9 {
  background-color: white;
  border-left: none !important;
  height: calc(100vh - 80px);
}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical
  .mui-control-item.mui-active {
  color: #6e8b3d;
  font-weight: bold;
  border-bottom: none;
  border-left: 5px #6e8b3d solid;
}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical
  .mui-control-item {
  border-bottom: none;
}
.mui-control-content {
  display: block;
}
.mui-table-view-cell {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px lightgray solid;
  padding-bottom: 0px;
}
.mui-loading {
  text-align: center;
  margin-top: 100px;
}
.mui-spinner {
  margin-bottom: 15px;
}
</style>

<template>
  <div>
    <div class="city-title">
      <div>
        <span @click="$router.push('/village')">{{province}}</span>
        <span v-if="city">></span>
        <span @click="goCity()">{{city}}</span>
        <span v-if="area">></span>
        <span >{{area}}</span>
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
            :class="{'mui-active':item.name==area}"
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
        <div class="no-content" v-if="!loading&&rightData==null">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-apptubiao-" />
          </svg>
          <span>该区域暂未开通相关社区</span>
        </div>
        <div class="mui-control-content" v-if="!loading&&rightData!=null">
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              v-for="item in rightData"
              :key="item.villageid"
              @click="chooseArea(item)"
            >{{item.villagename}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      userid: '',
      loading: false,
      rightData: [],
      queryleft: ''
    }
  },
  computed: {
    ...mapGetters(['curUserInfo']),
    province () {
      return this.$route.query.province
    },
    city () {
      return this.$route.query.city
    },
    area () {
      return this.$route.query.area
    },
    leftData () {
      return this.$route.query.left
    }
  },
  mounted () {
    this.search(this.area)
  },
  methods: {
    search (cityname) {
      const root = process.env.API_HOST
      this.$cookies.set('chooseArea', cityname)
      this.loading = true
      this.$ajax
        .post({
          url: root + '/village/getVillage',
          data: {
            cityname: cityname
          }
        })
        .then(res => {
          this.loading = false
          if (res.status) {
            this.rightData = res.result
          } else {
            this.rightData = null
          }
        })
    },
    chooseArea (item) {
      const root = process.env.API_HOST
      const postData = {
        userid: this.curUserInfo.userid,
        lastloginchoose: item.villageid
      }
      this.$router.push({
        // path: '/home'
        path: '/adminregist?villagename=' + item.villagename + '&&villageid=' + item.villageid
      })
      // this.$store.commit('CHOOSE_VILLAGE', item.villagename)
      this.$ajax.post({
        url: root + 'user/chooseVillage',
        data: postData
      })
        .then(res => {
          if (res.status) {

          }
        })
    },
    async goCity () {
      await this.goCitySearch(this.province)
      this.$router.push({
        path: '/village/city',
        query: {
          province: this.province,
          city: this.city,
          left: this.queryleft
        }
      })
    },
    goCitySearch (province) {
      return this.$ajax
        .get({
          url: 'https://restapi.amap.com/v3/config/district',
          params: {
            key: '8224cb94492d645e544a7b13df3ea7db',
            keywords: province
          }
        })
        .then(res => {
          if (res.status) {
            this.queryleft = res.districts[0].districts
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
.no-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.no-content>.icon{
  font-size: 80px;
  margin-bottom: 20px;
}
.no-content span{
  font-weight: bold;
  color: #6e8b3d;
}
</style>

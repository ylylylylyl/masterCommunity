<template>
  <div>
    <Header>
      <!-- <span class="iconfont icon-dingwei"></span> -->
      <span  class="comm-name">admin</span>
      <span class="logout" @click="logout()">退出</span>
    </Header>
    <div class="main-content">
      <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop">
          <!--支持循环，需要重复图片节点-->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../../assets/image/1.jpg" />
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../../assets/image/5.jpg" />
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../../assets/image/2.jpg" />
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../../assets/image/3.jpg" />
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../../assets/image/1.jpg" />
            </a>
          </div>
          <!--支持循环，需要重复图片节点-->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../../assets/image/5.jpg" />
            </a>
          </div>
        </div>
        <div class="mui-slider-indicator" id="sliin">
          <div class="mui-indicator mui-active"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
        </div>
      </div>
      <div class="function-container">
        <label class="fun-label">智慧社区</label>
        <div class="mui-content">
          <div class="mui-row">
            <div class="mui-col-xs-3 mui-col-xs-3">
              <a @click="torouter(0)" class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fangwu" />
                </svg>
                <a>添加社区</a>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="function-container news-container">
        <label class="fun-label">精选推荐</label>
        <span class="label-add">有料</span>
        <span class="label-add">有趣</span>
        <span class="label-add">有优惠</span>
        <div class="news-content" v-for="(news,i) in newslist" :key="i">
          <div class="news news-style1" @click="toLink(this)">
            <a class="news-a" :href="news.url"></a>
            <div>
              <p>{{news.title}}</p>
              <p>{{news.ptime}}</p>
            </div>

            <img :src="news.imgsrc" />
          </div>
        </div>
      </div>
    </div>
    <Tele v-show="isopen">111</Tele>
  </div>
</template>

<script>
import Header from '../../components/Header'
import Tele from '../../components/telecomplaints'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      newslist: [],
      isopen: false,
      notice: {
        noticetitle: ''
      },
      root: process.env.API_HOST,
      href: 'https://m.amap.com/around/?locations=116.470098,39.992838&keywords=%E7%BE%8E%E9%A3%9F,KTV,%E5%9C%B0%E9%93%81%E7%AB%99,%E5%85%AC%E4%BA%A4%E7%AB%99&defaultIndex=3&defaultView=&searchRadius=5000&key=9342d0c3e0b2ebe14922871bb6f3189f'
    }
  },
  components: {
    Header,
    Tele
  },
  computed: {
    ...mapState(['chooseVillage']),
    ...mapState(['curUserInfo']),
    curAddr () {
      if (this.$cookies.get('CUR_BINDINFO')) return this.$cookies.get('CUR_BINDINFO').chooseaddr
      return null
    }
  },
  watch: {
    chooseVillage (val) {
      console.log(val)
    }
  },
  updated () {
    this.sliderinterval()
  },
  mounted () {
    this.muinit()
    this.getNews()
  },
  methods: {
    muinit () {
      mui.init({})
      this.sliderinterval()
      mui.ready(function () {
        mui('.mui-scroll-wrapper').scroll({
          bounce: true // 是否启用回弹
        })
      })
    },
    getNews () {
      const root = process.env.OPEN_HOST
      // https://3g.163.com/touch/reconstruct/article/list/BDC4QSV3wangning/0-10.html
      this.$http
        .get(
          root + '/touch/reconstruct/article/list/BDC4QSV3wangning/0-10.html'
        )
        .then(
          result => {
            let str = result.body.substring(9, result.body.length - 1)
            this.newslist = JSON.parse(str).BDC4QSV3wangning
          },
          error => {
            console.log(error)
          }
        )
        .catch(err => {
          console.log(err)
        })
    },
    sliderinterval () {
      // 图片轮播
      var gallery = mui('.mui-slider')
      gallery.slider({
        interval: 2000 // 自动轮播周期，若为0则不自动播放，默认为0；
      })
    },
    toLink () {
      event.currentTarget.children[0].click()
    },
    torouter (num) {
      switch (num) {
        case 0:
          this.$router.push('/super/add')
          break
      }
    },
    logout () {
      var btnArray = ['否', '是']
      mui.confirm('确认退出当前账号？', '退出登录', btnArray, (e) =>{
        if (e.index == 1) {
          this.$cookies.set('CUR_USERINFO', '', -1)
          this.$cookies.set('CUR_BINDINFO', '', -1)
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style scoped>
.main-content {
  padding-bottom: 50px;
  padding-top: 40px;
}
.function-container {
  padding: 10px 10px 0 10px;
}
.fun-label {
  font-family: "楷书";
  font-size: 15px;

  font-weight: 300;
}
.mui-navigate-right {
  font-size: 12px;
}
.mui-table-view-cell > a {
  font-size: 8px;
  color: gray;
  text-overflow: inherit;
  margin-top: 5px;
}
.icon {
  font-size: 30px;
  left: 50%;
}
.mui-table-view-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mui-slider {
  border-bottom: 5px solid rgb(228, 227, 227);
}
.main-content {
  background: white;
}
.mui-content {
  background: white;
}
/* 新闻 */
.news-container {
  border-top: 5px solid rgb(228, 227, 227);
}
.label-add {
  font-size: 10px;
  color: gray;
  margin-left: 3px;
}
.news-style1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.news-style1 > img {
  width: 100px;
  height: 60px;
}
.news-style1 > div {
  width: 65%;
}
.news > p {
  color: black;
  font-size: 12px;
}
.style2-img {
  display: flex;
  justify-content: space-around;
}
.style2-img > img {
  width: 30%;
  height: 60px;
}
.news {
  padding-top: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(228, 227, 227);
}
.news-style3 > img {
  width: 100%;
}
/*公告栏 */
.notice-container {
  height: 60px;
  border-top: 5px solid rgb(228, 227, 227);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.notice-title {
  margin-right: 20px;
  width: 10%;
  font-family: "华文彩云";
  color: #6e8b3d;
  font-weight: bold;
  font-size: 16px;
}
.notice-content {
  font-weight: 200;
  width: 70%;
  height: 50px;
  vertical-align: middle;
}
.notice-icon {
  font-size: 20px;
}
.notice-content > p {
  height: 30px;
  line-height: 30px;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
}
.mui-icon-arrowright {
  color: gray;
  opacity: 0.8;
}
.logout{
    color: white;
    position: absolute;
    right: 5px;
}
</style>

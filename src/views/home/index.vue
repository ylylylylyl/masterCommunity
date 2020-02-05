<template>
  <div>
    <Header>
      <span class="iconfont icon-dingwei"></span>
      <span  @click="torouter(0)" class="comm-name">{{curAddr}}</span>
    </Header>
    <div class="main-content">
      <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop">
          <!--支持循环，需要重复图片节点-->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../../assets/image/4.jpg" />
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../../assets/image/slider-bg-01.jpg" />
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
              <img src="../../assets/image/4.jpg" />
            </a>
          </div>
          <!--支持循环，需要重复图片节点-->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../../assets/image/slider-bg-01.jpg" />
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
              <a @click="torouter(1)" class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon-test" />
                </svg>
                <a>生活缴费</a>
              </a>
            </div>
            <div class="mui-col-xs-3 mui-col-xs-3">
              <a @click="torouter(2)" class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jiaofeidating" />
                </svg>
                <a>物业缴费</a>
              </a>
            </div>
            <div class="mui-col-xs-3 mui-col-xs-3">
              <a @click="torouter(3)" class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-repair" />
                </svg>
                <a>生活报修</a>
              </a>
            </div>
            <div class="mui-col-xs-3 mui-col-xs-3">
              <a @click="torouter(4)" class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-luntanzixun" />
                </svg>
                <a>社区论坛</a>
              </a>
            </div>
          </div>
          <div class="mui-row">
            <div class="mui-col-xs-3 mui-col-xs-3" >
              <li class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dianhua" />
                </svg>
                <a href="#picture" :click="open">我要投诉</a>
              </li>
            </div>
            <div class="mui-col-xs-3 mui-col-xs-3">
              <a @click="torouter(5)" class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tingcheku" />
                </svg>
                <a>我要停车</a>
              </a>
            </div>
            <div class="mui-col-xs-3 mui-col-xs-3">
              <li class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tianqi" />
                </svg>
                <a>天气预报</a>
              </li>
            </div>
            <div class="mui-col-xs-3 mui-col-xs-3">
              <li class="mui-table-view-cell">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-gengduo" />
                </svg>
                <a>更多</a>
              </li>
            </div>
          </div>
        </div>
      </div>
      <div class="notice-container" @click="toAnnounce()">
        <div class="notice-title">
          <span>社区公告</span>
        </div>
        <div class="notice-content" >
           <svg class="icon notice-icon" aria-hidden="true">
            <use xlink:href="#icon-tongzhigonggao" />
          </svg>
          <span>今日公告</span>
          <p>111111111111111111111111111111111111111111111111</p>
        </div>
        <div class="notice-icon">
          <span class="mui-icon mui-icon-arrowright"></span>
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
      isopen: false
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
      return this.$cookies.get('CUR_BINDINFO').chooseaddr||null
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
    this.getDefaultVill()
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
          this.$router.push('/village')
          break
        case 1:
          this.$router.push('/livingpayment')
          break
        case 2:
          this.$router.push('/propertypayment')
          break
        case 3:
          this.$router.push('/liferepair')
          break
        case 4:
          this.$router.push('/forum')
          break
        case 5:
          this.$router.push('/opendoor')
          break
      }
    },
    open () {
      this.isopen = true
    },
    toAnnounce () {
      this.$router.push('/announcedetail')
    },
    getDefaultVill () {
      if (this.chooseVillage == null) {
        const root = process.env.API_HOST
        const {userid} = this.$cookies.get('CUR_USERINFO')
        this.$ajax.post({
          url: root + 'bindhouse/selectdefault',
          data: {
            userid
          }
        })
          .then(res => {
            this.$store.commit('CHOOSE_VILLAGE', res.result)
            this.$cookies.set('CUR_BINDINFO', res.object)
          })
      }
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
</style>

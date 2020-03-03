<template>
  <div id="offCanvasWrapper" class="mui-off-canvas-wrap">
    <!-- <aside id="offCanvasSide" class="mui-off-canvas-right">
      <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">Item 1</a>
            </li>
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">Item 2</a>
            </li>
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">Item 3</a>
            </li>
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">Item 4</a>
            </li>
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">Item 5</a>
            </li>
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">Item 6</a>
            </li>
          </ul>
        </div>
      </div>
    </aside> -->
    <Aside></Aside>
    <div class="mui-inner-wrap" id="mui-inner-wrap">
      <div class="self-header">
        <div class="settings-container">
          <span></span>
          <a
            id="offCanvasBtn"
            href="#offCanvasSide"
            class="mui-icon mui-action-menu mui-icon-gear mui-pull-right"
          ></a>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <img class="avatar-icon" v-if="userinfo.avatar" :src="userinfo.avatar"/>
            <svg v-if="!userinfo.avatar" class="icon avatar-icon" aria-hidden="true">
              <use xlink:href="#icon-user__easyico" />
            </svg>
          </div>
          <div class="login-container" @click="login()">
            <span class="login-text">登录/注册</span>
            <span class="mui-icon mui-icon-arrowright"></span>
          </div>
        </div>
        <div class="wallet-container">
          <div class="detail-item" @click="toRouter(2)">
            <span>{{userinfo.walletbalance}}</span>
            <span>零钱</span>
          </div>
          <div class="detail-item">
            <span>0</span>
            <span>卡券</span>
          </div>
          <div class="detail-item">
            <span>0</span>
            <span>现金</span>
          </div>
          <div class="detail-item" @click="toRouter(4)">
            <span>{{userinfo.bankcount}}</span>
            <span>银行卡</span>
          </div>
        </div>
      </div>
      <div id="offCanvasContentScroll" class>
        <div class>
          <div class="self-tab">
            <div class="self-tab-item" @click="toRouter(1)">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                  <use xlink:href="#icon-gerenziliao" />
                </svg>
                <div class="self-info">
                  <span>我的资料</span>
                  <p>查看我的资料</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
            </div>
            <div class="self-tab-item">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                  <use xlink:href="#icon-gerenjiaofeimingxi" />
                </svg>
                <div class="self-info">
                  <span>零钱明细</span>
                  <p>全部缴费一目了然</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
            </div>
            <div class="self-tab-item">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                  <use xlink:href="#icon-luntanzixun" />
                </svg>
                <div class="self-info">
                  <span>我的论坛</span>
                  <p>参与论坛讨论</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
            </div>
            <div class="self-tab-item">
              <div class="tab-left">
                <svg class="icon tab-icon" aria-hidden="true">
                  <use xlink:href="#icon-repair" />
                </svg>
                <div class="self-info">
                  <span>我的报修</span>
                  <p>报修订单轻松查阅</p>
                </div>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
            </div>
          </div>
          <div class="self-bottom">
            <div class="self-bottom-item">
              <div>
                <span class="mui-icon mui-icon-help"></span>
                <span>帮助与反馈</span>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
            </div>
            <div class="self-bottom-item">
              <div>
                <span class="mui-icon mui-icon-pengyouquan"></span>
                <span>分享</span>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
            </div>
            <div class="self-bottom-item" @click="$router.push('/houseinfo')">
              <div>
                <span class="mui-icon mui-icon-loop"></span>
                <span>切换房屋</span>
              </div>
              <span class="mui-icon mui-icon-forward"></span>
            </div>
          </div>
        </div>
      </div>
      <div id="backdrop" class="mui-off-canvas-backdrop"></div>
    </div>
  </div>
</template>

<script>
import Aside from './aside'
export default {
  components: {
    Aside
  },
  mounted () {
    this.init()
    this.findWalletAndBank()
  },
  data () {
    return {
      root: process.env.API_HOST,
      userinfo: {}
    }
  },
  methods: {
    login () {
      var btnArray = ['否', '是']
      mui.confirm('确认退出当前账号？', '注销', btnArray, (e) =>{
        if (e.index == 1) {
          this.$cookies.set('CUR_USERINFO', '', -1)
          this.$cookies.set('CUR_BINDINFO', '', -1)
          this.$router.push('/login')
        }
      })
     
    },
    toRouter (index) {
      switch (index) {
        case 1:
          this.$router.push('/selfinfo')
          break
        case 2:
          this.$router.push('/wallet')
          break
        case 4:
          // 银行卡
          this.$router.push('/bankcard')
          break
      }
    },
    init () {
      // 监听点击遮罩关闭事件
      document.getElementById('backdrop').addEventListener('tap', function () {
      // 阻止默认事件
        event.detail.gesture.preventDefault()
      })
      // 左滑
      document.getElementById('mui-inner-wrap').addEventListener('swipeleft', function () {
        mui('.mui-off-canvas-right').offCanvas('show')
      })
      // 右滑
      document.getElementById('mui-inner-wrap').addEventListener('swiperight', function () {
        mui('.mui-off-canvas-right').offCanvas('close')
      })
    },
    findWalletAndBank () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'user/selectByUserId',
        data: {userid}
      })
        .then(res => {
          if (res.status) {
            this.userinfo = res.object
          }
        })
    }
  },
  destroyed () {
    console.log(document.getElementsByTagName('body')[0])
    document.getElementsByTagName('body')[0].classList.remove('mui-fullscreen')
  }
}
</script>
<style scoped>
.mui-content {
  margin-top: 160px;
}
/* 头部 */
.self-header {
  height: 160px;
  background: url("../../assets/image/self-bg.jpg");
}
.settings-container {
  display: flex;
  justify-content: space-between;
  padding: 8px;
}
.mui-icon-gear {
  color: white;
}
.avatar {
  margin-left: 20px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: white;
}
.avatar-icon {
  height: 60px;
  border-radius: 50%;
  width: 60px;
  z-index: 100;
}
.avatar-container {
  display: flex;
  justify-content: space-between;
}
.login-text {
  font-size: 12px;
}
.login-container {
  color: white;
  font-size: 12px;
  font-weight: 200;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mui-icon-arrowright {
  font-size: 12px;
  margin-left: 20px;
}
.wallet-container {
  display: flex;
  /* margin-left: 20px; */
  margin-top: 10px;
}
.detail-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-right: 2px white solid;
  color: white;
}
.wallet-container div:nth-child(4) {
  border: none;
}
/* 选项卡 */
.self-tab-item {
  height: 65px;
  border-bottom: 1px lightgray solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
}
.tab-icon {
  font-size: 25px;
  margin-right: 20px;
}
.tab-left {
  display: flex;
  align-items: center;
}
.self-info > p {
  margin-bottom: 0;
}
/* 底部 */
.self-bottom-item {
  background: white;
  height: 50px;
  border-bottom: 1px whitesmoke solid;
}
.self-bottom-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px lightgray solid;
}
.self-bottom {
  margin-top: 10px;
}
.self-bottom-item span {
  margin-left: 5px;
}
/* 侧边 */
.mui-off-canvas-right {
  background-color: whitesmoke;
}
.mui-table-view {
  background-color: whitesmoke;
  margin-top: 20px;
}
</style>

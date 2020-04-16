<template>
    <div>
        <!-- <Header>我的资料</Header> -->
         <div class="back-header">
          <span @click="$router.push('/selfcenter')" class="mui-icon mui-icon-arrowleft"></span>
          <span>
              我的资料
          </span>
        </div>
        <div class="com-container" v-if="userid">
            <div class="item avatar" @click="$router.push('/changeAvatar')">
                <span>头像</span>
                <div class="avatar-right-container">
                    <div class="avatarimg-container">
                        <img class="avatar-icon" :src="user.avatar"/>
                        <!-- <svg class="icon avatar-icon" aria-hidden="true">
                            <use :xlink:href="user.avatar"></use>
                        </svg> -->
                    </div>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <!-- <div class="item">
                <span>昵称</span>
                <div>
                    <span>{{user.username||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div> -->
            <div class="item" @click="$router.push('/changephone')">
                <span>电话号码</span>
                <div>
                    <span>{{user.userphone||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item"  @click="$router.push('/changeusername?username='+user.username)">
                <span>昵称</span>
                <div>
                    <span>{{user.username||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item" @click="$router.push('/changecardid?cardid='+user.cardid)" >
                <span>身份证号</span>
                <div>
                    <span>{{user.cardid||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
        </div>
         <div class="com-container" v-if="adminid">
            <div class="item avatar" @click="$router.push('/changeAvatar')">
                <span>头像</span>
                <div class="avatar-right-container">
                    <div class="avatarimg-container">
                        <!-- <img class="avatar-icon" :src="user.avatar"/> -->
                        <svg class="icon avatar-icon" aria-hidden="true">
                          <use xlink:href="#icon-user__easyico" />
                        </svg>
                    </div>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <!-- <div class="item">
                <span>昵称</span>
                <div>
                    <span>{{user.username||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div> -->
            <div class="item" @click="$router.push('/changephone')">
                <span>电话号码</span>
                <div>
                    <span>{{user.phone||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item"  @click="$router.push('/changeusername?username='+user.username)">
                <span>昵称</span>
                <div>
                    <span>{{user.adminname||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item" @click="$router.push('/changecardid?cardid='+user.cardid)" >
                <span>身份证号</span>
                <div>
                    <span>{{user.cardid||'填写'}}</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/LeftHeader'
export default {
  components: {
    Header
  },
  data () {
    return {
      root: process.env.API_HOST,
      user:{}
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    userid () {
      return this.$cookies.get('CUR_USERINFO').userid
    },
    adminid () {
      return this.$cookies.get('CUR_USERINFO').adminid
    }
  },
  methods: {
    init () {
      if (this.userid) {
        this.initUser(this.userid)
      } else {
        this.initAdmin(this.adminid)
      }
    },
    initUser (userid) {
      this.$ajax.post({
        url: this.root + 'user/selectByUserId',
        data: {userid}
      }).then(result => {
        if (result.status) {
          this.user = result.object
        }
      })
    },
    initAdmin (adminid) {
      this.$ajax.post({
        url: this.root + 'adminuser/selectByAdminId',
        data: {adminid}
      }).then(result => {
        if (result.status) {
          this.user = result.object
        }
      })
    }
  }
}
</script>

<style scoped>
    .avatarimg-container{
        height: 40px;
        width: 40px;
        
        margin-right: 10px;
    }
    .item{
        height: 50px;
        line-height: 50px;
        background: white;
        display: flex;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 5px;
    }
    .avatar-icon{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .avatar-right-container{
        display: flex;
        align-items: center;
    }
</style>

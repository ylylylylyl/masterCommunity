<template>
    <div class="detail-container">
        <Header>公告详情</Header>
        <div class="detail-content">
             <div class="publisher-info">
                <div class="info-item">
                     <svg class="icon notice-icon" aria-hidden="true">
                        <use xlink:href="#icon-tongzhigonggao" />
                    </svg>
                    <span class="item-span">{{announce.noticetitle}}</span>
                </div>
                <div class="info-item">
                    <span class="iconfont icon-yonghu1"></span>
                    <span class="item-span">{{announce.noticepusher}}</span>
                </div>
                <div class="info-item">
                    <span class="iconfont  icon-dizhi1"></span>
                    <span class="item-span">{{announce.addr}}</span>
                </div>

                 <div class="info-item">
                    <span class="iconfont icon-shijian1"></span>
                    <span class="item-span">{{announce.noticetime|format}}</span>
                </div>
            </div>
            <div class="publish-content">
                <span class="iconfont icon-neirongguanli"></span>
                <p class="publish-content-p">
                    {{announce.noticecontent}}
                </p>
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
      announce: {}
    }
  },
  computed: {
    noticeid () {
      return this.$route.query.noticeid
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const noticeid = this.noticeid
      this.$ajax.post({
        url: this.root + 'notice/selectnotice',
        data: {noticeid}
      })
        .then(res => {
          if (res.status) {
            this.announce = res.object
          }
        })
    }
  }
}
</script>
<style scoped>
.detail-container{
    background: whitesmoke;
    height: 100%;
}
.detail-content{
    padding-top: 40px;

}
.publisher-info{

    padding-top: 10px;
    background: white;
}
.info-item{
    height: 50px;
    line-height: 50px;
    padding-left: 5px;
    border-bottom: 1px rgb(240, 240, 240) solid;
    
}
.item-span{
    margin-left: 10px;
    font-size: 14px;
    color: gray;
}
.publish-content{
    margin-top: 10px;
}
.publish-content{
    background: white;
    height: 100%;
    padding: 15px;
    padding-left: 5px;
    display: flex;
}
.publish-content-p{
    margin-left: 10px;
    font-size: 16px;
    font-weight: 500;
    min-height: 100px;
    color: black;
}
</style>

<template>
    <div class="com-container">
        <BackHeader>缴费记录</BackHeader>
        <div class="records-content">
            <div class="records-content-item">
                <div class="item-title">
                    <span class="records-month">八月</span>
                    <span class="records-pay">支出￥69.82</span>
                </div>
                <div class="item-main">
                    <div class="item-records">
                        <div class="item-records-left">
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dianfei"></use>
                            </svg>
                            <div class="item-records-time">
                                <span>电费-我家</span>
                                <p>日常缴费</p>
                                <p>10-13 23:00</p>
                            </div>
                        </div>
                        <span class="item-records-right">-10.00</span>
                    </div>
                     <div class="item-records">
                        <div class="item-records-left">
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dianfei"></use>
                            </svg>
                            <div class="item-records-time">
                                <span>电费-我家</span>
                                <p>日常缴费</p>
                                <p>10-13 23:00</p>
                            </div>
                        </div>
                        <span class="item-records-right">-10.00</span>
                    </div>
                </div>
            </div>
              <div class="records-content-item">
                <div class="item-title">
                    <span class="records-month">八月</span>
                    <span class="records-pay">支出￥69.82</span>
                </div>
                <div class="item-main">
                    <div class="item-records">
                        <div class="item-records-left">
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dianfei"></use>
                            </svg>
                            <div class="item-records-time">
                                <span>电费-我家</span>
                                <p>日常缴费</p>
                                <p>10-13 23:00</p>
                            </div>
                        </div>
                        <span class="item-records-right">-10.00</span>
                    </div>
                    <div class="item-records">
                        <div class="item-records-left">
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dianfei"></use>
                            </svg>
                            <div class="item-records-time">
                                <span>电费-我家</span>
                                <p>日常缴费</p>
                                <p>10-13 23:00</p>
                            </div>
                        </div>
                        <span class="item-records-right">-10.00</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<style scoped>
    p{
        margin-bottom: 0px;
    }
    .header{
        background-color: white;
        display: flex;
        align-items: center;
    }
    /* 账单 */
    .records-month{
        display: inline-block;
        border: 1px lightgray solid;
        background: white;
        font-size:12px;
        border-radius: 10px;
        width: 50px;
        text-align: center;

    }
    .item-title{
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }
    .records-pay{
        color: gray;
    }

    .item-records{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        background: white;
        padding-right: 10px;
        border-bottom: 1px solid lightgray;
    }
    .item-records-left{
        display: flex;
        align-items: center;
    }
    .item-records-time{
        display: flex;
        flex-direction: column;
        justify-content:center;
    }
    .item-records-right{
        font-weight: bold;
        font-size: 16px;
    }
    .icon{
        font-size: 35px;
        margin-left: 10px;
        margin-right: 10px;
    }

</style>

<script>
import BackHeader from '../../components/LeftHeader'
export default {
  components: {
    BackHeader
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

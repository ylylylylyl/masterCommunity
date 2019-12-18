<template>
    <div class="detail-container">
        <Header>公告详情</Header>
        <div class="detail-content">
             <div class="publisher-info">
                <div class="info-item">
                     <svg class="icon notice-icon" aria-hidden="true">
                        <use xlink:href="#icon-tongzhigonggao" />
                    </svg>
                    <span class="item-span">关于停电的通知</span>
                </div>
                <div class="info-item">
                    <span class="iconfont icon-yonghu1"></span>
                    <span class="item-span">物业管理</span>
                </div>
                <div class="info-item">
                    <span class="iconfont  icon-dizhi1"></span>
                    <span class="item-span">XX小区</span>
                </div>

                 <div class="info-item">
                    <span class="iconfont icon-shijian1"></span>
                    <span class="item-span">2019-12-13 16:02</span>
                </div>
            </div>
            <div class="publish-content">
                <span class="iconfont icon-neirongguanli"></span>
                <p class="publish-content-p">
                    数组中正在处理的当前元素的索引。 如果提供了，则起始索引号为0，否则从索引1起始。
                    数组中正在处理的当前元素的索引。 如果提供了，则起始索引号为0，否则从索引1起始。
                    数组中正在处理的当前元素的索引。 如果提供了，则起始索引号为0，否则从索引1起始。
                    数组中正在处理的当前元素的索引。 如果提供了，则起始索引号为0，否则从索引1起始。
                    数组中正在处理的当前元素的索引。 如果提供了，则起始索引号为0，否则从索引1起始。
                    数组中正在处理的当前元素的索引。 如果提供了，则起始索引号为0，否则从索引1起始。
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
    font-size: 12px;
    font-weight: 500;
}
</style>

<template>
    <div>
       <header class="header">
           <span class="mui-icon mui-icon-arrowleft" @click="$router.go(-1)"></span>
           <span class="header-title">我的房屋</span>
           <p @click="$router.push('/bindhouse')">绑定房屋</p>
       </header>
       <div class="item-container">
           <div class="item">
               <div class="item-self">
                   <span>业主：海阔天空</span>
                   <span>18780566642</span>
               </div>
               <div>
                   <span>房号：1-123</span>
               </div>
               <div class="item-addr">
                   <span>住址：四川省成都市锦江区</span>
                   <span class="detail-span" @click="$router.push('/houseinfodet')">查看详情</span>
               </div>
           </div>
            <div class="item">
               <div class="item-self">
                   <span>业主：海阔天空</span>
                   <span>18780566642</span>
               </div>
               <div>
                   <span>房号：1-123</span>
               </div>
               <div class="item-addr">
                   <span>住址：四川省成都市锦江区</span>
                   <span class="detail-span">查看详情</span>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    components:{
        
    }
}
</script>
<style scoped>
    .header{
        display: flex;
        width: 100%;
        justify-content: space-between;
        background: white;
        padding-right: 5px;
    }
    .header-title{
        font-size: 16px;
        font-weight: bold;
    }
    .item-container{
        border-top: 1px lightgray solid;
        background: white;
    }
    .item{
        background: white;
        padding: 10px 5px 0px 5px;
        border-bottom: 5px whitesmoke solid;
    }
    .item-self,.item-addr{
        display: flex;
        justify-content: space-between;
        padding-right: 5px;
        margin-bottom: 10px;
    }
    .item-addr{
        margin-top: 10px;
    }
    .content-container{
        background: white;
    }
    .detail-span{
        color:#6e8b3d;
    }
</style>
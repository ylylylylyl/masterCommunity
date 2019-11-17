<template>
    <div class="com-container">
        <Header>报修记录</Header>
        <div class="records-main">
            <div class="div-container ">
                <div class="repair-status">
                    <span>流水号</span>
                    <span class="status-content">1878564582658</span>
                </div>
                <div class="repair-status">
                    <span>报修状态</span>
                    <span class="status-content">已处理</span>
                </div>
               <div class="repair-status">
                    <span>预约时间</span>
                    <span class="status-content">2019-11-16 </span>
                </div>
            </div>
        
            <div class="div-container repair-info">
                <div class="info-title">报修信息</div>
                <div class="info-content">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">其他</button>
                    <p class="info-des">水龙头坏了水龙头坏了水龙头坏了水龙头坏了水龙头坏了水龙头坏了水龙头坏了水龙头坏了水龙头坏了水龙头坏了</p>
                    <div class="info-img">
                        <img src="../../assets/image/1.jpg"/>
                    </div>
                    
                </div>
            </div>
            <div class="div-container repair-info">
                 <div class="info-title">接单人信息</div>
                 <div class="repair-status">
                    <span>联系人</span>
                    <span class="status-content">1878564582658</span>
                </div>
                <div class="repair-status">
                    <span>联系电话</span>
                    <span class="status-content">1878564582658</span>
                </div>
            </div>
            <div class="div-container repair-info">
                 <div class="info-title">发单人信息</div>
                 <div class="repair-status">
                    <span>联系人</span>
                    <span class="status-content">1878564582658</span>
                </div>
                <div class="repair-status">
                    <span>联系电话</span>
                    <span class="status-content">1878564582658</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../../components/LeftHeader'
export default {
    
    components:{
        Header
    }
}
</script>

<style scoped>
    .div-container{
        background: white;
        padding:0 10px 0 10px;
        margin-top: 8px;
    }
    .repair-status{
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
       
    }
    .status-content{
        color: #6E8B3D;
    }
    .info-title{
        height: 40px;
        border-bottom: 1px lightgray solid;
        display: flex;
        align-items: center;
        color: #6E8B3D;
        font-weight: bold;
    }
    .info-content{
        /* height: 150px; */
        background: white;
    }
    .mui-btn-outlined{
        margin-top: 10px;
    }
    .info-des{
        margin-top: 10px;
    }
    .info-img>img{
        width: 100%;
    }
    .info-img{
        display: flex;
        justify-content: center;
    }
    .com-container{
        margin-bottom: 80px;
    }
</style>
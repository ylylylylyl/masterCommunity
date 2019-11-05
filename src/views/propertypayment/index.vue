<template>
    <div>
         <div class="header">
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span>物业缴费</span>
        </div>
        <div class="address-container">
            <span class="address-span">安顺路181弄2号102室</span>
        </div>
    </div>
</template>
<style scoped>
    .header{
        background-color: white;
        display: flex;
        align-items: center;
    }
    .address-container{
        height: 60px;
        background: #6E8B3D;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
   
</style>
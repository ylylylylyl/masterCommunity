<template>
    <nav class="mui-bar mui-bar-tab">
            <router-link to="/#/home" class="mui-tab-item mui-active">
                <span class="mui-icon iconfont icon-shouye"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/#/community" class="mui-tab-item circle-container">
                <div class="circle">
                    <span class="mui-icon iconfont icon-shequxianxing"></span>
                </div>
                <span class="mui-icon"></span>
                <span class="mui-tab-label">社区</span> 
            </router-link>
            <router-link to="/#/selfcenter" class="mui-tab-item">
                <span class="mui-icon iconfont icon-wode"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
</template>

<script>
    export default {
        
    }
</script>
<style scoped>
    .circle{
        position: fixed;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #6E8B3D;
        left: 0;
        right: 0;
        bottom: 23px;
        margin: 0 auto;
        
    }
    .circle-container{
        position: relative;
    }
    .icon-shequxianxing{
        color: white;
        margin-top: 10px;
    }
</style>
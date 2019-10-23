<template>
    <nav class="mui-bar mui-bar-tab">
            <a @click="routerfuc(1)" class="mui-tab-item mui-active">
                <span class="mui-icon iconfont icon-shouye"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a  @click="routerfuc(2)" class="mui-tab-item circle-container">
                <div class="circle">
                    <span class="mui-icon iconfont icon-shequxianxing"></span>
                </div>
                <span class="mui-icon"></span>
                <span class="mui-tab-label">物业</span> 
            </a>
            <a @click="routerfuc(3)" class="mui-tab-item">
                <span class="mui-icon iconfont icon-wode"></span>
                <span class="mui-tab-label">我的</span>
            </a>
        </nav>
</template>

<script>
    export default {
        methods:{
            routerfuc(item){
                switch(item){
                    case 1:
                        this.$router.push('/home')
                    break
                    case 2:
                        this.$router.push('/community')
                    break
                    case 3:
                        this.$router.push('/selfcenter')
                    break
                }
                 
            }
        }
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
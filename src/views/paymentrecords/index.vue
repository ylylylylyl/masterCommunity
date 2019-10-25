<template>
    <div>
        <div class="header">
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span>缴费记录</span>
           
        </div>
        
    </div>
    
</template>
<style scoped>
    .header{
        background-color: white;
        display: flex;
        align-items: center;
    }
    
</style>

<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
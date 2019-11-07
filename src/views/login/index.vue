<template>
    <div class="l-bg">
        <div class="l-header">
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span class="l-text">登录</span>
        </div>
        <div class="mui-input-group">
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-person"></span>
                </label>
                <input v-model="name" type="text" class="mui-input-clear" placeholder="请输入手机号">
            </div>
            <div class="mui-input-row">
                <label>
                    <span class="mui-icon mui-icon-compose"></span>
                </label>
                <input v-model="pwd" type="password" class="mui-input-clear mui-input-password" placeholder="请输入密码">
            </div>
            
        </div>
        <div>
            <p class="regist-btn" @click="regist()">
                <span class="mui-icon mui-icon-help"></span>
            没有账号点击注册
            </p>
        </div>
    <button type="button" class="mui-btn mui-btn-outlined l-btn" @click="login()">登录</button>
    <button type="button" class="mui-btn mui-btn-outlined back-btn" @click="backtohome">返回主页</button>

    </div>
</template>
<style scoped>
    .l-bg{
        background: rgb(239,239,239);
        height: 100vh;
    }
    .l-header{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        justify-content: left;
        background: white;
        text-align: center;
    }
    .l-text{
        display: block;
        width: 100%;
        font-size: 18px;
    }
    .mui-input-group{
        margin-top: 20px;
    }
    .mui-input-row{
        height: 50px;
    }
    .mui-btn{
        width: 90%;
        margin-top: 40px;
        margin-left: 5%;
        height: 40px;
        background-color: #6E8B3D;
        color: white;
    }
    .regist-btn{
       display: flex;
       justify-content:flex-end;
       margin-right: 10px;
       margin-top: 10px;
    }
    .mui-input-clear{
        width: 85%;
    }
    .mui-input-row{
        color: lightgray;
    }
    .mui-icon-help{
        font-size: 16px;
        margin-right: 5px;
    }
    .regist-btn{
        color: #6E8B3D;
    }
    .back-btn{
        background: lightgrey;
    }
    
    .mui-input-row label{
        width: 15%;
    }

</style>

<script>
export default {
     mounted() {
        // 解决mui-input框不刷新无icon问题
        mui(".mui-input-row input").input();
    },
    data(){
        return {
            name:this.name,
            pwd:this.pwd
        }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        regist(){
            this.$router.push('/regist')
        },
        backtohome(){
            this.$router.push('/home')
        },
        login(){
            const root = process.env.API_HOST;
            console.log(root);
            const user = {
                name:this.name,
                pwd:this.pwd
            }
            this.$ajax.post({
                // http://localhost:8081/regist
                url:root+'user/regist',
                data:user,
                
            }).then(result=>{
                console.log(result)
                
            })
        }
    },
}
</script>
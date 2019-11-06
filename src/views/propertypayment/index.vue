<template>
    <div>
         <div class="header">
            <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
            <span>物业缴费</span>
        </div>
        <div class="address-container">
            <span class="address-span">安顺路181弄2号102室</span>
        </div>
        <div class="select-container">
            <span class="mui-icon mui-icon-arrowdown" v-show="!isopen"></span>
            <span class="mui-icon mui-icon-arrowup" v-show="isopen"></span>
			<select @click="handleChange" class="mui-h5" style="margin:auto; color:#000;">
				<option value="1">2019</option>
				<option value="2">2018</option>
				<option value="3">2017</option>
			</select>
        </div>
        <div class="payment-container">
            <div class="payment-item">
                    <div class="payment-item-date">
                        <span>2019年02月</span>
                        
                    </div>
                    <div class="payment-item-des">
                        <div>
                            <span>物业管理费</span>
                        </div>
                        <div class="item-des-pay">
                            <span>30.50</span>
                            <span>未支付</span>
                        </div>
                    </div>
            </div>
            <div class="payment-item">
                <div class="payment-item-date">
                    <span>2019年02月</span>
                    
                </div>
                <div class="payment-item-des">
                    <div>
                        <span>物业管理费</span>
                    </div>
                    <div class="item-des-pay">
                        <span>30.50</span>
                        <span>未支付</span>
                    </div>
                </div>
            </div>
            <div class="payment-item">
                <div class="payment-item-date">
                    <span>2019年02月</span>
                    
                </div>
                <div class="payment-item-des">
                    <div>
                        <span>物业管理费</span>
                    </div>
                    <div class="item-des-pay">
                        <span>30.50</span>
                        <span>未支付</span>
                    </div>
                </div>
            </div>
            <div class="payment-item">
                <div class="payment-item-date">
                    <span>2019年02月</span>
                    
                </div>
                <div class="payment-item-des">
                    <div>
                        <span>物业管理费</span>
                    </div>
                    <div class="item-des-pay">
                        <span>30.50</span>
                        <span>未支付</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="payment-footer">

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isopen:false
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        handleChange(){
            this.isopen = !this.isopen
        }
    }
}
</script>
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
    .mui-h5{
        text-align: center;
        text-align-last: center;
        border-bottom: 1px gray solid !important;

    }
    .select-container{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }
    .mui-icon-arrowdown,.mui-icon-arrowup{
        display: block;
        position: absolute;
        margin-left: 35px;
        font-size: 18px;

    }
    .payment-item{
        background: white;
         padding: 15px;
         margin-bottom: 15px;
    }
    .payment-item-date{
        height: 40px;
        display: flex;
        align-items: center;
        color: gray;
        
    }
    .payment-item-des{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
       
    }
    .item-des-pay{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .item-des-pay span:nth-child(1){
        font-size: 16px;
        font-weight: bold;
    }
    .item-des-pay span:nth-child(2){
        font-size: 12px;
        color: rgb(235, 130, 44)
    }
    .payment-container{
        padding-bottom: 50px;
    }
    .payment-footer{
        position: fixed;
        height: 50px;
        width: 100%;
        background: black;
        border-top: 1px black solid;
        bottom: 0px;
    }
   
</style>
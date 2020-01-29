<template>
    <div id="pay" data-disable-auto-close='true' class="box mui-popover mui-popover-action mui-popover-middle">
        <p class="title">请输入支付密码</p>
        <p class="type">日结钱包提现</p>
        <p class="number">¥1000.00</p>
        <p class="beizhu">额外扣除1.00服务费</p>
        <div class="table">
            <div><span class="blackpwd"></span></div>
            <div><span class="blackpwd"></span></div>
            <div><span class="blackpwd"></span></div>
            <div><span class="blackpwd"></span></div>
            <div><span class="blackpwd"></span></div>
            <div><span class="blackpwd"></span></div>
        </div>
        <input type="tel" name='password' class="zfinput" maxlength="6">
    </div>
</template>
<style scoped>
#pay {
    background-color: rgba(255, 255, 255, .99);
    position: fixed;
    top: 20%;
    height: 35%;
    width: 90%;
    margin-left: 5%;
    text-align: center;
    display: flex;
    justify-content: center;
}
#pay .mui-popover-close {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 5px;
    left: 5px;
}
#pay .title {
    display: inline-block;
    margin-top: 8px;
    font-size: 20px;
}

.number {
    color: black;
    font-size: 18px;
    font-weight: bold;
}

.type {
    margin-top: 20px;
}

.number {
    margin-bottom: 20px;
}

.zfinput {
    opacity: 0;
    z-index: 2;
    position: relative;
    top: -50px;
}

.table {
    margin-top: 30px;
    display: inline-block;
    height: 40px;
    display: flex;
    justify-content: center;
}

.table>div {
    text-align: center;
    line-height: 40px;
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(187, 187, 187, .99);
    border-right: none;
}

.table>div:last-child {
    border-right: 1px solid rgba(187, 187, 187, .99);
}

#pay input[type='number'] {
    width: 68%;
    margin: 0;
    padding: 0;
    height: 50px;
}

.blackpwd {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
    opacity: 0;
}

</style>

<script>
export default {
 
}
</script>
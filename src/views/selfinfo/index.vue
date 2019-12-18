<template>
    <div>
        <Header>我的资料</Header>
        <div class="com-container">
            <div class="item avatar">
                <span>头像</span>
                <div class="avatar-right-container">
                    <div class="avatarimg-container">
                        <svg class="icon avatar-icon" aria-hidden="true">
                            <use xlink:href="#icon-user__easyico"></use>
                        </svg>
                    </div>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item">
                <span>昵称</span>
                <div>
                    <span>海阔天空</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item">
                <span>电话号码</span>
                <div>
                    <span>1546984598</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item">
                <span>真实姓名</span>
                <div>
                    <span>小张</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
            </div>
            <div class="item">
                <span>身份证号</span>
                <div>
                    <span>513021199723237890</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </div>
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
    .avatarimg-container{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .item{
        height: 50px;
        line-height: 50px;
        background: white;
        display: flex;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 5px;
    }
    .avatar-icon{
        width: 100%;
        height: 100%;
    }
    .avatar-right-container{
        display: flex;
        align-items: center;
    }
</style>

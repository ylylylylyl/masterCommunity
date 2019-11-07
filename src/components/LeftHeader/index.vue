<template>
  <div class="back-header">
    <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
    <span>
        <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
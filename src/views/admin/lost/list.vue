<template>
    <div class="content-container">
        <Header>失物记录</Header>
        <LostThing></LostThing>
    </div>
</template>
<script>
import Header from '../../../components/LeftHeader'
import LostThing from '../../../components/Community/lostthing'
export default {
  components:{Header,LostThing},
  methods: {
    
  }
}
</script>
<style scoped>
.mui-control-content{
    padding-top: 40px;
    display: block;
}
</style>
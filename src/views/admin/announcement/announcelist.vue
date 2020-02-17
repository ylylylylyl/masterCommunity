<template>
    <div class="content-container">
        <Header>公告列表</Header>
        <Announce class="announce"></Announce>
    </div>
</template>
<script>
import Header from '../../../components/LeftHeader'
import Announce from '../../../components/Community/announce'
export default {
  components: {
    Header, Announce
  }
}
</script>
<style scoped>
.content-container{
    background: whitesmoke;
}
.mui-control-content{
    display: block !important;
}
.announce{
    padding-top: 40px;
}
</style>

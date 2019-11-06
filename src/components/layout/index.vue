<template>
  <div class="body">

    <div class="content-container">
      <router-view></router-view>
    </div>

    <NavBar  v-show="$route.name!=='propertypayment'">

    </NavBar>
  </div>

</template>
<script>
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
export default {
  components:{
    NavBar,
    Header
  }
}
</script>



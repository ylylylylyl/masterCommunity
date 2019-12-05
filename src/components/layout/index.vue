<template>
  <div class="body">

    <div class="content-container" >
      <router-view></router-view>
    </div>

    <NavBar  v-show="$route.name!=='propertypayment'">

    </NavBar>
  </div>

</template>
<script>
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import { mapGetters, mapActions } from "vuex";
export default {
  components:{
    NavBar,
    Header
  },
  created(){
      this.setCurCity()
  },
  methods:{
     ...mapActions(["setCurCity"]),
  }
}
</script>



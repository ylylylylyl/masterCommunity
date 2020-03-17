<template>
  <div class="body">
    <div class="content-container" >
      <!-- <transition name="transitionRouter"> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- </transition> -->
    </div>
    <NavBar  v-show="$route.name!=='propertypayment'">
    </NavBar>
  </div>

</template>
<style scoped>
  .transitionRouter-enter-active,
  .transitionRouter-leave-active {
      transition: all 0.4s;
  }

  .transitionRouter-enter,
  .transitionRouter-leave{
      transform: translate3d(100%, 0, 0);
  }
</style>
<script>
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    NavBar,
    Header
  },
  created () {
    this.setCurCity(),
    this.setVillage()
  },
  methods: {
    ...mapActions(['setCurCity', 'setVillage'])
  }
}
</script>

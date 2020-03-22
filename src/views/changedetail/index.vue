<template>
    <div class="content-container">
        <Header>零钱明细</Header>
        <Nothing v-if="!changes.length"></Nothing>
        <div class="change-container">
            <div class="item" v-for="item in changes" :key="item.changeid">
                <div class="item-top">
                  <span>{{item.changetitle}}</span>
                  <span :class="item.type|changeclass">{{item.type|changetype}}{{item.changemoney}}</span>
                </div>
                <span class="item-time">{{item.changedate|format}}</span>
            </div>
        </div>
    </div>
    
</template>
<script>
import Header from '../../components/LeftHeader'
import Nothing from '../../components/nothing'
export default {
  components: {
    Header,Nothing
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      root: process.env.API_HOST,
      changes: []
    }
  },
  methods: {
    init () {
      const {userid} = this.$cookies.get('CUR_USERINFO')
      this.$ajax.post({
        url: this.root + 'change/selectChange',
        data: {userid}
      })
        .then(res => {
          if (res.status) {
            this.changes = res.result
          }
        })
    }
  },
  filters: {
    changetype (type) {
      switch (type) {
        case 1:
          return '-'
        case 2:
          return '+'
      }
    },
    changeclass (type) {
      switch (type) {
        case 1:
          return 'yellow'
        case 2:
          return ''
      }
    }
  }
}
</script>
<style scoped>
.content-container {
  background-color: whitesmoke;
}
.change-container {
    padding-top: 40px;
   
}
.item {
    padding: 10px;
    background: white;
    border-bottom: 1px solid lightgrey;
}
.item-top{
    display: flex;
    justify-content: space-between;
    
}
.item-top>span{
    font-size: 16px;
}
.item-time {
    display: block;
    margin-top: 10px;
    color: gray;
}
.yellow{
    color: darkgoldenrod;
    font-weight: bold;
}
</style>
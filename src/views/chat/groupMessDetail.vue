<template>
    <aside id="offCanvasSide" class="mui-off-canvas-right">
        <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <div class="title">群组信息</div>
            <div class="content">
              <span class="android-only"></span>
              <p style="margin: 10px 15px;">
                <button
                  id="offCanvasHide"
                  type="button"
                  class="mui-btn mui-btn-danger mui-btn-block"
                  style="padding: 5px 20px;"
                >关闭</button>
                <button
                  id="offCanvasHide"
                  type="button"
                  class="mui-btn mui-btn-danger mui-btn-block"
                  style="padding: 5px 20px;"
                >添加成员+</button>
              </p>
            </div>
            <div class="title" style="margin-bottom: 25px;">
                <span>成员</span>
                <span class=""></span>
            </div>
            <ul
                class="mui-table-view mui-table-view-chevron mui-table-view-inverted"
                v-for="(item,index) in groupinfoList.members.filter((i)=>{if(!i.owner){return i}})"
            >
              <li class="mui-table-view-cell">
                <a class="mui-navigate-right">{{item.member}}</a>
              </li>
            </ul>
             <div class="title" style="margin-bottom: 25px;">
                <span>群主</span>
            </div>
            <ul
                class="mui-table-view mui-table-view-chevron mui-table-view-inverted"
            >
              <li class="mui-table-view-cell">
                <a class="mui-navigate-right">{{groupinfoList.admin}}</a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
</template>
<script>
export default {
  mounted () {
    console.log(this.groupinfoList)
  },
  computed: {
    groupinfoList () {
      return this.$store.state.group.groupInfo
    }
  }
}
</script>
<style scoped>
.mui-off-canvas-right{
    z-index: 999;
}
.mui-scroll{
    margin-top: 40px;
}
.title {
  margin: 35px 15px 10px;
  text-align: center;
}
.title + .content {
  margin: 10px 15px 35px;
  color: #bbb;
  text-indent: 1em;
  font-size: 14px;
  line-height: 24px;
}
</style>
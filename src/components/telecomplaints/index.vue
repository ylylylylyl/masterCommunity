<template>
  <div id="picture" class="mui-popover mui-popover-action">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a href="tel:023-25678945">拨打投诉电话</a>
      </li>
    </ul>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a href="#picture">
          <b>取消</b>
        </a>
      </li>
    </ul>
  </div>
</template>
<style scoped>

    .mui-popover-action{
        position: fixed;
        bottom: 0;
        z-index: 100;
        background: #ebebeb;
        height: 120px;

    }

</style>
<script>
export default {
  mounted () {
    // mui("#picture").on("tap", "li>a", function() {
    //   mui.alert('你刚点击了"' + this.innerHTML + '"按钮');
    //   //  mui("#picture").popover('toggle');//这是可以用来关闭底部弹窗的事件
    // });
  }
}
</script>

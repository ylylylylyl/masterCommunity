<template>
     <aside id="offCanvasSide" class="mui-off-canvas-right">
      <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
        <svg class="icon icon-ziyuan" aria-hidden="true">
            <use xlink:href="#icon-ziyuan" />
        </svg>
        <span class="tongyong">通用设置</span>
        <div class="mui-scroll">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <svg class="icon icon-ziyuan" aria-hidden="true">
                    <use xlink:href="#icon-xiugaimima" />
                </svg>
              <a class="mui-navigate-right">修改密码</a>
            </li>
            <li class="mui-table-view-cell">
                <svg class="icon icon-ziyuan" aria-hidden="true">
                    <use xlink:href="#icon-bangdingyinhangqia" />
                </svg>
              <a class="mui-navigate-right">绑定银行卡</a>
            </li>
            <li class="mui-table-view-cell">
                <svg class="icon icon-ziyuan" aria-hidden="true">
                    <use xlink:href="#icon-tuichudenglu" />
                </svg>
              <a class="mui-navigate-right">退出登录</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
</template>
<style scoped>
    .tongyong{
        font-weight: bold;
        font-size:16px;

    }
    .mui-scroll-wrapper{
        margin: 10px;

    }
    .mui-scroll{
        margin-top: 10px;
    }
    .icon-ziyuan{
        font-size:16px;

    }
    .icon{
        margin-right: 5px;
    }
    .mui-table-view-cell{
        display: flex;
        align-items: center;
        height: 45px;
    }
</style>


<template>
    <div class="comm-container">
        <Header>
            <span class="comm-name">服务</span>
        </Header>
        <div class="main-content">
            <div class="mui-content mui-row mui-fullscreen">
                <div class="mui-col-xs-3">
                    <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
                        <a class="mui-control-item mui-active" href="#content1" data-index='0'>物业缴费</a>
                        <a class="mui-control-item" href="#content2" data-index='1'>社区公告</a>
                        <a class="mui-control-item" href="#content3" data-index='2'>失物招领</a>
                        <a class="mui-control-item" href="#content4" data-index='3'>便民服务</a>
                    </div>
                </div>
                <div id="segmentedControlContents" class="mui-col-xs-9" style="border-left: 1px solid #c8c7cc;">
                   <div id="content1" class="mui-control-content mui-active">
                       <div class="mui-card">
						<!--页眉，放置标题-->
						<div class="mui-card-header">物业缴费</div>
						<!--内容区-->
						<div class="mui-card-content">
							<div class="card-item">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-home"></use>
								</svg>
								<span>房屋信息</span>
							</div>
							<div class="card-item">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-techreport-"></use>
								</svg>
								<span>缴费记录</span>
							</div>
						</div>
					</div>
                </div>
				<div id="content2" class="mui-control-content">
					<div class="mui-card">
						<!--页眉，放置标题-->
						<div class="mui-card-header">
							<div>
								<svg class="icon notice-icon" aria-hidden="true">
									<use xlink:href="#icon-tongzhigonggao"></use>
								</svg>
								<span>关于停电的通知</span>
							</div>
							<span class="mui-icon mui-icon-arrowright"></span>
						</div>
						<!--内容区-->
						<div class="mui-card-content">
							<div class="notice-footer">
								<p>物业通知</p>
								<p>2019.08.08 16:04:30</p>
							</div>
							
						</div>
					</div>	
					<div class="mui-card">
						<!--页眉，放置标题-->
						<div class="mui-card-header">
							<div>
								<svg class="icon notice-icon" aria-hidden="true">
									<use xlink:href="#icon-tongzhigonggao"></use>
								</svg>
								<span>关于停电的通知</span>
							</div>
							<span class="mui-icon mui-icon-arrowright"></span>
						</div>
						<!--内容区-->
						<div class="mui-card-content">
							<div class="notice-footer">
								<p>物业通知</p>
								<p>2019.08.08 16:04:30</p>
							</div>
							
						</div>
					</div>
					<div class="mui-card">
						<!--页眉，放置标题-->
						<div class="mui-card-header">
							<div>
								<svg class="icon notice-icon" aria-hidden="true">
									<use xlink:href="#icon-tongzhigonggao"></use>
								</svg>
								<span>关于停电的通知</span>
							</div>
							<span class="mui-icon mui-icon-arrowright"></span>
						</div>
						<!--内容区-->
						<div class="mui-card-content">
							<div class="notice-footer">
								<p>物业通知</p>
								<p>2019.08.08 16:04:30</p>
							</div>
							
						</div>
					</div>
				</div>
				<div id="content3" class="mui-control-content">
					<div class="mui-card">
						<!--页眉，放置标题-->
						<div class="mui-card-header">
							<div>
								<svg class="icon lost-icon" aria-hidden="true">
									<use xlink:href="#icon-dibudaohanglan-"></use>
								</svg>
								<span>零钱若干</span>
							</div>
							
						</div>
						<!--内容区-->
						<div class="mui-card-content content3-card">
							<div class="lost-item">
								<span>遗失地点：</span>
								<p>七号楼一单元门口</p>
							</div>
							<div class="lost-item"> 
								<span>遗失时间：</span>
								<p>2019.06.06</p>
							</div>
							<div class="lost-item"> 
								<span>遗失详情：</span>
								<p>里面有许多零钱</p>
							</div>
							<div class="lost-item"> 
								<span>领取地址：</span>
								<p>物业处三楼</p>
							</div>
							<div class="lost-item"> 
								<span>遗失状态：</span>
								<p>待领取</p>
							</div>
						</div>
					</div>	
					<div class="mui-card">
						<!--页眉，放置标题-->
						<div class="mui-card-header">
							<div>
								<svg class="icon lost-icon" aria-hidden="true">
									<use xlink:href="#icon-dibudaohanglan-"></use>
								</svg>
								<span>零钱若干</span>
							</div>
							
						</div>
						<!--内容区-->
						<div class="mui-card-content content3-card">
							<div class="lost-item">
								<span>遗失地点：</span>
								<p>七号楼一单元门口</p>
							</div>
							<div class="lost-item"> 
								<span>遗失时间：</span>
								<p>2019.06.06</p>
							</div>
							<div class="lost-item"> 
								<span>遗失详情：</span>
								<p>里面有许多零钱</p>
							</div>
							<div class="lost-item"> 
								<span>领取地址：</span>
								<p>物业处三楼</p>
							</div>
							<div class="lost-item"> 
								<span>遗失状态：</span>
								<p>待领取</p>
							</div>
						</div>
					</div>
				</div>
                    <div id="content4" class="mui-control-content">
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell">第3个选项卡子项-0</li>
                            <li class="mui-table-view-cell">第3个选项卡子项-1</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

   

</template>



<style scoped>
    .comm-container{
        background-color: white;
        
    }
    .main-content{
		padding-top: 40px;
		padding-bottom: 50px;
		height: 100vh;
		
	}
	.mui-content{
			padding-bottom: 50px;
	}
    .mui-content{
        padding-top: 40px;
	}
	.mui-col-xs-3{
		background: whitesmoke;

	}
	.mui-col-xs-9{
		background-color: white;
		border-left: none !important;
	}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical .mui-control-item.mui-active{
	color: #6E8B3D ;
	font-weight: bold;
	border-bottom: none ;
}
.mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical .mui-control-item{
	border-bottom: none;
}
.icon{
	font-size: 40px;
}
.card-item{
	display: flex;
	flex-direction: column;
	margin-right: 20px
}
.mui-card-content{
	display: flex;
	padding: 15px;
}
/* 公告 */
.notice-footer{
	display: flex;
}
.notice-footer>p{
	margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 15px;
}
.notice{
	margin: 5px;
	border-bottom: 5px whitesmoke solid;
	height: 110px;
}
.notice-icon{
	font-size: 25px;
}
/* 失物招领 */
.lost-item{
	display: flex;
}
.content3-card{
	display: flex;
	flex-direction: column;
}
.lost-icon{
	color: #6E8B3D;
	font-weight: bold;
	font-size: 25px;
	margin-right: 5px;
}
    
</style>
<script>
import Header from '../../components/Header'
    export default {
        components:{
            Header
        },
           
    }
</script>
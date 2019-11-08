<template>
    <div>
        <div class="back-header">
            <div>
                <span @click="goback()" class="mui-icon mui-icon-arrowleft"></span>
                <span>
                    我要报修
                </span>
            </div>
           <span class="records-span">报修记录</span>
        </div>
        <div class="repair-container">
			<button id='type-btn' class="btn mui-btn mui-btn-block" @click="initRepair()">
				<div>
					<span class="iconfont icon-leixing"></span>
					<span>维修类型</span>
				</div>
				
				<div>
					<span id="type-result">点击选择</span>
					<span class="mui-icon mui-icon-arrowright"></span>
				</div>
			</button>
			<button   id='type-btn' class="btn mui-btn mui-btn-block" @click="initDate()">
				<div>
					<span class="iconfont icon-shijian"></span>
					<span>预约时间</span>
				</div>
				
				<div>
					<span id="date-result">点击选择</span>
					<span class="mui-icon mui-icon-arrowright"></span>
				</div>
			</button>
			<button  class="btn mui-btn mui-btn-block">
				<div>
					<span class="iconfont icon-fangjian"></span>
					<span>房间选择</span>
				</div>
					
					<span class="room-span">1-101</span>
			</button>
			<div class="repair-user-container">
				<div class="repair-user">
					<span class="iconfont icon-lianxiren"></span>
					<span class="repair-user-title">联系人</span>
					<input type="text" class="mui-input-clear" placeholder="请输入联系人">
				</div>
				<div class="repair-user">
					<span class="iconfont icon-lianxidianhua"></span>
					<span class="repair-user-title">联系电话</span>
					<input type="text" class="mui-input-clear" placeholder="请输入联系电话">
				</div>
			</div>
			<div class="problem-container">
				<div class="problem-container-title">
					<span class="iconfont icon-asterisks-1-copy"></span>
					<span>请描述您遇到的问题</span>
				</div>
				<textarea type="textarea" rows="5" class="mui-input-speech" placeholder="请输入内容"/>
			</div>
			<div class="submit-container">
				<button type="button" class="mui-btn submit-btn ">确认提交</button>
			</div>
			
        </div>
    </div>
</template>
<script>

export default {
	data(){
		return{
			typedata:[
				{value:1,text:"消防"},
				{value:2,text:"照明"},
				{value:3,text:'暖气'},
				{value:4,text:'马桶'},
				{value:5,text:'桌椅'},
				{value:6,text:'其他'}
			]
		}
	},
   mounted(){
    //    this.initRepair()
   },
   methods:{
       initRepair(){
            var picker = new mui.PopPicker();
            picker.setData(this.typedata);
            var showUserPickerButton = document.getElementById('type-btn');
					var userResult = document.getElementById('type-result');
					// showUserPickerButton.addEventListener('tap', function(event) {
						picker.show(function(items) {
							userResult.innerText = items[0].text;
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					// }, false);
	   },
	   initDate(){
		   var d = new Date()
		   d.setMonth(d.getMonth()+1)
		   console.log(d)
			var dtPicker = new mui.DtPicker({  
				
				beginDate: new Date(),//设置开始日期   
				endDate: new Date(d),//设置结束日期      
		 
			}); 
			dtPicker.show(function (selectItems) { 
				// console.log(selectItems.y);//结果为：{text: "2016",value: 2016} 
				// console.log(selectItems.m);//结果为：{text: "05",value: "05"}
				// console.log(selectItems.d.text);//11
				// console.log(selectItems.h.text);//09
				// console.log(selectItems.i.text);//09
				// console.log(selectItems.text);//结果为：2016-10-11 09:09
				document.getElementById('date-result').innerText = selectItems.text
				dtPicker.dispose();//关闭日期控件，释放资源。
    });	
},
	   goback(){
		   this.$router.go(-1)
	   }
   }
}
</script>
<style  scoped>
    .back-header{
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
        
    }
    .records-span{
        color: #6E8B3D;
        font-size: 14px;
        font-weight: 700;
    }
    .mui-btn-block{
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
		border: none;
		border-bottom: 1px whitesmoke solid;
		margin-bottom: 0;
	}

    .repair-container{
        margin-top: 15px;
    }
    .mui-icon-arrowright{
        font-size: 16px;
	}
	.room-span{
		display: block;
		padding-right: 10px;
	}
	.repair-user{
		height: 40px;
		background: white;
		display: flex;
		align-items: center;
		padding: 5px;
	}
	.repair-user-container{
		margin-top: 10px;
		
	}
	.mui-input-clear{
		height: 40px;
		margin-bottom: 0;
		width: auto;
		border:none;
		font-size: 14px;
	}
	.repair-user-title{
		display: block;
		width: 60px;
	}
	.problem-container{
		margin-top: 10px;
		
		width: 100%;
	}
	.problem-container-title{
		display: flex;
		align-items: center;
		padding: 5px;
		height: 40px;
		background: white;
		width: 100%;
	}
	.iconfont{
		color: #6E8B3D;	
		font-weight: bold;
		margin-right: 5px;
	}
	.icon-asterisks-1-copy{
		font-size: 12px;
		color:red;
		margin-right: 5px;
	}
	.mui-input-speech{
		width: 100%;
		border: none;
	}
	.submit-container{
		display: flex;
		justify-content: center;
	}
	.submit-btn{
		background: #6E8B3D;
		color: white;
		width: 250px;
		border-radius: 20px;
		height: 40px;
	}
</style>
<template>
	<view>
		<uni-popup ref="popup" type="bottom">
		    <view class="pBoxUp">			
		        <view class="textCenter f32 psTitle border-bottom">
		            请选择配送时间
		        </view>
		        <view class="shopPopup bgff justify-between default-flex">
		            <view class="f30 t666 lBox">
		                <view v-for="(item,index) in jmhDay" @click="selectLDate(item)" :class="sLDate==item.formatDate?'ed':''" class="boxLDate" 
		                    :key="index">{{item.desc}}({{item.name}})
		                </view>
		            </view>
		            <view class="box-right">
		                <view v-for="(item,index) in timeList" @click="selectRDate(item)" 
		                    :class="[sRightDate==item.time?'ed':'',item.disabled?'disabled':'']" :key="index" class="rBox"
		                    >
		                    {{item.time}}{{item.disabled?' (超出配送时间)':''}}
		                </view>
		                <view class="empty f28 text-center" style="color: #999;margin-top: 40rpx;" 
		                v-if="timeList.length<1">
		                    今天没有时间了,看看明天吧
		                </view>	
		            </view>
		        </view>
		        <view class="cancelButton" @click="closePopup()">
		            取消
		        </view>	
		    </view>	 
		</uni-popup>
	</view>
</template>

<script setup>
	import { getDate } from '@/utils/utils.js'
	import { ref } from 'vue'
	const emits = defineEmits(['update:modelValue'])
	let sendTime = ref('')
	let	sRightDate = ref('')
	let	sLDate = ref('')
	let jmhDay = ref([])
	let timeList= ref([
		{disabled:false,time:'10:30-11:30', id:1 },
		{disabled:false,time:'11:30-12:30', id:2 },
		{disabled:false,time:'12:30-13:30', id:3 },
		{disabled:false,time:'13:30-14:30',id:4},
		{disabled:false,time:'14:30-15:30',id:5},
		{disabled:false,time:'15:30-16:30',id:6},
		{disabled:false,time:'16:30-17:30',id:7},
		{disabled:false,time:'17:30-18:30',id:8},
		{disabled:false,time:'18:30-19:30',id:9},
		{disabled:false,time:'19:30-20:30',id:10},
		{disabled:false,time:'20:30-21:30',id:11},
		{disabled:false,time:'21:30-22:30',id:12},
		{disabled:false,time:'22:30-23:30',id:13},
	])
	const popup = ref(null);    
	// 方法  
	function closePopup() {  
	    if (popup.value && popup.value.close) {  
			popup.value.close();  
	    }  
	}  
	
	function getWeekDate(day) {  
		let weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"); 
		let week = weeks[day]; 
		return week;
	}  
	  
	function getNextDay() {  
		let day=getWeekDate(new Date().getDay());
		let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(new Date()) 
		let isDay=getDate().fullDate; 
		// console.log(isDay)
		let nextDay= getWeekDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDay());
		let nDate=getDate(new Date(new Date().getTime()+ 24 * 60 * 60 * 1000)).fullDate;
		// console.log(nDate);
		let HDay=getWeekDate(new Date(new Date().getTime() + 48 * 60 * 60 * 1000).getDay());
		let hDate=getDate(new Date(new Date().getTime()+ 48 * 60 * 60 * 1000)).fullDate; 
		let d1=hDate.substr(hDate.indexOf('-')+1)   
		sLDate.value=isDay;
		selectLDate(1);
		jmhDay.value=[
			{name:day,id:1,formatDate:isDay,desc:'今天'},
			{name:nextDay,id:2,formatDate:nDate,desc:'明天'},
			{name:HDay,id:3,formatDate:hDate,desc:d1.substr(0,d1.indexOf('-'))+'月'+d1.substr(d1.indexOf('-')+1)+'日'}] 
	}  
	  
	function showBox() {  
	    popup.value.open(); 
	}  
	defineExpose({
		showBox,
		getNextDay
	})  
	function selectRDate(item) {  
		// ... 逻辑不变，但使用 ref 的值 
		if(item.disabled){
			return
		}
		// console.log(parseInt(item.time.split('-')[1]) -new Date().getHours())
		// console.log(sLDate.value,getDate().fullDate)
		if(parseInt(item.time.split('-')[1]) - new Date().getHours() === 1 && sLDate.value === getDate().fullDate){
			sendTime.value = '立即送出'
		}else{
			sendTime.value = sLDate.value + " " + item.time;
		}  
	    closePopup();
		// console.log(sendTime.value)
	    emits('update:modelValue', sendTime.value);  
	}  
		
	function selectLDate(val) {  
		// ... 逻辑  
		function changeDisable(list,n){
			let i = n - 10
			list = list.map(item=>{
				if(item.id <=i){
					item.disabled = true
				}
				return item
			})
			return list
		}
		if(val!=1){
			sLDate.value=val.formatDate;
		}
		let t= [
			{disabled:false,time:'10:30-11:30', id:1 },
			{disabled:false,time:'11:30-12:30', id:2 },
			{disabled:false,time:'12:30-13:30', id:3 },
			{disabled:false,time:'13:30-14:30',id:4},
			{disabled:false,time:'14:30-15:30',id:5},
			{disabled:false,time:'15:30-16:30',id:6},
			{disabled:false,time:'16:30-17:30',id:7},
			{disabled:false,time:'17:30-18:30',id:8},
			{disabled:false,time:'18:30-19:30',id:9},
			{disabled:false,time:'19:30-20:30',id:10},
			{disabled:false,time:'20:30-21:30',id:11},
			{disabled:false,time:'21:30-22:30',id:12},
			{disabled:false,time:'22:30-23:30',id:13},
		]
		if(val.desc=='今天'||val==1){ 
			if(new Date().getHours() < 11){
				timeList.value = t
			}else{
				timeList.value = changeDisable(t,new Date().getHours())
			}
			// console.log('最终的时间列表');
			// console.log(timeList.value);
		}else{ 
			timeList.value=t;
		} 
		sRightDate.value='';
	} 
	  
</script>

<style lang="scss" scoped>
	 .pBoxUp{
		background: #f5f5f5;
		.psTitle{
			line-height: 100rpx; 
			text-align: center;
			border-bottom: 1rpx solid #f7f7f7;
		}
		.shopPopup{
			backgound:#ffffff;
			font-size: 32rpx;
			display: flex;
			justify-content: space-between;
		}
		.boxLDate{
			
			font-size: 24rpx;
			height:80rpx;
			line-height: 80rpx;
			width:273rpx;
			text-align: center;
		}
		.box-right{
			max-height: 500rpx;
			overflow-y: scroll;
			overflow-x: hidden;
		}
		.lBox{
			color:#666666;
			background: #f5f5f5;
			font-size: 30rpx;
		}
		.boxLDate.ed{
			color:#1296db;
			background: #fff;
		}
		.rBox.ed{
			color:#1296db;
		}
		.rBox{
			width: 239px;
			padding-left: 20rpx;
			font-size: 24rpx;
			color: #333;
			height:80rpx;
			background: #fff;
			line-height: 80rpx;
			
		}
		.cancelButton{
			font-size: 36rpx;
			color: #999;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx; 
			border-top: 1px solid #e5e5e5;
			background: #FFF;
		}
	}

</style>
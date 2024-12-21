<template>
	<view class="order-detail">
		<custom-nav-bar>
			<template #tab>
				<view class="goBack" @click="goBack">
					<uni-icons type="left" color="white"></uni-icons>
				</view>
			</template>
		</custom-nav-bar>
		<view class="status" @click="showStatus()">
			{{status}} >
		</view>
		<uni-popup ref="statusPoup" type="bottom">
			<view class="status-popup">
				<view class="title">
					订单跟踪
				</view>
				<cc-defineStep :colors="colors" :stepData="stepList"></cc-defineStep>
			</view>
		</uni-popup>
		<!-- {{shopCovers[0].latitude}} -->
		<view class="map" v-show="showObj.status === 'untake' || showObj.status === 'delivery'">
			<map name="" 
				style="width: 100%; height: 100%;" 
				:latitude="shopCovers[0].latitude" 
				:longitude="shopCovers[0].longitude" 
				:markers="shopCovers"
				></map>
		</view>
		<view class="order-button">
			<button v-if="showObj.status !== 'finish' && showObj.status !== 'evaluate' && showObj.status !== 'cancel'" @click="cancelOrder(showObj.id)">取消订单</button>
			<button v-if = "showObj.status === 'finish' || showObj.status === 'evaluate' || showObj.status === 'cancel'" @click="deleteOrder">删除订单</button>
			<button @click="callShop(showObj.shopInfo.phone)">联系商家</button>
			<button v-if="showObj.status === 'evaluate'" @click="gotoComment">去评价</button>
			<button v-if="showObj.status === 'unpay'" @click="openPayPopup">继续支付</button>
		</view>
		<view class="buyInfo">
			<view class="shop">
				{{showObj.shopName}}
			</view>
			<view class="commodity" v-for="item in showObj.commodity" :key="item.comid">
				<view class="">
					<img :src="item.imgUrl" alt="" class="com-img"/>
				</view>
				<view class="">
					<view class="com-name">
						{{item.name}}
					</view>
					<view class="com-specs">
						<view class="" v-for="(it,index) in item.specsList" :key="index">
							{{it}}
						</view>
					</view>
					<view class="com-specs">
						x{{item.num}}
					</view>
				</view>
				<view class="com-price">
					￥{{item.price * item.num}}
				</view>
			</view>
			<view class="coupon">
				<view class="">
					打包费
				</view>
				<view class="">
					￥<view class="price">
						{{(showObj.shopInfo?.packPrice ?? 0)}}
					</view>
				</view>
			</view>
			<view class="coupon">
				<view class="">
					优惠卷
				</view>
				<view class="">
					-￥<view class="price">
						{{showObj.coupon?.value}}
					</view>
				</view>
			</view>
			<view class="allPrice">
				以优惠￥<view class="price">
					{{showObj.coupon?.value}}
				</view>  合计 ￥{{ showObj.commodity?.reduce((a,b)=>{return a+b.price * b.num},0) + (showObj.shopInfo?.packPrice ?? 0) - showObj.coupon?.value}}
			</view>
		</view>
		<view class="other-info">
			<view class="info-item">
				<view class="item-left">
					期望送达时间
				</view>
				<view class="">
					{{showObj.sendTime}}
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					配送地址
				</view>
				<view class="item-right">
					<view class="">
						{{showObj.address}}
					</view>
					<view class="">
						{{showObj.consignee}}  - {{showObj.phone?.slice(0,2)}}*****{{showObj.phone?.slice(7,11)}}
					</view>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					订单号码
				</view>
				<view class="">
					2901 4301 4213 1232 13
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					下单时间
				</view>
				<view class="">
					{{showObj.createTime}}
				</view>
			</view>
			<view class="info-item" v-show="showObj.status !== 'unpay'">
				<view class="item-left">
					支付方式
				</view>
				<view class="">
					{{showObj.payType}}
				</view>
			</view>
		</view>
		<pay-popup 
			ref="pay_popup" 
			:id="showObj.id"
			:price="showObj.commodity?.reduce((a,b)=>{return a+b.price * b.num},0) + (showObj.shopInfo?.packPrice ?? 0) - (showObj.coupon?.value ?? 0)"></pay-popup>
		<safe-bottom></safe-bottom>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref,computed,watch } from 'vue'
	import { useOrderStore,useShopsStore } from '@/stores'
	const orderStore = useOrderStore()
	const shopsStore = useShopsStore()
	// 获取订单的状态
	const status = computed(()=>{
		if(showObj.value.status === 'finish'){
			return '已完成'
		}
		if(showObj.value.status === 'cancel'){
			return '订单已取消'
		}
		if(showObj.value.status === 'unpay'){
			return '待付款'
		}
		if(showObj.value.status === 'untake'){
			return '待收货'
		}
		if(showObj.value.status === 'delivery'){
			return '配送中'
		}
		if(showObj.value.status === 'finish' || showObj.value.status === 'evaluate'){
			return '订单已完成'
		}
	})
	// -----------------------------
	// 点击返回订单页面
	const goBack = ()=>{
		uni.switchTab({
			url:'/pages/oders/oders'
		})
	}
	
	// ------------------------------
	// 页面获得的订单信息
	const showObj = ref({})
	const changeShowObj = (obj)=>{
		obj.shopInfo = shopsStore.searchForId(obj.sid)
		obj.shopName = shopsStore.searchForId(obj.sid).name
		obj.commodity = obj.commodity.map(it=>{
			it.name = shopsStore.searchForComId(it.comid).title
			it.price = shopsStore.searchForComId(it.comid).jiage
			it.imgUrl = shopsStore.searchForComId(it.comid).imgUrl
			return it
		})
		return obj
	}
	onLoad((e)=>{
		// console.log(e.id)
		let obj = JSON.parse(JSON.stringify(orderStore.searchForOid(parseInt(e.id))))
		// console.log(obj.shopInfo)
		showObj.value = changeShowObj(obj)
		watch(()=>orderStore.searchForOid(parseInt(e.id)),(newVal)=>{
			if(!newVal){
				return
			}
			showObj.value = changeShowObj(JSON.parse(JSON.stringify(newVal)))
		},{
			deep:true
		})
	})
	
	watch(showObj,(newVal)=>{
		// console.log(newVal)
		if(newVal.status === 'delivery'){
			showIcon.value = '../../static/images/qs.png'
		}else{
			// console.log(showObj.value)
			showIcon.value= '../../static/images/shops.png'
		}

	},{
		deep:true
	})
	
	// --------------------------
	// 当待收货和配送中时显示地图
	// 展示图标
	const showIcon = ref('')
	// console.log(showIcon.value)
	// 获得商家的地图展示
	const shopCovers = ref([{
		id:4123,
		latitude: computed(()=>showObj.value.shopInfo?.coordinate.latitude),
		longitude: computed(()=>showObj.value.shopInfo?.coordinate.longitude),
		iconPath: computed(()=>showIcon.value),
		width:26,
		height:26
	}])
	// ---------------------------
	// 绑定弹窗
	const statusPoup = ref(null)
	// 展示订单进度弹窗
	const showStatus = ()=>{
		if(showObj.value.status === 'unpay'){
			return
		}
		statusPoup.value.open()
	}
	// ---------------------------
	// 订单跟踪
	const colors= ref("#659efa")
	const stepData = ref([ 
		{
	        name: '支付成功',
			isNow: 0,
	        type: 1,
			status:'payed'
	    },
		{
		    name: '商家已接单',
			isNow: 0,
		    type: 1,
			status:'untake'
		},
		{
		    name: '配送中',
			isNow: 0,
		    type: 1,
			status:'delivery'
		},
		{
		    name: '订单已完成',
			isNow: 0,
		    type: 1,
			status:'finish'
		}
	])
	// 当前的流程情况
	const stepList = computed(()=>{
		let list = ref([])
		for(const item of stepData.value){
			if(item.status === 'finish' && showObj.value.status === 'evaluate'){
				item.isNow = 1
				list.value.push(item)
				break
			}
			if(item.status === showObj.value.status){
				item.isNow = 1
				list.value.push(item)
				break
			}
			list.value.push(item)
		}
		return list.value
	})
	// -----------------------------
	// 取消订单-将订单的状态改成 cancle
	const cancelOrder = (id)=>{
		let title = ref('确定要取消订单吗？')
		if(showObj.value.status === 'delivery'){
			title.value = '订单在配送中，确定要取消吗？'
		}
		uni.showModal({
			title:title.value,
			success(msg){
				if(msg.confirm){
					orderStore.changeStatus(id,'cancel')
				}
			}
		})
	}
	// ------------------------------
	// 联系商家
	const callShop = (n) =>{
		uni.makePhoneCall({
			phoneNumber:n+''
		}).catch((e)=>{
			console.log(e)
		})
	}
	// ------------------------------
	// 绑定支付弹窗
	const pay_popup = ref(null)
	// 继续支付
	const openPayPopup = ()=>{
		// console.log(pay_popup.value)
		pay_popup.value.clickpay()
	}
	// ------------------------------
	// 点击进行评论
	const gotoComment = ()=>{
		// console.log(showObj.value)
		uni.navigateTo({
			url:'/pages/comment/comment?id='+showObj.value.id
		})
	}
	// -------------------------------
	// 删除订单
	const deleteOrder = ()=>{
		uni.showModal({
			content:'确定要删除该订单吗？',
			success(msg){
				if(msg.confirm){
					uni.navigateBack()
					orderStore.rmOrder(showObj.value.id)
				}
			}
		})
	}
	
</script>

<style lang="scss" scoped>
	.order-detail{
		min-height: 100vh;
		background-color: rgba(0,0,0,0.05);
	}
	.status{
		padding: 25rpx 0 20rpx 30rpx;
		font-size: 40rpx;
		font-weight: 800;
		
	}
	.map{
		height: 350rpx;
		margin: 20rpx;
		border-radius: 20rpx;
		overflow:hidden;
	}
	.status-popup{
		max-height: 700rpx;
		overflow: scroll;
		background-color: white;
		.title{
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 20rpx;
			font-size: 30rpx;
		}
	}
	.order-button{
		display: flex;
		justify-content: flex-end;
		margin: 15rpx;
		background-color: white;
		padding: 15rpx;
		border-radius: 20rpx;
		:nth-child(n){
			margin: 0;
			margin:15rpx 10rpx;
			// height: 70rpx;
			font-size: 25rpx;
			background-color: $takout-base-color;
			border-radius: 30rpx;
			color: white;
			border:1rpx solid $takout-base-color;
			display: flex;
			
		}
	}
	.buyInfo{
		margin: 15rpx;
		background-color: white;
		border-radius: 20rpx;
		padding: 10rpx 15rpx;
		.shop{
			font-size: 35rpx;
			font-weight: 700;
			padding: 12rpx;
			border-bottom: 1rpx solid rgba(0,0,0,0.06);
		}
		.commodity{
			padding: 15rpx 0;
			font-size: 32rpx;
			display:grid;
			grid-template-columns: 1fr 4fr 1fr;
			gap: 15rpx;
			.com-img{
				// border:1rpx solid black;
				width: 120rpx;
				height: 120rpx;
				margin: 10rpx;
			}
			.com-name{
				margin-top: 10rpx;
				font-size: 32rpx;
				font-weight: 530;
			}
			.com-specs{
				display: flex;
				font-size: 28rpx;
				color: $takeout-font-color-2;
			}
			.com-price{
				margin-top: 10rpx;
			}
		}
		.coupon{
			padding:24rpx 12rpx;
			display: flex;
			justify-content: space-between;
			border-top: 1rpx solid rgba(0,0,0,0.06);
			border-bottom: 1rpx solid rgba(0,0,0,0.06);
			:last-child{
				display: flex;
				
			}
		}
		.allPrice{
			display: flex;
			justify-content: flex-end;
			padding: 24rpx 12rpx;
		}
		.price{
			color: red;
		}
	}
	.other-info{
		font-size: 30rpx;
		margin: 15rpx;
		padding: 0 15rpx;
		background-color: white;
		border-radius: 20rpx;
		margin-bottom: 50rpx;
		.info-item{
			padding:20rpx 15rpx;
			justify-content: space-between;
			display: flex;
			.item-left{
				color: $takeout-font-color-2;
			}
			.item-right{
				max-width: 500rpx;
				text-align: right;
			}
		}
	}
</style>

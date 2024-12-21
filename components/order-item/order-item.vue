<template>
	<view class="order-item">
		<view @click="goToDetail">
			<view class="" v-if="order.status !== 'unpay' && order.status !== 'finish' && order.status !== 'evaluate' && order.status !== 'cancel'">
				<view class="item-head">
					<view class="name">
						{{order.shopInfo.name}} 
					</view>
					<view class="red">
						{{status}}
					</view>
				</view>
				<view class="item-commodity">
					<!-- {{sendTime}} -->
					<view class="item-com-first">
						预计<view class="com-time">{{sendTime}}</view>送达
					</view>
					<view class="item-com-btom">
						<view class="com-content item-com-three">
							<view class="" v-for="(item,index) in order.commodity" :key="index">
								{{item.name}}{{ index!==order.commodity.length-1 ? '、' : ''}}
							</view>
						</view>
						<view class="">
							等{{order.commodity.reduce((a,b)=>{return b.num + a},0)}}件
						</view>
					</view>
				</view>
				<view class="map">
					<map name="" 
						style="width: 100%; height: 100%;" 
						:latitude="shopCovers[0].latitude" 
						:longitude="shopCovers[0].longitude" 
						:markers="shopCovers"
						:enable-zoom="false"
						:enable-scroll="false"
						></map>
				</view>
				<view class="other">
					<view class="time">
						下单时间：{{order.createTime}}
					</view>
					<view class="other-two">
						合计: ￥<view class="allPrice">
							 {{ order.commodity.reduce((a,b)=>{return b.price * b.num +a},0) - order.coupon.value +order.shopInfo.packPrice}}
						</view>
					</view>
				</view>
			</view>
			<view class="" v-else>
				<view class="item-head">
					<view class="name">
						{{order.shopInfo.name}} 
					</view>
					<view class="red">
						{{status}}
					</view>
				</view>
				<view class="item-content">
					<view class="left">
						<img class="left-img" :src="order.shopInfo.icon" alt=""/>
					</view>
					<view class="center">
						<view class="">
							<view class="com-content">
								<view class="" v-for="(item,index) in order.commodity" :key="index">
									{{item.name}}{{ index!==order.commodity.length-1 ? '、' : ''}}
								</view>
							</view>
						</view>
						<view class="">
							下单时间：{{order.createTime}}
						</view>
					</view>
					<view class="right">
						<view class="right-first">
							￥<view class="price">{{ order.commodity.reduce((a,b)=>{return b.price * b.num +a},0) - order.coupon.value +order.shopInfo.packPrice}}</view>
						</view>
						<view class="">
							共{{order.commodity.reduce((a,b)=>{return b.num + a},0)}}件
						</view>
					</view>
				</view>
			</view>
			<!-- {{order.commodity}} -->
		</view>
		<view class="change">
			<button class="change-item" v-show="order.status === 'evaluate' || order.status === 'finish' || order.status === 'cancel'" @click="deleteOrder(order.id)">删除订单</button>
			<button class="change-item" @click="callShops(order.shopInfo.phone)">联系商家</button>
			<button class="change-item" v-show="order.status !== 'unpay' && order.status !=='evaluate' && order.status !=='finish' && order.status!=='cancel'" @click="changeStatus(order.id)">确认收货</button>
			<button class="change-item" v-show="order.status === 'evaluate'" @click="gotoComment">去评论</button>
			<button class="change-item" v-show="order.status === 'unpay'" @click="payOrder">继续支付</button>
		</view>
		<pay-popup ref="payPop" 
			:id="order.id" 
			:price="order.commodity.reduce((a,b)=>{return b.price * b.num +a},0) - order.coupon.value +order.shopInfo.packPrice"
		></pay-popup>
	</view>
	
</template>

<script setup>
	import { ref,computed } from 'vue'
	import { useOrderStore } from '@/stores'
	const orderStore = useOrderStore()
	let props = defineProps({
		order:{
			type:Object
		}
	})
	// console.log(props.order)
	// 联系商家
	const callShops = (phone)=>{
		// console.log(phone)
		uni.makePhoneCall({
			phoneNumber:phone+''
		}).catch((e)=>{
			console.log(e)
		});
	}
	// 获取订单的状态
	const status = computed(()=>{
		if(props.order.status === 'finish'){
			return '已完成'
		}
		if(props.order.status === 'unpay'){
			return '待付款'
		}
		if(props.order.status === 'untake'){
			return '待收货'
		}
		if(props.order.status === 'delivery'){
			return '配送中'
		}
		if(props.order.status === 'evaluate'){
			return '待评价'
		}
		if(props.order.status === 'cancel'){
			return '已取消'
		}
	})
	// 预计送达时间
	const sendTime = computed(()=>{
		if(props.order.sendTime === '立即送出'){
			return (parseInt(props.order.createTime.split(' ')[1].split(':')[0])+1) + ':' + props.order.createTime.split(' ')[1].split(':')[1] + '前'
		}else{
			return props.order.sendTime
			// return '2024-06-09 13:30-14:30'
		}
	})
	// 展示图标
	const showIcon = computed(()=>{
		if(props.order.status === 'delivery'){
			return '../../static/images/qs.png'
		}else{
			return '../../static/images/shops.png'
		}
	})
	// console.log(props.order)
	// 获得商家的地图展示
	const shopCovers = ref([{
		id:4123,
		latitude: props.order.shopInfo.coordinate.latitude,
		longitude: props.order.shopInfo.coordinate.longitude,
		iconPath: showIcon.value,
		width:26,
		height:26
	}])
	// 删除订单
	const deleteOrder = (id)=>{
		uni.showModal({
			content:'确定要删除该订单吗？',
			success(msg){
				if(msg.confirm){
					orderStore.rmOrder(id)
				}
			}
		})
	}
	// 将订单的状态改成确认收货
	const changeStatus = (id)=>{
		uni.showModal({
			content:'确定收到商品了吗?',
			success:(res)=>{
				if(res.confirm){
					orderStore.changeStatus(id,'evaluate')
				}
			}
		})
	}
	// 点击进去详情页
	const goToDetail = ()=>{
		uni.navigateTo({
			url:'/pages/order-detail/order-detail?id=' + props.order.id
		})
	}
	
	// ----------------------- 
	const payPop = ref(null)
	// 点击继续支付
	const payOrder = ()=>{
		payPop.value.clickpay()
	}
	
	// ------------------------
	// 点击进行评论
	const gotoComment = ()=>{
		// console.log(showObj.value)
		uni.navigateTo({
			url:'/pages/comment/comment?id='+props.order.id
		})
	}
</script>

<style lang="scss" scoped>
	.order-item{
		background-color: white;
		margin:15rpx; 
		padding: 15rpx 25rpx;
		border-radius: 20rpx;
	}
	.item-head{
		display: flex;
		justify-content: space-between;
		font-size: 35rpx;
		margin: 10rpx 0;
		margin-bottom: 10rpx;
		.name{
			white-space: nowrap;
			overflow: hidden;
			width: 400rpx;
			text-overflow: ellipsis;
			font-weight: 800;
			align-items: center;
		}
		.red{
			color: red;
			font-weight: 700;
		}
	}
	.item-commodity{
		font-size: 28rpx;
		// display: flex;
		align-items: center;
		gap: 15rpx;
		.item-com-first{
			width: 100%;
			display: flex;
			align-items: center;
			gap: 5rpx;
			.com-time{
				color: #6978ff;
				font-weight: 700;
			}
		}
		.item-com-btom{
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			color: rgba(0,0,0,0.5);
		}
		.fg{
			color: rgba(0,0,0,0.3);
		}
		.item-com-three{
			width: 400rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	.com-content{
		display: flex;
		// gap: 15rpx;
	}
	.map{
		height: 250rpx;
		margin: 15rpx 0;
	}
	.other{
		display: flex;
		font-size: 25rpx;
		justify-content: space-between;
		.other-two{
			display: flex;
		}
		color: rgba(0,0,0,0.6);
		.allPrice{
			font-size: 30rpx;
			font-weight: 600;
			color: black;
		}
	}
	.change{
		margin-top: 10rpx;
		display: flex;
		justify-content: flex-end;
		.change-item{
			margin: 10rpx;
			width: 180rpx;
			height: 60rpx;
			border-radius: 30rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: white;
			border: 1rpx solid rgba(0,0,0,0.15);
		}
	}
	.item-content{
		display: grid;
		grid-template-columns:1fr 4fr 1fr;
		align-items: center;
		gap: 10rpx;
		.left-img{
			// border: 1rpx solid black;
			width: 100rpx;
			height: 100rpx;
		}
		.center{
			font-size: 30rpx;
			white-space: nowrap;
			display: flex;
			overflow: hidden;
			text-overflow: ellipsis;
			flex-direction: column;
			gap: 5rpx;
		}
		.right{
			font-size: 30rpx;
			text-align: center;
			.right-first{
				display: flex;
				justify-content: center;
			}
			.price{
				font-weight: 700;
			}
		}
	}
	
</style>
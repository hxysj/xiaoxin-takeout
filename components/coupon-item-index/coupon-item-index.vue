<template>
	<view class="coupon-item" @click="addNewCoupon(coupon.id)">
		<view class="item-title">
			￥{{coupon.price}}
		</view>
		<view class="item-description">
			满{{coupon.minPrice}}元可用
		</view>
		<view class="item-get">
			立即领取
		</view>
	</view>
</template>

<script setup>
	import {useUserStore} from '@/stores/index.js'
	defineProps({
		coupon:{
			type:Object
		}
	})
	const userStore = useUserStore()
	
	const addNewCoupon = (id)=>{
		if(!uni.getStorageSync('token')){
			uni.showToast({
				title:'未登录！',
				icon:'none'
			})
			setTimeout(()=>{
				uni.switchTab({
					url:'/pages/user/user'
				})
			},500)
			return
		}
		userStore.addNewCoupon(id)
		uni.showToast({
			icon:'none',
			title:'领取成功'
		})
	}
</script>

<style lang="scss" scoped>
	.coupon-item{
		position: relative;
		width: 248rpx;
		height: 220rpx;
		display: inline-block;
		margin: 0 5rpx;
		background-color: $takout-base-color;
		.item-title{
			position: absolute;
			top: 0;
			left: 0;
			padding: 10rpx;
			width: 100%;
			text-align: center;
			font-size: 40rpx;
		}
		.item-description{
			top: 80rpx;
			width: 100%;
			font-size: 30rpx;
			text-align: center;
			position: absolute;
		}
		.item-get{
			bottom: 0;
			left: 0;
			position: absolute;
			padding: 20rpx;
			width: 100%;
			text-align: center;
			font-weight: 650;
			background-color: rgba(0,0,0,0.2);
			backdrop-filter: blur(50rpx);
			color: rgba(0,0,0,0.8);
		}
	}
</style>
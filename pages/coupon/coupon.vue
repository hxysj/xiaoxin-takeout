<template>
	<view class="coupon">
		<view class="uni-padding-wrap uni-common-mt">
		<uni-segmented-control :current="current" :values="items" :style-type="styleType"
			@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="showList.length">
				<view class="item" v-for="item in showList" :key="item.id" :class="{'isUse':item.isuse}">
					<view :class="{
						'item-left':true,
						'coupon-item-color-1':(couponStore.searchForParentid(item.pid).price<10),
						'coupon-item-color-2':couponStore.searchForParentid(item.pid).price<15 && couponStore.searchForParentid(item.pid).price >= 10,
						'coupon-item-color-3':couponStore.searchForParentid(item.pid).price >= 15
						}">
						<view class="logo-name">
							小新外卖
						</view>
						<view class="">
							<!-- {{item}} -->
							￥{{couponStore.searchForParentid(item.pid).price}}
						</view>
						<view class="">
							订单{{couponStore.searchForParentid(item.pid).minPrice}}满元可用
						</view>
					</view>
					<view class="item-right">
						<view class="">
							使用期限
						</view>
						<view class="">
							{{item.startTime}}
						</view>
						<view class="">
							{{item.endTime}}
						</view>
						<view class="">
							{{ !item.isuse ? '未使用' : '已使用'}}
						</view>
					</view>
				</view>
			</view>
			<view v-else class="noData">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref,computed } from 'vue'
	import { useUserStore,useCouponStore } from '@/stores'
	import { onShow } from '@dcloudio/uni-app'
	// 登录验证
	onShow(()=>{
		if(!uni.getStorageSync('token')){
			uni.showToast({
				title:'未登录！',
				icon:'error'
			})
			setTimeout(()=>{
				uni.switchTab({
					url:'/pages/user/user'
				})
			},500)
		}
	})
	
	const current = ref(0)
	const userStore = useUserStore()
	const couponStore = useCouponStore()
	const items = ['可使用','全部']
	const onClickItem = (e) =>{
		if(current.value !== e.currentIndex)current.value = e.currentIndex
	}
	const showList = computed(()=>{
		if(current.value === 0){
			return userStore.getCoupon.filter(item=>!item.isuse)
		}else{
			return userStore.getCoupon
		}
	})
	// console.log(userStore.getCoupon)
	const styleType = ref('button')
	// const showList = ref([1])
</script>

<style lang="scss" scoped>
	.coupon{
		margin: 20rpx;
	}
	.content{
		margin: 15rpx;
		.isUse{
			opacity: 0.5;
			.item-left{
				color: black;
			}
		}
		.noData{
			width: 100%;
			font-size: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 200rpx;
			color: $takeout-font-color-1;
		}
		.item{
			height: 210rpx;
			// padding: 10rpx;
			display: grid;
			margin:20rpx 10rpx;
			// gap: 25rpx;
			grid-template-columns:2fr 1fr;
			.item-left{
				padding: 10rpx;
				padding-left: 20rpx;
				border-radius: 30rpx 0 0 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				color: white;
				& :nth-child(2){
					font-size: 50rpx;
				}
			}
			.coupon-item-color-1{
				background-color: $takeout-coupon-color1;
			}
			.coupon-item-color-2{
				background-color: $takeout-coupon-color2;
			}
			.coupon-item-color-3{
				background-color: $takeout-coupon-color3;
			}
			.item-right{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				color: $takeout-font-color-1;
				background-color: rgba(0,0,0,0.02);
				& :nth-child(2){
					font-size: 30rpx;
				}
				& :nth-child(3){
					font-size: 30rpx;
				}
			}
		}
	}
</style>

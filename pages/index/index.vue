<template>
	<view class="content pageBg">
		<custom-nav-bar>
			<template #tab>
				<view class="index-tag">小新外卖</view>
			</template>
		</custom-nav-bar>
		<!-- 点击调整到搜索页面 -->
		<search-item>
			<template #place-title>
				<view>有疑问可以在客服位置咨询客服</view>
			</template>
		</search-item>
		<!-- 分类区域 -->
		<view class="index-classify">
			<view class="classify-item" v-for="item in classifyStore.getClassify" :key="item.cid" @click="goToClassify(item)">
				<view class="item-image">
					<image :src="item.icon" mode="aspectFill"></image>
				</view>
				<view class="item-title">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 公告区域 -->
		<view class="index-news">
			<swiper :autoplay="true" vertical class="news-body">
				<swiper-item>
					<view class="news-item">
						<uni-icons type="flag-filled" color="$takeout-base-color"></uni-icons>
						平台营业时间：8:30-22:30
					</view>
				</swiper-item>
				<swiper-item>
					<view class="">
						<uni-icons type="info-filled" color="$takeout-base-color"></uni-icons>
						外卖直达宿舍门口！教室区域也可配送！
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图页面 -->
		<view class="index-swiper">
			<swiper class="myswiper" :indicator-dots="true" :autoplay="true">
				<swiper-item v-for="item in posterStore.getSwiperList.value" :key="item.id">
					<view class="swiper-item">
						<image :src="item.icon" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 优惠卷领取 -->
		<view class="index-coupon">
			<scroll-view scroll-x="true" class="coupon">
				<coupon-item-index v-for="item in couponStore.getCouponClassify" :key="item.id" :coupon="item"></coupon-item-index>
			</scroll-view>
		</view>
		<!-- 店铺推荐 -->
		<view class="aboutYourLike">
			<view class="like-title">
				猜你喜欢
			</view>
			<view class="like-show">
				<business-item v-for="item in shopList" :key="item.id" :item="item"></business-item>
			</view>
		</view>
	</view>
	<safe-bottom></safe-bottom>
</template>

<script setup>
	import { ref,computed } from 'vue'
	// import safeBottom from '@/components/safe-bottom/safe-bottom.vue'
	import { 
		useClassifyStore,
		usePosterStore,
		useShopsStore,
		useCouponStore
	} from '@/stores/index.js';
	import { onReachBottom,onPullDownRefresh } from '@dcloudio/uni-app'
	const classifyStore = useClassifyStore()
	const posterStore = usePosterStore()
	const  shopsStore = useShopsStore()
	const couponStore = useCouponStore()
	classifyStore.setClassify()
	// 每页展示的数据条数
	const showPage = ref(1)
	// 当前页数
	const nowPage = ref(0)
	shopsStore.setShopList()
	const shopList = computed(()=>shopsStore.getShopList(showPage.value,nowPage.value))
	console.log(shopList.value)
	onReachBottom(()=>{
		// console.log(1111)
		uni.showLoading({
			title:'加载中....'
		})
		setTimeout(()=>{
			nowPage.value += 1
			uni.hideLoading()
		},1000)
	})
	
	onPullDownRefresh(()=>{
		uni.showLoading({
			title:'刷新中...'
		})
		setTimeout(()=>{
			nowPage.value = 0
			uni.hideLoading()
			uni.showToast({
				title:'刷新成功！'
			})
		},1000)
	})
	// console.log(posterStore.getSwiperList.value)
	// 点击分类跳转到分类下的商品
	const goToClassify = (obj)=>{
		uni.navigateTo({
			url:'/pages/classify/classify?name='+obj.name+'&id='+obj.cId
		})
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height: 100vh;
		.index-tag{
			color: white;
			font-weight: 600;
			font-size: 45rpx;
			font-style: italic;
			word-spacing: 30rpx;
		}
	}
	.index-classify{
		// border:1rpx solid red;
		padding: 10rpx 5rpx;
		background-color: white;
		font-size: 35rpx;
		display: grid;
		grid-template-columns: repeat(4,1fr);
		margin-top: 20rpx;
		.classify-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 10rpx;
			.item-image{
				width: 115rpx;
				height: 115rpx;
				padding: 5rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
			.item-title{
				font-size: 30rpx;
			}
		}
	}
	.index-news{
		margin: 10rpx 0;
		background-color: white;
		padding: 20rpx;
		color: $takout-base-color;
		.news-body{
			height: 40rpx;
		}
	}
	.index-swiper{
		background-color: white;
		// border:1rpx solid black;
		height: 360rpx;
		.myswiper{
			height: 100%;
			.swiper-item{
				image{
					width: 100%;
					height: 360rpx;
				}
			}
		}
	}
	.index-coupon{
		padding: 10rpx 0 0 0;
		.coupon{
			height:240rpx;
			width: 100%;
			// padding: 10rpx;
			white-space: nowrap;
		}
		
	}
	.aboutYourLike{
		padding:20rpx;
		border-radius: 10rpx;
		width: 100%;
		.like-title{
			font-size: 45rpx;
			color: $takout-base-color;
		}
		.like-show{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
		}
	}
</style>

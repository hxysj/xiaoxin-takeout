<template>
	<view class="business">
		<view class="bus-left">
			<image class="left-img" :src="item.icon" mode=""  @click="gotoShop(item.id)"></image>
		</view>
		<view class="bus-right">
			<view class="title" @click="gotoShop(item.id)">
				<view class="tab">
					<uni-tag text="优质店铺"
						custom-style="background-color: #4335d6; border-color: #4335d6; color: #fff;">
					</uni-tag>
				</view>
				{{item.name}}
			</view>
			<view class="info">
				<view class="rate">
					<uni-rate :value="item.rate" readonly size="20"/>	
				</view>
				<view class="payed">
					已售{{item.payed}}单
				</view>
			</view>
			<view class="other">
				<view class="threshold">
					<view class="threshold-item">
						起送价 ￥{{item.minPrice}}
					</view>
					<view class="threshold-item">
						打包费 ￥{{item.packPrice}}
					</view>
				</view>
				<view class="takeout-school">
					校园专送
				</view>
			</view>
			<view class="commodity">
				<view class="commodity-item" v-for="it in item.commodity.slice(0,3)" :key="it.id" @click="gotoCommodity({name:it.title,id:it.id})">
					<view class="image">
						<image class="com-item-img" :src="it.imgUrl" mode="aspectFilla"></image>
					</view>
					<view class="name">
						{{it.title}}
					</view>
					<view class="price">
						￥{{it.jiage}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// 接受父组件传递过来的参数
	defineProps({
		item:{
			"type":Object
		}
	})
	
	// 点击店铺名称挑战到对应店铺
	const gotoShop = (id)=>{
		uni.navigateTo({
			url:'/pages/shop/shop?id='+id
		})
	}
	
	// 点击挑战到商品详情页面
	const gotoCommodity = (obj)=>{
		obj = JSON.stringify(obj)
		uni.navigateTo({
			url:'/pages/commodity/commodity?obj='+obj
		})
	}
</script>

<style lang="scss" scoped>
	.business{
		width: 100%;
		margin: 10rpx;
		background-color: white;
		padding: 10rpx;
		border-radius: 30rpx;
		// width: 100%;
		display: grid;
		grid-template-columns: 1fr 3fr;
		// gap:5rpx;
		.bus-left{
			.left-img{
				// border:1rpx solid black;
				width: 170rpx;
				height: 150rpx;
				margin:20rpx 8rpx;
				border-radius: 20rpx;
			}
		}
		.bus-right{
			margin: 10rpx;
			.title{
				.tab{
					display: inline-block;
				}
				font-size: 45rpx;
				
			}
			.info{
				margin: 10rpx 0;
				display: flex;
				gap: 5rpx;
				font-size: 25rpx;
				align-items: center;
				color: $takeout-font-color-1;
			}
			.other{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				.threshold{
					display: flex;
					gap: 13rpx;
					.threshold-item{
						font-size: 25rpx;
					}
				}
				.takeout-school{
					font-size: 25rpx;
					background-color: $takout-base-color;
					padding: 5rpx;
					width: 130rpx;
					text-align: center;
					border-radius: 20rpx 0 20rpx 0;
					color: white;
				}
			}
			.commodity{
				display: grid;
				grid-template-columns: repeat(3,1fr);
				margin: 7rpx 0;
				gap: 6rpx;
				.commodity-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					.com-item-img{
						// border:1rpx solid black;
						width: 150rpx;
						height: 135rpx;
						border-radius: 15rpx;
					}
					.name{
						width: 150rpx;
						font-size: 30rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.price{
						font-size: 30rpx;
						color: red;
					}
				}
			}
		}
	}
</style>
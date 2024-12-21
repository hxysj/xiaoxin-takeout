<template>
	<view class="remark">
		<view class="user-icon">
			<image class="icon-img" :src="item.userInfo.icon" mode="aspectFill"></image>
		</view>
		<view class="user-info">
			<view class="header">
				<view class="nickName">
					{{item.userInfo.name}}
				</view>
				<view class="time">
					{{item.createTime}}
				</view>
			</view>
			<view class="rate">
				<uni-rate :value="item.rate" color="#bbb" size="20" readonly="true" active-color="red" /> {{item.rate}}
			</view>
			<view class="value">
				{{item.text}}
				<image class="value-img" :src="item.img" mode="aspectFill" v-if="item.img"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['item'])
	// console.log(props.item)
</script>

<style lang="scss" scoped>
	.remark{
		padding: 30rpx;
		display: flex;
		gap: 20rpx;
		border-bottom: 1rpx solid $takeout-border-color-2;
		.user-icon{
			.icon-img{
				// border: 1rpx solid black;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
		}
		.user-info{
			width: 100%;
			font-size: 25rpx;
			display: flex;
			flex-direction: column;
			gap: 5rpx;
			color: $takeout-font-color-1;
			.header{
				display: flex;
				justify-content: space-between;
			}
			.rate{
				display: flex;
				align-items: center;
				gap: 15rpx;
			}
			.value{
				display: flex;
				flex-direction: column;
				gap: 10rpx;
				.value-img{
					border:1rpx solid black;
					width: 110rpx;
					height: 110rpx;
				}
			}
		}
	}
</style>
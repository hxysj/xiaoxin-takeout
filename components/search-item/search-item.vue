<template>
	<view class="search" @click="goToSearch">
		<view class="search-item">
			<uni-icons type="search" size="20" color=" #adadad"></uni-icons>
			<slot name="place-title"></slot>
		</view>
	</view>
</template>

<script setup>
	const goToSearch = ()=>{
		uni.navigateTo({
			url:'/pages/search/search'
		})
	}
</script>

<style lang="scss" scoped>
	.search{
		background-color: white;
		margin: 10rpx;
		padding:15rpx 20rpx;
		border-radius: 50rpx;
		color: #adadad;
		.search-item{
			display: flex;
			align-items: center;
		}
	}
</style>
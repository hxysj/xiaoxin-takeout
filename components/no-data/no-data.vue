<template>
	<view class="noData">
		<slot name="data">
			暂无数据
		</slot>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.noData{
		width: 100%;
		padding: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: $takeout-font-color-1;
	}
</style>
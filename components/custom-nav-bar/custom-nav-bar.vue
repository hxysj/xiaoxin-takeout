<template>
	<!-- 头部留出小程序上按钮的保留位置 -->
	<view class="nav-bar" :style="{'height':getstatusBarHeight() + 'px'}">
	</view>
	<view class="tab" :style="{'height':getTitleHeight() + 'px'}">
		<view class="left">
			<slot name="tab">
			
			</slot>
		</view>
		<view class="title">
			<slot name="title">
				
			</slot>
		</view>
	</view>
</template>

<script setup>
	import { getstatusBarHeight,getTitleHeight } from '@/utils/system.js'
</script>

<style lang="scss" scoped>
	.tab{
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		.left{
			position: absolute;
			padding-left: 30rpx;
		}
		.title{
			margin: auto;
			// justify-self: center;
			max-width: 450rpx;
			font-size: 35rpx;
			white-space: nowrap;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			color: white;
			font-weight: 600;
		}
	}
</style>
<template>
	<view class="address pageBg">
		<view>
			<address-item :item="item" v-for="item in userStore.getAddress" :key="item.id"></address-item>
		</view>
		<view class="addNewAdd" @click="addAddress" :style="{bottom:getSafeBottom() + 'px'}">
			<view class="">
				新增地址
			</view>
			<safe-bottom></safe-bottom>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { useUserStore } from '@/stores/index.js'
	import { getSafeBottom } from '@/utils/system.js'
	const userStore = useUserStore()
	 // 添加新地址
	const addAddress = ()=>{
		uni.navigateTo({
			url:'/pages/add-address/add-address'
		})
	}
</script>

<style lang="scss" scoped>
	.address{
		min-height: 100vh;
		padding: 20rpx 0;
	}
	.addNewAdd{
		display: flex;
		justify-content: center;
		align-items: center;
		background:$takeout-button-cart-color;
		width: 100%;
		height: 100rpx;
		font-weight: 600;
		color: white;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>

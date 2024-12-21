<template>
	<view class="pageBg search">
		<custom-nav-bar>
			<template #tab>
				<view class="goBack" @click="goBack">
					<uni-icons type="left" color="white"></uni-icons>
				</view>
			</template>
		</custom-nav-bar>
		<view class="search-inp">
			<input class="uni-input" v-model="yourSearch" focus placeholder="输入你要搜索的商家或商品" />
			<button class="uni-btn" @click="search(yourSearch)">搜索</button>
		</view>
		<view class="history" v-show="history.length">
			<view class="history-head">
				<view class="">
					搜索历史
				</view>
				<view class="" @click="deleteHistory">
					<uni-icons type="trash-filled" size="25"></uni-icons>
				</view>
			</view>
			<view class="history-items">
				<view class="item" v-for="(item,index) in history" :key="index" @click="search(item)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { useShopsStore } from '@/stores'
	
	const shopsStore = useShopsStore()
	// 点击返回上一页
	const goBack = ()=>{
		uni.navigateBack()
	}
	
	const yourSearch = ref('')
	
	// console.log(uni.getStorageSync('searchHistory'))
	let history = ref(uni.getStorageSync('searchHistory') ? uni.getStorageSync('searchHistory') : [])
	
	const search = (n)=>{
		// console.log(yourSearch.value)
		if(!history.value.includes(n)){
			history.value.push(n)
			uni.setStorageSync('searchHistory',history.value)
		}
		uni.navigateTo({
			url:'/pages/classify/classify?search='+n +'&type=search'
		})
	}
	
	const deleteHistory = ()=>{
		uni.removeStorageSync('searchHistory')
		history.value = []
	}
	
</script>

<style lang="scss" scoped>
	.search{
		min-height: 100vh;
	}
	.search-inp{
		margin-top: 30rpx;
		padding: 0 15rpx;
		display: grid;
		grid-template-columns: 5fr 1fr;
		.uni-input{
			background-color: white;
			height: 80rpx;
			padding: 0 20rpx;
			border-radius: 30rpx;
		}
		.uni-btn{
			font-size: 27rpx;
			display: flex;
			align-items: center;
			background-color: $takout-base-color;
			color: white;
		}
	}
	.history{
		padding: 20rpx;
		.history-head{
			font-size: 30rpx;
			color: $takeout-font-color-2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10rpx;
		}
		.history-items{
			margin-top: 10rpx;
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			// color: $takout-base-color;
			.item{
				background-color: white;
				padding: 5rpx 25rpx;
				border-radius:15rpx;
			}
		}
	}
</style>

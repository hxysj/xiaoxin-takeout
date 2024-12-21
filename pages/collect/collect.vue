<template>
	<view class="collect pageBg">
		<view class="collect-head">
			<view :class="{'head-item':true ,'active':showType === 'shop'}" @click="changeShowType('shop')">
				店铺
			</view>
			<view :class="{'head-item':true ,'active':showType === 'commodity'}" @click="changeShowType('commodity')">
				商品
			</view>
		</view>
		<view class="collect-content" v-if="showType === 'commodity'">
			<view class="content-item" v-for="item in showList" :key="item.id" @click="gotoCom(item.info.title,item.id)">
				<!-- {{item}} -->
				<view class="">
					<image class="item-img" :src="item.info.imgUrl" mode="aspectFill"></image>
				</view>
				<view class="item-right">
					<view class="">
						{{item.info.title}}
					</view>
					<view class="jiage">
						{{item.info.jiage}}元/一份
					</view>
				</view>
			</view>
		</view>
		<view class="collect-content" v-else>
			<view class="content-item" v-for="item in showList" :key="item.id" @click="gotoShop(item.id)">
				<view class="">
					<image class="item-img" :src="item.info.icon" mode=""></image>
				</view>
				<view class="item-right">
					<view class="title">
						{{item.info.name}}
					</view>
					<view class="time">
						营业时间：{{item.info.openTime}}
					</view>
					<view class="area">
						地址：{{item.info.area}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { 
		useUserStore,
		useShopsStore
	} from '@/stores'
	import { ref,computed, watch } from 'vue'
	
	
	const userStore = useUserStore()
	const shopsStore = useShopsStore()
	
	let showList = ref([])
	let showType = ref('shop')
	
	let store = ref(userStore.getCollect)
	// console.log(userStore.getCollect)
	
	const changeShowType = (n)=>{
		showType.value = n
	}
	
	const changeShow = () =>{
		let list = store.value.filter(item=>item.type === showType.value)
		// console.log(list)
		
		if(showType.value === 'shop'){
			showList.value = list.map(item=>{
				item.info = shopsStore.searchForId(item.id)
				return item
			})
		}else{
			showList.value = list.map(item=>{
				item.info = shopsStore.searchForComId(item.id)
				return item
			})
		}
		// console.log(showList.value)
	}
	
	watch(showType,(newVal)=>{
		changeShow()
	},{
		immediate:true
	})
	
	watch(()=>userStore.getCollect,(newVal)=>{
		// console.log(newVal)
		store.value = newVal
		changeShow()
	})
	const gotoCom = (title,id)=>{
		uni.navigateTo({
			url:'/pages/commodity/commodity?obj='+ JSON.stringify({ name:title,id:id})
		})
	}
	
	const gotoShop = (id)=>{
		uni.navigateTo({
			url:'/pages/shop/shop?id='+id
		})
	}
</script>

<style lang="scss" scoped>
	.collect{
		min-height: 100vh;
	}
	.collect-head{
		width: 100%;
		padding: 40rpx;
		display: flex;
		justify-content: center;
		font-weight: 800;
		.head-item{
			background-color: white;
			padding: 18rpx 130rpx;
		}
		.active{
			background-color: $takout-base-color;
			color: white;
		}
	}
	.collect-content{
		padding: 0 20rpx;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		.content-item {
			display: flex;
			background-color: white;
			border-radius: 20rpx;
			gap:20rpx;
		}
		.item-img{
			width: 150rpx;
			height: 150rpx;
			margin: 10rpx;
		}
		.item-right{
			padding: 10rpx;
			.jiage{
				font-size: 30rpx;
			}
			.title{
				font-size: 32rpx;
				font-weight: 800;
			}
			.time{
				font-size: 28rpx;
				padding: 5rpx 0;
			}
			.area{
				font-size: 28rpx;
				color: $takeout-font-color-2;
			}
		}
	}
</style>

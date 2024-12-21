<template>
	<view class="order">
		<view class="order-tab">
			<view :class="{'tab-active':orderType === 'all'}" @click="changeOrderType('all')">
				全部订单
			</view>
			<view :class="{'tab-active':orderType === 'unpay'}" @click="changeOrderType('unpay')">
				待付款
			</view>
			<view :class="{'tab-active':orderType === 'untake'}" @click="changeOrderType('untake')">
				待收货
			</view>
			<view :class="{'tab-active':orderType === 'delivery'}" @click="changeOrderType('delivery')">
				配送中
			</view>
			<view :class="{'tab-active':orderType === 'evaluate'}" @click="changeOrderType('evaluate')">
				待评价
			</view>
		</view>
		<view class="item">
			<order-item v-for="item in showList" :order="item" :key="item.id"></order-item>
		</view>
	</view>
</template>

<script setup>
	import { useOrderStore,useShopsStore } from '@/stores'
	import { ref,watch,computed } from 'vue'
	import { onLoad,onUnload,onShow } from '@dcloudio/uni-app'
	
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
	
	const orderStore = useOrderStore()
	const shopsStore = useShopsStore()
	// 获取的订单是什么类型
	const orderType = ref('all')
	
	// 更改订单的类型
	const changeOrderType = (n)=>{
		orderType.value = n
		// getShowList()
	}
	
	uni.$on('statusChanged',(newVal)=>{
		// console.log(newVal)
		changeOrderType(newVal)
	})
	onUnload(()=>{
		uni.$off('statusChanged')//每次销毁监听，不然重复监听
	})
	// changeOrderType(uni.getStorageSync('status'))
	// 获取订单的数据，处理数据
	const showList = ref([])
	const getShowList = ()=>{
		showList.value = JSON.parse(JSON.stringify(orderStore.getOrderList(orderType.value)))
		showList.value = showList.value.map(item=>{
			item.shopInfo = shopsStore.searchForId(item.sid)
			item.commodity = item.commodity.map(it=>{
				it.name = shopsStore.searchForComId(it.comid).title
				it.price = shopsStore.searchForComId(it.comid).jiage
				it.imgUrl = shopsStore.searchForComId(it.comid).imgUrl
				return it
			})
			return item
		})
		// console.log(showList.value)
	}
	getShowList()
	watch(()=>orderStore.getOrderList(orderType.value),(newVal)=>{
		getShowList()
	},{
		deep:true
	})
</script>

<style lang="scss" scoped>
	.order{
		min-height: 100vh;
		background-color: rgba(0,0,0,0.04);
	}
	.order-tab{
		display: flex;
		justify-content: space-around;
		font-size: 30rpx;
		padding:20rpx 15rpx;
		:nth-child(n){
			padding-bottom: 5rpx;
		}
		.tab-active{
			border-bottom:7rpx solid blue;
			font-weight: 700;
		}
	}

</style>

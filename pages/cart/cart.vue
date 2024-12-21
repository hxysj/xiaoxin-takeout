<template>
	<view class="cart pageBg">
		<cart-item v-for="(value,key) in cartStore.getCart" :item="value" :shopId="parseInt(key)" :key="key" @changeNum="changeItemNum"></cart-item>
	</view>
</template>

<script setup>
	import { useCartStore } from '@/stores';
	import { ref } from 'vue'
	const cartStore = useCartStore()
	
	// 子组件点击修改购物车的数量
	const changeItemNum = ([id,num])=>{
		// console.log(11)
		cartStore.changeComNum(id,num)
	}
</script>

<style lang="scss" scoped>
	.cart{
		padding: 20rpx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

</style>

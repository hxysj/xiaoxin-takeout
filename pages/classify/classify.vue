<template>
	<view class="classify pageBg">
		<search-item>
			<template #place-title>
				<view>搜索你想要的商品或店铺</view>
			</template>
		</search-item>
		<view class="title">
			 --- 商品列表 ---
		</view>
		<view class="sort">
			<uni-data-select
				v-model="sortvalue"
				:localdata="range"
				:clear="false"
			 ></uni-data-select>
		</view>
		<view class="shop" v-if="showList.length">
			<business-item v-for="item in showList" :item="item" :key="item.id"></business-item>
		</view>
		<view class="" v-else>
			<no-data></no-data>
		</view>
	</view>
</template>

<script setup>
	import { onLoad,onReachBottom,onPullDownRefresh } from '@dcloudio/uni-app'
	import { ref,computed } from 'vue'
	import { useShopsStore } from '@/stores';
	const shopsStore = useShopsStore()
	const shopPage  =ref(2)
	const nowPage = ref(0)
	// 要展示的数据
	const shopList = ref([])
	const isSearch = ref(false)
	const cId = ref(0)
	const searchName = ref('')
	onLoad((e)=>{
		// 如果是搜索列表
		// console.log(e)
		if(e.type === 'search'){
			uni.setNavigationBarTitle({
				title:'搜索结果'
			})
			shopList.value = shopsStore.searchForName(e.search,shopPage.value,nowPage.value)
			// console.log(showList.value)
			searchName.value = e.search
			isSearch.value = true
		}else{
			// 设置导航栏的名字
			uni.setNavigationBarTitle({
				title:e.name
			})
			cId.value = parseInt(e.id)
			shopList.value = shopsStore.searchForCid(cId.value,shopPage.value,nowPage.value)
		}
	})
	
	onReachBottom(()=>{
		uni.showLoading({
			title:'加载中...'
		})
		setTimeout(()=>{
			nowPage.value += 1
			if(isSearch.value){
				shopList.value = shopsStore.searchForName(searchName.value,shopPage.value,nowPage.value)
			}else{
				shopList.value = shopsStore.searchForCid(cId.value,shopPage.value,nowPage.value)
			}
			uni.hideLoading()
		},1000)
	})
	onPullDownRefresh(()=>{
		uni.showLoading({
			title:'刷新中...'
		})
		setTimeout(()=>{
			nowPage.value = 0
			if(isSearch.value){
				shopList.value = shopsStore.searchForName(searchName.value,shopPage.value,nowPage.value)
			}else{
				shopList.value = shopsStore.searchForCid(cId.value,shopPage.value,nowPage.value)
			}
			uni.hideLoading()
			uni.showToast({
				title:'刷新成功！'
			})
		},1000)
	})
	
	const showList = computed(()=>{
		if(!shopList.value.length){
			return []
		}
		let obj = JSON.parse(JSON.stringify(shopList.value))
		if(sortvalue.value === 0){
			return obj
		}else if(sortvalue.value === 1){
			return obj.sort((a,b)=>b.payed - a.payed)
		}else if(sortvalue.value === 2){
			return obj.sort((a,b)=>a.minPrice - b.minPrice)
		}else{
			return obj.sort((a,b)=>b.rate - a.rate)
		}
	})
	const sortvalue = ref(0)
	const range = ref([
		{ value: 0, text: "默认排序" },
		{ value: 1, text: "销量最好" },
		{ value: 2, text: "起送价最低" },
		{ value: 3, text: "评价最好" }
	])
	
</script>

<style lang="scss" scoped>
	.classify{
		padding: 10rpx;
		min-height: 100vh;
	}
	.title{
		padding: 20rpx;
		width: 100%;
		text-align: center;
		font-size: 50rpx;
		font-weight: 700;
		color: white;
	}
	.sort{
		margin: 20rpx;
		background-color: white;
		// border-radius:30rpx;
		// overflow: hidden;
	}
	.shop{
		display: flex;
		flex-direction: column;
		align-items: center;
	}

</style>

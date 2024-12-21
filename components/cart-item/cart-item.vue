<template>
	<view class="cart-item">
		<view class="cart-header">
			<view class="">
				{{shopsStore.searchForId(shopId)?.name}}
			</view>
			<uni-icons type="trash-filled" size="20" @click="deleteCartItem(showList)"></uni-icons>
		</view>
		<view v-if="showList.length">
			<view class="item-all" v-for="it in showList"
				:key="it.id" 
				@touchstart="touchStart"
				@touchend="touchEnd($event,it.id)"
			>
				<!-- {{it}} -->
				<view class="item" :style="{ 'right':it.right +'rpx' }">
					<view class="item-left">
						<image class="left-img" :src="shopsStore.searchForComId(it.comid).imgUrl" mode="aspectFill"></image>
					</view>
					<view class="item-right">
						<view class="right-top">
							<view class="top-name">
								{{shopsStore.searchForComId(it.comid).title}}
							</view>
							<view class="top-specs" v-if="it.specsList && it.specsList.length">
								<view class="" v-for="specs in it.specsList">
									{{specs}}
								</view>
							</view>
						</view>
						<view class="right-bottom">
							<view class="price">
								￥{{shopsStore.searchForComId(it.comid).jiage}}
							</view>
							<view class="num">
								<uni-icons type="minus-filled" @click="item_changeNum(it.id,-1,it.num)" color="#6299ff" size="25"></uni-icons>
								{{it.num}}
								<uni-icons type="plus-filled" @click="item_changeNum(it.id,1,it.num)" color="#6299ff" size="25"></uni-icons>
							</view>
						</view>
					</view>
				</view>
				<view class="item-rm" :style="{ 'right':it.btnRight +'rpx' }" @click="removeCartItem(it.id)">
					删除
				</view>
			</view>
		</view>
		<view class="noData" v-else>
			<no-data>
				<template #data>
					<view>购物车为空</view>
				</template>
			</no-data>
		</view>
		<view class="all">
			<view class="">
				<view class="allPrice">
					合计：￥{{allPrice}}
				</view>
				<view class="">
					<button v-if="allPrice>= minPrice" class="buy" @click="clickbuy" :disabled="!item.length">结算</button>
					<button v-else class="noBuy" disabled>{{minPrice}} 起送</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed,ref,watch } from 'vue'
	//接受父组件传递过来的数据
	const props = defineProps({
		item:{
			type:Array
		},
		shopId:{
			type:Number
		}
	})
	const showList = ref([])
	watch(()=>props.item,(newItem)=>{
		showList.value = newItem.map(item=>{
			item.right = 0
			item.btnRight = -200
			return item
		})
	},{
		immediate:true
	})
	const cartItem = ref(null)
	const startX = ref(0)
	const touchStart = (e)=>{
		startX.value = e.touches[0].clientX; 
	}
	
	const touchEnd = (e,id)=>{
		let deltaX = e.changedTouches[0].clientX - startX.value;
		if(deltaX === 0){
			return
		}
		if(deltaX > 0){
			showList.value = showList.value.map(item=>{
				if(item.id === id){
					item.right = 0
					item.btnRight = -200
				}
				return item
			})
		}else{
			showList.value = showList.value.map(item=>{
				if(item.id === id){
					item.right = 200
					item.btnRight = 0
				}
				return item
			})
		}
		// console.log(rmBtn)
	}
	const removeCartItem = (id)=>{
		uni.showModal({
			content:'确定删除吗？',
			success(msg) {
				if(msg.confirm){
					cartStore.deleteCart(id)
					showList.value = showList.value.filter(item=>item.id !==id)
					uni.showToast({
						icon:'success',
						title:"删除成功"
					})
				}
			}
		})
	}
	
	// ----------------------------
	// console.log(showList.value,props.item)
	const emits = defineEmits(['changeNum'])
	import { useShopsStore,useCartStore } from '@/stores';
	const shopsStore = useShopsStore()
	const cartStore = useCartStore()
	
	// 需要满足的最低价格
	const minPrice = computed(()=>shopsStore.searchForId(props.shopId)?.minPrice)
	// console.log(shopsStore.searchForId(props.shopId).minPrice)
	// 总价
	const allPrice = computed(()=>props.item.reduce((a,b)=>a+b.num * shopsStore.searchForComId(b.comid).jiage,0))
	// console.log(allPrice)
	// --------------------------------------
	// 删除选择的内容
	const deleteCartItem = (item)=>{
		item.forEach(it=>{
			cartStore.deleteCart(it.id)
		})
		uni.showToast({
			icon:'success',
			title:"删除成功"
		})
	}
	// --------------------------------
	// 点击修改数量
	const item_changeNum = (id,n,num)=>{
		if(num === 1 && n === -1){
			return
		}
		// console.log(id,n)
		emits('changeNum',[id,n+num])
	}
	// -------------------------------
	// 点击进行结算付款
	const clickbuy = ()=>{
		// 如果购物车为空则退出
		if(!props.item.length){
			return
		}
		// 设置临时的想要购买的商品信息
		// console.log(props.item)
		cartStore.setwantPay(props.item)
		uni.navigateTo({
			url:'/pages/payed/payed?sid='+props.shopId
		})
	}
	// -----------------------------
	
</script>

<style lang="scss" scoped>
	.cart-item{
		background-color: white;
		padding: 20rpx;
		border-radius: 15rpx;
		.cart-header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			padding:  0 10rpx;
			padding-bottom: 20rpx;
			width: 100%;
			& :first-child{
				width: 400rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow:ellipsis;
			}
			border-bottom: 1rpx dashed #e2e2e2;
		}
		.item-all{
			display: flex;
			padding-top: 10rpx;
			position: relative;
			overflow: hidden;
		}
		.item-rm{
			width: 130rpx;
			height: 100rpx;
			top: 0;
			display: flex;
			margin: 50rpx 5rpx;
			border-radius: 20rpx;
			align-items: center;
			font-size: 28rpx;
			font-weight: 800;
			justify-content: center;
			background-color: red;
			color: white;
			position: absolute;
			right: -200rpx;
		}
		.item{
			display: flex;
			position: relative;
			width: 100%;
			right: 0rpx;
			.item-left{
				.left-img{
					width:155rpx;
					height: 155rpx;
					margin: 10rpx;
				}
			}
			.item-right{
				// flex: 1;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.right-top{
					display: flex;
					flex-direction: column;
					.top-name{
						width: 280rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;							
					}
					.top-specs{
						display: flex;
						font-size: 25rpx;
						padding: 5rpx;
						color: $takeout-font-color-1;
						gap: 10rpx;
					}
				}
				.right-bottom{
					width: 100%;
					display: flex;
					justify-content: space-between;
					.price{
						font-size: 40rpx;
						color: red;
					}
					.num{
						display: flex;
						align-items: center;
						gap: 25rpx;
					}
				}
			}
		}
		.all{
			display: flex;
			justify-content: flex-end;
			& :first-child{
				display: flex;
				gap: 20rpx;
				align-items: center;
			}
			.buy{
				width: 125rpx;
				height: 55rpx;
				background-color: $takout-base-color;
				color: white;
				font-size: 25rpx;
				display: flex;
				justify-content: center;
			}
			.noBuy{
				width: 200rpx;
				height: 55rpx;
				background-color: rgba(0,0,0,0.3);
				color: rgba(0,0,0,0.6);
				font-size: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
<template>
	<view class="address-item">
		<view class="item-left">
			<view class="name">
				联系人：{{item.name}}
			</view>
			<view class="phone">
				电话：{{item.phone}}
			</view>
			<view class="area">
				地址：{{item.headAddress + '-' + item.address}}
			</view>
		</view>
		<view class="item-right">
			<view class="default-color" v-if="item.default">
				默认地址
			</view>
			<view  v-else @click="setDefault(item.id)" v-show="canEdit">
				设为默认
			</view>
			<view class="right-2" v-show="item.tag">
				{{item.tag}}
			</view>
			<view class="rihgt-last" v-show="canEdit">
				<uni-icons type="compose" color="red" size="22" @click="editAddress(item.id)"></uni-icons>
				<uni-icons type="trash-filled" color="red" size="22" @click="deleteAdd(item.id)"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		item:Object,
		canEdit:{
			type:Boolean,
			default:true
		}
	})
	import { useUserStore } from '@/stores/index.js'
	const userStore = useUserStore()
	// 删除地址
	const deleteAdd = (id)=>{
		uni.showModal({
			content:"你确定要删除该地址吗？",
			title:'温馨提示',
			success:(res)=>{
				if(res.confirm){
					userStore.deleteAddress(id)
					uni.showToast({
						title:"删除成功",
						icon:'none'
					})
				}
			}
		})
	}
	// 设置为默认地址
	const setDefault = (id)=>{
		uni.showModal({
			content:'要将此地址设置为默认地址吗？',
			title:'温馨提示',
			success:(res)=>{
				if(res.cancel) return
				userStore.setDefault(id)
				uni.showToast({
					title:'设置成功！',
					icon:'none'
				})
			}
		})
	}
	// 编辑地址
	const editAddress = (id)=>{
		uni.navigateTo({
			url:'/pages/add-address/add-address?id='+id
		})
	}
</script>

<style lang="scss" scoped>
	.address-item{
		display: flex;
		background-color: white;
		margin:20rpx 0;
		padding: 15rpx;
		min-height: 180rpx;
		align-items: center;
		font-size: 30rpx;
		justify-content: space-around;
		// width: 100%;
		.item-left{
			display: flex;
			flex-direction:column;
			gap:10rpx;
			color: #8a8a8a;
			width: 500rpx;
			margin-bottom: 25rpx;
			align-items: flex-start;
			.area{
				margin-bottom: 15rpx;
			}
		}
		.item-right{
			display: flex;
			flex-direction: column;
			align-items:center;
			gap: 10rpx;
			.default-color{
				color:$takout-base-color;
			}
		}
		.right-2{
			background-color: $takout-base-color;
			padding:5rpx 25rpx;
			color: white;
			text-align: center;
			border-radius: 20rpx;
			font-size: 22rpx;
		}
		.rihgt-last{
			display: flex;
			justify-content:center;
		}
	}
</style>
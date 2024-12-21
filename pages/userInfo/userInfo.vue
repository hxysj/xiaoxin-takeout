<template>
	<view>
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="chooseavatar">
		  <image class="avatar" :src="avatarUrl"></image>
		</button> 
		<view class="nickname-input">
			<view class="">
				昵称：
			</view>
			<view class="">
				<input type="nickname" :value="nickname" @change="inputChange" class="weui-input" placeholder="请输入昵称"/>
			</view>
		</view>
		<view class="submit">
			<button class="submit-btn" @click="submitChange">确定</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { useUserStore } from '@/stores';
	const userStore = useUserStore()
	const avatarUrl = ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')
	const nickname = ref('');
	const id = uni.getStorageSync('token')
	const chooseavatar = (e) => {
		console.log(e)
		avatarUrl.value = e.detail.avatarUrl
	};
	
	const inputChange = (e)=>{
		nickname.value = e.target.value
	}
	
	const submitChange = ()=>{
		userStore.changeUserInfo(id,nickname.value,avatarUrl.value)
		uni.showToast({
			title:'修改成功！'
		})
		setTimeout(()=>{
			uni.switchTab({
				url:'/pages/user/user'
			})
		},1000)
		
	}
	
</script>

<style lang="scss" scoped>
	.avatar-wrapper {
	  padding: 0;
	  width: 56px !important;
	  border-radius: 8px;
	  margin-top: 40px;
	  margin-bottom: 40px;
	}
	.weui-input{
		margin: 18rpx;
		padding: 20rpx;
		background-color: rgba(0,0,0,0.05);
	}
	.avatar {
	  display: block;
	  width: 56px;
	  height: 56px;
	}
	
	.container {
	  display: flex;
	}
	.submit{
		margin: 30rpx;
		.submit-btn{
			background:$takeout-button-cart-color;
			color: white;
		}
	}
	.nickname-input{
		display: flex;
		align-items: center;
		border-top: 0.5rpx solid rgba(0,0,0,0.1);
		border-bottom: 0.5rpx solid rgba(0,0,0,0.1);
		padding-left: 50rpx;
	}
</style>

<template>
	<view class="user pageBg">
		<custom-nav-bar></custom-nav-bar>
		<view class="header">
			<view class="uimg">
				<image v-if="!isLogin" src="@/static/images/default.png" mode="aspectFill"></image>
				<image v-else :src="userStore.getUserInfo?.icon" mode="aspectFill"></image>
			
			</view>
			<view class="info" v-if="isLogin">
				<view class="name">
					{{userStore.getUserInfo?.name}}
				</view>
				<view class="id">
					ID:{{ userStore.getUserInfo?.id}}
				</view>
			</view>
			<view class="info" v-else @click="login">
				<view class="name">
					未登录(点击登录)
				</view>
				<view class="id">
					ID: ********
				</view>
			</view>
		</view>
		<view class="account">
			<view class="account-item">
				<view class="item-num">
					{{ userStore.getUserInfo?.balance ?? 0 }}
				</view>
				<view class="item-title">
					余额
				</view>
			</view>
			<view class="account-item" @click="gotoCoupon()">
				<view class="item-num">
					{{userStore.getCoupon.filter(item=>!item.isuse).length ?? 0}}
				</view>
				<view class="item-title">
					优惠
				</view>
			</view>
			<view class="account-item">
				<view class="item-num">
					0
				</view>
				<view class="item-title">
					积分
				</view>
			</view>
		</view>
		<view class="myOrder">
			<view class="order-head">
				<view class="head-left">
					<uni-icons custom-prefix="iconfont" type="icon-quanbudingdan" size="20"></uni-icons>
					我的订单
				</view>
				<view class="head-right" @click="gotoOrder('all')">
					查看全部订单
					<uni-icons type="right" color="#b9b9b9"></uni-icons>
				</view>
			</view>
			<view class="order-classify">
				<view class="order-item" @click="gotoOrder('unpay')">
					<view class="">
						<uni-icons custom-prefix="iconfont" type="icon-weibiaoti2fuzhi04" size="30"></uni-icons>
					</view>
					<view class="">
						待付款
					</view>
				</view>
				<view class="order-item" @click="gotoOrder('untake')">
					<view class="">
						<uni-icons custom-prefix="iconfont" type="icon-daipinglun" size="30"></uni-icons>
					</view>
					<view class="">
						待收货
					</view>
				</view>
				<view class="order-item" @click="gotoOrder('delivery')">
					<view class="">
						<uni-icons custom-prefix="iconfont" type="icon-peisongzhong" size="30"></uni-icons>
					</view>
					<view class="">
						配送中
					</view>
				</view>
				<view class="order-item" @click="gotoOrder('evaluate')">
					<view class="">
						<uni-icons  type="chat" size="30"></uni-icons>
					</view>
					<view class="">
						待评论
					</view>
				</view>
				<!-- <view class="order-item" @click="gotoOrder('finish')">
					<view class="">
						<uni-icons custom-prefix="iconfont" type="icon-dingdan-yiwancheng" size="30"></uni-icons>
					</view>
					<view class="">
						已完成
					</view>
				</view> -->
			</view>
		</view>
		<view class="other">
			<view class="other-item" @click="gotoCoupon">
				<view class="item-left">
					<uni-icons custom-prefix="iconfont" type="icon-youhuiquan" size="25" color="#5b1aff"></uni-icons>
					优惠券
				</view>
				<view class="">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="other-item" @click="gotoAddress">
				<view class="item-left">
					<uni-icons custom-prefix="iconfont" type="icon-xiangxidizhi" size="25" color="#e38f45"></uni-icons>
					我的地址
				</view>
				<view class="">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</view>
		<view class="other">
			<view class="other-item" @click="gotoCollect">
				<view class="item-left">
					<uni-icons custom-prefix="iconfont" type="icon-shoucang" size="25" color="#ff4517"></uni-icons>
					我的收藏
				</view>
				<view class="">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="other-item" @click="gotoMember">
				<view class="item-left">
					<uni-icons custom-prefix="iconfont" type="icon-renzhengyonghu" size="25" color="#2fafff"></uni-icons>
					会员中心
				</view>
				<view class="">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</view>
		<view class="other">
			<view class="other-item">
				<view class="item-left">
					<uni-icons custom-prefix="iconfont" type="icon-dianhua" size="25" color="#00cb00"></uni-icons>
					平台客服
					<button open-type="contact" class="left-call">123123</button>
				</view>
				<view class="">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</view>
		<!-- customer-service -->
		<view class="loginOut" v-show="isLogin">
			<button class="outbtn" @click="outLogin">退出登陆</button>
		</view>
	</view>
</template>

<script setup>
	import { useUserStore } from '@/stores'
	import { ref,computed, watch } from 'vue'
	import { onShow,onLoad } from '@dcloudio/uni-app'
	const userStore = useUserStore()
	// 点击跳转到订单页面
	const gotoOrder = (n)=>{
		// 页面的先注册uni.$on 后uni.$emit才能使用
		setTimeout(()=>{
			uni.$emit('statusChanged', n);
		},500)
		uni.switchTab({
			url:"/pages/oders/oders"
		})
	}
	
	// 点击跳转到优惠卷页面
	const gotoCoupon = ()=>{
		uni.switchTab({
			url:'/pages/coupon/coupon'
		})
	}
	// 点击跳转到地址页面
	const gotoAddress = ()=>{
		uni.navigateTo({
			url:'/pages/address/address'
		})
	}
	// 检查是否登录
	const isLogin = ref(uni.getStorageSync('token'))
	
	
	console.log(userStore.getUserInfo)
	// ---------------------------------------
	const appId = '****'
	const appSecret = '****'
	// 登录功能
	const login = ()=>{
		uni.showModal({
			title:'使用微信一键登录',
			success:(msg)=>{
				if(msg.confirm){
					uni.showLoading({
						title:'登录中...'
					})
					uni.login({
						provider:'weixin'
					}).then(res=>{
						// console.log(res)
						getWeiXinLogin(res.code)
					})
				}
			}
		})
	}
	
	const getWeiXinLogin = (code)=>{
		let result = ''
		uni.request({
			url:`https://api.weixin.qq.com/sns/jscode2session`,
			method:'GEt',
			data:{
				grant_type:'authorization_code',
				js_code:code,
				ssecret:appSecret,
				appid:appId
			}
		}).then(res=>{
			console.log(res)
			uni.setStorageSync('token','34342342')
			if(res.statusCode === 200){
				uni.hideLoading()
				// console.log(res)
				uni.showToast({
					title:'登录成功',
				})
				// if(userStore.getUserInfo)
				isLogin.value = true
				if(userStore.getUserInfo.name === 'xiaoxin' && userStore.getUserInfo.icon === '/static/images/xiaoxin.png'){
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/userInfo/userInfo'
						})
					})
				}else{				
					setTimeout(()=>{
						uni.reLaunch({
						  url: '/pages/index/index'
						});
					},1000)
				}
			}
		})
		return result
	}
	
	// ---------------------------------------
	const outLogin = ()=>{
		uni.showModal({
			title:'确定要退出登录吗？',
			success(msg) {
				if(msg.confirm){
					uni.removeStorageSync('token')
					uni.showToast({
						title:'退出登录成功',
					})
					setTimeout(()=>{
						uni.reLaunch({
						  url: '/pages/index/index'
						});
					},1000)
				}
			}
		})
	}
	// ---------------------------------------
	// 检测登录状态
	onLoad(()=>{
		wx.checkSession({
			success(res){
				console.log('已经登录')
			},
			fail(res){
				if(uni.getStorageSync('token')){
					uni.showToast({
						title:'登录失效！',
						icon:'none'
					})
					uni.removeStorageSync('token')
				}else{
					uni.showToast({
						title:'未登录',
						icon:'none'
					})
				}
				isLogin.value = ''
			}
		})
	})
	
	
	// ----------------------------------------
	// 点击跳转到我的收藏页面
	const gotoCollect = ()=>{
		uni.navigateTo({
			url:'/pages/collect/collect'
		})
	}
	// 点击挑战到会员中心
	const gotoMember = ()=>{
		if(!isLogin.value){
			uni.showToast({
				title:'未登录！',
				icon:'error'
			})
			return
		}
		uni.navigateTo({
			url:'/pages/member/member'
		})
	}
</script>

<style lang="scss" scoped>
	.user{
		min-height: 100vh;
		.header{
			height: 210rpx;
			display: flex;
			align-items: center;
			padding: 20rpx;
			.uimg{
				margin: 20rpx;
				image{
					width: 114rpx;
					height: 114rpx;
					border-radius: 50%;
				}
			}
			.info{
				.name{
					width: 400rpx;
					// border:1rpx solid black;
					padding: 5rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 30rpx;
				}
				.id{
					padding: 5rpx;
				}
			}
		}
		.account{
			width: 100%;
			height: 140rpx;
			background-color: white;
			display: grid;
			align-items: center;
			grid-template-columns: repeat(3,1fr);
			.account-item{
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				.item-num{
					font-size: 45rpx;
					color: red;
				}
				.item-title{
					font-size: 30rpx;
				}
			}
			& :last-child{
				border:none;
			}
		}
		.myOrder{
			margin: 10rpx 0;
			padding: 10rpx;
			background-color: white;
			.order-head{
				padding: 10rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.head-left{
				display: flex;
				align-items: center;
				gap: 10rpx;
			}
			.head-right{
				display: flex;
				align-items: center;
				gap: 10rpx;
				color: #b9b9b9;
				font-size: 25rpx;
			}
			.order-classify{
				padding: 10rpx;
				display: grid;
				grid-template-columns: repeat(4,1fr);
				.order-item{
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
		}
		.other{
			width: 100%;
			margin: 15rpx 0;
			.other-item{
				display: flex;
				justify-content: space-between;
				width: 100%;
				align-items: center;
				padding:30rpx 15rpx;
				margin: 2.5rpx 0;
				background-color: white;
				.item-left{
					display: flex;
					align-items: center;
					gap: 10rpx;
					position: relative;
					.left-call{
						position: absolute;
						left: 0;
						top: -20rpx;
						opacity: 0;
						width: 700rpx;
					}
				}
			}
		}
		.loginOut{
			padding: 10rpx;
			.outbtn{
				background-color: $takout-base-color;
				color: white;
			}
		}
	}

</style>

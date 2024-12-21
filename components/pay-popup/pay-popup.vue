<template>
	<view>
		<uni-popup ref="payPopup" type="bottom" :is-mask-click="false">
			<view class="pay-popup">
				<view class="popup-one" v-if="!isPwd">
					<view class="price">
						￥{{price}}
						<view class="">
							<uni-data-select
							      v-model="value"
							      :localdata="range"
								  :clear="false"
							    ></uni-data-select>
						</view>
					</view>
					<button class="btn btn-1" @click="gotoPay">确认支付</button>
					<button class="btn btn-2" @click="cancelPay">取消</button>
				</view>
				<view class="pwd" v-else>
					<view class="pwd-title">
						请输入支付密码
					</view>
					<view class="pwd-all-inp">
						<template v-for="index in 6" :key="index">
							<input type="text" class="pwd-inp" v-model="password[index-1]"/>
						</template>
					</view>
					<my-keyboard :len="6" v-model="password"></my-keyboard>
				</view>
				<view class="popup-close" @click="cancelPay">
					x
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref,watch,nextTick } from 'vue'
	import { useUserStore,useOrderStore } from '@/stores'
	import { getNowTime } from '@/utils/utils.js'
	const userStore = useUserStore()
	const orderStore = useOrderStore()
	const props = defineProps({
		// 订单的总价格
		price:{
			type:Number
		},
		// 订单的id
		id:{
			type:Number
		},
		// 店铺的名字
		shopName:{
			type:String
		},
		// 支付的方式
		payMethod:{
			type:String,
			default:'qbpay'
		}
	})
	// console.log(props.payMethod)
	// getUserInfo
	// 是否显示输入密码页面
	const isPwd = ref(false)
	// 支付方式
	const value = ref('qbpay')
	watch(()=>props.payMethod,(newVal)=>{
		value.value = newVal
	},{
		immediate:true
	})
	const range = ref([
        { value: 'qbpay', text: "余额支付" },
        { value: 'wxpay', text: "微信支付" }
    ])
	// 绑定弹层
	const payPopup = ref(null)
	// 打开弹层
	const clickpay = ()=>{
		// 初始化组件
		isPwd.value = false
		password.value = ''
		payPopup.value.open()
	}
	// 取消支付
	const cancelPay = ()=>{
		uni.showModal({
			title:'确定取消支付吗？',
			success(msg){
				if(msg.confirm){
					payPopup.value.close()
					uni.navigateTo({
						url:'/pages/order-detail/order-detail?id=' + props.id
					})
				}
			}
		})
	}
	// 确定支付，继续下一步，输入密码
	const gotoPay = ()=>{
		if(value.value === 'qbpay'){
			isPwd.value = true
		}else{
			uni.showToast({
				title:'微信支付尚未开通，请使用余额支付！',
				icon:'none'
			})
		}
	}
	// 验证密码
	const valdatePwd = ()=>{
		// console.log(userStore.getUserInfo)
		if(userStore.getUserInfo.payPasswd === password.value){
			if(userStore.getUserInfo.balance < props.price){
				uni.showToast({
					title:'支付失败，余额不足！',
					icon:'none'
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/order-detail/order-detail?id=' + props.id
					})
				},1000)
			}else{
				userStore.updateBalance(props.price)
				uni.showToast({
					title:'支付成功!'
				})
				userStore.addTransaction({
					id:+ new Date(),
					balance:props.price,
					title:props.shopName,
					createTime:getNowTime()
				})
				orderStore.changeStatus(props.id,'untake')
				uni.navigateTo({
					url:'/pages/order-detail/order-detail?id=' + props.id
				})
			}
			payPopup.value.close()
		}else{
			password.value = ''
			uni.showToast({
				title:'密码错误！，请重新输入',
				icon:'none'
			})
		}
	}
	defineExpose({
		clickpay
	})
	
	// 绑定支付密码
	const password = ref('')
	// 监听密码的变化
	watch(password,(newVal)=>{
		if(newVal.length === 6){
			uni.showLoading({
				title:'验证中'
			})
			setTimeout(()=>{
				uni.hideLoading()
				valdatePwd()
			},1200)
			return
		}
	})
</script>

<style lang="scss" scoped>
	.pay-popup{
		background-color: white;
		min-height: 250rpx;
		position: relative;
	}
	.popup-one{
		// display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		.price{
			width: 100%;
			text-align: center;
			padding: 100rpx;
			font-size: 46rpx;
			font-weight: 800;
			color: $takout-base-color;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10rpx;
			:deep(.uni-select){
				width: 220rpx;
			}
		}
		.btn{
			font-size: 30rpx;
		}
		.btn-1{
			background-color: $takout-base-color;
			color: white;
		}
	}
	.pwd-title{
		padding: 30rpx;
		width: 100%;
		// align-items: center;
		display: flex;
		justify-content: center;
		font-size: 40rpx;
	}
	.pwd-all-inp{
		display: flex;
		width: 100%;
		justify-content: center;
		padding: 50rpx 15rpx;
		gap: 10rpx;
		.pwd-inp{
			width: 200rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			border:5rpx solid black;
			text-align: center;
			font-size: 60rpx;
		}
	}
	.popup-close{
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		display: flex;
		width: 70rpx;
		height: 70rpx;
		font-size: 35rpx;
		justify-content: center;
		border-radius: 50rpx;
		align-items: center;
		border: 1rpx solid #eeeeee;
	}
</style>
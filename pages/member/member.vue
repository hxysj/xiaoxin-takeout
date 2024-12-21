<template>
	<view class="member pageBg">
		<view class="userInfo">
			<view class="">
				<image class="info-img" :src="userStore.getUserInfo.icon" mode="aspectFill"></image>
			</view>
			<view class="info-name">
				昵称：{{userStore.getUserInfo.name}}
			</view>
			<view class="info-id">
				ID：{{userStore.getUserInfo.id}}
			</view>
		</view>
		<view class="member-item">
			<view class="item-title">
				会员信息
			</view>
			<view class="item-content">
				<view class="item-item">
					<view class="">
						开通日期：2024-06-10 16:28:00
					</view>
				</view>
				<view class="item-line"/>
				<view class="item-item">
					<view class="">
						充值金额：<text class="recharge">{{userStore.getUserInfo.recharge}}</text>
					</view>
				</view>
				<view class="item-line"/>
				<view class="item-item">
					<view class="">
						消费金额：<text class="isuse">{{userStore.getUserInfo.consumption}}</text>
					</view>
					
				</view>
				<view class="item-line"/>
				<view class="item-item">
					<view>
						会员余额：<text class="balnace">{{userStore.getUserInfo.balance}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="member-item">
			<view class="item-title">
				消费信息
			</view>
			<view class="item-content">
				<view class="item-item" @click="openTransaction">
					<view class="">
						会员记录
					</view>
					<view class="">
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="member-item">
			<view class="item-title">
				在线充值
			</view>
			<view class="item-content">
				<template v-for="(item,index) in rechargeList" :key="index">
					<view class="item-item" @click="recharget(item)">
						<view class="">
							充值{{item}}
						</view>
						<view class="">
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
					<view class="item-line" v-if="index < rechargeList.length-1"/>
				</template>
			</view>
		</view>
		<view class="member-item">
			<view class="item-title">
				会员套餐
			</view>
			<view class="item-content">
				<template v-for="(item,index) in packageList" :key="index">
					<view class="item-item" @click="recharget(item)">
						<view class="">
							{{item.title}}
						</view>
						<view class="">
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
					<view class="item-line" v-if="index < packageList.length-1"/>
				</template>
			</view>
		</view>
		<uni-popup ref="transaction">
			<view class="transaction">
				<view class="title">
					交易记录
				</view>
				<view class="value">
					<view class="value-item" v-for="item in userStore.getUserTransaction" :key="item.id">
						<view class="time">
							{{item.createTime}}
						</view>
						<view class="">
							{{item.title}}
						</view>
						<view class="add-price" v-if="item.title=='用户充值'">
							+￥{{item.balance.toFixed(2)}}
						</view>
						<view class="price" v-else>
							-￥{{item.balance.toFixed(2)}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<safe-bottom></safe-bottom>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { useUserStore,useCouponStore } from '@/stores'
	import { getNowTime } from '@/utils/utils';
	const userStore = useUserStore()
	const couponStrore = useCouponStore()
	// 可充值的金额
	const rechargeList = ref([200,150,100,50])
	
	
	// 套餐充值
	const packageList = ref([
		{
			id:12312,
			pay:95,
			getbalance:100,
			title:'充95得100 送2张立减10优惠卷',
			key:'9087123',
			num:2
		},
		{
			id:12313,
			pay:180,
			getbalance:200,
			title:'充180得200 送2张立减15优惠卷',
			key:'9087100',
			num:2
		}
	])
	
	// 进行充值
	const recharget = (value)=>{
		let balance = ref(0)
		let pay = ref(0)
		let obj = ref({})
		if(value instanceof Object){
			balance.value = value.getbalance
			pay.value = value.pay
			obj.value = couponStrore.getCouponForKey(value.key)
		}else{
			balance.value = value
			pay.value = value
		}
		// console.log(value)
		// 确定对账号进行充值吗
		uni.showModal({
			title:'确定对账户进行充值吗？',
			success(msg){
				if(msg.confirm){
					if(value instanceof Object){
						for(let i =0;i<value.num;i++){
							setTimeout(()=>{
								userStore.addNewCoupon(obj.value.id)
							},2000)
						}
					}
					userStore.addUserBalance(balance.value)
					userStore.addTransaction({
						id:+ new Date(),
						balance:balance.value,
						title:`用户充值`,
						createTime:getNowTime()
					})
					uni.showToast({
						title:'充值成功！'
					})
				}
			}
		})
	}
	
	const transaction = ref(null)
	// console.log(userStore.getUserTransaction)
	const openTransaction = ()=>{
		transaction.value.open('bottom')
	}
</script>

<style lang="scss" scoped>
	.member{
		min-height: 100vh;
		padding: 20rpx;
		.userInfo{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.info-img{
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
			}
			.info-name{
				font-size: 30rpx;
				font-weight: 800;
			}
			.info-id{
				font-size: 25rpx;
				color: $takeout-font-color-2;
			}
		}
		.member-item{
			margin: 20rpx 0;
			.item-title{
				font-size: 33rpx;
				font-weight: 750;
			}
			.item-content{
				margin-top: 20rpx;
				border-radius: 15rpx;
				border: 1rpx solid rgba(0,0,0,0.3);
				background-color: white;
				.item-item{
					font-size: 28rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 10rpx;
					padding: 20rpx;
					.balnace{
						color: $takout-base-color;
						font-weight: 600;
					}
					.isuse{
						color: red;
						font-weight: 600;
					}
					.recharge{
						color: #ff8d3c;
						font-weight: 600;
					}
				}
				.item-line{
					// border-color: ;
					border-bottom: none;
					border-top: 0.5rpx solid rgba(0,0,0,0.3);
					width: 100%;
				}
			}
		}
		.transaction{
			min-height: 400rpx;
			max-height: 800rpx;
			overflow-y: scroll;
			background-color: white;
			// display: flex;
			// flex-direction: column;
			.title{
				width: 100%;
				display: flex;
				justify-content: center;
				padding: 25rpx;
				font-size: 35rpx;
				font-weight: 800;
			}
			.value{
				// padding: 10rpx 0rpx;
				padding:0 10rpx;
				.value-item{
					margin:15rpx 20rpx;
					font-size: 30rpx;
					display: grid;
					grid-template-columns: 5fr 4fr 3fr;
					align-items: center;
					.time{
						font-size: 25rpx;
						color: rgba(0,0,0,0.5);
					}
					.price{
						color: red;
					}
					.add-price{
						color:$takout-base-color ;
					}
				}
			}
		}
	}

</style>

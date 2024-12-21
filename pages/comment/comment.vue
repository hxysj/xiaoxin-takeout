<template>
	<view class="pageBg comment">
		<custom-nav-bar>
			<template #tab>
				<view class="goBack" @click="goBack">
					<uni-icons type="left" color="white"></uni-icons>
				</view>
			</template>
			<template #title>
				评论
			</template>
		</custom-nav-bar>
		<view class="comment-content">
			<view class="content-head">
				<view class="head-left">
					您对菜品满意吗？
				</view>
				<view class="head-right">
					<checkbox-group name="" @change="changeChoose">
						<label>
							<text>匿名提交</text><checkbox class="head-check" value="true" />
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="content-commodity">
				<!-- {{commodity}} -->
				<view class="commodity-item" v-for="item in commodity" :key="item.comid">
					<view class="">
						<image :src="item.icon" class="commodity-img" mode=""></image>
					</view>
					<view class="">
						<view class="right-title">
							{{item.name}}
						</view>
						<view class="right-spces">
							<text v-for="(it,index) in item.specsList" :key="index">
								{{it}} {{ index < item.specsList.length-1 ? '、' : ''}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="content-rate">
				<view class="rate-item item-all">
					<view class="">
						总体
					</view>
					<view class="">
						<uni-rate allow-half v-model="rateList.all" size="35" @change="changeRate('all')"/>
					</view>
					<!-- {{rateList.all}} -->
					<view class="" v-if="rateList.all">
						{{checkRate(rateList.all)}}
					</view>
				</view>
				<view class="rate-item item-value" v-if="rateList.all">
					<view class="">
						口味
					</view>
					<view class="">
						<uni-rate allow-half v-model="rateList.taste" size="25" :margin="10"  @change="changeRate('noall')"/>
					</view>
					<!-- {{rateList.all}} -->
					<view class="" v-if="rateList.taste">
						{{checkRate(rateList.taste)}}
					</view>
				</view>
				<view class="rate-item item-value" v-if="rateList.all">
					<view class="">
						分量
					</view>
					<view class="">
						<uni-rate allow-half v-model="rateList.quantity" size="25" :margin="10"  @change="changeRate('noall')"/>
					</view>
					<!-- {{rateList.all}} -->
					<view class="" v-if="rateList.quantity">
						{{checkRate(rateList.quantity)}}
					</view>
				</view>
				<view class="rate-item item-value" v-if="rateList.all">
					<view class="">
						包装
					</view>
					<view class="">
						<uni-rate allow-half v-model="rateList.pack" size="25" :margin="10"  @change="changeRate('noall')"/>
					</view>
					<!-- {{rateList.all}} -->
					<view class="" v-if="rateList.pack">
						{{checkRate(rateList.pack)}}
					</view>
				</view>
			</view>
			<view class="content-text">
				<textarea name="" id="" cols="30" placeholder="对本次订单进行评价吧!" rows="7" v-model="form.text"></textarea>
			</view>
		</view>
		<view class="comment-submit">
			<view class="submit-item" @click="submit">
				提交评论
			</view>
		</view>
		<safe-bottom></safe-bottom>
	</view>
</template>

<script setup>
	import { goBack } from '@/utils/system'
	import { onLoad } from '@dcloudio/uni-app'
	import { ref,computed } from 'vue'
	import { useOrderStore,useShopsStore,useUserStore,useCommentStore } from '@/stores';
	import { getNowTime } from '@/utils/utils.js'
	const shopsStore = useShopsStore()
	const orderStore = useOrderStore()
	const userStore = useUserStore()
	const commentStore = useCommentStore()
	
	const rateList  = ref({
		'all':0,
		'pack':0,
		'taste':0,
		'quantity':0
	})
	const checkRate = (value)=>{
		if(value ==5){
			return '非常满意'
		}else if(value < 5 && value >3){
			return '满意'
		}else if(value <=3.5 && value >1.5){
			return '一般'
		}else{
			return '差'
		}
	}
	const changeRate = (str) =>{
		if(str === 'all'){
			rateList.value.pack = rateList.value.all
			rateList.value.taste = rateList.value.all
			rateList.value.quantity = rateList.value.all
		}else{
			rateList.value.all = (rateList.value.quantity + rateList.value.taste + rateList.value.pack)/3
		}
	}
	// -----------------------------------
	const form = ref({
		anonymous:false
	})
	
	const changeChoose = (e)=>{
		if(e.detail.value.length){
			form.value.anonymous = true
		}else{
			form.value.anonymous = false
		}
	}
	let orderId = ref('')
	let sid = ref('')
	let commodityList = ref([])
	let commodity = computed(()=>commodityList.value)
	onLoad((e)=>{
		orderId.value = e.id
		// console.log(e.id)
		let orderInfo = ref(orderStore.searchForOid(parseInt(e.id)))
		sid.value = orderInfo.value.sid
		commodityList.value = orderInfo.value.commodity.map(item=>{
			let comInfo = ref(shopsStore.searchForComId(item.comid))
			return {
				comid:item.comid,
				name:comInfo.value.title,
				specsList:item.specsList,
				icon:comInfo.value.imgUrl
			}
		})
		// console.log(commodity.value)
	})
	
	const submit = ()=>{
		form.value.rate = rateList.value.all.toFixed(1)
		if(!form.value.rate){
			uni.showToast({
				title:'请对本次服务进行评分！',
				icon:'none'
			})
			return
		}
		if(!form.value.text){
			uni.showToast({
				title:'请写下您的评语！',
				icon:'none'
			})
			return
		}
		form.value.createTime = getNowTime()
		form.value.sid = sid.value
		if(!form.value.anonymous){
			form.value.userInfo = {
				name:userStore.getUserInfo.name,
				icon:userStore.getUserInfo.icon
			}
		}else{
			form.value.userInfo = {
				name:'匿名用户',
				icon:'/static/images/default.png'
			}
		}
		// console.log(form.value)
		commentStore.addNewComment(form.value)
		orderStore.changeStatus(parseInt(orderId.value),'finish')
		uni.navigateBack()
	}
	
</script>

<style lang="scss" scoped>
	.tab-title{
		font-weight: 800;
		font-size: 40rpx;
		margin-left: 30rpx;
	}
	.comment{
		min-height: 100vh;
	}
	.comment-content{
		margin:30rpx 25rpx;
		padding: 20rpx;
		margin-bottom: 40rpx;
		background-color: white;
		border-radius: 30rpx;
		.content-head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:15rpx 0;
			border-bottom: 1rpx solid rgba(0,0,0,0.09);
			
			.head-left{
				font-size: 35rpx;
			}
			.head-right{
				font-size: 25rpx;
				:deep(.uni-checkbox-input){
					width: 25rpx;
					height: 25rpx;
					margin-left: 10rpx;
				}
				.head-check{
					// width: 25rpx;
					// height: 25rpx;
					margin-left: 10rpx;
				}
			}
		}
		.content-commodity{
			padding: 20rpx;
			.commodity-item{
				background-color: rgba(0,0,0,0.02);
				padding: 10rpx 0;
				margin: 5rpx 0;
				display: flex;
				align-items: center;
				gap: 20rpx;
				.commodity-img{
					width: 100rpx;
					height:100rpx;
					border-radius: 20rpx;
					// border: 1rpx solid black;
				}
				.right-title{
					font-weight: 750;
					font-size: 35rpx;
				}
				.right-spces{
					font-size: 28rpx;
					color: $takeout-font-color-2;
				}
			}
		}
		.content-rate{
			padding: 0 20rpx;
			display: flex;
			flex-direction: column;
			gap: 10rpx;
			.rate-item{
				display: flex;
				gap: 20rpx;
				align-items: center;
			}
			.item-value{
				font-size: 30rpx;
				color: $takeout-font-color-2;
			}
		}
		.content-text{
			background-color: rgba(0,0,0,0.05);
			border-radius: 20rpx;
			margin: 18rpx;
			padding: 13rpx;
		}
	}
	.comment-submit{
		position: fixed;
		bottom: 0;
		padding: 20rpx;
		width: 100%;
		.submit-item{
			padding: 20rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 40rpx;
			background: $takeout-button-cart-color;
			color: white;
			border-radius: 25rpx;
		}
	}
</style>

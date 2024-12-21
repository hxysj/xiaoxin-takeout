<template>
	<view class="payed pageBg">
		<custom-nav-bar>
			<template #tab>
				<view class="goBack" @click="goBack">
					<uni-icons type="left" color="white"></uni-icons>
				</view>
			</template>
			<template #title>
				<view>
					{{titleName}}
				</view>
			</template>
		</custom-nav-bar>
		<view class="chooseArea" @click="clickAddress()">
			<view class="">
				<uni-icons type="icon-dizhi" custom-prefix="iconfont"></uni-icons>
				<view class=""  v-if="!Object.keys(form.chooseAddress).length">
					添加校内地址
				</view>
				<view class="" v-else>
					<view class="">
						<view class="">
							{{form.chooseAddress.name}}
						</view>
						<view class="">
							{{form.chooseAddress.phone}}
						</view>
						<view class="tag" v-show="form.chooseAddress.tag">
							{{form.chooseAddress.tag}}
						</view>
					</view>
					<view class="">
						{{ form.chooseAddress.headAddress}}-{{form.chooseAddress.address}}
					</view>
				</view>
			</view>
			<view class="">
				<uni-icons type="right" color="#cfcfcf"></uni-icons>
			</view>
		</view>
		<!-- 地址选择器 -->
		<uni-popup ref="addressPopup" background-color="#fff">
			<view class="address-popup">
				<view class="title">
					选择收货地址
				</view>
				<view class="address">
				<view class="" v-for="item in userStore.getAddress" :key="item.id" @click="newChooseAddress(item)">
					<address-item :canEdit="false" :item="item"></address-item>
				</view>
				</view>
				<view class="add-new-btn" @click="addAddress">
					新增收货地址
				</view>
			</view>
		</uni-popup>
		<!--  -->
		<view class="delivery-time" @click="openTimeChoose">
			<view class="">
				期望送达时间
			</view>
			<view class="">
				{{form.sendTime}}
			</view>
		</view>
		<!-- 时间选择弹窗 -->
		<distribution-box ref="dsbonBox" v-model='form.sendTime'></distribution-box>
		<!-- 店铺信息 -->
		<view class="shop-commodity">
			<view class="shop-title">
				<uni-icons type="shop" size="20"></uni-icons>
				{{shopInfo.name}}
			</view>
			<view class="commodity">
				<view class="commodity-item" v-for="item in commodity_list" :key="item.id">
					<view class="item-left">
						<!-- {{item}} -->
						<image :src="shopsStore.searchForComId(item.comid).imgUrl" mode=""></image>
					</view>
					<view class="item-center">
						<view class="title">
							{{shopsStore.searchForComId(item.comid).title}}
						</view>
						<view class="specs">
							<template v-for="(it,index) in item.specsList" :key="index">
								<text>{{it}}</text>
								<text v-if="index < item.specsList.length-1">、</text>
							</template>
						</view>
					</view>
					<view class="item-right">
						<view class="price">
							￥{{shopsStore.searchForComId(item.comid).jiage}}
						</view>
						<view class="num">
							x{{item.num}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="notes">
			<view class="">
				订单备注
			</view>
			<view class="note-text">
				<textarea 
					v-model="form.note" 
					placeholder="您好,如有特殊要求,可在此给商家备注哦 (如: 不要辣! 多点葱~~)" 
					auto-height
					class="text-item"
					style="height: 70rpx;"
					/>
			</view>
		</view>
		<!-- {{shopInfo.usecoupon}} -->
		<view class="use-coupon" v-if="shopInfo.usecoupon">
			<view class="use-header">
				<view class="">使用优惠卷</view>
				<switch :checked="isUseCoupon" @change="changeUseCoupon"/>
			</view>
			<view class="coupon-list" v-if="isUseCoupon">
				<radio-group @change="changeCheck_coupon($event)">
					<label :class="{'list-item':true,'coupon-list-last-child':index === couponStore.getCouponList.length-1}" v-for="(item,index) in userStore.getCoupon.filter(item=>!item.isuse)" :key="item.id">
						<view>{{couponStore.searchForParentid(item.pid).title}}</view>
						<view>
							<radio :disabled="commodity_all_price<couponStore.searchForParentid(item.pid).minPrice" :value="item.id + '-'+couponStore.searchForParentid(item.pid).price" :checked="item.id === checkCouponId"/>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="computed-price">
			<view class="computed-item">
				<view class="">
					商品总价
				</view>
				<view class="">
					{{ commodity_all_price }}
				</view>
			</view>
			<view class="computed-item">
				<view class="">
					打包费
				</view>
				<view class="">
					￥{{ shopInfo.packPrice }}
				</view>
			</view>
			<view class="computed-item">
				<view class="">
					优惠卷
				</view>
				<view class="">
					- ￥{{form.coupon.value}}
				</view>
			</view>
			<view class="computed-item computedLastchild">
				<view class="">
					总计
				</view>
				<view class="">
					共{{ commodity_list.reduce((a,b)=> a+b.num,0) }}份商品 ￥{{finally_price}}
				</view>
			</view>
		</view>
		
		<view class="pay-choose">
			<view class="title">
				请选择支付方式
			</view>
			<radio-group class="pay-method" @change="(e)=>form.payMethod = e.detail.value">
				<label v-for="(item,index) in pay_method" :key="index" class="method-item">
					<view class="">
						<uni-icons :type="item.icon" custom-prefix="iconfont" :color="item.color" size="20"></uni-icons>
						{{item.name}}
					</view>
					<view class="payLastMethod">
						<radio :value="item.value" :checked="item.value === form.payMethod"></radio>
					</view>
				</label>
			</radio-group>
		</view>
		
		<view class="all-price">
			<view class="price">
				总计：￥{{finally_price}}
			</view>
			<view class="">
				<button class="submit-btn" @click="submit">提交订单</button>
			</view>
		</view>
		<pay-popup
			:price="finally_price"
			:id="orderId"
			:shopName="shopInfo.name"
			:payMethod="form.payMethod"
			ref="payPop"
		></pay-popup>
	</view>
</template>

<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app'
	import { ref,computed,nextTick } from 'vue'
	import { goBack } from '@/utils/system'
	import { useShopsStore,useCartStore,
		useCouponStore,
		useUserStore,
		useOrderStore
	 } from '@/stores/index.js'
	import distributionBox from '@/components/distributionBox/distributionBox.vue'
	import { getNowTime } from '@/utils/utils.js'
	// --------------------------------
	const shopsStore = useShopsStore()
	const cartStore = useCartStore()
	const couponStore = useCouponStore()
	const userStore = useUserStore()
	const orderStore = useOrderStore()
	// 用于显示导航栏的标题
	const titleName = ref()
	// --------------------------------
	// 绑定店铺的相关信息
	const shopInfo = ref({})
	onLoad((e)=>{
		let { sid } = e
		// 获取店铺的相关信息
		shopInfo.value = shopsStore.searchForId(sid)
		// 动态设置导航栏
		titleName.value = shopInfo.value.name
		// console.log(shopInfo.value)
	})
	// --------------------------------
	// 绑定选择的地址信息
	// 更改到form表单中存储
	// const chooseAddress = ref({
	// 	...userStore.getDefaultAddress
	// })
	// 绑定地址弹层
	const addressPopup = ref(null)
	// 打开地址选择弹窗
	const clickAddress = ()=>{
		addressPopup.value.open('bottom')
	}
	const newChooseAddress = (item)=>{
		// chooseAddress.value = item
		// console.log(11111)
		form.value.chooseAddress = item
		addressPopup.value.close()
		// console.log(chooseAddress.value)
	} 
	// --------------------------------
	// 绑定时间的弹出层
	const dsbonBox = ref(null)
	// 打开时间选择的弹窗
	const openTimeChoose = ()=>{
		// 使用子组件暴露出来的属性
		dsbonBox.value.showBox()
	}
	// 存储到form表单数据汇总
	// const sendTime = ref('立即送出')
	// onShow方法是在小程序启动或从后台进入前台时触发的方法
	// 等待页面加载完成后，获取可以选择的时间
	onShow(()=>{
		nextTick(()=>{
			dsbonBox.value.getNextDay()
		})
	})
	
	// --------------------------------
	// 添加新地址
	const addAddress = ()=>{
		uni.navigateTo({
			url:'/pages/add-address/add-address'
		})
	}
	// --------------------------------
	//是否使用优惠卷 
	const isUseCoupon = ref(false)
	const changeUseCoupon = ()=>{
		isUseCoupon.value = !isUseCoupon.value
		form.value.coupon.value = 0
		checkCouponId.value = ''
	}
	// 选择的优惠卷id
	const checkCouponId = ref('')
	
	const changeCheck_coupon = (e)=>{
		// console.log(e)
		form.value.coupon.value = parseFloat(e.detail.value.split('-')[1]) 
		checkCouponId.value =parseInt(e.detail.value.split('-')[0])
	}
	// 购买的商品
	const commodity_list = computed(()=>cartStore.getwantPay)
	// console.log(cartStore.getwantPay)
	// 商品总价
	const commodity_all_price = computed(()=>commodity_list.value.reduce((a,b)=>a+shopsStore.searchForComId(b.comid).jiage * b.num,0))
	// 最终价格
	const finally_price = computed(()=> commodity_all_price.value - (isUseCoupon.value?form.value.coupon.value:0) + shopInfo.value.packPrice )
	// --------------------------------
	// 支付方式
	const pay_method = ref([
		{
			value:'wxpay',
			name:'微信支付',
			icon:'icon-weixinzhifu',
			color:'#2ece36'
		},
		{
			value:'qbpay',
			name:'余额支付',
			icon:'icon-point',
			color:'#d9bb7e'
		}
	])
	// --------------------------------
	// 用来绑定要提交订单的数据
	const form = ref({
		note:'',   //备注
		payMethod:'wxpay'  ,//支付方式
		coupon:{
			value:0,
			id:computed(()=>checkCouponId.value)
		},
		chooseAddress:{...userStore.getDefaultAddress},
		commodity:commodity_list.value,
		sendTime:((new Date()).getHours() >=10 &&  (new Date()).getHours() <23 ? '立即送出' : '')
	})
	
	// console.log((new Date()).getHours())
	const orderId = ref(+ new Date)
	const payPop = ref(null)
	// 提交订单
	const submit = ()=>{
		// console.log(form.value)
		if(!Object.keys(form.value.chooseAddress).length){
			uni.showToast({
				title:'收货信息不能为空！',
				icon:'none'
			})
			return
		}
		if(!form.value.sendTime){
			uni.showToast({
				title:'送达时间不能为空',
				icon:'none'
			})
			return
		}
		// 将数据处理成数据库中的类型
		let submitForm = ref({
			id:orderId.value,
			createTime:getNowTime(),
			status:'unpay',
			uid:0,
			sendTime:form.value.sendTime,
			sid:shopInfo.value.id,
			commodity:form.value.commodity,
			coupon:form.value.coupon,
			address:form.value.chooseAddress.headAddress + form.value.chooseAddress.address,
			consignee:form.value.chooseAddress.name,
			phone:form.value.chooseAddress.phone,
			payType:form.value.payMethod === 'wxpay' ? '微信支付' : '余额支付'
		})
		// console.log(submitForm.value)
		// 将订单添加到pinia中，状态为未支付
		orderStore.addNewOrder(submitForm.value)
		// 使用余额支付的时候唤起支付框，支付成功后将订单状态改成untake
		payPop.value.clickpay()
		// 点击提交订单后删除购物车中对应的数据
		form.value.commodity.forEach(item=>{
			cartStore.deleteCart(item.id)
		})
		form.value.coupon.id && userStore.changeCoupon(form.value.coupon.id)
		// if(form.value.payMethod === 'qbpay'){
			
		// }
	}
	// --------------------------------
</script>

<style lang="scss" scoped>
	.payed{
		min-height: 100vh;
		padding: 10rpx 0;
	}
	.chooseArea{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:30rpx 10rpx;
		background-color: white;
		margin: 20rpx 0;
		color: $takeout-font-color-1;
		& :first-child{
			display: flex;
			gap: 10rpx;
			align-items: center;
		}
		.tag{
			background-color: $takout-base-color-2;
			color: white;
			padding: 2.5rpx 30rpx;
			border-radius: 30rpx;
			font-size: 25rpx;
		}
	}
	.delivery-time{
		display: flex;
		justify-content: space-between;
		padding:30rpx 10rpx;
		background-color: white;
		font-size: 30rpx;
	}
	.shop-commodity{
		margin-top: 20rpx;
		padding: 10rpx 0;
		background-color: white;
		.shop-title{
			display: flex;
			gap: 20rpx;
			padding: 10rpx;
			font-size: 30rpx;
			align-items: center;
			font-weight: 550;
		}
		.commodity{
			padding-bottom: 20rpx;
			.commodity-item{
				display: flex;
				margin-bottom: 10rpx;
				background-color:#f5f5f5;
				.item-left{
					image{
						width: 155rpx;
						height: 125rpx;
						margin: 15rpx;
					}
				}
				.item-center{
					flex: 1;
					padding-top:10rpx;
					font-size: 29rpx;
					.specs{
						display: flex;
						margin-top: 10rpx;
						font-size: 25rpx;
						// gap: 15rpx;
						color: $takeout-font-color-2;
						.specs-item{
							margin: 5rpx;
							padding-right: 13rpx;
							// border-right: 1rpx solid rgba(0,0,0,0.4);
						}
					}
				}
				.item-right{
					padding-top: 10rpx;
					padding-right: 15rpx;
					.price{
						color: red;
					}
					.num{
						color: $takeout-font-color-1;
						text-align: right;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
	.notes{
		display: flex;
		margin-top: 20rpx;
		background-color: white;
		padding: 20rpx;
		// gap: 25rpx;
		justify-content: space-between;
		& :first-child{
			font-size: 30rpx;
		}
		.note-text{
			width: 500rpx;
			min-height: 150rpx;
			padding:10rpx;
			border: 1rpx solid #eeeeee;
			// height: 200rpx;
			:deep(uni-textarea){
				width: 100%;
				// height: 70rpx;
			}
			:deep(.text-item){
				min-height: 150rpx;
				width: 475rpx;
				white-space: wrap;
			}
			:deep(.uni-textarea-placeholder){
				// white-space: pre-wrap;
				font-size: 27.5rpx;
			}
			:deep(.uni-textarea-wrapper){
				min-height: 150rpx !important;
			}
		}
	}
	.computed-price{
		margin-top: 20rpx;
		padding:0 10rpx;
		background-color: white;
		font-size: 30rpx;
		.computed-item{
			margin: 10rpx;
			display: flex;
			padding: 20rpx;
			justify-content: space-between;
			border-bottom: 1rpx solid #dddddd;
		}
		.computedLastchild{
			border:none;
		}
	}
	.all-price{
		// margin-top: 30rpx;
		// position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		background-color: white;
		justify-content: space-between;
		width: 100%;
		height: 110rpx;
		.price{
			padding: 0 30rpx;
			color: red;
			font-weight: 650;
		}
		.submit-btn{
			background: $takeout-button-cart-color;
			width: 200rpx;
			font-size: 30rpx;
			color: white;
		}
	}
	.pay-choose{
		font-size: 30rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: white;
		padding: 10rpx;
		.title{
			padding: 15rpx 10rpx;
			border-bottom: 1rpx solid #dddddd;
		}
		.pay-method{
			.method-item{
				display: flex;
				justify-content: space-between;
				padding: 15rpx 10rpx;
				border-bottom: 1rpx solid #dddddd;
			}
			.method-item :first-child{
				display: flex;
				gap: 10rpx;
				align-items: center;
			}
		}
		.payLastMethod{
			border: none;
		}
	}
	.use-coupon{
		margin-top: 20rpx;
		background-color: white;
		.use-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			border-bottom: 1rpx solid #dddddd;
		}
		.coupon-list{
			.list-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding:20rpx 10rpx;
				// margin: 0 10rpx;
				border-bottom: 1rpx solid #dddddd;
			}
		}
		.coupon-list-last-child{
			border: none;
		}
	}
	.address-popup{
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		.title{
			padding-top: 30rpx;
			text-align: center;
		}
		.address>uni-view{
			border-bottom: 1rpx solid #e8e8e8;
			// border-top: 1rpx solid #e8e8e8;
		}
		.address{
			max-height: 800rpx;
			overflow: scroll;
			margin-bottom: 100rpx;
			width: 100%;
		}
		.add-new-btn{
			width: 100%;
			color: white;
			background-color:$takout-base-color-2;
			border-radius: 20rpx;
			text-align: center;
			padding: 20rpx;
			position: absolute;
			bottom: 0;
		}
	}
</style>

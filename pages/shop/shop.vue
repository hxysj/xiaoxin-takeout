<template>
	<view class="shop pageBg">
		<custom-nav-bar>
			<template #tab>
				<view class="goBack" @click="goBack">
					<uni-icons type="left" color="white"></uni-icons>
				</view>
			</template>
		</custom-nav-bar>
		<view class="shop-info-tag">
			<view class="info-tag">
				<view class="tag-header">
					<view class="tag-img">
						<image :src="nowShop.icon" mode="aspectFill"></image>
					</view>
					<view class="tag-right">
						<view class="right-head">
							<view class="title">
								{{nowShop.name}}
							</view>
							<view class="" @click="changeLike">
								<uni-icons :type="isLike ? 'star-filled':'star'" size="20" color="#1296db"></uni-icons>
							</view>
						</view>
						<view class="tag-other">
							<view class="other-price">
								<view class="price">
									￥{{nowShop.minPrice}}
								</view>
								起送
							</view>
							<view class="">
								销量 {{nowShop.payed}}
							</view>
							<view class="core">
								<uni-icons type="star-filled" color="#ff9463"></uni-icons> {{nowShop.rate}}
							</view>
						</view>
					</view>
				</view>
				<view class="tag-bottom" @click="openShopBottomPoupo">
					配送费0元
					<view class="">
						<uni-icons type="right" size="18" color="#bdbdbd"></uni-icons>
					</view>
				</view>
				<uni-popup ref="tagBottomPopup">
					<view class="tag-bottom-popup">
						<view class="title">
							其他信息
						</view>
						<view class="popup-item">
							配送费 0 元
						</view>
						<view class="popup-hr">
						</view>
						<view class="popup-item">
							打包费 {{nowShop.packPrice}} 元
						</view>
						<view class="popup-hr">
						</view>
						<view class="popup-item">
							{{ nowShop.usecoupon ? '允许使用优惠卷' : '不参与优惠卷的使用'}}
						</view>
					</view>
				</uni-popup>
			</view>
		</view>
		<view class="shop-bar">
			<view class="bar-choose">
				<view :class="nowChoose === 'shopping' ? 'active' : ''" @click="changeChoose('shopping')">商品</view>
				<view :class="nowChoose === 'shop' ? 'active' : ''"  @click="changeChoose('shop')">店铺</view>
				<view :class="nowChoose === 'remark' ? 'active' : ''"  @click="changeChoose('remark')">评论</view>
			</view>
			<view class="bar-view">
				<view class="" v-show="nowChoose === 'shopping'">
					<xzgVerticalNav :dataList="comList" tabName="type" assIdName="typeId" height="calc(100vh - 375upx - 100upx)"  @onClickItem="ChooseItem">	
					</xzgVerticalNav>
				</view>
				<view class="bag-shop" v-show="nowChoose === 'shop'">
					<view class="shop-item">
						<uni-icons type="icon-shijian" custom-prefix="iconfont" size="25" color="#3689d1"></uni-icons>
						营业时间：{{nowShop.openTime}}
					</view>
					<view class="shop-item">
						<uni-icons type="icon-dianhua" custom-prefix="iconfont" size="25" color="#40d101"></uni-icons>
						店铺电话：{{nowShop.phone}}
					</view>
					<view class="shop-item">
						<uni-icons type="icon-weizhi" custom-prefix="iconfont" size="25" color="#ff7649"></uni-icons>
						店铺地址：{{nowShop.area}}
					</view>
					<view class="shop-item">
						<uni-icons type="icon-bangzhupeisongfuwu" custom-prefix="iconfont" size="25" color="#3571ca"></uni-icons>
						配送信息：由 小新骑手 提供配送服务
					</view>
					<view class="shop-item">
						<uni-icons type="icon-fuwudiqiu" custom-prefix="iconfont" size="25" color="#386dff"></uni-icons>
						服务区域： 学校内
					</view>
					<view class="shop-item">
						<uni-icons type="icon-peisongzhong" custom-prefix="iconfont" size="25" color="#ff7bc2"></uni-icons>
						外送费用0元
					</view>
				</view>
				<view class="remark" v-show="nowChoose === 'remark'">
					<view class="remark-title">
						总体评分：
						<uni-icons type="star-filled" color="#ff7054"></uni-icons>
						{{nowShop.rate}}
					</view>
					<view class="remark-tag">
						<view :class="{'tag-item':true,'active':commentShowType === 'all' }" @click="changeCommentShowType('all')">
							全部({{commentStore.searchForSId(nowShop.id).length}})
						</view>
						<view :class="{'tag-item':true,'active':commentShowType === 'hp' }" @click="changeCommentShowType('hp')">
							好评({{commentStore.searchForSId(nowShop.id)?.filter(item=>item.rate>=4).length}})
						</view>
						<view :class="{'tag-item':true,'active':commentShowType === 'zp' }" @click="changeCommentShowType('zp')">
							中评({{commentStore.searchForSId(nowShop.id)?.filter(item=>item.rate>2 && item.rate <4).length}})
						</view>
						<view :class="{'tag-item':true,'active':commentShowType === 'cp' }" @click="changeCommentShowType('cp')">
							差评({{commentStore.searchForSId(nowShop.id)?.filter(item=>item.rate<=2).length}})
						</view>
						<view :class="{'tag-item':true,'active':commentShowType === 'haveImg' }" @click="changeCommentShowType('haveImg')">
							有图({{commentStore.searchForSId(nowShop.id)?.filter(item=>item.img).length}})
						</view>
						<view :class="{'tag-item':true,'active':commentShowType === 'noImg' }" @click="changeCommentShowType('noImg')">
							无图({{commentStore.searchForSId(nowShop.id)?.filter(item=>!item.img).length}})
						</view>
					</view>
					<view class="remark-view">
						<!-- {{commentList}} -->
						<remark-item v-for="item in commentList" :item="item" :key="item.id"></remark-item>
					</view>
				</view>
			</view>
		</view>
		<view class="cart" @click="clickCart">
			<uni-badge class="uni-badge-left-margin" :text="getShopCart.reduce((a,b)=>a+b.num,0)" absolute="rightTop" size="small">
				<image src="../../static/images/cart-h.png" mode="aspectFill"></image>
			</uni-badge>
		</view>
		<uni-popup ref="cartPopup" type="center" border-radius="10px 10px 0 0" class="cartPopup">
			<cart-item :item="getShopCart" :shopId="nowShop.id" @changeNum="changeItemNum"></cart-item>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref,computed, watch } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useShopsStore,useCartStore,useUserStore,useCommentStore } from '@/stores/index.js'
	import xzgVerticalNav from '@/components/xzg-verticalNav/xzg-verticalNav'
	import { goBack } from '@/utils/system'
	// 返回上一个页面
	const shopsStore = useShopsStore()
	const cartStore = useCartStore()
	const userStore = useUserStore()
	const commentStore = useCommentStore()
	// 要展示的商品信息
	const comList = ref([])
	// ----------------------------------------
	// 要展示的商家信息
	const nowShop = ref({})
	onLoad((e)=>{
		let { id } = e
		id = parseInt(id)
		nowShop.value = shopsStore.searchForId(id)
		// console.log(nowShop.value)
		comList.value = shopsStore.searchForShopID_com(id)
	})
	// --------------------------------------
	// 查看店铺的配送费,打包费,是否可以使用优惠卷的情况
	const tagBottomPopup = ref(null)
	const  openShopBottomPoupo = ()=>{
		tagBottomPopup.value.open('center')
	}
	
	// --------------------------------------
	// 获得当前店铺的评论
	const commentShowType = ref('all')
	const changeCommentShowType = (n)=>{
		commentShowType.value = n
	}
	const commentList = computed(()=>{
		let dataList = ref(commentStore.searchForSId(nowShop.value.id))
		// console.log(dataList.value)
		if(commentShowType.value === 'all'){
			return dataList.value
		}
		if(commentShowType.value === 'hp'){
			return dataList.value?.filter(item=>item.rate >=4)
		}
		if(commentShowType.value === 'cp'){
			return dataList.value?.filter(item=>item.rate <=2)
		}
		if(commentShowType.value === 'zp'){
			return dataList.value?.filter(item=>item.rate>2 && item.rate <4)
		}
		if(commentShowType.value === 'haveImg'){
			return dataList.value?.filter(item=>item.img)
		}
		if(commentShowType.value === 'noImg'){
			return dataList.value?.filter(item =>!item.img)
		}
		// return commentStore.searchForSId(nowShop.value.id)
	})
	// watch(()=>commentList.value,(newVal)=>{
	// 	console.log(newVal)
	// })
	// ---------------------------------------
	// 是否收藏店铺
	const isLike = computed(()=>userStore.checkLike(nowShop.value.id,'shop'))
	// console.log(isLike.value)
	// 点击收藏店铺或取消收藏
	const changeLike = ()=>{
		// console.log(111)
		if(isLike.value){
			userStore.removeLike(nowShop.value.id)
		}else{
			userStore.addLike(nowShop.value.id,'shop')
		}
	}
	// ----------------------------------------
	// 点击商品时触发
	const ChooseItem = (item)=>{
		let obj = JSON.stringify({name:item.title,id:item.id})
		uni.navigateTo({
			url:'/pages/commodity/commodity?obj='+obj
		})
	}
	// --------------------------------
	// 当前的选择
	const nowChoose = ref('shopping')
	// 切换商品和店铺，评论的显示
	const changeChoose = (n) =>{
		nowChoose.value = n
	}
	// -----------------------------------
	// 购物车的数量显示
	const numValue = ref(1)
	
	// 获取当前店铺加入购物车的商品
	const getShopCart = computed(()=>cartStore.searchForSid(nowShop.value.id))
	// console.log(nowShop.value.id)
	// 绑定购物车弹窗
	const cartPopup = ref(null)
	// 点击购物车时弹出弹窗
	const clickCart = ()=>{
		cartPopup.value.open()
	}
	
	// 子组件点击修改购物车的数量
	const changeItemNum = ([id,num])=>{
		cartStore.changeComNum(id,num)
	}
</script>

<style lang="scss" scoped>
	.shop{
		min-height: 100vh;
		
	}
	.shop-info-tag{
		margin-top: 15rpx;
		width: 100%;
		padding: 20rpx;
		display: flex;
		justify-content: center;
		.info-tag{
			padding: 15rpx 20rpx;
			background-color: white;
			border-radius: 20rpx;
			width: 100%;
		}
		.tag-header{
			display: flex;
			gap: 20rpx;
			align-items: center;
			image{
				// border: 1rpx solid black;
				width: 105rpx;
				height: 105rpx;
			}
			.tag-right{
				width: 100%;
			}
			.right-head{
				display: flex;
				gap: 15rpx;
				align-items: center;
				font-weight: 600;
				margin-top: 5rpx;
				justify-content: space-between;
			}
			.tag-other{
				margin-top: 10rpx;
				display: flex;
				gap: 20rpx;
				align-items: center;
				font-size: 30rpx;
				color: $takeout-font-color-1;
				.other-price{
					display: flex;
					align-items: center;
					gap:5rpx;
					.price{
						color: red;
					}
				}
				.core{
					color: #ff9463;
				}
			}
		}
		.tag-bottom-popup{
			background-color: white;
			width: 600rpx;
			padding: 10rpx 15rpx;
			color: $takout-base-color;
			border-radius: 20rpx;
			.title{
				padding: 20rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				font-weight: 800;
			}
			.popup-item{
				padding: 15rpx;
				font-size: 25rpx;
			}
			.popup-hr{
				width: 100%;
				border-bottom:0.25rpx dashed rgba(0,0,0,0.4);
			}
		}
		.tag-bottom{
			margin-top: 10rpx;
			padding-top: 10rpx;
			padding-left:20rpx;
			font-size: 25rpx;
			border-top: 1rpx dashed #a2cfff;
			color: $takout-base-color;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.shop-bar{
		background-color: white;
		padding:5rpx 10rpx;
		.bar-choose{
			display: flex;
			justify-content: space-around;
			// border: 1rpx solid black;
			& :nth-child(n){
				padding: 10rpx 30rpx;
			}
			.active{
				border-bottom: 1.3rpx solid $takout-base-color;
			}
		}
		.bar-view{
			.bag-shop{
				margin: 10rpx;
				.shop-item{
					padding: 15rpx;
					color: $takeout-font-color-2;
					border-bottom: 1rpx solid #f7f7f7;
					border-top: 1rpx solid #f7f7f7;
					display: flex;
					align-items: center;
					gap: 20rpx;
				}
				// & :last-child{
				// 	margin-top: 20rpx;
				// }
			}
		}
		.remark{
			// padding: 20rpx;
			.remark-title{
				padding: 40rpx;
				text-align: center;
				border-bottom: 10rpx solid $takeout-border-color-1;
			}
			.remark-tag{
				display: flex;
				padding: 20rpx;
				gap: 25rpx;
				flex-wrap: wrap;
				.tag-item{
					border:1rpx solid $takeout-border-color-2;
					padding: 10rpx 0rpx;
					width: 150rpx;
					text-align: center;
					border-radius: 40rpx;
					font-size: 25rpx;
				}
				.active{
					background-color: red;
					color: white;
					border:none;
				}
			}
		}
	}
	.cart{
		position: fixed;
		left: 30rpx;
		bottom: 100rpx;
		background-color: rgba(150,100,100,0.2);
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		padding: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 50rpx;
			height: 50rpx;
		}
	}
	.cartPopup{
		:deep(.uni-popup__wrapper){
			width: 600rpx;
			max-height: 70vh;
			overflow-y: auto;
		}
	}
</style>

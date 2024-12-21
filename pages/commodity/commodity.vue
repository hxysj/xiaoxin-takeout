<template>
	<view class="commodity">
		<view class="header">
			<image :src="commodityShow.imgUrl" mode="aspectFill"></image>
		</view>
		<view class="info">
			<view class="price">
				￥<text class="price-data">{{commodityShow.jiage}}</text>/份
			</view>
			<view class="title">
				{{commodityShow.title}}
			</view>
			<view class="notes">
				{{commodityShow.remarks}}
			</view>
			<view class="payed">
				销量：388份
			</view>
		</view>
		<view class="choose" @click="openPopup" v-if="commodityShow.specsList">
			<view class="choose-left">
				<view class="">
					选择:
				</view>
				<view class="left-item">
					<view class="item" v-for="item in commodityShow.specsList" :key="item.id">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="">
				<uni-icons type="right" color="#9d9d9d"></uni-icons>
			</view>
		</view>
		<view class="shop">
			<view class="shop-img">
				<image :src="shopsStore.searchForId(commodityShow.sid)?.icon" mode=""></image>
			</view>
			<view class="shop-info">
				<view class="info-left">
					<view class="title">{{shopsStore.searchForId(commodityShow.sid)?.name}}</view>
					<view class="shop-go" @click="gotoShop">
						<view class="">
							进店逛逛
						</view>
					</view>
				</view>
				<view class="area">
					{{shopsStore.searchForId(commodityShow.sid)?.area}}
				</view>
			</view>
		</view>
		<!-- 商品详情，评论 -->
		<view class="other">
			<view class="title">
				<view :class="{'active':isShopInfo}" @click="changeActive(true)">
					商品详情
				</view>
				<view :class="{'active':!isShopInfo}" @click="changeActive(false)">
					店铺评论
				</view>
			</view>
			<view class="value">
				<view class="shopinfo" v-if="isShopInfo">
					<view class="noData">
						暂无数据
					</view>
				</view>
				<view class="shopLeavel" v-else>
					<view class="" v-if="commentList.length">
						<remark-item v-for="item in commentList" :key="item.id" :item="item"></remark-item>
					</view>
					<view class="noData" v-else>
						暂无评论
					</view>
				</view>
			</view>
		</view>
		<!-- 底部购物车，收藏按钮 -->
		<view class="goods-carts">
			<uni-goods-nav
				:fill="true" 
				:options="options" 
				:button-group="customButtonGroup1" 
				@click="onClick"
				@buttonClick="buttonClick" 
				/>
			<safe-bottom></safe-bottom>
		</view>
		<!-- 当需要选择规格时，加入购物车时需要选择规格 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				<view class="header">
					<view class="">
						<image :src="commodityShow.imgUrl" mode=""></image>
					</view>
					<view class="">
						<view class="title">
							{{commodityShow.title}}
						</view>
						<view class="price">
							￥{{commodityShow.jiage}}
						</view>
					</view>
					<view class="close" @click="closePopup">
						<uni-icons type="close" size="30" color="#cfcfcf"></uni-icons>
					</view>
				</view>
				<view class="popup-choose">
					<view class="choose-item" v-for="(item,index) in commodityShow.specsList" :key="item.id">
						<view class="item-title">
							{{item.name}}
						</view>
						<view class="">
							<uni-data-checkbox mode="tag" v-model="form.check[index]" :localdata="item.choose"></uni-data-checkbox>
						</view>
					</view>
				</view>
				<view class="popup-num">
					<view class="num-title">
						数量：{{form.num}}
					</view>
					<view class="num-input">
						<view class="num-btn" @click="subNum">
							-
						</view>
						<view class="num-inp">
							{{form.num}}
						</view>
						<view class="num-btn" @click="addNum">
							+
						</view>
					</view>
				</view>
				<view class="addCart">
					<button class="add-btn" @click="addCart">加入购物车</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref,computed } from 'vue'
	import { 
		useShopsStore,
		useCartStore,
		useUserStore,
		useCommentStore
		} from '@/stores/index.js'
	const shopsStore = useShopsStore()
	const cartStore = useCartStore()
	const userStore = useUserStore()
	const commentStore = useCommentStore()
	// 展示的商品数据
	const commodityShow = ref({})
	// 点击进入店铺
	const gotoShop = ()=>{
		uni.navigateTo({
			url:'/pages/shop/shop?id='+commodityShow.value.sid
		})
	}
	// 店铺评论数据
	let commentList = ref([])
	onLoad((e)=>{
		let obj = JSON.parse(e.obj)
		uni.setNavigationBarTitle({
			title:obj.name
		})
		commodityShow.value = shopsStore.searchForComId(obj.id)
		commentList.value = commentStore.searchForSId(commodityShow.value.sid)
		// console.log(userStore.checkLike(commodityShow.value.id,'commodity'))
		// console.log(commentList.value)
	})
	
	// 底部导航
	const options =  ref([
		{
			icon: computed(()=>computed(()=>userStore.checkLike(commodityShow.value.id,'commodity')).value ? 'star-filled':'star'),
			text: '收藏'
			// color:'#007aff'
		},
		{
			icon: 'cart',
			text: '购物车',
			info: 0
	}])
	const customButtonGroup1 = ref([{
		text: '加入购物车',
		backgroundColor: 'linear-gradient(90deg, #0550ff,#7d95ff)',
		color: '#fff'
	}])
	// 左侧点击事件
	const onClick = (e)=>{
		let { index,content} = e
		// 点击前往购物车
		if(index === 1){
			uni.navigateTo({
				url:'/pages/cart/cart'
			})
		}
		// 收藏商品功能
		if(index === 0){
			// console.log(content)
			if(userStore.checkLike(commodityShow.value.id,'commodity')){
				userStore.removeLike(commodityShow.value.id)
			}else{
				userStore.addLike(commodityShow.value.id,'commodity')
			}
		}
	}
	// 绑定弹窗
	const popup = ref(null)
	
	// 开启弹窗
	const openPopup = ()=>{
		popup.value.open('bottom')
	}
	// 关闭弹窗
	const closePopup = ()=>{
		popup.value.close()
	}
	// 绑定要提交的数据
	const form = ref({
		num:1,
		check:[]
	})
	
	
	// 点击加入购物车开启弹窗
	const buttonClick = ()=>{	
		popup.value.open('bottom')
	}
	
	// 点击弹窗内的加入购物车
	const addCart = ()=>{
		// console.log(form.value)
		form.value.sid = commodityShow.value.sid
		form.value.comid = commodityShow.value.id
		if(commodityShow.value.specsList && form.value.check.filter(item=>item).length !== commodityShow.value.specsList?.length){
			uni.showToast({
				title:'请选择对应的规格！',
				icon:'none'
			})
			return
		}
		cartStore.addCart(form.value)
		uni.showToast({
			icon:'exception',
			title:'添加成功'
		})
		form.value = {
			num:1,
			check:[]
		}
		popup.value.close()
	}
	
	// 弹窗内增加数量，减少数量
	const subNum = ()=>{
		if(form.value.num === 1){
			return
		}
		form.value.num -=1
	}
	const addNum = ()=>{
		form.value.num += 1
	}
	// 判断是商品详情还是商品评论
	const isShopInfo = ref(true)
	// 切换显示
	const changeActive = (e)=>{
		isShopInfo.value = e 
	}
</script>

<style lang="scss" scoped>
	.commodity{
		min-height: 100vh;
		background-color: #dfdfdf;
		padding-bottom: 100rpx;
		.header{
			height: 750rpx;
			image{
				width: 100%;
				height: 100%;
				// border:1rpx solid black;
			}
		}
		.info{
			padding: 15rpx;
			background-color: white;
			.price{
				font-size: 35rpx;
				color:red;
				.price-data{
					font-weight: 800;
					font-size: 45rpx;
				}
			}
			.title{
				padding: 15rpx 10rpx 0 10rpx;
				font-size: 40rpx;
				font-weight: 600;
			}
			.notes{
				padding: 0 10rpx;
				color: #9d9d9d;
			}
			.payed{
				padding: 10rpx;
				padding-top: 15rpx;
				color: #9d9d9d;
			}
		}
		.choose{
			margin-top: 15rpx;
			background-color: white;
			padding:30rpx 15rpx;
			display: flex;
			justify-content: space-between;
			color: #9d9d9d;
			& :first-child{
				font-size: 30rpx;
				display: flex;
				.left-item{
					display: flex;
					margin-left: 10rpx;
					gap: 15rpx;
					color: black;
				}
			}
		}
		.shop{
			margin-top: 15rpx;
			padding: 30rpx 15rpx;
			width: 100%;
			display: flex;
			gap: 10rpx;
			background-color: white;
			.shop-img{
				width: 90rpx;
				height: 90rpx;
				image{
					width: 100%;
					height: 100%;
					// border:1rpx solid black;
				}
			}
			.shop-info{
				// width: 100%;
				flex: 1;
				.info-left{
					display: flex;
					justify-content: space-between;
				}
				.title{
					width: 460rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					font-size: 35rpx;
					padding-left: 10rpx;
				}
				.area{
					font-size: 26rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					color: #9d9d9d;
					// padding: 10rpx;
					width: 520rpx;
					height: 40rpx;
					padding-left: 10rpx;
				}
			}
			.shop-go{
				view{
					width: 100%;
					padding: 10rpx;
					border:1rpx solid red;
					border-radius: 50rpx;
					font-size: 25rpx;
					text-align: center;
					color: red;
				}
			}
		}
		.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
		}
		.other{
			width: 100%;
			margin-top: 10rpx;
			padding: 10rpx;
			background-color: white;
			min-height: 350rpx;
			.title{
				margin: 10rpx;
				display: flex;
				width: 100%;
				justify-content: space-around;
				view{
					padding: 10rpx;
				}
				.active{
					border-bottom: 5rpx solid blue;
				}
			}
			.value{
				.noData{
					// margin: auto;
					text-align: center;
					padding: 50rpx;
					color: #9d9d9d;
				}
			}
		}
		.popup-content{
			padding: 10rpx;
			border-radius: 30rpx 30rpx 0 0;
			.header{
				position: relative;
				width: 100%;
				padding: 20rpx;
				display: flex;
				height: 170rpx;
				gap: 20rpx;
				image{
					// border:1rpx solid black;
					width: 120rpx;
					height: 120rpx;
				}
				.title{
					// font-size: 40rpx;
					padding: 10rpx 0;
					padding-bottom:10rpx;
				}
				.price{
					font-size: 45rpx;
					color: red;
				}
				.close{
					position: absolute;
					right: 15rpx;
				}
			}
			.popup-choose{
				padding: 20rpx;
				.choose-item{
					padding: 15rpx 0;
					.item-title{
						// padding-left: 25rpx;
						padding: 5rpx;
					}
				}
			}
			.popup-num{
				width: 100%;
				padding: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.num-input{
					padding: 10rpx;
					display: flex;
					align-items: center;
					.num-inp{
						width: 100rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 40rpx;
						border:1rpx solid #efefef;
					}
					.num-btn{
						background-color: $takout-base-color;
						color: white;
						font-weight: 800;
						width: 80rpx;
						height: 80rpx;
						border-radius: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.addCart{
				padding: 20rpx;
				.add-btn{
					border-radius: 50rpx;
					background:$takeout-button-cart-color;
					color: white;
				}
			}
		}
	}

</style>

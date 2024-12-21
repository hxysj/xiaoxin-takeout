<template>
	<view class="add-address pageBg">
		<view class="form">
			<uni-forms :modelValue="form" ref="uniForm">
				<uni-forms-item label="标签" name="tag">
					<uni-easyinput type="text" v-model="form.tag" placeholder="请输入标签,如 家,公司等,非必填" />
				</uni-forms-item>
				<uni-forms-item label="联系人" required name="name">
					<uni-easyinput  type="text" v-model="form.name" placeholder="请输入联系人姓名"/>
				</uni-forms-item>
				<uni-forms-item label="联系电话" required name="phone">
					<uni-easyinput type="text" v-model="form.phone" placeholder="请输入手机号码"/>
				</uni-forms-item>
				<uni-forms-item label="填写地址" required name="address">
					<view class="getnowwhere" @click="chooesWhere">
						<!-- 经度：{{ locationInfo.longitude}} - 纬度：{{ locationInfo.latitude}} -->
						{{form.headAddress}}
					</view>
					<uni-easyinput type="text" v-model="form.address" placeholder="详细地址"/>
				</uni-forms-item>
			</uni-forms>
			<button @click="submitForm" class="submit-btn">确定</button>
		</view>
		<uni-popup ref="mapPopup" type="center" class="map-popup">
			<view class="map-search">
				<input class="search-inp" v-model="searcharea" type="text" placeholder="输入你要搜索的地点"/>
				<view class="search-content">
					<view class="search-item" v-for="item in searchAddressList" :key="item.id" @click="changeAddress(item)">
						<view class="title">
							{{item.title}}
						</view>
						<view class="address">
							{{item.addr}}
						</view>
					</view>
				</view>
			</view>
			<map style="width: 100%; height: 600px;" 
				:latitude="locationInfo.latitude" 
				:longitude="locationInfo.longitude"
				:markers="covers"
				@tap="newChoose"
				></map>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref,computed, watch } from 'vue'
	import { onReady,onLoad } from '@dcloudio/uni-app'
	import QQMapWX from '@/common/js/qqmap-wx-jssdk.js'
	import { useUserStore } from '@/stores';
	const userStore = useUserStore()
	
	// let my_address = ref('未获取到地址')
	// 解析地址
	async function parseAddress(location){
		const qqmapsdk = new QQMapWX({
			key:'***'
		})
		// 开启解析
		let address = await qqmapsdk.reverseGeocoder({
			location,
			success:function(response){
				// console.log(response.result)
				form.value.headAddress = response.result.address_component.city +
				response.result.address_component.district + response.result.address_reference.landmark_l2.title
			},
			fail:function(err){
				throw new Error(err)
			}
		})
		return address
	}
	
	// 获取当前经纬度的信息
	const getLocationInfo = async() =>{
		// console.log('调用了getlocation')
		return new Promise((resolve,reject)=>{
			let location = {
				longitude: 0,
				latitude: 0,
				province: "",
				city: "",
				area: "",
				street: "",
				address: "",
				formatted_addresses:""
			}
			// console.log('开始获取ip')
			uni.getLocation({
				type:'gcj02',
				isHighAccuracy:true,
				success:function(res){
					// console.log('获取到ip了')
					location.longitude = res.longitude  //经度
					location.latitude = res.latitude   //维度
					locationInfo.value.longitude = res.longitude
					locationInfo.value.latitude = res.latitude
					// 将经纬度存储到本地中，后续需要再重新定位
					uni.setStorageSync('location',JSON.stringify(locationInfo.value))
					parseAddress(locationInfo.value)
				},
				fail:function(err){
					console.log('获取失败')
					console.log(err)
				}
			})
		})
	}
	// 存放当前经纬度
	const locationInfo = ref({})
	const getposition = async()=>{
		if(uni.getStorageSync('location')){
			locationInfo.value = JSON.parse(uni.getStorageSync('location'))
			// console.log(locationInfo.value)
			parseAddress(locationInfo.value)
			return
		}
		await getLocationInfo()
	}
	
	const covers = ref([
		{
			id:1,
			latitude: computed(()=>locationInfo.value.latitude ?? 0),
			longitude: computed(()=>locationInfo.value.longitude ?? 0),
			iconPath: '../../static/images/location.png',
			width:20,
			height:20
		}
	])
	
	// 绑定地图弹出层
	const mapPopup = ref(null)
	// 点击打开定位地图
	const chooesWhere = ()=>{
		mapPopup.value.open()
	}
	// 更改定位
	const newChoose = (e)=>{
		locationInfo.value = e.detail
		parseAddress(locationInfo.value)
		form.value.longitude = locationInfo.value.longitude
		form.value.latitude =locationInfo.value.latitude
		searcharea.value = ''
		searchAddressList.value = []
		mapPopup.value.close()
	}
	
	// -----------------------------------
	// 搜索位置，获取对应的坐标
	const searcharea = ref('')
	const searchAddressList = ref([])
	const searchAddress = () =>{
		// console.log(searcharea.value)
		if(!searcharea.value){
			return
		}
		searcharea.value = searcharea.value.trim()
		const qqmapsdk = new QQMapWX({
			key:'**'
		})
		qqmapsdk.getSuggestion({
		      //获取输入框值并设置keyword参数
		    keyword: searcharea.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
		      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
		    success: function(res) {//搜索成功后的回调
				// console.log(res);
		        let sug = [];
		        for (let i = 0; i < res.data.length; i++) {
		          sug.push({ // 获取返回结果，放到sug数组中
		            title: res.data[i].title,
		            id: res.data[i].id,
		            addr: res.data[i].address,
		            city: res.data[i].city,
		            district: res.data[i].district,
		            latitude: res.data[i].location.lat,
		            longitude: res.data[i].location.lng
		          });
		        }
				// console.log(sug)
				searchAddressList.value = sug
		    },
		    fail: function(error) {
		        console.error(error);
		    },
		    complete: function(res) {
				// console.log(res);
		    }
		});
	}
	watch(searcharea,(newval)=>{
		// console.log(newval)
		searchAddress()
	})
	const changeAddress = (item) =>{
		newChoose({
			detail:{
				longitude:item.longitude,
				latitude:item.latitude
			}
		})
	}
	// ----------------------------------
	// 绑定表单
	const uniForm = ref(null)
	// 表单绑定的数据
	const form = ref({})
	// 表单校验规则
	const formRule = ref({
		name:{
			rules:[
				{
					required:true,
					errorMessage:'联系人不能为空'
				}
			]
		},
		phone:{
			rules:[
				{
					required:true,
					errorMessage:'联系电话不能为空'
				},{
					validateFunction:function(rule,value,data,callback){
						let regExp = /^1[3456789]\d{9}$/
						if(regExp.test(value)){
							return true
						}
						callback('请输入正确的手机格式')
					}
				}
			]
		},
		address:{
			rules:[
				{
					required:true,
					errorMessage:'详细地址不能为空'
				}
			]
		}
	})
	onReady(()=>{
		uniForm.value.setRules(formRule.value)
	})
	const submitForm = ()=>{
		uniForm.value.validate().then(res=>{
			console.log(isEdit.value)
			// form.headAddress = my_address.value
			if(!isEdit.value){
				let id = + new Date()
				userStore.pushAddress({
					id:id,
					longitude:locationInfo.value.longitude,
					latitude:locationInfo.value.latitude,
					...form.value})
				uni.showToast({
					title:'添加成功'
				})
			}else{
				try{
					console.log(111)
					userStore.editAddress(form.value)
				}catch(error){
					console.log(error)
				}
				uni.showToast({
					title:'修改成功'
				})
			}
			uni.navigateBack()
		}).catch(err=>{
			// console.log(err)
		})
	}
	// 获得页面参数，判断是否编辑还是新增
	const isEdit = ref(false)
	onLoad((e)=>{
		if(!uni.getStorageSync('token')){
			uni.showToast({
				title:'未登录',
				icon:'error'
			})
			setTimeout(()=>{
				uni.switchTab({
					url:'/pages/user/user'
				})
			},500)
			return
		}
		if(e.id){
			isEdit.value = true
			let obj = userStore.searchForAid(parseInt(e.id))
			form.value = obj
			locationInfo.value = {
				latitude:form.value.latitude,
				longitude:form.value.longitude
			}
		}else{
			getposition()
		}
	})
</script>

<style lang="scss" scoped>
	.add-address{
		min-height: 100vh;
		padding: 10rpx;
		.form{
			background-color: white;
			padding: 30rpx;	
			:deep(.uni-forms-item__label){
				width: 170rpx !important;
			}
			.getnowwhere{
				padding: 20rpx;
				width: 100%;
			}
		}
		.submit-btn{
			background: $takeout-button-cart-color;
		}
		.map-popup{
			position: relative;
			:deep(.uni-popup__wrapper){
				width: 100%;
				height: 65vh;
				uni-map{
					height: 65vh !important;
				}
			}
			.map-search{
				position: absolute;
				top: 10rpx;
				left: 0;
				padding: 0 30rpx;
				display: flex;
				// gap: 15rpx;
				flex-direction: column;
				z-index: 10;
				// opacity: 0.75;
				.search-inp{
					width: 550rpx;
					background-color: white;
					height: 70rpx;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					padding:0 15rpx;
				}
				.search-content{
					display: flex;
					flex-direction: column;
					gap: 5rpx;
					max-height: 400rpx;
					overflow-y: scroll;
					.search-item{
						background-color: rgba(255,255,255,0.75);
						padding: 10rpx 20rpx;
						.title{
							font-weight: 800;
							font-size: 30rpx;
						}
						.address{
							font-size: 25rpx;
						}
					}
				}
			}
		}
	}

</style>

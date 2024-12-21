// 管理用户的相关数据，用户的信息，地址信息
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { getCurrentStartTime_EndTime } from '@/utils/utils.js'
export const useUserStore = defineStore('users',()=>{
	// 存放用户数据
	const userInfo = ref({
		balance:0,
		recharge:20,
		consumption:20,
		payPasswd:'123321',
		name:'xiaoxin',
		icon:'/static/images/xiaoxin.png',
		id:'1923112',
		like:[
			{
				id:2,
				type:'commodity'
			},
			{
				id:0,
				type:'commodity'
			},
			{
				id:54230,
				type:'shop'
			}
		]
	})
	// ------------------------------------
	// 获得当前用户的数据
	const getUserInfo = computed(()=>{
		return userInfo.value
	})
	// ------------------------------------
	// 更改用户数据
	const changeUserInfo = (id,name,icon)=>{
		userInfo.value.name = name
		userInfo.value.icon = icon
		// console.log(userInfo.value)
	}
	// ------------------------------------
	// 交易记录
	const transactionList = ref([
		{
			id:1111,
			balance:10,
			title:"港堡汉堡·炸鸡",
			createTime:"2024-06-10 18:02:10"
		},
		{
			id:1112,
			balance:10,
			title:"港堡汉堡·炸鸡",
			createTime:"2024-06-09 18:02:10"
		}
	])
	
	// ------------------------------------
	// 获得用户的交易记录
	const getUserTransaction = computed(()=>{
		return transactionList.value
	})
	// ------------------------------------
	// 添加新的交易记录
	const addTransaction = (obj)=>{
		transactionList.value.unshift(obj)
	}
	// 进行充值
	const addUserBalance = (n,obj)=>{
		if(obj){
			console.log(obj)
		}
		userInfo.value.recharge += n
		userInfo.value.balance += n
	}
	// ------------------------------------
	// 存放用户的地址信息
	const addressInfo = ref([
		{
			id:111,
			tag:'家',
			name:'略略略',
			phone:'18828222291',
			longitude: 90.35353383141182,
			latitude: 35.12374531943533,
			headAddress:'虚拟位置',
			address:'20栋',
			default:true
		},
		 {
		 	id:112,
		 	tag:null,
		 	name:'略略略',
		 	phone:'18828222291',
			longitude: 150.35353383141182, 
			latitude: 27.12374531943533,
			headAddress:'虚拟位置',
			address:'21栋',
		 	default:false
		 }
	 ])
	 // -------------------------------------
	 // 获得地址信息
	 const getAddress = computed(()=>{
		 if(addressInfo.value.find(item=>item.default)){
			return [addressInfo.value.find(item=>item.default),...addressInfo.value.filter(item=>item.default===false)]
		 }else{
			 return addressInfo.value
		 }
		 // console.log([...addressInfo.value.filter(item=>item.default===false)])
	 })
	 // ----------------------------------------
	 // 获取默认地址
	 const getDefaultAddress = computed(()=>{
		 // console.log(addressInfo.value.find(item=>item.default))
		 return addressInfo.value.find(item=>item.default)
	 })
	 // ---------------------------------------
	 // 设置默认地址
	 const setDefault = (id)=>{
		addressInfo.value = addressInfo.value.map(item=>{
			item.default = false
		 return item
		 })
		addressInfo.value = addressInfo.value.map(item=>{
			if(item.id === id){
				item.default = true
			}
			return item
		})
	 }
	 // ---------------------------------------
	// 删除地址
	 const deleteAddress = (id)=>{
		 // console.log(id)
		 addressInfo.value = addressInfo.value.filter(item=>item.id !== id)
	 }
	 // -----------------------------------
	 // 添加地址
	 const pushAddress = (obj)=>{
		 obj = {...obj,default:false}
		 addressInfo.value.unshift(obj)
		 // console.log(addressInfo.value)
	 }
	 // ----------------------------------------
	 // 编辑地址
	 const editAddress = (obj) =>{
		addressInfo.value = addressInfo.value.map(item=>{
			if(item.id === obj.id){
				item = obj
			}
			return item
		})
	 }
	 // -----------------------------------------
	 // 通过id查找地址的信息
	 const searchForAid = (id)=>{
		 return addressInfo.value.find(item=>item.id === id)
	 }
	 // -----------------------------
	 // 存放用户领取的优惠卷的信息
	 const couponList = ref([
		 {
			id:182381293,
			pid:110,
			createTime:'2024-06-04',
			endTime:'2024-06-06',
			isuse:false
		 },
		 {
			id:1823812393,
		 	pid:101,
			startTime:'2024-06-04',
		 	endTime:'2024-06-06',
		 	isuse:false
		 },
		 {
		 	id:18238123123,
		 	pid:102,
		 	startTime:'2024-06-01',
		 	endTime:'2024-06-03',
		 	isuse:true
		 }
	 ])
	 // ---------------------------------
	 // 获得用户拥有的优惠卷列表
	const getCoupon = computed(() =>{
		return couponList.value
	})
	// --------------------------------
	// 点击领取优惠卷后获得优惠卷
	const addNewCoupon = (id)=>{
		let [start,end] = getCurrentStartTime_EndTime()
		// console.log(start,end)
	 	couponList.value.unshift({
			id:+ new Date(),
			pid:id,
			isuse:false,
			startTime:start,
			endTime:end
		})
		// console.log(couponList.value)
	 }
	 // ---------------------------------
	 // 通过id获取优惠券的信息
	 const searchForCouId = (id)=> { 
		 return couponList.value.find(item=>item.id === id)
	 }
	 // --------------------------------
	 // 通过id更改优惠券的使用情况
	 const changeCoupon = (id)=>{
		 couponList.value = couponList.value.map(item=>{
			 if(item.id === id){
				 item.isuse = true
			 }
			 return item
		 })
	 }
	 // ---------------------------------
	 // // 支付成功后减去金额
	 const updateBalance = (n)=>{
		 userInfo.value.balance -= n
		 userInfo.value.consumption += n
	 }
	 // -------------------------------
	 // 查找指定id和类型是否存在用户的喜欢列表中
	 const checkLike = (id,type) => {
		 // console.log(userInfo.value.like)
		 return userInfo.value.like.some(item=>item.id === id && item.type === type)
	 }
	 // 加入收藏列表
	 const addLike = (id,type)=>{
		userInfo.value.like.push({
			id:id,
			type:type
		})
		// console.log(userInfo.value.like)
		uni.showToast({
			title:'收藏成功！'
		})
	 }
	 
	 // 移除收藏列表
	 const removeLike = (id)=>{
		userInfo.value.like = userInfo.value.like.filter(item=>item.id!==id)
	 }
	 
	 const getCollect = computed(()=>{
		 return userInfo.value.like
	 })
	 return {
		getAddress,
		setDefault,
		deleteAddress,
		getDefaultAddress,
		pushAddress,
		editAddress,
		searchForAid,
		getCoupon,
		addNewCoupon,
		getUserInfo,
		updateBalance,
		searchForCouId,
		changeCoupon,
		checkLike,
		addLike,
		removeLike,
		getCollect,
		getUserTransaction,
		addTransaction,
		addUserBalance,
		changeUserInfo
	 }
 })
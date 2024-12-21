import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
export const useOrderStore = defineStore('orderStore',()=>{
	// 存放订单数
	const orderList = ref([
		{
			id:1231232,
			createTime:'2024-06-10 09:22',
			status:'delivery',
			uid:0,
			sid:54230,
			commodity:[
				{
					comid:0,
					num:1,
					specsList:['不辣','小份']
				},
				{
					comid:2,
					num:2,
					specsList:[]
				}
			],
			sendTime:'立即送出',
			coupon:{
				value:8,
				id:12312312321
			},
			address:'虚拟大学30栋518',
			consignee:'liu',
			phone:'18825911191',
			payType:'微信支付'
		},
		{
			id:1231233,
			createTime:'2024-06-05 09:22',
			status:'evaluate',
			uid:0,
			sid:54230,
			commodity:[
				{
					comid:0,
					num:1,
					specsList:['不辣','小份']
				},
				{
					comid:2,
					num:2,
					specsList:[]
				}
			],
			sendTime:'立即送出',
			coupon:{
				value:8,
				id:12312312322
			},
			address:'gitee人民大学科技楼218',
			consignee:'liu',
			phone:'18821911191',
			payType:'微信支付'
		}
	])
	// 获取订单数据
	const getOrderList = (type) =>{
		if(type === 'all'){
			return orderList.value
		}else{
			let showList = orderList.value.filter(item=>item.status === type)
			return showList
		}
	}
	// 添加新的订单
	const addNewOrder = (obj) =>{
		orderList.value.unshift(obj)
	}
	// 更改订单的状态
	const changeStatus = (id,status)=>{
		// console.log(id)
		orderList.value = orderList.value.map(item=>{
			if(item.id === id){
				item.status = status
			}
			return item
		})
	}
	// 删除订单
	const rmOrder = (id)=>{
		orderList.value = orderList.value.filter(item=>item.id !== id)
		uni.showToast({
			title:'删除成功！'
		})
		
	}
	// 根据订单id搜索订单
	const searchForOid = (id)=>{
		return orderList.value.find(item=>item.id === id)
	}
	
	return {
		getOrderList,
		searchForOid,
		addNewOrder,
		changeStatus,
		rmOrder
	}
})
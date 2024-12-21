import { defineStore } from 'pinia'
import { ref,computed } from 'vue'


export const useCartStore = defineStore('cart',()=>{
	// 存放购物车中相关信息
	const cart = ref([
		{
			id:1,
			sid:54230,
			comid:3,
			num:2,
			specsList:[]
		},
		{
			id:2,
			sid:54230,
			comid:4,
			num:1,
			specsList:[]
		}
	])
	// 添加新的购物车
	const addCart = (newCartForm)=>{
		let isHave = false
		cart.value = cart.value.map(item=>{
			if(item.comid === newCartForm.comid && !(item.specsList.some((v,i)=>v !== newCartForm.check[i]))){
				// console.log(item)
				isHave = true
				item.num += 1
			}
			return item
		})
		if(isHave) return
		
		let form = {
			id:+new Date(),
			sid:newCartForm.sid,
			comid:newCartForm.comid,
			num:newCartForm.num,
			specsList:newCartForm.check
		}
		cart.value.push(form)
	}
	// 获得对应的购物车列表
	const getCart = computed(()=>{
		// 对信息 进行分类- 按店铺分类
		let cartList = {}
		cart.value.forEach(item=>{
			cartList[item.sid] = []
		})
		cart.value.forEach(item=>{
			cartList[item.sid].push(item)
		})
		return cartList
	})
	// 根据id删除对应的内容
	const deleteCart = (id)=>{
		cart.value = cart.value.filter(item=>item.id !== id)
	}
	// 更具id修改购物车内对应商品的数量
	const changeComNum = (id,n)=>{
		// console.log(n)
		cart.value = cart.value.map(item=>{
			if(item.id === id){
				item.num = n
			}
			return item
		})
	}
	// 根据店铺id获取购物车信息
	const searchForSid = (sid) =>{
		return cart.value.filter(item=>item.sid === sid)
	}
	// 点击结算的时候设置临时的订单中的商品
	const wantPay = ref([])
	// 设置临时的想要购买的商品信息
	const setwantPay = (form)=>{
		wantPay.value = form
	}
	// 获取想要购买的商品列表
	const getwantPay = computed(()=>wantPay.value)
	
	return {
		getCart,
		deleteCart,
		addCart,
		searchForSid,
		setwantPay,
		getwantPay,
		changeComNum
	}
})
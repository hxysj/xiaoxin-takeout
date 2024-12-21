// 店铺的数据存储
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
// 现在模拟数据
import shops from '../../static/data/shops.json'
import commodify from '../../static/data/commodity.json'
export const useShopsStore = defineStore('shops',()=>{
	// 存放店铺的信息
	const shopList = ref([])
	// 存放商品的信息
	const commodity = ref([])
	
	// 存放规格的信息
	const specsClassify = ref([])
	
	// 获取数据后存放数据
	const setShopList = async () =>{
		
		// let res = await uni.request({
		// 	url:'/static/data/shops.json'
		// })
		let res = {data:shops}
		shopList.value = res.data.shopList
		// let comRes = await uni.request({
		// 	url:'/static/data/commodity.json'
		// })
		let comRes = { data:commodify}
		commodity.value = comRes.data.commodity
		// console.log(commodity.value)
		specsClassify.value = comRes.data.spcesClassify
	}
	// 获取店铺的信息
	const getShopList = (showPage,nowPage)=>{
		let showList = shopList.value.slice(0,(nowPage+1)*showPage)
		showList = showList.map(item=>{
			item.commodity = commodity.value.filter(it=>it.sid === item.id)
			return item
		})
		return showList
	}
	
	
	// 根据分类id获取对应的店铺
	const searchForCid = (cId,showPage,nowPage) =>{
		let showList = shopList.value.filter(item=>item.cId === cId).slice(0,showPage*(nowPage+1))
		
		return showList.map(item=>{
			item.commodity = commodity.value.filter(it=>it.sid === item.id)
			return item
		})
	}
	// 根据店铺id获取对应的店铺信息
	const searchForId = (id) =>{
		return shopList.value.find(item=>item.id === parseInt(id))
	}
	
	// 根据店铺id获取该店铺的商品信息
	const searchForShopID_com = (id)=>{
		return commodity.value.filter(item=>item.sid === parseInt(id))
	}
	
	//根据商品id获取商品的信息
	const searchForComId = (id)=>{
		// console.log(commodity.value)
		return commodity.value.find(item=>item.id === parseInt(id))
	}
	
	// 搜索用户想要的商品或店铺
	const searchForName = (value,showPage,nowPage)=>{
		// console.log(value)
		const find_sid = ref([])
		// console.log(shopList.value)
		shopList.value.forEach(item=>{
			// console.log(item.name.includes(value))
			if(item.name.includes(value)){
				find_sid.value.push(item.id)
			}
		})
		commodity.value.forEach(item=>{
			if(item.title.includes(value)){
				find_sid.value.push(item.sid)
			}
		})
		find_sid.value = [...new Set(find_sid.value)]
		// console.log(find_sid.value)
		let result = ref([])
		for(const sid of find_sid.value){
			result.value.push(shopList.value.find(item=>item.id === sid))
		}
		result.value = result.value.slice(0,(nowPage+1)*showPage)
		// console.log(result.value)
		return computed(()=>result.value.map(item=>{
			item.commodify = commodity.value.filter(it=>it.sid === item.id)
			return item
		})).value
	}
	return {
		getShopList,
		setShopList,
		searchForCid,
		searchForId,
		searchForComId,
		searchForShopID_com,
		searchForName
	}
})
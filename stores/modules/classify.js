// 存储分类数据
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import classify  from '../../static/data/classify.json'
export const useClassifyStore = defineStore('classify',()=>{
	// 存放店铺分类数据
	const classifyList = ref()
	// 设置店铺分类的数据
	const setClassify = async ()=>{
		// let res= await uni.request({
		// 	url:'/static/data/classify.json'
		// })
		let res = { data:classify}
		classifyList.value = res.data.classifyList
	}
	// 获取数据分类的数据
	const getClassify = computed(()=>classifyList.value)
	return {
		getClassify,
		setClassify
	}
})

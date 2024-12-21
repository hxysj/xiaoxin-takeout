import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
//用于存放广告
export const usePosterStore = ('poster',()=>{
	// 轮播图的数据列表
	const posterList = ref([
		{
			pid:0,
			icon:'/static/images/swiper/swiper1.jpg',
			value:'轮播图1',
			parentId:0,
			type:'swiper'
		},
		{
			pid:1,
			icon:'/static/images/swiper/swiper2.jpg',
			value:'轮播图2',
			parentId:0,
			type:'swiper'
		},
		{
			pid:2,
			icon:'/static/images/swiper/swiper3.jpg',
			value:'轮播图3',
			parentId:0,
			type:'swiper'
		},
		{
			pid:3,
			icon:'/static/images/swiper/swiper4.jpg',
			value:'轮播图4',
			parentId:0,
			type:'swiper'
		}
	])
	
	// 获取轮播图数据
	const getSwiperList = computed(()=>{
		// console.log(posterList.value.filter(item=>item.type==='swiper'))
		return posterList.value.filter(item=>item.type=== 'swiper')
	})
	
	return {
		getSwiperList
	}
})
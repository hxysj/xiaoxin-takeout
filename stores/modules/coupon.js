// 用户领取的优惠卷
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const useCouponStore = defineStore('coupon',()=>{
	// 发放的优惠卷列表
	const couponClassify = ref([
		{
			id:110,
			minPrice:0,
			price:8,
			type:'sub',
			title:'【天降神券】无门槛8元优惠券'
		},
		{
			id:101,
			minPrice:25,
			price:10,
			type:'sub',
			title:'【多购更优惠】满25减10优惠券'
		},
		{
			id:102,
			minPrice:45,
			price:15,
			type:'sub',
			title:'满45-15优惠卷'
		},
		{
			id:103,
			minPrice:20,
			price:15,
			type:'sub',
			title:'【会员神卷】满20减15',
			key:'9087100'
		},
		{
			id:104,
			minPrice:0,
			price:10,
			type:'sub',
			title:'【会员神卷】无门槛立减10元',
			key:'9087123'
		}
	])
	// 通过parentid查找优惠卷的信息
	const searchForParentid = (pid) =>{
		return couponClassify.value.find(item=>item.id === pid)
	}
	const getCouponClassify = computed(()=>{
		return couponClassify.value.filter(item=>!item.key)
	})
	// 通过key获取优惠卷信息
	const getCouponForKey = (key)=>{
		return couponClassify.value.find(item=>item.key === key)
	}
	// 用户领取的优惠卷
	const couponList = ref([
		{
			id:11019,
			minPrice:0,
			price:8,
			type:'sub',
			title:'【天降神券】无门槛8元优惠券'
		},
		{
			id:10191,
			minPrice:20,
			price:10,
			type:'sub',
			title:'【多购更优惠】满20减10优惠券'
		}
	])
	
	const getCouponList = computed(()=>couponList.value)
	return {
		getCouponList,
		searchForParentid,
		getCouponClassify,
		getCouponForKey
	}
})
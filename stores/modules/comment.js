import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentStore = defineStore('comment',()=>{
	// 存放评论数据
	const comment = ref([
		{
			id:91823112,
			rate:3.0,
			text:'很好吃，分量很足12312',
			uid:12312,
			anonymous:true,
			userInfo:{
				name:'匿名用户',
				icon:'/static/images/default.png'
			},
			sid:54230,
			createTime:'2024-06-09 23:34'
		},
		{
			id:91823113,
			rate:5.0,
			text:'很好吃，分量很足123333',
			uid:12312,
			anonymous:true,
			userInfo:{
				name:'匿名用户',
				icon:'/static/images/default.png'
			},
			sid:54230,
			createTime:'2024-06-09 23:34'
		},
		{
			id:91823114,
			rate:1.0,
			text:'很差123444',
			uid:12312,
			anonymous:false,
			userInfo:{
				name:'maybe',
				icon:'/static/images/default.png'
			},
			sid:54230,
			createTime:'2024-06-09 23:34'
		},
		{
			id:91823115,
			rate:3.0,
			text:'很好吃，分量很足1235555',
			uid:12312,
			anonymous:true,
			userInfo:{
				name:'匿名用户',
				icon:'/static/images/default.png'
			},
			sid:54230,
			createTime:'2024-06-09 23:34'
		},
		{
			id:91823116,
			rate:3.5,
			text:'很好吃，分量很足123666',
			uid:12312,
			anonymous:true,
			userInfo:{
				name:'匿名用户',
				icon:'/static/images/default.png'
			},
			sid:54230,
			createTime:'2024-06-09 23:34'
		},
		{
			id:91823117,
			rate:5.0,
			text:'很好吃，分量很足123777',
			uid:12312,
			anonymous:true,
			userInfo:{
				name:'匿名用户',
				icon:'/static/images/default.png'
			},
			sid:54230,
			createTime:'2024-06-09 23:34'
		}
	])
	// 根据商品id获取的对应的评论
	// const searchForComId = (id)=>{
	// 	return comment.value.filter(item=>item.cid === id)
	// }
	// 根据店铺id获取对应的评论
	const searchForSId = (id) =>{
		return comment.value.filter(item=>item.sid === id)
	}
	// 添加新的评论
	const addNewComment = (obj)=>{
		// console.log(obj)
		comment.value.unshift(obj)
		uni.showToast({
			title:'提交成功！'
		})
	}
	return {
		searchForSId,
		addNewComment
	}
})

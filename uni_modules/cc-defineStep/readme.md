# cc-defineStep 该组件免费，但版权问题需关注“前端组件开发”公众号获取授权。

#### 使用方法 
```使用方法
<!-- colors: 设置主题色 stepData:步骤数据 -->
<cc-defineStep :colors="colors" :stepData="stepData"></cc-defineStep>

	<!-- 数据设置 -->
	colors:"#fa436a",
	//模拟后台返回的数据
	stepData: [ 
		{
			name: '提交申请',
			time: '2023-06-09 20:01:49',
			isNow: 0,
			type: 1,
			desc: '不想要了'
		},
		{
			name: '等待审核',
			time: '2023-06-09 20:01:49',
			isNow: 0,
			type: 1,
			desc: '您的服务单已申请成功，待售后审核中'
		},
		{
			name: '审核意见',
			time: '2023-06-09 20:13:49',
			isNow: 0,
			type: 1,
			desc: '您的售后单已收到，会在24小时与您联系。'
		},
		{
			name: '审核上门取件',
			time: '2023-06-09 20:13:49',
			isNow: 0,
			type: 1,
			desc: '您的服务单已预约时间2023-06-10(周日) 15:00-20:00'
		},
		{
			name: '取件成功',
			time: '2023-06-10 18:54:55',
			isNow: 0,
			type: 1,
			desc: '您的商品已取件成功'
		},
		{
			name: '商家售后已收到',
			time: '2023-06-12 09:01:49',
			isNow: 0,
			type: 1,
			desc: '您的服务单商品已收到'
		},
		{
			name: '返修换新订单生产',
			time: '2023-06-12 13:19:49',
			isNow: 0,
			type: 1,
			desc: '您的服务订单已生成新的订单'
		},
		{
			name: '返修换新完成',
			time: '2023-06-13 12:12:49',
			isNow: 1,
			type: 1,
			desc: '您的服务单已完成，如有疑问请反馈，谢谢~，欢迎再次光临'
		},
	]	
					


```

#### HTML代码实现部分
```html
<template>
	
	<!-- colors: 设置主题色 stepData:步骤数据 -->
	<cc-defineStep :colors="colors" :stepData="stepData"></cc-defineStep>
	
</template>

<script>
	export default {

		data() {
			return {
				
				colors:"#fa436a",
				//模拟后台返回的数据
				stepData: [ 
					{
						name: '提交申请',
						time: '2023-06-09 20:01:49',
						isNow: 0,
						type: 1,
						desc: '不想要了'
					},
					{
						name: '等待审核',
						time: '2023-06-09 20:01:49',
						isNow: 0,
						type: 1,
						desc: '您的服务单已申请成功，待售后审核中'
					},
					{
						name: '审核意见',
						time: '2023-06-09 20:13:49',
						isNow: 0,
						type: 1,
						desc: '您的售后单已收到，会在24小时与您联系。'
					},
					{
						name: '审核上门取件',
						time: '2023-06-09 20:13:49',
						isNow: 0,
						type: 1,
						desc: '您的服务单已预约时间2023-06-10(周日) 15:00-20:00'
					},
					{
						name: '取件成功',
						time: '2023-06-10 18:54:55',
						isNow: 0,
						type: 1,
						desc: '您的商品已取件成功'
					},
					{
						name: '商家售后已收到',
						time: '2023-06-12 09:01:49',
						isNow: 0,
						type: 1,
						desc: '您的服务单商品已收到'
					},
					{
						name: '返修换新订单生产',
						time: '2023-06-12 13:19:49',
						isNow: 0,
						type: 1,
						desc: '您的服务订单已生成新的订单'
					},
					{
						name: '返修换新完成',
						time: '2023-06-13 12:12:49',
						isNow: 1,
						type: 1,
						desc: '您的服务单已完成，如有疑问请反馈，谢谢~，欢迎再次光临'
					},
				]
			}
		},
		onLoad() {
			// 步骤数组数据反序
			this.stepData.reverse()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>



```
<template>
	<view class="keyboard">
		<template v-for="(value,key,index) in obj" :key="index">
			<button class="keyboard-item"  @click="clickItem(value)">
				{{value}}
			</button>
			<view class="keyboard-item-none" v-if="index === 8">
				
			</view>
		</template>
	</view>
</template>

<script setup>
	import { ref,watch } from 'vue'
	
	const props = defineProps({
		modelValue:{
			type:String,
			default:''
		},
		len:{
			type:Number,
			default:4
		}
	})
	const emits = defineEmits(['update:modelValue'])
	const nowStr = ref(props.modelValue)
	const obj = ref({
		one:1,
		tow:2,
		three:3,
		four:4,
		five:5,
		six:6,
		seven:7,
		eight:8,
		nine:9,
		zero:0,
		del:'x'
	})
	
	const clickItem = (n)=>{
		if(n ==='x'){
			nowStr.value = nowStr.value.slice(0,-1)
			// console.log(nowStr.value)
			emits('update:modelValue',nowStr.value)
			return
		}
		if(props.len === nowStr.value.length){
			return
		}
		nowStr.value += n
		emits('update:modelValue',nowStr.value)
		// console.log(nowStr.value)
	}
	// 监听父组件传入的内容，更新nowStr
	watch(()=>props.modelValue,(newVal)=>{
		nowStr.value = newVal
	})
</script>

<style lang="scss" scoped>
	.keyboard{
		background-color: white;
		display: grid;
		grid-template-columns:1fr 1fr 1fr;
		width: 100%;
		.keyboard-item{
			width: 100%;
			height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1rpx solid #e7e7e7;
		}
		.keyboard-item-none{
			background-color: #e7e7e7;
		}
		.active{
			background-color: white;
			color: #e7e7e7;
		}
	}
</style>
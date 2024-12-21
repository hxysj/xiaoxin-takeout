<template>
	<view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				:style="`height:${props.height}`">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in tabList"
					:key="index" @tap="TabSelect($event,item)" :data-id="index">
					{{item[props.tabName]}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation :style="`height:870rpx`"
				:scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in VList" :key="index"
					:id="'main-'+item[props.assIdName]">
					<view class="cu-bar solid-bottom bg-white"
						:class="mainCur === item[props.assIdName] ? 'sticky-header' : ''">
						<view class="action">
							<text class="cuIcon-title text-green"></text> {{item[props.tabName]}}
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(items,index) in item.arr" :key="index" @click="onclickItem(items)">
							<view class="cu-avatar round lg" >
								<image :src="items.imgUrl" mode="aspectFill"></image>
							</view>
							<view class="content">
								<view class="text-grey">{{items.title}}</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										{{items.remarks}}
									</text>
								</view>
							</view>
							<view class="action customAction">
								<view class="text-grey text-xs">￥{{items.jiage}}起</view>
								<view v-if="isUseAddSlot ? false : props.isShowDefaultAdd"
									class="cu-tag round bg-red sm">选购</view>
								<!-- #ifndef MP-WEIXIN -->
								<slot name="add"></slot>
								<!-- #endif -->
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts" name="xzg-verticalNav">
	import { onMounted, useSlots } from 'vue'
	/**
	 * @dataList 原数据
	 * @tabName 要展示的tab名称
	 * @assIdName tab的id,用来保证点击左边item时，能滑动到指定的位置
	 * @height 整个组件的高度,默认100%,支持calc
	 */
	import { ref, getCurrentInstance, computed } from 'vue'
	const props = defineProps({
		dataList: {
			type: Array,
			default: () => []
		},
		tabName: {
			type: String,
			default: ''
		},
		/** tab的id  */
		assIdName: {
			type: String,
			default: ''
		},
		/** 整个组件的高度  */
		height: {
			type: String,
			default: '100%'
		},
		/** 是否显示默认的选购按钮  */
		isShowDefaultAdd: {
			type: Boolean,
			default: true
		}
	})
	const emit = defineEmits(['onClickItem', 'onClickTab'])
	// console.log(props.tabName)
	const isUseAddSlot = ref(false)
	const slots = useSlots()
	const tabCur = ref(0)
	const mainCur = ref(0)
	const verticalNavTop = ref(0)
	const load = ref(true)
	const instance = getCurrentInstance();

	const tabList = computed(() => {
		return props.dataList.filter((item : any, index, self) => {
			return self.findIndex((t : any) => t[props.tabName] === item[props.tabName]) === index;
		});
	})

	const VList : any = computed(() => {
		return props.dataList.reduce((acc : any, item : any) => {
			const typeIndex = acc.findIndex((t : any) => t[props.tabName] === item[props.tabName] && t[props.assIdName] === item[props.assIdName]);
			if (typeIndex === -1) {
				acc.push({ type: item[props.tabName], typeId: item[props.assIdName], arr: [item] });
			} else {
				acc[typeIndex].arr.push(item);
			}
			return acc;
		}, [])
	})

	const TabSelect = (e : any, item : any) => {
		// console.log(e)
		tabCur.value = e.currentTarget.dataset.id;
		mainCur.value = item[props.assIdName];
		verticalNavTop.value = (e.currentTarget.dataset.id - 1) * 50
		emit('onClickTab', item)
	}

	const VerticalMain = (e : any) => {
		let tabHeight = 0
		if (load.value) {
			for (let i = 0; i < VList.value.length; i++) {
				let view = uni.createSelectorQuery().in(instance).select("#main-" + VList.value[i][props.assIdName])
				view.fields({
					size: true
				}, data => {
					VList.value[i].top = tabHeight;
					tabHeight = tabHeight + data?.height;
					VList.value[i].bottom = tabHeight;
				}).exec();
			}
			load.value = false
		}
		let scrollTop = e.detail.scrollTop + 20;
		for (let i = 0; i < VList.value.length; i++) {
			if (scrollTop > VList.value[i].top && scrollTop < VList.value[i].bottom) {
				verticalNavTop.value = i * 50
				tabCur.value = i
				return false
			}
		}
	}

	const onclickItem = (obj : any) => {
		emit('onClickItem', obj)
	}

	onMounted(() => {
		// #ifndef MP-WEIXIN
		if (slots.add) {
			isUseAddSlot.value = true
		}
		// #endif
	})
</script>

<style lang="scss" scoped>
	@import './main.css';
	@import './icon.css';

	.fixed {
		position: fixed;
		z-index: 9999;
		width: 100vw;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		// text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		// height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #fff;
		flex: 1;
	}

	.customAction {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		padding: 30rpx 0px;
	}

	.sticky-header {
		// position: sticky;
		// top: 0;
		// z-index: 999;
	}
	.cu-avatar{
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
</style>
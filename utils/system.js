const SYSTEM_INFO = uni.getSystemInfoSync();
// 获取小程序bar栏的高度
export const getstatusBarHeight = ()=> SYSTEM_INFO.statusBarHeight || 15;
// 获取小程序退出按钮位置的高度
export const getTitleHeight = ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		const {top,height} = uni.getMenuButtonBoundingClientRect();
		return (top - getstatusBarHeight())*2 + height
	}else{
		return 40
	}
}
// 获取底部安全区域
export const getSafeBottom = ()=>{
	const systemInfo = uni.getSystemInfoSync()
	const safeArea = systemInfo.screenHeight - systemInfo.safeArea.bottom
	return safeArea
}
// 返回上一级
export const goBack = ()=>{
	uni.navigateBack()
}
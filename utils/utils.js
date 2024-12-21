export const getDate = (date, AddDayCount = 0)=> {
  if (!date) {
    date = new Date()
  }
  if (typeof date !== 'object'){
    date = date.replace(/-/g, '/')
  }
  const dd = new Date(date)
  dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  const y = dd.getFullYear()
  const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
  return {
    fullDate: y + '-' + m + '-' + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  }
}

// 获得当前时间 年-月-日 小时：分：秒
export const getNowTime = ()=>{
	let date = new Date()
	const y = date.getFullYear()
	const m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 // 获取当前月份的日期，不足10补0
	const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // 获取当前几号，不足10补0
	const h = date.getHours() < 10 ? '0'+date.getHours() : date.getHours()
	const minutes = date.getMinutes() <10? '0'+ date.getMinutes() : date.getMinutes()
	const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	return y + '-' + m + '-' + d + ' ' + h + ':' + minutes + ':' + s
}

export function getCurrentStartTime_EndTime() {  
    // 获取当前时间  
    const now = new Date();  
    // 重置时间为当天的开始（即午夜00:00:00）  
    now.setHours(0, 0, 0, 0);  
    // 转换为ISO格式的日期字符串（不包含时间部分）  
    let startTime = now.toISOString().split('T')[0];  
	const endDate = new Date(now.getTime() + (2*24*60*60*1000))
	let endTime = endDate.toISOString().split('T')[0]
	return [startTime,endTime]
}
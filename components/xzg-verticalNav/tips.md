# 基本介绍
xzg-verticalNav是基于colorUi封装的组件。本插件自带了colorUi样式，如果你的项目本身就是基于colorUi开发的，那么可以删除本组件下的样式。

# 引入与使用

```typescript
import xzgVerticalNav from '@/components/xzg-verticalNav/xzg-verticalNav'
```

```html
<xzgVerticalNav :data-list="list1" tab-name="type" assIdName="typeId" height="calc(100vh - 375upx - 100upx)" @onClickTab="onClickTab" @onClickItem="onClickItem"/>
```

```typescript
/** list属性参考*/
list1 = [{
		"id": 0,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类1",
		"typeId": "1"
	},
	{
		"id": 1,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类1",
		"typeId": "1"
	},
	{
		"id": 2,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类1",
		"typeId": "1"
	},
	{
		"id": 3,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类1",
		"typeId": "1"
	},
	{
		"id": 4,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类1",
		"typeId": "1"
	},
	{
		"id": 5,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类2",
		"typeId": "2"
	},
	{
		"id": 6,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类2",
		"typeId": "2"
	},
	{
		"id": 7,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类2",
		"typeId": "2"
	},
	{
		"id": 8,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类2",
		"typeId": "2"
	},
	{
		"id": 9,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类2",
		"typeId": "2"
	},
	{
		"id": 10,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类3",
		"typeId": "3"
	},
	{
		"id": 11,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类3",
		"typeId": "3"
	},
	{
		"id": 12,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类3",
		"typeId": "3"
	},
	{
		"id": 13,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类3",
		"typeId": "3"
	},
	{
		"id": 14,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类3",
		"typeId": "3"
	},
	{
		"id": 15,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类4",
		"typeId": "4"
	},
	{
		"id": 16,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类4",
		"typeId": "4"
	},
	{
		"id": 17,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类4",
		"typeId": "4"
	},
	{
		"id": 18,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类4",
		"typeId": "4"
	},
	{
		"id": 19,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类4",
		"typeId": "4"
	},
	{
		"id": 20,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类5",
		"typeId": "5"
	},
	{
		"id": 21,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类5",
		"typeId": "5"
	},
	{
		"id": 22,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类5",
		"typeId": "5"
	},
	{
		"id": 23,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类5",
		"typeId": "5"
	},
	{
		"id": 24,
		"imgUrl": "background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)",
		"title": "柠檬水",
		"remarks": "冰鲜柠檬水",
		"jiage": "4",
		"type": "奶茶分类5",
		"typeId": "5"
	}]
```


# api
## props
|属性名| 类型 | 默认值 | 说明 |
|--|--|--|--|
| dataList | Array  | - | 源数据 |
| tabName| String| - | 要展示的tab名称 |
| assIdName| String| - | tab的id,用来保证点击左边item时，能滑动到指定的位置 |
| height| String| 100% | 整个组件的高度,默认100%,支持calc |
| isShowDefaultAdd| boolean| true | 是否显示默认的选购按钮。在传入slot=add的情况下，该选项无效。 |

## events
|属性名| 说明 | 返回参数 |
|--|--|--|
| onClickTab | 点击右侧Tab触发  | tab的Obj,一般不太用得到，但是还是提供了一手。 |
| onClickItem | 点击右侧菜单项时触发  | 被点击的项的Obj，常用。 |

## slot
|属性名| 说明 |
|--|--|
| add | 选购按钮，可完全自定义，传入该值时，props中的isShowDefaultAdd无效（该属性层级比isShowDefaultAdd高）  |

# Tips
目前插件还在改进中...各位可以提出需求
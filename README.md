## 小新外卖【基于uniapp开发的微信小程序-前端】

### 项目介绍

小新外卖是基于uniapp开发的微信小程序，搭建一个校园外卖平台，实现学生在宿舍，教学楼可自由点餐送达，项目开源，代码可见，项目用于学习交流，很多地方都不是很规范有待改善

项目中未构建后端，数据存放于pinia中，图片存放于statis中，真实场景要搭建后端服务器，将数据文件存放到服务器中

项目未搭建后端服务器，所以评论无上传图片功能

项目很多不足之处，还请原谅！！

### 源码下载

```
https://gitee.com/piecemeals/xiaoxin-takeout.git
```

温馨提示：项目由于没有后端服务器，将店铺的图片存到了static中，导致项目打包成微信小程序后项目过大，无法预览编译，可以将一些图片先删除后可预览编译，但会数据显示不全

### 如何使用uni-app端

- 下载后解压项目，获取xiaoxin-takeout-master，再Hubilder中导入项目

![image-20240612193954280](README.assets/image-20240612193954280.png)

- 在/pages/add-address/add-address.vue中配置腾讯地图的key，腾讯地图sdk用于配置获取用户的定位和解析经纬度

![image-20240612185400448](README.assets/image-20240612185400448.png)

![image-20240612185220660](README.assets/image-20240612185220660.png)

腾讯地图的sdk在腾讯位置服务中 创建应用后可获得

![image-20240612185605984](README.assets/image-20240612185605984.png)

创建后的应用要给对应的服务分配调用额度（ip定位，逆地址解析，关键词输入）

![image-20240612185730715](README.assets/image-20240612185730715.png)

- 在/pages/user/user.vue  中配置appId 和appSecret，用于用户登录后获得微信用户的openId（可用于用户的唯一标志，存放与数据库中） 

温馨提示：可以不进行此项配置，因为本项目未使用到openId存于数据库用于标识用户，留着用于以后要是用获得登录用户的openId 使用

![image-20240612180053709](README.assets/image-20240612180053709.png)

appId和appSecret 在 微信公众平台中获得

![image-20240612175559217](README.assets/image-20240612175559217.png)

- 配置好后允许到微信开发者工具

![image-20240612194029667](README.assets/image-20240612194029667.png)

![image-20240612194230805](README.assets/image-20240612194230805.png)



### UNIAPP-页面展示

#### 小程序首页

广告未实现点击跳转到店铺

![image-20240612173823924](README.assets/image-20240612173823924.png)



![image-20240612173850217](README.assets/image-20240612173850217.png)

#### 店铺分类页面

![image-20240612173915302](README.assets/image-20240612173915302.png)

#### 店铺详情页面

![image-20240612174212570](README.assets/image-20240612174212570.png)

#### 商品详情页面

![image-20240612174239482](README.assets/image-20240612174239482.png)

#### 订单结算页面

未实现微信支付功能，只提供余额支付

![image-20240612174314905](README.assets/image-20240612174314905.png)

![image-20240612174330547](README.assets/image-20240612174330547.png)

#### 搜索页面

![image-20240612173939521](README.assets/image-20240612173939521.png)

#### 订单页面

（未实现骑手实时定位，只是展示商家位置）

![image-20240612174003425](README.assets/image-20240612174003425.png)

![image-20240612174018319](README.assets/image-20240612174018319.png)

#### 个人中心页面

![image-20240612174125354](README.assets/image-20240612174125354.png)

![image-20240612174139503](README.assets/image-20240612174139503.png)

#### 用户收藏页面

![image-20240612174446804](README.assets/image-20240612174446804.png)

#### 定位搜索页

![image-20240612195612486](README.assets/image-20240612195612486.png)

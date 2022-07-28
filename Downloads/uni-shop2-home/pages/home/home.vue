<template>
  <view>
    <template>
      <view>
        <!-- 轮播图区域  indicator自定义指示器  autoplay自动播放 duration动画时长-->
        <swiper class="swiperheght" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
          :circular="true">
          <!-- 循环渲染轮播图的 item 项 -->
          <swiper-item v-for="(item, i) in swiperlist" :key="i">
            <navigator class="swiper-item" :url="'/subpkg/goods_list/goods_list?goods_id=' + item.goods_id">
              <!-- 动态绑定图片的 src 属性 -->
              <image :src="item.image_src"></image>
            </navigator>
          </swiper-item>
        </swiper>
      </view>


      <!-- 导航模块 -->
      <view class="nav-list">
        <view class="nav-item" v-for="(item, i) in navlist" :key="i" @click="textfenlei(item)">
          <image :src="item.image_src" class="nav-img"></image>
        </view>
      </view>


      <!-- 楼层模块 -->
      <view class="floor-list">
        <!-- 每一项 -->
        <view class="floor-item" v-for="(item,i) in floorList" :key="i">
          <!-- 每一项的标题 -->
          <view class="floor-title">
            <image :src="item.floor_title.image_src" class="floor-title"></image>
          </view>
          <!-- 每一项的图片 -->
          <view class="floor-img-box">
            <!-- 左图 -->
            <navigator class="floor-imageleft" :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
                mode="widthFix" class="item-imageleft"></image>

            </navigator>
            <!-- 右图  渲染右边的图 循环整个数组 去掉第一张图-->
            <navigator class="right-img-box" :url="item.product_list[0].url">
              <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
                <!-- 加样式 -->
                <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
              </view>
            </navigator>
          </view>
          <!-- <image src="" ></image> -->
        </view>

      </view>
    </template>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 定义接收轮播图的数组
        swiperlist: [],
        // 定义接收分类导航的数据
        navlist: [],
        // 定义楼层数据
        floorList: []
      }
    },
    methods: {
      // 3. 获取轮播图数据的方法
      async getSwiperList() {
        // 3.1 发起请求 解构data并且改名字为res
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(res);
        // 3.2 请求失败
        if (res.meta.status !== 200) return uni.$showtitle()
        // 3.3 请求成功，为 data 中的数据赋值
        this.swiperlist = res.message
        uni.$showtitle('数据加载成功')
      },



      // 调用获取分类导航的接口
      async getnavList() {
        // console.log(1);
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log(res);
        if (res.meta.status != 200) return uni.$showtitle()
        // uni.$showtitle('分类导航加载成功')ss
        this.navlist = res.message
      },

      // 调用获取楼层数据

      async getfloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        console.log(res)
        if (res.meta.status != 200) return uni.$showtitle;
        // 遍历拿到的数据 再遍历数据里面的数组每一项添加一个新属性
        res.message.forEach(floor => {
          floor.product_list.forEach(plod => {
            plod.url = '/subpkg/goods_list2/goods_list2?' + plod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },



      // 看是否点击分类导航 点击就跳转
      textfenlei(item) {
        // console.log(item);
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      }
    },

    onLoad() {
      this.getSwiperList();
      this.getnavList();
      this.getfloorList();
    }
  }
</script>

<style lang="scss">
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }

  }
</style>

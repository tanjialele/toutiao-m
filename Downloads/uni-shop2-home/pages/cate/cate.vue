<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChanged(i)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>

      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="scroll-view-container" scroll-y :style="{height: wh + 'px'}" :scroll-top='scrollTop'>
        <view class="cate-lv2" v-for="(item1,i) in rightlist" :key="i">
          <view class="cate-lv2-title">
            {{item1.cat_name}}
          </view>
          <!-- 渲染第三级数据 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i) in item1.children" :key="i" @click="changepage(item3)">
              <image :src="item3.cat_icon" mode=""></image>
              <view class="cate-lv3-text">
                {{item3.cat_name}}
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        // 定义一个高度
        wh: 0,
        // 滑动列表数据
        cateList: [],
        // 定义一个索引
        active: 0,
        // 定义滑动列表数据的右边数据
        rightlist: [],
        // 定义距离顶部滑动的位置
        scrollTop: 0
      };
    },
    // 记得大写
    onLoad() {
      // 页面加载调用这个方法获取设备数据 屏幕高度是指整个手机屏幕高度 可用窗口高度是指去掉头部导航tab跟底部
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      console.log(sysInfo);
      this.getCateList()
    },
    methods: {
      // 点击三级数据切换到商品详情页面

      changepage(item3) {
        uni.navigateTo({
          url: '/subpkg/goods_list2/goods_list2?cid=' + item3.cat_id
        })

      },
      // 获取分类项的数据
      async getCateList() {
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        console.log(res);
        // 判断是否获取失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 转存数据
        this.cateList = res.message
        this.rightlist = res.message[0].children
      },
      // 给分类项左侧做事件拿到当前索引值赋值给激活active 添加类名 
      activeChanged(i) {
        this.active = i
        this.rightlist = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0

      }
    },
  }
</script>

<style lang="scss">
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
</style>

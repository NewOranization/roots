//获取应用实例
var app = getApp();
Page({
  data: {
    top1: false,
    top2: false,
    top3: false,
    info: [],
    industry: [],//商家分类
    sort: [],//智能排序
    discountActive: [],//优惠活动
    stars: 5,
    sortIcon: [
      '/imgs/sortIcon/balance.png',
      '/imgs/sortIcon/clock.png',
      '/imgs/sortIcon/hot-sale.png',
      '/imgs/sortIcon/myaddress.png',
      '/imgs/sortIcon/star.png'
    ],
    discountIcon: [
      '/imgs/discountIcon/fan.png',
      '/imgs/discountIcon/jian.png',
      '/imgs/discountIcon/mian.png',
      '/imgs/discountIcon/piao.png',
      '/imgs/discountIcon/quan.png',
      '/imgs/discountIcon/shou.png',
      '/imgs/discountIcon/te.png',
    ],
    shopInfo: [],
    page:1,
    count:10
  },
  //封装获取商家信息及筛选请求函数
  loadMore:function(that){
    var requestData ={
        ac: 'homepage',
        op: 'store',
        page:that.data.page,
        count:that.data.count
    }
    app.getPostData(function (post_data) {//请求轮播图
      app.getApiData(function (res) {
        that.setData({
          shopInfo: that.data.shopInfo.concat(res.data.data),
          page:that.data.page+1
        });
      }, 'GET', post_data)
    }, requestData);
  },
  onLoad: function (ops) {
    var that = this;
 
    wx.request({//请求筛选导航列表
      url: 'http://xcx.szhuanya.cn/web/index.php?c=site&a=entry&do=web&m=we7_wmall&ctrl=Interface',
      data: {
        ac: 'homepage',
        op: 'get_condition'
      },
      success: function (res) {
        that.setData({
          industry: res.data.data.nav,
          sort: res.data.data.sort,
          discountActive: res.data.data.discount
        });
      }
    });
    that.loadMore(that);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this;
    that.loadMore(that);
    console.log(that.data.page)
  },
  // **********************************************页面跳转函数
  goSearchPage: function () {
    wx.navigateTo({
      url: '/pages/index/search/search'
    })
  },
  toShopMenuList: function (e) {
    var that = this;
    var token = e.currentTarget.dataset.token;
    wx.navigateTo({
      url: '/pages/index/shopMenuList/shopMenuList?token=' + token
    })
  },
  /**
   ************************************************* tel_tab分类点击
   */
  navBarSwitch: function (e) {
    var that = this;
    var nav = e.currentTarget.dataset.nav;
    if (nav == 1) {
      that.setData({
        top1: !that.data.top1,
        top2: false,
        top3: false
      })
    }
    if (nav == 2) {
      that.setData({
        top2: !that.data.top2,
        top1: false,
        top3: false
      })
    }
    if (nav == 3) {
      that.setData({
        top3: !that.data.top3,
        top2: false,
        top1: false
      })
    }

  },
})

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
    shopInfo: [],
    page:1
  },
  //下拉刷新
  refresh:function(that){
    var requestData = {
      ac: 'homepage',
      op: 'store',
    }
    app.getPostData(function (post_data) {//
      app.getApiData(function (res) {
        that.setData({
          shopInfo:res.data.data
        });
        if (res.data.code == 0) {
          wx.hideToast();
        } 
      }, 'GET', post_data)
    }, requestData);
  },
  //封装获取商家信息及筛选请求函数
  loadMore:function(that){
    wx.showToast({
      title: '正在为您拼命加载。。。',
      icon: 'loading',
      duration: 2000,
      mask: true
    })
    var requestData ={
        ac: 'homepage',
        op: 'store',
        page:that.data.page
    }
    app.getPostData(function (post_data) {//
      app.getApiData(function (res) {
        that.setData({
          shopInfo: that.data.shopInfo.concat(res.data.data),
          page:that.data.page+1
        });
        if (res.data.code == 0) {
          wx.hideToast();
        }else{
          wx.showToast({
            title: '没有更多数据',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }
      }, 'GET', post_data)
    }, requestData);
  },
  onLoad: function (ops) {
    var that = this;
 
    wx.request({//请求筛选导航列表
      url: 'https://xcx.szhuanya.cn/web/index.php?c=site&a=entry&do=web&m=we7_wmall&ctrl=Interface',
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
  /**
   * 页面下拉触顶事件的处理函数
   */
  onPullDownRefresh:function(){
    var that = this;
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      duration: 1000,
      mask: true
    })
    that.refresh(that);
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

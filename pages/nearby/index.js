//index.js
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
    page: 1,
    wrapHeight: true,
    selNav: 1,
    datalength: 0,
    filterlength:0,
    wrapOpen: null,
  },
  moreWrap: function () {
    var that = this;
    that.setData({
      wrapOpen: !that.data.wrapOpen
    })
    console.log(that.data.wrapOpen);
  },
  //封装获取商家信息及筛选请求函数
  loadMore: function (that, myData) {
    wx.showToast({
      title: '正在为您拼命加载。。。',
      icon: 'loading',
      duration: 2000,
      mask: true
    })
    var data = {};
    if (myData) {
      data = myData
    } else {
      data = {
        ac: 'homepage',
        op: 'store',
        page: that.data.page
      }
    }
    console.log(data);
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        console.log(res.data.data)
        if (myData) {
          that.setData({
            shopInfo: res.data.data,
            filterlength: res.data.data.length
          });
        } else {
          that.setData({
            shopInfo: that.data.shopInfo.concat(res.data.data),
            page: that.data.page + 1,
            datalength: res.data.data.length
          });
        }

        if (res.data.code == 0) {
          wx.hideToast();
        } else if (res.data.data.length < 10) {
          wx.showToast({
            title: '没有更多数据',
            icon: 'loading',
            duration: 500,
            mask: true
          })
        }
      }, 'GET', post_data)
    }, data);
  },
  onLoad: function (ops) {
    var that = this;
    app.getPostData(function (post_data) {//请求筛选导航列表
      app.getApiData(function (res) {
        that.setData({
          industry: res.data.data.nav,
          sort: res.data.data.sort,
          discountActive: res.data.data.discount
        });
        console.log(that.data.industry);
        console.log(that.data.sort);
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'get_condition' });
    that.loadMore(that);
  },

  againRequest: function (e) {
    var that = this;
    var myData = {};
    var cid = e.currentTarget.dataset.cid;
    var sort = e.currentTarget.dataset.sort;
    var discount = e.currentTarget.dataset.discount;
    if (that.data.selNav == 1) {
      myData = {
        ac: 'homepage',
        op: 'store',
        cid: cid,//分类id
      }
    } else if (that.data.selNav == 2) {
      myData = {
        ac: 'homepage',
        op: 'store',
        sort: sort,//分类id
      }
    } else if (that.data.selNav == 3) {
      myData = {
        ac: 'homepage',
        op: 'store',
        discount: discount,//分类id
      }
    }

    that.loadMore(that, myData);
    that.setData({
      top1: false,
      top2: false,
      top3: false
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.datalength = 10) {
      that.loadMore(that);
    }
  },
  /**
  * 页面下拉触顶事件的处理函数
  */
  onPullDownRefresh: function () {
    var that = this;
    if (that.data.datalength = 10) {
      that.loadMore(that);
    }
  },
  RequestAll: function () {
    var that = this;
    that.setData({
      shopInfo: [],
      datalength: 0,
      page: 1
    })
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        console.log(res.data.data)
        that.setData({
          shopInfo: res.data.data,
          page: that.data.page + 1
        });
        if (res.data.code == 0) {
          wx.hideToast();
        }
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'store' });
    that.setData({
      top1: false,
      top2: false,
      top3: false
    })
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
    that.setData({
      selNav: nav
    })
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

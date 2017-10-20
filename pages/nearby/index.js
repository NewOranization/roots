//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    top1: false,
    top2: false,
    top3: false,
    shopdata: {},
    page: 1,
    selNav: 1,
    datalength: 0,
  },
  loadMore: function (myData) {
    var that = this;
    var data = { ac: 'homepage', op: 'store' };
    if (myData){
      data = myData;
    }
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        that.setData({
          shopdata: res.data.data
        })
        console.log(that.data.shopdata)
      }, 'GET', post_data)
    },data);
  },
  onLoad: function (ops) {
    var that = this;
    that.loadMore();
  },

  againRequest: function (e) {
    var that = this;
    console.log(that.data.selNav);
    var myData = {};
    var cid = e.currentTarget.dataset.cid;
    var soid = e.currentTarget.dataset.soid;
    var did = e.currentTarget.dataset.did;
    if (that.data.selNav == 1) {
      console.log('商家分类')
      myData = {
        ac: 'homepage',
        op: 'store',
        cid: cid,//分类id
      }
    } else if (that.data.selNav == 2) {
      console.log('只能排序')
      myData = {
        ac: 'homepage',
        op: 'store',
        soid: soid,//分类id
      }
    } else if (that.data.selNav == 3) {
      console.log('优惠活动')
      myData = {
        ac: 'homepage',
        op: 'store',
        did: did,//分类id
      }
    }
    that.loadMore(myData);
    that.setData({
      top1: false,
      top2: false,
      top3: false
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   var that = this;
  //   if (that.data.datalength = 10) {
  //     that.loadMore(that);
  //   }
  // },
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

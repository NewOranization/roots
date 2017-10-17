
//获取应用实例
var app = getApp()
Page({
  data: {
    couponData:[]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (ops) {
    var that = this;
    var push_token = ops.push_token;
    var oldPrice = wx.getStorageSync('oldPrice');
    var data = {
      ac: 'handleorder',
      op: 'userCoupon',
      push_token: push_token,
      oldPrice: oldPrice
    }
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        that.setData({
          couponData:res.data.data
        })
      }, 'GET', post_data)
    }, data)
  }
})

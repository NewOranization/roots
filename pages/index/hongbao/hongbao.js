//获取应用实例
var app = getApp()
// pages/index/hongbao/hongbao.js
Page({
  data: {
    hongbaoData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (ops) {
    var that = this;
    var push_token = ops.push_token;
    var oldPrice = wx.getStorageSync('oldPrice');
    var data = {
      ac: 'handleorder',
      op: 'userRedPacket',
      oldPrice: oldPrice
    }
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        that.setData({
          hongbaoData:res.data.data
        })
      }, 'GET', post_data)
    }, data)
  },
})
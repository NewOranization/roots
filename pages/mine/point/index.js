// pages/mine/point/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: '',
    isNone: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (res) {
        that.setData({
            point: res.credit2
        })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 积分兑换商品
   */
  exchange: function (e) {
    var that = this;
    var point = that.data.point;
    //console.log(point);
    if(point == '0') return;
    wx.showToast({
        title: '功能暂未开放',
        duration: 1000
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
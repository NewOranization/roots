// pages/city/index.js
Page({

    onReady: function () {
        var that = this;
        that.mapContext = wx.createMapContext('map')
    },

  /**
   * 页面的初始数据
   */
  data: {
      latitude: '',
      longitude: '',      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.getMap();
      
  },

  getMap: function () {
      var that = this;
      wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
              that.setData({
                  latitude: res.latitude,
                  longitude: res.longitude,
              })
              wx.openLocation({
                  latitude: that.data.latitude,
                  longitude: that.data.longitude,
              })
          }
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
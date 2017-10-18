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
      markers: [{
          iconPath: "/imgs/waimai.png",
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520,
          width: 50,
          height: 50
      }],
      polyline: [{
          points: [{
              longitude: 113.3245211,
              latitude: 23.10229
          }, {
              longitude: 113.324520,
              latitude: 23.21229
          }],
          color: "#FF0000DD",
          width: 2,
          dottedLine: true
      }],
      controls: [{
          id: 1,
          iconPath: '/imgs/waimai.png',
          position: {
              left: 20,
              top: 70,
              width: 50,
              height: 50
          },
          clickable: true
      }]          
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
              that.setData({
                  latitude: res.latitude.toFixed(6),
                  longitude: res.longitude.toFixed(6),
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
  navTo: function (e) {
      wx.switchTab({
          url: '/pages/form/index',
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
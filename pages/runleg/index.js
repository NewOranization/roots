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
      height: wx.getSystemInfoSync().windowHeight,
      markers: [{
          iconPath: "/imgs/polterform.png",
          id: 0,
          latitude: 30.274085,
          longitude: 120.15507,
          width: 30,
          height: 30
      },{
          iconPath: "/imgs/polterform.png",
          id: 0,
          latitude: 30.274135,
          longitude: 120.15567,
          width: 30,
          height: 30
      },{
          iconPath: "/imgs/polterform.png",
          id: 0,
          latitude: 30.274185,
          longitude: 120.15607,
          width: 30,
          height: 30
      }],
      polyline: [{
          points: [{
              longitude: 120.15507,
              latitude: 23.10329
          }, {
              longitude: 113.324520,
              latitude: 23.21229
          }],
          color: "#000000",
          width: 3,
          dottedLine: true
      }],
       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
              console.log(res);
              that.setData({
                  latitude: 30.274085,
                  longitude: 120.15507,
              })
          }
      });
  },

  controltap: function (e){
      var that = this;
      console.log('mark')
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
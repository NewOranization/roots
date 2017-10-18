// pages/mine/index.js
var app = getApp();
Page({

  data: {
    // userInfo: '',
    login: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      app.getUserInfo(function (userInfo){
            that.setData({
                userInfo: userInfo,
                login: true
            })
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
   * 页面跳转
   */
  navTo: function (e){
      var click = e.currentTarget.dataset.click;
      wx.navigateTo({
         url: '/pages/mine/'+click+'/index',
      })
  },

  
})
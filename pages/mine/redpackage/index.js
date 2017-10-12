// pages/mine/redpackage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headTitle: '我的红包'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 跳转页面函数
   */
  navTo: function (e) {
    //   var click = e.currentTarget.dataset.click;
    //   if (click == 'back') {
    //       wx.navigateBack({
    //           delta: 1
    //       })
    //   }
    wx.navigateTo({
        url: '/pages/mine/index',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
// pages/mine/assess/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [1,1,1,1,1],
    isNone: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.getAll();
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
   * 获取全部数据
   */
  getAll: function () {
     var that = this;
     app.getPostData(function (post_data){
         app.getApiData(function (res){
             console.log(res)
         }, 'GET', post_data)
     }, { op: 'comment', openid: 'oxi5ZwUX0lokIp0I5zXhAW15HMrw'})
  }
})